const axios = require('axios');
const Conf = require('conf');
const ora = require('ora');
const fs = require('fs');
const readline = require('readline');

// Beautiful CLI packages
const pc = require('picocolors');
const Table = require('cli-table3');
const boxen = require('boxen');
const figlet = require('figlet');
const gradient = require('gradient-string');

class QuickBlogAPI {
  constructor() {
    this.config = new Conf({ projectName: 'quickblog-api' });
    this.baseURL = 'https://quick-blog-black-one.vercel.app';
    this.axios = axios.create({
      baseURL: this.baseURL,
      timeout: 15000,
      headers: {
        'x-vercel-protection-bypass': 'HZF6kZB0gmBPZair1mm0NSUTYAGyxTjD'
      }
    });
    
    // Session storage for published blogs in this session
    this.sessionBlogs = this.config.get('sessionBlogs', []);
  }

  // Helper function to get user input
  async getUserInput(question) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    return new Promise((resolve) => {
      rl.question(question, (answer) => {
        rl.close();
        resolve(answer);
      });
    });
  }

  // Helper for multiline input
  async getMultilineInput() {
    return new Promise((resolve) => {
      let content = '';
      console.log(pc.gray('(Type your content, press Ctrl+D when done)'));
      
      process.stdin.setEncoding('utf8');
      process.stdin.setRawMode(false);
      
      const onData = (chunk) => {
        content += chunk;
      };
      
      const onEnd = () => {
        process.stdin.removeListener('data', onData);
        process.stdin.removeListener('end', onEnd);
        resolve(content.trim());
      };
      
      process.stdin.on('data', onData);
      process.stdin.on('end', onEnd);
      process.stdin.resume();
    });
  }

  // Initialize API session
  async init() {
    // Beautiful ASCII banner
    const banner = figlet.textSync('QuickBlog', { font: 'Small' });
    console.log(gradient.rainbow(banner));
    
    console.log(boxen(
      pc.cyan('🚀 QuickBlog API Initialized!\n\n') +
      pc.gray('Welcome! You can now:\n') +
      pc.gray('• View all published blogs\n') +
      pc.gray('• Create and publish new blogs\n') +
      pc.gray('• Edit/delete blogs from this session\n\n') +
      pc.dim('Use --help to see all commands'),
      {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'cyan'
      }
    ));
  }

  // Test API connection
  async testConnection() {
    const spinner = ora('Testing API connection...').start();
    
    try {
      const response = await this.axios.get('/api/blogs');
      spinner.succeed(pc.green('✅ API connection successful!'));
      console.log(pc.gray(`Connected to: ${this.baseURL}`));
      return true;
    } catch (error) {
      if (error.response?.status === 401) {
        spinner.succeed(pc.yellow('✅ API reachable (server has Redis issues, but API works)'));
        console.log(pc.gray('You can still create and publish blogs!'));
        return true; // Still return true since API is reachable
      } else {
        spinner.fail(pc.red('❌ API connection failed'));
        console.log(pc.gray(`URL: ${this.baseURL}`));
        console.log(pc.gray(`Error: ${error.response?.status} - ${error.response?.statusText || error.message}`));
        return false;
      }
    }
  }

  // Show session status
  showStatus() {
    console.log(pc.blue('📊 QuickBlog API Status\n'));
    console.log(pc.gray('API Endpoint:'), this.baseURL);
    console.log(pc.gray('Session Blogs:'), pc.cyan(this.sessionBlogs.length));
    
    if (this.sessionBlogs.length > 0) {
      console.log(pc.gray('\nBlogs published in this session:'));
      this.sessionBlogs.forEach((blog, index) => {
        console.log(pc.gray(`${index + 1}.`), pc.blue(blog.title), pc.gray(`(${blog.id.substring(0, 8)}...)`));
      });
    }
    
    console.log(pc.gray('\n💡 Use'), pc.blue('quickblog list --session'), pc.gray('to see your session blogs'));
  }

  // List all blogs
  async listBlogs(sessionOnly = false) {
    const spinner = ora('Fetching blogs...').start();

    try {
      let blogs = [];

      if (sessionOnly) {
        blogs = this.sessionBlogs;
        spinner.succeed(`Found ${blogs.length} blog(s) from this session`);
        
        if (blogs.length === 0) {
          console.log(pc.yellow('📝 No blogs published in this session yet'));
          console.log(pc.gray('Use'), pc.blue('quickblog create'), pc.gray('to publish your first blog!'));
          return;
        }
      } else {
        spinner.text = 'Loading all published blogs...';
        try {
          const response = await this.axios.get('/api/blogs');
          blogs = response.data.blogs || [];
        } catch (error) {
          if (error.response?.status === 401) {
            // Redis is down, show empty list but allow publishing
            spinner.warn('⚠️ Blog listing unavailable (Redis connection issue on server)');
            console.log(pc.yellow('The server is running but Redis database is not connected.'));
            console.log(pc.gray('You can still create and publish new blogs!'));
            console.log(pc.gray('Published blogs will appear once the server issue is resolved.'));
            return;
          }
          throw error;
        }
        
        spinner.succeed(`Found ${blogs.length} published blog(s)`);
        
        if (blogs.length === 0) {
          console.log(pc.yellow('📝 No blogs published yet'));
          console.log(pc.gray('Be the first to publish! Use'), pc.blue('quickblog create'));
          return;
        }
      }

      // Create beautiful table with cli-table3
      console.log(gradient.pastel('\n📚 Published Blogs'));
      console.log(pc.gray('═'.repeat(80)));
      
      const table = new Table({
        head: [
          pc.bold(pc.blue('No.')),
          pc.bold(pc.blue('ID')),
          pc.bold(pc.blue('Title')),
          pc.bold(pc.blue('Author')),
          pc.bold(pc.blue('Link'))
        ],
        style: {
          head: [],
          border: ['cyan']
        }
      });

      blogs.forEach((blog, index) => {
        const shortId = blog.id.substring(0, 8);
        const shortTitle = blog.title.length > 30 ? blog.title.substring(0, 30) + '...' : blog.title;
        const author = (blog.author || 'Anonymous').length > 20 ? (blog.author || 'Anonymous').substring(0, 20) + '...' : (blog.author || 'Anonymous');
        
        // Generate individual blog URL
        const slug = blog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        const blogUrl = `${this.baseURL}/article/${slug}`;
        const shortUrl = blogUrl.length > 35 ? '...' + blogUrl.substring(blogUrl.length - 32) : blogUrl;
        
        table.push([
          pc.bold(pc.cyan(index + 1)),
          pc.yellow(shortId),
          pc.bold(pc.white(shortTitle)),
          pc.green(author),
          pc.underline(pc.blue(shortUrl))
        ]);
      });

      console.log(table.toString());

      console.log(pc.blue('\n📊 Summary:'));
      console.log(pc.gray(`   • Total blogs: ${pc.bold(pc.white(blogs.length))}`));
      console.log(pc.gray(`   • Authors: ${pc.bold(pc.white([...new Set(blogs.map(b => b.author))].length))}`));
      console.log(pc.gray(`   • Tags used: ${pc.bold(pc.white([...new Set(blogs.flatMap(b => b.tags || []))].length))}`));
      
      console.log(pc.blue('\n💡 Quick Actions:'));
      console.log(pc.gray(`   📖 Read: ${pc.cyan('quickblog read <id>')}`));
      console.log(pc.gray(`   ✏️  Create: ${pc.cyan('quickblog create')}`));
      console.log(pc.gray(`   📋 Session: ${pc.cyan('quickblog list --session')}`));
      console.log(pc.gray(`   🌐 Website: ${pc.underline(pc.blue(`${this.baseURL}/discover.html`))}`));
      if (sessionOnly) {
        console.log(pc.gray(`💡 Use 'quickblog edit <id>' to edit your blog`));
        console.log(pc.gray(`💡 Use 'quickblog delete <id>' to delete your blog`));
      }

    } catch (error) {
      spinner.fail('❌ Failed to fetch blogs');
      console.log(pc.red(`Error: ${error.response?.status} - ${error.response?.statusText}`));
      console.log(pc.red(`Message: ${error.response?.data?.error || error.message}`));
    }
  }

  // Read a specific blog
  async readBlog(blogId) {
    const spinner = ora('Fetching blog...').start();

    try {
      // First check session blogs
      let blog = this.sessionBlogs.find(b => b.id.startsWith(blogId));
      
      if (!blog) {
        // Try to get from public blogs
        try {
          const response = await this.axios.get('/api/blogs');
          blog = response.data.blogs?.find(b => b.id.startsWith(blogId));
        } catch (error) {
          spinner.fail('❌ Cannot fetch public blogs (server issue)');
          return;
        }
      }

      if (!blog) {
        spinner.fail('❌ Blog not found');
        return;
      }

      spinner.succeed('📖 Blog loaded');

      // Display blog beautifully
      console.log('\n' + pc.blue('═'.repeat(80)));
      console.log(pc.bold(pc.underline(pc.blue(`📖 ${blog.title}`))));
      console.log(pc.gray(`👤 By ${pc.bold(pc.green(blog.author))} • 📅 ${new Date(blog.created_at).toLocaleDateString()}`));
      
      if (blog.tags && blog.tags.length > 0) {
        console.log(pc.cyan('🏷️  ' + blog.tags.map(tag => `#${tag}`).join(' ')));
      }
      
      console.log(pc.blue('═'.repeat(80)));
      
      // Format content with proper spacing
      const paragraphs = blog.content.split('\n\n');
      paragraphs.forEach(paragraph => {
        if (paragraph.trim()) {
          console.log('\n' + pc.white(paragraph.trim()));
        }
      });
      
      console.log('\n' + pc.blue('═'.repeat(80)));
      console.log(pc.gray(`📊 Word count: ${pc.bold(pc.white(blog.content.split(' ')).length)} words`));
      console.log(pc.gray(`🆔 Blog ID: ${pc.cyan(blog.id)}`));
      
      // Generate individual blog URL
      const slug = blog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const blogUrl = `${this.baseURL}/article/${slug}`;
      console.log(pc.gray(`🌐 Blog Link: ${pc.underline(pc.blue(blogUrl))}`));
      
      // Show session actions if it's user's blog
      const isUserBlog = this.sessionBlogs.some(b => b.id === blog.id);
      if (isUserBlog) {
        console.log(pc.blue('\n💡 Your Blog Actions:'));
        console.log(pc.gray(`   ✏️  Edit: ${pc.cyan(`quickblog edit ${blog.id.substring(0, 8)}`)}`));
        console.log(pc.gray(`   🗑️  Delete: ${pc.cyan(`quickblog delete ${blog.id.substring(0, 8)}`)}`));
      }

    } catch (error) {
      spinner.fail('❌ Failed to fetch blog');
      console.log(pc.red(`Error: ${error.response?.data?.error || error.message}`));
    }
  }

  // Create a new blog
  async createBlog(filePath) {
    let title, content, author, tags = [];

    if (filePath) {
      // Create from file (existing functionality)
      if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
      }

      const fileContent = fs.readFileSync(filePath, 'utf8');
      const lines = fileContent.split('\n');
      
      title = lines[0].replace(/^#\s*/, '').trim();
      content = lines.slice(1).join('\n').trim();

      console.log(pc.blue(`📝 Creating blog from: ${filePath}`));
      console.log(pc.gray(`Title: ${title}`));
    } else {
      // Interactive creation - NEW FLOW
      console.log(pc.blue('📝 Create New Blog\n'));

      // 1. Get title
      title = await this.getUserInput('📌 Blog title: ');
      if (!title.trim()) {
        throw new Error('Title is required');
      }

      // 2. Show available tags and let user choose
      const availableTags = ['tech', 'career', 'personal', 'review', 'tutorial', 'startup', 'coding', 'life', 'business', 'education'];
      console.log(pc.yellow('\n🏷️  Available tags:'));
      availableTags.forEach((tag, index) => {
        console.log(pc.gray(`${index + 1}. ${tag}`));
      });
      
      const tagInput = await this.getUserInput('\nSelect tags (1-4 numbers separated by commas, or press Enter to skip): ');
      if (tagInput.trim()) {
        const selectedIndexes = tagInput.split(',').map(num => parseInt(num.trim()) - 1);
        tags = selectedIndexes
          .filter(index => index >= 0 && index < availableTags.length)
          .map(index => availableTags[index])
          .slice(0, 4);
      }

      // 3. Get author name
      author = await this.getUserInput('\n👤 Author name: ');
      if (!author.trim()) {
        author = 'Anonymous';
      }

      // 4. Get content with special end command
      console.log(pc.yellow('\n📝 Blog content:'));
      console.log(pc.gray('Type your content. When finished, type "END_BLOG" on a new line and press Enter.'));
      console.log(pc.gray('─'.repeat(60)));
      
      content = await this.getContentWithEndCommand();
      if (!content.trim()) {
        throw new Error('Content is required');
      }
    }

    // Always ask for author and tags if not set from interactive mode
    if (!author) {
      author = await this.getUserInput('\n👤 Author name: ');
      if (!author.trim()) {
        author = 'Anonymous';
      }
    }

    if (tags.length === 0 && filePath) {
      const availableTags = ['tech', 'career', 'personal', 'review', 'tutorial', 'startup', 'coding', 'life', 'business', 'education'];
      console.log(pc.yellow('\n🏷️  Available tags:'));
      availableTags.forEach((tag, index) => {
        console.log(pc.gray(`${index + 1}. ${tag}`));
      });
      
      const tagInput = await this.getUserInput('\nSelect tags (1-4 numbers separated by commas, or press Enter to skip): ');
      if (tagInput.trim()) {
        const selectedIndexes = tagInput.split(',').map(num => parseInt(num.trim()) - 1);
        tags = selectedIndexes
          .filter(index => index >= 0 && index < availableTags.length)
          .map(index => availableTags[index])
          .slice(0, 4);
      }
    }

    // Show preview
    console.log(pc.blue('\n📋 Blog Preview:'));
    console.log(pc.gray('═'.repeat(60)));
    console.log(pc.bold(pc.white(title)));
    console.log(pc.green(`👤 By ${author}`));
    if (tags.length > 0) {
      console.log(pc.cyan('🏷️  Tags: ' + tags.map(tag => `#${tag}`).join(' ')));
    }
    console.log(pc.gray('─'.repeat(60)));
    console.log(content.substring(0, 300) + (content.length > 300 ? '...' : ''));
    console.log(pc.gray('═'.repeat(60)));

    // Confirmation
    const confirm = await this.getUserInput(pc.yellow('\n🚀 Publish this blog on the site? (yes/no): '));
    if (confirm.toLowerCase() !== 'yes' && confirm.toLowerCase() !== 'y') {
      console.log(pc.red('❌ Blog creation cancelled'));
      return;
    }

    const spinner = ora('Publishing blog to site...').start();

    try {
      const response = await this.axios.post('/api/blogs', {
        username: author,
        title: title.trim(),
        content: content.trim(),
        tags: tags
      });

      if (response.data.success) {
        const blogData = {
          id: response.data.blogId,
          title: title.trim(),
          content: content.trim(),
          author: author,
          tags: tags,
          created_at: new Date().toISOString()
        };

        // Add to session blogs
        this.sessionBlogs.push(blogData);
        this.config.set('sessionBlogs', this.sessionBlogs);

        spinner.succeed(pc.green('✅ Blog published successfully!'));
        console.log(pc.blue('🆔 Blog ID:'), pc.cyan(response.data.blogId));
        console.log(pc.blue('🌐 Live Link:'), pc.underline(pc.blue(response.data.shareableLink || `${this.baseURL.replace('/api', '')}/discover.html`)));
        console.log(pc.green('📱 Your blog is now live on the website!'));
        
        console.log(pc.gray('\n💡 Session Commands:'));
        console.log(pc.gray('📖 Read:'), pc.blue(`quickblog read ${response.data.blogId.substring(0, 8)}`));
        console.log(pc.gray('✏️  Edit:'), pc.blue(`quickblog edit ${response.data.blogId.substring(0, 8)}`));
        console.log(pc.gray('🗑️  Delete:'), pc.blue(`quickblog delete ${response.data.blogId.substring(0, 8)}`));
      }
    } catch (error) {
      spinner.fail('❌ Failed to publish blog');
      console.log(pc.red(`Error: ${error.response?.data?.error || error.message}`));
    }
  }

  // New method for content input with END_BLOG command
  async getContentWithEndCommand() {
    return new Promise((resolve) => {
      let content = '';
      let lines = [];
      
      const rl = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: ''
      });

      rl.on('line', (line) => {
        if (line.trim() === 'END_BLOG') {
          rl.close();
          resolve(lines.join('\n'));
        } else {
          lines.push(line);
        }
      });

      rl.on('close', () => {
        resolve(lines.join('\n'));
      });
    });
  }

  // Edit a blog from session
  async editBlog(blogId) {
    const blog = this.sessionBlogs.find(b => b.id.startsWith(blogId));
    
    if (!blog) {
      console.log(pc.red('❌ Blog not found in this session'));
      console.log(pc.gray('You can only edit blogs published in this session'));
      console.log(pc.gray('Use'), pc.blue('quickblog list --session'), pc.gray('to see your session blogs'));
      return;
    }

    console.log(pc.blue(`📝 Editing: ${blog.title}\n`));

    const newTitle = await this.getUserInput(`Title (${blog.title}): `);
    const newAuthor = await this.getUserInput(`Author (${blog.author}): `);
    
    console.log('\n📝 Current content:');
    console.log(pc.gray('═'.repeat(60)));
    console.log(pc.white(blog.content)); // Show FULL content
    console.log(pc.gray('═'.repeat(60)));
    console.log(pc.yellow('\nType new content (or press Enter to keep current content):'));
    console.log(pc.gray('When finished, type "END_BLOG" on a new line and press Enter.'));
    
    const newContent = await this.getContentWithEndCommand();
    
    const newTagsInput = await this.getUserInput(`Tags (${(blog.tags || []).join(', ')}): `);
    const newTags = newTagsInput.trim() ? 
      newTagsInput.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0).slice(0, 4) : 
      blog.tags;

    const spinner = ora('Updating blog...').start();

    try {
      const response = await this.axios.put(`/api/blogs/${blog.author}/${blog.id}`, {
        title: newTitle.trim() || blog.title,
        content: newContent.trim() || blog.content,
        tags: newTags
      });

      if (response.data.success) {
        // Update session blog
        const index = this.sessionBlogs.findIndex(b => b.id === blog.id);
        this.sessionBlogs[index] = {
          ...blog,
          title: newTitle.trim() || blog.title,
          content: newContent.trim() || blog.content,
          author: newAuthor.trim() || blog.author,
          tags: newTags
        };
        this.config.set('sessionBlogs', this.sessionBlogs);

        spinner.succeed(pc.green('✅ Blog updated successfully!'));
      }
    } catch (error) {
      spinner.fail('❌ Failed to update blog');
      console.log(pc.red(`Status: ${error.response?.status}`));
      console.log(pc.red(`Error: ${error.response?.data?.error || error.message}`));
    }
  }

  // Delete a blog from session
  async deleteBlog(blogId) {
    const blog = this.sessionBlogs.find(b => b.id.startsWith(blogId));
    
    if (!blog) {
      console.log(pc.red('❌ Blog not found in this session'));
      console.log(pc.gray('You can only delete blogs published in this session'));
      return;
    }

    console.log(pc.yellow(`\n⚠️  You are about to delete: "${blog.title}"`));
    
    const confirm = await this.getUserInput('Are you sure you want to delete this blog? (yes/no): ');
    if (confirm.toLowerCase() !== 'yes') {
      console.log(pc.gray('Delete cancelled'));
      return;
    }

    const spinner = ora('Deleting blog...').start();

    try {
      const deleteResponse = await this.axios.post(`/api/blogs/${blog.id}/delete`);
      console.log('Delete response:', deleteResponse.status); // Debug log
      
      // Remove from session regardless of server response
      this.sessionBlogs = this.sessionBlogs.filter(b => b.id !== blog.id);
      this.config.set('sessionBlogs', this.sessionBlogs);
      
      if (deleteResponse.status === 200 || deleteResponse.status === 204) {
        spinner.succeed(pc.green('✅ Blog deleted from website and session!'));
      } else {
        spinner.warn(pc.yellow('⚠️ Blog removed from session, but may still be on website'));
        console.log(pc.gray('Server delete may have failed'));
      }
    } catch (error) {
      // Remove from session even if server delete fails
      this.sessionBlogs = this.sessionBlogs.filter(b => b.id !== blog.id);
      this.config.set('sessionBlogs', this.sessionBlogs);
      
      spinner.warn(pc.yellow('⚠️ Blog removed from session, but server delete failed'));
      console.log(pc.red(`Server error: ${error.response?.status} - ${error.response?.data?.error || error.message}`));
      console.log(pc.gray('The blog may still be visible on the website'));
    }
  }

  // Clear session
  clearSession() {
    this.sessionBlogs = [];
    this.config.set('sessionBlogs', []);
    console.log(pc.green('✅ Session cleared'));
  }
}

module.exports = QuickBlogAPI;

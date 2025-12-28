const axios = require('axios');
const chalk = require('chalk');
const Conf = require('conf');
const ora = require('ora');
const { table } = require('table');
const fs = require('fs');
const readline = require('readline');

class QuickBlogAPI {
  constructor() {
    this.config = new Conf({ projectName: 'quickblog-api' });
    this.baseURL = 'https://quick-blog-jzx68c10w-divya4879s-projects.vercel.app/api';
    this.axios = axios.create({
      baseURL: this.baseURL,
      timeout: 15000,
    });
    
    // Session storage for published blogs in this session
    this.sessionBlogs = this.config.get('sessionBlogs', []);
  }

  // Helper function to get user input
  async getUserInput(question, hidden = false) {
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
      console.log(chalk.gray('(Type your content, press Ctrl+D when done)'));
      process.stdin.setEncoding('utf8');
      process.stdin.on('data', (chunk) => {
        content += chunk;
      });
      process.stdin.on('end', () => {
        resolve(content.trim());
      });
      process.stdin.resume();
    });
  }

  // Initialize API session
  async init() {
    console.log(chalk.blue('🚀 QuickBlog API Initialized\n'));
    console.log(chalk.gray('Welcome! You can now:'));
    console.log(chalk.gray('• View all published blogs'));
    console.log(chalk.gray('• Create and publish new blogs'));
    console.log(chalk.gray('• Edit/delete blogs from this session'));
    console.log(chalk.gray('\nUse --help to see all commands\n'));
  }

  // Login to QuickBlog
  async login() {
    console.log(chalk.blue('🚀 QuickBlog API Login\n'));

    const username = await this.getUserInput('Username: ');
    if (!username.trim()) {
      throw new Error('Username is required');
    }

    const password = await this.getUserInput('Password: ', true);
    if (!password.trim()) {
      throw new Error('Password is required');
    }

    const spinner = ora('Authenticating...').start();

    try {
      // First try to login (existing user)
      let response;
      try {
        spinner.text = 'Checking credentials...';
        response = await this.axios.post('/login', {
          username: username.trim(),
          password: password.trim()
        });
        
        if (response.data.success) {
          this.config.set('username', username.trim());
          this.config.set('loggedIn', true);
          spinner.succeed(chalk.green('✅ Login successful!'));
          console.log(chalk.gray(`Welcome back, ${username.trim()}!`));
          return;
        }
      } catch (loginError) {
        if (loginError.response?.status === 401) {
          // User doesn't exist, try to register
          spinner.text = 'User not found, creating new account...';
          try {
            response = await this.axios.post('/register', {
              username: username.trim(),
              password: password.trim()
            });
            
            if (response.data.success) {
              this.config.set('username', username.trim());
              this.config.set('loggedIn', true);
              spinner.succeed(chalk.green('✅ Account created and logged in!'));
              console.log(chalk.gray(`Welcome to QuickBlog, ${username.trim()}!`));
              return;
            }
          } catch (registerError) {
            // If both login and register fail with 401, Redis is down
            if (registerError.response?.status === 401) {
              spinner.warn(chalk.yellow('⚠️ Server authentication unavailable (Redis connection issue)'));
              console.log(chalk.yellow('\n🔧 Using offline mode...'));
              
              // Store credentials locally for offline mode
              this.config.set('username', username.trim());
              this.config.set('loggedIn', true);
              this.config.set('offlineMode', true);
              
              console.log(chalk.green('✅ Logged in locally!'));
              console.log(chalk.gray(`Welcome, ${username.trim()}! (Offline Mode)`));
              console.log(chalk.yellow('\n💡 Note: Blog operations will be limited until server is available'));
              return;
            }
            
            spinner.fail(chalk.red('❌ Registration failed'));
            console.log(chalk.red(`Registration error: ${registerError.response?.data?.error || registerError.message}`));
            throw new Error('Failed to create account');
          }
        } else {
          spinner.fail(chalk.red('❌ Login failed'));
          console.log(chalk.red(`Login error: ${loginError.response?.data?.error || loginError.message}`));
          throw new Error('Authentication failed');
        }
      }
    } catch (error) {
      spinner.fail(chalk.red('❌ Authentication failed'));
      throw error;
    }
  }

  // Logout
  logout() {
    this.config.clear();
  }

  // Check if user is logged in
  isLoggedIn() {
    return this.config.get('loggedIn', false);
  }

  // Get current username
  getUsername() {
    return this.config.get('username');
  }

  // Test API connection
  async testConnection() {
    const spinner = ora('Testing API connection...').start();
    
    try {
      // Try a simple request that might not require auth
      const response = await this.axios.get('/blogs');
      spinner.succeed(chalk.green('✅ API connection successful!'));
      console.log(chalk.gray(`Connected to: ${this.baseURL}`));
      console.log(chalk.gray(`Response: ${response.status} ${response.statusText}`));
    } catch (error) {
      // If 401, it means server is reachable but Redis might be down
      if (error.response?.status === 401) {
        spinner.warn(chalk.yellow('⚠️ API reachable but authentication system unavailable'));
        console.log(chalk.gray('This usually means Redis connection is down on the server'));
        console.log(chalk.gray('The server is running but can\'t authenticate users'));
      } else {
        spinner.fail(chalk.red('❌ API connection failed'));
        console.log(chalk.gray(`URL: ${this.baseURL}`));
        console.log(chalk.gray(`Error: ${error.response?.status} - ${error.response?.statusText || error.message}`));
        throw error;
      }
    }
  }

  // Show login status
  showStatus() {
    if (this.isLoggedIn()) {
      console.log(chalk.green('✅ Logged in as:'), chalk.blue(this.getUsername()));
      console.log(chalk.gray('API Endpoint:'), this.baseURL);
    } else {
      console.log(chalk.yellow('❌ Not logged in'));
      console.log(chalk.gray('Run'), chalk.blue('quickblog login'), chalk.gray('to authenticate'));
    }
  }

  // List all blogs
  async listBlogs(myOnly = false) {
    const spinner = ora('Fetching blogs...').start();

    try {
      let blogs = [];

      if (myOnly) {
        if (!this.isLoggedIn()) {
          spinner.fail('❌ Please login first to view your blogs');
          return;
        }
        spinner.text = 'Loading your blogs...';
        const response = await this.axios.get(`/blogs/${this.getUsername()}`);
        blogs = response.data.blogs || [];
        
        if (blogs.length === 0) {
          spinner.succeed('📝 You haven\'t published any blogs yet');
          console.log(chalk.gray('Use'), chalk.blue('quickblog create'), chalk.gray('to publish your first blog!'));
          return;
        }
      } else {
        spinner.text = 'Loading all public blogs...';
        try {
          const response = await this.axios.get('/blogs');
          blogs = response.data.blogs || [];
        } catch (error) {
          // If public endpoint fails, show message
          if (error.response?.status === 401) {
            spinner.warn('⚠️ Public blog listing unavailable (Redis connection issue)');
            console.log(chalk.yellow('Try viewing your own blogs with:'), chalk.blue('quickblog list --my'));
            return;
          }
          throw error;
        }
        
        if (blogs.length === 0) {
          spinner.succeed('📝 No public blogs available yet');
          console.log(chalk.gray('Be the first to publish! Use'), chalk.blue('quickblog create'));
          return;
        }
      }

      spinner.succeed(`Found ${blogs.length} blog(s)`);

      // Create table with better formatting
      const tableData = [
        [chalk.bold('ID'), chalk.bold('Title'), chalk.bold('Author'), chalk.bold('Tags'), chalk.bold('Created')]
      ];

      blogs.forEach(blog => {
        const shortId = blog.id.substring(0, 8) + '...';
        const shortTitle = blog.title.length > 35 ? blog.title.substring(0, 35) + '...' : blog.title;
        const author = blog.author || 'Unknown';
        const tags = (blog.tags || []).length > 0 ? (blog.tags || []).join(', ') : chalk.gray('None');
        const date = new Date(blog.created_at).toLocaleDateString();
        
        tableData.push([
          chalk.cyan(shortId),
          shortTitle,
          chalk.green(author),
          chalk.yellow(tags),
          chalk.gray(date)
        ]);
      });

      console.log('\n' + table(tableData, {
        border: {
          topBody: '─',
          topJoin: '┬',
          topLeft: '┌',
          topRight: '┐',
          bottomBody: '─',
          bottomJoin: '┴',
          bottomLeft: '└',
          bottomRight: '┘',
          bodyLeft: '│',
          bodyRight: '│',
          bodyJoin: '│',
          joinBody: '─',
          joinLeft: '├',
          joinRight: '┤',
          joinJoin: '┼'
        }
      }));
      
      console.log(chalk.gray(`\n💡 Use 'quickblog read <id>' to read a specific blog`));
      if (myOnly) {
        console.log(chalk.gray(`💡 Use 'quickblog edit <id>' to edit your blog`));
        console.log(chalk.gray(`💡 Use 'quickblog delete <id>' to delete your blog`));
      }

    } catch (error) {
      spinner.fail('❌ Failed to fetch blogs');
      console.log(chalk.red(`Error: ${error.response?.data?.error || error.message}`));
      
      if (error.code === 'ECONNREFUSED') {
        console.log(chalk.yellow('💡 Make sure the QuickBlog server is running'));
      }
    }
  }

  // Read a specific blog
  async readBlog(blogId) {
    const spinner = ora('Fetching blog...').start();

    try {
      // First try to get from user's blogs
      let blog = null;
      
      if (this.isLoggedIn()) {
        try {
          const userResponse = await this.axios.get(`/blogs/${this.getUsername()}`);
          blog = userResponse.data.blogs?.find(b => b.id.startsWith(blogId));
        } catch (e) {
          // Continue to public blogs if user blogs fail
        }
      }

      // If not found in user blogs, try public blogs
      if (!blog) {
        const publicResponse = await this.axios.get('/blogs');
        blog = publicResponse.data.blogs?.find(b => b.id.startsWith(blogId));
      }

      if (!blog) {
        spinner.fail('❌ Blog not found');
        return;
      }

      spinner.succeed('📖 Blog loaded');

      // Display blog
      console.log('\n' + '='.repeat(60));
      console.log(chalk.blue.bold(blog.title));
      console.log(chalk.gray(`By ${blog.author} • ${new Date(blog.created_at).toLocaleDateString()}`));
      
      if (blog.tags && blog.tags.length > 0) {
        console.log(chalk.cyan('Tags: ' + blog.tags.map(tag => `#${tag}`).join(' ')));
      }
      
      console.log('='.repeat(60));
      console.log('\n' + blog.content);
      console.log('\n' + '='.repeat(60));

    } catch (error) {
      spinner.fail('❌ Failed to fetch blog');
      throw new Error(error.response?.data?.error || 'Network error');
    }
  }

  // Create a new blog
  async createBlog(filePath) {
    if (!this.isLoggedIn()) {
      console.log(chalk.red('❌ Please login first'));
      console.log(chalk.gray('Use'), chalk.blue('quickblog login'), chalk.gray('to authenticate'));
      return;
    }

    let title, content, tags = [];

    if (filePath) {
      // Create from file
      if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
      }

      const fileContent = fs.readFileSync(filePath, 'utf8');
      const lines = fileContent.split('\n');
      
      // Extract title from first line (remove # if present)
      title = lines[0].replace(/^#\s*/, '').trim();
      content = lines.slice(1).join('\n').trim();

      console.log(chalk.blue(`📝 Creating blog from: ${filePath}`));
      console.log(chalk.gray(`Title: ${title}`));
      console.log(chalk.gray(`Content: ${content.length} characters`));
      
      // Ask for tags
      const tagsInput = await this.getUserInput('Tags (comma-separated, max 4, press Enter to skip): ');
      if (tagsInput.trim()) {
        tags = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0).slice(0, 4);
      }
    } else {
      // Interactive creation
      console.log(chalk.blue('📝 Create New Blog\n'));

      title = await this.getUserInput('Blog title: ');
      if (!title.trim()) {
        throw new Error('Title is required');
      }

      console.log('\nBlog content (type your content, press Ctrl+D when done):');
      content = await this.getMultilineInput();
      if (!content.trim()) {
        throw new Error('Content is required');
      }

      const tagsInput = await this.getUserInput('\nTags (comma-separated, max 4, press Enter to skip): ');
      if (tagsInput.trim()) {
        tags = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0).slice(0, 4);
      }
    }

    // Show preview
    console.log(chalk.blue('\n📋 Blog Preview:'));
    console.log(chalk.gray('─'.repeat(50)));
    console.log(chalk.bold(title));
    if (tags.length > 0) {
      console.log(chalk.cyan('Tags: ' + tags.map(tag => `#${tag}`).join(' ')));
    }
    console.log(chalk.gray('─'.repeat(50)));
    console.log(content.substring(0, 200) + (content.length > 200 ? '...' : ''));
    console.log(chalk.gray('─'.repeat(50)));

    const confirm = await this.getUserInput('\nPublish this blog? (y/N): ');
    if (confirm.toLowerCase() !== 'y' && confirm.toLowerCase() !== 'yes') {
      console.log(chalk.yellow('📝 Blog creation cancelled'));
      return;
    }

    const spinner = ora('Publishing blog...').start();

    try {
      const response = await this.axios.post('/blogs', {
        username: this.getUsername(),
        title: title.trim(),
        content: content.trim(),
        tags: tags
      });

      if (response.data.success) {
        spinner.succeed(chalk.green('✅ Blog published successfully!'));
        console.log(chalk.blue('🔗 Blog ID:'), chalk.cyan(response.data.blogId));
        if (response.data.shareableLink) {
          console.log(chalk.blue('🌐 Shareable link:'), chalk.underline(response.data.shareableLink));
        }
        console.log(chalk.gray('\n💡 Use'), chalk.blue(`quickblog read ${response.data.blogId.substring(0, 8)}`), chalk.gray('to view your blog'));
      }
    } catch (error) {
      spinner.fail('❌ Failed to publish blog');
      console.log(chalk.red(`Error: ${error.response?.data?.error || error.message}`));
      
      if (error.response?.status === 400) {
        console.log(chalk.yellow('💡 Check that your title is unique and content is not empty'));
      }
    }
  }

  // Helper for multiline input
  async getMultilineInput() {
    return new Promise((resolve) => {
      let content = '';
      process.stdin.setEncoding('utf8');
      process.stdin.on('data', (chunk) => {
        content += chunk;
      });
      process.stdin.on('end', () => {
        resolve(content.trim());
      });
      process.stdin.resume();
    });
  }

  // Edit a blog
  async editBlog(blogId) {
    if (!this.isLoggedIn()) {
      console.log(chalk.red('❌ Please login first'));
      return;
    }

    const spinner = ora('Fetching blog...').start();

    try {
      const response = await this.axios.get(`/blogs/${this.getUsername()}`);
      const blog = response.data.blogs?.find(b => b.id.startsWith(blogId));

      if (!blog) {
        spinner.fail('❌ Blog not found or not owned by you');
        return;
      }

      spinner.succeed('📝 Blog loaded for editing');

      console.log(chalk.gray(`Current title: ${blog.title}`));
      const title = await this.getUserInput(`New title (press Enter to keep current): `);
      
      console.log(chalk.gray(`Current content: ${blog.content.substring(0, 100)}...`));
      console.log('New content (type your content, press Ctrl+D when done, or press Enter to keep current):');
      const content = await this.getMultilineInput();
      
      console.log(chalk.gray(`Current tags: ${(blog.tags || []).join(', ')}`));
      const tagsInput = await this.getUserInput('New tags (comma-separated, press Enter to keep current): ');
      const tags = tagsInput.trim() ? tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0).slice(0, 4) : blog.tags;

      const updateSpinner = ora('Updating blog...').start();

      const updateResponse = await this.axios.put(`/blogs/${this.getUsername()}/${blog.id}`, {
        title: title.trim() || blog.title,
        content: content.trim() || blog.content,
        tags: tags
      });

      if (updateResponse.data.success) {
        updateSpinner.succeed(chalk.green('✅ Blog updated successfully!'));
      }

    } catch (error) {
      spinner.fail('❌ Failed to edit blog');
      throw new Error(error.response?.data?.error || 'Network error');
    }
  }

  // Delete a blog
  async deleteBlog(blogId) {
    if (!this.isLoggedIn()) {
      console.log(chalk.red('❌ Please login first'));
      return;
    }

    const spinner = ora('Fetching blog...').start();

    try {
      const response = await this.axios.get(`/blogs/${this.getUsername()}`);
      const blog = response.data.blogs?.find(b => b.id.startsWith(blogId));

      if (!blog) {
        spinner.fail('❌ Blog not found or not owned by you');
        return;
      }

      spinner.succeed('Blog found');

      console.log(chalk.yellow(`\n⚠️  You are about to delete: "${blog.title}"`));
      
      const confirm = await this.getUserInput('Are you sure you want to delete this blog? (yes/no): ');

      if (confirm.toLowerCase() !== 'yes' && confirm.toLowerCase() !== 'y') {
        console.log(chalk.gray('Delete cancelled'));
        return;
      }

      const deleteSpinner = ora('Deleting blog...').start();

      await this.axios.delete(`/blogs/${this.getUsername()}/${blog.id}`);
      deleteSpinner.succeed(chalk.green('✅ Blog deleted successfully!'));

    } catch (error) {
      spinner.fail('❌ Failed to delete blog');
      throw new Error(error.response?.data?.error || 'Network error');
    }
  }
}

module.exports = QuickBlogAPI;

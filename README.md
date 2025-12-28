# QuickBlog CLI API Client 🚀

<div align="center">

![QuickBlog CLI](https://img.shields.io/badge/QuickBlog%20CLI-API%20Client-6366f1?style=for-the-badge&logo=terminal&logoColor=white)

**Command-line API client for anonymous blogging - No signup required**

[![CLI Tool](https://img.shields.io/badge/⚡-CLI%20Powered-blue?style=for-the-badge)](#)
[![No Signup](https://img.shields.io/badge/🔓-Anonymous%20Publishing-green?style=for-the-badge)](#)
[![Session Based](https://img.shields.io/badge/📱-Session%20Management-orange?style=for-the-badge)](#)

*Anonymous blogging made simple - Just write and publish instantly*

<img width="450" height="587" alt="image" src="https://github.com/user-attachments/assets/913d73a8-a13b-463a-a249-bb20062a23d3" />
<img width="450" height="604" alt="image" src="https://github.com/user-attachments/assets/8ce9e2b0-f1ad-49d9-9c5b-87f860d31611" />



</div>

---

## 🎯 **What is QuickBlog CLI?**

A powerful command-line API client that connects to the QuickBlog platform for anonymous blogging. No accounts, no passwords - just install, write, and publish instantly to the live website, and get shareable links.

### ✨ **Key Features**
- **🚀 No Authentication Needed** - No registration or authentication required
- **⚡ Instant Publishing** - Blogs appear live immediately
- **📱 Session Management** - Edit/delete your blogs during session
- **🎨 Beautiful CLI** - Colorful, interactive interface with ASCII art
- **📝 Markdown Support** - Create from markdown files
- **🏷️ Smart Tagging** - Choose from 10 predefined tags
- **🌈 Visual Interface** - Well-structured layout & components

---

## 🚀 **Quick Start**

```bash
# Install
git clone https://github.com/Divya4879/QuickBlog-API.git
cd quickBlogAPI
npm install

# Initialize with beautiful ASCII banner
quickblog init

# Create your first blog (interactive)
quickblog create

# View all blogs in beautiful table format
quickblog list
```

---

## 📋 **Complete Command Reference**

### **🔧 Setup & Status Commands**

```bash
# Initialize CLI session with ASCII banner
quickblog init

# Test API connection and server status
quickblog test

# Show session status and your published blogs
quickblog status

# Clear current session data
quickblog clear

# Show help and all available commands
quickblog --help
```

### **📖 Reading & Discovery Commands**

```bash
# List all published blogs (beautiful table format)
quickblog list

# List only your session blogs
quickblog list --session
quickblog list -s

# Read specific blog with formatted display
quickblog read 12345678
```

### **✍️ Content Creation Commands**

```bash
# Create new blog (interactive mode with prompts)
quickblog create

# Create blog from markdown file
quickblog create --file blog.md
quickblog create -f sample-post.md
```

### **✏️ Blog Management Commands**

```bash
# Edit your blog (only from current session)
quickblog edit 12345678

# Delete your blog (only from current session)
quickblog delete 12345678
```

---

## 🎨 **Interactive Blog Creation Flow**

When you run `quickblog create`, you'll experience a beautiful interactive flow:

### **Step 1: Title**
```
📌 Blog title: My Amazing Blog Post
```

### **Step 2: Tag Selection**
```
🏷️  Available tags:
1. tech        2. career      3. personal    4. review      5. tutorial
6. startup     7. coding      8. life        9. business    10. education

Select tags (1-4 numbers separated by commas, or press Enter to skip): 1,5,7
```

### **Step 3: Author**
```
👤 Author name: John Doe
```

### **Step 4: Content Input**
```
📝 Blog content:
Type your content. When finished, type "END_BLOG" on a new line and press Enter.
────────────────────────────────────────────────────────────

This is my blog content...
I can write multiple paragraphs...

END_BLOG
```

### **Step 5: Preview & Publish**
```
📋 Blog Preview:
════════════════════════════════════════════════════════════
My Amazing Blog Post
👤 By John Doe
🏷️  Tags: #tech #tutorial #coding
────────────────────────────────────────────────────────────
This is my blog content...
════════════════════════════════════════════════════════════

🚀 Publish this blog on the site? (yes/no): yes
```

---

## 📋 **Complete Commands List**

```bash
# Setup & Status
quickblog init          # Initialize with ASCII banner
quickblog test          # Test API connection
quickblog status        # Show session status
quickblog clear         # Clear session data
quickblog --help        # Show help

# Reading & Discovery
quickblog list          # List all published blogs
quickblog list -s       # List your session blogs only
quickblog read <id>     # Read specific blog

# Content Creation & Management
quickblog create        # Create blog (interactive)
quickblog create -f <file>  # Create from markdown file
quickblog edit <id>     # Edit your blog
quickblog delete <id>   # Delete your blog
```

**Note:** After `npm install -g .` you can use just `quickblog` instead of `node bin/quickblog.js`

---

## 🎯 **Detailed Command Examples**

### **Initialize CLI**
```bash
quickblog init
```
Shows rainbow ASCII banner and welcome message with available actions.

### **Test Connection**
```bash
quickblog test
```
```
⠋ Testing API connection...
✅ API connection successful!
Connected to: https://quick-blog-black-one.vercel.app
```

### **Check Status**
```bash
quickblog status
```
```
📊 QuickBlog API Status

API Endpoint: https://quick-blog-black-one.vercel.app
Session Blogs: 2

Blogs published in this session:
1. My Amazing Tech Tutorial (17353445...)
2. Getting Started with APIs (17353446...)
```

### **List All Blogs**
```bash
quickblog list
```
Shows table with all published blogs, including ID, title, author, and links.

### **Read Specific Blog**
```bash
quickblog read 17353445
```
Displays formatted blog with title, author, date, tags, content, word count, and action buttons.

### **Interactive Blog Creation**
```bash
quickblog create
```

**Complete Interactive Flow:**
```
📝 Create New Blog

📌 Blog title: My Tech Tutorial

🏷️  Available tags:
1. tech    2. career   3. personal  4. review    5. tutorial
6. startup 7. coding   8. life      9. business  10. education

Select tags (1-4 numbers, comma-separated): 1,5,7

👤 Author name: John Developer

📝 Blog content:
Type your content. When finished, type "END_BLOG" on a new line.
────────────────────────────────────────────────────────────

Welcome to my comprehensive CLI tutorial!

## Getting Started
First, install Node.js and set up your project.

## Building Commands
Use commander.js for CLI structure.

Happy coding!

END_BLOG

📋 Blog Preview:
════════════════════════════════════════════════════════════
My Tech Tutorial
👤 By John Developer
🏷️  Tags: #tech #tutorial #coding
────────────────────────────────────────────────────────────
Welcome to my comprehensive CLI tutorial!
...
════════════════════════════════════════════════════════════

🚀 Publish this blog on the site? (yes/no): yes

⠋ Publishing blog to site...
✅ Blog published successfully!
🆔 Blog ID: 1735344567890
🌐 Live Link: https://quick-blog-black-one.vercel.app/article/my-tech-tutorial
```

### **Create from Markdown File**
```bash
quickblog create --file tutorial.md
```
Reads markdown file, extracts title from first heading, prompts for tags and author, then publishes.

### **Edit Blog**
```bash
quickblog edit 17353445
```
Shows current content, prompts for new title, author, content (with END_BLOG), and tags. Only works for session blogs.

### **Delete Blog**
```bash
quickblog delete 17353445
```
```
⚠️  You are about to delete: "My Tech Tutorial"
Are you sure? (yes/no): yes

⠋ Deleting blog...
✅ Blog deleted from website and session!
```

### **Available Tags**
1. **tech** - Technology and programming
2. **career** - Career advice  
3. **personal** - Personal stories
4. **review** - Product reviews
5. **tutorial** - How-to guides
6. **startup** - Entrepreneurship
7. **coding** - Development
8. **life** - Life experiences
9. **business** - Business insights
10. **education** - Learning content

**Usage:** Enter numbers 1-4, comma-separated (e.g., `1,5,7`)

---

## 🛠️ **Technical Architecture**

### **Core Dependencies**
```javascript
const dependencies = {
  "commander": "^11.1.0",      // Command-line interface
  "axios": "^1.6.2",           // HTTP client for API calls
  "conf": "^10.2.0",           // Local session storage
  "ora": "^5.4.1",             // Loading spinners
  "picocolors": "^1.0.0",      // Terminal colors
  "cli-table3": "^0.6.3",      // Beautiful table output
  "boxen": "^5.1.2",           // Terminal boxes
  "figlet": "^1.7.0",          // ASCII art banners
  "gradient-string": "^2.0.2"  // Gradient text effects
}
```

### **QuickBlogAPI Class Structure**

```javascript
class QuickBlogAPI {
  constructor() {
    this.baseURL = 'https://quick-blog-black-one.vercel.app';
    this.config = new Conf({ projectName: 'quickblog-api' });
    this.sessionBlogs = []; // Local session management
  }
  
  // Core API Methods
  async init()                    // Initialize with ASCII banner
  async testConnection()          // Test API connectivity
  async createBlog(filePath)      // Interactive or file-based creation
  async listBlogs(sessionOnly)    // Beautiful table display
  async readBlog(blogId)          // Formatted blog reading
  async editBlog(blogId)          // Session-based editing
  async deleteBlog(blogId)        // Session-based deletion
  async getUserInput(question)    // Interactive prompts
  async getContentWithEndCommand() // Multi-line content input
}
```

---

## 🎯 **CLI Features Deep Dive**

### **🎨 Beautiful Visual Interface**
- **ASCII Art Banner** - Figlet-powered startup screen with rainbow gradients
- **Loading Spinners** - Ora spinners for async operations
- **Formatted Tables** - CLI-table3 for professional blog listings
- **Color-coded Output** - Picocolors for status messages
- **Boxed Messages** - Boxen for important notifications

### **📱 Session Management**
- **Local Storage** - Uses `conf` package for persistent session data
- **Blog Tracking** - Remembers blogs you publish in current session
- **Edit/Delete Permissions** - Only modify your own session blogs
- **Session Persistence** - Data survives CLI restarts

### **📝 Content Creation Options**
- **Interactive Mode** - Step-by-step prompts with validation
- **Markdown File Support** - Create from existing .md files
- **Tag System** - 10 predefined tags to choose from
- **Content Preview** - See formatted blog before publishing
- **Multi-line Input** - Special "END_BLOG" command for content

### **🔍 Smart Blog Display**
- **Table Format** - Professional listing with ID, title, author, links
- **Blog Statistics** - Word count, tag summary, author count
- **Formatted Reading** - Beautiful blog display with proper spacing
- **URL Generation** - Automatic shareable link creation

---

## 📄 **Markdown File Format**

Create blogs from markdown files with this structure:

````markdown
# Your Blog Title

Your blog content goes here with full **markdown** support.

## Subheadings Work

- Bullet points
- Lists are supported
- Multiple paragraphs

### Code Blocks Too

```javascript
console.log("Hello World!");
```

Regular text and all standard markdown formatting is supported.
````

---

## 🔄 **Complete Workflow Examples**

### **Example 1: First-Time User**
```bash
# Setup
cd quickBlogAPI
npm install
quickblog init

# Test connection
quickblog test

# Explore existing content
quickblog list

# Create your first blog
quickblog create
# Follow interactive prompts...

# Check your session
quickblog list --session

# Read your published blog
quickblog read 12345678
```

### **Example 2: Markdown Publishing**
```bash
# Create markdown file
echo "# My Tech Tutorial

This is a comprehensive guide to...

## Getting Started
1. Install the tools
2. Configure your environment
3. Start coding!

Happy coding! 🚀" > tutorial.md

# Publish from file
quickblog create --file tutorial.md
```

### **Example 3: Blog Management**
```bash
# Check your session status
quickblog status

# List your blogs
quickblog list --session

# Edit a blog
quickblog edit 12345678
# Follow prompts to update content...

# Delete a blog
quickblog delete 12345678

# Clear session when done
quickblog clear
```

---

## 🌟 **Advanced CLI Features**

### **🎨 Visual Elements**
```bash
# Rainbow ASCII banner on init
 ██████╗ ██╗   ██╗██╗ ██████╗██╗  ██╗██████╗ ██╗      ██████╗  ██████╗ 
██╔═══██╗██║   ██║██║██╔════╝██║ ██╔╝██╔══██╗██║     ██╔═══██╗██╔════╝ 
██║   ██║██║   ██║██║██║     █████╔╝ ██████╔╝██║     ██║   ██║██║  ███╗
██║▄▄ ██║██║   ██║██║██║     ██╔═██╗ ██╔══██╗██║     ██║   ██║██║   ██║
╚██████╔╝╚██████╔╝██║╚██████╗██║  ██╗██████╔╝███████╗╚██████╔╝╚██████╔╝
 ╚══▀▀═╝  ╚═════╝ ╚═╝ ╚═════╝╚═╝  ╚═╝╚═════╝ ╚══════╝ ╚═════╝  ╚═════╝ 

# Beautiful table output for blog listings
┌─────┬──────────┬────────────────────────────────┬──────────────────────┬─────────────────────────────────────┐
│ No. │ ID       │ Title                          │ Author               │ Link                                │
├─────┼──────────┼────────────────────────────────┼──────────────────────┼─────────────────────────────────────┤
│ 1   │ 12345678 │ My Amazing Blog Post           │ John Doe             │ https://quick-blog.../article/my... │
└─────┴──────────┴────────────────────────────────┴──────────────────────┴─────────────────────────────────────┘

# Loading spinners for async operations
⠋ Publishing blog to site...
✅ Blog published successfully!
```

### **📊 Smart Analytics Display**
```bash
📊 Summary:
   • Total blogs: 15
   • Authors: 8
   • Tags used: 12

💡 Quick Actions:
   📖 Read: quickblog read <id>
   ✏️  Create: quickblog create
   📋 Session: quickblog list --session
```

### **🔒 Session-Based Permissions**
- Only blogs from your current session can be edited/deleted
- Session data persists between CLI runs
- Clear session to reset permissions
- Visual indicators for your blogs vs public blogs

---

## 🔍 **Troubleshooting Guide**

### **Connection Issues**
```bash
# Test connectivity
quickblog test

# Check status
quickblog status
```

**Common Solutions:**
- Ensure internet connection is stable
- Server might be temporarily unavailable
- Try again in a few moments

### **Publishing Problems**
- Check that all required fields are filled
- Ensure title is unique
- Verify content is not empty
- Try again if server is busy

### **Session Management Issues**
```bash
# Check session
quickblog status

# Reset session
quickblog clear

# List session blogs
quickblog list --session
```

**Remember:** Only blogs from your current session can be edited/deleted

---

## 🛠️ **Development & Testing**

### **Development Setup**
```bash
# Clone and setup
git clone https://github.com/Divya4879/QuickBlog-API.git
cd quickBlogAPI
npm install

# Test the API client
node test.js

# Run any command
quickblog --help
```

### **Testing Commands**
```bash
# Test API connection
quickblog test

# Test blog creation from file
quickblog create --file sample-post.md

# Test session management
quickblog status
```

---

## 📊 **Performance & Reliability**

### **CLI Performance**
- **Fast Startup** - < 1 sec initialization
- **Responsive UI** - Immediate command feedback
- **Efficient Storage** - Minimal local data footprint
- **Error Handling** - Graceful failure recovery

### **API Reliability**
- **Timeout Handling** - 15-sec request timeout
- **Error Recovery** - Detailed error messages
- **Connection Testing** - Built-in connectivity checks
- **Session Persistence** - Survives network issues

---

## 🎯 **Use Cases**

### **👨‍💻 For Developers**
- **Code Tutorials** - Share programming knowledge
- **Project Updates** - Document development progress
- **Technical Insights** - Share coding experiences
- **Quick Notes** - Rapid idea sharing

### **✍️ For Writers**
- **Anonymous Blogging** - Share thoughts without identity
- **Quick Publishing** - Instant content sharing
- **Draft Testing** - Test content before main blog
- **Community Engagement** - Connect with readers

---

## 🚀 **Getting Started Checklist**

- [ ] **Clone repository** - `git clone https://github.com/Divya4879/QuickBlog-API.git`
- [ ] **Install dependencies** - `npm install`
- [ ] **Initialize CLI** - `quickblog init`
- [ ] **Test connection** - `quickblog test`
- [ ] **Explore commands** - `quickblog --help`

---

## 🌐 **API Endpoint**

**Connected to:** https://quick-blog-black-one.vercel.app

Your blogs published through this CLI appear instantly on the live website.

---

## 📄 **License**

MIT License - Feel free to use, modify, and distribute.

---

<div align="center">

**Built for anonymous creators and instant publishers** ✍️

</div>

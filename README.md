# QuickBlog CLI API Client 🚀

<div align="center">

![QuickBlog CLI](https://img.shields.io/badge/QuickBlog%20CLI-API%20Client-6366f1?style=for-the-badge&logo=terminal&logoColor=white)

**Command-line API client for anonymous blogging - No signup required**

[![CLI Tool](https://img.shields.io/badge/⚡-CLI%20Powered-blue?style=for-the-badge)](#)
[![No Signup](https://img.shields.io/badge/🔓-Anonymous%20Publishing-green?style=for-the-badge)](#)
[![Session Based](https://img.shields.io/badge/📱-Session%20Management-orange?style=for-the-badge)](#)

*Anonymous blogging made simple - Just write and publish instantly*

</div>

---

## 🎯 **What is QuickBlog CLI?**

A powerful command-line API client that connects to the QuickBlog platform for anonymous blogging. No accounts, no passwords - just install, write, and publish instantly to the live website.

### ✨ **Key Features**
- **🚀 Zero Setup** - No registration or authentication required
- **⚡ Instant Publishing** - Blogs appear live immediately
- **📱 Session Management** - Edit/delete your blogs during session
- **🎨 Beautiful CLI** - Colorful, interactive interface with ASCII art
- **📝 Markdown Support** - Create from markdown files
- **🏷️ Smart Tagging** - Choose from 10 predefined tags
- **🌈 Visual Interface** - Gradients, tables, spinners, and colors

---

## 🚀 **Quick Start**

```bash
# Install
git clone <repo-url>
cd quickBlogAPI
npm install

# Initialize with beautiful ASCII banner
node bin/quickblog.js init

# Create your first blog (interactive)
node bin/quickblog.js create

# View all blogs in beautiful table format
node bin/quickblog.js list
```

---

## 📋 **Complete Command Reference**

### **🔧 Setup & Status Commands**

```bash
# Initialize CLI session with ASCII banner
node bin/quickblog.js init

# Test API connection and server status
node bin/quickblog.js test

# Show session status and your published blogs
node bin/quickblog.js status

# Clear current session data
node bin/quickblog.js clear

# Show help and all available commands
node bin/quickblog.js --help
```

### **📖 Reading & Discovery Commands**

```bash
# List all published blogs (beautiful table format)
node bin/quickblog.js list

# List only your session blogs
node bin/quickblog.js list --session
node bin/quickblog.js list -s

# Read specific blog with formatted display
node bin/quickblog.js read 12345678
```

### **✍️ Content Creation Commands**

```bash
# Create new blog (interactive mode with prompts)
node bin/quickblog.js create

# Create blog from markdown file
node bin/quickblog.js create --file blog.md
node bin/quickblog.js create -f sample-post.md
```

### **✏️ Blog Management Commands**

```bash
# Edit your blog (only from current session)
node bin/quickblog.js edit 12345678

# Delete your blog (only from current session)
node bin/quickblog.js delete 12345678
```

---

## 🎨 **Interactive Blog Creation Flow**

When you run `node bin/quickblog.js create`, you'll experience a beautiful interactive flow:

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

## 📋 **Complete API Commands Guide**

### **🚀 Installation & Setup**

```bash
# Clone and install
git clone <repo-url>
cd quickBlogAPI
npm install

# Initialize CLI (shows ASCII banner)
node bin/quickblog.js init
```

### **📋 All Available Commands**

#### **🔧 Setup & Status Commands**

```bash
# Initialize CLI session with rainbow ASCII banner
node bin/quickblog.js init

# Test API connection and server status
node bin/quickblog.js test

# Show session status and published blogs count
node bin/quickblog.js status

# Clear current session data
node bin/quickblog.js clear

# Show help and all available commands
node bin/quickblog.js --help
```

#### **📖 Reading & Discovery Commands**

```bash
# List all published blogs (beautiful table format)
node bin/quickblog.js list

# List only your session blogs
node bin/quickblog.js list --session
node bin/quickblog.js list -s

# Read specific blog with formatted display
node bin/quickblog.js read 12345678
node bin/quickblog.js read abcd1234
```

#### **✍️ Content Creation Commands**

```bash
# Create new blog (interactive mode)
node bin/quickblog.js create

# Create blog from markdown file
node bin/quickblog.js create --file blog.md
node bin/quickblog.js create -f sample-post.md
```

#### **✏️ Blog Management Commands**

```bash
# Edit your blog (only from current session)
node bin/quickblog.js edit 12345678

# Delete your blog (only from current session)
node bin/quickblog.js delete 12345678
```

### **🎨 Interactive Blog Creation - Complete Flow**

#### **Command:**
```bash
node bin/quickblog.js create
```

#### **Step-by-Step Interactive Process:**

**Step 1: Title Input**
```
📝 Create New Blog

📌 Blog title: My Amazing Tech Tutorial
```

**Step 2: Tag Selection**
```
🏷️  Available tags:
1. tech        2. career      3. personal    4. review      5. tutorial
6. startup     7. coding      8. life        9. business    10. education

Select tags (1-4 numbers separated by commas, or press Enter to skip): 1,5,7
```

**Step 3: Author Name**
```
👤 Author name: John Developer
```
*Note: Leave blank for "Anonymous"*

**Step 4: Content Input**
```
📝 Blog content:
Type your content. When finished, type "END_BLOG" on a new line and press Enter.
────────────────────────────────────────────────────────────

Welcome to my comprehensive guide on building CLI tools!

## Getting Started

First, you'll need to set up your development environment:

1. Install Node.js
2. Create a new project
3. Add dependencies

## Building the CLI

Here's how to create your first command:

```javascript
const { program } = require('commander');
program.parse();
```

This tutorial will walk you through everything step by step.

Happy coding!

END_BLOG
```

**Step 5: Preview**
```
📋 Blog Preview:
════════════════════════════════════════════════════════════
My Amazing Tech Tutorial
👤 By John Developer
🏷️  Tags: #tech #tutorial #coding
────────────────────────────────────────────────────────────
Welcome to my comprehensive guide on building CLI tools!

## Getting Started

First, you'll need to set up your development environment:
...
════════════════════════════════════════════════════════════
```

**Step 6: Confirmation**
```
🚀 Publish this blog on the site? (yes/no): yes
```

**Step 7: Publishing**
```
⠋ Publishing blog to site...
✅ Blog published successfully!
🆔 Blog ID: 1735344567890
🌐 Live Link: https://quick-blog-black-one.vercel.app/article/my-amazing-tech-tutorial
📱 Your blog is now live on the website!

💡 Session Commands:
📖 Read: quickblog read 17353445
✏️  Edit: quickblog edit 17353445
🗑️  Delete: quickblog delete 17353445
```

### **📄 Creating from Markdown File**

#### **Command:**
```bash
node bin/quickblog.js create --file tutorial.md
```

#### **Markdown File Format:**
```markdown
# My Blog Title

Your content goes here with **markdown** support.

## Subheadings Work

- Bullet points
- Lists are supported
- Multiple paragraphs

### Code Blocks Too

```javascript
console.log("Hello World!");
```

Regular text and all standard markdown formatting.
```

#### **Interactive Flow for File Creation:**
```
📝 Creating blog from: tutorial.md
Title: My Blog Title

🏷️  Available tags:
1. tech        2. career      3. personal    4. review      5. tutorial
6. startup     7. coding      8. life        9. business    10. education

Select tags (1-4 numbers separated by commas, or press Enter to skip): 1,5

👤 Author name: Jane Doe

📋 Blog Preview:
════════════════════════════════════════════════════════════
My Blog Title
👤 By Jane Doe
🏷️  Tags: #tech #tutorial
────────────────────────────────────────────────────────────
Your content goes here with markdown support...
════════════════════════════════════════════════════════════

🚀 Publish this blog on the site? (yes/no): yes

⠋ Publishing blog to site...
✅ Blog published successfully!
```

### **📊 List Command - Detailed Output**

#### **Command:**
```bash
node bin/quickblog.js list
```

#### **Output:**
```
⠋ Fetching blogs...
✅ Found 5 published blog(s)

📚 Published Blogs
═══════════════════════════════════════════════════════════════════════════════

┌─────┬──────────┬────────────────────────────────┬──────────────────────┬─────────────────────────────────────┐
│ No. │ ID       │ Title                          │ Author               │ Link                                │
├─────┼──────────┼────────────────────────────────┼──────────────────────┼─────────────────────────────────────┤
│ 1   │ 17353445 │ My Amazing Tech Tutorial       │ John Developer       │ ...quick-blog.../article/my-amaz... │
│ 2   │ 17353446 │ Getting Started with APIs     │ Jane Doe             │ ...quick-blog.../article/getting... │
│ 3   │ 17353447 │ Personal Journey in Tech       │ Anonymous            │ ...quick-blog.../article/personal.. │
└─────┴──────────┴────────────────────────────────┴──────────────────────┴─────────────────────────────────────┘

📊 Summary:
   • Total blogs: 3
   • Authors: 2
   • Tags used: 8

💡 Quick Actions:
   📖 Read: quickblog read <id>
   ✏️  Create: quickblog create
   📋 Session: quickblog list --session
   🌐 Website: https://quick-blog-black-one.vercel.app/discover.html
```

### **📖 Read Command - Detailed Output**

#### **Command:**
```bash
node bin/quickblog.js read 17353445
```

#### **Output:**
```
⠋ Fetching blog...
📖 Blog loaded

════════════════════════════════════════════════════════════════════════════════
📖 My Amazing Tech Tutorial
👤 By John Developer • 📅 12/28/2025
🏷️  #tech #tutorial #coding
════════════════════════════════════════════════════════════════════════════════

Welcome to my comprehensive guide on building CLI tools!

## Getting Started

First, you'll need to set up your development environment:

1. Install Node.js
2. Create a new project
3. Add dependencies

## Building the CLI

Here's how to create your first command:

```javascript
const { program } = require('commander');
program.parse();
```

This tutorial will walk you through everything step by step.

Happy coding!

════════════════════════════════════════════════════════════════════════════════
📊 Word count: 45 words
🆔 Blog ID: 1735344567890
🌐 Blog Link: https://quick-blog-black-one.vercel.app/article/my-amazing-tech-tutorial

💡 Your Blog Actions:
   ✏️  Edit: quickblog edit 17353445
   🗑️  Delete: quickblog delete 17353445
```

### **✏️ Edit Command - Interactive Flow**

#### **Command:**
```bash
node bin/quickblog.js edit 17353445
```

#### **Interactive Process:**
```
📝 Editing: My Amazing Tech Tutorial

Title (My Amazing Tech Tutorial): Updated Tech Tutorial Guide
Author (John Developer): John Developer

📝 Current content:
════════════════════════════════════════════════════════════
Welcome to my comprehensive guide on building CLI tools!

## Getting Started

First, you'll need to set up your development environment:

1. Install Node.js
2. Create a new project
3. Add dependencies

## Building the CLI

Here's how to create your first command:

```javascript
const { program } = require('commander');
program.parse();
```

This tutorial will walk you through everything step by step.

Happy coding!
════════════════════════════════════════════════════════════

Type new content (or press Enter to keep current content):
When finished, type "END_BLOG" on a new line and press Enter.

Welcome to my UPDATED comprehensive guide on building CLI tools!

## What's New in This Version

I've added more examples and better explanations.

## Getting Started

First, you'll need to set up your development environment:

1. Install Node.js (version 16+)
2. Create a new project
3. Add dependencies
4. Set up your project structure

## Building the CLI

Here's how to create your first command:

```javascript
const { program } = require('commander');

program
  .name('my-cli')
  .description('My awesome CLI tool')
  .version('1.0.0');

program.parse();
```

This updated tutorial includes more detailed examples.

Happy coding!

END_BLOG

Tags (tech, tutorial, coding): tech, tutorial, coding, nodejs

⠋ Updating blog...
✅ Blog updated successfully!
```

### **🗑️ Delete Command - Interactive Flow**

#### **Command:**
```bash
node bin/quickblog.js delete 17353445
```

#### **Interactive Process:**
```
⚠️  You are about to delete: "My Amazing Tech Tutorial"
Are you sure you want to delete this blog? (yes/no): yes

⠋ Deleting blog...
✅ Blog deleted from website and session!
```

### **📊 Status Command - Detailed Output**

#### **Command:**
```bash
node bin/quickblog.js status
```

#### **Output:**
```
📊 QuickBlog API Status

API Endpoint: https://quick-blog-black-one.vercel.app
Session Blogs: 2

Blogs published in this session:
1. My Amazing Tech Tutorial (17353445...)
2. Getting Started with APIs (17353446...)

💡 Use quickblog list --session to see your session blogs
```

### **🧪 Test Command - Connection Check**

#### **Command:**
```bash
node bin/quickblog.js test
```

#### **Successful Output:**
```
🧪 Testing QuickBlog API Connection

⠋ Testing API connection...
✅ API connection successful!
Connected to: https://quick-blog-black-one.vercel.app
```

### **🔧 Init Command - Startup Banner**

#### **Command:**
```bash
node bin/quickblog.js init
```

#### **Output:**
```
 ██████╗ ██╗   ██╗██╗ ██████╗██╗  ██╗██████╗ ██╗      ██████╗  ██████╗ 
██╔═══██╗██║   ██║██║██╔════╝██║ ██╔╝██╔══██╗██║     ██╔═══██╗██╔════╝ 
██║   ██║██║   ██║██║██║     █████╔╝ ██████╔╝██║     ██║   ██║██║  ███╗
██║▄▄ ██║██║   ██║██║██║     ██╔═██╗ ██╔══██╗██║     ██║   ██║██║   ██║
╚██████╔╝╚██████╔╝██║╚██████╗██║  ██╗██████╔╝███████╗╚██████╔╝╚██████╔╝
 ╚══▀▀═╝  ╚═════╝ ╚═╝ ╚═════╝╚═╝  ╚═╝╚═════╝ ╚══════╝ ╚═════╝  ╚═════╝ 

┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   🚀 QuickBlog API Initialized!                                            │
│                                                                             │
│   Welcome! You can now:                                                    │
│   • View all published blogs                                               │
│   • Create and publish new blogs                                           │
│   • Edit/delete blogs from this session                                    │
│                                                                             │
│   Use --help to see all commands                                           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### **🏷️ Available Tags**

When creating or editing blogs, you can choose from these 10 tags:

1. **tech** - Technology and programming
2. **career** - Career advice and experiences
3. **personal** - Personal stories and thoughts
4. **review** - Product or service reviews
5. **tutorial** - How-to guides and tutorials
6. **startup** - Startup and entrepreneurship
7. **coding** - Programming and development
8. **life** - Life experiences and philosophy
9. **business** - Business insights and strategies
10. **education** - Learning and educational content

**Usage:** Select 1-4 tags by entering numbers separated by commas (e.g., `1,5,7`)

### **🔍 Error Handling Examples**

#### **Blog Not Found:**
```bash
node bin/quickblog.js read 99999999
```
```
⠋ Fetching blog...
❌ Blog not found
```

#### **Edit Permission Denied:**
```bash
node bin/quickblog.js edit 12345678
```
```
❌ Blog not found in this session
You can only edit blogs published in this session
Use quickblog list --session to see your session blogs
```

#### **Connection Error:**
```bash
node bin/quickblog.js list
```
```
⠋ Fetching blogs...
❌ Failed to fetch blogs
Error: 500 - Internal Server Error
Message: Database connection failed
```

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

```markdown
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
```

---

## 🔄 **Complete Workflow Examples**

### **Example 1: First-Time User**
```bash
# Setup
cd quickBlogAPI
npm install
node bin/quickblog.js init

# Test connection
node bin/quickblog.js test

# Explore existing content
node bin/quickblog.js list

# Create your first blog
node bin/quickblog.js create
# Follow interactive prompts...

# Check your session
node bin/quickblog.js list --session

# Read your published blog
node bin/quickblog.js read 12345678
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
node bin/quickblog.js create --file tutorial.md
```

### **Example 3: Blog Management**
```bash
# Check your session status
node bin/quickblog.js status

# List your blogs
node bin/quickblog.js list --session

# Edit a blog
node bin/quickblog.js edit 12345678
# Follow prompts to update content...

# Delete a blog
node bin/quickblog.js delete 12345678

# Clear session when done
node bin/quickblog.js clear
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
node bin/quickblog.js test

# Check status
node bin/quickblog.js status
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
node bin/quickblog.js status

# Reset session
node bin/quickblog.js clear

# List session blogs
node bin/quickblog.js list --session
```

**Remember:** Only blogs from your current session can be edited/deleted

---

## 🛠️ **Development & Testing**

### **Development Setup**
```bash
# Clone and setup
git clone <repo-url>
cd quickBlogAPI
npm install

# Test the API client
node test.js

# Run any command
node bin/quickblog.js --help
```

### **Testing Commands**
```bash
# Test API connection
node bin/quickblog.js test

# Test blog creation from file
node bin/quickblog.js create --file sample-post.md

# Test session management
node bin/quickblog.js status
```

---

## 📊 **Performance & Reliability**

### **CLI Performance**
- **Fast Startup** - < 1 second initialization
- **Responsive UI** - Immediate command feedback
- **Efficient Storage** - Minimal local data footprint
- **Error Handling** - Graceful failure recovery

### **API Reliability**
- **Timeout Handling** - 15-second request timeout
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

### **🎓 For Educators**
- **Course Content** - Share educational materials
- **Student Resources** - Provide learning materials
- **Quick Announcements** - Instant communication
- **Knowledge Sharing** - Build educational content

---

## 🚀 **Getting Started Checklist**

- [ ] **Clone repository** - `git clone <repo-url>`
- [ ] **Install dependencies** - `npm install`
- [ ] **Initialize CLI** - `node bin/quickblog.js init`
- [ ] **Test connection** - `node bin/quickblog.js test`
- [ ] **Create first blog** - `node bin/quickblog.js create`
- [ ] **Explore commands** - `node bin/quickblog.js --help`

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

*No signup • No limits • Just pure blogging freedom*

</div>

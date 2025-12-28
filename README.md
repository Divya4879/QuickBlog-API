# QuickBlog API Client

A powerful CLI tool for anonymous blogging on the QuickBlog platform. No signup required - just download, install, and start publishing!

## 🚀 Quick Start

```bash
# Clone the API client
git clone <repo-url>
cd quickBlogAPI

# Install dependencies
npm install

# Initialize the API
node bin/quickblog.js init

# View all published blogs
node bin/quickblog.js list

# Create your first blog
node bin/quickblog.js create
```

## 📦 Installation

```bash
git clone <repo-url>
cd quickBlogAPI
npm install
```

## 🔧 Usage

### Getting Started
```bash
# Initialize API session
node bin/quickblog.js init

# Test connection
node bin/quickblog.js test

# Check status
node bin/quickblog.js status
```

### Blog Operations
```bash
# List all published blogs
node bin/quickblog.js list

# List blogs from your current session
node bin/quickblog.js list --session

# Read a specific blog (use first 8 characters of ID)
node bin/quickblog.js read 12345678

# Create a new blog (interactive - asks for author, title, content, tags)
node bin/quickblog.js create

# Create blog from markdown file
node bin/quickblog.js create --file blog.md

# Edit your blog (only blogs from current session)
node bin/quickblog.js edit 12345678

# Delete your blog (only blogs from current session)
node bin/quickblog.js delete 12345678

# Clear current session
node bin/quickblog.js clear
```

## 📝 How It Works

### Anonymous Publishing
- **No signup required** - Start publishing immediately
- **Session-based management** - Edit/delete blogs published in current session
- **Author attribution** - You provide your name when publishing
- **Instant publishing** - Blogs appear on the website immediately

### Session Management
- **Session tracking** - API remembers blogs you publish in current session
- **Edit/Delete permissions** - Only modify blogs from your session
- **Persistent sessions** - Session data saved locally between runs
- **Clear sessions** - Reset when needed

### Blog Creation Process
When you create a blog, you'll be asked for:
1. **Title** - Your blog title
2. **Content** - Full blog content (multiline input)
3. **Author** - Your name (or "Anonymous")
4. **Tags** - Up to 4 tags (optional)
5. **Confirmation** - Preview before publishing

## 📝 Markdown File Format

```markdown
# My Blog Title

This is the content of my blog post.

You can use **markdown** formatting here.

## Subheadings work too

- Lists
- Are
- Supported
```

## 🎯 Features

- ✅ **No Authentication Required** - Anonymous publishing
- ✅ **Session Management** - Track your published blogs
- ✅ **Full CRUD Operations** - Create, Read, Update, Delete
- ✅ **Beautiful CLI Interface** - Colored output and tables
- ✅ **Markdown Support** - Create from .md files
- ✅ **Preview Mode** - See blogs before publishing
- ✅ **Instant Publishing** - Blogs appear on website immediately
- ✅ **Shareable Links** - Get direct links to your published blogs
- ✅ **Tag Support** - Categorize with up to 4 tags
- ✅ **Error Handling** - Helpful messages and troubleshooting

## 🔗 Connected To

**Website:** https://quick-blog-black-one.vercel.app

Your blogs will appear on the main website immediately after publishing!

## 📋 Complete Workflow Example

```bash
# 1. Initialize
node bin/quickblog.js init

# 2. Check what's already published
node bin/quickblog.js list

# 3. Create your first blog
node bin/quickblog.js create
# Enter: Title, Content, Author name, Tags

# 4. View your session blogs
node bin/quickblog.js list --session

# 5. Read your published blog
node bin/quickblog.js read 12345678

# 6. Edit if needed
node bin/quickblog.js edit 12345678

# 7. Check status
node bin/quickblog.js status
```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Test the API
node bin/quickblog.js test

# Run any command
node bin/quickblog.js --help
```

## 🔍 Troubleshooting

### Connection Issues
- Run `node bin/quickblog.js test` to check connectivity
- Ensure internet connection is stable
- Server might be temporarily unavailable

### Publishing Problems
- Check that all required fields are filled
- Ensure title is unique
- Try again if server is busy

### Session Management
- Use `node bin/quickblog.js status` to check session
- Use `node bin/quickblog.js clear` to reset session
- Only blogs from current session can be edited/deleted

## 📄 License

MIT

---

**Start Publishing Anonymously! 🎉**

No accounts, no passwords, just pure blogging freedom!
# QuickBlog-API

#!/usr/bin/env node

const { program } = require('commander');
const QuickBlogAPI = require('../lib/api');
const chalk = require('chalk');

const api = new QuickBlogAPI();

program
  .name('quickblog')
  .description('CLI API client for QuickBlog platform - Anonymous publishing')
  .version('1.0.0');

// Initialize command
program
  .command('init')
  .description('Initialize QuickBlog API session')
  .action(async () => {
    try {
      await api.init();
    } catch (error) {
      console.error(chalk.red('Initialization failed:', error.message));
      process.exit(1);
    }
  });

// Status command
program
  .command('status')
  .description('Show API and session status')
  .action(() => {
    api.showStatus();
  });

// Test command
program
  .command('test')
  .description('Test API connection')
  .action(async () => {
    try {
      await api.testConnection();
    } catch (error) {
      console.error(chalk.red('Connection test failed:', error.message));
      process.exit(1);
    }
  });

// List blogs command
program
  .command('list')
  .description('List blogs')
  .option('-s, --session', 'Show only blogs from this session')
  .action(async (options) => {
    try {
      await api.listBlogs(options.session);
    } catch (error) {
      console.error(chalk.red('Failed to list blogs:', error.message));
      process.exit(1);
    }
  });

// Read blog command
program
  .command('read <blogId>')
  .description('Read a specific blog')
  .action(async (blogId) => {
    try {
      await api.readBlog(blogId);
    } catch (error) {
      console.error(chalk.red('Failed to read blog:', error.message));
      process.exit(1);
    }
  });

// Create blog command
program
  .command('create')
  .description('Create a new blog')
  .option('-f, --file <path>', 'Create from markdown file')
  .action(async (options) => {
    try {
      await api.createBlog(options.file);
    } catch (error) {
      console.error(chalk.red('Failed to create blog:', error.message));
      process.exit(1);
    }
  });

// Edit blog command
program
  .command('edit <blogId>')
  .description('Edit your blog from this session')
  .action(async (blogId) => {
    try {
      await api.editBlog(blogId);
    } catch (error) {
      console.error(chalk.red('Failed to edit blog:', error.message));
      process.exit(1);
    }
  });

// Delete blog command
program
  .command('delete <blogId>')
  .description('Delete your blog from this session')
  .action(async (blogId) => {
    try {
      await api.deleteBlog(blogId);
    } catch (error) {
      console.error(chalk.red('Failed to delete blog:', error.message));
      process.exit(1);
    }
  });

// Clear session command
program
  .command('clear')
  .description('Clear current session')
  .action(() => {
    api.clearSession();
  });

program.parse();

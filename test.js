#!/usr/bin/env node

const QuickBlogAPI = require('./lib/api');
const chalk = require('chalk');

async function testAPI() {
  console.log(chalk.blue('🧪 Testing QuickBlog API Connection\n'));
  
  const api = new QuickBlogAPI();
  
  try {
    // Test basic connection
    await api.testConnection();
    
    console.log(chalk.green('\n✅ API client is working correctly!'));
    console.log(chalk.gray('\nNext steps:'));
    console.log(chalk.gray('1.'), chalk.blue('quickblog login'), chalk.gray('- Login or create account'));
    console.log(chalk.gray('2.'), chalk.blue('quickblog create'), chalk.gray('- Create your first blog'));
    console.log(chalk.gray('3.'), chalk.blue('quickblog list --my'), chalk.gray('- View your blogs'));
    
  } catch (error) {
    console.log(chalk.red('\n❌ API test failed:'), error.message);
    console.log(chalk.yellow('\n💡 Troubleshooting:'));
    console.log(chalk.gray('- Check your internet connection'));
    console.log(chalk.gray('- Verify the QuickBlog server is running'));
    console.log(chalk.gray('- Try again in a few moments'));
  }
}

testAPI();

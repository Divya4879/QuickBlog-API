#!/usr/bin/env node

const QuickBlogAPI = require('./lib/api');

async function testDeleteFlow() {
  const api = new QuickBlogAPI();
  
  console.log('🧪 Testing Delete Functionality\n');
  
  // Create a test blog
  console.log('1. Creating test blog...');
  const testBlog = {
    title: 'DELETE TEST BLOG',
    content: 'This blog was created to test the delete functionality. It should be removed after testing.',
    tags: ['tech', 'coding'],
    author: 'Test User'
  };
  
  try {
    // Simulate blog creation
    const blogId = Date.now().toString();
    const blogData = {
      id: blogId,
      ...testBlog,
      created_at: new Date().toLocaleString(),
      updated_at: new Date().toLocaleString()
    };
    
    // Add to session
    api.sessionBlogs.push(blogData);
    api.config.set('sessionBlogs', api.sessionBlogs);
    
    console.log('✅ Test blog created with ID:', blogId.substring(0, 8));
    
    // List session blogs
    console.log('\n2. Current session blogs:');
    await api.listBlogs(true);
    
    // Delete the blog
    console.log('\n3. Deleting test blog...');
    await api.deleteBlog(blogId.substring(0, 8));
    
    // List session blogs again
    console.log('\n4. Session blogs after delete:');
    await api.listBlogs(true);
    
  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

testDeleteFlow();

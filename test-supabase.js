/**
 * Supabase Connection Test Script
 *
 * This script tests the Supabase connection and verifies that the enquiries table exists.
 * Run with: node test-supabase.js
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.PUBLIC_SUPABASE_ANON_KEY;

console.log('='.repeat(60));
console.log('Supabase Connection Test');
console.log('='.repeat(60));

// Check environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('\n❌ ERROR: Missing Supabase credentials in .env file\n');
  console.log('Please ensure you have the following in your .env file:');
  console.log('  PUBLIC_SUPABASE_URL=your-project-url');
  console.log('  PUBLIC_SUPABASE_ANON_KEY=your-anon-key\n');
  process.exit(1);
}

console.log(`\n✓ Supabase URL: ${supabaseUrl}`);
console.log(`✓ Anon Key: ${supabaseAnonKey.substring(0, 20)}...\n`);

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  try {
    console.log('Testing connection to Supabase...\n');

    // Test 1: Check if enquiries table exists
    console.log('Test 1: Checking enquiries table...');
    const { data: enquiries, error: enquiriesError } = await supabase
      .from('enquiries')
      .select('*')
      .limit(1);

    if (enquiriesError) {
      console.error('❌ Error accessing enquiries table:', enquiriesError.message);
      console.log('\nPossible issues:');
      console.log('  1. The "enquiries" table does not exist in your Supabase database');
      console.log('  2. Row Level Security (RLS) policies are blocking access');
      console.log('  3. Your Supabase credentials are incorrect\n');
      console.log('To fix:');
      console.log('  1. Go to your Supabase dashboard');
      console.log('  2. Create the "enquiries" table with these columns:');
      console.log('     - id (uuid, primary key, default: gen_random_uuid())');
      console.log('     - name (text, required)');
      console.log('     - email (text, required)');
      console.log('     - phone (text, nullable)');
      console.log('     - message (text, nullable)');
      console.log('     - preferred_class_type (text, nullable)');
      console.log('     - source (text, nullable)');
      console.log('     - created_at (timestamp, default: now())');
      console.log('  3. Disable RLS or add policies to allow insert/select operations\n');
      return false;
    }

    console.log('✓ Successfully connected to enquiries table\n');

    // Test 2: Try inserting a test record
    console.log('Test 2: Attempting to insert a test record...');
    const testEnquiry = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '+91-9999999999',
      message: 'This is a test enquiry - can be deleted',
      preferred_class_type: 'online',
      source: 'connection_test',
      created_at: new Date().toISOString()
    };

    const { data: insertData, error: insertError } = await supabase
      .from('enquiries')
      .insert([testEnquiry])
      .select();

    if (insertError) {
      console.error('❌ Error inserting test record:', insertError.message);
      console.log('\nThis means:');
      console.log('  - You can read from the table but cannot insert');
      console.log('  - Check your Row Level Security (RLS) policies');
      console.log('  - Ensure the table has INSERT permissions for the anon key\n');
      return false;
    }

    console.log('✓ Successfully inserted test record');
    console.log('✓ Test record ID:', insertData[0].id);
    console.log('\n✓ ALL TESTS PASSED! Your Supabase connection is working correctly.\n');

    // Clean up - delete the test record
    console.log('Cleaning up test record...');
    const { error: deleteError } = await supabase
      .from('enquiries')
      .delete()
      .eq('id', insertData[0].id);

    if (deleteError) {
      console.log('⚠ Warning: Could not delete test record. You may need to delete it manually.');
      console.log('  Test record ID:', insertData[0].id);
    } else {
      console.log('✓ Test record cleaned up successfully\n');
    }

    return true;

  } catch (error) {
    console.error('\n❌ Unexpected error:', error.message);
    console.error(error);
    return false;
  }
}

// Run the test
testConnection()
  .then(success => {
    console.log('='.repeat(60));
    if (success) {
      console.log('✓ Connection test completed successfully!');
      console.log('  Your contact form and chatbot should now work properly.');
    } else {
      console.log('❌ Connection test failed. Please fix the issues above.');
    }
    console.log('='.repeat(60));
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });

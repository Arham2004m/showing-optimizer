import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qgjtsropeldugnubszvv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnanRzcm9wZWxkdWdudWJzenZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2MTUzOTYsImV4cCI6MjA5NDE5MTM5Nn0.OS-kMAA3iznkNW4HI_S8ZK3XaydD2MV0H3J68oVCGd0';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function check() {
  const { data, error } = await supabase.from('tours').select('*').eq('id', 'e0eab9a4-5cd7-4f66-b3b9-e46544b639a0');
  console.log('Result:', data);
  console.log('Error:', error);
}

check();

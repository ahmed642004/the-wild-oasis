import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://qoykuggtnhkagvjcixgn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFveWt1Z2d0bmhrYWd2amNpeGduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU4MjIzMTYsImV4cCI6MjAyMTM5ODMxNn0.Os-vD3fS2J0DMcz9dPJ2LpaFoBcvW6VR-WbSjrhILWI";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

/*
  CODM HUB - Supabase connection
  Replace these with your Supabase Project URL and Publishable/anon key.
  NEVER put the service_role/secret key in this file.
*/
const SUPABASE_URL = "https://tdrlxqmweuklsegnatei.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_1hJZ04EVnleaPYFGD2NhkA_X3kUlXSS";

let supabaseClient = null;

function initSupabase() {
  if (SUPABASE_URL === "YOUR_SUPABASE_URL" || SUPABASE_ANON_KEY === "YOUR_SUPABASE_ANON_KEY") {
    window.supabaseReady = false;
    window.dispatchEvent(new CustomEvent("supabase-ready", { detail: { configured: false } }));
    return;
  }

  if (!window.supabase) {
    console.error("Supabase JS library did not load.");
    window.supabaseReady = false;
    window.dispatchEvent(new CustomEvent("supabase-ready", { detail: { configured: true, error: "library" } }));
    return;
  }

  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  window.supabaseClient = supabaseClient;
  window.supabaseReady = true;
  window.dispatchEvent(new CustomEvent("supabase-ready", { detail: { configured: true } }));
}

(function loadSupabaseLibrary() {
  if (window.supabase) {
    initSupabase();
    return;
  }
  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
  script.async = true;
  script.onload = initSupabase;
  script.onerror = () => {
    console.error("Could not load Supabase JS.");
    window.supabaseReady = false;
    window.dispatchEvent(new CustomEvent("supabase-ready", { detail: { configured: true, error: "network" } }));
  };
  document.head.appendChild(script);
})();

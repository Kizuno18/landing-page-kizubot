const { execSync } = require('child_process');

// Check if running on Vercel environment
if (process.env.VERCEL) {
  // If running on Vercel, skip Cloudflare Pages deployment steps.
  console.log('🔄 Detected Vercel environment, skipping Cloudflare deployment steps.');
  process.exit(0);
}

// Otherwise, deploy using next-on-pages for Cloudflare Pages.
console.log('🚀 Deploying with next-on-pages for Cloudflare Pages...');
execSync('npx @cloudflare/next-on-pages', { stdio: 'inherit' });

TOLUWALOPE AKINBINU — DESIGNER PORTFOLIO

FILES
- index.html: portfolio page
- styles.css: responsive visual styling
- app.js: interactions and basic Supabase connection check
- config.js: public Supabase project URL and publishable key

BEFORE DEPLOYING
1. Open config.js in Notepad or VS Code.
2. Replace PASTE_YOUR_SUPABASE_PUBLISHABLE_KEY_HERE with the publishable key from your Supabase project.
   Keep the quotation marks around the key.
3. Save the file.
4. In Vercel, create a new project by uploading the WHOLE designer-portfolio-supabase folder (not only index.html).
5. After deployment, open the website and look below the project cards for the database connection status.

IMPORTANT
- The Supabase URL should be https://cbixzyqkhrxxpjmtkmfn.supabase.co (do not add /rest/v1).
- Publishable keys are designed for browser use, but your Supabase Row Level Security (RLS) policies must be correct.
- NEVER put a service_role key, secret API key, or database password in config.js.
- This version checks whether it can read the projects table, but it does not yet include a secure admin dashboard or automatic project publishing. The project cards currently link to the known Behance case studies.
- The separate MAKING, DAILY website is not included in this portfolio folder.

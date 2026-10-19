document.addEventListener("DOMContentLoaded", async () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const word = document.getElementById("typeword");
  if (word) {
    const words = ["meaningful", "memorable", "useful", "unexpected"];
    let i = 0;
    setInterval(() => { i = (i + 1) % words.length; word.textContent = words[i]; }, 2400);
  }

  const filters = [...document.querySelectorAll(".filter")];
  filters.forEach(button => button.addEventListener("click", () => {
    filters.forEach(b => b.classList.toggle("active", b === button));
    const wanted = button.dataset.filter;
    document.querySelectorAll(".project-card").forEach(card => {
      const category = card.dataset.category || (
        card.querySelector(".project-meta p")?.textContent.includes("PRODUCT") ? "Product Design" :
        card.querySelector(".project-meta p")?.textContent.includes("BRAND") ? "Brand Identity" : "Graphic Design"
      );
      card.hidden = wanted !== "All" && category !== wanted;
    });
  }));

  const cfg = window.PORTFOLIO_CONFIG || {};
  const note = document.getElementById("db-note");
  if (!cfg.supabasePublishableKey || cfg.supabasePublishableKey.includes("PASTE_")) {
    if (note) note.textContent = "Supabase is not connected yet. Add your publishable key to config.js and redeploy to enable database features.";
    return;
  }
  if (!window.supabase?.createClient) {
    if (note) note.textContent = "Could not load the Supabase client. Check your internet connection and reload.";
    return;
  }
  try {
    const client = window.supabase.createClient(cfg.supabaseUrl, cfg.supabasePublishableKey);
    // Check the projects table without replacing the hand-picked case-study cards.
    const { error } = await client.from("projects").select("id").limit(1);
    if (error) {
      if (note) note.textContent = "Supabase connection needs attention: " + error.message + ". Your portfolio remains visible; check the projects table permissions.";
    } else {
      if (note) note.textContent = "Portfolio database connected. The featured case studies are currently curated in the page; dynamic project publishing can be added next.";
    }
  } catch (e) {
    if (note) note.textContent = "Supabase could not be reached. Check config.js and your project's API settings.";
  }
});
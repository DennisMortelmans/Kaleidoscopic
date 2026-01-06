// Weekpagina detecteren
if (window.location.pathname.includes("week.html")) {
  // Weeknummer uit URL
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("les"));

  // FIXED: absoluut pad
  fetch("/weken/weken.json")
    .then((res) => res.json())
    .then((data) => {
      const week = data.weeks.find((w) => w.id === id);

      if (!week) {
        document.getElementById("week-title").textContent =
          "Les niet gevonden";
        return;
      }

      // Vul content
      document.getElementById("week-title").textContent = week.title;
      document.getElementById("wat-veranderd").innerHTML = week.wat_veranderd;
      document.getElementById("waarom").innerHTML = week.waarom;
      document.getElementById("uxui").innerHTML = week.uxui;
      document.getElementById("tradeoffs").innerHTML = week.tradeoffs;
      document.getElementById("usability").innerHTML = week.usability;
    });
}

// Overzichtpagina detecteren
if (window.location.pathname.includes("weeks.html")) {

  // FIXED: absoluut pad
  fetch("/weken/weken.json")
    .then((res) => res.json())
    .then((data) => {
      const articles = document.querySelectorAll("#lesweken article");

      articles.forEach((article) => {
        const weekId = parseInt(article.dataset.week);
        const week = data.weeks.find((w) => w.id === weekId);
        if (!week) return;

        const link = article.querySelector("a");

        // Link correct instellen
        link.href = `week.html?les=${week.id}`;

        const imgs = article.querySelectorAll("img");
        imgs.forEach((img) => {
          img.alt = week.title;
          if (img.classList.contains("hover")) {
            img.src = `/assets/images/open${week.id}.png`;
          }
        });
      });
    });
}

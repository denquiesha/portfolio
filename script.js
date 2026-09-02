// =========================
// CURRENT YEAR
// =========================

const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}

// =========================
// MOBILE NAVIGATION
// =========================

const menuButton = document.querySelector(".menu-button");
const sidebar = document.querySelector(".sidebar");
const sidebarLinks = document.querySelectorAll(".sidebar-link");

if (menuButton && sidebar) {

  menuButton.addEventListener("click", () => {

    const isOpen = sidebar.classList.toggle("menu-open");

    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.textContent = isOpen ? "CLOSE" : "MENU";

  });


  // Close menu when a navigation link is selected

  sidebarLinks.forEach((link) => {

    link.addEventListener("click", () => {

      sidebar.classList.remove("menu-open");

      menuButton.setAttribute("aria-expanded", "false");
      menuButton.textContent = "MENU";

    });

  });

}
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

  sidebarLinks.forEach((link) => {
    link.addEventListener("click", () => {
      sidebar.classList.remove("menu-open");

      menuButton.setAttribute("aria-expanded", "false");
      menuButton.textContent = "MENU";
    });
  });
}

/* =========================
   PROJECT FILTERS
========================= */

const projectFilters = document.querySelectorAll(".project-filter");
const projectItems = document.querySelectorAll(".project-item");

// Track SnapSort case study state
let snapsortExpanded = false;

function updateProjectView(selectedCategory) {

  // Update active tab
  projectFilters.forEach((button) => {
    const isActive = button.dataset.filter === selectedCategory;

    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  // Show or hide projects
  projectItems.forEach((project) => {

    const categories = (project.dataset.category || "").split(" ");

    const shouldShow =
      selectedCategory === "all" ||
      categories.includes(selectedCategory);

    project.hidden = !shouldShow;

    // =========================
    // SNAP SORT SPECIAL BEHAVIOR
    // =========================

    if (project.classList.contains("snapsort-project")) {

      const cover = project.querySelector(".snapsort-cover");
      const information = project.querySelector(".project-information");
      const caseStudy = project.querySelector(".snapsort-case-study");

      const showCaseStudy =
        selectedCategory === "uiux" && snapsortExpanded;

      if (cover) {
        cover.hidden = showCaseStudy;
      }

      if (information) {
        information.hidden = showCaseStudy;
      }

      if (caseStudy) {
        caseStudy.hidden = !showCaseStudy;
      }
    }
  });
}

// =========================
// TAB CLICK EVENTS
// =========================

projectFilters.forEach((button) => {

  button.addEventListener("click", () => {

    const selectedCategory = button.dataset.filter;

    // Preserve original behavior:
    // UI/UX tab opens SnapSort case study.
    snapsortExpanded = selectedCategory === "uiux";

    updateProjectView(selectedCategory);

  });

});

// =========================
// INITIAL STATE
// =========================

updateProjectView(
  document.querySelector(".project-filter.active")?.dataset.filter || "all"
);

// =========================
// VIEW CASE STUDY BUTTON
// =========================

const caseStudyButtons =
  document.querySelectorAll(".view-case-study");

caseStudyButtons.forEach((button) => {

  button.addEventListener("click", () => {

    snapsortExpanded = true;

    // Find UI/UX filter
    const uiuxFilter = document.querySelector(
      '.project-filter[data-filter="uiux"]'
    );

    if (uiuxFilter) {

      // Switch to UI/UX
      updateProjectView("uiux");

      // Scroll to case study
      const caseStudy = document.querySelector(
        "#snapsort-case-study"
      );

      if (caseStudy) {

        caseStudy.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }
    }

  });

});

// =========================
// HIDE CASE STUDY BUTTON
// =========================

const hideCaseStudyButtons =
  document.querySelectorAll(".hide-case-study");

hideCaseStudyButtons.forEach((button) => {

  button.addEventListener("click", () => {

    // Collapse case study
    snapsortExpanded = false;

    // Stay on UI/UX tab
    updateProjectView("uiux");

    // Scroll back to SnapSort project
    const project = document.querySelector(
      ".snapsort-project"
    );

    if (project) {

      project.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    }

  });

});
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
/* =========================
   CUTE UI SOUNDS
========================= */

let audioContext;

function getAudioContext() {
  if (!audioContext) {
    audioContext = new (
      window.AudioContext ||
      window.webkitAudioContext
    )();
  }

  return audioContext;
}


/* Soft cute pop */

function playPop() {

  const ctx = getAudioContext();

  if (ctx.state === "suspended") {
    ctx.resume();
  }

  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();

  oscillator.type = "sine";

  oscillator.frequency.setValueAtTime(
    520,
    ctx.currentTime
  );

  oscillator.frequency.exponentialRampToValueAtTime(
    760,
    ctx.currentTime + 0.07
  );

  gain.gain.setValueAtTime(
    0.0001,
    ctx.currentTime
  );

  gain.gain.exponentialRampToValueAtTime(
    0.045,
    ctx.currentTime + 0.015
  );

  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    ctx.currentTime + 0.11
  );

  oscillator.connect(gain);
  gain.connect(ctx.destination);

  oscillator.start();

  oscillator.stop(
    ctx.currentTime + 0.12
  );
}


/* Slightly softer sparkle */

function playSparkle() {

  const ctx = getAudioContext();

  if (ctx.state === "suspended") {
    ctx.resume();
  }

  const frequencies = [880, 1175];

  frequencies.forEach((frequency, index) => {

    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.type = "sine";

    oscillator.frequency.value = frequency;

    const startTime =
      ctx.currentTime + index * 0.045;

    gain.gain.setValueAtTime(
      0.0001,
      startTime
    );

    gain.gain.exponentialRampToValueAtTime(
      0.025,
      startTime + 0.01
    );

    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      startTime + 0.16
    );

    oscillator.connect(gain);
    gain.connect(ctx.destination);

    oscillator.start(startTime);

    oscillator.stop(
      startTime + 0.17
    );

  });
}


/* =========================
   NORMAL CLICK SOUND
========================= */

document.addEventListener(
  "click",
  (event) => {

    const target =
      event.target.closest(
        "a, button, .project-filter"
      );

    if (!target) return;

    /* Case study buttons get sparkle */

    if (
      target.classList.contains(
        "view-case-study"
      )
    ) {
      playSparkle();
      return;
    }

    /* Everything else gets soft pop */

    playPop();

  }
);
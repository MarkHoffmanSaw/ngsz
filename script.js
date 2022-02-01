"use strict";

// GENERAL SETTINGS

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const imgsOpenModal = document.querySelectorAll(".features__image");

const btnScrollTo = document.querySelector(".btn--scroll-to");
const autoparkSection = document.querySelector("#autopark");
const nav = document.querySelector(".nav");

const tabs = document.querySelectorAll(".services__tab");
const tabsContainer = document.querySelector(".services__tab-container");
const tabsContent = document.querySelectorAll(".services__content");

/////////////////////////////////////////////////
// ************** Modal window ************** //

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));
imgsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

/////////////////////////////////////////////////////
// ************** Button scrolling ************** //

btnScrollTo.addEventListener("click", function (e) {
  // Get coordinates of the DOM element
  const autoparkCoords = autoparkSection.getBoundingClientRect();

  // For all version of the browser
  window.scrollTo({
    left: autoparkCoords.left + window.pageXOffset,
    top: autoparkCoords.top + window.pageYOffset,
    behavior: "smooth",
  });

  // For a modern browser
  // autoparkCoords.scrollIntoView({ behavior: "smooth" });
});

//////////////////////////////////////////////////////
// ************** Sticky navigation ************** //

const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};

const settings = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};

const headerObserver = new IntersectionObserver(stickyNav, settings);

headerObserver.observe(header);

/////////////////////////////////////////////////////////////
// ************** Reveal sections (smooth) ************** //

const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");

  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
});

///////////////////////////////////////////////////////////////
// ************** Tabed component (services) ************** //

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".services__tab");

  if (!clicked) return;

  tabs.forEach((tab) => tab.classList.remove("services__tab--active"));
  tabsContent.forEach((content) =>
    content.classList.remove("services__content--active")
  );

  clicked.classList.add("services__tab--active");

  document
    .querySelector(`.services__content--${clicked.dataset.tab}`)
    .classList.add("services__content--active");
});

"use strict";

// SETTING FOR WEBPACK ONLY! (development & production)

import css from "./style.css";

function importImages(r) {
  let images = {};

  r.keys().map((item) => {
    console.log(item.replace);
    images[item.replace("./", "")] = r(item).default;
  });

  return images;
}

const images = importImages(
  require.context("./images", false, /\.(png|jpe?g|svg)$/)
);

// document.getElementById("logo-small").src = images["logo-small.png"];
// document.getElementById("logo").src = images["logo.png"];
// document.getElementById("autopark-1").src = images["autopark-1.png"];
// document.getElementById("autopark-2").src = images["autopark-2.png"];
// document.getElementById("autopark-3").src = images["autopark-3.png"];
// document.getElementById("autopark-4").src = images["autopark-4.png"];
// document.getElementById("autopark-5").src = images["autopark-5.png"];
// document.getElementById("autopark-6").src = images["autopark-6.png"];
// document.getElementById("autopark-7").src = images["autopark-7.png"];
// document.getElementById("autopark-8").src = images["autopark-8.png"];
// document.getElementById("autopark-9").src = images["autopark-9.png"];
// document.getElementById("autopark-10").src = images["autopark-10.png"];
// document.getElementById("autopark-11").src = images["autopark-11.png"];
// document.getElementById("galeria-1").src = images["galeria-1.jpeg"];
// document.getElementById("galeria-2").src = images["galeria-2.jpeg"];
// document.getElementById("galeria-3").src = images["galeria-3.jpeg"];
// document.getElementById("galeria-4").src = images["galeria-4.jpeg"];
// document.getElementById("galeria-5").src = images["galeria-5.jpeg"];
// document.getElementById("galeria-6").src = images["galeria-6.jpeg"];
// document.getElementById("gruzovik-1").src = images["gruzovik-1.png"];
// document.getElementById("gruzovik-2").src = images["gruzovik-2.png"];
// document.getElementById("gruzovik-3").src = images["gruzovik-3.png"];
// document.getElementById("perevozka-1").src = images["perevozka-1.jpg"];
// document.getElementById("perevozka-2").src = images["perevozka-2.jpg"];
// document.getElementById("perevozka-3").src = images["perevozka-3.jpg"];
// document.getElementById("perevozka-4").src = images["perevozka-4.jpg"];
// document.getElementById("perevozka-5").src = images["perevozka-5.jpg"];
// document.getElementById("perevozka-6").src = images["perevozka-6.jpg"];
// document.getElementById("uslugi-1").src = images["uslugi-1.jpg"];
// document.getElementById("uslugi-2").src = images["uslugi-2.jpg"];
// document.getElementById("uslugi-3").src = images["uslugi-3.jpg"];
// document.getElementById("uslugi-4").src = images["uslugi-4.jpg"];
// document.getElementById("uslugi-5").src = images["uslugi-5.jpg"];
// document.getElementById("uslugi-6").src = images["uslugi-6.jpg"];

// GENERAL SETTINGS

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const imgsOpenModal = document.querySelectorAll(".features__image");

const btnScrollTo = document.querySelector(".btn--scroll-to");
const autoparkSection = document.querySelector("#autopark");
const allSections = document.querySelectorAll(".section");
const nav = document.querySelector(".nav");

const tabs = document.querySelectorAll(".services__tab");
const tabsContainer = document.querySelector(".services__tab-container");
const tabsContent = document.querySelectorAll(".services__content");

// APPLICATION

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

///////////////////////////////////////////
// ************** Slider ************** //

const slider = (function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Switch slides
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = (function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  })();

  // Event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;

      goToSlide(slide);

      activateDot(slide);
    }
  });
})();

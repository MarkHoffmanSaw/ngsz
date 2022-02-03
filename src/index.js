"use strict";

// SETTING FOR WEBPACK ONLY! (development & production)

import css from "./style.css";

import logoSmall from "./images/logo-small.png";
import logo from "./images/logo.png";

import autopark1 from "./images/autopark-1.png";
import autopark2 from "./images/autopark-2.png";
import autopark3 from "./images/autopark-3.png";
import autopark4 from "./images/autopark-4.png";
import autopark5 from "./images/autopark-5.png";
import autopark6 from "./images/autopark-6.png";
import autopark7 from "./images/autopark-7.png";
import autopark8 from "./images/autopark-8.png";
import autopark9 from "./images/autopark-9.png";
import autopark10 from "./images/autopark-10.png";
import autopark11 from "./images/autopark-11.png";

import galeria1 from "./images/galeria-1.jpeg";
import galeria2 from "./images/galeria-2.jpeg";
import galeria3 from "./images/galeria-3.jpeg";
import galeria4 from "./images/galeria-4.jpeg";
import galeria5 from "./images/galeria-5.jpeg";
import galeria6 from "./images/galeria-6.jpeg";

import gruzovik1 from "./images/gruzovik-1.png";
import gruzovik2 from "./images/gruzovik-2.png";
import gruzovik3 from "./images/gruzovik-3.png";

import perevozka1 from "./images/perevozka-1.jpg";
import perevozka2 from "./images/perevozka-2.jpg";
import perevozka3 from "./images/perevozka-3.jpg";
import perevozka4 from "./images/perevozka-4.jpg";
import perevozka5 from "./images/perevozka-5.jpg";
import perevozka6 from "./images/perevozka-6.jpg";

import uslugi1 from "./images/uslugi-1.jpg";
import uslugi2 from "./images/uslugi-2.jpg";
import uslugi3 from "./images/uslugi-3.jpg";
import uslugi4 from "./images/uslugi-4.jpg";
import uslugi5 from "./images/uslugi-5.jpg";
import uslugi6 from "./images/uslugi-6.jpg";

document.getElementById("logo-small").src = logoSmall;
document.getElementById("logo").src = logo;
document.getElementById("autopark-1").src = autopark1;
document.getElementById("autopark-2").src = autopark2;
document.getElementById("autopark-3").src = autopark3;
document.getElementById("autopark-4").src = autopark4;
document.getElementById("autopark-5").src = autopark5;
document.getElementById("autopark-6").src = autopark6;
document.getElementById("autopark-7").src = autopark7;
document.getElementById("autopark-8").src = autopark8;
document.getElementById("autopark-9").src = autopark9;
document.getElementById("autopark-10").src = autopark10;
document.getElementById("autopark-11").src = autopark11;
document.getElementById("galeria-1").src = galeria1;
document.getElementById("galeria-2").src = galeria2;
document.getElementById("galeria-3").src = galeria3;
document.getElementById("galeria-4").src = galeria4;
document.getElementById("galeria-5").src = galeria5;
document.getElementById("galeria-6").src = galeria6;
document.getElementById("gruzovik-1").src = gruzovik1;
document.getElementById("gruzovik-2").src = gruzovik2;
document.getElementById("gruzovik-3").src = gruzovik3;
document.getElementById("perevozka-1").src = perevozka1;
document.getElementById("perevozka-2").src = perevozka2;
document.getElementById("perevozka-3").src = perevozka3;
document.getElementById("perevozka-4").src = perevozka4;
document.getElementById("perevozka-5").src = perevozka5;
document.getElementById("perevozka-6").src = perevozka6;
document.getElementById("uslugi-1").src = uslugi1;
document.getElementById("uslugi-2").src = uslugi2;
document.getElementById("uslugi-3").src = uslugi3;
document.getElementById("uslugi-4").src = uslugi4;
document.getElementById("uslugi-5").src = uslugi5;
document.getElementById("uslugi-6").src = uslugi6;

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

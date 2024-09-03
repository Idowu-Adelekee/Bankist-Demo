'use strict';

// Selecting Elements
const btnShowModal = document.querySelectorAll('.btn--show-modal');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnScroll = document.querySelector('.btn--scroll-to');

const section1 = document.querySelector('#section--1');
const section3 = document.getElementById('section--3');
const navScroll = document.querySelector('.nav__links');
const nav = document.querySelector('.nav');

// Tabs Elements
const tabContainer = document.querySelector('.operations__tab-container');
const tabBtn = document.querySelectorAll('.operations__tab');
const tabContents = document.querySelectorAll('.operations__content');

// Implementing the modal window pop up
const closeModalFunc = function (e) {
  e.preventDefault();
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

const openModalFunc = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

btnShowModal.forEach(showM => showM.addEventListener('click', openModalFunc));

btnCloseModal.addEventListener('click', closeModalFunc);
overlay.addEventListener('click', closeModalFunc);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModalFunc();
  }
});

// Implementing smooth scrolling
btnScroll.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

// Implementing the Nav Scroll
navScroll.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');

    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Implementing tabbed component
tabContainer.addEventListener('click', function (e) {
  const onlyBtn = e.target.closest('.operations__tab');

  // Removing Active classes
  if (onlyBtn) {
    tabBtn.forEach(t => t.classList.remove('operations__tab--active'));
    tabContents.forEach(c => c.classList.remove('operations__content--active'));

    //Activating the tab btn
    onlyBtn.classList.add('operations__tab--active');

    //Activating tab content
    document
      .querySelector(`.operations__content--${onlyBtn.dataset.tab}`)
      .classList.add('operations__content--active');
  }
});

const handleOver = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    // siblings.forEach
    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};

// Implementing the sticky nav
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const navScrollFunc = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const navIntersect = new IntersectionObserver(navScrollFunc, {
  root: null,
  threshold: 0,
  rootMargin: `${-navHeight}px`,
});

navIntersect.observe(header);

// Revealing Element on Scroll
const allSections = document.querySelectorAll('.section');

const secScrollFunc = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const secObserver = new IntersectionObserver(secScrollFunc, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  section.classList.add('section--hidden');
  secObserver.observe(section);
});

// Lazy loading images
const imgTarget = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  //Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '-200px',
});

imgTarget.forEach(img => imgObserver.observe(img));

// Slider Component Again
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  let curSlide = 0;
  const maxSlide = slides.length;

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  goToSlide(curSlide);

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

  const init = function () {
    createDots();
    activateDot(0);
    goToSlide(0);
  };

  init();

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  // Keyboard Event
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });

  // Dot Event
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

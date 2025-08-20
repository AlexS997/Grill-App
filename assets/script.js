'use strict'

const preloader = document.querySelector('[data-preload]')

window.addEventListener("load", function () {
    preloader.classList.add('loaded')
    document.body.classList.add('loaded')
})


const addEventOnElements = (elements, eventType, callback) => {
    for (let i = 0, len = elements.length; i < len ; i++) {
        elements[i].addEventListener(eventType, callback)
    }
}

const navbar = document.querySelector('[data-navbar]')
const navTogglers = document.querySelectorAll('[data-nav-toggler]')
const overlay = document.querySelector('[data-overlay]')

const toggleNav = () => {
    navbar.classList.toggle('active')
    navTogglers.classList.toggle('active')
    document.body.classList.toggle('nav-active')
}

addEventOnElements(navTogglers, "click", toggleNav)


const header = document.querySelector('[data-header]')

let lastScrollPos = 0;

const hideHeader = () => {
    const isScrollBottom = lastScrollPos < window.scrollY;

    if(isScrollBottom){
        header.classList.add('hide')
    }else {
        header.classList.remove('hide')
    }

    lastScrollPos = window.scrollY;
}

window.addEventListener("scroll", () => {
    if(window.scrollY >= 50){
        header.classList.add("active")
        hideHeader()
    } else {
        header.classList.remove("active")
    }
})


const heroSlider = document.querySelector('[data-hero-slider]')
const heroSliderItems = document.querySelectorAll('[data-hero-slider-item]')
const heroSliderPrevBtn = document.querySelector('[data-prev-btn]')
const heroSliderNextBtn = document.querySelector('[data-next-btn]')

let currentSlide = 0;
let lastActiveItem = heroSliderItems[0];

const updateSlider = () => {
    lastActiveItem.classList.remove('active');
    heroSliderItems[currentSlide].classList.add('active')
    lastActiveItem = heroSliderItems[currentSlide]
}

const slideNext = () => {
    if(currentSlide >= heroSliderItems.length - 1){
        currentSlide = 0
    } else {
        currentSlide++;
    }

    updateSlider()
}

heroSliderNextBtn.addEventListener("click", slideNext)

const slidePrev = () => {
    if(currentSlide <= 0){
        currentSlide = heroSliderItems.length - 1;
    } else {
        currentSlide--;
    }

    updateSlider()
}

heroSliderPrevBtn.addEventListener("click", slidePrev)

/* Auto Slide*/
let autoSlideInterval;

const autoSlide = () => {
    autoSlideInterval = setInterval(() => {
        slideNext()
    }, 7000)
}

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", () => {
    clearInterval(autoSlideInterval)
})

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide)

window.addEventListener("load", autoSlide)

/* Parallax Effect */

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", (e) => {

  x = (e.clientX / window.innerWidth * 10) - 5;
  y = (e.clientY / window.innerHeight * 10) - 5;

  // reverse the number eg. 20 -> -20, -5 -> 5
  x = x - (x * 2);
  y = y - (y * 2);

  for (let i = 0, len = parallaxItems.length; i < len; i++) {
    x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
    y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
    parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  }

});
import scrollLock from "scroll-lock";
import jump from "jump.js";

const hamburger = document.querySelector(".hamburger"),
    nav = document.querySelector(".nav"),
    navLink = nav.querySelectorAll(".nav__link");

const navHandler = () => {
    hamburger.classList.toggle("is-active");
    nav.classList.toggle("nav_active");

    if (nav.classList.contains("nav_active")) {
        scrollLock.disablePageScroll();
    } else {
        scrollLock.enablePageScroll();
    }
};

navLink.forEach((el) => {
    el.addEventListener("click", () => {
        if (nav.classList.contains("nav_active")) {
            scrollLock.enablePageScroll();
            nav.classList.remove("nav_active");
            hamburger.classList.remove("is-active");
        }
    });
});

hamburger.addEventListener("click", () => {
    navHandler();
});

let scrollPosition = window.pageYOffset;

let header = document.querySelector(".header");
const navigation = document.querySelector(".nav");
let oldPositionScroll = 0;

const navBarPosition = () => {
    // eslint-disable-next-line no-unused-vars
    oldPositionScroll = scrollY;

    header = document.querySelector(".header");
    if (scrollY > 40 && !navigation.classList.contains("nav_active")) {
        header.classList.add("header_hidden");
    } else {
        header.classList.remove("header_hidden");
    }

    if (scrollPosition > window.pageYOffset) {
        header.classList.remove("header_hidden");
    }

    scrollPosition = window.pageYOffset;
};

window.addEventListener("scroll", navBarPosition);

navBarPosition();

const navListItems = document.querySelectorAll(".nav__item:not(:last-child) .nav__link");

navListItems.forEach(el => {
    el.addEventListener("mouseover", () => {
        navListItems.forEach(link => {
            link.classList.add("nav__link_hide-border");
        });
    });

    el.addEventListener("mouseout", () => {
        navListItems.forEach(link => {
            link.classList.remove("nav__link_hide-border");
        });
    });
});

window.onload = () => {
    jump("body", {
        offset: 0,
        duration: 0
    });
};

const productAnchor = document.querySelector("a[href='#About']");
const howTo = document.querySelector("a[href='#howTo']");
const roadMapAnchor = document.querySelector("a[href='#Roadmap']");
const headerLogo = document.querySelector(".header__logo");

productAnchor.addEventListener("click", () => {
    jump("#About", {
        offset: -100,
        duration: 500,
    });
});

howTo.addEventListener("click", () => {
    jump("#howTo", {
        offset: -100,
        duration: 500,
    });
});
//
// roadMapAnchor.addEventListener("click", () => {
//     jump("#Roadmap", {
//         offset: -100,
//         duration: 500,
//     });
// });
//
// headerLogo.addEventListener("click", () => {
//     jump("body", {
//         offset: 0,
//         duration: 0
//     });
// });

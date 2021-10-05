import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
gsap.defaults({overwrite: "auto"});

const getCoords = (elem) => {
    var box = elem.getBoundingClientRect();

    var body = document.body;
    var docEl = document.documentElement;

    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;

    var top = box.top + scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return {top: Math.round(top), left: Math.round(left)};
};

const getCoordinateOfElement = () => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const mdImageHeightFirst = 225;

    const lgImageHeightFirst = 300;

    const xxlImageHeightFirst = 454;

    const getCorrectImageHeight = () => {
        if (viewportWidth >= 768 && viewportWidth < 992) {
            return mdImageHeightFirst;
        } else if (viewportWidth >= 992 && viewportWidth <= 1280) {
            return lgImageHeightFirst;
        } else if (viewportWidth > 1280) {
            return xxlImageHeightFirst;
        } else {
            if (viewportWidth >= 768) {
                console.error("Inka error: None of the breakpoints is fit to the breakpoints");
            }
        }
    };

    return (viewportHeight / 2) - (getCorrectImageHeight() / 2);
};

const contentMarkers = gsap.utils.toArray(".howto__fixed-img");
const contentMarkserBlock = gsap.utils.toArray(".howto__content-wrp");

const scrollTriggerSettings = {
    trigger: ".howto",
    start: `top top+=${getCoordinateOfElement()}`,
    end: `bottom bottom-=${getCoordinateOfElement()}`,
    onUpdate: getCurrentSection,
    invalidateOnRefresh: true,
    pin: ".howto__fixed",
};

let animationFixes = undefined;

ScrollTrigger.create({
    trigger: ".howto",
    start: "top bottom",
    end: "bottom top",
    onEnter: () => {
        gsap.set(contentMarkers[0], {autoAlpha: 1});
    },
    onEnterBack: () => {
        gsap.set(contentMarkers[contentMarkers.length - 1], {autoAlpha: 1});
    },
});

contentMarkserBlock.forEach((marker, index) => {
    marker.content = contentMarkers[index];

    gsap.set(marker.content, {autoAlpha: 0});

    marker.content.enter = function () {
        gsap.fromTo(marker.content, {autoAlpha: 0}, {duration: 0.3, autoAlpha: 1});
    };

    marker.content.leave = function () {
        gsap.to(marker.content, {duration: 0.1, autoAlpha: 0});
    };

});

let lastContent;
let inited = false;

let solutionSliderInit = undefined;

let sliderIsInited = false;

const onResizeHandler = () => {
    if (window.matchMedia("(min-width: 576px)").matches) {
        if (animationFixes) {
            animationFixes.refresh();
        }

        if (sliderIsInited === true) {
            solutionSliderInit.destroy();
            document.querySelector(".solution__track").removeAttribute("style");
            sliderIsInited = false;
        }
    }
};

function getCurrentSection() {
    let newContent;
    const currScroll = scrollY + (window.innerHeight / 2);

    // Find the current section
    contentMarkserBlock.forEach(marker => {

        if (currScroll > getCoords(marker).top) {
            newContent = marker.content;
        }
    });

    // If the current section is different than that last, animate in
    if (newContent && (lastContent == null || !newContent.isSameNode(lastContent))) {
        // Fade out last section
        if (lastContent) {
            lastContent.leave();
        }
        // Animate in new section
        if (inited) {
            newContent.enter();
        }

        inited = true;

        lastContent = newContent;
    }
}

const media = window.matchMedia("screen and (max-width: 576px)");
ScrollTrigger.addEventListener("refreshInit", checkSTState);
checkSTState();

function checkSTState() {
    if (animationFixes) {
        if (media.matches) {
            animationFixes.disable();
        } else {
            animationFixes.enable();
        }
    }
}

contentMarkserBlock.forEach((elem, index) => {
    const fadeItems = gsap.timeline({
        scrollTrigger: {
            trigger: elem,
            start: "top+=30% 80%",
            end: "bottom+=40% 50%",
            scrub: true,

            toggleActions: "play reverse play reverse",
        }
    });
    if (media) {
        if (index !== contentMarkserBlock.length - 1) {
            fadeItems
                .to(elem, {opacity: 1, duration: 0.2, stagger: 0.05})
                .to(elem, {opacity: 0, duration: 0.2, stagger: 0.05}, 0.8);
        } else {
            fadeItems
                .to(elem, {opacity: 1, duration: 0.2, stagger: 0.05});
        }
    }
});

window.addEventListener("resize", function () {
    return onResizeHandler();
}, true);

ScrollTrigger.addEventListener("refreshInit", function () {
    onResizeHandler();
});

ScrollTrigger.matchMedia({
    "(min-width: 576px)": function () {
        animationFixes = ScrollTrigger.create(scrollTriggerSettings);
        animationFixes.update();
        animationFixes.refresh();
    },
    "(max-width: 576px)": function () {
        if (animationFixes) {
            animationFixes.kill(true);
            gsap.set(".howto__fixed", {clearProps: "all"});
        }
    }
});

onResizeHandler();


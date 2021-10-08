const teamCard = document.querySelectorAll(".team__card");

teamCard.forEach(el => {
    el.addEventListener("mouseover", () => {
        el.classList.add("team__card_active");
    });
    el.addEventListener("mouseout", () => {
        el.classList.remove("team__card_active");
    });
});

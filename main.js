//navigation js 
const navigation = document.querySelector('.nav');
// carousel javascript
const wrapper = document.querySelector(".wrapper");
const arrowBtns= document.querySelectorAll(".wrapper i");
const carousel = document.querySelector(".carousel");
const firstCardWidth= carousel.querySelector(".cadre").offsetWidth;
const carouselChildrens=[...carousel.children];







// loader

setTimeout(function(){
  $('.loader-bg').fadeToggle();
},2500);





let isDragging = false;
let startX, startScrollLeft, timeoutId;
const cardPreView = Math.round(carousel.offsetWidth / firstCardWidth);

// Cloner les cartes pour le défilement infini
const cloneCards = () => {
    carouselChildrens.slice(-cardPreView).reverse().forEach(card => {
        carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    });
    carouselChildrens.slice(0, cardPreView).forEach(card => {
        carousel.insertAdjacentHTML("beforeend", card.outerHTML);
    });
};
cloneCards();

// Fonctionnalité des boutons fléchés
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
    });
});

// Gestion des événements de glissement
const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
    if (!isDragging) return;
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
};

// Auto play
const autoPlay = () => {
    if (window.innerWidth < 800) return;
    timeoutId = setTimeout(() => {
        carousel.scrollLeft += firstCardWidth;
    }, 2500);
};
autoPlay();

// Logique de défilement infini
const infiniteScroll = () => {
    if (carousel.scrollLeft <= 3) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
    } else if (Math.ceil(carousel.scrollLeft) >= carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.remove("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
    }

    clearTimeout(timeoutId);
    if (!wrapper.matches(":hover")) autoPlay();
};

// Écouteurs d'événements
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);
























        



























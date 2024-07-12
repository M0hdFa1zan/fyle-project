const work = document.querySelector(".work");
const slider = document.querySelector(".slider");
const firstCardWidth = slider.querySelector(".card").offsetWidth;
const sliderChildrens = [...slider.children];
const dots = document.querySelectorAll(".dot");

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

let cardPerView = Math.round(slider.offsetWidth / firstCardWidth);

sliderChildrens.slice(-cardPerView).reverse().forEach(card => {
    slider.insertAdjacentHTML("afterbegin", card.outerHTML);
});

sliderChildrens.slice(0, cardPerView).forEach(card => {
    slider.insertAdjacentHTML("beforeend", card.outerHTML);
});

slider.classList.add("no-transition");
slider.scrollLeft = slider.offsetWidth;
slider.classList.remove("no-transition");

const dragStart = (e) => {
    isDragging = true;
    slider.classList.add("dragging");

    startX = e.pageX;
    startScrollLeft = slider.scrollLeft;
}

const dragging = (e) => {
    if (!isDragging) return;

    slider.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    slider.classList.remove("dragging");
}

const updateDots = () => {
    console.log("in the function");

    let currentIndex = Math.round(slider.scrollLeft / firstCardWidth) % (sliderChildrens.length / 3);

    if (currentIndex === 0) {
        let changeTo = null;
        let x_card = Math.round(slider.scrollLeft / firstCardWidth);

        if (x_card > 9) {
            console.log("index is " + x_card);
            x_card = x_card % 9;
        }

        changeTo = x_card / 3;
        console.log(changeTo);
        console.log("Current index is " + currentIndex);

        dots.forEach((dot, index) => {
            if (index === changeTo - 1) {
                dot.classList.add("red-dot");
                dot.classList.remove("black-dot");
            } else {
                dot.classList.add("black-dot");
                dot.classList.remove("red-dot");
            }
        });
    }
}

const infiniteScroll = () => {

    if (slider.scrollLeft === 0) {
        slider.classList.add("no-transition");
        slider.scrollLeft = slider.scrollWidth - (2 * slider.offsetWidth);
        slider.classList.remove("no-transition");
    }

    else if (Math.ceil(slider.scrollLeft) === slider.scrollWidth - slider.offsetWidth) {
        slider.classList.add("no-transition");
        slider.scrollLeft = slider.offsetWidth;
        slider.classList.remove("no-transition");
    }

    updateDots();

    clearTimeout(timeoutId);
    if (!work.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    if (window.innerWidth < 800 || !isAutoPlay) return;

    timeoutId = setTimeout(() => {
        slider.scrollLeft += firstCardWidth;
        updateDots();
    }, 1500);
}

updateDots();

autoPlay();

slider.addEventListener("mousedown", dragStart);
slider.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
slider.addEventListener("scroll", infiniteScroll);
work.addEventListener("mouseenter", () => clearTimeout(timeoutId));
work.addEventListener("mouseleave", autoPlay);
function togglePopup() {
    const overlay = document.getElementById('popupOverlay');
    overlay.classList.toggle('show');
}

var show = function (id) {
    $(id).style.display = "block";
};
var hide = function (id) {
    $(id).style.display = "none";
};

// JavaScript function to show image based on button click
function showImage(imageId, btnId) {
    // Get all gallery cards and images
    var galleryCards = document.getElementsByClassName('gallery-cards');
    var images = document.getElementsByClassName('image');

    // Loop through all gallery cards to deactivate them and hide images
    for (var i = 0; i < galleryCards.length; i++) {
        galleryCards[i].classList.remove('active');
        images[i].style.display = 'none';
    }

    // Activate the clicked gallery card
    var activeCard = document.getElementById(btnId);
    activeCard.classList.add('active');

    // Show the corresponding image
    var imageToShow = document.getElementById(imageId);
    imageToShow.style.display = 'block';
}

// Initially show the second image and mark the second button as active
window.onload = function () {
    var defaultImageId = 'img2'; // ID of the second image
    var defaultBtnId = 'btn2'; // ID of the second button

    // Show the default image
    var defaultImage = document.getElementById(defaultImageId);
    defaultImage.style.display = 'block';

    // Mark the default button as active
    var defaultBtn = document.getElementById(defaultBtnId);
    defaultBtn.classList.add('active');
};



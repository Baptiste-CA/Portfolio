let currentSlide = 0;

function changeSlide(direction) {
    const images = document.querySelectorAll('.carousel-images img');
    images[currentSlide].classList.remove('active');

    currentSlide += direction;

    if (currentSlide < 0) {
        currentSlide = images.length - 1;
    } else if (currentSlide >= images.length) {
        currentSlide = 0;
    }

    images[currentSlide].classList.add('active');
}

// Auto-slide every 5 seconds
setInterval(() => changeSlide(1), 4000);












// Afficher le bouton après avoir défilé de 300px
window.onscroll = function() {
    let scrollToTopBtn = document.getElementById("scrollToTopBtn");
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
};

// Fonction pour remonter en haut de la page
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


//CAROUSEL
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




// Bouton pour remonter
// Afficher le bouton après avoir défilé de 300px et ajuster sa position en bas de page
window.onscroll = function() {
    let scrollToTopBtn = document.getElementById("scrollToTopBtn");
    let scrollHeight = document.documentElement.scrollHeight;
    let scrollPosition = window.innerHeight + window.scrollY;

    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }

    // Ajuste la position du bouton si on est en bas de la page
    if (scrollPosition >= scrollHeight - 10) { 
        scrollToTopBtn.style.bottom = "80px"; // Ajuste la position pour ne pas coller au bas
    } else {
        scrollToTopBtn.style.bottom = "30px"; // Revient à la position initiale
    }
};


// Fonction pour remonter en haut de la page
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}




// SIDEBAR
document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.querySelector(".sidebar");
    const pageContainer = document.querySelector(".page-container");
    const toggleBtns = document.querySelectorAll(".toggle-btn, .hamburger"); // Sélectionne les deux boutons

    toggleBtns.forEach(btn => {
        btn.addEventListener("click", function () {
            // Toggle l'état de la sidebar et du conteneur
            sidebar.classList.toggle("closed");
            pageContainer.classList.toggle("closed");

            // Ajoute l'animation au bouton mobile (effet hamburger)
            btn.classList.toggle("active");
        });
    });
});




//Bontou découvrir glisse vers l'id spawn
    document.querySelector(".btn-discover").addEventListener("click", function() {
        document.getElementById("about").scrollIntoView({ behavior: "smooth" });
    });




// Bouton hamburger
document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.querySelector(".mobile-toggle-btn");
    const mobileSidebar = document.querySelector(".mobile-sidebar");
    const sidebarLinks = document.querySelectorAll(".mobile-sidebar a");
    const body = document.querySelector("body");

    // Lorsque le bouton hamburger est cliqué, il change l'état de la sidebar
    toggleBtn.addEventListener("click", function () {
        this.classList.toggle("active"); // Ajoute ou enlève la classe active pour l'animation du hamburger
        mobileSidebar.classList.toggle("open"); // Ouvre ou ferme la sidebar
    });

    // Lorsque l'on clique sur un élément de la sidebar, on ferme la sidebar et réinitialise l'animation
    sidebarLinks.forEach(link => {
        link.addEventListener("click", function () {
            mobileSidebar.classList.remove("open"); // Ferme la sidebar
            toggleBtn.classList.remove("active"); // Réinitialise le hamburger (revenir aux 3 barres)
            setTimeout(function() {
                toggleBtn.classList.remove("active"); // Réinitialisation après fermeture de la sidebar
            }, 300); // On attend que l'animation du bouton soit terminée avant de le réinitialiser
        });
    });

    // Fermer la sidebar et réinitialiser le bouton quand on clique en dehors de la sidebar
    body.addEventListener("click", function (e) {
        // Si le clic n'est ni dans la sidebar, ni sur le bouton hamburger, fermer la sidebar
        if (!mobileSidebar.contains(e.target) && !toggleBtn.contains(e.target) && mobileSidebar.classList.contains("open")) {
            mobileSidebar.classList.remove("open"); // Ferme la sidebar
            toggleBtn.classList.remove("active"); // Réinitialise le hamburger
        }
    });

    // Empêche la propagation du clic lorsqu'on clique à l'intérieur de la sidebar, pour ne pas fermer la sidebar
    mobileSidebar.addEventListener("click", function (e) {
        e.stopPropagation();
    });

    // Empêche la propagation du clic lorsqu'on clique sur le bouton hamburger, pour ne pas fermer la sidebar
    toggleBtn.addEventListener("click", function (e) {
        e.stopPropagation();
    });
});




//VISUALISEUR DE CONTENU
document.addEventListener("DOMContentLoaded", function () {
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightbox-image");
    const lightboxVideo = document.getElementById("lightbox-video");
    const lightboxVideoSource = document.getElementById("lightbox-video-source");
    const closeBtn = document.querySelector(".close");
    const prevBtns = document.querySelectorAll(".prev");
    const nextBtns = document.querySelectorAll(".next");

    let mediaElements = []; // Liste des images et vidéos
    let currentIndex = 0;

    // Sélectionner toutes les images et vidéos cliquables
    document.querySelectorAll(".img-preview").forEach((element, index) => {
        mediaElements.push(element);

        element.addEventListener("click", () => {
            openLightbox(index);
        });
    });

    function openLightbox(index) {
        currentIndex = index;
        const element = mediaElements[currentIndex];

        if (element.tagName === "IMG") {
            lightboxImage.src = element.src;
            lightboxImage.classList.remove("hidden");
            lightboxVideo.classList.add("hidden");
        } else if (element.tagName === "VIDEO") {
            lightboxVideoSource.src = element.querySelector("source").src;
            lightboxVideo.load(); // Charge immédiatement la vidéo
            lightboxVideo.play(); // Joue immédiatement
            lightboxVideo.classList.remove("hidden");
            lightboxImage.classList.add("hidden");
        }

        lightbox.classList.remove("hidden");
    }

    function closeLightbox() {
        lightbox.classList.add("hidden");
        lightboxImage.src = "";
        lightboxVideo.pause();
        lightboxVideo.currentTime = 0;
        lightboxVideo.classList.add("hidden");
    }

    function navigateLightbox(direction) {
        currentIndex += direction;
        if (currentIndex < 0) {
            currentIndex = mediaElements.length - 1;
        } else if (currentIndex >= mediaElements.length) {
            currentIndex = 0;
        }
        openLightbox(currentIndex);
    }

    closeBtn.addEventListener("click", closeLightbox);
    prevBtns.forEach(btn => btn.addEventListener("click", () => navigateLightbox(-1)));
    nextBtns.forEach(btn => btn.addEventListener("click", () => navigateLightbox(1)));

    // Fermer la lightbox en cliquant en dehors
    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    // Fermer avec la touche "Esc" et naviguer avec flèches
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeLightbox();
        } else if (event.key === "ArrowLeft") {
            navigateLightbox(-1);
        } else if (event.key === "ArrowRight") {
            navigateLightbox(1);
        }
    });
});

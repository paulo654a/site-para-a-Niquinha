/* =========================
   ENTRAR NO SITE
========================= */

const intro = document.getElementById("intro");
const enterBtn = document.getElementById("enterBtn");

enterBtn.addEventListener("click", () => {
    intro.classList.add("hidden");
    createHearts();
});

/* =========================
   CONTADOR
========================= */

const startDate = new Date("2026-09-19T00:00:00");

function updateCounter() {
    const now = new Date();
    let difference = now - startDate;

    if (difference < 0) difference = 0;

    const secondsTotal = Math.floor(difference / 1000);
    const days = Math.floor(secondsTotal / 86400);
    const hours = Math.floor((secondsTotal % 86400) / 3600);
    const minutes = Math.floor((secondsTotal % 3600) / 60);
    const seconds = secondsTotal % 60;

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = String(hours).padStart(2, "0");
    document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
    document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

updateCounter();
setInterval(updateCounter, 1000);

/* =========================
   CARTA
========================= */

const letterBtn = document.getElementById("letterBtn");
const envelope = document.getElementById("envelope");
let letterOpen = false;

letterBtn.addEventListener("click", () => {
    letterOpen = !letterOpen;

    if (letterOpen) {
        envelope.classList.add("open");
        letterBtn.textContent = "Fechar minha carta 💌";
    } else {
        envelope.classList.remove("open");
        letterBtn.textContent = "Abrir minha carta 💌";
    }
});

/* =========================
   CORAÇÕES FLUTUANTES
========================= */

function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("floating-heart");

    const symbols = ["❤️", "💕", "💗", "💖", "💘", "♡"];

    heart.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = Math.random() * 18 + 12 + "px";

    const duration = Math.random() * 5 + 5;
    heart.style.animationDuration = duration + "s";

    const heartsContainer = document.getElementById("hearts");
    heartsContainer.appendChild(heart);

    setTimeout(() => heart.remove(), duration * 1000);
}

let heartsStarted = false;

function createHearts() {
    if (heartsStarted) return;
    heartsStarted = true;

    setInterval(createHeart, 900);
}

/* =========================
   EFEITO AO ROLAR
========================= */

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    },
    { threshold: 0.15 }
);

sections.forEach(section => {
    section.style.opacity = "0";
    section.style.transform = "translateY(30px)";
    section.style.transition = "opacity 1s ease, transform 1s ease";
    observer.observe(section);
});

/* =========================
   CLIQUE = CORAÇÃO
========================= */

document.addEventListener("click", event => {
    if (event.target.tagName === "BUTTON" || event.target.tagName === "A") return;

    const heart = document.createElement("div");

    heart.textContent = "❤️";
    heart.style.position = "fixed";
    heart.style.left = event.clientX + "px";
    heart.style.top = event.clientY + "px";
    heart.style.pointerEvents = "none";
    heart.style.zIndex = "9999";
    heart.style.fontSize = "20px";

    document.body.appendChild(heart);

    heart.animate(
        [
            { transform: "translateY(0) scale(1)", opacity: 1 },
            { transform: "translateY(-80px) scale(1.5)", opacity: 0 }
        ],
        {
            duration: 1000,
            easing: "ease-out"
        }
    );

    setTimeout(() => heart.remove(), 1000);
});

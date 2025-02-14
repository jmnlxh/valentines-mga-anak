const heartContainer = document.getElementById('heart-container');
const opacities = [0.9, 0.3, 0.2, 0.5, 0.8];

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');

    const x = Math.random() * (window.innerWidth - 40);
    const y = Math.random() * (window.innerHeight - 40);

    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;

    const randomOpacity = opacities[Math.floor(Math.random() * opacities.length)];
    heart.style.opacity = randomOpacity;

    heartContainer.appendChild(heart);

    heart.onclick = () => {
        createFireworks(x, y);
        heart.remove();
        heartCount--;
    };

    setTimeout(() => {
        heart.remove();
        heartCount--;
    }, 3000);
}

function createFireworks(x, y) {
    const numberOfHearts = 11;
    const scatterDistance = 120;

    for (let i = 0; i < numberOfHearts; i++) {
        const smallHeart = document.createElement('div');
        smallHeart.classList.add('small-heart');

        const angle = (i / numberOfHearts) * (Math.PI * 2);
        const heartX = 16 * Math.sin(angle) ** 3;
        const heartY = - (13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle));

        const offsetX = heartX * (scatterDistance / 20);
        const offsetY = heartY * (scatterDistance / 20);

        smallHeart.style.left = `${x}px`;
        smallHeart.style.top = `${y}px`;

        heartContainer.appendChild(smallHeart);

        setTimeout(() => {
            smallHeart.style.transition = 'transform 1s ease, opacity 1s ease';
            smallHeart.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        }, 10);

        setTimeout(() => {
            smallHeart.style.opacity = '0';
            setTimeout(() => {
                smallHeart.remove();
            }, 1000);
        }, 1000);
    }
}

function spawnHearts() {
    createHeart();
    setTimeout(spawnHearts, 500);
}

spawnHearts();

const button = document.querySelector('.button');
const popupCard = document.getElementById('popup-card');
const closePopup = document.getElementById('close-popup');
const overlay = document.getElementById('overlay');

button.addEventListener('click', (event) => {
    event.preventDefault();
    overlay.classList.remove('hidden');
    popupCard.classList.remove('hidden');
});

closePopup.addEventListener('click', () => {
    overlay.classList.add('hidden');
    popupCard.classList.add('hidden');
});

button.addEventListener('click', (event) => {
    event.preventDefault();
    overlay.classList.add('show');
    popupCard.classList.add('show');
});

closePopup.addEventListener('click', () => {
    overlay.classList.remove('show');
    popupCard.classList.remove('show');
});

const popupHeart = document.querySelector('.popup-heart');
popupHeart.style.setProperty('--heart-size', '55px');
popupHeart.style.setProperty('--heart-rotation', '-90deg');

function centerPopup() {
    const popupCard = document.getElementById('popup-card');
    if (popupCard && !popupCard.classList.contains('hidden')) {
        popupCard.style.top = '50%';
        popupCard.style.left = '50%';
        popupCard.style.transform = 'translate(-50%, -50%)';
    }
}

window.addEventListener('resize', centerPopup);
window.addEventListener('orientationchange', centerPopup);
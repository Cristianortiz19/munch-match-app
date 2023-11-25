const nextBtn = document.querySelector('.next-btn');
const image = document.querySelector('.welcome-image');
const title = document.querySelector('.title');
const text = document.querySelector('.normal-text');
const statusImg = document.querySelector('.image-status')

const infoContent = document.querySelector('.info');

let indice = 1

const images = [
    './public/images/welcome1.webp',
    './public/images/welcome2.webp',
    './public/images/welcome3.webp'
]

const titleText = [
    '¡Te damos la bienvenida!',
    'Personaliza tu experiencia',
    'Explora y Saborea'
]

const normalText = [
    'Descubre una nueva forma de disfrutar tu almuerzo en la Universidad ICESI',
    'Cuéntanos sobre tus preferencias alimentarias y lo que más valoras al elegir dónde almorzar.',
    'Explora menús actualizados, precios y reseñas de otros usuarios. ¡Haz que cada almuerzo sea una deliciosa experiencia!'
]

const statusImage = [
    './public/icons/welcome-status1.svg',
    './public/icons/welcome-status2.svg',
    './public/icons/welcome-status3.svg'
]

nextBtn.addEventListener('click', () => {
    infoContent.style.backgroundColor = 'white'
    title.style.color = '#363636';
    text.style.color = '#363636';
     image.src = images[indice];
     title.innerHTML = titleText[indice];
     text.innerHTML = normalText[indice];
     statusImg.src = statusImage[indice];

     
     indice = indice + 1;

     if(indice === 4) {
        window.location.href = './register/index.html'
        indice = 1
     }

     if(indice == 2) {
        infoContent.style.backgroundColor = '#118319';
        title.style.color = 'white';
        text.style.color = 'white';
     }
})
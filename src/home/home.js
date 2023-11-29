import { getStudents } from "../firebase.js";

let students = await getStudents();



const urlParams = new URLSearchParams(window.location.search);
const codigo = urlParams.get('user');

let recomendation;

// llamar función de python
function callFunction() {
    const parametroJs = codigo

    const xhr = new XMLHttpRequest();

    xhr.open('POST', 'http://localhost:5050/plate_recomendation',  true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const respuestaPython = JSON.parse(xhr.responseText);
            recomendation = respuestaPython.result;
            console.log(recomendation);
            loadRecomendationCards(recomendation)
        }
    };

    const datos = {parametro: parametroJs};
    xhr.send(JSON.stringify(datos))
}


callFunction();

let studentLogged = [];

const welcomeMessage = document.getElementById('welcome-message');

async function loadPage() {
    students.forEach(student => {
        if(codigo == student.studentData[0].codigo) {
            studentLogged = student.studentData;
            welcomeMessage.innerHTML = '!Hola, '+ studentLogged[0].nombre + "!";
            console.log(studentLogged)
        }
    });
}

async function loadRecomendationCards(recomendation) {
    recomendation.forEach((plate, index) => {
        if( index < 10) {
            let card = document.createElement('recomendation-card')

            card.name = plate
            card.nameText = plate
                .charAt(0).toUpperCase() + plate.slice(1)
                .replace(/-/g, ' ');
                
            const contenedor = document.getElementById('recomendation-cards');

        contenedor.appendChild(card);
        }
    });
}

loadPage();
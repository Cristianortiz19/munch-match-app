import { getStudents } from "../firebase.js";

let students = await getStudents();

const welcomeMessage = document.getElementById('welcome-message');

const urlParams = new URLSearchParams(window.location.search);
const codigo = urlParams.get('user');

// llamar función de python
function callFunction() {
    const parametroJs = codigo

    const xhr = new XMLHttpRequest();

    xhr.open('POST', 'http://localhost:5050/plate_recomendation',  true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const respuestaPython = JSON.parse(xhr.responseText);
            console.log(respuestaPython.result);
        }
    };

    const datos = {parametro: parametroJs};
    xhr.send(JSON.stringify(datos))
}

callFunction()

let studentLogged = [];

async function loadPage() {
    students.forEach(student => {
        if(codigo == student.studentData[0].codigo) {
            studentLogged = student.studentData;
            welcomeMessage.innerHTML = '!Hola, '+ studentLogged[0].nombre + "!";
            console.log(studentLogged)
        }
    });
}

loadPage();
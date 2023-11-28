import { getStudents } from "../firebase.js";

let students = await getStudents();

const welcomeMessage = document.getElementById('welcome-message');

const urlParams = new URLSearchParams(window.location.search);
const codigo = urlParams.get('user');

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
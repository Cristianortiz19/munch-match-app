import { getStudents } from "../firebase.js";
const { PythonShell } = require('python-shell');

const options = {
    scriptPath: '../',
    pythonPath: 'back-end'
}

const pyshell = new PythonShell('main.py', options);

pyshell.on('message', (message) => {
    const recomendationList = JSON.parse(message);
    console.log(recomendationList)
})

pyshell.on('error', (err) => {
    console.error(err);
})

let students = await getStudents();

const welcomeMessage = document.getElementById('welcome-message');

const urlParams = new URLSearchParams(window.location.search);
const codigo = urlParams.get('user');

pyshell.send(codigo);

pyshell.end((err, code, signal) => {
    if (err) throw err;
    console.log('Script Python finalizado con código', code)
})

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
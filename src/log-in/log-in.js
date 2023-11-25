import { getStudents } from "../firebase.js";

let students = await getStudents();

const confirmButton = document.getElementById('user-login-button');
const codigo = document.getElementById('codigo');

let studentLogin = [];

confirmButton.addEventListener('click', () => {
    console.log(students[0])
    students.forEach(student => {
        
    });
})
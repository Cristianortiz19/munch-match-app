import { getStudents } from "../firebase.js";

let students = await getStudents();

const confirmButton = document.getElementById('user-login-button');
const codigo = document.getElementById('codigo');


confirmButton.addEventListener('click', () => {
    students.forEach(student => {
        if (codigo.value !== '') {
            if (codigo.value == student.studentData[0].codigo) {
                window.location.href = '../home/index.html?user=' + codigo.value
            }
        }
        
    });
})


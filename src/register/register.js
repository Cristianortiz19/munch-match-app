import { addStudent } from "../firebase.js";

let userRegister = document.getElementById('user-register-button')
let registerScreen = document.getElementById('register-screen');

let studentData = []

let alergiasScreen = document.getElementById('alergias-screen')


userRegister.addEventListener('click', () => {
    let name = document.getElementById('name').value;
    let codigo = document.getElementById('codigo').value;

    if (name !== '' && codigo !== '') {
        registerScreen.style.display = 'none';
        alergiasScreen.style.display = 'flex';
        let data = {
            nombre: name,
            codigo: codigo,
        }

        studentData.push(data)
        console.log(studentData)
    }
})


const checkboxList = document.querySelectorAll('.checkbox-container');
const checkboxImage = document.querySelectorAll('.checkbox-image')

checkboxList.forEach((checkbox, index) => {
    checkbox.addEventListener('click', () => {
         let checkboxStatus = checkbox.getAttribute('status');
         if (checkboxStatus == 0) {
            checkboxImage[index].style.filter = "brightness(20%)";
            checkbox.setAttribute('status', '1');
         } else {
            checkboxImage[index].style.filter = "brightness(100%)";
            checkbox.setAttribute('status', '0');
         }
        
    })
});

const alergiasButton = document.getElementById('alergias-button');
const harinaScreen = document.getElementById('harinas-screen')

alergiasButton.addEventListener('click', () => {
    let alergias =  {
        leche: checkboxList[0].getAttribute('status'),
        queso: checkboxList[1].getAttribute('status'),
        huevo: checkboxList[2].getAttribute('status'),
        maiz: checkboxList[3].getAttribute('status'),
        cebolla: checkboxList[4].getAttribute('status'),
        habicuela: checkboxList[5].getAttribute('status'),
        gluten: checkboxList[6].getAttribute('status'),
        cafe: checkboxList[7].getAttribute('status'),
        mani: checkboxList[8].getAttribute('status'),
        frutosSecos: checkboxList[9].getAttribute('status'),
        mariscos: checkboxList[10].getAttribute('status'),
        pescado: checkboxList[11].getAttribute('status'),
        tomate: checkboxList[12].getAttribute('status'),
        soya: checkboxList[13].getAttribute('status'),
    }
    studentData.push(alergias)
    alergiasScreen.style.display = 'none';
    harinaScreen.style.display = 'block';
    console.log(studentData)
})

const gustosButtonHarina = document.getElementById('gustos-button-harina')
const gustosButtonVegetal = document.getElementById('gustos-button-vegetales')
const gustosList = document.querySelectorAll('.gustos-slider')
const gustosButtonProteina = document.getElementById('gustos-button-proteina')


const vegetalScreen = document.getElementById('vegetales-screen')
const proteinaScreen = document.getElementById('proteinas-screen')

gustosButtonHarina.addEventListener('click', () => {
    harinaScreen.style.display = 'none';
    vegetalScreen.style.display = 'block'
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
})

gustosButtonVegetal.addEventListener('click', () => {
    vegetalScreen.style.display = 'none'
    proteinaScreen.style.display = 'block'
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
})

const gracias = document.getElementById('gracias')

gustosButtonProteina.addEventListener('click', (e) => {
    let gustos =  {
        arroz: gustosList[0].value,
        quinua: gustosList[1].value,
        papa: gustosList[2].value,
        pasta: gustosList[3].value,
        vegetales: gustosList[4].value,
        tomate: gustosList[5].value,
        aguacate: gustosList[6].value,
        zanahoria: gustosList[7].value,
        cebolla: gustosList[8].value,
        lechuga: gustosList[9].value,
        pepino: gustosList[10].value,
        maiz: gustosList[11].value,
        champiñones: gustosList[12].value,
        pollo: gustosList[13].value,
        res: gustosList[14].value,
        cerdo: gustosList[15].value,
        pescado: gustosList[16].value,
        mariscos: gustosList[17].value,
        tofu: gustosList[18].value,
        legumbres: gustosList[19].value,
    }
    studentData.push(gustos)
    proteinaScreen.style.display = 'none'
    console.log(studentData)
    
    uploadStudent(e, studentData)
    setTimeout(window.location.href = '../log-in/index.html', 1000);
    
})


async function uploadStudent(e, student) {
    e.preventDefault();
    const name = student[0].nombre.toLowerCase().replace(/ /, '-')

    console.log('Estudiante publicado!', student)
    await addStudent(student, name);
}

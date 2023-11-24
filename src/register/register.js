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
    console.log(studentData)
})



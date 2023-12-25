let divOutput = document.getElementById('divOutput');
let inputName = document.getElementById('inputName');
let inputEmail = document.getElementById('inputEmail');
let inputPassword = document.getElementById('inputPassword');

document.getElementById('formMy').addEventListener('submit', function(event) {
    event.preventDefault();
    let p = document.createElement('p');
    p.innerText = 'Отправлено - Имя: ' + inputName.value + '; email: '+ inputEmail.value  + '; пароль: ' + inputPassword.value;
    
    divOutput.append(p);

    inputName.value = "";
    inputEmail.value = "";
    inputPassword.value = "";
});
let divInputs_input = document.getElementById('divInputs-input');
let selectOperationType = document.getElementById('selectOperationType');
let divInputs_number = document.getElementById('divInputs-number');
let spanTotal_total = document.getElementById('spanTotal-total');
let logCounter = 0;

divInputs_input.addEventListener('input', function(){
    divInputs_input.style.border = '1px solid black';
});

divInputs_number.addEventListener('input', function(){
    divInputs_number.style.border = '1px solid black';
});

document.getElementById('buttonCalculate').addEventListener('click', function(){
    if(divInputs_input.value.trim() == ""){
        divInputs_input.style.border = '1px solid red';
        return;
    }
    if(divInputs_number.value <= 0){
        divInputs_number.style.border = '1px solid red';
        return;
    }

    //создание строки лога------------------------------------------------------

    let span1 = document.createElement('span');
    span1.classList.add('spanDescription');
    span1.innerText = 'Операция - ' + divInputs_input.value + '; тип операции - ';

    let spanOperationbType = document.createElement('span');
    spanOperationbType.classList.add('spanDescription');
    spanOperationbType.id = 'spanOperationbType' + logCounter;
    spanOperationbType.innerText = selectOperationType.options[selectOperationType.selectedIndex].textContent;

    let span2 = document.createElement('span');
    span2.classList.add('spanDescription');
    span2.innerText = '; сумма операции - ';

    let spanNumber = document.createElement('span');
    spanNumber.classList.add('spanDescription');
    spanNumber.id = 'spanNumber' + logCounter;
    spanNumber.innerText = Number(divInputs_number.value);


    let buttonDelete = document.createElement('button');
    buttonDelete.classList.add('buttonDel');
    buttonDelete.innerText = 'Удалить операцию';
    buttonDelete.addEventListener('click', function(){
        let divParent = this.parentElement;
        let counter = divParent.querySelector('span');

        let operationType = document.getElementById('spanOperationbType' + counter.innerHTML);
        let logNumber  = document.getElementById('spanNumber' + counter.innerText);

        if(operationType.innerText == 'Расход'){
            spanTotal_total.innerText = Number(spanTotal_total.innerText) +  Number(logNumber.innerText);
        }else{
            spanTotal_total.innerText = Number(spanTotal_total.innerText) -  Number(logNumber.innerText);
        }

        divParent.remove();
        
    });

    let spanCounter = document.createElement('span');
    spanCounter.innerText = logCounter;
    spanCounter.style.display = 'none';

    let divLog = document.createElement('div');
    divLog.classList.add('spanDescription');
    divLog.id = 'divLog' + logCounter;
    divLog.append(spanCounter);
    divLog.append(span1);
    divLog.append(spanOperationbType);
    divLog.append(span2);
    divLog.append(spanNumber);
    divLog.append(buttonDelete);

    document.getElementById('divInputsLogs').append(divLog);
    logCounter++;

    //Обновление значения в поле "баланс лога"-------------------------------------------------------

    if(selectOperationType.value == 'consumption'){
        spanTotal_total.innerText = Number(spanTotal_total.innerText) -  Number(divInputs_number.value);
    }else{
        spanTotal_total.innerText = Number(spanTotal_total.innerText) +  Number(divInputs_number.value);
    }


    divInputs_number.value = '0';
});


let divTasks = document.getElementById('divTasks');
let inputTaskName = document.getElementById('inputTaskName');


let pCounter = document.createElement('p');
pCounter.style.display = 'none';
pCounter.innerText = 0;
divTasks.append(pCounter);

document.getElementById('formTaskInput').addEventListener('submit', function(event) {
    event.preventDefault();
    drawTask(inputTaskName.value, 'не выполнена', pCounter.innerText);
    addTaskToLocalStorage(inputTaskName.value, 'не выполнена', pCounter.innerText);
    pCounter.innerText = Number(pCounter.innerText) + 1;
    
});

function drawTask(taskName, taskStatus, counter){
    let divTask = document.createElement('div');
    divTask.classList.add('divTask');
    divTask.id = 'divTask' + counter;

    let divTaskName = document.createElement('div');
    divTaskName.classList.add('taskText');
    divTaskName.innerText = 'Название задачи: ' + taskName;

    //собрал строку статус
    let divStatus = document.createElement('div');
    let spanTitle = document.createElement('span');
    let spanValue = document.createElement('span');

    spanTitle.classList.add('taskText');
    spanTitle.innerText = 'Статус:';
    spanValue.classList.add('taskText');
    if(taskStatus == 'не выполнена'){
        spanValue.innerText = 'не выполнена';
    }else{
        spanValue.innerText = 'выполнена';
    }
    

    divStatus.append(spanTitle);
    divStatus.append(spanValue);

    let divLeftPart = document.createElement('div');
    divLeftPart.append(divTaskName);
    divLeftPart.append(divStatus);

    let divButtons = document.createElement('div');
    let buttonChangeStatus = document.createElement('button');
    let buttonRemove = document.createElement('button');

    buttonChangeStatus.classList.add('taskButton1');
    buttonChangeStatus.textContent = 'Отметить как выполненную';
    buttonChangeStatus.addEventListener('click', function(){
        let par = this.parentNode.parentNode;
        if(buttonChangeStatus.textContent == 'Отметить как выполненную'){
            par.style.backgroundColor = 'rgb(182, 246, 182)';
            par.style.border = '0.5px solid rgb(97, 208, 97)';
            this.textContent = 'Отметить как невыполненную';
            ((par.querySelectorAll('div')[2]).querySelectorAll('span')[1]).textContent = 'выполнена';
            changeTaskStatusInLocalStorage('выполнена', counter);
        }else{
            par.style.backgroundColor = 'rgb(247, 212, 212)';
            par.style.border = '0.5px solid rgb(251, 185, 185)';
            this.textContent = 'Отметить как выполненную';
            ((par.querySelectorAll('div')[2]).querySelectorAll('span')[1]).textContent = 'не выполнена';
            changeTaskStatusInLocalStorage('не выполнена', counter);
        }
    });

    buttonRemove.classList.add('taskButton2');
    buttonRemove.textContent = 'Удалить задачу';
    buttonRemove.addEventListener('click', function(){
        let divTask = this.parentNode.parentNode;
        divTask.remove();
        removeTaskFromLocalStorage(counter);

    });
    divButtons.append(buttonChangeStatus);
    divButtons.append(buttonRemove);

    divTask.append(divLeftPart);
    divTask.append(divButtons);


    divTasks.append(divTask);

    if(taskStatus == 'выполнена'){

        buttonChangeStatus.click();
    }
}

function addTaskToLocalStorage(taskName, taskStatus, id){
    if(localStorage.getItem('MyToDoList')){
        let stringRecord = localStorage.getItem('MyToDoList');
        let taskArr = JSON.parse(stringRecord);
        let task = {
            id : id,
            taskName : taskName.value,
            taskStatus : taskStatus
        }
        taskArr.push(task);
        localStorage.setItem('MyToDoList', JSON.stringify(taskArr));
    }else{
        let task = {
            id : id,
            taskName : taskName.value,
            taskStatus : taskStatus
        }
        let taskArr = [task];
        localStorage.setItem('MyToDoList', JSON.stringify(taskArr));
    }
    
}

function changeTaskStatusInLocalStorage(taskStatus, taskId){
    let stringRecord = localStorage.getItem('MyToDoList');
    let taskArr = JSON.parse(stringRecord);
    for(let i = 0; i < taskArr.length; i++){
        if(taskArr[i].id == taskId){
            taskArr[i].taskStatus = taskStatus;
            break;
        }
    }
    
    localStorage.setItem('MyToDoList', JSON.stringify(taskArr));
}

function removeTaskFromLocalStorage(taskId){
    let stringRecord = localStorage.getItem('MyToDoList');
    let taskArr = JSON.parse(stringRecord);
    let i = 0
    for(; i < taskArr.length; i++){
        if(taskArr[i].id == taskId){
            break;
        }
    }
    taskArr.splice(i, 1);
    localStorage.setItem('MyToDoList', JSON.stringify(taskArr));
};


(function loadTasksFromLocalStorage(){
    if(localStorage.getItem('MyToDoList')){
        let stringRecord = localStorage.getItem('MyToDoList');
        let taskArr = JSON.parse(stringRecord);
        taskArr.forEach(element => {
            drawTask(element.taskName, element.taskStatus, element.id);    
        });
        pCounter.innerText = taskArr.length;
    }
})();

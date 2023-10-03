document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('tasks');

    
    function createTaskElement(taskText) {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        taskElement.innerHTML = `<div>${taskText}</div><button class="complete-button">Complete</button>`;
        return taskElement;
    }


    function addTask() {
        const taskText = taskInput.value.trim();
    
        if (taskText !== '') {
            const taskElement = createTaskElement(taskText);
            taskList.appendChild(taskElement);
            taskInput.value = '';
            const completeButton = taskElement.querySelector('.complete-button');
            completeButton.addEventListener('click', () => {
                taskElement.classList.toggle('completed');
            });
        }
    }

   
    addTaskButton.addEventListener('click', addTask);

    
    taskInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});

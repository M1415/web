document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            center: 'dayGridMonth,timeGridWeek,timeGridDay',
        }, 
        firstDay: 1
    });
    calendar.render();

    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task');
    const taskDateInput = document.getElementById('task-date');
    const taskList = document.getElementById('tasks');

    
    calendarEl.addEventListener('click', function(info) {
        if (info.dayEl) {
            selectedDate = info.date;
            taskDateInput.valueAsDate = selectedDate;
        }
    });

    function createTaskElement(taskText, taskDate) {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        taskElement.innerHTML = `<div>${formatDate(taskDate)}</div>
                                <div>${taskText}</div>
                                <button class="complete-button">Complete</button>`;
        return taskElement;
    }

    function formatDate(taskDate) {
        const d = new Date(taskDate).toLocaleDateString();
        return d;
    }

    function addTask() {
        const taskText = taskInput.value.trim();
        const taskDate = taskDateInput.valueAsDate;
    
        if (taskText !== '' && taskDate) {
            const taskElement = createTaskElement(taskText, taskDate);

            const index = findIndex(taskDate);
            if (index == taskList.childElementCount) {
                taskList.appendChild(taskElement);
            } else {
                taskList.insertBefore(taskElement, taskList.children[index]);
            }


            taskInput.value = '';
            const completeButton = taskElement.querySelector('.complete-button');
            completeButton.addEventListener('click', () => {
                taskElement.classList.toggle('completed');
            });
        }
    }

    function findIndex(newTaskDate) {
        const taskElements = taskList.querySelectorAll('.task');
        for (let i = 0; i < taskElements.length; i++) {
            const taskElement = taskElements[i];
            const dateElement = taskElement.querySelector('div').textContent;
            const taskDate = dateElement;
            const newDate = formatDate(newTaskDate);


            if (change(newDate) < change(taskDate)) {
                return i;
            }
        }
        return taskElements.length;
    }
   
    function change(date){
        var parts = date.split("/");
        return new Date(parts[2], parts[1] - 1, parts[0]);
    }


    addTaskButton.addEventListener('click', addTask);

    
    taskInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});

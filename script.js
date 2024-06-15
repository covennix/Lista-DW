const taskInput = document.getElementById('task');
const addTaskButton = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const createdTasksCount = document.getElementById('created-tasks');
const completedTasksCount = document.getElementById('completed-tasks');
const espacoTarefas = document.getElementById('espacoTarefas');

let tasksCreated = 0;
let tasksCompleted = 0;

addTaskButton.addEventListener('click', function() {
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const newTaskItem = document.createElement('li');
        newTaskItem.classList.add('task-item');

        newTaskItem.innerHTML = `
            <label>
                <input type="checkbox" class="task-checkbox">
                <span>${taskText}</span>
            </label>
            <button class="delete-btn">
                <svg xmlns="http://www.w3.org/2000/svg" height="12px" viewBox="0 0 24 24" width="12px" fill="#808080">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M19 6h-4.83l-1-1H10l-1 1H5v2h14V6zm-4 11v-8H9v8h6zm-3-6.83l-.59.59L12 12.59l-1.41-1.41-.59-.59L11.41 11 10 9.59l1.41-1.41.59-.59L12 9.41l1.41-1.41.59.59L12.59 11l1.41 1.41z"/>
                </svg>
            </button>
        `;

        taskList.appendChild(newTaskItem);
        tasksCreated++;

        taskInput.value = '';
        createdTasksCount.textContent = tasksCreated;

        checkTasksExistence();
        updateCompletedTasksCount(); // Verifica tarefa concluída imediatamente após adição
    }
});

function updateCompletedTasksCount() {
    const checkboxes = document.querySelectorAll('.task-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const isChecked = this.checked;
            const taskItem = this.closest('.task-item');

            if (isChecked) {
                taskItem.classList.add('completed');
                tasksCompleted++;
            } else {
                taskItem.classList.remove('completed');
                tasksCompleted--;
            }

            completedTasksCount.textContent = `${tasksCompleted} de ${tasksCreated}`;
            checkTasksExistence();
        });
    });
}

function checkTasksExistence() {
    const tasksExist = taskList.childElementCount > 0;
    espacoTarefas.style.display = tasksExist ? 'none' : 'block';
}

taskList.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
        const taskItem = event.target.closest('.task-item');
        taskItem.remove();

        tasksCreated--;
        createdTasksCount.textContent = tasksCreated;

        if (taskItem.classList.contains('completed')) {
            tasksCompleted--;
            completedTasksCount.textContent = `${tasksCompleted} de ${tasksCreated}`;
        }

        checkTasksExistence();
    }
});

// Inicializa a exibição correta do espaço de tarefas ao carregar a página
window.addEventListener('DOMContentLoaded', function() {
    checkTasksExistence();
});

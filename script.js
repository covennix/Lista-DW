document.addEventListener('DOMContentLoaded', () => {
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task');
    const taskList = document.getElementById('task-list');
    const createdTasksSpan = document.getElementById('created-tasks');
    const completedTasksSpan = document.getElementById('completed-tasks');

    const updateTaskCount = () => {
        const totalTasks = taskList.querySelectorAll('li').length;
        const completedTasks = taskList.querySelectorAll('input[type="checkbox"]:checked').length;
        createdTasksSpan.textContent = totalTasks;
        completedTasksSpan.textContent = `${completedTasks} de ${totalTasks}`;
    };

    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        const newTask = document.createElement('li');
        newTask.innerHTML = `
            <input type="checkbox">
            <span>${taskText}</span>
        `;
        taskList.appendChild(newTask);

        taskInput.value = '';
        updateTaskCount();
    });

    taskList.addEventListener('change', (e) => {
        if (e.target.type === 'checkbox') {
            updateTaskCount();
        }
    });

    updateTaskCount();
});

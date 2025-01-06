const addButton = document.getElementById('addButton');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
const toggleMode = document.getElementById('toggleMode');
const pendingCounter = document.getElementById('pendingCounter');

toggleMode.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode', toggleMode.checked);
});

document.addEventListener('DOMContentLoaded', () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    storedTasks.forEach(task => {
        createTaskElement(task.text, task.completed);
    });
    updatePendingCount();
});

function createTaskElement(text, completed = false) {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = text;
    if (completed) {
        span.classList.add('completed');
    }
    span.addEventListener('click', () => {
        span.classList.toggle('completed');
        updatePendingCount(); 
        saveTasks(); 
    });
    li.appendChild(span);

    const iconContainer = document.createElement('div');
    iconContainer.classList.add('icon-container');

    const editIcon = document.createElement('i');
    editIcon.className = 'bi bi-pencil-square edit-icon';
    editIcon.addEventListener('click', () => {
        const newText = prompt('Edit your task:', span.textContent);
        if (newText !== null) {
            span.textContent = newText.trim() || span.textContent;
            saveTasks(); 
        }
    });

    const trashIcon = document.createElement('i');
    trashIcon.className = 'fas fa-trash';
    trashIcon.addEventListener('click', () => {
        li.remove();
        updatePendingCount(); 
        saveTasks(); 
    });

    iconContainer.appendChild(editIcon);
    iconContainer.appendChild(trashIcon);

    li.appendChild(iconContainer);

    todoList.appendChild(li);
}

addButton.addEventListener('click', () => {
    const todoText = todoInput.value.trim();
    if (todoText) {
        createTaskElement(todoText);
        todoInput.value = '';
        updatePendingCount(); 
        saveTasks(); 
    }
});

function updatePendingCount() {
    const pendingTasks = Array.from(todoList.getElementsByTagName('li'))
        .filter(li => !li.querySelector('span').classList.contains('completed'));
    pendingCounter.textContent = `Pending Tasks: ${pendingTasks.length}`;
}

function saveTasks() {
    const tasks = [];
    const listItems = todoList.getElementsByTagName('li');
    Array.from(listItems).forEach(item => {
        const taskText = item.querySelector('span').textContent;
        const isCompleted = item.querySelector('span').classList.contains('completed');
        tasks.push({ text: taskText, completed: isCompleted });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

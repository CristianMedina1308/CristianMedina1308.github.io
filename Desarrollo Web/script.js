const todos = [  // array que contiene las tareas de todos
    {
        title: 'Get groceries',
        dueDate: '2021-10-04',
        id: Date.now()
    },
    {
        title: 'Wash car',
        dueDate: '2021-02-03',
        id: Date.now() + 1 // aqui se genera un id unico por cada tarea 
    },
    {
        title: 'Make dinner',
        dueDate: '2021-03-04',
        id: Date.now() + 2
    }
];

// funcion para renderizar las tareas en la pantalla 

function render() {
    document.getElementById('todo-list').innerHTML = '';
    todos.forEach(function (todo) {
        const element = document.createElement('div');
        element.classList.add('todo-item');
        element.innerHTML = `
            <input type="text" class="edit-title" value="${todo.title}" disabled />
            <input type="date" class="edit-date" value="${todo.dueDate}" disabled />
            <button class="edit-btn" onclick="toggleEdit(${todo.id})">Edit</button>
            <button class="delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>
        `;
        document.getElementById('todo-list').appendChild(element);
    });
}

// aqui esta la funcion para añadir la tarea nueva

function addTodo() {
    const textbox = document.getElementById('todo-title');
    const title = textbox.value;
    const datePicker = document.getElementById('date-picker');
    const dueDate = datePicker.value;

    if (title && dueDate) {
        todos.push({
            title: title,
            dueDate: dueDate,
            id: Date.now()
        });
        render();
    } else {
        alert('Please enter both task title and due date');
    }
    textbox.value = '';
    datePicker.value = '';
}

// funcion para editar y guardar un registro ya guardado

function toggleEdit(id) {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        const todoElements = document.querySelectorAll('.todo-item');
        todoElements.forEach(item => {
            const titleInput = item.querySelector('.edit-title');
            const dateInput = item.querySelector('.edit-date');
            const editButton = item.querySelector('.edit-btn');

            if (titleInput && dateInput && editButton) {
                if (editButton.innerText === 'Edit') {
                    titleInput.disabled = false;
                    dateInput.disabled = false;
                    editButton.innerText = 'Save';
                } else {
                    titleInput.disabled = true;
                    dateInput.disabled = true;
                    editButton.innerText = 'Edit';

                    todo.title = titleInput.value;
                    todo.dueDate = dateInput.value;
                    render();
                }
            }
        });
    }
}

// funcion para eliminar una tarea 

function deleteTodo(id) {
    const index = todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
        todos.splice(index, 1);
        render();
    }
}

render();

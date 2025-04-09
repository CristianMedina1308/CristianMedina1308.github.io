let todos = [];

function saveTodos() {
  if (currentUser) {
    localStorage.setItem(`todos_${currentUser}`, JSON.stringify(todos));
  }
}

function loadTodos() {
  if (currentUser) {
    todos = JSON.parse(localStorage.getItem(`todos_${currentUser}`)) || [];
  }
}

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
    saveTodos();
    render();
    textbox.value = '';
    datePicker.value = '';
  } else {
    alert('Por favor ingresa título y fecha');
  }
}

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
          saveTodos();
          render();
        }
      }
    });
  }
}

function deleteTodo(id) {
  const index = todos.findIndex(todo => todo.id === id);
  if (index !== -1) {
    todos.splice(index, 1);
    saveTodos();
    render();
  }
}

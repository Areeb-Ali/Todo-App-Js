const todoList = document.getElementById('todo-list');
const newTodoInput = document.getElementById('new-todo');
const addButton = document.getElementById('add-button');
const deleteAllButton = document.getElementById('delete-all');
const deleteSelectedButton = document.getElementById('delete-selected');

let todos = []; // Array to store todo objects

// Function to create a new todo object
function createTodo(text) {
  return { text, completed: false, id: Date.now() }; // Use unique ID for edit functionality
}

// Function to render todos from the array
function renderTodos() {
  todoList.innerHTML = ''; // Clear existing list items

  todos.forEach((todo) => {
    const todoItem = document.createElement('li');
    todoItem.classList.add('todo-item');
    todoItem.dataset.id = todo.id; // Add data attribute for editing

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => {
      todo.completed = !todo.completed;
      saveTodos();
      renderTodos();
    });

    const label = document.createElement('label');
    label.textContent = todo.text;

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => editTodo(todo.id));

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTodo(todo.id));

    todoItem.appendChild(checkbox);
    todoItem.appendChild(label);
    todoItem.appendChild(editButton);
    todoItem.appendChild(deleteButton);

    todoList.appendChild(todoItem);
  });
}

// Function to add a new todo
function addTodo() {
  const text = newTodoInput.value.trim();
  if (text) {
    todos.push(createTodo(text));
    saveTodos(); // Save to local storage for persistence
    renderTodos();
    newTodoInput.value = ''; // Clear input field
  }
}

// Function to edit a todo
function editTodo(id) {
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex !== -1) {
    const newText = prompt('Enter the updated text:', todos[todoIndex].text);
    if (newText) {
      todos[todoIndex].text = newText;
      saveTodos();
      renderTodos();
    }
  }
}

// Function to delete a todo
function deleteTodo(id) {
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex !== -1) {
    todos.splice(todoIndex, 1);
    saveTodos();
    renderTodos();
  }
}

// Function to delete all todos
function deleteAllTodos() {
  if (confirm('Are you sure you want to delete all todos?')) {
    todos = [];
    saveTodos();
    renderTodos();
  }
}

// Function to save todos to local storage (optional)
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos)); // Convert to JSON
}

// Function to load todos from local storage (optional)
function loadTodos() {
  const storedTodos = localStorage.getItem('todos');
  if (storedTodos) {
    todos = JSON.parse(storedTodos); // Parse back from JSON
  }
  renderTodos();
}

// Event listeners
addButton.addEventListener('click', addTodo);
deleteAllButton.addEventListener('click', deleteAllTodos);
deleteSelectedButton.addEventListener('click', () => {
  // Implement logic to delete only checked items
  const checkedTodos = todos.filter((todo) => todo.completed);
  if (checkedTodos.length > 0) {
    if (confirm(`Are you sure you want to delete ${checkedTodos.length} selected todos?`)) {
      todos = todos.filter((todo) => !todo.completed);
      saveTodos();
      renderTodos();
    }
  } else {
    alert('No checked tasks to delete.');
  }
});

// Load todos from

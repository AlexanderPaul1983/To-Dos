// Funktion zum Laden der To-Do-Items
async function loadTodos() {
    const response = await fetch('/api/todos');
    const todos = await response.json();

    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';  // Liste zurücksetzen

    // Jedes To-Do-Item anzeigen
    todos.forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');

        const title = document.createElement('span');
        title.textContent = todo.title;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Löschen';
        deleteButton.onclick = () => deleteTodo(todo.id);

        todoItem.appendChild(title);
        todoItem.appendChild(deleteButton);
        todoList.appendChild(todoItem);
    });
}

// Funktion zum Hinzufügen eines neuen To-Do-Items
async function addTodo() {
    const title = document.getElementById('todoTitle').value;
    if (title.trim() === '') return alert('Bitte einen Titel eingeben');

    await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, completed: false })
    });

    document.getElementById('todoTitle').value = '';  // Eingabefeld leeren
    loadTodos();  // Liste neu laden
}

// Funktion zum Löschen eines To-Do-Items
async function deleteTodo(id) {
    await fetch(`/api/todos/${id}`, { method: 'DELETE' });
    loadTodos();  // Liste neu laden
}

// Beim Laden der Seite die To-Do-Liste laden
document.addEventListener('DOMContentLoaded', loadTodos);

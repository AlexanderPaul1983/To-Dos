// Funktion zum Laden der To-Do-Items
async function loadTodos() {
    const response = await fetch('/api/todos');
    const todos = await response.json();

    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';

    // Jedes To-Do-Item anzeigen
    todos.forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');

        const img = document.createElement('img');
        img.src = todo.imgLink;

        const title = document.createElement('span');
        title.textContent = todo.title;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Löschen';
        deleteButton.onclick = () => deleteTodo(todo.id);


        todoItem.appendChild(title);
        todoItem.appendChild(img);
        todoItem.appendChild(deleteButton);
        todoList.appendChild(todoItem);
    });
}

const imgList = {
   "learn": "/img/emotion-1740913_640.png",
   "sleep": "/img/sleep.svg",
   "go shopping": "/img/vegan-einkaufen-e1551709877323.jpg"
};

// Funktion zum Hinzufügen eines neuen To-Do-Items
async function addTodo() {
    let title = document.getElementById('todoTitle').value;
    if (title.trim() === '') return alert('Bitte einen Titel eingeben');

    title = title.toLowerCase();

    const img = imgList[title] || "/img/emoticon-1610573_640.png";

    await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, completed: false, imgLink: img })
    });

    document.getElementById('todoTitle').value = '';
    loadTodos();
}

// Funktion zum Löschen eines To-Do-Items
async function deleteTodo(id) {
    await fetch(`/api/todos/${id}`, { method: 'DELETE' });
    loadTodos();
}

// Beim Laden der Seite die To-Do-Liste laden
document.addEventListener('DOMContentLoaded', loadTodos);

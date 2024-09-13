document.getElementById('loginForm').addEventListener('submit', function (event) {
  event.preventDefault();  

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === 'ayaaz' && password === '12345') {
      localStorage.setItem('loggedIn', 'true');
      window.location.href = 'todolist.html';  
  } else {
      document.getElementById('error-message').textContent = 'Invalid credentials';
      document.getElementById('error-message').style.display = 'block';
  }
});

if (window.location.pathname.includes('todolist.html') && !localStorage.getItem('loggedIn')) {
  window.location.href = 'index.html';  
}

function logout() {
  localStorage.removeItem('loggedIn');  
  window.location.href = 'index.html';  
}

function fetchTodos() {
  fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(todos => {
          const tableBody = document.getElementById('todo-table-body');
          tableBody.innerHTML = '';  

          todos.forEach(todo => {
              const row = document.createElement('tr');
              
              const idCell = document.createElement('td');
              idCell.textContent = todo.id;
              row.appendChild(idCell);
              
              const titleCell = document.createElement('td');
              titleCell.textContent = todo.title;
              row.appendChild(titleCell);
              
              const statusCell = document.createElement('td');
              const checkbox = document.createElement('input');
              checkbox.type = 'checkbox';
              checkbox.checked = todo.completed;
              checkbox.disabled = todo.completed;  
              statusCell.appendChild(checkbox);
              row.appendChild(statusCell);
              
              tableBody.appendChild(row);
          });
      })
      .catch(error => {
          console.error('Error fetching the todo list:', error);  
      });
}


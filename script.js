document.addEventListener('DOMContentLoaded', function() {
    const welcomeContainer = document.getElementById('welcome-container');
    const welcomeText = document.getElementById('welcome-text');
    const loginContainer = document.getElementById('login-container');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginError = document.getElementById('login-error');
    const registerError = document.getElementById('register-error');

    if (welcomeContainer) {
        // Show welcome message for 2 seconds, then display login form
        setTimeout(() => {
            // Adjust welcome message color based on background
            const bgColor = window.getComputedStyle(document.body, null).backgroundColor;
            welcomeText.style.color = getContrastingColor(bgColor);
            setTimeout(() => {
                loginContainer.classList.remove('hidden');
            }, 2000);
        }, 3000);
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            const storedUser = localStorage.getItem('username');
            const storedPassword = localStorage.getItem('password');

            if (username === storedUser && password === storedPassword) {
                window.location.href = 'index.html';
            } else {
                loginError.classList.remove('hidden');
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('reg-username').value;
            const password = document.getElementById('reg-password').value;
            const confirmPassword = document.getElementById('reg-confirm-password').value;

            if (password !== confirmPassword) {
                registerError.classList.remove('hidden');
                return;
            }

            localStorage.setItem('username', username);
            localStorage.setItem('password', password);

            alert('Registration successful! Please log in.');
            window.location.href = 'login.html';
        });
    }

    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    if (todoForm) {
        todoForm.addEventListener('submit', function(event) {
            event.preventDefault();
            addTodo(todoInput.value);
            todoInput.value = '';
        });
    }

    function addTodo(task) {
        if (task.trim() === '') return;

        const li = document.createElement('li');
        li.textContent = task;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            todoList.removeChild(li);
        });

        li.appendChild(deleteButton);
        todoList.appendChild(li);
    }

    function getContrastingColor(color) {
        const rgb = color.replace(/[^\d,]/g, '').split(',');
        const brightness = Math.round(((parseInt(rgb[0]) * 299) +
                                      (parseInt(rgb[1]) * 587) +
                                      (parseInt(rgb[2]) * 114)) / 1000);
        return (brightness > 125) ? 'black' : 'white';
    }
});

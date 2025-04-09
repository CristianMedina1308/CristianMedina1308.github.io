let currentUser = null;

function register() {
  const username = document.getElementById('register-username').value;
  const password = document.getElementById('register-password').value;

  if (!username || !password) {
    alert('Por favor ingresa usuario y contraseña');
    return;
  }

  if (localStorage.getItem(`user_${username}`)) {
    alert('Este usuario ya está registrado.');
    return;
  }

  localStorage.setItem(`user_${username}`, JSON.stringify({ username, password }));
  alert('Usuario registrado correctamente!');
}

function login() {
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;
  const userData = JSON.parse(localStorage.getItem(`user_${username}`));

  if (userData && userData.password === password) {
    currentUser = username;
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('todo-app').style.display = 'block';
    document.getElementById('welcome-user').innerText = `¡Bienvenido, ${username}!`;

    loadTodos(); // cargar tareas del usuario
    render();
  } else {
    alert('Usuario o contraseña incorrectos.');
  }
}

function logout() {
  currentUser = null;
  document.getElementById('auth-section').style.display = 'block';
  document.getElementById('todo-app').style.display = 'none';
}

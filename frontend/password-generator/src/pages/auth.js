
document.getElementById('registrationForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const repeatPassword = document.getElementById('repeatPassword').value;

    if (password !== repeatPassword) {
        alert("Пароли не совпадают!");
        return;
    }

    try {
        const response = await fetch('http://localhost:8080/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password }) // Исправлено: была лишняя точка с запятой
        });

        if (response.ok) {
            alert("Регистрация успешна!");
            window.location.href = '/generator';
        } else {
            const errorData = await response.json();
            alert(errorData.message || 'Ошибка регистрации');
        }
    } catch (error) {
        alert("Ошибка сети или сервера");
    }
});
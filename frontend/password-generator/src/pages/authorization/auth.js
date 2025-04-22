document.getElementById('registrationForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const repeatPassword = document.getElementById('repeatPassword').value;

    // Простая валидация
    if (password !== repeatPassword) {
        alert("Passwords don't match!");
        return;
    }

    try {
        const response = await fetch('http://localhost:8080/passwordgenerator/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
                password
            })
        });

        if (response.ok) {
            alert('Registration successful!');
            // Перенаправление на другую страницу после успешной регистрации
            window.location.href = '/generator';
        } else {
            const errorData = await response.json();
            alert(errorData.message || 'Registration failed');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during registration');
    }
});
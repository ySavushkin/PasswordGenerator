from locust import HttpUser, task, between

class DemoUser(HttpUser):
    # Час між запитами (від 1 до 5 секунд
    wait_time = between(1, 5)

    @task
    def index(self):
        # Запит до головної сторінки вашого сервісу
        self.client.get("/")

    @task(2)
    def generate_password(self):
        # Приклад запиту для тестування
        self.client.post("/generate", json={"length": 12, "complexity": 5})

#Написати скрипт для запитів, отримання данних юзера, наватажуване тестування бєку
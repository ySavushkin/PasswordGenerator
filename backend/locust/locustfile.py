# from locust import HttpUser, task, between
# import random
# import string
#
# class PasswordGeneratorUser(HttpUser):
#     wait_time = between(1, 2)  # Час між запитами (1-2 секунди)
#
#     def generate_random_username(self):
#         # Генеруємо випадкове ім'я користувача
#         return ''.join(random.choices(string.ascii_lowercase, k=8))
#
#     def generate_random_email(self):
#         # Генеруємо випадкову пошту
#         return ''.join(random.choices(string.ascii_lowercase + string.digits, k=10)) + "@example.com"
#
#     @task
#     def create_user_and_generate_password(self):
#         # 1. Створення нового користувача
#         username = self.generate_random_username()
#         email = self.generate_random_email()
#         password_hash = "hashed_password"  # Тут можна поставити реальний хеш
#
#         response = self.client.post("/users", json={
#             "username": username,
#             "email": email,
#             "passwordHash": password_hash
#         })
#
#         # Перевіряємо, чи користувач створений
#         if response.status_code == 201:
#             user_id = response.json()['id']  # Отримуємо ID користувача з відповіді
#
#             # 2. Генерація пароля для цього користувача
#             self.client.post("/generate-password", json={
#                 "user_id": user_id,
#                 "length": 12,
#                 "useSymbols": True
#             })
#
#     @task
#     def get_user_passwords(self):
#         # Тест на отримання паролів користувача
#         user_id = random.randint(1, 100)  # Випадковий ID користувача
#         response = self.client.get(f"/users/{user_id}/passwords")
#         if response.status_code == 200:
#             passwords = response.json()  # отримуємо паролі
#             print(passwords)
#
# #Запуск Locust:
# #locust -f locustfile.py
# # http://localhost:8089
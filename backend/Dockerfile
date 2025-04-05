# Stage#1: Встановлення залежностей
FROM gradle:7.5.1-jdk11 AS dependency_stage
LABEL maintainer="Danylo Kizilov <danylo.kizilov@infiz.khpi.edu.ua>"
WORKDIR /app

# Копіюємо лише файли конфігурації для установки залежностей
COPY settings.gradle build.gradle /app/
RUN gradle dependencies

# Stage#2: Компіляція вихідного коду
FROM gradle:7.5.1-jdk11 AS build_stage
WORKDIR /app

# Копіюємо файли проекту та завантажуємо залежності з попереднього етапу
COPY . /app
COPY --from=dependency_stage /app/.gradle /app/.gradle


# Компілюємо проект і створюємо JAR файл
#RUN gradlew build -s
RUN ./gradlew build -s

#Якщо буде потрібно скіпнути тести!
#RUN ls -l /app
#RUN chmod +x /app/gradlew # Даємо права на виконання для gradlew
#RUN ./gradlew build -x test -x checkstyleMain -x checkstyleTest -s

# Перевірка наявності JAR файлу
RUN ls -l /app/build/libs/

# Встановлюємо змінні середовища для Gradle та Java?
ENV GRADLE_OPTS="-Xmx2g"


# Stage#3: Створення фінального контейнера з JAR-файлом
FROM amazoncorretto:15.0.2 AS final_stage
WORKDIR /app

# Копіюємо лише зібраний JAR файл з попереднього етапу
COPY --from=build_stage /app/build/libs/demo-0.0.1-SNAPSHOT.jar demo.jar


# Відкриваємо порт для додатка
EXPOSE 8080

# Точка входу — запуск JAR файлу
CMD ["java", "-jar", "/app/demo.jar"]


#   Для Stage#1 (Встановлення залежностей):
#    docker build --target dependency_stage -t password-gen-app-deps .

#    Для Stage#2 (Компіляція вихідного коду):
#    docker build --target build_stage -t password-gen-app-build .

#    Для Stage#3 (Запуск сервера):
#    docker build --target final_stage -t password-gen-app-final .

#   Для Stage#4 Запуск контейнера, щоб він з’явився в Docker Desktop:
#   docker run -d --name password-gen-app -p 8080:8080 password-gen-app-final

#Перевірте, чи файл існує, скориставшись командою docker run з тим !!!
#самим ім'ям образу password-gen-app-build:
#docker run --rm password-gen-app-build ls -l /app/build/libs/
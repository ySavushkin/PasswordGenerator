# Stage#1: Встановлення залежностей
FROM gradle:7.5.1-jdk17 AS dependency_stage
LABEL maintainer="Danylo Kizilov <danylo.kizilov@infiz.khpi.edu.ua>"
WORKDIR /app

# Копіюємо лише файли конфігурації для установки залежностей
COPY . /app

# Встановлюємо Python та Locust для тестування
RUN apt-get update && apt-get install -y python3 python3-pip
RUN pip3 install locust

#RUN gradle dependencies
RUN ./gradlew --no-daemon dependencies


# Stage#2: Компіляція вихідного коду
FROM gradle:7.5.1-jdk17 AS build_stage
WORKDIR /app

# Копіюємо файли проекту та завантажуємо залежності з попереднього етапу
COPY . /app
COPY --from=dependency_stage /app/.gradle /app/.gradle

# Компілюємо проект і створюємо JAR файл
RUN ./gradlew build -s

# Перевірка наявності JAR файлу
RUN ls -l /app/build/libs/

# Встановлюємо змінні середовища для Gradle та Java?
ENV GRADLE_OPTS="-Xmx2g"


# Stage#3: Створення фінального контейнера з JAR-файлом
FROM amazoncorretto:17 AS final_stage
WORKDIR /app

# Копіюємо ВСІ jar файли з build_stage
COPY --from=build_stage /app/build/libs/*.jar /app/

# Відкриваємо порт
EXPOSE 8080

# Запускаємо перший .jar файл в директорії
CMD ["java", "-jar", "/app/PasswordGenerator-0.0.1-SNAPSHOT.jar"]

plugins {
    java
    id("org.springframework.boot") version "3.4.4"
    id("io.spring.dependency-management") version "1.1.7"
}

group = "com.example"
version = "0.0.1-SNAPSHOT"

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(17)
    }
}

configurations {
    compileOnly {
        extendsFrom(configurations.annotationProcessor.get())
    }
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.liquibase:liquibase-core:4.19.1")
    implementation("org.mapstruct:mapstruct:1.6.3")
    implementation ("org.springframework.boot:spring-boot-starter-validation")
    compileOnly("org.projectlombok:lombok")

    annotationProcessor("org.projectlombok:lombok")
    annotationProcessor ("org.mapstruct:mapstruct-processor:1.6.3")

    implementation("org.postgresql:postgresql:42.7.5")
    implementation("jakarta.validation:jakarta.validation-api:3.1.1")
    implementation("org.hibernate.validator:hibernate-validator:6.2.0.Final")
    implementation("org.springdoc:springdoc-openapi-starter-webmvc-ui:2.8.8")

    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")

    //Додав для DTO тесту
    implementation("javax.el:javax.el-api:3.0.0")
    implementation("org.glassfish:javax.el:3.0.0")

    //Додав для PasswordRepositoryTest
    testImplementation("com.h2database:h2")
}

tasks.withType<Test> {
    useJUnitPlatform()
}

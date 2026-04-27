FROM maven:3.9.6-eclipse-temurin-17

WORKDIR /app

COPY . .

WORKDIR /app/AI-Resume-matcher

RUN mvn clean package -DskipTests

CMD sh -c "java -jar target/*.jar"

FROM jelastic/maven:3.9.5-openjdk-21
WORKDIR /app
COPY ./pom.xml /app
COPY ./src /app/src
RUN mvn clean package -DskipTests
FROM openjdk:21-jdk

COPY ./target/resoucesmanager-0.0.1-SNAPSHOT.jar demo.jar
EXPOSE 8080

ENTRYPOINT ["java","-jar","demo.jar"]
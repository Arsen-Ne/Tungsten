FROM openjdk:17-jdk

VOLUME /tmp

ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar

COPY src/main/resources/log4j2.xml /app/log4j2.xml

EXPOSE 8080

ENTRYPOINT ["java", "-Dlog4j.configurationFile=/app/log4j2.xml", "-jar", "/app.jar"]
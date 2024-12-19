@echo off

cd /d "C:\Users\felip\Desktop\COPACAM CODIGO\Projeto Completo\reference-generator"

start /B "" mvn spring-boot:run

timeout /t 15

start "" "%ProgramFiles%\Google\Chrome\Application\chrome.exe" "http://localhost:8080/index.html"

@echo off
title Iniciando Servidor Local

:: Navega até a pasta do projeto
cd /d "C:\Users\felip\Desktop\COPACAM FINAL\Projeto Completo\reference-generator"

:: Inicia o servidor Spring Boot
start /B "" mvn spring-boot:run

:: Aguarda 20 segundos para garantir que o servidor subiu
timeout /t 20 /nobreak >nul

:: Abre o navegador na página de login
start "" "%ProgramFiles%\Google\Chrome\Application\chrome.exe" "http://localhost:8080/login.html"

:: Mensagem informando que o servidor será encerrado automaticamente se não houver abas abertas
echo O servidor será encerrado automaticamente se todas as abas forem fechadas.

exit

package com.copacam.reference_generator.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.concurrent.atomic.AtomicLong;
import java.util.Timer;
import java.util.TimerTask;
import java.io.IOException;

@RestController
public class PingController {

    private static final AtomicLong lastPing = new AtomicLong(System.currentTimeMillis());
    private static final int TIMEOUT_MS = 60000; // 40 segundos sem ping para encerrar o servidor

    public PingController() {
        // Cria um timer que verifica se os pings pararam e encerra o servidor
        Timer timer = new Timer(true);
        timer.scheduleAtFixedRate(new TimerTask() {
            @Override
            public void run() {
                long now = System.currentTimeMillis();
                if ((now - lastPing.get()) > TIMEOUT_MS) {
                    System.out.println("Nenhuma aba detectada por mais de 60 segundos. Encerrando cmd.exe e o Spring...");
                    
                    // Apenas encerra o prompt de comando
                    try {
                        Runtime.getRuntime().exec("taskkill /F /IM cmd.exe /T");
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
        }, 5000, 5000); // Verifica a cada 5 segundos
    }

    @GetMapping("/ping")
    public String ping() {
        lastPing.set(System.currentTimeMillis());
        return "pong";
    }
}


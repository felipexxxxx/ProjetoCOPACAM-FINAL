package com.copacam.reference_generator.Controller;

import com.copacam.reference_generator.DTOs.NewUserDTO;
import com.copacam.reference_generator.DTOs.LoginResponseDTO;
import com.copacam.reference_generator.Services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<String> registerUser(@RequestBody NewUserDTO newUser) {
        try {
            userService.createUser(newUser);
            return ResponseEntity.status(HttpStatus.CREATED).body("Usuário registrado com sucesso.");
        } catch (RuntimeException ex) {
            // A exceção será capturada pelo GlobalExceptionHandler
            throw ex;
        }
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> loginUser(@RequestBody NewUserDTO loginData) {
        try {
            LoginResponseDTO response = userService.loginUser(loginData.username(), loginData.password());
            return ResponseEntity.ok(response);
        } catch (RuntimeException ex) {
            // A exceção será capturada pelo GlobalExceptionHandler
            throw ex;
        }
    }
}

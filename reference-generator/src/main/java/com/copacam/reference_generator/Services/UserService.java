package com.copacam.reference_generator.Services;

import com.copacam.reference_generator.DTOs.NewUserDTO;
import com.copacam.reference_generator.DTOs.LoginResponseDTO;
import com.copacam.reference_generator.Entities.User;
import com.copacam.reference_generator.Entities.Role;
import com.copacam.reference_generator.Repositories.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, TokenService tokenService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenService = tokenService;
    }

    /**
     * Registra um novo usuário no sistema.
     */
    public void createUser(NewUserDTO data) {
        // Verifica se o e-mail ou username já está em uso
        userRepository.findByEmail(data.email()).ifPresent(user -> {
            throw new RuntimeException("Erro: O e-mail '" + data.email() + "' já está em uso.");
        });

        userRepository.findByUsername(data.username()).ifPresent(user -> {
            throw new RuntimeException("Erro: O username '" + data.username() + "' já está em uso.");
        });

        // Cria um novo usuário
        User newUser = new User();
        newUser.setUsername(data.username());
        newUser.setEmail(data.email());
        newUser.setPassword(passwordEncoder.encode(data.password()));

        // Define o role do usuário, verificando se é válido
        try {
            newUser.setRole(Role.valueOf(data.role().toUpperCase()));
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Erro: Role inválido. Use 'USER' ou 'ADMIN'.");
        }

        // Salva o usuário no banco de dados
        userRepository.save(newUser);
    }

    /**
     * Realiza o login de um usuário.
     */
    public LoginResponseDTO loginUser(String username, String password) {
        // Busca o usuário pelo username
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Erro: Usuário '" + username + "' não encontrado."));

        // Verifica se a senha fornecida está correta
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Erro: Credenciais inválidas.");
        }

        // Gera o token JWT
        String token = tokenService.generateToken(user);
        System.out.println("Token gerado: " + token);

        // Retorna o DTO com as informações do usuário e o token
        return new LoginResponseDTO(
                user.getId(),
                user.getUsername(),
                user.getRole(),
                token
        );
    }

    /**
     * Retorna um usuário pelo e-mail.
     */
    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Erro: Usuário com e-mail '" + email + "' não encontrado."));
    }

    /**
     * Retorna um usuário pelo username.
     */
    public User findUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Erro: Usuário com username '" + username + "' não encontrado."));
    }
}

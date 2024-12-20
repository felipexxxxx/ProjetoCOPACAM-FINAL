package com.copacam.reference_generator.DTOs;

import com.copacam.reference_generator.Entities.Role;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class LoginResponseDTO {
    private Long id;
    private String username;
    private Role role;
    private String token;

    // Construtor
    public LoginResponseDTO(Long id, String username, Role role, String token) {
        this.id = id;
        this.username = username;
        this.role = role;
        this.token = token;
    }
}

package com.copacam.reference_generator.DTOs;

public record NewUserDTO(
        String username,
        String email,
        String password,
        String role
) {
}

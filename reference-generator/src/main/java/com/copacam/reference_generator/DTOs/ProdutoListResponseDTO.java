package com.copacam.reference_generator.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProdutoListResponseDTO {
    private String codigoCompleto;
    private String descricao;
}


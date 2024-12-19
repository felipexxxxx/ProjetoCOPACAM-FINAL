package com.copacam.reference_generator.DTOs;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class ProdutoInNaturaDTO {
    private String codigoCompleto;
    private String especie;
    private String apresentacao;
    private String gramatura; // Gramatura
    private String descricao; // Descrição do produto
    private LocalDateTime dataInsercao;
    
}

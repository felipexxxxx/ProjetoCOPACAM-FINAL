package com.copacam.reference_generator.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Gera o ID automaticamente
    private Integer id;

    private String codigoCompleto;
    private String especie;
    private String apresentacao;
    private String estado;
    private String tipoConservacao;
    private String pecas;
    private String classificacao;
    private String pacote;
    private String caixa;
    private String descricao;

    @ManyToOne(optional = false)
    @JoinColumn(name = "created_by", nullable = false)
    private User createdBy;

    private LocalDateTime dataInsercao;

    @PrePersist
    private void prePersist() {
        this.dataInsercao = LocalDateTime.now();
    }
}
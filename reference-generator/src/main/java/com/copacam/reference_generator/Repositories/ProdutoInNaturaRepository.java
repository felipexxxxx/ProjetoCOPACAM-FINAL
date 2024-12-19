package com.copacam.reference_generator.Repositories;

import com.copacam.reference_generator.Entities.ProdutoInNatura;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProdutoInNaturaRepository extends JpaRepository<ProdutoInNatura, Long> {
    Optional<ProdutoInNatura> findByCodigoCompleto(String codigoCompleto);
}

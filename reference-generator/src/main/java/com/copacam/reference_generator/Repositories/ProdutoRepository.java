package com.copacam.reference_generator.Repositories;

import com.copacam.reference_generator.Entities.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProdutoRepository extends JpaRepository<Produto, Integer> {
    Optional<Produto> findByCodigoCompleto(String codigoCompleto);
}

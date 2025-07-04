package com.copacam.reference_generator.Services;

import com.copacam.reference_generator.DTOs.ProdutoDTO;
import com.copacam.reference_generator.DTOs.ProdutoInNaturaDTO;
import com.copacam.reference_generator.DTOs.ProdutoListResponseDTO;
import com.copacam.reference_generator.DTOs.ProdutoListResponseNaturaDTO;
import com.copacam.reference_generator.Entities.Produto;
import com.copacam.reference_generator.Entities.ProdutoInNatura;
import com.copacam.reference_generator.Entities.User;
import com.copacam.reference_generator.Repositories.ProdutoRepository;
import com.copacam.reference_generator.Repositories.ProdutoInNaturaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProdutoService {
    private final ProdutoRepository produtoRepository;
    private final ProdutoInNaturaRepository produtoInNaturaRepository;

    public Produto salvarProduto(ProdutoDTO produtoDTO, Authentication authentication) {
        String codigoCompleto = gerarCodigoCompletoRegular(produtoDTO);

        if (produtoRepository.findByCodigoCompleto(codigoCompleto).isPresent()) {
            throw new RuntimeException("Produto com esse código completo já existe.");
        }

        User user = (User) authentication.getPrincipal();

        Produto produto = new Produto(
            null,
            codigoCompleto,
            produtoDTO.getEspecie(),
            produtoDTO.getApresentacao(),
            produtoDTO.getClassificacao(),
            produtoDTO.getEstado(),
            produtoDTO.getTipoConservacao(),
            produtoDTO.getPacote(),
            produtoDTO.getCaixa(),
            produtoDTO.getEmbalagem(),
            produtoDTO.getDescricao(),
            user,
            null
        );

        return produtoRepository.save(produto);
    }

    public ProdutoInNatura salvarProdutoInNatura(ProdutoInNaturaDTO produtoInNaturaDTO, Authentication authentication) {
        String codigoCompleto = gerarCodigoCompletoInNatura(produtoInNaturaDTO);

        if (produtoInNaturaRepository.findByCodigoCompleto(codigoCompleto).isPresent()) {
            throw new RuntimeException("Produto IN NATURA com esse código completo já existe.");
        }

        User user = (User) authentication.getPrincipal();

        ProdutoInNatura produtoInNatura = new ProdutoInNatura(
            null,
            codigoCompleto,
            produtoInNaturaDTO.getEspecie(),
            produtoInNaturaDTO.getApresentacao(),
            produtoInNaturaDTO.getGramatura(),
            produtoInNaturaDTO.getDescricao(),
            user,
            null
        );

        return produtoInNaturaRepository.save(produtoInNatura);
    }

     public Map<String, List<ProdutoListResponseDTO>> listarProdutosPorApresentacao() {
        List<Produto> produtos = produtoRepository.findAll();
        Map<String, List<ProdutoListResponseDTO>> produtosPorApresentacao = new HashMap<>();

        produtos.forEach(produto -> {
            String apresentacao = produto.getApresentacao();
            produtosPorApresentacao
                .computeIfAbsent(apresentacao, key -> new ArrayList<>())
                .add(new ProdutoListResponseDTO(produto.getCodigoCompleto(), produto.getDescricao()));
        });

        return produtosPorApresentacao;
    }

    public List<ProdutoListResponseNaturaDTO> listarProdutosInNatura() {
        return produtoInNaturaRepository.findAll()
                .stream()
                .map(produto -> new ProdutoListResponseNaturaDTO(produto.getCodigoCompleto(), produto.getDescricao()))
                .collect(Collectors.toList());
    }

    private String gerarCodigoCompletoRegular(ProdutoDTO dto) {
        return String.format(
            "%s %s %s %s %s %s %s %s",
            dto.getEspecie(),
            dto.getApresentacao(),
            dto.getClassificacao() != null ? dto.getClassificacao() : "",
            dto.getEstado(),
            dto.getTipoConservacao(),
            dto.getPacote() != null ? dto.getPacote() : "",
            dto.getCaixa() != null ? dto.getCaixa() : "",
            dto.getEmbalagem() != null ? dto.getEmbalagem() : ""
            
        ).trim();
    }

    private String gerarCodigoCompletoInNatura(ProdutoInNaturaDTO dto) {
        String gramatura = dto.getGramatura() != null ? dto.getGramatura().trim() : "0";
        gramatura = gramatura.length() > 3 ? gramatura.substring(0, 3) : gramatura; // Limita a 3 dígitos
        gramatura = String.format("%03d", Integer.parseInt(gramatura)); // Preenche com zeros à esquerda
        return String.format(
            "%s 00 00000000000000 %s",
            dto.getEspecie(),
            gramatura
        ).trim();
    }
}

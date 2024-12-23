CREATE TABLE produto (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    codigo_completo CHAR(35) UNIQUE NOT NULL,
    especie VARCHAR(50) NOT NULL,
    apresentacao VARCHAR(50) NOT NULL,
    estado VARCHAR(50) NOT NULL,
    tipo_conservacao VARCHAR(50) NOT NULL,
    pecas VARCHAR(20),
    classificacao VARCHAR(20),
    pacote VARCHAR(20),
    caixa VARCHAR(20),
    embalagem VARCHAR(20),
    descricao TEXT NOT NULL,
    data_insercao DATETIME NOT NULL,
    created_by BIGINT NOT NULL,
    FOREIGN KEY (created_by) REFERENCES users(id)
);

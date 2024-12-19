CREATE TABLE produto_in_natura (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    codigo_completo CHAR(35) UNIQUE NOT NULL,
    especie VARCHAR(50) NOT NULL,
    apresentacao VARCHAR(50) NOT NULL,
    gramatura CHAR(3) NOT NULL,
    descricao TEXT NOT NULL,
    data_insercao DATETIME NOT NULL
);

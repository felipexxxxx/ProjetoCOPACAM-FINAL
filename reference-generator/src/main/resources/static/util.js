function formatarClassificacao(minima, maxima) {
    // Remove espaços ao redor e verifica se os valores são válidos
    if (!minima || !maxima || isNaN(minima) || isNaN(maxima) || minima ==0  || maxima ==0) {
        return "Inválido"; // Retorna inválido se os valores não forem números válidos
    }

    const valorMinimo = parseInt(minima.trim(), 10); // Converte o valor mínimo para inteiro
    const valorMaximo = parseInt(maxima.trim(), 10); // Converte o valor máximo para inteiro

    // Verifica se o valor mínimo é menor que o valor máximo
    if (valorMinimo < valorMaximo) {
        // Retorna a classificação no formato "(X/Y)"
        return `(${valorMinimo}/${valorMaximo})`;
    }

    return "Inválido"; // Retorna inválido se o valor mínimo for maior ou igual ao valor máximo
}




function formatarCaixa(codigo) {
    // Remove espaços e verifica se está em maiúsculas e termina com "KG"
    const entrada = codigo.trim();
    if (entrada === entrada.toUpperCase() && entrada.endsWith("KG")) {
        const valor = parseInt(entrada.replace("KG", ""), 10); // Remove "KG" e converte para número
        if (!isNaN(valor) && valor > 0) {
            return `CX ${valor}KG`; // Exibe como "5KG", "1KG", etc.
        }
    }
    return "Inválido"; // Retorna "Inválido" para formatos inesperados
}

function converterCaixaParaCodigo(caixa) {
    if (caixa.toUpperCase().endsWith("KG")) {
        const valor = parseInt(caixa.toUpperCase().replace("KG", ""), 10);
        return valor.toString().padStart(2, "0"); // Retorna sempre 2 dígitos
    }
    return "Inválido"; // Retorna padrão se o valor for inválido
}

function formatarPecasPorPacote(minima, maxima) {
    // Verifica se os valores são válidos e não estão vazios
    if (!minima || !maxima || isNaN(minima) || isNaN(maxima) || minima ==0  || maxima ==0) {
        return "Inválido"; // Retorna inválido se os valores não forem números válidos
    }

    const inicio = parseInt(minima.trim(), 10); // Converte o valor mínimo para inteiro
    const fim = parseInt(maxima.trim(), 10);   // Converte o valor máximo para inteiro

    // Verifica se o valor mínimo é menor que o máximo
    if (inicio < fim) {
        // Retorna a descrição no formato correto
        return `${inicio} A ${fim} `;
    }

    return "Inválido"; // Retorna inválido se a validação falhar
}




function converterPecasParaCodigo(minima, maxima) {
    // Verifica se as partes são válidas
    if (!minima || !maxima || isNaN(minima) || isNaN(maxima) || minima ==0  || maxima ==0) {
        return "Inválido"; // Retorna inválido caso as entradas não sejam números válidos
    }

    const inicio = parseInt(minima.trim(), 10); // Converte o número inicial para inteiro
    const fim = parseInt(maxima.trim(), 10);    // Converte o número final para inteiro

    // Verifica se o número inicial é menor que o número final
    if (inicio < fim) {
        // Concatena os dois números e preenche à esquerda com zeros para ter exatamente 8 dígitos
        const codigo = `${inicio}${fim}`.padStart(8, "0");
        return codigo;
    }

    return "Inválido"; // Retorna inválido se o número inicial for maior ou igual ao número final
}

function converterClassificacaoParaCodigo(minima, maxima) {
    // Valida se as entradas são válidas e não nulas
    if (!minima || !maxima || isNaN(minima) || isNaN(maxima) || minima ==0  || maxima ==0) {
        return "Inválido"; // Retorna inválido se não forem números válidos
    }

    const inicio = parseInt(minima.trim(), 10); // Converte a mínima para inteiro
    const fim = parseInt(maxima.trim(), 10);    // Converte a máxima para inteiro

    // Verifica se a mínima é menor que a máxima
    if (inicio < fim) {
        // Concatena os dois números e preenche à esquerda com zeros para ter exatamente 8 dígitos
        const codigo = `${inicio}${fim}`.padStart(6, "0");
        return codigo;
    }

    return "Inválido"; // Retorna inválido se a mínima for maior ou igual à máxima
}

function formatarPacote(descricao) {
    // Remove espaços e converte para maiúsculas
    const entrada = descricao.trim().toUpperCase();

    // Verifica se o formato é válido para gramas (ex.: "150G")
    if (/^\d+G$/.test(entrada)) {
        const valor = parseInt(entrada.replace("G", ""), 10); // Remove "G" e converte para número
        if (!isNaN(valor) && valor > 0) {
            return `PAC ${valor}g`; // Retorna "PAC XG"
        }
    }

    // Verifica se o formato é válido para quilogramas (ex.: "1KG")
    if (/^\d+KG$/.test(entrada)) {
        const valor = parseInt(entrada.replace("KG", ""), 10); // Remove "KG" e converte para número
        if (!isNaN(valor) && valor > 0) {
            return `PAC ${valor}KG`; // Retorna "PAC XKG"
        }
    }

    return "Inválido"; // Retorna inválido para formatos inesperados
}


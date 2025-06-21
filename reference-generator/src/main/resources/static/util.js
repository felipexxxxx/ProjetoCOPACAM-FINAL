function formatarClassificacao(minima, maxima) {
    const valorMin = parseInt(minima);
    const valorMax = parseInt(maxima);

    if ((isNaN(valorMin) || isNaN(valorMax)) || minima === "" || maxima === "") {
        return "Inválido";
    }

    if (valorMin === 0 && valorMax === 0) {
        return "PEDAÇOS";
    }

    if (valorMin === 0 || valorMax === 0) {
        return "Inválido";
    }

    if (valorMin < valorMax) {
        return `${valorMin}/${valorMax}`;
    }

    return "Inválido";
}






function formatarCaixa(codigo) {
    const entrada = codigo.trim().toLowerCase();

    if (entrada.endsWith("kg")) {
        const valor = parseInt(entrada.replace("kg", ""), 10);
        if (!isNaN(valor) && valor > 0) {
            return `CX ${valor}kg`;
        }
    }

    return "Inválido";
}


function converterCaixaParaCodigo(caixa) {
    if (caixa.endsWith("kg")) {
        const valor = parseInt(caixa.toUpperCase().replace("kg", ""), 10);
        return valor.toString().padStart(2, "0"); // Retorna sempre 2 dígitos
    }
    return "Inválido"; // Retorna padrão se o valor for inválido
}


function converterClassificacaoParaCodigo(minima, maxima) {
    if (minima === undefined || maxima === undefined || isNaN(minima) || isNaN(maxima)) {
        return "Inválido";
    }

    const inicio = parseInt(minima.trim(), 10);
    const fim = parseInt(maxima.trim(), 10);

    // Caso especial: PEDAÇOS
    if (inicio === 0 && fim === 0) {
        return "000000";
    }

    // Inválido se só um for 0
    if ((inicio === 0 && fim !== 0) || (inicio !== 0 && fim === 0)) {
        return "Inválido";
    }

    // Verifica se mínimo é menor que máximo
    if (inicio < fim) {
        return `${inicio}${fim}`.padStart(6, "0");
    }

    return "Inválido";
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
        const valor = parseInt(entrada.replace("kg", ""), 10); // Remove "KG" e converte para número
        if (!isNaN(valor) && valor > 0) {
            return `PAC ${valor}kg`; // Retorna "PAC XKG"
        }
    }

    return "Inválido"; // Retorna inválido para formatos inesperados
}


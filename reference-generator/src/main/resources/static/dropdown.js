const especieMap = { "01": "CAM CINZA" };
    const apresentacaoMap = {
        "0": "IN NATURA",
        "1": "INT",
        "2": "S/CABEÇA",
        "3": "DESC PUD TAIL OFF",
        "4": "DESC PUD TAIL ON",
        "5": "DESC PPV TAIL OFF",
        "6": "DESC PPV TAIL ON",
        "7": "DESC PED TAIL OFF",
        "8": "DESC PED TAIL ON",
        "9": "EMP PRE FRITO"
    };
    const estadoMap = { "0": "CRU", "1": "COZ" };
    const condicaoMap = { "0": "CONG IQF", "1": "CONG IQF1", "2": "CONG IQF2", "3": "CONG IQF3"};
    const pacoteMap = {
        "05000": "5KG",
        "01000": "1KG",
        "00300": "300g",
        "00200": "200g",
        "00150": "150g"
    };
    const caixaMap = {
        "10":"10KG",
        "08":"8KG",
        "06":"6KG",
        "05":"5KG"
    }
    const embalagemMap = {
        "01": "COPACAM",
        "02": "MARCHEF"
    }

// Função para configurar os filtros dinamicamente
function preencherFiltros() {
    preencherFiltroDinamico("dropdownEspecie", especieMap, "descricaoEspecie");
    preencherFiltroDinamico("dropdownApresentacao", apresentacaoMap, "descricaoApresentacao");
    preencherFiltroDinamico("dropdownEstado", estadoMap, "descricaoEstado");
    preencherFiltroDinamico("dropdownCondicao", condicaoMap, "descricaoCondicao");
    preencherFiltroDinamico("dropdownPacote", pacoteMap, "descricaoPacote");
    preencherFiltroDinamico("dropdownCaixa", caixaMap, "descricaoCaixa");
    preencherFiltroDinamico("dropdownEmbalagem", embalagemMap, "descricaoEmbalagem");
}

// Função genérica para preencher os filtros
function preencherFiltroDinamico(dropdownId, optionsMap, inputId) {
    const dropdown = document.getElementById(dropdownId);
    Object.entries(optionsMap).forEach(([key, value]) => {
        const li = document.createElement("li");
        li.innerHTML = `<a class="dropdown-item" href="#" onclick="selecionarFiltro('${inputId}', '${value}')">${value}</a>`;
        dropdown.appendChild(li);
    });
}

// Função para selecionar um valor no filtro
function selecionarFiltro(campoId, valor) {
    const campo = document.getElementById(campoId);
    campo.value = valor; // Define o valor no campo
    AtualizarTabelaReferencia(); // Atualiza a tabela
    AtualizarTabelaDescricaoCompleta(); // Atualiza a tabela
}

// Configuração ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    preencherFiltros();
});
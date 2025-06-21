const especieMap = { "01": "CAM CINZA" };
    const apresentacaoMap = {
        "0": "IN NATURA",
        "1": "INT",
        "2": "S/CABEÇA",
        "3": "DESC PUD",
        "4": "DESC PUD TAIL ON (PTO)",
        "5": "DESC PPV",
        "6": "DESC PPV TAIL ON",
        "7": "DESC PED",
        "8": "DESC PED TAIL ON",
        "9": "EMP PRE FRITO"
    };
    const estadoMap = { "1": "COZ" };
    const condicaoMap = { "0": "CONG IQF", "1": "CONG IQF1", "2": "CONG IQF2", "3": "CONG IQF3"};
    const pacoteMap = {
        "05000": "5kg",
        "01000": "1kg",
        "00300": "300g",
        "00200": "200g",
        "00150": "150g"
    };
    const caixaMap = {
        "10":"10kg",
        "08":"8kg",
        "06":"6kg",
        "05":"5kg"
    }
    const embalagemMap = {
        "01": "COPACAM",
        "02": "MARCHEF",
        "03": "DUNAS",
    }

// Função para configurar os filtros dinamicamente
function preencherFiltros() {
    preencherFiltroDinamico("dropdownEspecie", especieMap, "descricaoEspecie");
    preencherFiltroDinamico("dropdownApresentacao", apresentacaoMap, "descricaoApresentacao");
    preencherFiltroDinamicoEstado("dropdownEstado", "descricaoEstado");
    preencherFiltroDinamico("dropdownCondicao", condicaoMap, "descricaoCondicao");
    preencherFiltroDinamico("dropdownPacote", pacoteMap, "descricaoPacote");
    preencherFiltroDinamico("dropdownCaixa", caixaMap, "descricaoCaixa");
    preencherFiltroDinamico("dropdownEmbalagem", embalagemMap, "descricaoEmbalagem");
}

function preencherFiltroDinamicoEstado(dropdownId, inputId) {
    const dropdown = document.getElementById(dropdownId);
    dropdown.innerHTML = "";
    const li = document.createElement("li");
    li.innerHTML = `<a class="dropdown-item" href="#" onclick="event.preventDefault(); selecionarFiltro('${inputId}', 'COZ')">COZ</a>`;
    dropdown.appendChild(li);
    const liLimpar = document.createElement("li");
    liLimpar.innerHTML = `<a class="dropdown-item text-danger" href="#" onclick="event.preventDefault(); limparFiltro('${inputId}')">Limpar</a>`;
    dropdown.appendChild(liLimpar);
    document.getElementById(inputId).value = "";
}
function limparFiltro(inputId) {
    document.getElementById(inputId).value = "";
    AtualizarTabelaReferencia();
    AtualizarTabelaDescricaoCompleta();
}

// Função genérica para preencher os filtros
function preencherFiltroDinamico(dropdownId, optionsMap, inputId) {
    const dropdown = document.getElementById(dropdownId);
    Object.entries(optionsMap).forEach(([key, value]) => {
        const li = document.createElement("li");
        li.innerHTML = `<a class="dropdown-item" href="#" onclick="event.preventDefault(); selecionarFiltro('${inputId}', '${value}')">${value}</a>`;
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
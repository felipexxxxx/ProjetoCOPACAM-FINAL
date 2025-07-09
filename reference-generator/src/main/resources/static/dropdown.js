const especieMap = { "01": "CAMARÃO" };
    const apresentacaoMap = {
        "10": "DESCASCADO TAIL ON TEMPERADO EMPANADO",
        "11": "DESCASCADO EVISCERADO TEMPERADO EMPANADO",
        "12": "DESCASCADO EVISCERADO TAIL ON TEMPERADO EMPANADO",
        "00": "IN NATURA",
        "01": "INTEIRO",
        "02": "SEM CABEÇA",
        "03": "DESCASCADO PUD",
        "04": "DESCASCADO PUD TAIL ON (PTO)",
        "05": "DESCASCADO PPV",
        "06": "DESCASCADO PPV TAIL ON",
        "07": "DESCASCADO PED",
        "08": "DESCASCADO PED TAIL ON",
        "09": "DESCASCADO TEMPERADO EMPANADO",
        "13": "SEM CABEÇA TEMPERADO EMPANADO",
    };
    const estadoMap = { "1": "COZ", "2": "PRE FRITO"};
    const condicaoMap = { "0": "IQF", "1": "IQF 1", "2": "IQF 2", "3": "IQF 3"};
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

  /* gera todas as opções que existirem no mapa */
  Object.values(estadoMap).forEach(valor => {
    const li = document.createElement("li");
    li.innerHTML = `<a class="dropdown-item" href="#"
        onclick="event.preventDefault(); selecionarFiltro('${inputId}', '${valor}')">${valor}</a>`;
    dropdown.appendChild(li);
  });

  /* opção Limpar */
  const liLimpar = document.createElement("li");
  liLimpar.innerHTML = `<a class="dropdown-item text-danger" href="#"
        onclick="event.preventDefault(); limparFiltro('${inputId}')">Limpar</a>`;
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
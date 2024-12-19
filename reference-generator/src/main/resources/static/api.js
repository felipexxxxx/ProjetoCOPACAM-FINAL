document.getElementById("criarProduto").addEventListener("click", async () => {
    try {
        // Exibir aviso de confirmação
        const confirmacao = confirm("Você tem certeza de que deseja criar este produto?");
        if (!confirmacao) {
            return; // Cancela a criação se o usuário não confirmar
        }

        const especie = Object.keys(especieMap).find(key => especieMap[key] === document.getElementById("descricaoEspecie").value);
        const apresentacao = Object.keys(apresentacaoMap).find(key => apresentacaoMap[key] === document.getElementById("descricaoApresentacao").value);
        const estado = Object.keys(estadoMap).find(key => estadoMap[key] === document.getElementById("descricaoEstado").value);
        const tipoConservacao = Object.keys(condicaoMap).find(key => condicaoMap[key] === document.getElementById("descricaoCondicao").value);
        const pecas = converterPecasParaCodigo(
            document.getElementById("pecasMinima").value,
            document.getElementById("pecasMaxima").value
        );
        const classificacao = converterClassificacaoParaCodigo(
            document.getElementById("classificacaoMinima").value,
            document.getElementById("classificacaoMaxima").value
        );
        const pacote = Object.keys(pacoteMap).find(key => pacoteMap[key] === document.getElementById("descricaoPacote").value);
        const caixa = Object.keys(caixaMap).find(key => caixaMap[key] === document.getElementById("descricaoCaixa").value);
        const descricao = document.getElementById("tabelaDescricaoCompleta")?.innerText || "";

        // Validação para garantir que todos os campos sejam numéricos
        const camposNumericos = [
            especie,
            apresentacao,
            estado,
            tipoConservacao,
            pecas,
            classificacao,
            pacote,
            caixa
        ];

        const camposInvalidos = camposNumericos.some(campo => campo === undefined || isNaN(campo) || campo.trim() === "");

        if (camposInvalidos) {
            alert("Todos os campos devem ser preenchidos corretamente!");
            return;
        }

        // Geração do código completo com padding para garantir o tamanho fixo
        const codigoCompleto = `${especie} ${apresentacao} ${estado} ${tipoConservacao} ${pecas.padStart(8, '0')} ${classificacao.padStart(6, '0')} ${pacote.padStart(5, '0')} ${caixa.padStart(2, '0')}`;

        const produto = {
            codigoCompleto,
            especie,
            apresentacao,
            estado,
            tipoConservacao,
            pecas,
            classificacao,
            pacote,
            caixa,
            descricao
        };

        const response = await fetch("http://localhost:8080/produtos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(produto),
        });

        if (response.ok) {
            alert("Produto criado com sucesso!");
        } else {
            alert(`Erro ao criar produto: ${await response.text()}`);
        }
    } catch (err) {
        alert(`Erro no formulário ou ao se comunicar com o servidor: ${err.message}`);
    }
});

document.getElementById("criarProdutoInNatura").addEventListener("click", async () => {
    try {
        // Exibir aviso de confirmação
        const confirmacao = confirm("Você tem certeza de que deseja criar este produto?");
        if (!confirmacao) {
            return; // Cancela a criação se o usuário não confirmar
        }
        // Obter os elementos e verificar se eles existem
        const especie = Object.keys(especieMap).find(key => especieMap[key] === document.getElementById("descricaoEspecie").value);
        const apresentacao = Object.keys(apresentacaoMap).find(key => apresentacaoMap[key] === document.getElementById("descricaoApresentacao").value);
        const gramaturaInput = document.getElementById("descricaoGramatura");
        const descricao = document.getElementById("tabelaDescricaoCompleta")?.innerText || "";
        let gramatura = gramaturaInput.value

        // Validar os valores
        if (!especie || !apresentacao || !gramatura) {
            alert("Todos os campos são obrigatórios.");
            return;
        }
        if(gramatura==0){
            alert("Gramatura não pode ser 0");
            return;
        }

        gramatura = gramatura.toString().padStart(3, '0');
        // Gerar o código completo com base na lógica específica
        const codigoCompleto = `${especie} ${apresentacao} ${"0".repeat(24)} ${gramatura.padStart(3, '0')}`;

        // Criar o objeto do produto
        const produtoInNatura = { codigoCompleto, especie, apresentacao, gramatura, descricao };

        // Fazer a requisição POST
        const response = await fetch("http://localhost:8080/produtos/natura", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(produtoInNatura),
        });

        if (response.ok) {
            alert("Produto IN NATURA criado com sucesso!");
        } else {
            alert(`Erro ao criar produto IN NATURA: ${await response.text()}`);
        }
    } catch (err) {
        alert(`Erro ao se comunicar com o servidor: ${err.message}`);
    }
});

 // Carrega os dados ao abrir a página
 async function carregarCamaroes() {
    try {
        const response = await fetch("http://localhost:8080/produtos");
        const produtos = await response.json();

        // Ordenar os produtos pelo código completo
        produtos.sort((a, b) => a.codigoCompleto.localeCompare(b.codigoCompleto));

        const tabelaProdutos = document.getElementById("tabelaProdutos");
        tabelaProdutos.innerHTML = produtos.map(produto => `
            <tr>
                <td>${produto.codigoCompleto}</td>
                <td>${produto.descricao}</td>
            </tr>
        `).join('');
    } catch (error) {
        console.error("Erro ao carregar os produtos:", error);
    }
}

async function carregarProdutosInNatura() {
    try {
        const response = await fetch("http://localhost:8080/produtos/natura");
        const produtosInNatura = await response.json();

        // Ordenar os produtos pelo código completo
        produtosInNatura.sort((a, b) => a.codigoCompleto.localeCompare(b.codigoCompleto));

        const tabelaProdutosInNatura = document.getElementById("tabelaProdutosInNatura");
        tabelaProdutosInNatura.innerHTML = produtosInNatura.map(produto => `
            <tr>
                <td>${produto.codigoCompleto}</td>
                <td>${produto.descricao}</td>
            </tr>
        `).join('');
    } catch (error) {
        console.error("Erro ao carregar os produtos IN NATURA:", error);
    }
}

// Chamar as funções ao carregar a págin

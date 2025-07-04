function AtualizarTabelaReferencia() {
    const especieInput = Object.keys(especieMap).find(key => especieMap[key] === document.getElementById("descricaoEspecie").value) || "-";
    const apresentacaoInput = Object.keys(apresentacaoMap).find(key => apresentacaoMap[key] === document.getElementById("descricaoApresentacao").value) || "-";
    const gramaturaField = document.getElementById("descricaoGramatura");
    let gramaturaInput = gramaturaField && gramaturaField.value ? gramaturaField.value : "0";

    // Garantir que a gramatura tenha no máximo 3 dígitos
    gramaturaInput = gramaturaInput.replace(/[^0-9]/g, ""); // Remove caracteres não numéricos
    gramaturaInput = gramaturaInput.slice(0, 3); // Limita a 3 dígitos
    gramaturaInput = gramaturaInput.padStart(3, "0"); // Preenche com zeros à esquerda

    let codigoCompleto;

    if (apresentacaoInput === "00") { // "IN NATURA" selecionado
        codigoCompleto = `${especieInput} ${apresentacaoInput} 00000000000000 ${gramaturaInput}`; // Código de 20 dígitos

        // Preencher valores na tabela IN NATURA
        const tabelaInNaturaBody = document.getElementById("tabelaDescricaoInNatura");
        tabelaInNaturaBody.innerHTML = `
            <tr>
                <td>${especieInput}</td>
                <td>${apresentacaoInput}</td>
                <td>${gramaturaInput}</td>
                <td>${codigoCompleto}</td>
            </tr>
        `;

        // Exibir a tabela IN NATURA e ocultar a tabela original
        document.getElementById("tabelaDescricao").parentNode.style.display = "none"; // Oculta a tabela original (incluindo o botão Copiar)
        document.getElementById("botaoCopiarTabelaOriginal").style.display = "none"; // Oculta o botão da tabela original
        document.getElementById("botaoCriarProduto").style.display = "none"; // Oculta o botão de criar produto
        document.getElementById("tabelaInNatura").style.display = "table"; // Exibe tabela IN NATURA
        document.getElementById("botaoCopiarTabelaInNatura").style.display = "block"; // Exibe o botão da tabela IN NATURA
    
    } else {
        let estadoInput = document.getElementById("descricaoEstado").value;
        if (!estadoInput) {
            estadoInput = "0"; // mostra o código
            // OU, se quiser mostrar "CRU" em vez de "0":
            // estadoInput = "CRU";
        } else if (estadoInput === "COZ") {
            estadoInput = "1";
        }

        const condicaoInput = Object.keys(condicaoMap).find(key => condicaoMap[key] === document.getElementById("descricaoCondicao").value) || "-";
       
        const classificacaoCodigo = converterClassificacaoParaCodigo(
            document.getElementById("classificacaoMinima").value,
            document.getElementById("classificacaoMaxima").value
        );
        const pacoteInput = Object.keys(pacoteMap).find(key => pacoteMap[key] === document.getElementById("descricaoPacote").value) || "-";
        const caixaInput = Object.keys(caixaMap).find(key => caixaMap[key] === document.getElementById("descricaoCaixa").value) || "-";
        const embalagemInput = Object.keys(embalagemMap).find(key => embalagemMap[key] === document.getElementById("descricaoEmbalagem").value) || "-";

        codigoCompleto = `${especieInput} ${apresentacaoInput} ${classificacaoCodigo} ${estadoInput} ${condicaoInput} ${pacoteInput} ${caixaInput} ${embalagemInput}`; 

        // Preencher valores na tabela original
        const tabelaOriginalBody = document.getElementById("tabelaDescricao");
        tabelaOriginalBody.innerHTML = `
            <tr>
                <td>${especieInput}</td>
                <td>${apresentacaoInput}</td>
                <td>${classificacaoCodigo}</td>
                <td>${estadoInput}</td>
                <td>${condicaoInput}</td>
                <td>${pacoteInput}</td>
                <td>${caixaInput}</td>
                <td>${embalagemInput}</td>
                <td>${codigoCompleto}</td>
            </tr>
        `;

        // Exibir a tabela original e ocultar a tabela IN NATURA
        document.getElementById("tabelaDescricao").parentNode.style.display = "block"; // Exibe a tabela original (incluindo o botão Copiar)
        document.getElementById("botaoCopiarTabelaOriginal").style.display = "block"; // Oculta o botão da tabela original
        document.getElementById("botaoCriarProduto").style.display = "block"; // Oculta o botão de criar produto
        document.getElementById("tabelaInNatura").style.display = "none"; // Oculta tabela IN NATURA
        document.getElementById("botaoCopiarTabelaInNatura").style.display = "none"; // Exibe o botão da tabela IN NATURA
   
    }
}




function AtualizarTabelaDescricaoCompleta() {
    const especie = document.getElementById("descricaoEspecie").value || "Inválido";
    const apresentacao = document.getElementById("descricaoApresentacao").value || "Inválido";
    const gramaturaField = document.getElementById("descricaoGramatura");
    let gramaturaInput = gramaturaField ? gramaturaField.value : "0";

    // Garantir que a gramatura tenha no máximo 3 dígitos
    gramaturaInput = gramaturaInput.replace(/[^0-9]/g, ""); // Remove caracteres não numéricos
    gramaturaInput = gramaturaInput.slice(0, 3); // Limita a 3 dígitos
    gramaturaInput = gramaturaInput.padStart(1, "0"); // Preenche com zeros à esquerda

    let descricaoCompleta;

    if (apresentacao === "IN NATURA") {
        // Formatação para IN NATURA: Apenas Espécie, Apresentação e Gramatura
        descricaoCompleta = `${especie} ${apresentacao} ${gramaturaInput}g`;
    } else {
        const condicao = document.getElementById("descricaoCondicao").value || "Inválido";

        let estado = document.getElementById("descricaoEstado").value;
        if (estado !== "COZ") {
            estado = ""; // Esconde se não for COZ
        }

        const classificacaoMinimaInput = document.getElementById("classificacaoMinima").value || "";
        const classificacaoMaximaInput = document.getElementById("classificacaoMaxima").value || "";
        const pacoteInput = document.getElementById("descricaoPacote").value || "Inválido";
        const caixaInput = document.getElementById("descricaoCaixa").value || "Inválido";
        const embalagem = document.getElementById("descricaoEmbalagem").value || "Inválido";

        // Lógica correta para mostrar "PEDAÇOS" apenas quando ambos são 0 digitado
        const temClassificacaoMin = classificacaoMinimaInput.trim() !== "";
        const temClassificacaoMax = classificacaoMaximaInput.trim() !== "";

        const valorMinimo = parseInt(classificacaoMinimaInput.trim() || "0", 10);
        const valorMaximo = parseInt(classificacaoMaximaInput.trim() || "0", 10);

        let classificacaoCodigo = "";

        if (temClassificacaoMin && temClassificacaoMax) {
            if (valorMinimo === 0 && valorMaximo === 0) {
                classificacaoCodigo = "PEDAÇOS";
            } else {
                classificacaoCodigo = formatarClassificacao(valorMinimo, valorMaximo);
            }
        }

        const caixa = formatarCaixa(caixaInput);
        const pacote = formatarPacote(pacoteInput);

        descricaoCompleta = `${especie} ${apresentacao} ${classificacaoCodigo} ${estado} ${condicao} ${pacote} ${caixa} ${embalagem}`;
    }

    // Atualiza a nova tabela de descrição completa
    const tabelaDescricaoCompleta = document.getElementById("tabelaDescricaoCompleta");
    if (descricaoCompleta && descricaoCompleta.trim() !== "") {
        tabelaDescricaoCompleta.innerHTML = `
            <tr>
                <td>${descricaoCompleta}</td>
            </tr>
        `;
    } else {
        tabelaDescricaoCompleta.innerHTML = `
            <tr>
                <td>Nenhuma descrição disponível</td>
            </tr>
        `;
    }
}



// Restringir campo de gramatura para números
document.addEventListener("input", function (event) {
    const gramaturaField = document.getElementById("descricaoGramatura");
    if (event.target === gramaturaField) {
        // Remove qualquer caractere que não seja número
        gramaturaField.value = gramaturaField.value.replace(/[^0-9]/g, "");
    }
});


// Adiciona eventos aos campos de entrada para atualizar a nova tabela
document.querySelectorAll("#descricaoForm input").forEach(input => {
    input.addEventListener("input", AtualizarTabelaDescricaoCompleta);
});

document.getElementById("dropdownApresentacao").addEventListener("click", function (event) {
    const target = event.target;
    if (target.tagName === "A") {
        const apresentacao = target.textContent.trim();
        document.getElementById("descricaoApresentacao").value = apresentacao;

        if (apresentacao === "IN NATURA") {
            // Zerar os campos antigos
            document.getElementById("descricaoCondicao").value = "-";
            document.getElementById("descricaoEstado").value = "-";
            document.getElementById("classificacaoMinima").value = " ";
            document.getElementById("classificacaoMaxima").value = " ";
            document.getElementById("descricaoPacote").value = "-";
            document.getElementById("descricaoCaixa").value = "-";

            // Substituir campos antigos pela gramatura
            document.querySelectorAll("#descricaoForm .mb-3").forEach(el => {
                if (!el.querySelector("#descricaoApresentacao") && !el.querySelector("#descricaoEspecie") && !el.querySelector("#descricaoGramatura")) {
                    el.style.display = "none";
                }
            });

            if (!document.getElementById("descricaoGramatura")) {
                const gramaturaDiv = document.createElement("div");
                gramaturaDiv.classList.add("mb-3");
                gramaturaDiv.setAttribute("id", "gramaturaContainer");
                gramaturaDiv.innerHTML = `
                    <label for="descricaoGramatura" class="form-label">Gramatura:</label>
                    <div class="input-group">
                        <input type="text" id="descricaoGramatura" class="form-control" placeholder="Informe a gramatura" maxlength="3" oninput="AtualizarTabelaDescricaoCompleta()">
                    </div>
                `;
                document.getElementById("descricaoForm").appendChild(gramaturaDiv);
                document.getElementById("descricaoGramatura").addEventListener("input", AtualizarTabelaReferencia);
            }
        } else {
            // Reexibir os campos antigos
            document.querySelectorAll("#descricaoForm .mb-3").forEach(el => el.style.display = "block");

            // Remover o campo de gramatura, se existir
            const gramaturaDiv = document.getElementById("gramaturaContainer");
            if (gramaturaDiv) {
                gramaturaDiv.remove();
            }
        }

        AtualizarTabelaReferencia();
        AtualizarTabelaDescricaoCompleta();
    }
});

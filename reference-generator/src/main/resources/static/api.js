document.getElementById("criarProduto")?.addEventListener("click", async () => {
    event.preventDefault();
    try {
        // Exibir aviso de confirmação
        const confirmacao = confirm("Você tem certeza de que deseja criar este produto?");
        if (!confirmacao) {
            return; // Cancela a criação se o usuário não confirmar
        }

        const especie = Object.keys(especieMap).find(key => especieMap[key] === document.getElementById("descricaoEspecie")?.value);
        const apresentacao = Object.keys(apresentacaoMap).find(key => apresentacaoMap[key] === document.getElementById("descricaoApresentacao")?.value);
        let estado = document.getElementById("descricaoEstado").value;
        estado = (estado === "COZ") ? "1" : "0";

        const tipoConservacao = Object.keys(condicaoMap).find(key => condicaoMap[key] === document.getElementById("descricaoCondicao")?.value);
        const classificacao = converterClassificacaoParaCodigo(
            document.getElementById("classificacaoMinima")?.value,
            document.getElementById("classificacaoMaxima")?.value
        );
        const pacote = Object.keys(pacoteMap).find(key => pacoteMap[key] === document.getElementById("descricaoPacote")?.value);
        const caixa = Object.keys(caixaMap).find(key => caixaMap[key] === document.getElementById("descricaoCaixa")?.value);
        const embalagem = Object.keys(embalagemMap).find(key => embalagemMap[key] === document.getElementById("descricaoEmbalagem")?.value);
        const descricao = document.getElementById("tabelaDescricaoCompleta")?.innerText || "";

        // Validação para garantir que todos os campos sejam numéricos
        const camposNumericos = [
            especie,
            apresentacao,
            estado,
            tipoConservacao,
            classificacao,
            pacote,
            caixa,
            embalagem

        ];

        // Estado pode ser "0" (quando não selecionado)
        const camposInvalidos = camposNumericos.some((campo, idx) => {
            // idx 2 = estado
            if (idx === 2) return campo === undefined || campo === "";
            return campo === undefined || isNaN(campo) || campo.trim() === "";
        });


        if (camposInvalidos) {
            alert("Todos os campos devem ser preenchidos corretamente!");
            return;
        }

        // Geração do código completo com padding para garantir o tamanho fixo
        const codigoCompleto = `${especie} ${apresentacao} ${estado} ${tipoConservacao} ${classificacao.padStart(6, '0')} ${pacote.padStart(5, '0')} ${caixa.padStart(2, '0')}`;

        const produto = {
            codigoCompleto,
            especie,
            apresentacao,
            estado,
            tipoConservacao,
            classificacao,
            pacote,
            caixa,
            embalagem,
            descricao
        };

        const token = localStorage.getItem("token");
        if (!token) {
            alert("Token de autenticação não encontrado. Faça login novamente.");
            return;
        }

        const response = await fetch("http://localhost:8080/produtos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(produto),
        });

        if (response.ok) {
            alert("Produto criado com sucesso!");
        } else {
            const errorMessage = await response.text();
            alert(`Erro ao criar produto: ${errorMessage}`);
        }
    } catch (err) {
        alert(`Erro no formulário ou ao se comunicar com o servidor: ${err.message}`);
    }
});

document.getElementById("criarProdutoInNatura")?.addEventListener("click", async () => {
    try {
        // Exibir aviso de confirmação
        const confirmacao = confirm("Você tem certeza de que deseja criar este produto?");
        if (!confirmacao) {
            return; // Cancela a criação se o usuário não confirmar
        }
        // Obter os elementos e verificar se eles existem
        const especie = Object.keys(especieMap).find(key => especieMap[key] === document.getElementById("descricaoEspecie")?.value);
        const apresentacao = Object.keys(apresentacaoMap).find(key => apresentacaoMap[key] === document.getElementById("descricaoApresentacao")?.value);
        const gramaturaInput = document.getElementById("descricaoGramatura");
        const descricao = document.getElementById("tabelaDescricaoCompleta")?.innerText || "";
        let gramatura = gramaturaInput?.value;

        // Validar os valores
        if (!especie || !apresentacao || !gramatura) {
            alert("Todos os campos são obrigatórios.");
            return;
        }
        if (gramatura == 0) {
            alert("Gramatura não pode ser 0");
            return;
        }

        gramatura = gramatura.toString().padStart(3, '0');
        // Gerar o código completo com base na lógica específica
        const codigoCompleto = `${especie} ${apresentacao} ${"0".repeat(16)} ${gramatura.padStart(3, '0')}`;

        // Criar o objeto do produto
        const produtoInNatura = { codigoCompleto, especie, apresentacao, gramatura, descricao };

        const token = localStorage.getItem("token");
        if (!token) {
            alert("Token de autenticação não encontrado. Faça login novamente.");
            return;
        }

        // Fazer a requisição POST
        const response = await fetch("http://localhost:8080/produtos/natura", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(produtoInNatura),
        });

        if (response.ok) {
            alert("Produto IN NATURA criado com sucesso!");
        } else {
            const errorMessage = await response.text();
            alert(`Erro ao criar produto IN NATURA: ${errorMessage}`);
        }
    } catch (err) {
        alert(`Erro ao se comunicar com o servidor: ${err.message}`);
    }
});
const apresentacaoCustomMap = {
    "0": "IN NATURA",
    "1": "Inteiro",
    "2": "Sem Cabeça",
    "3": "Descascado PUD",
    "4": "Descascado PUD", // Agrupado com 3
    "5": "Descascado PPV",
    "6": "Descascado PPV", // Agrupado com 5
    "7": "Descascado PED",
    "8": "Descascado PED", // Agrupado com 7
    "9": "Empanado Pré Frito"
};

 // Carrega os dados ao abrir a página
 async function carregarCamaroes() {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Token de autenticação não encontrado. Faça login novamente.");
            window.location.href = "login.html"; // Redireciona para o login
            return;
        }

        const response = await fetch("http://localhost:8080/produtos", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.ok) {
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
        } else {
            const errorMessage = await response.text();
            console.error("Erro ao carregar os produtos:", errorMessage);
            alert("Erro ao carregar os produtos: " + errorMessage);
        }
    } catch (error) {
        console.error("Erro ao carregar os produtos:", error);
        alert("Erro ao carregar os produtos.");
    }
}

async function carregarProdutosInNatura() {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Token de autenticação não encontrado. Faça login novamente.");
            window.location.href = "login.html"; // Redireciona para o login
            return;
        }

        const response = await fetch("http://localhost:8080/produtos/natura", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.ok) {
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
        } else {
            const errorMessage = await response.text();
            console.error("Erro ao carregar os produtos IN NATURA:", errorMessage);
            alert("Erro ao carregar os produtos IN NATURA: " + errorMessage);
        }
    } catch (error) {
        console.error("Erro ao carregar os produtos IN NATURA:", error);
        alert("Erro ao carregar os produtos IN NATURA.");
    }
}
// Manipular envio do formulário
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Impedir recarregamento da página

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const loginData = {
        username: username,
        password: password
    };

    // Requisição de login
    fetch("http://localhost:8080/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Usuário ou senha inválidos");
        }
    })
    .then(data => {
        // Armazenar token no localStorage
        localStorage.setItem("token", data.token);

        // Exibir mensagem de sucesso e redirecionar
        const feedback = document.getElementById("feedback");
        feedback.classList.remove("text-danger");
        feedback.classList.add("text-success");
        feedback.textContent = "Login realizado com sucesso! Redirecionando...";

        // Redirecionar para outra página
        setTimeout(() => {
            window.location.href = "index.html"; // Alterar conforme necessário
        }, 1500);
    })
    .catch(error => {
        // Exibir mensagem de erro
        const feedback = document.getElementById("feedback");
        feedback.classList.remove("text-success");
        feedback.classList.add("text-danger");
        feedback.textContent = error.message;
    });
});

async function carregarProdutosPorApresentacao() {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Token de autenticação não encontrado. Faça login novamente.");
            window.location.href = "login.html";
            return;
        }

        const response = await fetch("http://localhost:8080/produtos", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.ok) {
            const produtosPorApresentacao = await response.json();

            const agrupadosPorApresentacao = {
                "PEDAÇOS": []
            };

            for (const [apresentacaoKey, produtos] of Object.entries(produtosPorApresentacao)) {
                for (const produto of produtos) {
                    if (produto.descricao.toUpperCase().includes("PEDAÇOS")) {
                        agrupadosPorApresentacao["PEDAÇOS"].push(produto);
                    } else {
                        const categoria = apresentacaoCustomMap[apresentacaoKey] || "Outro";

                        if (!agrupadosPorApresentacao[categoria]) {
                            agrupadosPorApresentacao[categoria] = [];
                        }

                        agrupadosPorApresentacao[categoria].push(produto);
                    }
                }
            }

            // 👉 Ordem personalizada conforme solicitado:
            const ordemCategorias = [
                "Inteiro",
                "Sem Cabeça",
                "Descascado PUD",
                "Descascado PPV",
                "Descascado PED",
                "Empanado Pré Frito",
                "PEDAÇOS",
                "Camarão In Natura" // Se sobrar alguma categoria fora da ordem
            ];

            const containerTabelas = document.getElementById("containerTabelas");
            containerTabelas.innerHTML = "";

            for (const categoria of ordemCategorias) {
                const produtos = agrupadosPorApresentacao[categoria];
                if (!produtos || produtos.length === 0) continue;

                produtos.sort((a, b) => a.codigoCompleto.localeCompare(b.codigoCompleto));

                const tabelaHtml = `
                    <div class="mt-4">
                        <h3>${categoria}</h3>
                        <table class="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <th>Código Completo</th>
                                    <th>Descrição</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${produtos.map(produto => `
                                    <tr>
                                        <td>${produto.codigoCompleto}</td>
                                        <td>${produto.descricao}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                `;
                containerTabelas.innerHTML += tabelaHtml;
            }

        } else {
            const errorMessage = await response.text();
            console.error("Erro ao carregar os produtos por apresentação:", errorMessage);
            alert("Erro ao carregar os produtos por apresentação: " + errorMessage);
        }
    } catch (error) {
        console.error("Erro ao carregar os produtos por apresentação:", error);
        alert("Erro ao carregar os produtos por apresentação.");
    }
}






function iniciarPing() {
    function enviarPing() {
        fetch("http://localhost:8080/ping").catch(() => {});
    }
    setInterval(enviarPing, 5000); // Envia um ping a cada 5 segundos
}

window.iniciarPing = iniciarPing;




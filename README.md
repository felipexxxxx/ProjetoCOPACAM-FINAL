# Sistema de Geração de Códigos de Produtos de Camarão 🦐

## **Descrição do Projeto**
Este projeto foi desenvolvido para a **COPACAM**, Cooperativa de Camarão do Ceará, com o objetivo de criar um **sistema de geração de códigos únicos** para produtos de camarão, tanto **in natura** quanto **acabados**. O sistema conta com um **frontend** em **HTML, CSS, JavaScript e Bootstrap** e um **backend** em **Spring Boot**, utilizando **JWT** para autenticação e um banco de dados **MySQL** local.

### **Destaques do Projeto**
- **Interface Dinâmica:** o código do produto e sua descrição são gerados em tempo real conforme o usuário ADM preenche as informações.
- **Autenticação Segura:** o sistema utiliza **tokens JWT** para controle de acesso.
- **Execução Automatizada:** o sistema pode ser iniciado com um clique através de um arquivo `.vbs`, eliminando a necessidade de comandos manuais.

---

## **Funcionalidades Principais**
- **Login de Usuários:** autenticação segura com **tokens JWT**.
- **Cadastro de Produtos:**
  - **Produto In Natura:** registro de camarões sem processamento.
  - **Produto Acabado:** registro de camarões processados.
- **Listagem de Produtos:** visualização de produtos in natura e acabados.
  - Listagem completa de produtos separados por **Apresentação**.
  - Listagem separada para **Produtos In Natura**.
- **Tabelas Dinâmicas por Categoria:** organização automática de produtos com base no campo **Apresentação**.
- **Validação de Duplicação:** busca por códigos para evitar duplicações.

---

## **Endpoints da API REST**

### **1. Criar Produto Acabado**  
- **Rota:** `POST /produtos`  
- **Descrição:** Registra um novo produto acabado.  
- **Campos Requeridos:**  
  - `especie`, `apresentacao`, `estado`, `tipoConservacao`, `classificacao`, `pacote`, `caixa`, `embalagem`.  

---

### **2. Criar Produto In Natura**  
- **Rota:** `POST /produtos/natura`  
- **Descrição:** Registra um novo produto in natura.  
- **Campos Requeridos:**  
  - `especie`, `apresentacao`, `gramatura`, `descricao`.  

---

### **3. Listar Produtos por Apresentação**  
- **Rota:** `GET /produtos`  
- **Descrição:** Retorna os produtos agrupados por apresentação, em um formato de `Map<String, List<ProdutoListResponseDTO>>`.  

---

### **4. Listar Produtos In Natura**  
- **Rota:** `GET /produtos/natura`  
- **Descrição:** Retorna uma lista de produtos in natura com seus códigos e descrições.  

---

## **Tecnologias Utilizadas**

### **Frontend:**
- **HTML5:** estrutura da interface.
- **CSS3 e Bootstrap:** estilização e design responsivo.
- **JavaScript:** criação da lógica de preenchimento dinâmico e integração com a API REST.

### **Backend:**
- **Spring Boot:** desenvolvimento das APIs RESTful.
- **Spring Security:** autenticação e autorização com **JWT**.
- **JPA (Java Persistence API):** operações de persistência e consultas ao banco de dados.

### **Banco de Dados:**
- **MySQL (local):** armazenamento das informações dos usuários e produtos.

---

## **Arquivos Importantes**

### **Frontend**
- `index.html`: tela principal de criação de referências.
- `login.html`: tela de login.
- `paginaProdutos.html`: página de listagem de produtos.

### **Backend**
- `ProdutoController.java`: controlador que gerencia as operações de produtos.
- `UserController.java`: controlador de autenticação e gerenciamento de usuários.
- `SecurityConfig.java` e `SecurityFilter.java`: configurações de segurança.
- `TokenService.java`: serviço responsável pela geração e validação dos tokens JWT.

### **Scripts de Execução**
- `inicializar.bat`: script que inicia a aplicação backend localmente.
- `executar.vbs`: script que chama o `.bat`, permitindo a execução com um clique.

---

## **Configuração do Banco de Dados**

As configurações de conexão com o banco de dados estão definidas no arquivo `application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/<nome_do_banco>
spring.datasource.username=root
spring.datasource.password=<sua_senha>
spring.jpa.hibernate.ddl-auto=update
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.show-sql=true
```
---

## **Requisitos**  
- **MySQL:** banco de dados instalado e configurado.  
- **Java 17 ou superior:** JDK instalado na máquina.  

---

## **Como Executar o Projeto**  

### **Passo 1: Configuração Inicial**  
1. Instale o **Java JDK 17 ou superior**.  
2. Instale o **MySQL** e crie o banco de dados  

### **Passo 2: Execução do Sistema**  
1. **Altere o arquivo `executar.vbs`**:
   - Abra o arquivo `executar.vbs` em um editor de texto.  
   - Substitua o caminho do arquivo `.bat` pelo diretório correto onde o arquivo `inicializar.bat` está localizado na sua máquina.
    
2. **Altere o arquivo `inicializar.bat`**:
   - Abra o arquivo `inicializar.bat` em um editor de texto.  
   - Atualize o caminho para apontar para o local correto do arquivo `pom.xml` do projeto Spring Boot.
  
3. Execute o arquivo `executar.vbs` com um **duplo clique**. 

---

## **Fluxo de Utilização**  

### **1. Login**  
- Acesse `login.html` e insira seu usuário e senha.  
- Após login bem-sucedido, será gerado um **token JWT**.  

### **2. Criação de Produtos**  
- Preencha os campos de "Espécie", "Apresentação", "Estado" e demais informações.  
- O código do produto será gerado dinamicamente na tabela.  
- Clique em "Salvar" para enviar o produto ao banco de dados.  

### **3. Visualização de Produtos**  
- Acesse `paginaProdutos.html` para ver a lista de produtos cadastrados.  
- Os produtos são exibidos em duas listas: `In Natura` e `Acabados`.  

### **4. Envio de Código**  
- Após a criação do código, o usuário pode **copiar e enviar** as informações geradas para outro sistema da cooperativa, conforme o fluxo interno de trabalho.  

---

## **Regras de Negócio**  
- Apenas usuários com perfil `ADM` podem criar novos produtos.  
- Os códigos são validados para garantir unicidade.  
- Campos obrigatórios não podem ser deixados em branco.
  
---

## **Conclusão**  
Este projeto oferece uma solução robusta e prática para o cadastro e controle de produtos de camarão na cooperativa. A execução automatizada com o `.vbs` facilita o uso por usuários sem conhecimento técnico em Java ou Spring Boot. Após a criação do código, o sistema permite que os dados sejam facilmente integrados ou enviados para outros sistemas internos da cooperativa. A segurança com **JWT** e a interface intuitiva garantem uma experiência completa e segura para os usuários.  

---


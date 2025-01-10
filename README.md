# Sistema de Geração de Códigos de Produtos de Camarão 🦐

## **Descrição do Projeto**
Este projeto foi desenvolvido para uma cooperativa de camarão com o objetivo de criar um **sistema de geração de códigos únicos** para produtos de camarão, tanto **in natura** quanto **acabados**. O sistema conta com um **frontend** em **HTML, CSS, JavaScript e Bootstrap** e um **backend** em **Spring Boot**, utilizando **JWT** para autenticação e um banco de dados **MySQL** local.

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
- **Validação de Duplicação:** busca por códigos para evitar duplicações.

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
2. Instale o **MySQL** e crie o banco de dados utilizando os scripts SQL:  
   - `V1__create_tables_users.sql`: cria a tabela de usuários.  
   - `V2__create_tables_produto_in_natura.sql`: cria a tabela de produtos in natura.  
   - `V3__create_tables_produto_geral.sql`: cria a tabela de produtos acabados.  

### **Passo 2: Execução do Sistema**  
1. Certifique-se de que o MySQL está em execução.  
2. Execute o arquivo `executar.vbs` com um **duplo clique**.  
3. A aplicação será inicializada automaticamente:  
   - O backend Spring Boot será iniciado.  
   - O servidor estará disponível em `http://localhost:8080`.  
   - Abra `index.html` no navegador para acessar a interface.  

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


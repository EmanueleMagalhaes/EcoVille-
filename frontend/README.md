# EcoVille

## Sobre o Projeto
O EcoVille é uma aplicação web desenvolvida como parte do Projeto Integrador do curso de Desenvolvimento Web – LAB 365/SENAI.  
O sistema foi criado com o objetivo de promover a coleta seletiva e sustentável de materiais recicláveis, conectando usuários residenciais e coletores de forma simples e eficiente.

A aplicação está dividida em duas partes principais:
- **Frontend (React + Vite)** → Interface de usuário moderna e responsiva.
- **Backend (Spring Boot + PostgreSQL)** → Gerenciamento de dados e autenticação via API REST.

## Funcionalidades Principais

### Tela de Login
- O usuário informa usuário e senha para acessar o sistema.  
- Se o login for válido:
  - Usuário residencial é redirecionado para a página inicial (Home).
  - Usuário coletor é redirecionado para a tela de solicitações.
- Caso o usuário não exista, exibe:  
  “Conta não encontrada.”

### Tela de Criar Conta
- Permite o cadastro completo do usuário, com campos:
  - Nome de usuário, senha e confirmação de senha  
  - Endereço (CEP, logradouro, cidade, bairro, número, complemento)
  - Geolocalização (latitude e longitude)
- Integração com Via CEP API para busca automática do endereço pelo CEP.
- Exibição de mapa dinâmico com base na latitude e longitude informadas.

### Tela de Solicitações (Coletor)
Disponível apenas para usuários com o perfil **Coletor**.

**Filtros:**
- **Data** — seleciona a data da coleta (`input type="date"`).  
- **Status** — seleciona o status da solicitação: `TODOS`, `AGUARDANDO`, `COLETADO`, `FINALIZADO`, `CANCELADO`.

**Cada solicitação contém:**
- Número da solicitação (ex: `#154545`)
- Lista de materiais e quantidades (ex: `12 kg de plástico, 1 kg de metal`)
- Data da coleta
- Status da solicitação (com cor indicativa)
- Botões de ação conforme o status:

| Status      | Ação Exibida | Descrição                        |
|------------|--------------|---------------------------------|
| AGUARDANDO | Coletar      | Confirma o início da coleta      |
| COLETADO   | Validar      | Permite revisar os materiais coletados |
| FINALIZADO | —            | Solicitação encerrada           |
| CANCELADO  | —            | Solicitação cancelada           |

## Tecnologias Utilizadas

**Frontend**
- React.js (com Vite)
- JavaScript 
- HTML e CSS
- Fetch API

**Backend**
- Java + Spring Boot
- PostgreSQL
- Spring Data JPA
- RESTful API

## Como Executar o Projeto 

### Clonar o repositório
```bash
git clone https://github.com/EmanueleMagalhaes/EcoVille-
cd ecoville/frontend
npm install

### Executar o frontend
bash
npm run dev
A aplicação ficará disponível em:
http://localhost:5173

### Executar o backend

Abra o projeto backend em sua IDE
Configure o PostgreSQL no arquivo application.properties
Rode o servidor com: 
mvn spring-boot:run
A API ficará disponível em:
http://localhost:8080

##Equipe de Desenvolvimento

Emanuele Magalhães - Desenvolvedora Frontend

Hallan Juliano Brandt - Desenvolvedor Backend

Louise Morais - Desenvolvedora Backend

Paula Calderaro - Desenvolvedora Frontend

##Licença

Este projeto foi desenvolvido exclusivamente para fins educacionais no curso Desenvolvimento Web – LAB 365/SENAI, sem fins comerciais.
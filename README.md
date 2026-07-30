Sistema de Gestão de Perfil de Aprendizes

O Sistema de Gestão de Perfil de Aprendizes é uma aplicação web desenvolvida para centralizar e gerenciar as informações acadêmicas e profissionais dos aprendizes, facilitando o acompanhamento dessas informações pelos instrutores.
A plataforma permite que os aprendizes mantenham seus perfis sempre atualizados, enquanto os instrutores podem consultar essas informações de forma estruturada, realizar pesquisas utilizando filtros e acompanhar indicadores por meio de dashboards.
Este projeto foi desenvolvido como Projeto Final do curso Técnico em Desenvolvimento de Sistemas, por alunas de uma turma de aprendizes da Robert Bosch Ltda., que realiza sua formação no SENAI CIC.

Funcionalidades
• Aprendiz
  - Visualização e atualização do perfil;
  - Gerenciamento da formação acadêmica e situação profissional;
  - Cadastro e atualização de cursos complementares, idiomas, competências técnicas e comportamentais;
  - Upload de certificados;
  - Atualização da foto de perfil;
  - Visualização das próprias informações;
  - Alteração de senha no primeiro acesso;
  - Suporte aos temas claro e escuro (modo noturno).
• Instrutor
  - Cadastro e gerenciamento de aprendizes;
  - Cadastro e gerenciamento de instrutores;
  - Cadastro e gerenciamento de turmas;
  - Consulta aos perfis dos aprendizes, bem como detalhes de cada um;
  - Pesquisa utilizando filtros;
  - Dashboard com indicadores;
  - Histórico de ações realizadas pelos usuários;
  - Notificações de ações.

Tecnologias utilizadas
• Frontend
  - React
  - TypeScript
  - Vite
  - CSS
  - Material UI (MUI)
  - Axios
  - React Router DOM
  - Recharts
  - SweetAlert
• Backend
  - Node.js
  - Express.js
  - Prisma ORM
  - MySQL
  - JWT (JSON Web Token)
  - bcryptjs
  - Zod
  - Multer
  - Nodemailer
  - Dotenv
• Ferramentas
  - Git
  - GitHub
  - GitHub Projects
  - Figma
  - Draw.io
  - Postman
 
Como executar o projeto
1. Pré-requisitos
  •	Node.js; 
  •	MySQL; 
  •	Git; 
  •	Visual Studio Code (ou outro editor de código); 
  •	Postman (opcional, para testes da API). 
2. Clone o repositório
  git clone https://github.com/BrunaElohaBonk/TalentFlow.git
3. Acesse a pasta do projeto
4. Instale as dependências no frontend e backend
  npm install
5. Configure as variáveis de ambiente
6. Crie um arquivo .env na raiz do projeto contendo as informações de conexão com o banco de dados e demais variáveis necessárias para execução da aplicação.
7. Gere o Prisma Client
  npx prisma generate
8. Execute as migrações do banco de dados
  npx prisma migrate dev
9. Inicie a aplicação no frontend e backend
  npm run dev

Controle de acesso
O sistema utiliza autenticação baseada em JWT (JSON Web Token) e controle de permissões por perfis de usuário.
Os perfis disponíveis são:
• Aprendiz
• Instrutor
Cada perfil possui permissões específicas, garantindo que cada usuário tenha acesso apenas às funcionalidades correspondentes ao seu nível de acesso.

Principais recursos
• Centralização das informações acadêmicas e profissionais dos aprendizes;
• Atualização do perfil pelo próprio aprendiz;
• Gerenciamento da formação acadêmica, situação profissional, cursos, idiomas e competências;
• Upload de certificados e foto de perfil;
• Consulta estruturada dos perfis pelos instrutores;
• Cadastro e gerenciamento de aprendizes, instrutores e turmas;
• Dashboard com indicadores para acompanhamento das turmas;
• Pesquisa por filtros para localização de aprendizes;
• Histórico de alterações dos perfis;
• Notificações automáticas de atualização para os instrutores;
• Interface com suporte aos temas claro e escuro.

Equipe
Projeto desenvolvido pelas aprendizes Bruna Elohá Bonk, Júlia Carolina Gabriel dos Santos, Lasnine Miranda dos Santos e Lays Arceles de Souza do curso Técnico em Desenvolvimento de Sistemas da Robert Bosch Ltda., em formação no SENAI CIC.

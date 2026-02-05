# Portfólio — Alexandre Souza

Site de portfólio profissional com identidade visual inspirada em **terminal** e **pipelines CI/CD**.  
**100% idealizado e desenvolvido por mim** — desde a concepção da ideia até a implementação de cada seção, animações e integrações.

---

## Sobre o projeto

Este portfólio apresenta experiência, formação, cases de melhoria e projetos de forma objetiva e visual, com suporte a **três idiomas** (EN, PT, ES) e integração com a **API do GitHub** para repositórios fixados. A estética remete a um ambiente de desenvolvimento e deploy, reforçando o perfil técnico.

---

## Funcionalidades

| Recurso | Descrição |
|--------|------------|
| **Navegação fixa** | Header com links âncora para todas as seções (Perfil, Experiência, Dados, Formação, Contato, Projetos). |
| **Perfil (hero)** | Apresentação em estilo “bio” com avatar, tagline, anos de experiência, educação, localização e CTAs (GitHub, LinkedIn, contratação). |
| **Pipeline de experiências** | Timeline de experiências profissionais com visual de pipeline CI/CD e status (Em andamento / Sucesso). |
| **Cases de melhoria** | Seção “The Data Processing”: JSON à esquerda (um atributo por linha), animação de seta/dados no centro, e cards Antes / Problema / Depois à direita. |
| **Projetos** | Projetos em destaque (curados) + repositórios pinados do GitHub via API GraphQL. |
| **Formação acadêmica** | Certificações com badges (Bacharel / Pós) e descrições. |
| **Contato** | Rodapé em estilo terminal com localização, e-mail, telefone e status. |
| **i18n** | Inglês (padrão), Português e Espanhol — seletor de idioma no header. |
| **Responsivo** | Layout adaptado para mobile e desktop. |
 Especialista em Performance e Backend
---

## Stack tecnológica

- **Framework:** [Next.js 16](https://nextjs.org) (App Router)
- **UI:** [React 19](https://react.dev) + [Tailwind CSS 4](https://tailwindcss.com)
- **Linguagem:** TypeScript
- **Internacionalização:** i18n próprio (arquivos de locale em `app/i18n/locales/`)
- **API:** Route Handler Next.js para [GitHub GraphQL API](https://docs.github.com/en/graphql) (repositórios pinados)

---

## Estrutura do projeto

```
my-portifolio/
├── app/
│   ├── api/
│   │   └── github-pinned/
│   │       └── route.ts          # API que busca repos pinados do GitHub
│   ├── components/
│   │   ├── NavHeader.tsx         # Navegação fixa + seletor de idioma
│   │   ├── SocialHeader.tsx      # Hero / perfil
│   │   ├── ExperiencePipeline.tsx
│   │   ├── DataProcessing.tsx    # Cases de melhoria + animação seta/dados
│   │   ├── ProjectsSection.tsx   # Projetos em destaque + GitHub pinados
│   │   ├── AcademicSection.tsx
│   │   ├── FooterCTA.tsx         # Contato
│   │   └── LanguageSwitcher.tsx
│   ├── context/
│   │   └── LanguageContext.tsx   # Estado do idioma (EN/PT/ES)
│   ├── i18n/
│   │   ├── config.ts
│   │   ├── index.ts
│   │   ├── types.ts
│   │   ├── translations.ts
│   │   └── locales/
│   │       ├── en.ts
│   │       ├── pt.ts
│   │       └── es.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
│   └── profile.jpeg              # Foto de perfil
├── .env.example                  # Exemplo de variáveis de ambiente
├── next.config.ts
├── package.json
├── tailwind.config.ts (ou via PostCSS)
└── tsconfig.json
```

---

## Como replicar o projeto

### Pré-requisitos

- **Node.js** 18+ (recomendado 20+)
- **npm** (ou yarn/pnpm/bun)

### Passo a passo

1. **Clonar o repositório**

   ```bash
   git clone https://github.com/<seu-usuario>/my-portifolio.git
   cd my-portifolio
   ```

2. **Instalar dependências**

   ```bash
   npm install
   ```

3. **Configurar variáveis de ambiente (opcional para GitHub)**

   Para a seção de repositórios pinados funcionar sem bater no limite de taxa da API do GitHub (60 req/hora por IP), use um Personal Access Token:

   - Copie o exemplo: `cp .env.example .env`
   - Crie um token em: [GitHub → Settings → Developer settings → Personal access tokens](https://github.com/settings/tokens)  
     - Marque apenas o escopo **public_repo** (ou **repo** se precisar de repos privados).
   - No `.env`:

   ```env
   GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx
   ```

   **Nota:** Sem `GITHUB_TOKEN`, a API ainda funciona, mas com limite menor de requisições.

4. **Rodar em desenvolvimento**

   ```bash
   npm run dev
   ```

   Acesse [http://localhost:3000](http://localhost:3000).

5. **Build para produção**

   ```bash
   npm run build
   npm start
   ```

---

## Scripts disponíveis

| Comando | Descrição |
|--------|------------|
| `npm run dev` | Sobe o servidor de desenvolvimento (hot reload). |
| `npm run build` | Gera o build de produção. |
| `npm start` | Inicia o servidor com o build de produção. |
| `npm run lint` | Executa o ESLint. |

---

## Customização

- **Conteúdo e textos:** edite os arquivos em `app/i18n/locales/` (`en.ts`, `pt.ts`, `es.ts`) para alterar textos, experiências, casos de melhoria, projetos em destaque, formação e rodapé.
- **Foto de perfil:** substitua `public/profile.jpeg` mantendo o nome ou atualize a referência no componente que exibe o avatar.
- **Repositórios pinados:** o usuário GitHub está definido em `app/api/github-pinned/route.ts` (constante `USER_LOGIN`). Altere para seu usuário e fixe os repositórios desejados no seu perfil do GitHub.
- **Cores e tema:** variáveis CSS em `app/globals.css` (ex.: `--terminal-green`, `--foreground`, `--background`).

---

## Deploy

O projeto pode ser implantado em qualquer plataforma que suporte Next.js (Vercel, Netlify, Railway, etc.). Em produção, defina a variável `GITHUB_TOKEN` no painel da plataforma para evitar rate limit na API do GitHub.

**Exemplo (Vercel):**

1. Conecte o repositório ao Vercel.
2. Em **Settings → Environment Variables**, adicione `GITHUB_TOKEN` com o valor do seu token.
3. Faça o deploy; o build usa `next build` por padrão.

---

## O que foi idealizado por mim

- Conceito visual (terminal + CI/CD) e estrutura de seções  
- Design das seções (hero, pipeline, cases, projetos, formação, contato)  
- Sistema de i18n (EN/PT/ES) e seletor de idioma  
- Integração com GitHub (repositórios pinados) e Route Handler  
- Animações (seta de fluxo de dados, pacotes, pipeline)  
- Formatação do JSON (um atributo por linha) e layout dos cases  
- Textos, copy e organização do conteúdo  

Todo o código e a experiência do portfólio foram desenvolvidos e idealizados por mim.

---

## Licença

Projeto de uso pessoal/portfólio. Para reutilizar como base, verifique a licença do repositório ou entre em contato.

---

**Autor:** Alexandre Souza  
**Contato:** disponível na seção de contato do próprio portfólio.
# my_protifolio

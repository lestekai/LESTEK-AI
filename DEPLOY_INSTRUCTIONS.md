# Deploy Evolux na Netlify - Guia Definitivo

Siga estas instruções passo a passo para garantir que seu deploy na Netlify ocorra **sem nenhum erro**.

## 1. Verificações Prévias
O projeto já conta com toda a estrutura necessária configurada por padrão:
- O sistema de rotas foi configurado para **SPA** (Single Page Application) através do uso do React Router.
- Existe um arquivo `netlify.toml` na raiz com os comandos corretos.
- Existe um arquivo `_redirects` na pasta `public/` garantindo que as URLs não retornem Erro 404 ao atualizar a página.

## 2. Passo a Passo do Github
1. Suba todo o seu código para um repositório no **GitHub**.
2. Garanta que todas as alterações estejam commitadas:
   ```bash
   git add .
   git commit -m "Preparando deploy final Netlify"
   git push origin main
   ```

## 3. Passo a Passo na Netlify
1. Acesse o painel da Netlify e faça Login.
2. Clique em **Add new site** > **Import an existing project**.
3. Conecte sua conta do GitHub e selecione o repositório do Evolux.
4. Na tela de configurações do deploy (Build Settings), graças ao arquivo `netlify.toml`, tudo estará preenchido automaticamente, mas você pode confirmar:
   - **Base directory:** `(deixe em branco)`
   - **Build command:** `npm install && npm run build`
   - **Publish directory:** `dist`

## 4. Variáveis de Ambiente Obrigatórias
Antes de clicar em Deploy, adicione as variáveis de ambiente necessárias em **"Environment variables"**.
O app depende delas para funcionar:
- `GEMINI_API_KEY`: Necessária para as missões e integrações da IA.
- `APP_URL`: O domínio público da sua aplicação.

### ⚠️ EVITAR O ERRO DE AUTO-DETECÇÃO DO NEXT.JS (MUITO IMPORTANTE!)
Como este aplicativo é uma Single Page Application construída com **Vite** (gerando a pasta `dist`), mas contém uma pasta `app` de herança, a Netlify pode tentar auto-detectá-lo incorretamente como um projeto Next.js e falhar no build.

Para garantir 100% de sucesso:
1. Nós já configuramos dentro do arquivo `netlify.toml` a instrução para pular o instalador do Next.js.
2. Por segurança cibernética, certifique-se de adicionar estas duas variáveis de ambiente adicionais nas configurações do painel da Netlify (**Site settings > Environment variables**):
   - **`NETLIFY_NEXT_PLUGIN_SKIP`** = **`true`**
   - **`DISABLE_NEXTJS_PLUGIN`** = **`true`**

Isso desativará completamente o plugin do Next.js da Netlify e forçará o build usando a arquitetura correta do Vite!

*(Obs: as variáveis relativas ao Supabase devem ser incluídas caso a integração final via backend no banco de dados ainda dependa delas).*

## 5. Fazer o Deploy
- Clique no botão **Deploy site**.
- A Netlify fará o download das dependências NodeJS versão 20 (definida no toml) e executará o `npm run build` do Vite compilando tudo.
- Zero erros de roteamento ocorrerão, o arquivo toml fará o fallback do `/*` roteando corretamente pelo React Router.

## 6. Configurações Finais (Opcional)
Se precisar utilizar um domínio customizado, basta acessar "Domain Settings" > "Add custom domain" dentro do seu site hospedado, adicionar seus registros DNS e ativar a aba **HTTPS/SSL** em instantes.

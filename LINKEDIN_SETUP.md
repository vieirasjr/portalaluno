# Configuração do Login com LinkedIn

## 1. Variáveis de ambiente

### Vercel (produção)
No painel da Vercel, adicione em **Settings → Environment Variables**:

- `Client_ID`: valor do ID do cliente (painel LinkedIn)
- `Primary_Client_Secret`: valor do Client Secret (painel LinkedIn)

### Local (.env)
Crie um arquivo `.env` na raiz do projeto (não commitar este arquivo):

```
Client_ID=seu_client_id
Primary_Client_Secret=seu_client_secret
APP_URL=http://localhost:3000
```

## 2. LinkedIn Developer Portal

1. Acesse https://www.linkedin.com/developers/
2. Selecione seu app
3. Em **Auth** → **OAuth 2.0 settings**:
   - Adicione em **Authorized redirect URLs**:
- Produção: `https://SEU_DOMINIO.vercel.app/api/linkedin-callback`
- Local: `http://localhost:3000/api/linkedin-callback`
4. Em **Products**, solicite acesso a **Sign In with LinkedIn using OpenID Connect** (pode levar até 60 min para aprovação)

## 3. Executar localmente

Use o Vercel CLI para rodar as API routes:

```bash
npm i -g vercel
vercel dev
```

Ou apenas `npm run dev` para o frontend (o login com LinkedIn só funcionará em produção ou com `vercel dev`).

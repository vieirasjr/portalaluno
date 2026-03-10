# INSTRUÇÕES DE DESENVOLVIMENTO — PORTAL DO ALUNO (FACULDADE)

## OBJETIVO

Construir um portal do aluno completo usando:

- React JS (Vite ou CRA)
- Tailwind CSS - como referencia de cores use o arquivo estilo_referencia.css na raíz do projeto.
- Bootstrap Icons
- Padrão de espaçamento consistente
- Componentização reutilizável
- Layout responsivo
- Simulação de login (sem backend real)
- Estrutura escalável
- Código limpo e organizado

A IA deve executar as tarefas em ordem.
Após cada etapa, deve validar se tudo foi criado corretamente antes de continuar.

NÃO PULAR ETAPAS.

Se algo falhar, corrigir antes de seguir.

Cores serão definidas manualmente depois.
Não criar tema de cores definitivo.

---

# REGRAS GERAIS

- Usar React JS com componentes funcionais
- Usar Tailwind para layout
- Usar Bootstrap Icons
- Criar pasta /components
- Criar pasta /pages
- Criar pasta /layouts
- Criar pasta /styles
- Criar pasta /data (mock)
- Criar pasta /hooks
- Criar pasta /utils

Criar estrutura escalável.

---

# PADRÃO DE ESPAÇAMENTO

Usar padrão:

p-2
p-4
p-6
p-8

gap-2
gap-4
gap-6

rounded-xl
shadow-sm
shadow-md

container max-w-7xl

Fonte padrão:

font-sans
text-sm
text-base
text-lg
text-xl

---

# BIBLIOTECAS

Instalar:

- react-router-dom
- tailwindcss
- bootstrap-icons
- clsx

Validar instalação antes de continuar.

---

# ETAPA 1 — CRIAR PROJETO

Criar projeto React

Configurar Tailwind

Configurar Router

Configurar Bootstrap Icons

Criar layout base

VALIDAR:

- Projeto roda
- Tailwind funciona
- Ícones funcionam
- Router funciona

Se não funcionar, corrigir.

Só continuar depois.

---

# ETAPA 2 — GUIA DE ESTILO (COMPONENTES BASE)

Criar componentes:

Formulário
- Input
- PasswordInput
- Select
- Checkbox
- Radio
- Switch
- Textarea
- ErrorMessage

Botões
- ButtonPrimary
- ButtonSecondary
- ButtonLink
- ButtonIcon

Navegação
- Sidebar
- Header
- Tabs
- Pagination
- Breadcrumb

Cartões
- Card
- CardInfo
- CardImage
- CardAction

Tabela
- Table
- TableWithFilter
- TableWithPagination

Feedback
- AlertSuccess
- AlertError
- AlertWarning
- AlertInfo
- Loading

Status
- Badge
- Tag
- Progress
- PercentIndicator

Modais
- Modal
- Tooltip
- Popover

VALIDAR:

Todos componentes renderizam.

Se faltar algum, criar.

---

# ETAPA 3 — LAYOUT BASE

Criar:

MainLayout
AuthLayout
DashboardLayout

Layout deve ter:

Header
Sidebar
Content
Footer

VALIDAR:

Layout funciona
Responsivo funciona

---

# ETAPA 4 — LOGIN

Tela de login:

Componentes:

- Input usuário
- Input senha
- Botão entrar
- Link esqueci senha
- Erro login
- Loading
- Rodapé
- Form recuperar senha
- Form redefinir senha

Simulação:

user: aluno
senha: 123

Se correto → Dashboard

VALIDAR:

Login funciona
Erro aparece
Loading aparece

---

# ETAPA 5 — DASHBOARD

Criar:

- Header com avatar
- Sidebar
- Cards

Cards:

Curso em andamento
Situação acadêmica
Financeiro
Avisos
Atalhos

VALIDAR:

Cards aparecem
Layout correto
Responsivo

---

# ETAPA 6 — ACADÊMICO

Criar páginas:

Subhome
Disciplinas
Detalhe disciplina
Notas
Frequência
Histórico

Criar mock data.

VALIDAR:

Lista aparece
Tabela funciona
Filtro funciona

---

# ETAPA 7 — FINANCEIRO

Criar:

Resumo
Lista boletos
Detalhe boleto
Histórico financeiro

Simular boletos.

VALIDAR:

Abas funcionam
Tabela funciona
PDF simulado funciona

---

# ETAPA 8 — DOCUMENTOS

Lista:

Diploma
Certificados
Boletins

Botão download fake.

VALIDAR:

Download simulado ok

---

# ETAPA 9 — INTEGRAÇÕES

Criar:

Lista sistemas
Banner email
Avisos
FAQ
Busca

VALIDAR:

Busca funciona

---

# ETAPA 10 — PERFIL DO ALUNO

Criar:

Foto
Dados pessoais
Dados acadêmicos
Preferências
Segurança

Simular alteração senha.

VALIDAR:

Form funciona

---

# ETAPA 11 — RESPONSIVO

Aplicar responsivo em tudo.

Mobile
Tablet
Desktop

VALIDAR:

Nada quebra

---

# ETAPA 12 — VALIDAÇÃO FINAL

Checar:

Login ok
Dashboard ok
Acadêmico ok
Financeiro ok
Docs ok
Integrações ok
Perfil ok
Responsivo ok
Componentes ok
Layout ok

Se algo faltar, corrigir.

NÃO FINALIZAR COM ERROS.

---

# REGRA FINAL

A IA deve:

Executar
Validar
Corrigir
Só depois continuar

Nunca assumir que está pronto.
Sempre verificar.
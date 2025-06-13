# 🏋️ Fitness App - Documentação Completa da Estrutura

## 📋 Visão Geral

O **Fitness App** é uma aplicação web Progressive (PWA) para acompanhamento de treinos, desenvolvida com **React + TypeScript + Vite**, utilizando **React Router** para navegação SPA e **TailwindCSS** para estilização.

---

## 🗂️ Estrutura de Arquivos

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Biblioteca de componentes UI (40+ componentes)
│   │   ├── button.tsx
│   │   ├── glass-card.tsx
│   │   ├── badge.tsx
│   │   └── ... (37 outros componentes)
│   └── Navigation.tsx   # Navegação bottom bar
├── pages/              # Páginas da aplicação (13 páginas)
│   ├── Dashboard.tsx    # Página principal
│   ├── Timer.tsx        # Cronômetro de treino
│   ├── Profile.tsx      # Perfil do usuário
│   ├── WorkoutRoutines.tsx # Rotinas e protocolos
│   ├── CreateWorkout.tsx   # Criar novos treinos
│   ├── CreateRoutine.tsx   # Criar protocolos
│   ├── WorkoutDetail.tsx   # Detalhes do treino
│   ├── Statistics.tsx      # Estatísticas e gráficos
│   ├── Calendar.tsx        # Calendário de treinos
│   ├── Friends.tsx         # Rede social
│   ├── Index.tsx           # Redirecionamento
│   ├── Placeholder.tsx     # Página em construção
│   └── NotFound.tsx        # Erro 404
├── hooks/              # Hooks customizados
├── lib/                # Utilitários
├── App.tsx            # Configuração de rotas
└── main.tsx           # Entry point
```

---

## 🧭 Sistema de Navegação e Rotas

### **Rotas Principais**

| Rota        | Componente            | Descrição                         | Acesso via |
| ----------- | --------------------- | --------------------------------- | ---------- |
| `/`         | `Index` → `Dashboard` | Página inicial (redirecionamento) | URL direta |
| `/timer`    | `Timer`               | Cronômetro de treino              | Bottom nav |
| `/profile`  | `Profile`             | Perfil do usuário                 | Bottom nav |
| `/routines` | `WorkoutRoutines`     | Lista de protocolos e treinos     | Bottom nav |
| `/progress` | `Statistics`          | Estatísticas e gráficos           | Bottom nav |

### **Rotas Secundárias**

| Rota              | Componente      | Descrição                       | Acesso via             |
| ----------------- | --------------- | ------------------------------- | ---------------------- |
| `/create-workout` | `CreateWorkout` | Formulário para criar treino    | Botão "+" em Routines  |
| `/create-routine` | `CreateRoutine` | Formulário para criar protocolo | Botão "+" em Routines  |
| `/workout/:id`    | `WorkoutDetail` | Detalhes específicos do treino  | Click em treino        |
| `/calendar`       | `Calendar`      | Calendário de frequência        | Dashboard quick action |
| `/friends`        | `Friends`       | Rede social fitness             | Profile menu           |

### **Rotas Especiais**

| Rota           | Componente    | Descrição                  |
| -------------- | ------------- | -------------------------- |
| `/placeholder` | `Placeholder` | Páginas em desenvolvimento |
| `*`            | `NotFound`    | Catch-all para 404         |

---

## 🎯 Fluxo de Navegação Principal

### **1. Dashboard (Página Principal)**

```
Dashboard (/)
├── Iniciar Treino → WorkoutDetail (/workout/:id)
├── Ver Calendário → Calendar (/calendar)
├── Ver Estatísticas → Statistics (/progress)
└── Bottom Nav → Timer, Profile, Routines, Statistics
```

### **2. Gestão de Treinos**

```
WorkoutRoutines (/routines)
├── Criar Treino → CreateWorkout (/create-workout)
├── Criar Protocolo → CreateRoutine (/create-routine)
├── Ver Treino → WorkoutDetail (/workout/:id)
└── Iniciar Treino → Timer (/timer)
```

### **3. Perfil e Social**

```
Profile (/profile)
├── Amigos → Friends (/friends)
├── Configurações → Placeholder (/placeholder)
└── Estatísticas → Statistics (/progress)
```

---

## 📱 Componentes de Interface

### **Navigation Bar (Bottom)**

Presente em **todas as páginas principais**:

- 🏠 Dashboard (`/`)
- ⏱️ Timer (`/timer`)
- 👤 Profile (`/profile`)
- 💪 Routines (`/routines`)
- 📊 Statistics (`/progress`)

### **Glass Cards**

Sistema de design principal usado em **todas as páginas**:

- Background: `rgba(255, 255, 255, 0.6)`
- Backdrop blur: `12px`
- Border radius: `24px`
- Shadow: Custom glass effect

### **Padrão de Cabeçalho**

**Páginas principais**: Título + ações contextuais
**Páginas secundárias**: Botão voltar + título + ações

---

## 🔄 Estados e Dados

### **Dados Mock Utilizados**

1. **Treinos e Protocolos**

   - Protocolos com data início/fim
   - Treinos por grupo muscular
   - Exercícios com séries/reps/peso
   - Histórico de execução

2. **Estatísticas**

   - Progresso semanal
   - Distribuição por grupos musculares
   - Evolução corporal mensal
   - Metas e progresso

3. **Social**

   - Lista de amigos
   - Status online/offline
   - Solicitações de amizade
   - Estatísticas compartilhadas

4. **Perfil**
   - Informações pessoais
   - Passos diários
   - Streak de treinos
   - Configurações

---

## 📊 Páginas Detalhadas

### **1. Dashboard** - Página Central

**Funcionalidades:**

- Treino programado do dia
- Progresso semanal (barra visual)
- Streak de dias consecutivos
- Quick actions (calendário, estatísticas)
- Cartão de boas-vindas

**Navegação:**

- Iniciar treino → `/workout/:id`
- Ver calendário → `/calendar`
- Estatísticas → `/progress`
- Bottom nav para todas as seções

### **2. Timer** - Cronômetro de Treino

**Funcionalidades:**

- Timer circular visual
- Configuração work/rest
- Sistema de rounds
- Controles play/pause/reset
- Presets salvos

**Estados:**

- Timer ativo/pausado
- Fase work/rest
- Round atual/total
- Configurações personalizadas

### **3. Profile** - Perfil do Usuário

**Funcionalidades:**

- Avatar e informações pessoais
- Contador de passos diários
- Menu de configurações
- Links para funcionalidades

**Navegação:**

- Amigos → `/friends`
- Configurações → `/placeholder`
- Estatísticas → `/progress`

### **4. WorkoutRoutines** - Gestão de Treinos

**Funcionalidades:**

- Lista de protocolos organizados
- Treinos por protocolo (expansível)
- Indicadores de última execução
- Criação de novos conteúdos

**Navegação:**

- Criar treino → `/create-workout`
- Criar protocolo → `/create-routine`
- Ver detalhes → `/workout/:id`
- Histórico de execução

### **5. Statistics** - Análise e Métricas

**Funcionalidades:**

- Resumo mensal (KPIs)
- Metas com progresso visual
- Gráficos de frequência
- Distribuição muscular
- Evolução corporal

**Dados Exibidos:**

- 28 treinos realizados
- 87% consistência
- Metas: treinos (28/30), peso (75/78kg)
- Gráficos: semanal, mensal, distribuição

### **6. CreateWorkout** - Criação de Treinos

**Funcionalidades:**

- Formulário nome/grupo muscular
- Sistema de adição de exercícios
- Configuração séries/reps/peso
- Upload de vídeos
- Salvar como template

**Campos:**

- Nome do treino
- Grupo muscular principal
- Lista de exercícios
- Configurações por exercício
- Instruções e notas

### **7. WorkoutDetail** - Detalhes do Treino

**Funcionalidades:**

- Informações completas
- Lista de exercícios detalhada
- Estimativas de tempo
- Nível de dificuldade
- Iniciar execução

**Dados Exibidos:**

- Duração: 45 min
- Exercícios: 6
- Dificuldade: ⭐⭐⭐⭐
- Detalhes por exercício

### **8. Calendar** - Calendário de Treinos

**Funcionalidades:**

- Visualização mensal
- Dias com treino destacados
- Navegação entre meses
- Resumo estatístico
- Indicador de metas

**Interações:**

- Navegar mês anterior/próximo
- Ver detalhes do dia
- Resumo mensal
- Progresso da meta

### **9. Friends** - Rede Social

**Funcionalidades:**

- Lista de amigos
- Status online/offline
- Estatísticas compartilhadas
- Solicitações de amizade
- Sistema de chat

**Dados Sociais:**

- 4 amigos, 3 online
- 2 solicitações pendentes
- Treinos por semana dos amigos
- Streak de cada amigo

### **10. CreateRoutine** - Criação de Protocolos

**Funcionalidades:**

- Formulário básico
- Período de execução
- Seleção de treinos
- Ordem de execução
- Configuração de dificuldade

### **11-13. Páginas Auxiliares**

- **Index**: Redirecionamento automático
- **Placeholder**: Funcionalidades em desenvolvimento
- **NotFound**: Tratamento de erro 404

---

## 🎨 Sistema de Design

### **Cores Principais**

- **Primary**: `#4A8173` (mint-600)
- **Background**: `#DBECE9` (mint-100)
- **Glass**: `rgba(255, 255, 255, 0.6)`
- **Text**: `#111827` (gray-900)
- **Secondary**: `#6B7280` (gray-500)

### **Tipografia**

- **Heading 1**: `text-2xl font-bold` (24px)
- **Heading 2**: `text-lg font-semibold` (18px)
- **Body**: `text-base` (16px)
- **Small**: `text-sm` (14px)
- **Caption**: `text-xs` (12px)

### **Espaçamentos**

- **Container**: `max-w-md mx-auto px-4`
- **Cards**: `p-6` (24px)
- **Gaps**: `gap-4` (16px), `gap-6` (24px)
- **Margins**: `mb-6` (24px), `mb-4` (16px)

---

## 🔧 Funcionalidades Técnicas

### **Roteamento**

- **React Router v6** com BrowserRouter
- Rotas protegidas (futuro: autenticação)
- Catch-all para 404
- Navegação programática

### **Estado**

- Estados locais com `useState`
- Dados mock estruturados
- Futuro: Context API ou Redux

### **Performance**

- Lazy loading (preparado)
- Tree shaking automático
- Imagens otimizadas
- CSS purged automaticamente

### **Responsividade**

- Mobile-first design
- Breakpoint principal: `max-w-md` (448px)
- Grid systems responsivos
- Touch-friendly interactions

---

## 🚀 Fluxos de Usuário Principais

### **1. Fluxo de Treino Completo**

```
Dashboard → Ver treino do dia → Detalhes → Iniciar → Timer → Finalizar → Estatísticas
```

### **2. Fluxo de Criação**

```
Routines → Criar Protocolo → Adicionar Treinos → Criar Treino → Adicionar Exercícios → Salvar
```

### **3. Fluxo de Acompanhamento**

```
Dashboard → Calendário → Ver histórico → Estatísticas → Analisar progresso → Ajustar metas
```

### **4. Fluxo Social**

```
Profile → Amigos → Ver atividades → Comentar → Adicionar novos amigos → Chat
```

---

## 📈 Métricas e KPIs Rastreados

### **Performance de Treino**

- Treinos realizados/mês
- Consistência percentual
- Streak de dias consecutivos
- Tempo médio por treino
- Peso total levantado

### **Progresso Físico**

- Evolução de peso corporal
- Percentual de gordura
- Massa muscular
- Medidas corporais
- Fotos de progresso

### **Engagement Social**

- Amigos ativos
- Treinos compartilhados
- Curtidas e comentários
- Motivação mútua

---

## 🔮 Próximos Passos/Roadmap

### **Funcionalidades Pendentes**

1. **Autenticação**: Login/registro com Supabase
2. **Base de dados**: Implementar schema criado
3. **Sincronização**: Dados em tempo real
4. **Notificações**: Push notifications
5. **Offline**: PWA com cache
6. **Wearables**: Integração com smartwatches

### **Melhorias de UX**

1. **Animações**: Transições suaves
2. **Feedback**: Loading states
3. **Acessibilidade**: ARIA completo
4. **Tema escuro**: Dark mode
5. **Personalização**: Cores customizáveis

---

## 💻 Comandos de Desenvolvimento

```bash
# Instalar dependências
npm install

# Executar desenvolvimento
npm run dev

# Build para produção
npm run build

# Testes
npm test

# Type checking
npm run typecheck

# Formatação
npm run format.fix
```

---

## 🏗️ Arquitetura de Deployment

### **Frontend** (Atual)

- **Vite** como bundler
- **React SPA** hospedado estaticamente
- **Tailwind** compilado
- **Progressive Web App** ready

### **Backend** (Futuro)

- **Supabase** para dados e auth
- **Edge Functions** para lógica
- **Real-time** subscriptions
- **Storage** para imagens/vídeos

### **Infraestrutura**

- **Vercel/Netlify** para frontend
- **Supabase Cloud** para backend
- **CDN** para assets
- **Push service** para notificações

---

## 📱 Resumo da Experiência

O **Fitness App** oferece uma experiência completa de acompanhamento fitness com:

- **13 páginas** interconectadas
- **Sistema de navegação** intuitivo
- **Design consistente** com glass morphism
- **Fluxos otimizados** para mobile
- **Dados estruturados** para crescimento
- **Arquitetura escalável** para futuras funcionalidades

A aplicação está preparada para evoluir de um MVP funcional para uma plataforma robusta de fitness social com recursos avançados de tracking e comunidade.

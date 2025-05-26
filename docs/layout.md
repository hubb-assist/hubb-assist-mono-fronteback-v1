# Layout Componentizado - HUBB Assist SaaS

## Visão Geral
O HUBB Assist SaaS possui um layout totalmente componentizado seguindo princípios de design moderno e responsivo, construído com React + TypeScript + Tailwind CSS.

## Estrutura de Componentes

### Componentes Principais

#### 1. AppShell.tsx
- **Localização**: `frontend/src/components/layout/AppShell.tsx`
- **Função**: Container principal da aplicação
- **Características**:
  - Gerencia estado da sidebar (aberta/fechada)
  - Layout responsivo com grid CSS
  - Suporte para mobile com overlay

#### 2. Header.tsx
- **Localização**: `frontend/src/components/layout/Header.tsx`
- **Função**: Cabeçalho da aplicação
- **Características**:
  - Logo oficial HUBB
  - Botão de toggle da sidebar (mobile)
  - Navegação superior
  - Cores oficiais: Roxo (#2D113F) e Vermelho (#C52339)

#### 3. Sidebar.tsx
- **Localização**: `frontend/src/components/layout/Sidebar.tsx`
- **Função**: Menu lateral de navegação
- **Características**:
  - **Desktop**: 240px expandida, 60px colapsada
  - **Mobile**: Overlay com fundo escuro
  - Ícones Lucide React (brancos)
  - Animações suaves de transição

#### 4. Dashboard.tsx
- **Localização**: `frontend/src/pages/Dashboard.tsx`
- **Função**: Página principal do dashboard
- **Características**:
  - Cards dos módulos HUBB
  - Layout em grid responsivo
  - Estatísticas e métricas

## Módulos HUBB

### Módulos Implementados
1. **HUBB HOF** - Harmonização Orofacial com IA
   - Ícone: Sparkles
   - Cor: Gradient roxo/rosa

2. **HUBB Vision** - Processamento de Radiografias
   - Ícone: Eye
   - Cor: Gradient azul

3. **HUBB RH** - Gestão de Recursos Humanos
   - Ícone: Users
   - Cor: Gradient verde

4. **HUBB IA** - Assistente Virtual
   - Ícone: Bot
   - Cor: Gradient roxo

5. **HUBB Core** - Gestão Principal
   - Ícone: Building2
   - Cor: Gradient laranja

6. **Configurações** - Configurações do Sistema
   - Ícone: Settings
   - Cor: Gradient cinza

## Design System

### Cores Oficiais
```css
--hubb-purple: #2D113F
--hubb-red: #C52339
```

### Responsividade

#### Desktop (≥ 1024px)
- Sidebar fixa lateral
- Layout em 3 colunas
- Cards em grid 3x2

#### Tablet (768px - 1023px)
- Sidebar colapsável
- Layout em 2 colunas
- Cards em grid 2x3

#### Mobile (< 768px)
- Sidebar overlay
- Layout em 1 coluna
- Cards empilhados

## Configuração Técnica

### Vite Configuration
```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: [
      'localhost',
      'hubb-assist-mono-fronteback-v1.replit.app',
      '.replit.app',
      '.spock.replit.dev'
    ],
    hmr: {
      port: 24678,
      host: '0.0.0.0'
    }
  }
})
```

### PostCSS Configuration
```javascript
// postcss.config.js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
```

### Tailwind Configuration
```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'hubb-purple': '#2D113F',
        'hubb-red': '#C52339'
      }
    },
  }
}
```

## Estados de Componentes

### Sidebar States
- `isSidebarOpen`: boolean - Controla visibilidade
- `isMobile`: boolean - Detecta dispositivo móvel
- `isCollapsed`: boolean - Estado colapsado (desktop)

### Responsive Breakpoints
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## Boas Práticas

### Organização de Arquivos
```
frontend/src/
├── components/
│   ├── layout/
│   │   ├── AppShell.tsx
│   │   ├── Header.tsx
│   │   └── Sidebar.tsx
│   └── ui/
├── pages/
│   └── Dashboard.tsx
└── lib/
    └── utils.ts
```

### Convenções de Nomenclatura
- Componentes: PascalCase (`AppShell.tsx`)
- Hooks: camelCase com prefixo `use` (`useSidebar`)
- Utilitários: camelCase (`cn`, `formatDate`)
- Constantes: UPPER_SNAKE_CASE (`API_BASE_URL`)

### Acessibilidade
- Todos os botões possuem `aria-label`
- Navegação por teclado implementada
- Contraste adequado nas cores
- Suporte a screen readers

## Troubleshooting

### Problemas Comuns

#### 1. Host Blocked Error
**Erro**: `This host is not allowed`
**Solução**: Adicionar host no `allowedHosts` do vite.config.js

#### 2. TailwindCSS não funciona
**Erro**: `postcss plugin error`
**Solução**: Instalar `@tailwindcss/postcss` e configurar postcss.config.js

#### 3. WebSocket connection failed
**Erro**: `failed to connect to websocket`
**Solução**: Configurar HMR com porta específica

### Comandos Úteis
```bash
# Instalar dependências
npm install

# Executar desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

## Extensibilidade

### Adicionando Novos Módulos
1. Criar componente em `src/components/modules/`
2. Adicionar rota em `src/App.tsx`
3. Incluir item na sidebar
4. Definir ícone Lucide apropriado
5. Aplicar gradient de cor único

### Adicionando Novas Páginas
1. Criar arquivo em `src/pages/`
2. Importar e usar `AppShell` como wrapper
3. Configurar rota no React Router
4. Adicionar navegação se necessário

Este layout componentizado garante escalabilidade, manutenibilidade e uma experiência de usuário consistente em toda a aplicação HUBB Assist SaaS.
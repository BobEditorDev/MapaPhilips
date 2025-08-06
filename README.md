# Mapa Interativo do Escritório - Philips

Uma aplicação web interativa de página única que apresenta o mapa do escritório Philips com funcionalidade avançada de localização de salas através de interface SVG responsiva.

## ✨ Funcionalidades Principais

### 🏢 Mapa Interativo SVG
- **Visualização Vetorial**: Mapa do escritório em SVG escalável de alta qualidade
- **11 Salas Interativas**: Todas as salas são clicáveis e responsivas
- **Cores Categorizadas**: Cada tipo de sala tem sua cor específica
- **Efeito de Piscar**: Salas selecionadas piscam em vermelho para localização visual

### 📋 Interface Organizada
- **Sidebar Categorizada**: Salas organizadas por tipo com ícones identificadores
- **Seleção Dupla**: Clique nas salas da lista OU diretamente no mapa SVG
- **Botão de Limpeza**: Função "Limpar Seleção" sempre disponível
- **Feedback Visual**: Estados visuais claros para salas selecionadas

### ⚡ Funcionalidades Avançadas
- **Auto-Clear**: Seleções removidas automaticamente após 10 segundos
- **Navegação por Teclado**: Suporte completo com teclas de seta e ESC
- **Design Responsivo**: Layout adaptável para desktop, tablet e mobile
- **Acessibilidade Total**: ARIA labels, screen readers e navegação inclusiva
- **Zero Dependências**: HTML5, CSS3 e JavaScript puro (~15KB total)

### 🎯 Como Usar

1. **Selecionar Sala**: Clique em qualquer sala na lista lateral ou diretamente no mapa SVG
2. **Localização Visual**: A sala selecionada pisca em vermelho no mapa por 5 segundos
3. **Status Atualizado**: Mensagem de status confirma a sala selecionada
4. **Limpar Seleção**: Use o botão "✕ Limpar Seleção" ou pressione ESC
5. **Auto-Clear**: Seleção é automaticamente removida após 10 segundos
6. **Navegação**: Use Tab e setas para navegar entre salas via teclado

## Estrutura do Projeto

```
MapaPhilips/
├── index.html          # Estrutura HTML principal
├── style.css           # Estilos e animações CSS
├── script.js           # Lógica JavaScript
└── README.md           # Documentação
```

## Tecnologias Utilizadas

- **HTML5**: Estrutura semântica com SVG para o mapa
- **CSS3**: Estilos modernos, animações e design responsivo
- **JavaScript ES6+**: Lógica interativa e orientada a objetos
- **SVG**: Gráficos vetoriais escaláveis para o mapa do escritório

## 🏢 Salas Disponíveis

### 🏢 Salas de Reunião (3 salas)
- **Sala de Reunião 1** - Primeira sala de reuniões (verde)
- **Sala de Reunião 2** - Segunda sala de reuniões (verde)  
- **Sala de Reunião 3** - Terceira sala de reuniões (verde)

### 💼 Escritórios (2 salas)
- **Escritório Gerência** - Sala da gerência (laranja)
- **Escritório Diretoria** - Sala da diretoria (laranja)

### 🏛️ Áreas Comuns (3 áreas)
- **Recepção** - Área de recepção principal (azul)
- **Copa** - Área de alimentação e descanso (azul)
- **Área de Descanso** - Espaço de relaxamento (azul)

### 🔧 Facilidades (3 locais)
- **Banheiro Masculino** - Instalações sanitárias masculinas (roxo)
- **Banheiro Feminino** - Instalações sanitárias femininas (roxo)
- **Almoxarifado** - Depósito de materiais (roxo)

## 🎨 Design e Interface

### 📱 Layout Responsivo
- **Desktop (>1024px)**: Layout horizontal com sidebar à esquerda e mapa à direita
- **Tablet (768-1024px)**: Layout vertical otimizado com ajustes de espaçamento
- **Mobile (<768px)**: Layout empilhado com mapa prioritário no topo

### 🎨 Esquema de Cores
- **🟢 Salas de Reunião**: Verde claro (`#f0f8e8`) com bordas verdes
- **🟠 Escritórios**: Laranja claro (`#f8f0e8`) com bordas laranjas
- **🔵 Áreas Comuns**: Azul claro (`#e8f0f8`) com bordas azuis  
- **🟣 Facilidades**: Rosa claro (`#f8e8f0`) com bordas roxas
- **🔴 Seleção Ativa**: Vermelho intenso com animação de piscar

### ✨ Animações e Efeitos
- **Piscar**: Animação de 5 segundos com 5 ciclos de piscar vermelho
- **Hover**: Efeitos sutis ao passar o mouse sobre salas e botões
- **Transições**: Animações suaves de 0.3s para mudanças de estado
- **Responsivo**: Animações desabilitadas se `prefers-reduced-motion`

## ♿ Recursos de Acessibilidade

### 🔊 Suporte a Screen Readers
- **ARIA Labels**: Cada sala possui descrição completa e informativa
- **Estados ARIA**: `aria-pressed` indica salas selecionadas
- **Live Regions**: Anúncios automáticos de mudanças de estado
- **Roles Semânticos**: Elementos com papéis apropriados (button, img, etc.)

### ⌨️ Navegação por Teclado
- **Tab Navigation**: Navegação sequencial entre todos elementos interativos
- **Arrow Keys**: Movimento entre salas usando setas direcionais
- **Enter/Space**: Ativação de salas e botões
- **ESC Key**: Limpar seleção atual rapidamente

### 🎯 Adaptações Visuais
- **Alto Contraste**: Suporte automático para `prefers-contrast: high`
- **Movimento Reduzido**: Desabilita animações para `prefers-reduced-motion`
- **Focus Indicators**: Contornos visuais claros para elementos focados
- **Estados Visuais**: Feedback claro para todas interações

## Como Executar

### 🚀 Desenvolvimento Local

```bash
# Clone o repositório
git clone https://github.com/BobEditorDev/MapaPhilips.git

# Entre no diretório
cd MapaPhilips

# Inicie um servidor HTTP simples
python3 -m http.server 8000

# Ou use Node.js
npx http-server -p 8000

# Acesse no navegador
http://localhost:8000
```

### 🌐 Deploy em Produção
Hospede os arquivos estáticos em qualquer servidor web:
- **GitHub Pages**: Configuração automática para repositórios públicos
- **Netlify**: Arraste e solte a pasta do projeto
- **Vercel**: Deploy automático via GitHub
- **Apache/Nginx**: Copie os arquivos para o diretório web

## Estrutura do Código

### 📁 HTML (index.html)
- Estrutura semântica com elementos acessíveis
- SVG embutido para máxima performance
- Meta tags para responsividade

### 🎨 CSS (style.css)
- Reset CSS para consistência
- Grid layout responsivo
- Animações CSS puras
- Media queries para diferentes dispositivos
- Suporte a preferências de acessibilidade

### ⚡ JavaScript (script.js)
- Classe `OfficeMap` orientada a objetos
- Event handling robusto
- Gerenciamento de estado
- Funções de acessibilidade
- Debounced resize handling

## Personalização

### 🏗️ Modificar o Mapa
1. Edite o SVG no `index.html`
2. Adicione novos elementos `<g>` com `id` únicos
3. Atualize a lista de salas no HTML
4. Adicione mapeamento no JavaScript (`getRoomDisplayName`)

### 🎨 Customizar Estilos
1. Modifique as cores das salas no CSS
2. Ajuste a animação de piscar
3. Personalize o layout responsivo
4. Altere tipografia e spacing

## 📊 Especificações Técnicas

### 🏗️ Arquitetura
- **Frontend**: HTML5 semântico + CSS3 moderno + JavaScript ES6+
- **Design Pattern**: Orientação a objetos com classe `OfficeMap`
- **Responsivo**: CSS Grid + Flexbox com breakpoints mobile-first
- **Performance**: ~15KB total, carregamento <50ms

### 🔧 Compatibilidade
- **✅ Chrome 60+** (Testado e validado)
- **✅ Firefox 55+** (Suporte completo)
- **✅ Safari 12+** (iOS e macOS)
- **✅ Edge 79+** (Chromium-based)
- **✅ Dispositivos Móveis** (iOS Safari 12+, Android Chrome 60+)

### ⚡ Características Técnicas
- **Zero Dependências**: Sem bibliotecas externas ou frameworks
- **SVG Otimizado**: Gráficos vetoriais escaláveis de alta qualidade
- **CSS Eficiente**: Animações com aceleração de hardware
- **JavaScript Modular**: Código limpo e bem documentado
- **Acessível**: WCAG 2.1 AA compliant

## Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para detalhes.

## Autor

Desenvolvido para Philips com foco em usabilidade, acessibilidade e performance.
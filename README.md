# Mapa Interativo do Escritório - Philips

Uma aplicação web interativa de página única que apresenta o mapa do escritório com funcionalidade de localização de salas.

## Funcionalidades

### ✨ Principais Características

- **Mapa Interativo**: Visualização SVG do layout do escritório com salas identificadas
- **Lista de Salas Organizada**: Sidebar com salas categorizadas por tipo (Reunião, Escritórios, Áreas Comuns, Facilidades)
- **Interação Dupla**: Clique nas salas da lista OU diretamente no mapa
- **Efeito Visual**: Salas selecionadas piscam no mapa para fácil localização
- **Design Responsivo**: Interface adaptável para desktop, tablet e mobile
- **Acessibilidade Completa**: Suporte a leitores de tela e navegação por teclado
- **Sem Dependências**: Desenvolvido com HTML5, CSS3 e JavaScript puro

### 🎯 Como Usar

1. **Selecionar Sala**: Clique em qualquer sala na lista lateral ou diretamente no mapa
2. **Localizar Visualmente**: A sala selecionada irá piscar no mapa em vermelho
3. **Limpar Seleção**: Use o botão "Limpar Seleção" ou a tecla ESC
4. **Navegação por Teclado**: Use Tab para navegar e setas para mover entre salas
5. **Auto-limpeza**: Seleções são automaticamente removidas após 10 segundos

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

## Salas Disponíveis

### 🏢 Salas de Reunião
- Sala de Reunião 1
- Sala de Reunião 2  
- Sala de Reunião 3

### 💼 Escritórios
- Escritório Gerência
- Escritório Diretoria

### 🏛️ Áreas Comuns
- Recepção
- Copa
- Área de Descanso

### 🔧 Facilidades
- Banheiro Masculino
- Banheiro Feminino
- Almoxarifado

## Recursos de Acessibilidade

- **ARIA Labels**: Descrições completas para leitores de tela
- **Navegação por Teclado**: Suporte completo a Tab, Enter, ESC e setas
- **Alto Contraste**: Adaptação automática para modo de alto contraste
- **Movimento Reduzido**: Suporte a `prefers-reduced-motion`
- **Anúncios Acessíveis**: Feedback auditivo para seleções de sala

## Design Responsivo

### 📱 Breakpoints
- **Desktop**: `> 1024px` - Layout horizontal com sidebar
- **Tablet**: `768px - 1024px` - Layout vertical otimizado
- **Mobile**: `< 768px` - Interface empilhada, map prioritário

### 🎨 Características Visuais
- **Cores Diferenciadas**: Cada tipo de sala tem sua cor
- **Animação de Piscar**: Efeito visual marcante para localização
- **Hover Effects**: Feedback visual ao passar o mouse
- **Estados Visuais**: Indicação clara de seleção ativa

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
npx http-server

# Acesse no navegador
http://localhost:8000
```

### 🌐 Deploy
Simplesmente hospede os arquivos em qualquer servidor web estático:
- GitHub Pages
- Netlify
- Vercel
- Apache/Nginx

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

## Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ iOS Safari 12+
- ✅ Android Chrome 60+

## Performance

- **Carregamento Rápido**: ~15KB total (HTML+CSS+JS)
- **Zero Dependências**: Sem bibliotecas externas
- **SVG Otimizado**: Gráficos escaláveis de alta qualidade
- **CSS Eficiente**: Animações hardware-accelerated

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
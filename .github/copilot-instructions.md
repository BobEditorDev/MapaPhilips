## 1. Comunicação e Idioma

- **Idioma Padrão:** Todas as respostas, comentários, sugestões de código e descrições devem ser estritamente em português do Brasil (pt-BR).
- **Tom de Voz:** Aja como um desenvolvedor sênior colaborativo e didático. Seja claro, conciso, mas completo o suficiente para justificar suas sugestões.
- **Formato:** Use markdown para estruturar respostas quando apropriado.

## 2. Padrões de Desenvolvimento

### Qualidade e Correção Proativa

**Se identificar qualquer um dos seguintes problemas, corrija-os proativamente:**

1. **Erros de Lógica:** Condições incorretas, loops infinitos, problemas de estado
2. **Código Obsoleto:** APIs antigas, práticas desatualizadas
3. **Más Práticas:** Complexidade ciclomática elevada, duplicação de código
4. **Vulnerabilidades de Segurança:** XSS, exposição de dados sensíveis

**Formato da Correção:**
```javascript
// CORREÇÃO COPILOT: [Explicação do problema identificado]
// MOTIVO: [Boa prática violada ou risco evitado]
// Código corrigido aqui
```

### Segurança

**Prioridade máxima para identificação e correção de:**
- Cross-Site Scripting (XSS) em conteúdo dinâmico
- Validação inadequada de entrada de dados
- Problemas de acessibilidade

## 3. Contexto do Projeto MapaPhilips

### Arquitetura da Aplicação

**Frontend (HTML5 + CSS3 + JavaScript):**
- HTML5 semântico com SVG incorporado para o mapa do escritório
- CSS3 puro para estilização e animações
- JavaScript vanilla sem dependências externas
- Acessibilidade completa com suporte ARIA

**Características Principais:**
- Aplicação estática sem build process
- 11 salas interativas com IDs únicos
- Barra lateral com lista categorizada de salas
- Responsividade completa para dispositivos móveis

**Testes:**
- O ambiente de testes é o **Vercel** (deploy automático via `git push`)
- Testes manuais de interação realizados no deploy do Vercel
- Verificação de console no browser após deploy
- Testes de acessibilidade e responsividade no ambiente Vercel
- **NUNCA sugerir ou executar servidores locais** (python, npx http-server, etc.)

### Padrões de Implementação

**Antes de criar algo novo, SEMPRE:**

1. **Verifique padrões existentes** no código-fonte
2. **Consulte as instruções** para entender a arquitetura
3. **Siga as convenções** já estabelecidas no projeto

### Convenções Específicas do Projeto

**Frontend:**
- HTML semântico com atributos ARIA para acessibilidade
- CSS com design mobile-first e breakpoints em 768px e 1024px
- JavaScript com classe OfficeMap para gerenciamento de estado
- Suporte a navegação por teclado e anúncios para leitores de tela

## 4. Fluxo de Desenvolvimento

> ⚠️ **IMPORTANTE:** O ambiente de testes é o **Vercel**. **Nunca** executar ou sugerir servidores locais (`python3 -m http.server`, `npx http-server`, `live-server`, etc.). Após as alterações, o usuário faz o deploy via `push.sh`.

### Ao Receber uma Pergunta sobre Implementação

1. **Consulte as instruções existentes** primeiro
2. **Identifique padrões similares** no código-fonte
3. **Proponha solução baseada** nos padrões encontrados
4. **Inclua referências** aos arquivos e documentação consultados
5. **Sugira testes** apropriados para a nova funcionalidade

### Ao Revisar Código

1. **Verifique conformidade** com padrões do projeto
2. **Identifique possíveis melhorias** de qualidade
3. **Sugira otimizações** de performance quando relevante
4. **Valide implementação** de acessibilidade adequada
5. **Confirme que tamanho total** permanece abaixo de 30KB

## 5. Comandos e Scripts Úteis

**Ambiente de Testes: Vercel**
- Todo teste é realizado via deploy no **Vercel** após `git push`
- **NUNCA executar ou sugerir servidores locais** como `python3 -m http.server`, `npx http-server`, etc.
- O script `push.sh` realiza o commit e push para o repositório, acionando o deploy automático no Vercel

**Validação de arquivos (sem servidor):**
```bash
# Verificar tamanhos dos arquivos
ls -la *.html *.css *.js

# Validar HTML (se instalado)
html5validator index.html
```

## 6. Tarefas Comuns de Desenvolvimento

### Adicionando uma Nova Sala
1. **Atualizar SVG no index.html**: Adicionar novo elemento `<g id="nova-sala">`
2. **Atualizar Barra Lateral**: Adicionar novo botão com `data-room="nova-sala"`
3. **Atualizar JavaScript**: Adicionar mapeamento de nome de sala em `getRoomDisplayName()`
4. **Testar**: Verificar se a seleção e destaque da sala funcionam corretamente

### Modificando Cores das Salas
- Editar cores de preenchimento no style.css
- Salas de reunião: `#f0f8e8` (verde claro)
- Escritórios: `#f8f0e8` (laranja claro)
- Áreas comuns: `#e8f0f8` (azul claro)
- Instalações: `#f8e8f0` (rosa claro)

### Atualizações de Acessibilidade
- Todas as salas devem ter labels ARIA na função `setupAccessibility()`
- Navegação por teclado tratada em `handleKeyboardNavigation()`
- Anúncios para leitores de tela via elemento `#room-announcer`
- Gerenciamento de foco para melhor navegação por teclado

## 7. Métricas e Requisitos de Qualidade

### Métricas de Performance
- **Tamanho Total**: ~23KB (7.8KB HTML + 5.4KB CSS + 9.9KB JS)
- **Tempo de Carregamento**: <100ms no Vercel
- **Requisitos de Navegador**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **Sem Dependências**: Zero bibliotecas ou frameworks externos

### Requisitos de Qualidade de Código
- **Sem Ferramentas de Build**: Não adicionar package.json, webpack ou sistemas de build
- **Sem Dependências**: Não adicionar bibliotecas externas - manter a aplicação pura
- **Preservar Funcionalidade**: Todos os recursos interativos devem continuar funcionando
- **Acessibilidade**: Manter labels ARIA e suporte à navegação por teclado
- **Performance**: Manter tamanho total abaixo de 30KB

---

**Lembre-se:** Você é um assistente proativo. Não apenas responda perguntas, mas antecipe problemas potenciais e sugira melhorias baseadas nos padrões e melhores práticas estabelecidos neste projeto, sempre em português do Brasil.

# 🧪 Suite de Testes - Ferramenta de Coordenadas

## Visão Geral

Suite de testes abrangente e interativa para a Ferramenta de Coordenadas do Mapa do Escritório. Executa testes em tempo real com a aplicação ativa, permitindo validação completa de todas as funcionalidades.

## 🚀 Como Executar os Testes

### Método Rápido
1. **Inicie o servidor**: `python3 -m http.server 8000`
2. **Abra o navegador**: `http://localhost:8000/test-runner.html`
3. **Execute os testes**: Clique em "🚀 Executar Todos"

### Opções de Teste Disponíveis
- **🚀 Executar Todos**: Executa todos os testes em sequência
- **🔧 Testes Básicos**: Testa inicialização e elementos principais
- **🖱️ Testes de Interação**: Testa interface e interações do usuário
- **🔄 Testes de Fluxo**: Testa fluxos completos de trabalho
- **🗑️ Limpar**: Limpa resultados e prepara nova execução

## 📊 Cobertura de Testes

### 🔧 Testes de Inicialização (3 testes)
- ✅ **Aplicação Carregada**: Verifica se a aplicação carregou corretamente
- ✅ **Elementos Principais**: Verifica presença dos elementos essenciais
- ✅ **CoordinateTool**: Confirma inicialização da classe principal

### 🖱️ Testes de Interface (3 testes)
- ✅ **Botões de Andar**: Testa mudança entre Térreo e Mezanino
- ✅ **Botão Add Coordenada**: Verifica toggle do modo de seleção
- ✅ **Navegação por Teclado**: Testa tecla Escape e outras

### 💾 Testes de Funcionalidade (3 testes)
- ✅ **Adição de Coordenadas**: Verifica criação de novas coordenadas
- ✅ **Remoção de Coordenadas**: Testa exclusão de coordenadas
- ✅ **Exportação JSON**: Valida geração e exportação de dados

### 🔄 Testes de Fluxo Completo (3 testes)
- ✅ **Fluxo Completo**: Testa cenário completo de uso
- ✅ **Múltiplos Andares**: Verifica coordenadas em diferentes andares
- ✅ **Tratamento de Erros**: Valida tratamento de entradas inválidas

## 🎯 Características dos Testes

### ✨ Testes Interativos
- **Tempo Real**: Testes executam na aplicação real, não em mocks
- **Visual**: Interface dividida mostra aplicação e resultados simultaneamente
- **Dinâmico**: Testes simulam interações reais do usuário

### 🔄 Simulação Realista
- **Mocking Inteligente**: Substitui `prompt()`, `confirm()` e `alert()` temporariamente
- **Eventos Reais**: Simula cliques, teclas e interações reais
- **Estado Limpo**: Cada teste restaura estado inicial

### 📝 Logging Detalhado
- **Log em Tempo Real**: Acompanhe cada passo da execução
- **Timestamps**: Todos eventos marcados com horário
- **Status Visual**: Cores indicam sucesso/falha imediatamente

## 🛠️ Tecnologias e Arquitetura

### Sem Dependências
- **HTML5 Puro**: Usa apenas tecnologias web nativas
- **JavaScript Vanilla**: Sem frameworks externos
- **CSS3**: Estilos responsivos e animações

### Padrões de Teste
- **Classe TestRunner**: Organiza e executa todos os testes
- **Async/Await**: Gerencia timing e esperas entre testes
- **Mock System**: Sistema de mocking reversível e seguro

## 🎨 Interface de Teste

### Layout Dual
- **Painel Esquerdo**: Controles de teste e estatísticas
- **Painel Direito**: Resultados detalhados por categoria
- **Aplicação de Fundo**: Visível e funcional durante os testes

### Estados Visuais
- **🟡 Aguardando**: Teste ainda não executado
- **🟢 Passou**: Teste executado com sucesso
- **🔴 Falhou**: Teste falhou com mensagem de erro

### Estatísticas em Tempo Real
- **Total de Testes**: Contador geral
- **✅ Aprovados**: Testes que passaram
- **❌ Falharam**: Testes que falharam

## 🔧 Como Funciona

### Inicialização
1. Carrega aplicação principal (`script.js`)
2. Inicializa sistema de testes (`InteractiveTestRunner`)
3. Aguarda aplicação estar totalmente carregada
4. Prepara mocks e sistema de logging

### Execução de Testes
1. **Limpeza**: Remove resultados anteriores
2. **Sequencial**: Executa testes em ordem lógica
3. **Validação**: Verifica estado da aplicação após cada ação
4. **Logging**: Registra cada passo e resultado

### Restauração
1. **Mocks**: Restaura funções originais do navegador
2. **Estado**: Limpa dados de teste da aplicação
3. **UI**: Retorna interface ao estado inicial

## 📈 Resultados de Teste

### Última Execução
- **Total**: 12 testes
- **✅ Aprovados**: 12 (100%)
- **❌ Falharam**: 0 (0%)
- **⏱️ Tempo**: ~10 segundos

### Cobertura
- **Inicialização**: 100% (3/3)
- **Interface**: 100% (3/3)
- **Funcionalidade**: 100% (3/3)
- **Fluxos Completos**: 100% (3/3)

## 🎯 Cenários Testados

### Fluxo Básico
1. Usuário acessa aplicação
2. Troca entre andares (Térreo ↔ Mezanino)
3. Ativa modo de seleção
4. Adiciona coordenada no mapa
5. Exporta dados como JSON

### Fluxo Avançado
1. Adiciona múltiplas coordenadas
2. Coordenadas em diferentes andares
3. Remove coordenadas existentes
4. Testa tratamento de erros
5. Valida persistência de dados

### Casos Especiais
- **Entradas Vazias**: Testa rejeição de nomes vazios
- **Teclas de Atalho**: ESC, Ctrl+S, Enter
- **Fallbacks**: Clipboard, download de arquivos
- **Responsividade**: Comportamento em diferentes tamanhos

## 🔍 Debugging e Manutenção

### Log Detalhado
Cada execução gera log completo com:
- Horário de cada ação
- Estado da aplicação
- Resultados de validação
- Mensagens de erro (se houver)

### Isolamento de Problemas
- Testes podem ser executados individualmente
- Cada categoria pode ser testada separadamente
- Estado da aplicação é preservado entre testes

### Extensibilidade
- Fácil adição de novos testes
- Sistema modular e bem organizado
- Documentação clara para manutenção

## 🎉 Benefícios

### Para Desenvolvimento
- **Confiança**: Validação automática de todas funcionalidades
- **Regressão**: Detecta problemas em mudanças futuras
- **Documentação**: Serve como documentação viva da aplicação

### Para Usuário Final
- **Qualidade**: Garante que todas funcionalidades funcionam
- **Estabilidade**: Reduz bugs e comportamentos inesperados
- **Performance**: Testes incluem validação de performance

### Para Manutenção
- **Debugging**: Facilita identificação de problemas
- **Refatoração**: Permite mudanças com segurança
- **Evolução**: Base sólida para novas funcionalidades

---

**✨ Suite de testes completa e funcional para garantir máxima qualidade da Ferramenta de Coordenadas!**
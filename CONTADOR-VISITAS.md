# Contador de Visitas Persistente

Implementação de contador de visitas que persiste no servidor usando PostgreSQL (Neon).

## 🚀 Como Funciona

O contador de visitas agora utiliza uma API serverless do Vercel para armazenar os dados de forma persistente em PostgreSQL:

### Arquitetura

1. **Frontend (visit-counter.js)**:
   - Faz requisições para `/api/visits`
   - Mantém fallback para localStorage se API não estiver disponível
   - Conta apenas uma visita por sessão de navegação

2. **Backend (api/visits.js)**:
   - API serverless no Vercel
   - Usa PostgreSQL (Neon) para armazenamento persistente
   - Endpoints GET e POST para ler/incrementar contador
   - Auto-criação de tabela na primeira execução

3. **Fallback Inteligente**:
   - Se API não estiver disponível, usa localStorage
   - Sincronização automática quando API volta a funcionar

### Configuração no Vercel

#### 1. Banco PostgreSQL (Neon)

Banco já configurado:
- **Nome**: `mapa-philips-visits-pg`
- **Provider**: Neon (gratuito)
- **URL Principal**: `postgres://neondb_owner:npg_SOIlyGpPX1K3@ep-calm-cloud-act2p93b-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require`

#### 2. Variáveis de Ambiente no Vercel

Configure as seguintes variáveis no painel Vercel:
```env
DATABASE_URL=postgres://neondb_owner:npg_SOIlyGpPX1K3@ep-calm-cloud-act2p93b-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require
POSTGRES_URL=postgres://neondb_owner:npg_SOIlyGpPX1K3@ep-calm-cloud-act2p93b-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require
```

#### 3. Estrutura da Tabela

A API cria automaticamente a tabela na primeira execução:
```sql
CREATE TABLE IF NOT EXISTS visit_counter (
    id SERIAL PRIMARY KEY,
    key VARCHAR(50) UNIQUE NOT NULL,
    visits INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 4. Deploy

```bash
# Deploy automático após push para branch principal
git push origin main
```

## 📊 Funcionalidades

### ✅ Implementadas

- **Persistência no servidor**: Dados salvos no PostgreSQL
- **Auto-setup**: Tabela criada automaticamente na primeira execução
- **Fallback inteligente**: Funciona mesmo se API estiver offline
- **Contagem por sessão**: Evita múltiplas contagens na mesma visita
- **Indicador visual**: Ícone 🐘 mostra quando está usando PostgreSQL
- **CORS configurado**: Permite requisições do frontend
- **Error handling**: Tratamento robusto de erros
- **Conexão SSL**: Segurança na conexão com o banco

### 🔧 API Endpoints

#### GET `/api/visits`
Retorna o número atual de visitas:
```json
{
  "visits": 1234
}
```

#### POST `/api/visits`
Incrementa e retorna o novo número de visitas:
```json
{
  "visits": 1235,
  "success": true
}
```

## 🧪 Como Testar Localmente

1. **Instalar Vercel CLI**:
```bash
npm i -g vercel
```

2. **Executar ambiente de desenvolvimento**:
```bash
vercel dev
```

3. **Testar API**:
```bash
# Obter visitas
curl http://localhost:3000/api/visits

# Incrementar visita
curl -X POST http://localhost:3000/api/visits
```

## 📱 Indicadores Visuais

- **Sem ícone**: Usando localStorage (fallback)
- **🐘**: Usando PostgreSQL no servidor (persistente)

## 🔍 Debug e Monitoramento

Use o console do navegador para ver logs:
```javascript
// Verificar status da API
await window.visitCounter.checkApiStatus();

// Forçar nova visita (para testes)
await window.visitCounter.forceNewVisit();

// Reset local (não afeta servidor)
await window.visitCounter.resetCounter();
```

## 💾 Vantagens do PostgreSQL vs KV

- **Estrutura Relacional**: Permite consultas mais complexas
- **Custo Zero**: Neon tem tier gratuito generoso
- **ACID Compliance**: Garantias de integridade dos dados
- **Escalabilidade**: Mais opções de otimização
- **Analytics**: Base para implementar relatórios detalhados

## 💡 Próximos Passos

Para melhorar ainda mais, poderíamos implementar:
- Analytics detalhadas por página
- Histórico temporal de visitas
- Contador por região geográfica
- Dashboard administrativo com gráficos
- Rate limiting avançado

---

**Note**: O contador mantém compatibilidade total com a versão anterior. Se a API não estiver disponível, funciona normalmente com localStorage.
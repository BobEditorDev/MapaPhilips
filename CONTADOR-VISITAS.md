# Contador de Visitas Persistente

Implementação de contador de visitas que persiste no servidor usando Vercel KV.

## 🚀 Como Funciona

O contador de visitas agora utiliza uma API serverless do Vercel para armazenar os dados de forma persistente:

### Arquitetura

1. **Frontend (visit-counter.js)**:
   - Faz requisições para `/api/visits`
   - Mantém fallback para localStorage se API não estiver disponível
   - Conta apenas uma visita por sessão de navegação

2. **Backend (api/visits.js)**:
   - API serverless no Vercel
   - Usa Vercel KV (Redis) para armazenamento
   - Endpoints GET e POST para ler/incrementar contador

3. **Fallback Inteligente**:
   - Se API não estiver disponível, usa localStorage
   - Sincronização automática quando API volta a funcionar

### Configuração no Vercel

#### 1. Instalar Vercel KV

No seu projeto Vercel:
1. Vá para **Storage** → **Create Database** → **KV**
2. Configure nome: `mapa-philips-visits-kv`
3. As variáveis de ambiente serão criadas automaticamente

#### 2. Variáveis de Ambiente

O Vercel KV adiciona automaticamente:
```env
KV_REST_API_URL=https://...
KV_REST_API_TOKEN=...
```

#### 3. Deploy

```bash
# Deploy automático após push para branch principal
git push origin main
```

## 📊 Funcionalidades

### ✅ Implementadas

- **Persistência no servidor**: Dados salvos no Vercel KV
- **Fallback inteligente**: Funciona mesmo se API estiver offline
- **Contagem por sessão**: Evita múltiplas contagens na mesma visita
- **Indicador visual**: Ícone 🌐 mostra quando está usando servidor
- **CORS configurado**: Permite requisições do frontend
- **Error handling**: Tratamento robusto de erros

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
- **🌐**: Usando API do servidor (persistente)

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

## 💡 Próximos Passos

Para melhorar ainda mais, poderíamos implementar:
- Analytics detalhadas (páginas mais visitadas)
- Contador por região geográfica
- Dashboard administrativo
- Rate limiting para evitar spam

---

**Note**: O contador mantém compatibilidade com a versão anterior. Se a API não estiver disponível, funciona normalmente com localStorage.
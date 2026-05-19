/**
 * Sistema de Contador de Visitas Persistente com PostgreSQL (Neon)
 * Implementa contador que persiste no servidor e distingue sessões
 */

class VisitCounter {
    constructor() {
        this.apiEndpoint = '/api/visits';
        this.fallbackMode = false;
        this.init();
    }

    /**
     * Inicializar contador de visitas
     */
    async init() {
        await this.incrementVisitCountIntelligent();
        await this.displayVisitCount();
        console.log('Visit Counter (PostgreSQL) initialized successfully');
    }

    /**
     * Incrementar contador de visitas de forma inteligente
     * Conta apenas uma vez por sessão de navegação
     */
    async incrementVisitCountIntelligent() {
        const sessionKey = 'mapa-bionexo-tasy-session-counted';
        const hasCountedThisSession = sessionStorage.getItem(sessionKey);
        
        // Só incrementa se não contou nesta sessão ainda
        if (!hasCountedThisSession) {
            try {
                // Tentar usar API do PostgreSQL primeiro
                const response = await fetch(this.apiEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(`Nova visita registrada no PostgreSQL: ${data.visits}`);
                    
                    // Marcar que já contou nesta sessão
                    sessionStorage.setItem(sessionKey, 'true');
                    
                    // Sincronizar com localStorage para compatibilidade
                    localStorage.setItem('mapa-bionexo-tasy-visits', data.visits.toString());
                } else {
                    throw new Error('API PostgreSQL não disponível');
                }
            } catch (error) {
                console.log('API PostgreSQL não disponível, usando fallback localStorage:', error.message);
                this.fallbackMode = true;
                this.incrementVisitCountFallback();
                
                // Marcar que já contou nesta sessão mesmo no fallback
                sessionStorage.setItem(sessionKey, 'true');
            }
        } else {
            console.log('Navegação interna - visita já contabilizada nesta sessão');
        }
    }

    /**
     * Incrementar contador usando fallback localStorage
     */
    incrementVisitCountFallback() {
        let visits = this.getVisitCountFallback();
        visits++;
        localStorage.setItem('mapa-bionexo-tasy-visits', visits.toString());
        console.log(`Nova visita registrada localmente (fallback): ${visits}`);
    }

    /**
     * Obter número atual de visitas do servidor
     * @returns {Promise<number>} - Número de visitas
     */
    async getVisitCount() {
        try {
            if (!this.fallbackMode) {
                const response = await fetch(this.apiEndpoint, {
                    method: 'GET'
                });

                if (response.ok) {
                    const data = await response.json();
                    return data.visits;
                } else {
                    throw new Error('API PostgreSQL não disponível');
                }
            }
        } catch (error) {
            console.log('Usando fallback localStorage para obter visitas:', error.message);
            this.fallbackMode = true;
        }

        return this.getVisitCountFallback();
    }

    /**
     * Obter número atual de visitas do localStorage (fallback)
     * @returns {number} - Número de visitas
     */
    getVisitCountFallback() {
        const visits = localStorage.getItem('mapa-bionexo-tasy-visits');
        return visits ? parseInt(visits, 10) : 0;
    }

    /**
     * Exibir contador de visitas no footer
     */
    async displayVisitCount() {
        const footer = document.querySelector('.global-footer .footer-content');
        if (footer) {
            const visits = await this.getVisitCount();
            const visitorText = visits === 1 ? 'visita' : 'visitas';
            
            // Remover contador existente se houver (para atualização)
            const existingCounter = footer.querySelector('.visit-counter');
            if (existingCounter) {
                existingCounter.remove();
            }
            
            // Adicionar contador ao footer
            const visitCounterSpan = document.createElement('span');
            visitCounterSpan.className = 'visit-counter';
            
            // Adicionar indicador PostgreSQL se estiver usando servidor ou fallback
            const sourceIndicator = this.fallbackMode ? '' : ' 🐘';
            visitCounterSpan.innerHTML = ` • <span class="visit-number">${visits}</span> ${visitorText}${sourceIndicator}`;
            
            footer.appendChild(visitCounterSpan);
        }
    }

    /**
     * Resetar contador e sessão (para fins de debug/teste)
     */
    async resetCounter() {
        try {
            // Tentar resetar no servidor (se API estiver disponível)
            if (!this.fallbackMode) {
                // Como não temos endpoint de reset, vamos só limpar local
                console.log('Reset do servidor PostgreSQL não implementado - apenas local');
            }
        } catch (error) {
            console.log('Resetando apenas localmente:', error.message);
        }

        // Limpar armazenamento local
        localStorage.removeItem('mapa-bionexo-tasy-visits');
        sessionStorage.removeItem('mapa-bionexo-tasy-session-counted');
        console.log('Visit counter and session reset locally');
    }

    /**
     * Forçar nova contagem (útil para testes)
     */
    async forceNewVisit() {
        sessionStorage.removeItem('mapa-bionexo-tasy-session-counted');
        await this.incrementVisitCountIntelligent();
        await this.displayVisitCount();
        console.log('Forced new visit count');
    }

    /**
     * Verificar status da conexão com API PostgreSQL
     */
    async checkApiStatus() {
        try {
            const response = await fetch(this.apiEndpoint, {
                method: 'GET'
            });
            return response.ok;
        } catch (error) {
            return false;
        }
    }
}

// Inicializar quando DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    // Aguardar um pouco para garantir que outros scripts tenham carregado
    setTimeout(async () => {
        window.visitCounter = new VisitCounter();
    }, 100);
});

// Exportar para fins de teste
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VisitCounter;
}
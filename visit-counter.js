/**
 * Sistema de Contador de Visitas Inteligente
 * Implementa contador que distingue sessões e evita contagem múltipla
 */

class VisitCounter {
    constructor() {
        this.init();
    }

    /**
     * Inicializar contador de visitas
     */
    init() {
        this.incrementVisitCountIntelligent();
        this.displayVisitCount();
        console.log('Visit Counter initialized successfully');
    }

    /**
     * Incrementar contador de visitas de forma inteligente
     * Conta apenas uma vez por sessão de navegação
     */
    incrementVisitCountIntelligent() {
        const sessionKey = 'mapa-philips-session-counted';
        const hasCountedThisSession = sessionStorage.getItem(sessionKey);
        
        // Só incrementa se não contou nesta sessão ainda
        if (!hasCountedThisSession) {
            let visits = this.getVisitCount();
            visits++;
            localStorage.setItem('mapa-philips-visits', visits.toString());
            
            // Marcar que já contou nesta sessão
            sessionStorage.setItem(sessionKey, 'true');
            
            console.log(`Nova visita registrada: ${visits}`);
        } else {
            console.log('Navegação interna - visita já contabilizada nesta sessão');
        }
    }

    /**
     * Obter número atual de visitas
     * @returns {number} - Número de visitas
     */
    getVisitCount() {
        const visits = localStorage.getItem('mapa-philips-visits');
        return visits ? parseInt(visits, 10) : 0;
    }

    /**
     * Exibir contador de visitas no footer
     */
    displayVisitCount() {
        const footer = document.querySelector('.global-footer .footer-content');
        if (footer) {
            const visits = this.getVisitCount();
            const visitorText = visits === 1 ? 'visita' : 'visitas';
            
            // Remover contador existente se houver (para atualização)
            const existingCounter = footer.querySelector('.visit-counter');
            if (existingCounter) {
                existingCounter.remove();
            }
            
            // Adicionar contador ao footer
            const visitCounterSpan = document.createElement('span');
            visitCounterSpan.className = 'visit-counter';
            visitCounterSpan.innerHTML = ` • <span class="visit-number">${visits}</span> ${visitorText}`;
            
            footer.appendChild(visitCounterSpan);
        }
    }

    /**
     * Resetar contador e sessão (para fins de debug/teste)
     */
    resetCounter() {
        localStorage.removeItem('mapa-philips-visits');
        sessionStorage.removeItem('mapa-philips-session-counted');
        console.log('Visit counter and session reset');
    }

    /**
     * Forçar nova contagem (útil para testes)
     */
    forceNewVisit() {
        sessionStorage.removeItem('mapa-philips-session-counted');
        this.incrementVisitCountIntelligent();
        this.displayVisitCount();
        console.log('Forced new visit count');
    }
}

// Inicializar quando DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    // Aguardar um pouco para garantir que outros scripts tenham carregado
    setTimeout(() => {
        window.visitCounter = new VisitCounter();
    }, 100);
});

// Exportar para fins de teste
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VisitCounter;
}
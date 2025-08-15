/**
 * Sistema de Contador de Visitas
 * Implementa contador simples usando localStorage
 */

class VisitCounter {
    constructor() {
        this.init();
    }

    /**
     * Inicializar contador de visitas
     */
    init() {
        this.incrementVisitCount();
        this.displayVisitCount();
        console.log('Visit Counter initialized successfully');
    }

    /**
     * Incrementar contador de visitas
     */
    incrementVisitCount() {
        let visits = this.getVisitCount();
        visits++;
        localStorage.setItem('mapa-philips-visits', visits.toString());
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
            
            // Adicionar contador ao footer existente
            const visitCounterSpan = document.createElement('span');
            visitCounterSpan.className = 'visit-counter';
            visitCounterSpan.innerHTML = ` • <span class="visit-number">${visits}</span> ${visitorText}`;
            
            footer.appendChild(visitCounterSpan);
        }
    }

    /**
     * Resetar contador (para fins de debug/teste)
     */
    resetCounter() {
        localStorage.removeItem('mapa-philips-visits');
        console.log('Visit counter reset');
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
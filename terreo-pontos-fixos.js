/**
 * Fixed Landmarks for Térreo Floor Plan
 * Displays permanent reference points on the floor plan with custom emojis and tooltips
 */

class TerreoLandmarks {
    constructor() {
        // Pontos de referência fixos com coordenadas exatas fornecidas pelo usuário
        this.landmarks = [
            { "nome": "ESCADA", "emoji": "🪜", "coordenadas": { "x": 3159, "y": 3604 } },
            { "nome": "ESCADA", "emoji": "🪜", "coordenadas": { "x": 1872, "y": 1693 } },
            { "nome": "ESCADA", "emoji": "🪜", "coordenadas": { "x": 5484, "y": 3713 } },
            { "nome": "ELEVADOR", "emoji": "🛗", "coordenadas": { "x": 2200, "y": 4033 } },
            { "nome": "MAQUINA DE CAFÉ", "emoji": "☕", "coordenadas": { "x": 5624, "y": 4431 } },
            { "nome": "MAQUINA DE CAFÉ", "emoji": "☕", "coordenadas": { "x": 2052, "y": 1552 } },
            { "nome": "MAQUINA DE CAFÉ", "emoji": "☕", "coordenadas": { "x": 2044, "y": 921 } },
            { "nome": "GELADEIRAS", "emoji": "❄️", "coordenadas": { "x": 2036, "y": 491 } },
            { "nome": "COZINHA", "emoji": "🍽️", "coordenadas": { "x": 2418, "y": 710 } },
            { "nome": "AMBULATÓRIO", "emoji": "🏥", "coordenadas": { "x": 6444, "y": 367 } },
            { "nome": "DECK", "emoji": "🌳", "coordenadas": { "x": 1919, "y": 117 } },
            { "nome": "CAIXA D'ÁGUA", "emoji": "💧", "coordenadas": { "x": 577, "y": 6483 } },
            { "nome": "LAVANDERIA", "emoji": "👕", "coordenadas": { "x": 5429, "y": 6990 } },
            { "nome": "RECEPÇÃO", "emoji": "👋", "coordenadas": { "x": 4462, "y": 562 } },
            { "nome": "MÁQUINA PONTO", "emoji": "📍", "coordenadas": { "x": 4517, "y": 874 } },
            { "nome": "INFRA", "emoji": "🔧", "coordenadas": { "x": 5039, "y": 218 } },
            { "nome": "CORREDOR LARANJA", "emoji": "🍊", "coordenadas": { "x": 4127, "y": 5039 } }
        ];
        
        this.init();
    }

    /**
     * Initialize the landmarks system
     */
    init() {
        // Wait for the floor plan image to load before setting up landmarks
        const floorPlan = document.getElementById('floor-plan');
        if (floorPlan.complete) {
            this.setupLandmarks();
        } else {
            floorPlan.addEventListener('load', () => this.setupLandmarks());
        }

        // Handle window resize for responsiveness
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    /**
     * Setup all landmarks on the map
     */
    setupLandmarks() {
        this.renderLandmarks();
        this.setupAccessibility();
        console.log(`Terreo Landmarks: ${this.landmarks.length} pontos de referência adicionados`);
    }

    /**
     * Render all landmark markers on the map
     */
    renderLandmarks() {
        const overlay = document.getElementById('rooms-overlay');
        const floorPlan = document.getElementById('floor-plan');
        
        if (!overlay || !floorPlan) {
            console.error('Terreo Landmarks: Overlay ou floor plan não encontrado');
            return;
        }

        // Calculate scale factor: displayed size vs natural size
        const scaleX = floorPlan.offsetWidth / floorPlan.naturalWidth;
        const scaleY = floorPlan.offsetHeight / floorPlan.naturalHeight;

        this.landmarks.forEach((landmark, index) => {
            this.addLandmarkMarker(landmark, index, scaleX, scaleY, overlay);
        });
    }

    /**
     * Add a single landmark marker to the map
     * @param {Object} landmark - Landmark object with nome, emoji, and coordenadas
     * @param {number} index - Index for unique identification
     * @param {number} scaleX - Horizontal scale factor
     * @param {number} scaleY - Vertical scale factor
     * @param {HTMLElement} overlay - Overlay container element
     */
    addLandmarkMarker(landmark, index, scaleX, scaleY, overlay) {
        // Apply scale to coordinates
        const displayX = landmark.coordenadas.x * scaleX;
        const displayY = landmark.coordenadas.y * scaleY;

        // Create landmark marker element
        const marker = document.createElement('div');
        marker.className = 'landmark-marker';
        marker.setAttribute('data-landmark', `${landmark.nome}-${index}`);
        marker.setAttribute('aria-label', `Ponto de referência: ${landmark.nome}`);
        marker.setAttribute('role', 'button');
        marker.setAttribute('tabindex', '0');

        // Position marker (margem direita do emoji na coordenada exata)
        marker.style.left = `${Math.round(displayX)}px`;
        marker.style.top = `${Math.round(displayY)}px`;
        marker.style.transform = 'translate(-220%, -0%)'; // Borda direita na coordenada

        // Add emoji and tooltip content
        marker.innerHTML = `
            <span class="landmark-emoji">${landmark.emoji}</span>
            <div class="landmark-tooltip" id="landmark-tooltip-${landmark.nome}-${index}">
                <strong>${landmark.nome}</strong>
            </div>
        `;

        // Add hover and focus effects with tooltip positioning
        marker.addEventListener('mouseenter', () => {
            marker.classList.add('hovered');
            this.adjustLandmarkTooltipPosition(marker, displayX, displayY);
        });

        marker.addEventListener('mouseleave', () => {
            marker.classList.remove('hovered');
        });

        marker.addEventListener('focus', () => {
            marker.classList.add('focused');
            this.adjustLandmarkTooltipPosition(marker, displayX, displayY);
        });

        marker.addEventListener('blur', () => {
            marker.classList.remove('focused');
        });

        // Add keyboard support
        marker.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.highlightLandmark(marker);
            }
        });

        // Add click support for temporary highlight
        marker.addEventListener('click', () => {
            this.highlightLandmark(marker);
        });

        // Add marker to overlay
        overlay.appendChild(marker);

        console.log(`Landmark "${landmark.nome}" adicionado em (${displayX.toFixed(1)}, ${displayY.toFixed(1)}) - escala original (${landmark.coordenadas.x}, ${landmark.coordenadas.y})`);
    }

    /**
     * Ajusta a posição do tooltip do landmark para não ultrapassar as bordas do mapa
     * @param {HTMLElement} marker - Elemento do marcador
     * @param {number} markerX - Coordenada X do marcador
     * @param {number} markerY - Coordenada Y do marcador
     */
    adjustLandmarkTooltipPosition(marker, markerX, markerY) {
        const tooltip = marker.querySelector('.landmark-tooltip');
        if (!tooltip) return;

        const floorPlan = document.getElementById('floor-plan');
        
        // Calculate position relative to the map
        const relativeX = markerX;
        const relativeY = markerY;
        const mapWidth = floorPlan.offsetWidth;
        const mapHeight = floorPlan.offsetHeight;
        
        // Reset all position classes
        tooltip.classList.remove('top', 'bottom', 'left', 'right');
        
        // Define thresholds (80px from edges for landmarks)
        const threshold = 80;
        
        // Check horizontal position
        if (relativeX < threshold) {
            // Near left edge - show tooltip to the right
            tooltip.classList.add('right');
        } else if (relativeX > mapWidth - threshold) {
            // Near right edge - show tooltip to the left
            tooltip.classList.add('left');
        }
        
        // Check vertical position
        if (relativeY < threshold) {
            // Near top edge - show tooltip below
            tooltip.classList.add('bottom');
        } else if (relativeY > mapHeight - threshold) {
            // Near bottom edge - show tooltip above
            tooltip.classList.add('top');
        }
        
        const landmarkName = marker.getAttribute('data-landmark');
        console.log(`Landmark tooltip positioned for ${landmarkName} at (${relativeX.toFixed(1)}, ${relativeY.toFixed(1)}) - classes: ${tooltip.className}`);
    }

    /**
     * Temporarily highlight a landmark
     * @param {HTMLElement} marker - The marker element to highlight
     */
    highlightLandmark(marker) {
        // Remove previous highlights
        document.querySelectorAll('.landmark-marker.highlighted').forEach(m => {
            m.classList.remove('highlighted');
        });

        // Add highlight to current marker
        marker.classList.add('highlighted');

        // Remove highlight after 3 seconds
        setTimeout(() => {
            marker.classList.remove('highlighted');
        }, 3000);

        // Announce to screen readers
        const landmarkName = marker.getAttribute('aria-label');
        this.announceToScreenReader(`${landmarkName} selecionado`);
    }

    /**
     * Clear all landmark markers (for regeneration)
     */
    clearLandmarkMarkers() {
        const overlay = document.getElementById('rooms-overlay');
        if (overlay) {
            overlay.querySelectorAll('.landmark-marker').forEach(marker => {
                marker.remove();
            });
        }
    }

    /**
     * Handle window resize for responsive behavior
     */
    handleResize() {
        // Debounce resize handling
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            // Clear and regenerate landmarks with new scale
            this.clearLandmarkMarkers();
            this.renderLandmarks();
        }, 250);
    }

    /**
     * Setup accessibility features
     */
    setupAccessibility() {
        // Add screen reader announcement area if it doesn't exist
        if (!document.getElementById('landmarks-announcer')) {
            const announcer = document.createElement('div');
            announcer.id = 'landmarks-announcer';
            announcer.setAttribute('aria-live', 'polite');
            announcer.setAttribute('aria-atomic', 'true');
            announcer.style.cssText = 'position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden;';
            document.body.appendChild(announcer);
        }

        console.log('Terreo Landmarks: Recursos de acessibilidade configurados');
    }

    /**
     * Announce messages to screen readers
     * @param {string} message - Message to announce
     */
    announceToScreenReader(message) {
        const announcer = document.getElementById('landmarks-announcer');
        if (announcer) {
            announcer.textContent = message;
        }
    }

    /**
     * Get all landmarks data
     * @returns {Array} - Array of landmark objects
     */
    getAllLandmarks() {
        return this.landmarks;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit to ensure the main rooms system is initialized first
    setTimeout(() => {
        window.terreoLandmarks = new TerreoLandmarks();
    }, 100);
});

// Export for testing purposes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TerreoLandmarks;
}
/**
 * Fixed Landmarks for Mezanino Floor Plan
 * Displays permanent reference points on the mezzanine floor plan with custom emojis and tooltips
 */

class MezaninoLandmarks {
    constructor() {
        // Pontos de referência fixos com coordenadas fornecidas pelo usuário
        this.landmarks = [
            { "nome": "ESCADA", "emoji": "🪜", "coordenadas": { "x": 201, "y": 622 } },
            { "nome": "ESCADA", "emoji": "🪜", "coordenadas": { "x": 1504, "y": 2601 } },
            { "nome": "ESCADA", "emoji": "🪜", "coordenadas": { "x": 3808, "y": 2707 } },
            { "nome": "CAFÉ", "emoji": "☕", "coordenadas": { "x": 1749, "y": 3434 } },
            { "nome": "ELEVADOR", "emoji": "🛗", "coordenadas": { "x": 663, "y": 3013 } },
            { "nome": "BANHEIROS", "emoji": "🚻", "coordenadas": { "x": 3733, "y": 5570 } },
            { "nome": "STAND UP", "emoji": "🗣️", "coordenadas": { "x": 2275, "y": 1562 } },
            { "nome": "SAÍDA DE EMERGÊNCIA", "emoji": "🚨", "coordenadas": { "x": 1092, "y": 4300 } },
            { "nome": "SAÍDA DE EMERGÊNCIA", "emoji": "🚨", "coordenadas": { "x": 2288, "y": 4898 } }
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
     * Setup landmarks on the floor plan
     */
    setupLandmarks() {
        const overlay = document.getElementById('landmarks-overlay') || this.createLandmarksOverlay();
        const floorPlan = document.getElementById('floor-plan');
        
        // Clear existing landmarks
        overlay.innerHTML = '';
        
        // Get the displayed dimensions of the image
        const displayedWidth = floorPlan.offsetWidth;
        const displayedHeight = floorPlan.offsetHeight;
        
        // Set overlay to match the exact displayed image size
        overlay.style.width = `${displayedWidth}px`;
        overlay.style.height = `${displayedHeight}px`;
        
        // Calculate scale factor: displayed size vs natural size
        const scaleX = floorPlan.offsetWidth / floorPlan.naturalWidth;
        const scaleY = floorPlan.offsetHeight / floorPlan.naturalHeight;
        
        console.log(`Mezanino Landmarks - Scale X: ${scaleX.toFixed(4)}, Scale Y: ${scaleY.toFixed(4)}`);
        
        // Add each landmark to the overlay
        this.landmarks.forEach(landmark => {
            this.addLandmarkMarker(landmark, scaleX, scaleY, overlay);
        });
    }

    /**
     * Create the landmarks overlay if it doesn't exist
     */
    createLandmarksOverlay() {
        const mapWrapper = document.querySelector('.map-wrapper');
        const overlay = document.createElement('div');
        overlay.id = 'landmarks-overlay';
        overlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            pointer-events: none;
            z-index: 5;
        `;
        mapWrapper.appendChild(overlay);
        return overlay;
    }

    /**
     * Add a landmark marker to the overlay
     */
    addLandmarkMarker(landmark, scaleX, scaleY, overlay) {
        // Apply scale to coordinates
        const displayX = landmark.coordenadas.x * scaleX;
        const displayY = landmark.coordenadas.y * scaleY;
        
        // Create marker element
        const marker = document.createElement('div');
        marker.className = 'landmark-marker';
        marker.setAttribute('data-landmark', landmark.nome);
        
        // Position marker (centered on the point)
        marker.style.cssText = `
            position: absolute;
            left: ${displayX - 12}px;
            top: ${displayY - 12}px;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.9);
            border: 2px solid #007bff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            cursor: help;
            transition: all 0.3s ease;
            pointer-events: auto;
            box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        `;
        
        // Add emoji content
        marker.innerHTML = `
            <span class="landmark-emoji" title="${landmark.nome}">${landmark.emoji}</span>
            <div class="landmark-tooltip">
                <strong>${landmark.nome}</strong><br>
                Mezanino
            </div>
        `;
        
        // Add hover effects
        marker.addEventListener('mouseenter', () => {
            marker.style.transform = 'scale(1.2)';
            marker.style.zIndex = '10';
            const tooltip = marker.querySelector('.landmark-tooltip');
            if (tooltip) {
                tooltip.style.display = 'block';
            }
        });
        
        marker.addEventListener('mouseleave', () => {
            marker.style.transform = 'scale(1)';
            marker.style.zIndex = '5';
            const tooltip = marker.querySelector('.landmark-tooltip');
            if (tooltip) {
                tooltip.style.display = 'none';
            }
        });
        
        // Add marker to overlay
        overlay.appendChild(marker);
        
        console.log(`Added mezanino landmark ${landmark.nome} at scaled coordinates (${displayX.toFixed(1)}, ${displayY.toFixed(1)}) from original (${landmark.coordenadas.x}, ${landmark.coordenadas.y})`);
    }

    /**
     * Handle window resize for responsive behavior
     */
    handleResize() {
        // Debounce resize handling
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            this.setupLandmarks();
        }, 250);
    }

    /**
     * Get all landmarks data
     */
    getAllLandmarks() {
        return this.landmarks;
    }

    /**
     * Show or hide landmarks
     */
    toggleLandmarks(show = true) {
        const overlay = document.getElementById('landmarks-overlay');
        if (overlay) {
            overlay.style.display = show ? 'block' : 'none';
        }
    }
}

// CSS for landmark tooltips (added dynamically)
const landmarkStyles = `
    .landmark-tooltip {
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 12px;
        white-space: nowrap;
        z-index: 1000;
        display: none;
        margin-bottom: 8px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.3);
    }

    .landmark-tooltip::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border: 6px solid transparent;
        border-top-color: rgba(0, 0, 0, 0.9);
    }

    .landmark-marker:hover {
        border-color: #0056b3;
        background: rgba(255, 255, 255, 1);
    }
`;

// Add styles to document
if (!document.getElementById('mezanino-landmarks-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'mezanino-landmarks-styles';
    styleSheet.textContent = landmarkStyles;
    document.head.appendChild(styleSheet);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if we're on a mezanino page
    if (window.location.pathname.includes('mezanino') || 
        document.getElementById('floor-plan')?.src?.includes('mezanino') ||
        document.getElementById('floor-plan')?.src?.includes('Mesanino')) {
        window.mezaninoLandmarks = new MezaninoLandmarks();
    }
});

// Export for testing purposes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MezaninoLandmarks;
}
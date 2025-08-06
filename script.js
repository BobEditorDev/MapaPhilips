/**
 * Interactive Coordinate Addition Tool
 * Allows users to add coordinates to office floor plans and export as JSON
 */

class CoordinateTool {
    constructor() {
        this.coordinates = [];
        this.isSelectionMode = false;
        this.currentFloor = 'terreo';
        this.coordinateCounter = 1;
        this.init();
    }

    /**
     * Initialize the coordinate tool functionality
     */
    init() {
        this.bindEvents();
        this.setupAccessibility();
        this.updateInstructions();
        console.log('Coordinate Tool initialized successfully');
    }

    /**
     * Bind event listeners to controls and map elements
     */
    bindEvents() {
        // Floor selection buttons
        const floorButtons = document.querySelectorAll('.floor-btn');
        floorButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const floor = e.target.getAttribute('data-floor');
                this.switchFloor(floor);
            });
        });

        // Add coordinate button
        const addButton = document.getElementById('add-coordinate-btn');
        addButton.addEventListener('click', () => {
            this.toggleSelectionMode();
        });

        // Save coordinates button
        const saveButton = document.getElementById('save-coordinates-btn');
        saveButton.addEventListener('click', () => {
            this.saveCoordinates();
        });

        // Map click handler
        const floorPlan = document.getElementById('floor-plan');
        floorPlan.addEventListener('click', (e) => {
            if (this.isSelectionMode) {
                this.addCoordinate(e);
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardNavigation(e);
        });

        // Window resize handler
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    /**
     * Switch between floor plans
     * @param {string} floor - The floor to switch to ('terreo' or 'mesanino')
     */
    switchFloor(floor) {
        this.currentFloor = floor;
        
        // Update floor buttons
        document.querySelectorAll('.floor-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-floor="${floor}"]`).classList.add('active');
        
        // Update floor plan image
        const floorPlan = document.getElementById('floor-plan');
        floorPlan.src = `${floor}.png`;
        floorPlan.alt = `Planta Baixa - ${floor === 'terreo' ? 'Térreo' : 'Mezanino'}`;
        
        // Clear existing coordinate markers for this view
        this.updateCoordinateOverlay();
        
        console.log(`Switched to ${floor} floor plan`);
    }

    /**
     * Toggle coordinate selection mode
     */
    toggleSelectionMode() {
        this.isSelectionMode = !this.isSelectionMode;
        
        const addButton = document.getElementById('add-coordinate-btn');
        const floorPlan = document.getElementById('floor-plan');
        
        if (this.isSelectionMode) {
            addButton.classList.add('active');
            addButton.innerHTML = '<span class="btn-icon">✕</span>Cancelar';
            floorPlan.classList.add('selection-mode');
            this.updateInstructions('Clique no mapa para adicionar uma coordenada');
        } else {
            addButton.classList.remove('active');
            addButton.innerHTML = '<span class="btn-icon">+</span>Add Coordenada';
            floorPlan.classList.remove('selection-mode');
            this.updateInstructions('Clique em "Add Coordenada" para ativar o modo de seleção');
        }
        
        console.log(`Selection mode: ${this.isSelectionMode ? 'ON' : 'OFF'}`);
    }

    /**
     * Add a coordinate when user clicks on the map
     * @param {MouseEvent} e - The click event
     */
    addCoordinate(e) {
        const rect = e.target.getBoundingClientRect();
        const x = Math.round(e.clientX - rect.left);
        const y = Math.round(e.clientY - rect.top);
        
        // Prompt for room name
        const roomName = prompt('Digite o nome da sala/localização:');
        if (!roomName || roomName.trim() === '') {
            return; // User cancelled or entered empty name
        }
        
        // Create coordinate object
        const coordinate = {
            id: this.coordinateCounter++,
            nome: roomName.trim(),
            coordenadas: { x, y },
            andar: this.currentFloor
        };
        
        // Add to coordinates array
        this.coordinates.push(coordinate);
        
        // Update UI
        this.updateCoordinatesList();
        this.updateCoordinateOverlay();
        
        // Turn off selection mode
        this.toggleSelectionMode();
        
        console.log('Added coordinate:', coordinate);
    }

    /**
     * Update the coordinates list in the sidebar
     */
    updateCoordinatesList() {
        const container = document.getElementById('coordinates-container');
        
        if (this.coordinates.length === 0) {
            container.innerHTML = '<p class="empty-message">Nenhuma coordenada adicionada ainda.</p>';
            return;
        }
        
        const coordinatesHTML = this.coordinates.map(coord => `
            <div class="coordinate-item" data-id="${coord.id}">
                <div class="coordinate-header">
                    <strong>${coord.nome}</strong>
                    <button class="remove-btn" onclick="window.coordinateTool.removeCoordinate(${coord.id})">&times;</button>
                </div>
                <div class="coordinate-details">
                    <span class="coordinate-position">X: ${coord.coordenadas.x}, Y: ${coord.coordenadas.y}</span>
                    <span class="coordinate-floor">${coord.andar === 'terreo' ? 'Térreo' : 'Mezanino'}</span>
                </div>
            </div>
        `).join('');
        
        container.innerHTML = coordinatesHTML;
    }

    /**
     * Update coordinate markers on the map overlay
     */
    updateCoordinateOverlay() {
        const overlay = document.getElementById('coordinates-overlay');
        const floorPlan = document.getElementById('floor-plan');
        
        // Clear existing markers
        overlay.innerHTML = '';
        
        // Add markers for coordinates on current floor
        const currentFloorCoordinates = this.coordinates.filter(coord => coord.andar === this.currentFloor);
        
        currentFloorCoordinates.forEach(coord => {
            const marker = document.createElement('div');
            marker.className = 'coordinate-marker';
            marker.style.left = `${coord.coordenadas.x}px`;
            marker.style.top = `${coord.coordenadas.y}px`;
            marker.title = `${coord.nome} (${coord.coordenadas.x}, ${coord.coordenadas.y})`;
            marker.innerHTML = `<span class="marker-number">${coord.id}</span>`;
            
            // Add click handler to show details
            marker.addEventListener('click', () => {
                alert(`${coord.nome}\nCoordenadas: (${coord.coordenadas.x}, ${coord.coordenadas.y})\nAndar: ${coord.andar === 'terreo' ? 'Térreo' : 'Mezanino'}`);
            });
            
            overlay.appendChild(marker);
        });
    }

    /**
     * Remove a coordinate
     * @param {number} id - The coordinate ID to remove
     */
    removeCoordinate(id) {
        if (confirm('Tem certeza que deseja remover esta coordenada?')) {
            this.coordinates = this.coordinates.filter(coord => coord.id !== id);
            this.updateCoordinatesList();
            this.updateCoordinateOverlay();
            console.log(`Removed coordinate with ID: ${id}`);
        }
    }

    /**
     * Save coordinates as JSON
     */
    saveCoordinates() {
        if (this.coordinates.length === 0) {
            alert('Nenhuma coordenada para salvar!');
            return;
        }
        
        // Format coordinates according to specification
        const exportData = this.coordinates.map(coord => ({
            nome: coord.nome,
            coordenadas: coord.coordenadas,
            andar: coord.andar
        }));
        
        const jsonString = JSON.stringify(exportData, null, 2);
        
        // Create options for user
        const action = confirm('Coordenadas prontas para salvar!\n\nOK = Copiar para área de transferência\nCancelar = Baixar como arquivo');
        
        if (action) {
            // Copy to clipboard
            this.copyToClipboard(jsonString);
        } else {
            // Download as file
            this.downloadAsFile(jsonString);
        }
    }

    /**
     * Copy JSON to clipboard
     * @param {string} jsonString - The JSON string to copy
     */
    copyToClipboard(jsonString) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(jsonString).then(() => {
                alert('Coordenadas copiadas para a área de transferência!');
            }).catch(err => {
                console.error('Failed to copy to clipboard:', err);
                this.fallbackCopyToClipboard(jsonString);
            });
        } else {
            this.fallbackCopyToClipboard(jsonString);
        }
    }

    /**
     * Fallback method to copy to clipboard
     * @param {string} text - The text to copy
     */
    fallbackCopyToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            const result = document.execCommand('copy');
            if (result) {
                alert('Coordenadas copiadas para a área de transferência!');
            } else {
                throw new Error('Copy command failed');
            }
        } catch (err) {
            console.error('Fallback copy failed:', err);
            alert('Não foi possível copiar automaticamente. O JSON será exibido em uma nova janela.');
            this.showJsonInWindow(text);
        } finally {
            document.body.removeChild(textArea);
        }
    }

    /**
     * Download JSON as file
     * @param {string} jsonString - The JSON string to download
     */
    downloadAsFile(jsonString) {
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `coordenadas-mapa-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        alert('Arquivo de coordenadas baixado!');
    }

    /**
     * Show JSON in a new window as fallback
     * @param {string} jsonString - The JSON string to display
     */
    showJsonInWindow(jsonString) {
        const newWindow = window.open('', '_blank');
        newWindow.document.write(`
            <html>
                <head><title>Coordenadas do Mapa</title></head>
                <body>
                    <h2>Coordenadas do Mapa</h2>
                    <pre style="background: #f5f5f5; padding: 20px; border-radius: 5px;">${jsonString}</pre>
                    <p>Copie o conteúdo acima.</p>
                </body>
            </html>
        `);
    }

    /**
     * Update instruction text
     * @param {string} text - The instruction text to display
     */
    updateInstructions(text = null) {
        const instructionElement = document.getElementById('instruction-text');
        if (text) {
            instructionElement.textContent = text;
        } else {
            instructionElement.textContent = 'Clique em "Add Coordenada" para ativar o modo de seleção';
        }
    }

    /**
     * Handle keyboard navigation
     * @param {KeyboardEvent} e - The keyboard event
     */
    handleKeyboardNavigation(e) {
        // Escape key cancels selection mode
        if (e.key === 'Escape' && this.isSelectionMode) {
            this.toggleSelectionMode();
            return;
        }
        
        // Ctrl+S to save coordinates
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            this.saveCoordinates();
            return;
        }
    }

    /**
     * Setup accessibility features
     */
    setupAccessibility() {
        // Add ARIA labels and roles
        const floorPlan = document.getElementById('floor-plan');
        floorPlan.setAttribute('role', 'img');
        floorPlan.setAttribute('aria-label', 'Planta baixa do escritório - clique para adicionar coordenadas');
        
        // Add keyboard support for map interaction
        floorPlan.setAttribute('tabindex', '0');
        floorPlan.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                if (this.isSelectionMode) {
                    // Center of image as fallback coordinate
                    const rect = floorPlan.getBoundingClientRect();
                    const centerX = Math.round(rect.width / 2);
                    const centerY = Math.round(rect.height / 2);
                    
                    const fakeEvent = {
                        target: floorPlan,
                        clientX: rect.left + centerX,
                        clientY: rect.top + centerY
                    };
                    
                    this.addCoordinate(fakeEvent);
                }
                e.preventDefault();
            }
        });
    }

    /**
     * Handle window resize for responsive behavior
     */
    handleResize() {
        // Debounce resize handling
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            this.updateCoordinateOverlay();
        }, 250);
    }

    /**
     * Get all coordinates
     * @returns {Array} - Array of coordinate objects
     */
    getAllCoordinates() {
        return this.coordinates;
    }

    /**
     * Load coordinates from JSON
     * @param {Array} coordinatesData - Array of coordinate objects to load
     */
    loadCoordinates(coordinatesData) {
        if (Array.isArray(coordinatesData)) {
            this.coordinates = coordinatesData.map((coord, index) => ({
                id: index + 1,
                nome: coord.nome,
                coordenadas: coord.coordenadas,
                andar: coord.andar || 'terreo'
            }));
            
            this.coordinateCounter = this.coordinates.length + 1;
            this.updateCoordinatesList();
            this.updateCoordinateOverlay();
            
            console.log('Loaded coordinates:', this.coordinates);
        }
    }
}

// Initialize the coordinate tool when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.coordinateTool = new CoordinateTool();
});

// Export for testing purposes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CoordinateTool;
}
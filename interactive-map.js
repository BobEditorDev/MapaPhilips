/**
 * Interactive Office Map
 * Displays an interactive office floor plan with clickable room selection
 */

class InteractiveOfficeMap {
    constructor() {
        this.currentFloor = 'terreo';
        this.selectedRoom = null;
        this.selectionTimeout = null;
        this.roomCoordinates = this.initializeRoomCoordinates();
        this.init();
    }

    /**
     * Initialize the interactive office map
     */
    init() {
        this.bindEvents();
        this.setupAccessibility();
        this.updateRoomVisibility();
        this.renderRoomMarkers();
        console.log('Interactive Office Map initialized successfully');
    }

    /**
     * Initialize predefined room coordinates for both floors
     * These coordinates are positioned relative to the floor plan images
     */
    initializeRoomCoordinates() {
        return {
            // Térreo (Ground Floor)
            'sala-reuniao-1': { x: 250, y: 150, floor: 'terreo' },
            'sala-reuniao-2': { x: 400, y: 200, floor: 'terreo' },
            'escritorio-gerencia': { x: 600, y: 180, floor: 'terreo' },
            'recepcao': { x: 150, y: 300, floor: 'terreo' },
            'copa': { x: 500, y: 350, floor: 'terreo' },
            'banheiro-masculino': { x: 700, y: 300, floor: 'terreo' },
            'banheiro-feminino': { x: 750, y: 300, floor: 'terreo' },
            
            // Mezanino (Mezzanine)
            'sala-reuniao-3': { x: 300, y: 120, floor: 'mesanino' },
            'escritorio-diretoria': { x: 500, y: 150, floor: 'mesanino' },
            'area-descanso': { x: 200, y: 250, floor: 'mesanino' },
            'almoxarifado': { x: 650, y: 200, floor: 'mesanino' }
        };
    }

    /**
     * Bind event listeners to UI elements
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

        // Room selection buttons
        const roomButtons = document.querySelectorAll('.room-btn');
        roomButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const roomId = e.target.getAttribute('data-room');
                const roomFloor = e.target.getAttribute('data-floor');
                this.selectRoom(roomId, roomFloor);
            });
        });

        // Clear selection button
        const clearButton = document.getElementById('clear-selection-btn');
        clearButton.addEventListener('click', () => {
            this.clearSelection();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardNavigation(e);
        });

        // Window resize handler
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // Room marker clicks
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('room-marker')) {
                const roomId = e.target.getAttribute('data-room');
                const roomFloor = e.target.getAttribute('data-floor');
                this.selectRoom(roomId, roomFloor);
            }
        });
    }

    /**
     * Switch between floor plans
     * @param {string} floor - The floor to switch to ('terreo' or 'mesanino')
     */
    switchFloor(floor) {
        if (this.currentFloor === floor) return;
        
        this.currentFloor = floor;
        
        // Update floor buttons
        document.querySelectorAll('.floor-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-floor="${floor}"]`).classList.add('active');
        
        // Update floor plan image
        const floorPlan = document.getElementById('floor-plan');
        const imageName = floor === 'terreo' ? 'terreo.png' : 'Mesanino.png';
        floorPlan.src = imageName;
        floorPlan.alt = `Planta Baixa - ${floor === 'terreo' ? 'Térreo' : 'Mezanino'}`;
        
        // Update room visibility and markers
        this.updateRoomVisibility();
        this.renderRoomMarkers();
        
        // Clear any active selection if room is not on current floor
        if (this.selectedRoom && this.roomCoordinates[this.selectedRoom]?.floor !== floor) {
            this.clearSelection();
        }
        
        // Announce floor change
        this.announceToScreenReader(`Andar alterado para ${floor === 'terreo' ? 'Térreo' : 'Mezanino'}`);
        
        console.log(`Switched to ${floor} floor plan`);
    }

    /**
     * Select a room and highlight it on the map
     * @param {string} roomId - The ID of the room to select
     * @param {string} roomFloor - The floor where the room is located
     */
    selectRoom(roomId, roomFloor) {
        // Switch floor if necessary
        if (roomFloor !== this.currentFloor) {
            this.switchFloor(roomFloor);
        }
        
        // Clear previous selection
        this.clearSelection(false);
        
        // Set new selection
        this.selectedRoom = roomId;
        
        // Update UI
        this.updateRoomButtons();
        this.highlightRoomMarker(roomId);
        
        // Get room display name
        const roomName = this.getRoomDisplayName(roomId);
        
        // Update instructions
        this.updateInstructions(`Sala selecionada: ${roomName}`);
        
        // Announce to screen reader
        this.announceToScreenReader(`Sala selecionada: ${roomName}. Localização destacada no mapa.`);
        
        // Auto-clear selection after 10 seconds
        this.selectionTimeout = setTimeout(() => {
            this.clearSelection();
        }, 10000);
        
        console.log(`Room selected: ${roomId}`);
    }

    /**
     * Clear the current room selection
     * @param {boolean} announce - Whether to announce the clearing to screen reader
     */
    clearSelection(announce = true) {
        if (this.selectionTimeout) {
            clearTimeout(this.selectionTimeout);
            this.selectionTimeout = null;
        }
        
        this.selectedRoom = null;
        
        // Update UI
        this.updateRoomButtons();
        this.clearRoomMarkerHighlight();
        this.updateInstructions();
        
        if (announce) {
            this.announceToScreenReader('Seleção de sala removida');
        }
        
        console.log('Room selection cleared');
    }

    /**
     * Update room button states
     */
    updateRoomButtons() {
        const roomButtons = document.querySelectorAll('.room-btn');
        roomButtons.forEach(button => {
            const roomId = button.getAttribute('data-room');
            if (roomId === this.selectedRoom) {
                button.classList.add('active');
                button.setAttribute('aria-pressed', 'true');
            } else {
                button.classList.remove('active');
                button.setAttribute('aria-pressed', 'false');
            }
        });
    }

    /**
     * Update room visibility based on current floor
     */
    updateRoomVisibility() {
        const roomButtons = document.querySelectorAll('.room-btn');
        roomButtons.forEach(button => {
            const roomFloor = button.getAttribute('data-floor');
            if (roomFloor === this.currentFloor) {
                button.classList.remove('hidden');
            } else {
                button.classList.add('hidden');
            }
        });
    }

    /**
     * Render room markers on the current floor plan
     */
    renderRoomMarkers() {
        const markersContainer = document.getElementById('room-markers');
        markersContainer.innerHTML = '';
        
        // Add markers for rooms on current floor
        Object.entries(this.roomCoordinates).forEach(([roomId, data]) => {
            if (data.floor === this.currentFloor) {
                const marker = document.createElement('div');
                marker.className = 'room-marker';
                marker.style.left = `${data.x}px`;
                marker.style.top = `${data.y}px`;
                marker.setAttribute('data-room', roomId);
                marker.setAttribute('data-floor', data.floor);
                marker.title = this.getRoomDisplayName(roomId);
                marker.setAttribute('role', 'button');
                marker.setAttribute('aria-label', `Selecionar ${this.getRoomDisplayName(roomId)}`);
                marker.setAttribute('tabindex', '0');
                
                // Add keyboard support for markers
                marker.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.selectRoom(roomId, data.floor);
                    }
                });
                
                markersContainer.appendChild(marker);
            }
        });
    }

    /**
     * Highlight a specific room marker with blinking animation
     * @param {string} roomId - The ID of the room to highlight
     */
    highlightRoomMarker(roomId) {
        const marker = document.querySelector(`[data-room="${roomId}"].room-marker`);
        if (marker) {
            marker.classList.add('blinking');
            
            // Remove blinking class after animation completes
            setTimeout(() => {
                marker.classList.remove('blinking');
            }, 3000);
        }
    }

    /**
     * Clear room marker highlighting
     */
    clearRoomMarkerHighlight() {
        const markers = document.querySelectorAll('.room-marker');
        markers.forEach(marker => {
            marker.classList.remove('blinking');
        });
    }

    /**
     * Get display name for a room ID
     * @param {string} roomId - The room ID
     * @returns {string} - The display name
     */
    getRoomDisplayName(roomId) {
        const roomNames = {
            'sala-reuniao-1': 'Sala de Reunião 1',
            'sala-reuniao-2': 'Sala de Reunião 2',
            'sala-reuniao-3': 'Sala de Reunião 3',
            'escritorio-gerencia': 'Escritório Gerência',
            'escritorio-diretoria': 'Escritório Diretoria',
            'recepcao': 'Recepção',
            'copa': 'Copa',
            'area-descanso': 'Área de Descanso',
            'banheiro-masculino': 'Banheiro Masculino',
            'banheiro-feminino': 'Banheiro Feminino',
            'almoxarifado': 'Almoxarifado'
        };
        
        return roomNames[roomId] || roomId;
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
            instructionElement.textContent = 'Selecione uma sala para vê-la piscar no mapa';
        }
    }

    /**
     * Announce text to screen readers
     * @param {string} text - The text to announce
     */
    announceToScreenReader(text) {
        const announcer = document.getElementById('room-announcer');
        announcer.textContent = text;
        
        // Clear after a short delay to allow for re-announcement of same text
        setTimeout(() => {
            announcer.textContent = '';
        }, 1000);
    }

    /**
     * Handle keyboard navigation
     * @param {KeyboardEvent} e - The keyboard event
     */
    handleKeyboardNavigation(e) {
        // Escape key clears selection
        if (e.key === 'Escape') {
            this.clearSelection();
            return;
        }
        
        // Arrow key navigation between room buttons
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
            this.handleArrowKeyNavigation(e);
            return;
        }
    }

    /**
     * Handle arrow key navigation between room buttons
     * @param {KeyboardEvent} e - The keyboard event
     */
    handleArrowKeyNavigation(e) {
        const focusedElement = document.activeElement;
        
        if (focusedElement.classList.contains('room-btn')) {
            e.preventDefault();
            
            const visibleRoomButtons = Array.from(document.querySelectorAll('.room-btn:not(.hidden)'));
            const currentIndex = visibleRoomButtons.indexOf(focusedElement);
            
            let nextIndex;
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                nextIndex = (currentIndex + 1) % visibleRoomButtons.length;
            } else {
                nextIndex = (currentIndex - 1 + visibleRoomButtons.length) % visibleRoomButtons.length;
            }
            
            visibleRoomButtons[nextIndex].focus();
        }
    }

    /**
     * Setup accessibility features
     */
    setupAccessibility() {
        // Add ARIA labels to room buttons
        const roomButtons = document.querySelectorAll('.room-btn');
        roomButtons.forEach(button => {
            const roomId = button.getAttribute('data-room');
            const roomName = this.getRoomDisplayName(roomId);
            button.setAttribute('aria-label', `Selecionar ${roomName}`);
            button.setAttribute('role', 'button');
            button.setAttribute('aria-pressed', 'false');
        });
        
        // Add ARIA labels to floor buttons
        const floorButtons = document.querySelectorAll('.floor-btn');
        floorButtons.forEach(button => {
            const floor = button.getAttribute('data-floor');
            const floorName = floor === 'terreo' ? 'Térreo' : 'Mezanino';
            button.setAttribute('aria-label', `Selecionar andar ${floorName}`);
            button.setAttribute('role', 'button');
        });
        
        // Add role and label to map
        const floorPlan = document.getElementById('floor-plan');
        floorPlan.setAttribute('role', 'img');
        floorPlan.setAttribute('aria-label', 'Planta baixa do escritório com salas marcadas');
    }

    /**
     * Handle window resize for responsive behavior
     */
    handleResize() {
        // Debounce resize handling
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            this.renderRoomMarkers();
        }, 250);
    }

    /**
     * Load coordinates from external source (for future use with coordinate tool)
     * @param {Array} coordinatesData - Array of coordinate objects
     */
    loadCoordinates(coordinatesData) {
        if (Array.isArray(coordinatesData)) {
            coordinatesData.forEach(coord => {
                if (coord.nome && coord.coordenadas && coord.andar) {
                    const roomId = this.generateRoomId(coord.nome);
                    this.roomCoordinates[roomId] = {
                        x: coord.coordenadas.x,
                        y: coord.coordenadas.y,
                        floor: coord.andar
                    };
                }
            });
            
            this.renderRoomMarkers();
            console.log('Loaded external coordinates:', coordinatesData);
        }
    }

    /**
     * Generate a room ID from a room name
     * @param {string} roomName - The room name
     * @returns {string} - The generated room ID
     */
    generateRoomId(roomName) {
        return roomName
            .toLowerCase()
            .replace(/[áâãà]/g, 'a')
            .replace(/[éêè]/g, 'e')
            .replace(/[íîì]/g, 'i')
            .replace(/[óôõò]/g, 'o')
            .replace(/[úûù]/g, 'u')
            .replace(/ç/g, 'c')
            .replace(/[^a-z0-9]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
    }

    /**
     * Export current room data as JSON
     * @returns {Object} - Room data object
     */
    exportRoomData() {
        return {
            currentFloor: this.currentFloor,
            selectedRoom: this.selectedRoom,
            roomCoordinates: this.roomCoordinates
        };
    }
}

// Initialize the interactive office map when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.interactiveOfficeMap = new InteractiveOfficeMap();
});

// Export for testing purposes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = InteractiveOfficeMap;
}
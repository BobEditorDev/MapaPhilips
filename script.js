/**
 * Interactive Office Map - Philips
 * Manages room selection and visual feedback for office layout
 */

class OfficeMap {
    constructor() {
        this.selectedRoom = null;
        this.blinkTimeout = null;
        this.clearTimeout = null;
        this.init();
    }

    /**
     * Initialize the office map functionality
     */
    init() {
        this.bindEvents();
        this.setupAccessibility();
        this.updateStatus();
        console.log('Office Map initialized successfully');
    }

    /**
     * Bind event listeners to room buttons and map elements
     */
    bindEvents() {
        // Room button clicks
        const roomButtons = document.querySelectorAll('.room-btn');
        roomButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const roomId = e.target.getAttribute('data-room');
                this.selectRoom(roomId);
            });
        });

        // SVG room clicks
        const roomElements = document.querySelectorAll('.room');
        roomElements.forEach(room => {
            room.addEventListener('click', (e) => {
                const roomId = room.id;
                this.selectRoom(roomId);
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

        // Room keyboard interactions
        roomElements.forEach(room => {
            room.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.selectRoom(room.id);
                }
            });
        });

        // Window resize handler
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    /**
     * Select a room and trigger visual feedback
     * @param {string} roomId - The ID of the room to select
     */
    selectRoom(roomId) {
        if (!roomId) return;

        // Clear any existing selection
        this.clearSelection();

        // Set new selection
        this.selectedRoom = roomId;

        // Update UI
        this.updateRoomButtons();
        this.updateRoomElements();
        this.blinkRoom(roomId);
        this.updateStatus(roomId);
        this.announceSelection(roomId);

        // Set auto-clear timeout
        this.clearTimeout = setTimeout(() => {
            this.clearSelection();
        }, 10000); // 10 seconds

        console.log(`Room selected: ${roomId}`);
    }

    /**
     * Clear current selection
     */
    clearSelection() {
        if (this.selectedRoom) {
            console.log(`Clearing selection: ${this.selectedRoom}`);
        }

        // Clear timeouts
        if (this.blinkTimeout) {
            clearTimeout(this.blinkTimeout);
            this.blinkTimeout = null;
        }
        if (this.clearTimeout) {
            clearTimeout(this.clearTimeout);
            this.clearTimeout = null;
        }

        // Reset selection
        this.selectedRoom = null;

        // Update UI
        this.updateRoomButtons();
        this.updateRoomElements();
        this.updateStatus();
        this.announceSelection(null);
    }

    /**
     * Update room button states
     */
    updateRoomButtons() {
        const roomButtons = document.querySelectorAll('.room-btn');
        roomButtons.forEach(button => {
            const roomId = button.getAttribute('data-room');
            if (roomId === this.selectedRoom) {
                button.classList.add('selected');
                button.setAttribute('aria-pressed', 'true');
            } else {
                button.classList.remove('selected');
                button.setAttribute('aria-pressed', 'false');
            }
        });
    }

    /**
     * Update SVG room element states
     */
    updateRoomElements() {
        const roomElements = document.querySelectorAll('.room');
        roomElements.forEach(room => {
            if (room.id === this.selectedRoom) {
                room.classList.add('selected');
                room.setAttribute('aria-pressed', 'true');
            } else {
                room.classList.remove('selected', 'blinking');
                room.setAttribute('aria-pressed', 'false');
            }
        });
    }

    /**
     * Trigger blinking animation for selected room
     * @param {string} roomId - The ID of the room to blink
     */
    blinkRoom(roomId) {
        const roomElement = document.getElementById(roomId);
        if (!roomElement) return;

        // Add blinking class
        roomElement.classList.add('blinking');

        // Remove blinking after animation completes
        this.blinkTimeout = setTimeout(() => {
            roomElement.classList.remove('blinking');
        }, 5000); // 5 seconds (matches CSS animation duration)
    }

    /**
     * Update status text
     * @param {string} roomId - The currently selected room ID
     */
    updateStatus(roomId = null) {
        const statusElement = document.getElementById('status-text');
        if (roomId) {
            const roomName = this.getRoomDisplayName(roomId);
            statusElement.textContent = `Sala selecionada: ${roomName} - Localize no mapa!`;
        } else {
            statusElement.textContent = 'Selecione uma sala para ver sua localização no mapa';
        }
    }

    /**
     * Get user-friendly room name
     * @param {string} roomId - The room ID
     * @returns {string} - User-friendly room name
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
     * Announce room selection for screen readers
     * @param {string} roomId - The selected room ID (null for clear)
     */
    announceSelection(roomId) {
        const announcer = document.getElementById('room-announcer');
        if (roomId) {
            const roomName = this.getRoomDisplayName(roomId);
            announcer.textContent = `Sala selecionada: ${roomName}. A sala está piscando no mapa.`;
        } else {
            announcer.textContent = 'Seleção de sala removida.';
        }
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

        // Arrow key navigation for room buttons
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
            this.handleArrowNavigation(e);
        }
    }

    /**
     * Handle arrow key navigation between rooms
     * @param {KeyboardEvent} e - The keyboard event
     */
    handleArrowNavigation(e) {
        const focusedElement = document.activeElement;
        
        // Only handle if focused on a room button or SVG room
        if (!focusedElement.classList.contains('room-btn') && !focusedElement.classList.contains('room')) {
            return;
        }

        e.preventDefault();

        let targetElement = null;
        const allRoomElements = [
            ...document.querySelectorAll('.room-btn'),
            ...document.querySelectorAll('.room')
        ];

        const currentIndex = allRoomElements.indexOf(focusedElement);
        
        switch (e.key) {
            case 'ArrowUp':
            case 'ArrowLeft':
                targetElement = allRoomElements[currentIndex - 1] || allRoomElements[allRoomElements.length - 1];
                break;
            case 'ArrowDown':
            case 'ArrowRight':
                targetElement = allRoomElements[currentIndex + 1] || allRoomElements[0];
                break;
        }

        if (targetElement) {
            targetElement.focus();
        }
    }

    /**
     * Setup accessibility features
     */
    setupAccessibility() {
        // Add ARIA labels to room elements
        const roomElements = document.querySelectorAll('.room');
        roomElements.forEach(room => {
            const roomName = this.getRoomDisplayName(room.id);
            room.setAttribute('aria-label', `Selecionar ${roomName}`);
            room.setAttribute('aria-pressed', 'false');
        });

        // Add ARIA pressed state to room buttons
        const roomButtons = document.querySelectorAll('.room-btn');
        roomButtons.forEach(button => {
            button.setAttribute('aria-pressed', 'false');
        });
    }

    /**
     * Handle window resize for responsive behavior
     */
    handleResize() {
        // Debounce resize handling
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            // Re-update room elements if needed
            if (this.selectedRoom) {
                this.updateRoomElements();
            }
        }, 250);
    }

    /**
     * Get current selected room
     * @returns {string|null} - Currently selected room ID
     */
    getSelectedRoom() {
        return this.selectedRoom;
    }

    /**
     * Check if a room is currently selected
     * @param {string} roomId - Room ID to check
     * @returns {boolean} - True if room is selected
     */
    isRoomSelected(roomId) {
        return this.selectedRoom === roomId;
    }

    /**
     * Get all available room IDs
     * @returns {Array<string>} - Array of room IDs
     */
    getAllRoomIds() {
        return Array.from(document.querySelectorAll('.room')).map(room => room.id);
    }
}

// Initialize the office map when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.officeMap = new OfficeMap();
});

// Export for testing purposes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = OfficeMap;
}
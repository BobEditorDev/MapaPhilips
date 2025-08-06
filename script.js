/**
 * Interactive Office Map
 * Handles room selection and highlighting functionality
 */

class OfficeMap {
    constructor() {
        this.currentlySelected = null;
        this.blinkingTimeout = null;
        this.init();
    }

    /**
     * Initialize the office map functionality
     */
    init() {
        this.bindEvents();
        this.setupAccessibility();
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
                this.selectRoom(roomId, e.target);
            });
        });

        // Direct map clicks
        const mapRooms = document.querySelectorAll('.room');
        mapRooms.forEach(room => {
            room.addEventListener('click', (e) => {
                const roomId = room.id;
                const correspondingButton = document.querySelector(`[data-room="${roomId}"]`);
                this.selectRoom(roomId, correspondingButton);
            });
        });

        // Clear selection button
        const clearButton = document.getElementById('clear-selection');
        clearButton.addEventListener('click', () => {
            this.clearSelection();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardNavigation(e);
        });

        // Window resize handler for responsive adjustments
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    /**
     * Select and highlight a room
     * @param {string} roomId - The ID of the room to select
     * @param {HTMLElement} button - The button that was clicked
     */
    selectRoom(roomId, button) {
        // Clear any existing selection
        this.clearSelection();

        // Find the room element in the SVG
        const roomElement = document.getElementById(roomId);
        if (!roomElement) {
            console.warn(`Room with ID "${roomId}" not found`);
            return;
        }

        // Update button state
        if (button) {
            button.classList.add('active');
        }

        // Start blinking animation
        roomElement.classList.add('blinking');
        
        // Update current selection
        this.currentlySelected = {
            roomId: roomId,
            roomElement: roomElement,
            button: button
        };

        // Auto-clear selection after 10 seconds
        this.blinkingTimeout = setTimeout(() => {
            this.clearSelection();
        }, 10000);

        // Announce selection for screen readers
        this.announceSelection(roomId);

        // Scroll room into view if needed
        this.scrollToRoom(roomElement);

        console.log(`Room selected: ${roomId}`);
    }

    /**
     * Clear the current room selection
     */
    clearSelection() {
        if (!this.currentlySelected) return;

        // Remove blinking animation
        this.currentlySelected.roomElement.classList.remove('blinking');

        // Remove active button state
        if (this.currentlySelected.button) {
            this.currentlySelected.button.classList.remove('active');
        }

        // Clear timeout
        if (this.blinkingTimeout) {
            clearTimeout(this.blinkingTimeout);
            this.blinkingTimeout = null;
        }

        // Reset selection
        this.currentlySelected = null;

        console.log('Selection cleared');
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

        // Arrow key navigation through room buttons
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            this.navigateRooms(e.key === 'ArrowDown' ? 1 : -1);
            e.preventDefault();
        }

        // Enter or Space to select focused room
        if (e.key === 'Enter' || e.key === ' ') {
            const focusedButton = document.activeElement;
            if (focusedButton && focusedButton.classList.contains('room-btn')) {
                focusedButton.click();
                e.preventDefault();
            }
        }
    }

    /**
     * Navigate through room buttons with keyboard
     * @param {number} direction - 1 for down, -1 for up
     */
    navigateRooms(direction) {
        const roomButtons = Array.from(document.querySelectorAll('.room-btn'));
        const currentIndex = roomButtons.indexOf(document.activeElement);
        
        if (currentIndex === -1) {
            // No button focused, focus first one
            if (roomButtons.length > 0) {
                roomButtons[0].focus();
            }
            return;
        }

        const nextIndex = currentIndex + direction;
        if (nextIndex >= 0 && nextIndex < roomButtons.length) {
            roomButtons[nextIndex].focus();
        }
    }

    /**
     * Scroll room into view
     * @param {HTMLElement} roomElement - The room element to scroll to
     */
    scrollToRoom(roomElement) {
        const mapContainer = document.querySelector('.map-container');
        const roomRect = roomElement.getBoundingClientRect();
        const containerRect = mapContainer.getBoundingClientRect();

        // Check if room is visible
        if (roomRect.top >= containerRect.top && 
            roomRect.bottom <= containerRect.bottom &&
            roomRect.left >= containerRect.left && 
            roomRect.right <= containerRect.right) {
            return; // Already visible
        }

        // Scroll room into view
        roomElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center'
        });
    }

    /**
     * Announce room selection for accessibility
     * @param {string} roomId - The ID of the selected room
     */
    announceSelection(roomId) {
        // Create or update announcement element
        let announcer = document.getElementById('room-announcer');
        if (!announcer) {
            announcer = document.createElement('div');
            announcer.id = 'room-announcer';
            announcer.setAttribute('aria-live', 'polite');
            announcer.setAttribute('aria-atomic', 'true');
            announcer.style.position = 'absolute';
            announcer.style.left = '-10000px';
            announcer.style.width = '1px';
            announcer.style.height = '1px';
            announcer.style.overflow = 'hidden';
            document.body.appendChild(announcer);
        }

        // Convert room ID to readable name
        const roomName = this.getRoomDisplayName(roomId);
        announcer.textContent = `Sala selecionada: ${roomName}. A sala está piscando no mapa.`;
    }

    /**
     * Convert room ID to display name
     * @param {string} roomId - The room ID
     * @returns {string} - The display name
     */
    getRoomDisplayName(roomId) {
        const roomNames = {
            'recepcao': 'Recepção',
            'sala-reuniao-1': 'Sala de Reunião 1',
            'sala-reuniao-2': 'Sala de Reunião 2',
            'sala-reuniao-3': 'Sala de Reunião 3',
            'escritorio-gerencia': 'Escritório Gerência',
            'escritorio-diretoria': 'Escritório Diretoria',
            'copa': 'Copa',
            'area-descanso': 'Área de Descanso',
            'banheiro-masculino': 'Banheiro Masculino',
            'banheiro-feminino': 'Banheiro Feminino',
            'almoxarifado': 'Almoxarifado'
        };

        return roomNames[roomId] || roomId;
    }

    /**
     * Setup accessibility features
     */
    setupAccessibility() {
        // Add ARIA labels to room elements
        const mapRooms = document.querySelectorAll('.room');
        mapRooms.forEach(room => {
            const roomName = this.getRoomDisplayName(room.id);
            room.setAttribute('role', 'button');
            room.setAttribute('aria-label', `Selecionar ${roomName}`);
            room.setAttribute('tabindex', '0');
        });

        // Add ARIA labels to room buttons
        const roomButtons = document.querySelectorAll('.room-btn');
        roomButtons.forEach(button => {
            const roomId = button.getAttribute('data-room');
            const roomName = this.getRoomDisplayName(roomId);
            button.setAttribute('aria-label', `Localizar ${roomName} no mapa`);
        });
    }

    /**
     * Handle window resize for responsive behavior
     */
    handleResize() {
        // Debounce resize handling
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            // Re-scroll to selected room if any
            if (this.currentlySelected) {
                this.scrollToRoom(this.currentlySelected.roomElement);
            }
        }, 250);
    }

    /**
     * Get current selection status
     * @returns {Object|null} - Current selection or null
     */
    getCurrentSelection() {
        return this.currentlySelected;
    }

    /**
     * Select room by ID (programmatic selection)
     * @param {string} roomId - The room ID to select
     */
    selectRoomById(roomId) {
        const button = document.querySelector(`[data-room="${roomId}"]`);
        if (button) {
            this.selectRoom(roomId, button);
        }
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
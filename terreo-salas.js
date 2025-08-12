/**
 * Interactive Room Location Tool for Térreo
 * Displays room locations on the floor plan and allows room selection
 */

class TerreoRooms {
    constructor() {
        this.rooms = [
            {
                "nome": "TESLA",
                "coordenadas": { "x": 430, "y": 1942 },
                "andar": "terreo"
            },
            {
                "nome": "CURIE",
                "coordenadas": { "x": 430, "y": 3600 },
                "andar": "terreo"
            },
            {
                "nome": "HAWKING",
                "coordenadas": { "x": 945, "y": 1942 },
                "andar": "terreo"
            },
            {
                "nome": "CHAGAS",
                "coordenadas": { "x": 945, "y": 3608 },
                "andar": "terreo"
            },
            {
                "nome": "EINSTEIN",
                "coordenadas": { "x": 4375, "y": 1735 },
                "andar": "terreo"
            },
            {
                "nome": "DARWIN",
                "coordenadas": { "x": 5311, "y": 1744 },
                "andar": "terreo"
            },
            {
                "nome": "TURING",
                "coordenadas": { "x": 4289, "y": 3505 },
                "andar": "terreo"
            },
            {
                "nome": "HOFF",
                "coordenadas": { "x": 3971, "y": 3497 },
                "andar": "terreo"
            },
            {
                "nome": "COOPER",
                "coordenadas": { "x": 3971, "y": 3857 },
                "andar": "terreo"
            },
            {
                "nome": "PASCAL",
                "coordenadas": { "x": 4297, "y": 3857 },
                "andar": "terreo"
            },
            {
                "nome": "LOVELACE",
                "coordenadas": { "x": 6600, "y": 3875 },
                "andar": "terreo"
            },
            {
                "nome": "BABBAGE",
                "coordenadas": { "x": 4753, "y": 4390 },
                "andar": "terreo"
            },
            {
                "nome": "STROUSTROUP",
                "coordenadas": { "x": 4400, "y": 4476 },
                "andar": "terreo"
            },
            {
                "nome": "LERDORF",
                "coordenadas": { "x": 4022, "y": 4545 },
                "andar": "terreo"
            },
            {
                "nome": "CHAMBERLIN",
                "coordenadas": { "x": 3292, "y": 4390 },
                "andar": "terreo"
            },
            {
                "nome": "COHEN",
                "coordenadas": { "x": 3292, "y": 4751 },
                "andar": "terreo"
            },
            {
                "nome": "KAY",
                "coordenadas": { "x": 3653, "y": 4648 },
                "andar": "terreo"
            },
            {
                "nome": "TORVALDS",
                "coordenadas": { "x": 4761, "y": 4751 },
                "andar": "terreo"
            },
            {
                "nome": "HIPOCRATES",
                "coordenadas": { "x": 3971, "y": 5876 },
                "andar": "terreo"
            },
            {
                "nome": "PASTEUR",
                "coordenadas": { "x": 3971, "y": 6169 },
                "andar": "terreo"
            },
            {
                "nome": "FREUD",
                "coordenadas": { "x": 3962, "y": 6504 },
                "andar": "terreo"
            },
            {
                "nome": "GALILEI",
                "coordenadas": { "x": 4632, "y": 2706 },
                "andar": "terreo"
            },
            {
                "nome": "OLSER",
                "coordenadas": { "x": 4667, "y": 3686 },
                "andar": "terreo"
            },
            {
                "nome": "LUTZ",
                "coordenadas": { "x": 3541, "y": 3694 },
                "andar": "terreo"
            },
            {
                "nome": "VIRCHOW",
                "coordenadas": { "x": 6093, "y": 3866 },
                "andar": "terreo"
            }
        ];
        
        this.selectedRoom = null;
        this.filteredRooms = [...this.rooms];
        this.allMarkersVisible = false;
        this.init();
    }

    /**
     * Initialize the room location tool
     */
    init() {
        // Setup components immediately
        this.setup();
    }

    /**
     * Setup all components after image is loaded
     */
    setup() {
        // Wait for image to load to get correct dimensions
        const floorPlan = document.getElementById('floor-plan');
        const overlay = document.getElementById('rooms-overlay');
        
        if (floorPlan.complete) {
            this.setupOverlay();
        } else {
            floorPlan.addEventListener('load', () => this.setupOverlay());
        }
        
        this.renderRoomsList();
        this.bindEvents();
        this.showAllRooms();
    }

    /**
     * Setup overlay dimensions to match the displayed image
     */
    setupOverlay() {
        const floorPlan = document.getElementById('floor-plan');
        const overlay = document.getElementById('rooms-overlay');
        
        // Get the displayed dimensions of the image (95% width, auto height)
        const displayedWidth = floorPlan.offsetWidth;
        const displayedHeight = floorPlan.offsetHeight;
        
        // Set overlay to match the exact displayed image size
        overlay.style.width = `${displayedWidth}px`;
        overlay.style.height = `${displayedHeight}px`;
        
        // Calculate aspect ratio to ensure proper scaling
        const naturalAspectRatio = floorPlan.naturalWidth / floorPlan.naturalHeight;
        const displayedAspectRatio = displayedWidth / displayedHeight;
        
        console.log(`Overlay set to: ${displayedWidth}x${displayedHeight}px`);
        console.log(`Image natural size: ${floorPlan.naturalWidth}x${floorPlan.naturalHeight}px`);
        console.log(`Natural aspect ratio: ${naturalAspectRatio.toFixed(3)}`);
        console.log(`Displayed aspect ratio: ${displayedAspectRatio.toFixed(3)}`);
        console.log(`Scale X: ${(displayedWidth / floorPlan.naturalWidth).toFixed(4)}`);
        console.log(`Scale Y: ${(displayedHeight / floorPlan.naturalHeight).toFixed(4)}`);
    }

    /**
     * Bind event listeners to controls and elements
     */
    bindEvents() {
        // Search input
        const searchInput = document.getElementById('room-search');
        searchInput.addEventListener('input', (e) => {
            this.filterRooms(e.target.value);
        });

        // Map controls
        const showAllBtn = document.getElementById('show-all-btn');
        showAllBtn.addEventListener('click', () => {
            this.showAllRooms();
        });

        const hideAllBtn = document.getElementById('hide-all-btn');
        hideAllBtn.addEventListener('click', () => {
            this.hideAllMarkers();
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
     * Filter rooms based on search query
     * @param {string} query - The search query
     */
    filterRooms(query) {
        const searchTerm = query.toLowerCase().trim();
        
        if (searchTerm === '') {
            this.filteredRooms = [...this.rooms];
        } else {
            this.filteredRooms = this.rooms.filter(room => 
                room.nome.toLowerCase().includes(searchTerm)
            );
        }
        
        this.renderRoomsList();
        
        // Update instructions
        if (this.filteredRooms.length === 0) {
            this.updateInstructions('Nenhuma sala encontrada com esse nome');
        } else if (searchTerm !== '') {
            this.updateInstructions(`${this.filteredRooms.length} sala(s) encontrada(s)`);
        } else {
            this.updateInstructions();
        }
    }

    /**
     * Render the list of rooms in the sidebar
     */
    renderRoomsList() {
        const container = document.getElementById('rooms-container');
        
        if (this.filteredRooms.length === 0) {
            container.innerHTML = '<p class="empty-message">Nenhuma sala encontrada.</p>';
            return;
        }
        
        // Sort rooms alphabetically
        const sortedRooms = [...this.filteredRooms].sort((a, b) => a.nome.localeCompare(b.nome));
        
        const roomsHTML = sortedRooms.map(room => `
            <div class="room-item" data-room="${room.nome}" tabindex="0" role="button" aria-label="Selecionar sala ${room.nome}">
                <div class="room-header">
                    <strong class="room-name">${room.nome}</strong>
                </div>
            </div>
        `).join('');
        
        container.innerHTML = roomsHTML;
        
        // Add click events to room items
        container.querySelectorAll('.room-item').forEach(item => {
            item.addEventListener('click', () => {
                const roomName = item.getAttribute('data-room');
                this.selectRoom(roomName);
            });
            
            // Keyboard support
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const roomName = item.getAttribute('data-room');
                    this.selectRoom(roomName);
                }
            });
        });
    }



    /**
     * Select a room and highlight it on the map
     * @param {string} roomName - The name of the room to select
     */
    selectRoom(roomName) {
        const room = this.rooms.find(r => r.nome === roomName);
        if (!room) {
            console.error('Room not found:', roomName);
            return;
        }
        
        this.selectedRoom = room;
        
        // Update UI
        this.updateRoomSelection();
        this.updateRoomDetails(room);
        this.highlightRoomOnMap(room);
        
        // Update instructions
        this.updateInstructions(`Sala ${roomName} selecionada - localização destacada no mapa`);
        
        console.log('Selected room:', room);
    }

    /**
     * Update visual indication of selected room in the list
     */
    updateRoomSelection() {
        // Remove previous selection
        document.querySelectorAll('.room-item').forEach(item => {
            item.classList.remove('selected');
        });
        
        // Add selection to current room
        if (this.selectedRoom) {
            const selectedItem = document.querySelector(`[data-room="${this.selectedRoom.nome}"]`);
            if (selectedItem) {
                selectedItem.classList.add('selected');
                selectedItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }
    }

    /**
     * Update room details in the sidebar
     * @param {Object} room - The room object
     */
    updateRoomDetails(room) {
        const detailsContainer = document.getElementById('room-details');
        
        detailsContainer.innerHTML = `
            <div class="selected-room-info">
                <h3>${room.nome}</h3>
                <div class="room-location">
                    <strong>Andar:</strong> Térreo
                </div>
                <div class="room-actions">
                    <button class="detail-btn" onclick="terreoRooms.centerOnRoom('${room.nome}')">
                        🎯 Centralizar no Mapa
                    </button>
                </div>
            </div>
        `;
    }

    /**
     * Highlight a specific room on the map
     * @param {Object} room - The room object to highlight
     */
    highlightRoomOnMap(room) {
        this.clearMapMarkers();
        this.addRoomMarker(room, true);
    }

    /**
     * Show all rooms on the map
     */
    showAllRooms() {
        this.clearMapMarkers();
        this.allMarkersVisible = true;
        
        this.rooms.forEach(room => {
            this.addRoomMarker(room, false);
        });
        
        this.updateInstructions(`Mostrando todas as ${this.rooms.length} salas do térreo`);
        console.log('Showing all rooms on map');
    }

    /**
     * Hide all markers from the map
     */
    hideAllMarkers() {
        this.clearMapMarkers();
        this.allMarkersVisible = false;
        this.updateInstructions('Todos os marcadores foram ocultados');
        console.log('All markers hidden');
    }

    /**
     * Add a room marker to the map overlay
     * @param {Object} room - Room object with name and coordinates
     * @param {boolean} isHighlighted - Whether this is the highlighted/selected room
     */
    addRoomMarker(room, isHighlighted = false) {
        const overlay = document.getElementById('rooms-overlay');
        const floorPlan = document.getElementById('floor-plan');
        
        // Calculate scale factor: displayed size vs natural size
        const scaleX = floorPlan.offsetWidth / floorPlan.naturalWidth;
        const scaleY = floorPlan.offsetHeight / floorPlan.naturalHeight;
        
        // Apply scale to coordinates
        const displayX = room.coordenadas.x * scaleX;
        const displayY = room.coordenadas.y * scaleY;
        
        // Create marker element
        const marker = document.createElement('div');
        marker.className = `room-marker ${isHighlighted ? 'highlighted' : ''}`;
        marker.setAttribute('data-room', room.nome);
        
        // Position marker (centrado no ponto)
        marker.style.left = `${displayX - 6}px`;  
        marker.style.top = `${displayY - 6}px`;   
        
        // Add content and tooltip
        marker.innerHTML = `
            <span class="marker-label">${room.nome}</span>
            <div class="marker-tooltip">
                <strong>${room.nome}</strong><br>
                Andar: Térreo
            </div>
        `;
        
        // Add click handler
        marker.addEventListener('click', () => {
            this.selectRoom(room.nome);
        });
        
        // Add hover effects
        marker.addEventListener('mouseenter', () => {
            marker.classList.add('hovered');
        });
        
        marker.addEventListener('mouseleave', () => {
            marker.classList.remove('hovered');
        });
        
        // Add marker to overlay
        overlay.appendChild(marker);
        
        console.log(`Added marker for ${room.nome} at scaled coordinates (${displayX.toFixed(1)}, ${displayY.toFixed(1)}) from original (${room.coordenadas.x}, ${room.coordenadas.y})`);
    }

    /**
     * Clear all markers from the map
     */
    clearMapMarkers() {
        const overlay = document.getElementById('rooms-overlay');
        overlay.innerHTML = '';
    }

    /**
     * Center view on a specific room (visual feedback)
     * @param {string} roomName - The room name to center on
     */
    centerOnRoom(roomName) {
        const room = this.rooms.find(r => r.nome === roomName);
        if (!room) return;
        
        const mapWrapper = document.querySelector('.map-wrapper');
        const floorPlan = document.getElementById('floor-plan');
        
        // Calculate scale factor: displayed size vs natural size
        const scaleX = floorPlan.offsetWidth / floorPlan.naturalWidth;
        const scaleY = floorPlan.offsetHeight / floorPlan.naturalHeight;
        
        // Calculate room position in scaled coordinates
        const roomX = room.coordenadas.x * scaleX;
        const roomY = room.coordenadas.y * scaleY;
        
        // Center the map on the room
        const containerRect = mapWrapper.getBoundingClientRect();
        const centerX = roomX - containerRect.width / 2;
        const centerY = roomY - containerRect.height / 2;
        
        // Smooth scroll to the room (only vertical)
        mapWrapper.scrollTo({
            top: Math.max(0, centerY),
            behavior: 'smooth'
        });
        
        // Re-highlight the room with enhanced visual feedback
        this.highlightRoomOnMap(room);
        
        // Add temporary pulse effect to the marker
        setTimeout(() => {
            const marker = document.querySelector(`[data-room="${roomName}"]`);
            if (marker) {
                marker.classList.add('pulse');
                setTimeout(() => {
                    marker.classList.remove('pulse');
                }, 2000);
            }
        }, 100);
        
        this.updateInstructions(`Centralizado na sala ${roomName}`);
    }

    /**
     * Copy room name to clipboard (simplified version)
     * @param {string} roomName - The room name
     */
    copyRoomName(roomName) {
        const room = this.rooms.find(r => r.nome === roomName);
        if (!room) return;
        
        const roomText = room.nome;
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(roomText).then(() => {
                this.showTemporaryMessage('Nome da sala copiado para a área de transferência!');
            }).catch(err => {
                console.error('Failed to copy:', err);
                this.fallbackCopyToClipboard(roomText);
            });
        } else {
            this.fallbackCopyToClipboard(roomText);
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
                this.showTemporaryMessage('Coordenadas copiadas!');
            } else {
                this.showTemporaryMessage('Não foi possível copiar automaticamente');
            }
        } catch (err) {
            console.error('Fallback copy failed:', err);
            this.showTemporaryMessage('Erro ao copiar coordenadas');
        } finally {
            document.body.removeChild(textArea);
        }
    }

    /**
     * Show a temporary message to the user
     * @param {string} message - The message to show
     */
    showTemporaryMessage(message) {
        const messageEl = document.createElement('div');
        messageEl.className = 'temp-message';
        messageEl.textContent = message;
        messageEl.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 12px 20px;
            border-radius: 6px;
            z-index: 1000;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        `;
        
        document.body.appendChild(messageEl);
        
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.parentNode.removeChild(messageEl);
            }
        }, 3000);
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
            instructionElement.textContent = 'Clique em uma sala da lista para destacar sua localização';
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
        
        // Arrow keys for room navigation
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            this.navigateRooms(e.key === 'ArrowDown' ? 1 : -1);
            return;
        }
    }

    /**
     * Navigate through rooms using keyboard
     * @param {number} direction - 1 for next, -1 for previous
     */
    navigateRooms(direction) {
        const sortedRooms = [...this.filteredRooms].sort((a, b) => a.nome.localeCompare(b.nome));
        
        if (sortedRooms.length === 0) return;
        
        let currentIndex = -1;
        if (this.selectedRoom) {
            currentIndex = sortedRooms.findIndex(room => room.nome === this.selectedRoom.nome);
        }
        
        const newIndex = currentIndex + direction;
        
        if (newIndex >= 0 && newIndex < sortedRooms.length) {
            this.selectRoom(sortedRooms[newIndex].nome);
        } else if (newIndex < 0) {
            this.selectRoom(sortedRooms[sortedRooms.length - 1].nome);
        } else {
            this.selectRoom(sortedRooms[0].nome);
        }
    }

    /**
     * Clear current selection
     */
    clearSelection() {
        this.selectedRoom = null;
        this.updateRoomSelection();
        this.clearMapMarkers();
        
        const detailsContainer = document.getElementById('room-details');
        detailsContainer.innerHTML = '<p class="info-message">Selecione uma sala para ver suas informações</p>';
        
        this.updateInstructions();
    }

    /**
     * Setup accessibility features
     */
    setupAccessibility() {
        // Add ARIA labels
        const overlay = document.getElementById('rooms-overlay');
        overlay.setAttribute('role', 'application');
        overlay.setAttribute('aria-label', 'Área de salas do térreo');
        
        // Add keyboard navigation hint
        const searchInput = document.getElementById('room-search');
        searchInput.setAttribute('aria-label', 'Buscar sala por nome');
        
        console.log('Accessibility features configured');
    }

    /**
     * Handle window resize for responsive behavior
     */
    handleResize() {
        // Debounce resize handling
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            // Recalculate overlay dimensions
            this.setupOverlay();
            
            // Recalculate marker positions
            if (this.selectedRoom) {
                this.highlightRoomOnMap(this.selectedRoom);
            } else if (this.allMarkersVisible) {
                this.showAllRooms();
            }
        }, 250);
    }

    /**
     * Get all rooms data
     * @returns {Array} - Array of room objects
     */
    getAllRooms() {
        return this.rooms;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.terreoRooms = new TerreoRooms();
});

// Export for testing purposes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TerreoRooms;
}

// Initialize the rooms tool when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.terreoRooms = new TerreoRooms();
});

// Export for testing purposes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TerreoRooms;
}

/**
 * Interactive Room Location Tool for Térreo - Simplified Version
 */

class TerreoRooms {
    constructor() {
        console.log('TerreoRooms constructor started');
        
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
            }
        ];
        
        this.selectedRoom = null;
        this.filteredRooms = [...this.rooms];
        this.allMarkersVisible = false;
        this.currentZoom = 1.0;
        
        console.log('TerreoRooms data initialized');
        this.init();
    }

    init() {
        console.log('Init method called');
        
        // Wait for image to load
        const floorPlan = document.getElementById('floor-plan');
        if (floorPlan.complete) {
            this.setup();
        } else {
            floorPlan.addEventListener('load', () => this.setup());
        }
    }

    setup() {
        console.log('Setup method called');
        this.renderRoomsList();
        this.setupEventListeners();
        this.setupZoomControls();
        this.showAllRooms();
    }

    renderRoomsList() {
        console.log('renderRoomsList called');
        const container = document.getElementById('rooms-container');
        
        if (!container) {
            console.error('Rooms container not found');
            return;
        }
        
        const roomsHTML = this.rooms.map(room => `
            <div class="room-item" data-room="${room.nome}" tabindex="0" role="button">
                <div class="room-header">
                    <strong class="room-name">${room.nome}</strong>
                    <span class="room-coords">(${room.coordenadas.x}, ${room.coordenadas.y})</span>
                </div>
            </div>
        `).join('');
        
        container.innerHTML = roomsHTML;
        console.log(`Rendered ${this.rooms.length} rooms`);
        
        // Add click events to room items
        container.querySelectorAll('.room-item').forEach(item => {
            item.addEventListener('click', () => {
                const roomName = item.getAttribute('data-room');
                console.log('Room clicked:', roomName);
                this.selectRoom(roomName);
            });
        });
    }

    selectRoom(roomName) {
        console.log('selectRoom called:', roomName);
        const room = this.rooms.find(r => r.nome === roomName);
        if (room) {
            this.selectedRoom = room.nome;
            this.highlightRoomOnMap(room);
            this.updateRoomSelection();
        }
    }

    highlightRoomOnMap(room) {
        console.log('highlightRoomOnMap called:', room.nome);
        this.clearMapMarkers();
        this.addRoomMarker(room, true);
    }

    addRoomMarker(room, isHighlighted = false) {
        console.log('addRoomMarker called:', room.nome, isHighlighted);
        const overlay = document.getElementById('rooms-overlay');
        const floorPlan = document.getElementById('floor-plan');
        
        if (!overlay || !floorPlan) {
            console.error('Required elements not found');
            return;
        }
        
        if (!floorPlan.naturalWidth || !floorPlan.naturalHeight) {
            console.warn('Floor plan not fully loaded yet');
            return;
        }
        
        // Calculate scale and position
        const container = floorPlan.parentElement;
        const containerRect = container.getBoundingClientRect();
        const baseScale = containerRect.width / floorPlan.naturalWidth;
        const scale = baseScale * this.currentZoom;
        
        const displayX = Math.round(room.coordenadas.x * scale);
        const displayY = Math.round(room.coordenadas.y * scale);
        
        console.log('Marker position:', { displayX, displayY, scale: this.currentZoom });
        
        // Create marker element
        const marker = document.createElement('div');
        marker.className = `room-marker ${isHighlighted ? 'highlighted' : ''}`;
        marker.setAttribute('data-room', room.nome);
        marker.style.left = `${displayX}px`;
        marker.style.top = `${displayY}px`;
        marker.innerHTML = `<span class="marker-label">${room.nome}</span>`;
        
        overlay.appendChild(marker);
        console.log('Marker added to overlay');
    }

    clearMapMarkers() {
        const overlay = document.getElementById('rooms-overlay');
        if (overlay) {
            overlay.innerHTML = '';
            console.log('Map markers cleared');
        }
    }

    showAllRooms() {
        console.log('showAllRooms called');
        this.clearMapMarkers();
        this.allMarkersVisible = true;
        
        this.rooms.forEach(room => {
            this.addRoomMarker(room, false);
        });
        
        console.log(`Showing all ${this.rooms.length} rooms on map`);
    }

    updateRoomSelection() {
        // Update selected room in sidebar
        document.querySelectorAll('.room-item').forEach(item => {
            item.classList.remove('selected');
        });
        
        if (this.selectedRoom) {
            const selectedItem = document.querySelector(`[data-room="${this.selectedRoom}"]`);
            if (selectedItem) {
                selectedItem.classList.add('selected');
            }
        }
    }

    setupEventListeners() {
        console.log('setupEventListeners called');
        
        const showAllBtn = document.getElementById('show-all-btn');
        const hideAllBtn = document.getElementById('hide-all-btn');
        
        if (showAllBtn) {
            showAllBtn.addEventListener('click', () => {
                console.log('Show all button clicked');
                this.showAllRooms();
            });
        }
        
        if (hideAllBtn) {
            hideAllBtn.addEventListener('click', () => {
                console.log('Hide all button clicked');
                this.clearMapMarkers();
                this.allMarkersVisible = false;
            });
        }
    }

    setupZoomControls() {
        console.log('setupZoomControls called');
        
        const zoomSlider = document.getElementById('zoom-slider');
        const zoomInBtn = document.getElementById('zoom-in-btn');
        const zoomOutBtn = document.getElementById('zoom-out-btn');
        
        if (!zoomSlider || !zoomInBtn || !zoomOutBtn) {
            console.error('Zoom controls not found');
            return;
        }
        
        // Slider event
        zoomSlider.addEventListener('input', (e) => {
            this.currentZoom = parseFloat(e.target.value);
            console.log('Zoom slider changed:', this.currentZoom);
            this.updateZoom();
        });
        
        // Zoom in button
        zoomInBtn.addEventListener('click', () => {
            const newZoom = Math.min(3.0, this.currentZoom + 0.1);
            console.log('Zoom in clicked, new zoom:', newZoom);
            this.setZoom(newZoom);
        });
        
        // Zoom out button
        zoomOutBtn.addEventListener('click', () => {
            const newZoom = Math.max(0.5, this.currentZoom - 0.1);
            console.log('Zoom out clicked, new zoom:', newZoom);
            this.setZoom(newZoom);
        });
        
        this.updateZoomDisplay();
    }

    setZoom(zoom) {
        this.currentZoom = Math.max(0.5, Math.min(3.0, zoom));
        
        const zoomSlider = document.getElementById('zoom-slider');
        if (zoomSlider) {
            zoomSlider.value = this.currentZoom;
        }
        
        this.updateZoom();
    }

    updateZoom() {
        console.log('updateZoom called:', this.currentZoom);
        
        const floorPlan = document.getElementById('floor-plan');
        if (floorPlan) {
            floorPlan.style.transform = `scale(${this.currentZoom})`;
            floorPlan.style.transformOrigin = 'top left';
        }
        
        this.updateZoomDisplay();
        
        // Redraw markers with new zoom
        this.clearMapMarkers();
        if (this.selectedRoom) {
            const room = this.rooms.find(r => r.nome === this.selectedRoom);
            if (room) {
                this.highlightRoomOnMap(room);
            }
        } else if (this.allMarkersVisible) {
            this.showAllRooms();
        }
    }

    updateZoomDisplay() {
        const zoomLevel = document.getElementById('zoom-level');
        if (zoomLevel) {
            zoomLevel.textContent = `${Math.round(this.currentZoom * 100)}%`;
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - initializing TerreoRooms');
    window.terreoRooms = new TerreoRooms();
    console.log('TerreoRooms initialized');
});

// Export for testing purposes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TerreoRooms;
}

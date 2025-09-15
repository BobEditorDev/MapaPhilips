/**
 * Interactive Room Location Tool for Mezanino
 * Displays room locations on the mezzanine floor plan and allows room selection
 */

class MezaninoRooms {
    constructor() {
        this.rooms = [
            {
                "codigo": "M-MR02",
                "nome": "DA VINCI",
                "coordenadas": { "x": 783, "y": 1406 },
                "andar": "mezanino",
                "codigoOutlook": "_R_BNU_MR_M_DAVINCI_02",
                "capacidade": 6,
                "equipamentos": "TV, Wireless",
                "biografia": "Leonardo da Vinci (1452-1519) foi um polímata italiano do Renascimento, conhecido por suas contribuições à arte, ciência, engenharia e invenção."
            },
            {
                "codigo": "M-MR01",
                "nome": "HAMILTON",
                "coordenadas": { "x": 2269, "y": 2191 },
                "andar": "mezanino",
                "codigoOutlook": "_R_BNU_MR_M_HAMILTON_01",
                "capacidade": 4,
                "equipamentos": "TV, Wireless",
                "biografia": "Margaret Hamilton (1936-) é uma cientista da computação americana que desenvolveu o software de navegação da Apollo 11, cunhando o termo 'engenharia de software'."
            },
            {
                "codigo": "M-MR03",
                "nome": "HOPPER",
                "coordenadas": { "x": 2267, "y": 2506 },
                "andar": "mezanino",
                "codigoOutlook": "_R_BNU_MR_M_HOPPER_03",
                "capacidade": 4,
                "equipamentos": "TV, Wireless",
                "biografia": "Grace Hopper (1906-1992) foi uma cientista da computação americana pioneira no desenvolvimento de linguagens de programação e criadora do primeiro compilador."
            },
            {
                "codigo": "M-MR05",
                "nome": "LAMARR",
                "coordenadas": { "x": 2240, "y": 2933 },
                "andar": "mezanino",
                "codigoOutlook": "_R_BNU_MR_M_LAMARR_05",
                "capacidade": 8,
                "equipamentos": "TV, Wireless e Spiker",
                "biografia": "Hedy Lamarr (1914-2000) foi uma atriz e inventora austríaca-americana que desenvolveu tecnologia de salto de frequência, precursora do WiFi e Bluetooth."
            },
            {
                "codigo": "M-MR07",
                "nome": "WILSON",
                "coordenadas": { "x": 2627, "y": 2964 },
                "andar": "mezanino",
                "codigoOutlook": "_R_BNU_MR_M_WILSON_07",
                "capacidade": 6,
                "equipamentos": "TV, Wireless e Spiker",
                "biografia": "Robert Wilson (1936-2002) foi um físico americano que co-descobriu a radiação cósmica de fundo em microondas, evidência do Big Bang."
            },
            {
                "codigo": "M-MR13",
                "nome": "NEUMANN",
                "coordenadas": { "x": 2664, "y": 4754 },
                "andar": "mezanino",
                "codigoOutlook": "_R_BNU_MR_M_NEUMANN_13",
                "capacidade": 4,
                "equipamentos": "TV, Wireless",
                "biografia": "John von Neumann (1903-1957) foi um matemático húngaro-americano que fez contribuições fundamentais à ciência da computação, incluindo a arquitetura von Neumann."
            },
            {
                "codigo": "M-MR11",
                "nome": "LISKOV",
                "coordenadas": { "x": 2976, "y": 4748 },
                "andar": "mezanino",
                "codigoOutlook": "_R_BNU_MR_M_LISKOV_11",
                "capacidade": 4,
                "equipamentos": "TV, Wireless",
                "biografia": "Barbara Liskov (1939-) é uma cientista da computação americana pioneira em linguagens de programação e sistemas distribuídos, ganhadora do Prêmio Turing."
            },
            {
                "codigo": "M-MR09",
                "nome": "HOOVER",
                "coordenadas": { "x": 3285, "y": 4750 },
                "andar": "mezanino",
                "codigoOutlook": "_R_BNU_MR_M_HOOVER_09",
                "capacidade": 4,
                "equipamentos": "TV, Wireless",
                "biografia": "Erna Schneider Hoover (1926-) é uma matemática americana que inventou o sistema de comutação telefônica computadorizada, revolucionando as telecomunicações."
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
        
        console.log(`Mezanino Overlay set to: ${displayedWidth}x${displayedHeight}px`);
        console.log(`Mezanino Image natural size: ${floorPlan.naturalWidth}x${floorPlan.naturalHeight}px`);
        console.log(`Mezanino Natural aspect ratio: ${naturalAspectRatio.toFixed(3)}`);
        console.log(`Mezanino Displayed aspect ratio: ${displayedAspectRatio.toFixed(3)}`);
        console.log(`Mezanino Scale X: ${(displayedWidth / floorPlan.naturalWidth).toFixed(4)}`);
        console.log(`Mezanino Scale Y: ${(displayedHeight / floorPlan.naturalHeight).toFixed(4)}`);
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

        // CORREÇÃO COPILOT: Captura de clique no overlay para exibir coordenadas relativas ao mapa
        // MOTIVO: Facilitar cadastro de novas salas e depuração visual
        const overlay = document.getElementById('rooms-overlay');
        overlay.addEventListener('click', (e) => {
            const floorPlan = document.getElementById('floor-plan');
            // Posição do overlay na tela
            const rect = overlay.getBoundingClientRect();
            // Coordenadas do clique relativas ao overlay
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            // Ajuste para escala da imagem
            const scaleX = floorPlan.naturalWidth / floorPlan.offsetWidth;
            const scaleY = floorPlan.naturalHeight / floorPlan.offsetHeight;
            const coordX = Math.round(x * scaleX);
            const coordY = Math.round(y * scaleY);
            // Exibe no console (pode trocar por alert se preferir)
            console.log(`Coordenada clicada no mezanino: x=${coordX}, y=${coordY}`);
            this.showTemporaryMessage(`Coordenada: x=${coordX}, y=${coordY}`);
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
            <div class="room-item" data-room="${room.nome}" tabindex="0" role="button" aria-label="Selecionar sala ${room.nome}" title="${room.biografia}">
                <div class="room-header">
                    <strong class="room-name">${room.nome}</strong>
                    <span class="room-hint">💡</span>
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
        
        // CORREÇÃO COPILOT: Centralizar automaticamente o mapa na sala selecionada
        // MOTIVO: Melhora a experiência do usuário automatizando a navegação conforme térreo
        this.centerOnRoom(roomName);
        
        // Update instructions
        this.updateInstructions(`Sala ${roomName} selecionada e centralizada no mapa`);
        
        console.log('Selected mezanino room:', room);
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
        
        // CORREÇÃO COPILOT: Suporte tanto para formato antigo quanto novo da biografia
        // MOTIVO: Garantir compatibilidade com salas que ainda não foram atualizadas
        const biografiaContent = this.renderBiografia(room);
        
        detailsContainer.innerHTML = `
            <div class="selected-room-info">
                <h3>${room.nome}</h3>
                <div class="room-code">
                    <strong>Código:</strong> ${room.codigo}
                </div>
                <div class="room-outlook">
                    <strong>Outlook:</strong> 
                    <span class="outlook-code">${room.codigoOutlook}</span>
                </div>
                <div class="room-capacity">
                    <strong>Capacidade:</strong> ${room.capacidade} pessoas
                </div>
                <div class="room-equipment">
                    <strong>Equipamentos:</strong> ${room.equipamentos}
                </div>
                <div class="room-location">
                    <strong>Andar:</strong> Mezanino
                </div>
                <div class="room-biography">
                    <strong>Biografia:</strong>
                    ${biografiaContent}
                </div>
                <div class="room-actions">
                    <button class="detail-btn" onclick="mezaninoRooms.centerOnRoom('${room.nome}')">
                        🎯 Centralizar no Mapa
                    </button>
                    <button class="detail-btn" onclick="mezaninoRooms.copyRoomInfo('${room.nome}')">
                        📋 Copiar Informações
                    </button>
                </div>
            </div>
        `;
        
        // Configurar eventos para o botão "Ler mais" se existir
        const expandBtn = detailsContainer.querySelector('.expand-btn');
        if (expandBtn) {
            expandBtn.addEventListener('click', () => {
                this.toggleBiografia(room.nome);
            });
        }
    }

    /**
     * Renderiza o conteúdo da biografia baseado no formato (novo ou legado)
     * @param {Object} room - O objeto da sala
     * @returns {string} - HTML da biografia
     */
    renderBiografia(room) {
        // Se biografia é objeto (novo formato)
        if (typeof room.biografia === 'object' && room.biografia.resumo) {
            const referencesHtml = room.biografia.referencias ? `
                <div class="biography-references">
                    <h4>Referências:</h4>
                    <ul>
                        ${room.biografia.referencias.map(ref => `<li>${ref}</li>`).join('')}
                    </ul>
                </div>
            ` : '';
            
            return `
                <div class="biography-summary">
                    ${room.biografia.resumo}
                </div>
                <div class="biography-expanded" id="biography-expanded-${room.nome}">
                    ${room.biografia.completa}
                    ${referencesHtml}
                </div>
                <button class="expand-btn" id="expand-btn-${room.nome}" aria-expanded="false" aria-controls="biography-expanded-${room.nome}">
                    Ler mais
                </button>
            `;
        } else {
            // Formato legado - biografia como string
            return `<p class="biography-text">${room.biografia}</p>`;
        }
    }

    /**
     * Alterna entre mostrar/ocultar biografia expandida
     * @param {string} roomName - Nome da sala
     */
    toggleBiografia(roomName) {
        const expandedElement = document.getElementById(`biography-expanded-${roomName}`);
        const expandBtn = document.getElementById(`expand-btn-${roomName}`);
        
        if (!expandedElement || !expandBtn) return;
        
        const isExpanded = expandedElement.classList.contains('show');
        
        if (isExpanded) {
            expandedElement.classList.remove('show');
            expandBtn.textContent = 'Ler mais';
            expandBtn.setAttribute('aria-expanded', 'false');
        } else {
            expandedElement.classList.add('show');
            expandBtn.textContent = 'Ler menos';
            expandBtn.setAttribute('aria-expanded', 'true');
        }
        
        // Anunciar mudança para leitores de tela
        const announcement = isExpanded ? 'Biografia recolhida' : 'Biografia expandida';
        this.announceToScreenReader(announcement);
    }

    /**
     * Anuncia informações para leitores de tela
     * @param {string} message - Mensagem a ser anunciada
     */
    announceToScreenReader(message) {
        // Criar elemento de anúncio temporário
        const announcer = document.createElement('div');
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        announcer.className = 'sr-only';
        announcer.style.position = 'absolute';
        announcer.style.left = '-10000px';
        announcer.style.width = '1px';
        announcer.style.height = '1px';
        announcer.style.overflow = 'hidden';
        
        document.body.appendChild(announcer);
        announcer.textContent = message;
        
        // Remover após 1 segundo
        setTimeout(() => {
            if (document.body.contains(announcer)) {
                document.body.removeChild(announcer);
            }
        }, 1000);
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
        
        this.updateInstructions(`Mostrando todas as ${this.rooms.length} salas do mezanino`);
        console.log('Showing all mezanino rooms on map');
    }

    /**
     * Hide all markers from the map
     */
    hideAllMarkers() {
        this.clearMapMarkers();
        this.allMarkersVisible = false;
        this.updateInstructions('Todos os marcadores foram ocultados');
        console.log('All mezanino markers hidden');
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
        
        // Position marker (centralizado exatamente no pixel da coordenada)
        marker.style.left = `${Math.round(displayX)}px`;
        marker.style.top = `${Math.round(displayY)}px`;
        marker.style.transform = 'translate(-50%, -50%)';   
        
        // Add content and tooltip with intelligent positioning
        marker.innerHTML = `
            <span class="marker-label">${room.nome}</span>
            <div class="marker-tooltip" id="tooltip-${room.nome}">
                <strong>${room.nome}</strong><br>
                Andar: Mezanino
            </div>
        `;
        
        // Add click handler
        marker.addEventListener('click', () => {
            this.selectRoom(room.nome);
        });
        
        // Add hover effects with tooltip positioning
        marker.addEventListener('mouseenter', () => {
            marker.classList.add('hovered');
            this.adjustTooltipPosition(marker, displayX, displayY);
        });
        
        marker.addEventListener('mouseleave', () => {
            marker.classList.remove('hovered');
        });
        
        // Add marker to overlay
        overlay.appendChild(marker);
        
        console.log(`Added mezanino marker for ${room.nome} at scaled coordinates (${displayX.toFixed(1)}, ${displayY.toFixed(1)}) from original (${room.coordenadas.x}, ${room.coordenadas.y})`);
    }

    /**
     * Ajusta a posição do tooltip para não ultrapassar as bordas do mapa
     * @param {HTMLElement} marker - Elemento do marcador
     * @param {number} markerX - Coordenada X do marcador
     * @param {number} markerY - Coordenada Y do marcador
     */
    adjustTooltipPosition(marker, markerX, markerY) {
        const tooltip = marker.querySelector('.marker-tooltip');
        if (!tooltip) return;

        const mapWrapper = document.querySelector('.map-wrapper');
        const mapRect = mapWrapper.getBoundingClientRect();
        const floorPlan = document.getElementById('floor-plan');
        const planRect = floorPlan.getBoundingClientRect();
        
        // Calculate position relative to the map container
        const relativeX = markerX;
        const relativeY = markerY;
        const mapWidth = floorPlan.offsetWidth;
        const mapHeight = floorPlan.offsetHeight;
        
        // Reset all position classes
        tooltip.classList.remove('top', 'bottom', 'left', 'right');
        
        // Define thresholds (100px from edges)
        const threshold = 100;
        
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
        
        console.log(`Tooltip positioned for ${marker.getAttribute('data-room')} at (${relativeX.toFixed(1)}, ${relativeY.toFixed(1)}) - classes: ${tooltip.className}`);
    }

    /**
     * Clear all room markers from the map (preserving landmarks)
     */
    clearMapMarkers() {
        const overlay = document.getElementById('rooms-overlay');
        // CORREÇÃO COPILOT: Preservar landmarks ao limpar marcadores de salas
        // MOTIVO: Atender requisito de que landmarks devem permanecer sempre visíveis
        overlay.querySelectorAll('.room-marker').forEach(marker => {
            marker.remove();
        });
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
     * Copy room information to clipboard (enhanced version)
     * @param {string} roomName - The room name
     */
    copyRoomInfo(roomName) {
        const room = this.rooms.find(r => r.nome === roomName);
        if (!room) return;
        
        const roomInfo = `Sala: ${room.nome}
Código: ${room.codigo}
Outlook: ${room.codigoOutlook}
Capacidade: ${room.capacidade} pessoas
Equipamentos: ${room.equipamentos}
Andar: Mezanino
        
Biografia: ${room.biografia}`;
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(roomInfo).then(() => {
                this.showTemporaryMessage('Informações da sala copiadas para a área de transferência!');
            }).catch(err => {
                console.error('Failed to copy:', err);
                this.fallbackCopyToClipboard(roomInfo);
            });
        } else {
            this.fallbackCopyToClipboard(roomInfo);
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
                this.showTemporaryMessage('Informação copiada!');
            } else {
                throw new Error('Copy command failed');
            }
        } catch (err) {
            console.error('Fallback copy failed:', err);
            this.showTemporaryMessage('Erro ao copiar informação');
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
    window.mezaninoRooms = new MezaninoRooms();
});

// Export for testing purposes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MezaninoRooms;
}
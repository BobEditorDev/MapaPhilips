/**
 * Interactive Room Location Tool for Térreo
 * Displays room locations on the floor plan and allows room selection
 */

class TerreoRooms {
    constructor() {
        this.rooms = [
            // Salas de Reunião
            {
                "codigo": "T-MR01",
                "nome": "EINSTEIN",
                "coordenadas": { "x": 4375, "y": 1735 },
                "andar": "terreo",
                "codigoOutlook": "_R_BNU_MR_T_EINSTEIN_01",
                "capacidade": 10,
                "equipamentos": "TV, Wireless e Spiker",
                "biografia": {
                    "resumo": "Albert Einstein (1879-1955) foi um físico alemão que desenvolveu a teoria da relatividade, uma das teorias mais importantes da física moderna. Ganhou o Prêmio Nobel de Física em 1921.",
                    "completa": "Albert Einstein (1879-1955) foi um físico teórico alemão-americano que revolucionou a ciência moderna com suas teorias fundamentais. Nascido em Ulm, no Reino de Württemberg, no Império Alemão, Einstein desenvolveu a teoria da relatividade especial (1905) e geral (1915), que mudaram completamente nossa compreensão do espaço, tempo e gravidade. Sua famosa equação E=mc² demonstrou a equivalência entre massa e energia. Em 1921, recebeu o Prêmio Nobel de Física por sua explicação do efeito fotoelétrico. Emigrou para os Estados Unidos em 1933 para escapar da perseguição nazista, estabelecendo-se no Instituto de Estudos Avançados de Princeton.",
                    "referencias": [
                        "Isaacson, Walter. Einstein: His Life and Universe. Simon & Schuster, 2007.",
                        "Einstein, Albert. Relativity: The Special and General Theory. Methuen, 1916."
                    ]
                }
            },
            {
                "codigo": "T-MR02",
                "nome": "TESLA",
                "coordenadas": { "x": 430, "y": 1942 },
                "andar": "terreo",
                "codigoOutlook": "_R_BNU_MR_T_TESLA_02",
                "capacidade": 8,
                "equipamentos": "TV, Wireless e Spiker",
                "biografia": {
                    "resumo": "Nikola Tesla (1856-1943) foi um inventor e engenheiro eletrotécnico sérvio-americano pioneiro no desenvolvimento de tecnologias de energia e comunicação, incluindo o sistema de corrente alternada.",
                    "completa": "Nikola Tesla (1856-1943) foi um inventor, engenheiro elétrico e futurista sérvio-americano conhecido por suas contribuições ao design do moderno sistema de fornecimento de energia elétrica. Nascido no Império Austríaco (atual Croácia), Tesla emigrou para os Estados Unidos em 1884. Desenvolveu o sistema polifásico de corrente alternada (AC), que se tornou o padrão mundial para transmissão de energia elétrica. Suas patentes e trabalho teórico também contribuíram para o desenvolvimento de comunicações sem fio, motores de indução e várias outras tecnologias que moldaram o mundo moderno. Possuía mais de 300 patentes registradas.",
                    "referencias": [
                        "Carlson, W. Bernard. Tesla: Inventor of the Electrical Age. Princeton University Press, 2013.",
                        "Tesla, Nikola. My Inventions: The Autobiography of Nikola Tesla. Experimenter Publishing, 1919."
                    ]
                }
            },
            {
                "codigo": "T-MR03",
                "nome": "NEWTON",
                "coordenadas": { "x": 430, "y": 3600 }, // Assumindo coordenadas similar ao CURIE
                "andar": "terreo",
                "codigoOutlook": "_R_BNU_MR_T_NEWTON_03",
                "capacidade": 5,
                "equipamentos": "Fechada",
                "biografia": {
                    "resumo": "Isaac Newton (1643-1727) foi um matemático, físico e astrônomo inglês que formulou as leis do movimento e da gravitação universal, fundamentais para a física clássica.",
                    "completa": "Isaac Newton (1643-1727) foi um matemático, físico, astrônomo e alquimista inglês considerado uma das figuras mais influentes da história da ciência. Nascido em Woolsthorpe, Lincolnshire, Newton formulou as três leis do movimento e a lei da gravitação universal, publicadas em sua obra magna 'Principia Mathematica' (1687). Suas contribuições incluem o desenvolvimento do cálculo diferencial e integral (independentemente de Leibniz), a teoria das cores e a construção do primeiro telescópio refletor. Como presidente da Royal Society e mestre da Casa da Moeda Real, Newton também teve um papel importante na vida acadêmica e pública inglesa.",
                    "referencias": [
                        "Westfall, Richard S. Never at Rest: A Biography of Isaac Newton. Cambridge University Press, 1980.",
                        "Newton, Isaac. Philosophiæ Naturalis Principia Mathematica. Royal Society, 1687."
                    ]
                }
            },
            {
                "codigo": "T-MR04",
                "nome": "CURIE",
                "coordenadas": { "x": 430, "y": 3600 },
                "andar": "terreo",
                "codigoOutlook": "_R_BNU_MR_T_CURIE_04",
                "capacidade": 8,
                "equipamentos": "TV, Wireless e Spiker",
                "biografia": {
                    "resumo": "Marie Curie (1867-1934) foi uma física e química polonesa-francesa pioneira na pesquisa sobre radioatividade. Foi a primeira mulher a ganhar um Prêmio Nobel.",
                    "completa": "Marie Skłodowska-Curie (1867-1934) foi uma física e química polonesa-francesa que conduziu pesquisas pioneiras sobre radioatividade, termo que ela própria cunhou. Nascida em Varsóvia (Polônia russa), emigrou para Paris para estudar na Sorbonne. Tornou-se a primeira mulher a ganhar um Prêmio Nobel (Física, 1903, compartilhado com Pierre Curie e Henri Becquerel), a primeira pessoa a ganhar Prêmios Nobel em duas ciências diferentes (Química, 1911), e a primeira professora mulher na Universidade de Paris. Descobriu dois elementos químicos: polônio e rádio. Seus cadernos de laboratório permanecem radioativos até hoje.",
                    "referencias": [
                        "Quinn, Susan. Marie Curie: A Life. Simon & Schuster, 1995.",
                        "Curie, Marie. Pierre Curie. Macmillan, 1923."
                    ]
                }
            },
            {
                "codigo": "T-MR05",
                "nome": "DARWIN",
                "coordenadas": { "x": 5311, "y": 1744 },
                "andar": "terreo",
                "codigoOutlook": "_R_BNU_MR_T_DARWIN_05",
                "capacidade": 8,
                "equipamentos": "TV, Wireless e Spiker",
                "biografia": {
                    "resumo": "Charles Darwin (1809-1882) foi um naturalista inglês que propôs a teoria da evolução das espécies por seleção natural, revolucionando nossa compreensão da vida.",
                    "completa": "Charles Robert Darwin (1809-1882) foi um naturalista inglês que revolucionou a biologia com sua teoria da evolução através da seleção natural. Nascido em Shrewsbury, desenvolveu seu interesse pela natureza durante os estudos em Cambridge. Sua viagem de cinco anos no HMS Beagle (1831-1836) forneceu evidências cruciais para suas teorias. Sua obra 'A Origem das Espécies' (1859) apresentou evidências científicas de que todas as espécies descendem de ancestrais comuns através de um processo de seleção natural. Esta teoria unificou as ciências da vida e explicou a diversidade da vida na Terra, estabelecendo a biologia evolutiva como disciplina científica.",
                    "referencias": [
                        "Browne, Janet. Charles Darwin: A Biography. Princeton University Press, 1995.",
                        "Darwin, Charles. On the Origin of Species. John Murray, 1859."
                    ]
                }
            },
            {
                "codigo": "T-MR07",
                "nome": "TURING",
                "coordenadas": { "x": 4289, "y": 3505 },
                "andar": "terreo",
                "codigoOutlook": "_R_BNU_MR_T_TURING_07",
                "capacidade": 4,
                "equipamentos": "TV, Wireless",
                "biografia": {
                    "resumo": "Alan Turing (1912-1954) foi um matemático e cientista da computação britânico, considerado pai da ciência da computação e da inteligência artificial.",
                    "completa": "Alan Mathison Turing (1912-1954) foi um matemático, cientista da computação, lógico e criptoanalista britânico. Considerado o pai da ciência da computação e da inteligência artificial, Turing foi fundamental na formalização dos conceitos de algoritmo e computação com a máquina de Turing. Durante a Segunda Guerra Mundial, trabalhou em Bletchley Park decifrando códigos alemães, incluindo a máquina Enigma. Sua contribuição foi crucial para o esforço de guerra dos Aliados. Propôs o famoso 'Teste de Turing' para determinar se uma máquina pode exibir comportamento inteligente equivalente ao humano.",
                    "referencias": [
                        "Hodges, Andrew. Alan Turing: The Enigma. Princeton University Press, 1983.",
                        "Turing, Alan. Computing Machinery and Intelligence. Mind, 1950."
                    ]
                }
            },
            {
                "codigo": "T-MR09",
                "nome": "HOFF",
                "coordenadas": { "x": 3971, "y": 3497 },
                "andar": "terreo",
                "codigoOutlook": "_R_BNU_MR_T_HOFF_09",
                "capacidade": 4,
                "equipamentos": "TV, Wireless",
                "biografia": {
                    "resumo": "Marcian Hoff (1937-) é um engenheiro americano conhecido como um dos inventores do microprocessador, revolucionando a indústria de computadores.",
                    "completa": "Marcian Edward 'Ted' Hoff Jr. (1937-) é um engenheiro elétrico americano conhecido como um dos inventores do microprocessador. Durante seu trabalho na Intel Corporation, Hoff foi o arquiteto principal do Intel 4004, lançado em 1971, que é amplamente reconhecido como o primeiro microprocessador comercialmente viável. Esta inovação revolucionou a indústria de computadores, permitindo a miniaturização de sistemas de computação e abrindo caminho para a era dos computadores pessoais. Seu trabalho fundamentou toda a revolução digital moderna.",
                    "referencias": [
                        "Malone, Michael S. The Intel Trinity. HarperCollins, 2014.",
                        "Hoff, Marcian E. The Intel 4004 Microprocessor. IEEE Micro, 1996."
                    ]
                }
            },
            {
                "codigo": "T-MR11",
                "nome": "COOPER",
                "coordenadas": { "x": 3971, "y": 3857 },
                "andar": "terreo",
                "codigoOutlook": "_R_BNU_MR_T_COOPER_11",
                "capacidade": 4,
                "equipamentos": "Fechada",
                "biografia": {
                    "resumo": "Martin Cooper (1928-) é um engenheiro americano pioneiro no desenvolvimento da telefonia móvel, considerado inventor do primeiro telefone celular comercial.",
                    "completa": "Martin Lawrence Cooper (1928-) é um engenheiro americano pioneiro e inventor da telefonia móvel. Trabalhando na Motorola, Cooper liderou a equipe que desenvolveu o primeiro telefone celular portátil, o DynaTAC 8000x. Em 3 de abril de 1973, Cooper fez a primeira chamada de telefone celular público da história, ligando para um rival da Bell Labs enquanto caminhava pelas ruas de Nova York. Esta demonstração revolucionária marcou o início da era da comunicação móvel pessoal, transformando fundamentalmente como o mundo se comunica.",
                    "referencias": [
                        "Cooper, Martin. Cutting the Cord: The Cell Phone Has Transformed Humanity. Greenleaf Book Group, 2020.",
                        "Young, Jeffrey S. The Art of the DynaTAC. IEEE Spectrum, 2003."
                    ]
                }
            },
            {
                "codigo": "T-MR13",
                "nome": "PASCAL",
                "coordenadas": { "x": 4297, "y": 3857 },
                "andar": "terreo",
                "codigoOutlook": "_R_BNU_MR_T_PASCAL_13",
                "capacidade": 4,
                "equipamentos": "TV, Wireless",
                "biografia": "Blaise Pascal (1623-1662) foi um matemático, físico e filósofo francês que fez contribuições fundamentais para a matemática e física, incluindo o conceito de pressão atmosférica."
            },
            {
                "codigo": "T-MR15",
                "nome": "LOVELACE",
                "coordenadas": { "x": 6600, "y": 3875 },
                "andar": "terreo",
                "codigoOutlook": "_R_BNU_MR_T_LOVELACE_15",
                "capacidade": 8,
                "equipamentos": "TV, Wireless e Spiker",
                "biografia": {
                    "resumo": "Ada Lovelace (1815-1852) foi uma matemática britânica considerada a primeira programadora de computador da história, criando o primeiro algoritmo processado por uma máquina.",
                    "completa": "Augusta Ada King, Condessa de Lovelace (1815-1852), conhecida como Ada Lovelace, foi uma matemática e escritora inglesa. Filha do poeta Lord Byron, Ada é reconhecida como a primeira pessoa a escrever um algoritmo destinado a ser processado por uma máquina, especificamente a Máquina Analítica de Charles Babbage. Suas 'Notas' sobre a máquina incluem o que é considerado o primeiro programa de computador da história. Ela visionariamente compreendeu que as máquinas poderiam ir além de meros cálculos numéricos, prevendo aplicações em música e arte.",
                    "referencias": [
                        "Toole, Betty Alexandra. Ada, the Enchantress of Numbers. Strawberry Press, 1998.",
                        "Lovelace, Ada. Notes on the Analytical Engine. Scientific Memoirs, 1843."
                    ]
                }
            },
            {
                "codigo": "T-MR17",
                "nome": "BABBAGE",
                "coordenadas": { "x": 4753, "y": 4390 },
                "andar": "terreo",
                "codigoOutlook": "_R_BNU_MR_T_BABBAGE_17",
                "capacidade": 6,
                "equipamentos": "TV, Wireless",
                "biografia": {
                    "resumo": "Charles Babbage (1791-1871) foi um matemático e inventor inglês que concebeu a primeira máquina de calcular automática, precursora dos computadores modernos.",
                    "completa": "Charles Babbage (1791-1871) foi um matemático, inventor e engenheiro mecânico inglês que originou o conceito de um computador digital programável. Professor Lucasiano de Matemática na Universidade de Cambridge, Babbage é mais lembrado por projetar a Máquina Diferencial e a Máquina Analítica. A Máquina Analítica, em particular, é considerada o primeiro design para um computador mecânico de uso geral. Embora nunca totalmente construída durante sua vida devido às limitações da engenharia da época, seus projetos continham todos os elementos lógicos de um computador moderno.",
                    "referencias": [
                        "Swade, Doron. The Difference Engine: Charles Babbage and the Quest to Build the First Computer. Penguin Books, 2001.",
                        "Babbage, Charles. Passages from the Life of a Philosopher. Longman & Co, 1864."
                    ]
                }
            },
            {
                "codigo": "T-MR19",
                "nome": "STROUSTRUP",
                "coordenadas": { "x": 4400, "y": 4476 },
                "andar": "terreo",
                "codigoOutlook": "_R_BNU_MR_T_STROUSTRUP_19",
                "capacidade": 8,
                "equipamentos": "TV, Wireless",
                "biografia": "Bjarne Stroustrup (1950-) é um cientista da computação dinamarquês criador da linguagem de programação C++, uma das linguagens mais influentes da computação."
            },
            {
                "codigo": "T-MR21",
                "nome": "LERDORF",
                "coordenadas": { "x": 4022, "y": 4545 },
                "andar": "terreo",
                "codigoOutlook": "_R_BNU_MR_T_LERDORF_21",
                "capacidade": 12,
                "equipamentos": "TV, Wireless e Spiker",
                "biografia": "Rasmus Lerdorf (1968-) é um programador dinamarquês-canadense criador da linguagem PHP, amplamente utilizada no desenvolvimento web."
            },
            {
                "codigo": "T-MR23",
                "nome": "CHAMBERLIN",
                "coordenadas": { "x": 3292, "y": 4390 },
                "andar": "terreo",
                "codigoOutlook": "_R_BNU_MR_T_CHAMBERLIN_23",
                "capacidade": 6,
                "equipamentos": "TV, Wireless",
                "biografia": "Donald Chamberlin (1944-) é um cientista da computação americano co-criador da linguagem SQL, padrão para bancos de dados relacionais."
            },
            {
                "codigo": "T-MR25",
                "nome": "COHEN",
                "coordenadas": { "x": 3292, "y": 4751 },
                "andar": "terreo",
                "codigoOutlook": "_R_BNU_MR_T_COHEN_25",
                "capacidade": 6,
                "equipamentos": "TV, Wireless",
                "biografia": "Fred Cohen (1956-) é um cientista da computação americano pioneiro no estudo de vírus de computador e segurança da informação."
            },
            {
                "codigo": "T-MR27",
                "nome": "KAY",
                "coordenadas": { "x": 3653, "y": 4648 },
                "andar": "terreo",
                "codigoOutlook": "_R_BNU_MR_T_KAY_27",
                "capacidade": 8,
                "equipamentos": "TV, Wireless",
                "biografia": "Alan Kay (1940-) é um cientista da computação americano pioneiro na programação orientada a objetos e nas interfaces gráficas de usuário."
            },
            {
                "codigo": "T-MR29",
                "nome": "TORVALDS",
                "coordenadas": { "x": 4761, "y": 4751 },
                "andar": "terreo",
                "codigoOutlook": "_R_BNU_MR_T_TORVALDS_29",
                "capacidade": 6,
                "equipamentos": "Trancada",
                "biografia": "Linus Torvalds (1969-) é um engenheiro de software finlandês criador do sistema operacional Linux e do sistema de controle de versão Git."
            },
            {
                "codigo": "T-MR31",
                "nome": "HIPOCRATES",
                "coordenadas": { "x": 3971, "y": 5876 },
                "andar": "terreo",
                "codigoOutlook": "_R_BNU_MR_T_HIPOCRATES_31",
                "capacidade": 4,
                "equipamentos": "TV, Wireless",
                "biografia": "Hipócrates (460-370 a.C.) foi um médico grego considerado o 'Pai da Medicina', estabelecendo a medicina como disciplina distinta e criando o juramento hipocrático."
            },
            {
                "codigo": "T-MR33",
                "nome": "PASTEUR",
                "coordenadas": { "x": 3971, "y": 6169 },
                "andar": "terreo",
                "codigoOutlook": "_R_BNU_MR_T_PASTEUR_33",
                "capacidade": 4,
                "equipamentos": "TV, Wireless",
                "biografia": "Louis Pasteur (1822-1895) foi um químico e microbiologista francês cujas descobertas tiveram enorme importância na história da medicina e da microbiologia."
            },
            {
                "codigo": "T-MR35",
                "nome": "FREUD",
                "coordenadas": { "x": 3962, "y": 6504 },
                "andar": "terreo",
                "codigoOutlook": "_R_BNU_MR_T_FREUD_35",
                "capacidade": 6,
                "equipamentos": "Fechada",
                "biografia": "Sigmund Freud (1856-1939) foi um neurologista austríaco fundador da psicanálise, revolucionando nossa compreensão da mente humana."
            },
            // Salas de Apresentação
            {
                "codigo": "T-PR01",
                "nome": "VIRCHOW",
                "coordenadas": { "x": 6093, "y": 3866 },
                "andar": "terreo",
                "codigoOutlook": "_R_BNU_PR_T_VIRCHOW_01",
                "capacidade": 12,
                "equipamentos": "2 TV, Wireless e Spikers",
                "biografia": "Rudolf Virchow (1821-1902) foi um médico alemão conhecido como o 'Pai da Patologia Moderna', estabelecendo que todas as células vêm de células preexistentes."
            },
            {
                "codigo": "T-PR02",
                "nome": "HAWKING",
                "coordenadas": { "x": 945, "y": 1942 },
                "andar": "terreo",
                "codigoOutlook": "_R_BNU_PR_T_HAWKING_02",
                "capacidade": 12,
                "equipamentos": "2 TV, Wireless e Spikers",
                "biografia": "Stephen Hawking (1942-2018) foi um físico teórico inglês conhecido por suas contribuições à cosmologia e buracos negros, autor de 'Uma Breve História do Tempo'."
            },
            {
                "codigo": "T-PR04",
                "nome": "CHAGAS",
                "coordenadas": { "x": 945, "y": 3608 },
                "andar": "terreo",
                "codigoOutlook": "_R_BNU_PR_T_CHAGAS_04",
                "capacidade": 12,
                "equipamentos": "2 TV, Wireless, Equipamento para Conferencia e Spiker",
                "biografia": "Carlos Chagas (1879-1934) foi um médico e pesquisador brasileiro que descobriu a doença de Chagas, sendo o único cientista a descrever completamente uma doença infecciosa."
            },
            // Salas de Treinamento
            {
                "codigo": "T-TR01",
                "nome": "GALILEI",
                "coordenadas": { "x": 4632, "y": 2706 },
                "andar": "terreo",
                "codigoOutlook": "_R_BNU_TR_T_GALILEI_01",
                "capacidade": 20,
                "equipamentos": "2 TV, Wireless, Conexão LAN, Projetor e Spiker",
                "biografia": "Galileu Galilei (1564-1642) foi um físico, matemático e astrônomo italiano fundamental para a revolução científica, conhecido como 'Pai da Ciência Moderna'."
            },
            {
                "codigo": "T-TR03",
                "nome": "OSLER",
                "coordenadas": { "x": 4667, "y": 3686 },
                "andar": "terreo",
                "codigoOutlook": "_R_BNU_TR_T_OSLER_03",
                "capacidade": 12,
                "equipamentos": "TV, Wireless, Projetor",
                "biografia": "William Osler (1849-1919) foi um médico canadense considerado um dos fundadores da medicina moderna, criando o sistema de residência médica."
            },
            {
                "codigo": "T-TR05",
                "nome": "LUTZ",
                "coordenadas": { "x": 3541, "y": 3694 },
                "andar": "terreo",
                "codigoOutlook": "_R_BNU_TR_T_LUTZ_05",
                "capacidade": 18,
                "equipamentos": "2 TV, Wireless, Projetor",
                "biografia": "Adolfo Lutz (1855-1940) foi um médico e cientista brasileiro pioneiro em medicina tropical e microbiologia, considerado pai da medicina tropical no Brasil."
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
        
        const roomsHTML = sortedRooms.map(room => {
            // CORREÇÃO COPILOT: Usar resumo da biografia para tooltip quando disponível
            // MOTIVO: Melhor experiência do usuário com resumo otimizado para tooltip
            const tooltipText = typeof room.biografia === 'object' && room.biografia.resumo 
                ? room.biografia.resumo 
                : room.biografia;
                
            return `
                <div class="room-item" data-room="${room.nome}" tabindex="0" role="button" aria-label="Selecionar sala ${room.nome}" title="${tooltipText}">
                    <div class="room-header">
                        <strong class="room-name">${room.nome}</strong>
                        <span class="room-hint">💡</span>
                    </div>
                </div>
            `;
        }).join('');
        
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
                    <strong>Andar:</strong> Térreo
                </div>
                <div class="room-biography">
                    <strong>Biografia:</strong>
                    ${biografiaContent}
                </div>
                <div class="room-actions">
                    <button class="detail-btn" onclick="terreoRooms.centerOnRoom('${room.nome}')">
                        🎯 Centralizar no Mapa
                    </button>
                    <button class="detail-btn" onclick="terreoRooms.copyRoomInfo('${room.nome}')">
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
            return `<p class="biography-summary">${room.biografia}</p>`;
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
        
        // Position marker (centralizado exatamente no pixel da coordenada)
        marker.style.left = `${Math.round(displayX)}px`;
        marker.style.top = `${Math.round(displayY)}px`;
        marker.style.transform = 'translate(-50%, -50%)';   
        
        // Add content and tooltip with intelligent positioning
        marker.innerHTML = `
            <span class="marker-label">${room.nome}</span>
            <div class="marker-tooltip" id="tooltip-${room.nome}">
                <strong>${room.nome}</strong><br>
                Andar: Térreo
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
        
        console.log(`Added marker for ${room.nome} at scaled coordinates (${displayX.toFixed(1)}, ${displayY.toFixed(1)}) from original (${room.coordenadas.x}, ${room.coordenadas.y})`);
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
Andar: Térreo
        
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

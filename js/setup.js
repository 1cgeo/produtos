
const SUBTITLE_STATES = [
    {
        id: 1,
        name: 'Não mapeado',
        color: 'rgb(255,255,255)'
    },
    {
        id: 2,
        name: 'Concluído',
        color: 'rgb(145,207,96)'
    },
    {
        id: 3,
        name: 'Múltiplas edições',
        color: 'rgb(102,178,255)'
    }
]

const INIT_ZOOM = {
    center: [-53.99235736195203, -27.426307807866984],
    zoom: 4.83
}

var PROJECTS = {
    'plano-desenvolvimento': {
        title: 'Plano de Desenvolvimento da Doutrina Militar Terrestre 2022',
        group: "Situação Geral",
        description: `O objetivo do presente projeto consiste na elaboração de produtos para atender as demandas constantes no Anexo E - Programa de Difusão de Produtos e Serviços de Geoinformação, do PDDMT.`,
        lotes: [
            {
                name: 'pddmt-sub-meta-a-carta-orto-50k-pr',
                subtitle: 'Carta Ortoimagem 1:50.000 no PR',
                description: `Construção de 76 cartas ortoimagem na escala 1:50.000 visando atender o planejamento de operações no Lago de Itaipu para o CMS.`,
                zoom: [
                    [-55.06047536706811, -26.185466546679336], // southwestern corner of the bounds
                    [-52.33035587933817, -23.8751537623843] // northeastern corner of the bounds
                ],
                legend: [
                    1,
                    2,
                    3
                ],
                styles: [
                    {
                        'id': 'pddmt-sub-meta-a-carta-orto-50k-pr-fill',
                        'source': 'pddmt-sub-meta-a-carta-orto-50k-pr',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.4
                        }
                    },
                    {
                        'id': 'pddmt-sub-meta-a-carta-orto-50k-pr-border',
                        'source': 'pddmt-sub-meta-a-carta-orto-50k-pr',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'pddmt-sub-meta-a-carta-orto-50k-pr-text',
                        'source': 'pddmt-sub-meta-a-carta-orto-50k-pr',
                        "type": "symbol",
                        "minzoom": 7.99,
                        "maxzoom": 10,
                        'layout': {
                            'text-field': [
                                'format', 
                                ['get', 'identificador'],
                                '\n',
                                ['get', 'data', ['at', 0, ['get', 'edicoes']]]
                            ]
                        },
                        'paint': {

                        }
                    }
                ]
            }
        ]
    },   
    'mapeamento-interesse-da-forca': {
        title: 'Mapeamento de Áreas de Interesse da Força Terrestre 2022',
        group: "Entregas",
        description: `O objetivo do presente projeto consiste na elaboração de cartas ortoimagens em escalas
        entre 1:25.000 e 1:250.000 de áreas de interesse da Força Terrestre pelo território nacional. A Área de
        Suprimento Cartográfico (ASC) do 1º Centro de Geoinformação (1º CGEO) corresponde à área de
        responsabilidade do Comando Militar do Sul (CMS), abrangendo os estados do Rio Grande do Sul, Santa Catarina
        e Paraná. Dessa forma, o 1º CGEO será responsável por executar esse projeto em sua respectiva área de
        responsabilidade.`,
        lotes: [
            {
                name: 'mapintfter-sub-meta-a1-carta-topo-25k-florianopolis',
                subtitle: 'Carta Topográfica 1:25.000 de Florianópolis',
                description: `Construção de 09 cartas topográficas na escala 1:25.000 visando atender a atualização das capitais do ASC.`,
                zoom: [
                    [-48.82809677372772, -28.05547382461215], // southwestern corner of the bounds
                    [-48.046903497479974, -27.1945079332596] // northeastern corner of the bounds
                ],
                legend: [
                    1,
                    2,
                    3
                ],
                styles: [
                    {
                        'id': 'mapintfter-sub-meta-a1-carta-topo-25k-florianopolis-fill',
                        'source': 'mapintfter-sub-meta-a1-carta-topo-25k-florianopolis',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.7
                        }
                    },
                    {
                        'id': 'mapintfter-sub-meta-a1-carta-topo-25k-florianopolis-border',
                        'source': 'mapintfter-sub-meta-a1-carta-topo-25k-florianopolis',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'mapintfter-sub-meta-a1-carta-topo-25k-florianopolis-text',
                        'source': 'mapintfter-sub-meta-a1-carta-topo-25k-florianopolis',
                        "type": "symbol",
                        "maxzoom": 10,
                        "minzoom": 8.86,
                        'layout': {
                            'text-field': [
                                'format', 
                                ['get', 'identificador'],
                                '\n',
                                ['get', 'data', ['at', 0, ['get', 'edicoes']]]
                            ]

                        },
                        'paint': {

                        }
                    }
                ]
            }
        ]
    },
    
}
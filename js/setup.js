
const SUBTITLE_STATES = [
    {
        id: 1,
        name: 'Não mapeado',
        color: 'rgba(255,255,255,0.0)'
    },
    {
        id: 2,
        name: 'Concluído',
        color: 'rgba(145,207,96,0.5)'
    },
    {
        id: 3,
        name: 'Múltiplas edições',
        color: 'rgba(102,178,255,0.5)'
    }
]

const INIT_ZOOM = {
    center: [-53.99235736195203, -27.426307807866984],
    zoom: 4.83
}

var PROJECTS = {
    'situacao-geral': {
        title: 'Situação Geral da Área de Suprimento Cartográfico de responsabilidade do 1º CGEO',
        group: "Situação Geral",
        description: `Apresenta a situação dos produtos existentes na área de responsabilidade do 1º CGEO, indicando ainda o ano de produção da carta.`,
        lotes: [
            {
                name: 'situacao_geral_25k',
                subtitle: 'Carta Topográfica 1:25.000',
                description: `Ao aproximar é possível ver o ano de mapeamento da carta. Se a carta possuir mais de uma edição, ao clicar será mostrado os anos que a carta possui edição`,
                zoom: [
                    [-58.00, -34.00], // southwestern corner of the bounds
                    [-47.875, -22.875] // northeastern corner of the bounds
                ],
                legend: [
                    1,
                    2,
                    3
                ],
                styles: [
                    {
                        'id': 'situacao_geral_25k-fill',
                        'source': 'situacao_geral_25k',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            
                        }
                    },
                    {
                        'id': 'situacao_geral_25k-border',
                        'source': 'situacao_geral_25k',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'situacao_geral_25k-text',
                        'source': 'situacao_geral_25k',
                        "type": "symbol",
                        "minzoom": 8.5,
                        "maxzoom": 15,
                        'layout': {
                            'text-field': [
                                'concat',
                                'MI ', 
                                ['get', 'identificador'],
                                '\n',
                                [
                                    'case',
                                    ['>', ['length', ['get', 'edicoes']], 0],
                                    ['at', 0, ['get', 'edicoes']],
                                    ''
                                ]
                            ]
                        },
                        'paint': {

                        }
                    }
                ]
            },
            {
                name: 'situacao_geral_50k',
                subtitle: 'Carta Topográfica 1:50.000',
                description: `Ao aproximar é possível ver o ano de mapeamento da carta. Se a carta possuir mais de uma edição, ao clicar será mostrado os anos que a carta possui edição`,
                zoom: [
                    [-58.125, -34.125], // southwestern corner of the bounds
                    [-47.875, -22.875] // northeastern corner of the bounds
                ],
                legend: [
                    1,
                    2,
                    3
                ],
                styles: [
                    {
                        'id': 'situacao_geral_50k-fill',
                        'source': 'situacao_geral_50k',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            
                        }
                    },
                    {
                        'id': 'situacao_geral_50k-border',
                        'source': 'situacao_geral_50k',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'situacao_geral_50k-text',
                        'source': 'situacao_geral_50k',
                        "type": "symbol",
                        "minzoom": 8.5,
                        "maxzoom": 15,
                        'layout': {
                            'text-field': [
                                'concat', 
                                'MI ',
                                ['get', 'identificador'],
                                '\n',
                                [
                                    'case',
                                    ['>', ['length', ['get', 'edicoes']], 0],
                                    ['at', 0, ['get', 'edicoes']],
                                    ''
                                ]
                            ]
                        },
                        'paint': {

                        }
                    }
                ]
            },
            {
                name: 'situacao_geral_100k',
                subtitle: 'Carta Topográfica 1:100.000',
                description: `Ao aproximar é possível ver o ano de mapeamento da carta. Se a carta possuir mais de uma edição, ao clicar será mostrado os anos que a carta possui edição`,
                zoom: [
                    [-58.250, -34.125], // southwestern corner of the bounds
                    [-47.875, -22.875] // northeastern corner of the bounds
                ],
                legend: [
                    1,
                    2,
                    3
                ],
                styles: [
                    {
                        'id': 'situacao_geral_100k-fill',
                        'source': 'situacao_geral_100k',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            
                        }
                    },
                    {
                        'id': 'situacao_geral_100k-border',
                        'source': 'situacao_geral_100k',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'situacao_geral_100k-text',
                        'source': 'situacao_geral_100k',
                        "type": "symbol",
                        "minzoom": 8.5,
                        "maxzoom": 15,
                        'layout': {
                            'text-field': [
                                'concat', 
                                'MI ',
                                ['get', 'identificador'],
                                '\n',
                                [
                                    'case',
                                    ['>', ['length', ['get', 'edicoes']], 0],
                                    ['at', 0, ['get', 'edicoes']],
                                    ''
                                ]
                            ]
                        },
                        'paint': {

                        }
                    }
                ]
            },
            {
                name: 'situacao_geral_250k',
                subtitle: 'Carta Topográfica 1:250.000',
                description: `Ao aproximar é possível ver o ano de mapeamento da carta. Se a carta possuir mais de uma edição, ao clicar será mostrado os anos que a carta possui edição`,
                zoom: [
                    [-58.625, -34.125], // southwestern corner of the bounds
                    [-47.875, -22.875] // northeastern corner of the bounds
                ],
                legend: [
                    1,
                    2,
                    3
                ],
                styles: [
                    {
                        'id': 'situacao_geral_250k-fill',
                        'source': 'situacao_geral_250k',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            
                        }
                    },
                    {
                        'id': 'situacao_geral_250k-border',
                        'source': 'situacao_geral_250k',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'situacao_geral_250k-text',
                        'source': 'situacao_geral_250k',
                        "type": "symbol",
                        "minzoom": 8.5,
                        "maxzoom": 15,
                        'layout': {
                            'text-field': [
                                'concat', 
                                'MIR ',
                                ['get', 'identificador'],
                                '\n',
                                [
                                    'case',
                                    ['>', ['length', ['get', 'edicoes']], 0],
                                    ['at', 0, ['get', 'edicoes']],
                                    ''
                                ]
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
                        "maxzoom": 10.90,
                        "minzoom": 8.86,
                        'layout': {
                            'text-field': [
                                'format', 
                                ['get', 'identificador'],
                                '\n',
                                [
                                    'case',
                                    ['>', ['length', ['get', 'edicoes']], 0],
                                    ['at', 0, ['get', 'edicoes']],
                                    ''
                                ]
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
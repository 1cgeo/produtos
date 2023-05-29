
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
    'situacao-geral-25k': {
        title: 'Situação Geral 1:25.000',
        group: "Situação Geral",
        description: `Apresenta a situação dos produtos existentes na área de responsabilidade do 1º CGEO, na escala 1:25.000. Ao aproximar é possível ver o ano de mapeamento da carta. Se a carta possuir mais de uma edição, ao clicar serão mostrados os anos que a carta possui edição`,
        lotes: [
            {
                name: 'situacao-geral-ct-25k',
                subtitle: 'Carta Topográfica 1:25.000',
                description: ``,
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
                        'id': 'situacao-geral-ct-25k-fill',
                        'source': 'situacao-geral-ct-25k',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            
                        }
                    },
                    {
                        'id': 'situacao-geral-ct-25k-border',
                        'source': 'situacao-geral-ct-25k',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'situacao-geral-ct-25k-text',
                        'source': 'situacao-geral-ct-25k',
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
            }
        ]
    },
    'situacao-geral-50k': {
        title: 'Situação Geral 1:50.000',
        group: "Situação Geral",
        description: `Apresenta a situação dos produtos existentes na área de responsabilidade do 1º CGEO, na escala 1:25.000. Ao aproximar é possível ver o ano de mapeamento da carta. Se a carta possuir mais de uma edição, ao clicar serão mostrados os anos que a carta possui edição`,
        lotes: [
            {
                name: 'situacao-geral-ct-50k',
                subtitle: 'Carta Topográfica 1:50.000',
                description: ``,
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
                        'id': 'situacao-geral-ct-50k-fill',
                        'source': 'situacao-geral-ct-50k',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            
                        }
                    },
                    {
                        'id': 'situacao-geral-ct-50k-border',
                        'source': 'situacao-geral-ct-50k',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'situacao-geral-ct-50k-text',
                        'source': 'situacao-geral-ct-50k',
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
            }
        ]
    },
    'situacao-geral-100k': {
        title: 'Situação Geral 1:100.000',
        group: "Situação Geral",
        description: `Apresenta a situação dos produtos existentes na área de responsabilidade do 1º CGEO, na escala 1:25.000. Ao aproximar é possível ver o ano de mapeamento da carta. Se a carta possuir mais de uma edição, ao clicar serão mostrados os anos que a carta possui edição`,
        lotes: [
            {
                name: 'situacao-geral-ct-100k',
                subtitle: 'Carta Topográfica 1:100.000',
                description: ``,
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
                        'id': 'situacao-geral-ct-100k-fill',
                        'source': 'situacao-geral-ct-100k',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            
                        }
                    },
                    {
                        'id': 'situacao-geral-ct-100k-border',
                        'source': 'situacao-geral-ct-100k',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'situacao-geral-ct-100k-text',
                        'source': 'situacao-geral-ct-100k',
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
            }
        ]
    },
    'situacao-geral-250k': {
        title: 'Situação Geral 1:250.000',
        group: "Situação Geral",
        description: `Apresenta a situação dos produtos existentes na área de responsabilidade do 1º CGEO, na escala 1:25.000. Ao aproximar é possível ver o ano de mapeamento da carta. Se a carta possuir mais de uma edição, ao clicar serão mostrados os anos que a carta possui edição`,
        lotes: [
            {
                name: 'situacao-geral-ct-250k',
                subtitle: 'Carta Topográfica 1:250.000',
                description: ``,
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
                        'id': 'situacao-geral-ct-250k-fill',
                        'source': 'situacao-geral-ct-250k',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            
                        }
                    },
                    {
                        'id': 'situacao-geral-ct-250k-border',
                        'source': 'situacao-geral-ct-250k',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'situacao-geral-ct-250k-text',
                        'source': 'situacao-geral-ct-250k',
                        "type": "symbol",
                        "minzoom": 6,
                        "maxzoom": 9.5,
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
        subgroup: "2022",
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
    //2022
    //Itaipu Orto 50k - 76 a ser carregado 
    //SC 100k - 07 em Jul
    //RS 50k - 37 em Jun
}
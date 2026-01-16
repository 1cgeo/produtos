
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

const SUBTITLE_STATES_BORDER = [
    {
        id: 1,
        name: 'Não mapeado',
        color: '#121211',
        width: 0.5,
        offset: 1
    },
    {
        id: 2,
        name: 'Concluído',
        color: 'rgba(145,207,96,1)',
        width: 5,
        offset: 3.5
    },
    {
        id: 3,
        name: 'Múltiplas edições',
        color: 'rgba(102,178,255,1)',
        width: 5,
        offset: 3.5
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
        description: `Apresenta a situação dos produtos existentes na área de responsabilidade do 1º CGEO, na escala 1:25.000. Ao aproximar é possível ver o ano de mapeamento da carta. Se a carta possuir mais de uma edição, ao clicar serão mostrados os anos que a carta possui edição.`,
        lotes: [
            {
                name: 'situacao-geral-ct-25k',
                subtitle: 'Cartas 1:25.000',
                description: ``,
                legend: [1, 2, 3],
                styles: [
                    {
                        'id': 'situacao-geral-ct-25k-fill',
                        'source': 'situacao-geral-ct-25k',
                        'type': 'fill',
                        'layout': {},
                        'paint': {}
                    },
                    {
                        'id': 'situacao-geral-ct-25k-border',
                        'source': 'situacao-geral-ct-25k',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#32a852',
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
                                ['get', 'identificadorMI'],
                                '\n',
                                'INOM ',
                                ['get', 'identificadorINOM'],
                                '\n',
                                [
                                    'case',
                                    ['>', ['length', ['get', 'edicoes_topo']], 0],
                                    ['at', 0, ['get', 'edicoes_topo']],
                                    ''
                                ]
                            ]
                        },
                        'paint': {}
                    }
                ]
            }
        ]
    },
    'situacao-geral-50k': {
        title: 'Situação Geral 1:50.000',
        group: "Situação Geral",
        description: `Apresenta a situação dos produtos existentes na área de responsabilidade do 1º CGEO, na escala 1:50.000.`,
        lotes: [
            {
                name: 'situacao-geral-ct-50k',
                subtitle: 'Cartas 1:50.000',
                description: ``,
                legend: [1, 2, 3],
                styles: [
                    {
                        'id': 'situacao-geral-ct-50k-fill',
                        'source': 'situacao-geral-ct-50k',
                        'type': 'fill',
                        'layout': {},
                        'paint': {}
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
                                ['get', 'identificadorMI'],
                                '\n',
                                'INOM ',
                                ['get', 'identificadorINOM'],
                                '\n',
                                [
                                    'case',
                                    ['>', ['length', ['get', 'edicoes_topo']], 0],
                                    ['at', 0, ['get', 'edicoes_topo']],
                                    ''
                                ]
                            ]
                        },
                        'paint': {}
                    }
                ]
            }
        ]
    },
    'situacao-geral-100k': {
        title: 'Situação Geral 1:100.000',
        group: "Situação Geral",
        description: `Apresenta a situação dos produtos existentes na área de responsabilidade do 1º CGEO, na escala 1:100.000.`,
        lotes: [
            {
                name: 'situacao-geral-ct-100k',
                subtitle: 'Cartas 1:100.000',
                description: ``,
                legend: [1, 2, 3],
                styles: [
                    {
                        'id': 'situacao-geral-ct-100k-fill',
                        'source': 'situacao-geral-ct-100k',
                        'type': 'fill',
                        'layout': {},
                        'paint': {}
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
                                ['get', 'identificadorMI'],
                                '\n',
                                'INOM ',
                                ['get', 'identificadorINOM'],
                                '\n',
                                [
                                    'case',
                                    ['>', ['length', ['get', 'edicoes_topo']], 0],
                                    ['at', 0, ['get', 'edicoes_topo']],
                                    ''
                                ]
                            ]
                        },
                        'paint': {}
                    }
                ]
            }
        ]
    },
    'situacao-geral-250k': {
        title: 'Situação Geral 1:250.000',
        group: "Situação Geral",
        description: `Apresenta a situação dos produtos existentes na área de responsabilidade do 1º CGEO, na escala 1:250.000.`,
        lotes: [
            {
                name: 'situacao-geral-ct-250k',
                subtitle: 'Cartas 1:250.000',
                description: ``,
                legend: [1, 2, 3],
                styles: [
                    {
                        'id': 'situacao-geral-ct-250k-fill',
                        'source': 'situacao-geral-ct-250k',
                        'type': 'fill',
                        'layout': {},
                        'paint': {}
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
                                ['get', 'identificadorMI'],
                                '\n',
                                'INOM ',
                                ['get', 'identificadorINOM'],
                                '\n',
                                [
                                    'case',
                                    ['>', ['length', ['get', 'edicoes_topo']], 0],
                                    ['at', 0, ['get', 'edicoes_topo']],
                                    ''
                                ]
                            ]
                        },
                        'paint': {}
                    }
                ]
            }
        ]
    },
    'carta-topografica-2025': {
        title: 'Carta Topográfica 2025',
        group: "Entregas",
        subgroup: "2025",
        description: '',
        lotes: [
            { // CT 25k
                name: 'ct-2025-25k',
                subtitle: '1:25.000',
                description: '43 cartas na escala 1:25.000, com destaque para 25 destas na fronteira de Foz do Iguaçu.',
                legend: [2],
                styles: [
                    {
                        'id': 'ct-2025-25k-fill',
                        'source': 'ct-2025-25k',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'ct-2025-25k-border',
                        'source': 'ct-2025-25k',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'ct-2025-25k-text',
                        'source': 'ct-2025-25k',
                        "type": "symbol",
                        "maxzoom": 10,
                        'layout': {
                            'text-field': ['to-string', ['get', 'identificadorMI']]
                        },
                        'paint': {}
                    }
                ]
            },
            { // CT 50k
                name: 'ct-2025-50k',
                subtitle: '1:50.000',
                description: '42 cartas na escala 1:50.000, sendo destas, 33 na região sul do Estado do Rio Grande do Sul.',
                legend: [2],
                styles: [
                    {
                        'id': 'ct-2025-50k-fill',
                        'source': 'ct-2025-50k',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'ct-2025-50k-border',
                        'source': 'ct-2025-50k',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'ct-2025-50k-text',
                        'source': 'ct-2025-50k',
                        "type": "symbol",
                        "maxzoom": 10,
                        'layout': {
                            'text-field': ['to-string', ['get', 'identificadorMI']]
                        },
                        'paint': {}
                    }
                ]
            },
            { // CT 100k
                name: 'ct-2025-100k',
                subtitle: '1:100.000',
                description: '3 cartas na escala 1:100.000 na região de Três Barras - SC e do Campo de Instrução Marechal Hermes (CIMH)',
                legend: [2],
                styles: [
                    {
                        'id': 'ct-2025-100k-fill',
                        'source': 'ct-2025-100k',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'ct-2025-100k-border',
                        'source': 'ct-2025-100k',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'ct-2025-100k-text',
                        'source': 'ct-2025-100k',
                        "type": "symbol",
                        "maxzoom": 10,
                        'layout': {
                            'text-field': ['to-string', ['get', 'identificadorMI']]
                        },
                        'paint': {}
                    }
                ]
            },
        ]
    },
    'carta-ortoimagem-2025': {
        title: 'Carta Ortoimagem 2025',
        group: "Entregas",
        subgroup: "2025",
        description: '',
        lotes: [
            { // CO 25k
                name: 'co-2025-25k',
                subtitle: '1:25.000',
                description: '87 cartas na escala 1:25.000 nos três estados do Comando Militar do Sul, com o objetivo de atender demandas de OM e atualizar a base de dados da DSG.',
                legend: [2],
                styles: [
                    {
                        'id': 'co-2025-25k-fill',
                        'source': 'co-2025-25k',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'co-2025-25k-border',
                        'source': 'co-2025-25k',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'co-2025-25k-text',
                        'source': 'co-2025-25k',
                        "type": "symbol",
                        "maxzoom": 10,
                        'layout': {
                            'text-field': ['to-string', ['get', 'identificadorMI']]
                        },
                        'paint': {}
                    }
                ]
            },
            { // CO 50k
                name: 'co-2025-50k',
                subtitle: '1:50.000',
                description: '102 cartas na escala 1:50.000 nos três estados do Comando Militar do Sul, com o objetivo de atender demandas de OM e atualizar a base de dados da DSG',
                legend: [2],
                styles: [
                    {
                        'id': 'co-2025-50k-fill',
                        'source': 'co-2025-50k',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'co-2025-50k-border',
                        'source': 'co-2025-50k',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'co-2025-50k-text',
                        'source': 'co-2025-50k',
                        "type": "symbol",
                        "maxzoom": 10,
                        'layout': {
                            'text-field': ['to-string', ['get', 'identificadorMI']]
                        },
                        'paint': {}
                    }
                ]
            },
            { // CO 100k
                name: 'co-2025-100k',
                subtitle: '1:100.000',
                description: '2 cartas na escala 1:100.000 nas cidades de Guarapuava e Ponta Grossa, no Estado do Paraná',
                legend: [2],
                styles: [
                    {
                        'id': 'co-2025-100k-fill',
                        'source': 'co-2025-100k',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'co-2025-100k-border',
                        'source': 'co-2025-100k',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'co-2025-100k-text',
                        'source': 'co-2025-100k',
                        "type": "symbol",
                        "maxzoom": 10,
                        'layout': {
                            'text-field': ['to-string', ['get', 'identificadorMI']]
                        },
                        'paint': {}
                    }
                ]
            },
        ]
    },
    'carta-topografica-2024': {
        title: 'Carta Topográfica 2024',
        group: "Entregas",
        subgroup: "2024",
        description: '',
        lotes: [
            { // CT 25k - CIR, CISM, CIBSB e CIGC
                name: 'ct-2024-25k',
                subtitle: '1:25.000',
                description: '22 cartas na escala 1:25.000, no contexto de atualização das cartas dos Campos de Instrução do Comando Militar do Sul: CIR, CIBSB, CISM e CIGC.',
                legend: [2],
                styles: [
                    {
                        'id': 'ct-2024-25k-fill',
                        'source': 'ct-2024-25k',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'ct-2024-25k-border',
                        'source': 'ct-2024-25k',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'ct-2024-25k-text',
                        'source': 'ct-2024-25k',
                        "type": "symbol",
                        "maxzoom": 10,
                        'layout': {
                            'text-field': ['to-string', ['get', 'identificadorMI']]
                        },
                        'paint': {}
                    }
                ]
            },
            { // CT 50k
                name: 'ct-2024-50k',
                subtitle: '1:50.000',
                description: '5 cartas na escala 1:50.000, sendo estas nas seguintes localidades/regiões: Apiai - SP (1) e cidade de Curitiba - PR (4)',
                legend: [2],
                styles: [
                    {
                        'id': 'ct-2024-50k-fill',
                        'source': 'ct-2024-50k',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'ct-2024-50k-border',
                        'source': 'ct-2024-50k',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'ct-2024-50k-text',
                        'source': 'ct-2024-50k',
                        "type": "symbol",
                        "maxzoom": 10,
                        'layout': {
                            'text-field': ['to-string', ['get', 'identificadorMI']]
                        },
                        'paint': {}
                    }
                ]
            }
        ]
    },
    'carta-ortoimagem-2024': {
        title: 'Carta Ortoimagem 2024',
        group: "Entregas",
        subgroup: "2024",
        description: '',
        lotes: [
            { // CO 25k
                name: 'co-2024-25k',
                subtitle: '1:25.000',
                description: '43 cartas na escala 1:25.000 dos principais Campos de Instrução do CMS, visando atender demanandas de planejamento operacional.',
                legend: [2],
                styles: [
                    {
                        'id': 'co-2024-25k-fill',
                        'source': 'co-2024-25k',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'co-2024-25k-border',
                        'source': 'co-2024-25k',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'co-2024-25k-text',
                        'source': 'co-2024-25k',
                        "type": "symbol",
                        "maxzoom": 10,
                        'layout': {
                            'text-field': ['to-string', ['get', 'identificadorMI']]
                        },
                        'paint': {}
                    }
                ]
            },
            { // CO 50k - CIMH
                name: 'co-2024-50k',
                subtitle: '1:50.000',
                description: '7 cartas na escala 1:50.000 do Campo de Instrução Marechal Hermes, nos Estados de Santa Catarina e Paraná',
                legend: [2],
                styles: [
                    {
                        'id': 'co-2024-50k-fill',
                        'source': 'co-2024-50k',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'co-2024-50k-border',
                        'source': 'co-2024-50k',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'co-2024-50k-text',
                        'source': 'co-2024-50k',
                        "type": "symbol",
                        "maxzoom": 10,
                        'layout': {
                            'text-field': ['to-string', ['get', 'identificadorMI']]
                        },
                        'paint': {}
                    }
                ]
            }
        ]
    },
    'mapeamento-aman-esa-2024': {
        title: 'Projeto AMAN e ESA',
        group: "Entregas",
        subgroup: "2024",
        description: '',
        lotes: [
            { // CT 1:25.000 -- AMAN ESA
                name: 'aman_esa_2024_25k_topo',
                subtitle: 'Cartas Topográfica 1:25.000 da Região da AMAN-ESA',
                description: '3 cartas na escala 1:25.000 visando atender a demanda da DSG para apresentação de produtos cartográficos atualizados aos Cadetes da AMAN e aos Alunos da ESA.',
                legend: [
                    2
                ],
                styles: [
                    {
                        'id': 'aman_esa_2024_25k_topo-fill',
                        'source': 'aman_esa_2024_25k_topo',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'aman_esa_2024_25k_topo-border',
                        'source': 'aman_esa_2024_25k_topo',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'aman_esa_2024_25k_topo-text',
                        'source': 'aman_esa_2024_25k_topo',
                        "type": "symbol",
                        "maxzoom": 10,
                        'layout': {
                            'text-field': ['to-string', ['get', 'identificadorMI']]

                        },
                        'paint': {

                        }
                    }
                ]
            },
            { // CT 1:50.000 -- AMAN ESA
                name: 'aman_esa_2024_50k_topo',
                subtitle: 'Carta Topográfica 1:50.000 da Região da AMAN-ESA',
                description: '1 carta na escala 1:50.000 visando atender a demanda da DSG para apresentação de produtos cartográficos atualizados aos Cadetes da AMAN e aos Alunos da ESA.',
                legend: [
                    2
                ],
                styles: [
                    {
                        'id': 'aman_esa_2024_50k_topo-fill',
                        'source': 'aman_esa_2024_50k_topo',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'aman_esa_2024_50k_topo-border',
                        'source': 'aman_esa_2024_50k_topo',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'aman_esa_2024_50k_topo-text',
                        'source': 'aman_esa_2024_50k_topo',
                        "type": "symbol",
                        "maxzoom": 10,
                        'layout': {
                            'text-field': ['to-string', ['get', 'identificadorMI']]

                        },
                        'paint': {

                        }
                    }
                ]
            },
            { // CT 1:100.000 -- AMAN ESA
                name: 'aman_esa_2024_100k_topo',
                subtitle: 'Cartas Topográfica 1:100.000 da Região da AMAN-ESA',
                description: '2 cartas na escala 1:100.000 visando atender a demanda da DSG para apresentação de produtos cartográficos atualizados aos Cadetes da AMAN e aos Alunos da ESA.',
                legend: [
                    2
                ],
                styles: [
                    {
                        'id': 'aman_esa_2024_100k_topo-fill',
                        'source': 'aman_esa_2024_100k_topo',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'aman_esa_2024_100k_topo-border',
                        'source': 'aman_esa_2024_100k_topo',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'aman_esa_2024_100k_topo-text',
                        'source': 'aman_esa_2024_100k_topo',
                        "type": "symbol",
                        "maxzoom": 10,
                        'layout': {
                            'text-field': ['to-string', ['get', 'identificadorMI']]

                        },
                        'paint': {

                        }
                    }
                ]
            },
            { // CT 1:250.000 -- AMAN ESA
                name: 'aman_esa_2024_250k',
                subtitle: 'Carta Topográfica 1:250.000 da Região da AMAN-ESA',
                description: '1 carta na escala 1:250.000 visando atender a demanda da DSG para apresentação de produtos cartográficos atualizados aos Cadetes da AMAN e aos Alunos da ESA.',
                legend: [
                    2
                ],
                styles: [
                    {
                        'id': 'aman_esa_2024_250k-fill',
                        'source': 'aman_esa_2024_250k',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'aman_esa_2024_250k-border',
                        'source': 'aman_esa_2024_250k',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'aman_esa_2024_250k-text',
                        'source': 'aman_esa_2024_250k',
                        "type": "symbol",
                        "maxzoom": 10,
                        'layout': {
                            'text-field': ['to-string', ['get', 'identificadorMI']]

                        },
                        'paint': {

                        }
                    }
                ]
            },
            { // CO 1:25.000 -- AMAN ESA
                name: 'aman_esa_2024_25k_orto',
                subtitle: 'Cartas Ortoimagem 1:25.000 da Região da AMAN-ESA',
                description: '4 cartas na escala 1:25.000 visando atender a demanda da DSG para apresentação de produtos cartográficos atualizados aos Cadetes da AMAN e aos Alunos da ESA.',
                legend: [
                    2
                ],
                styles: [
                    {
                        'id': 'aman_esa_2024_25k_orto-fill',
                        'source': 'aman_esa_2024_25k_orto',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'aman_esa_2024_25k_orto-border',
                        'source': 'aman_esa_2024_25k_orto',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'aman_esa_2024_25k_orto-text',
                        'source': 'aman_esa_2024_25k_orto',
                        "type": "symbol",
                        "maxzoom": 10,
                        'layout': {
                            'text-field': ['to-string', ['get', 'identificadorMI']]

                        },
                        'paint': {

                        }
                    }
                ]
            },
            { // CO 1:50.000 -- AMAN ESA
                name: 'aman_esa_2024_50k_orto',
                subtitle: 'Carta Ortoimagem 1:50.000 da Região da AMAN-ESA',
                description: '3 cartas na escala 1:50.000 visando atender a demanda da DSG para apresentação de produtos cartográficos atualizados aos Cadetes da AMAN e aos Alunos da ESA.',
                legend: [
                    2
                ],
                styles: [
                    {
                        'id': 'aman_esa_2024_50k_orto-fill',
                        'source': 'aman_esa_2024_50k_orto',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'aman_esa_2024_50k_orto-border',
                        'source': 'aman_esa_2024_50k_orto',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'aman_esa_2024_50k_orto-text',
                        'source': 'aman_esa_2024_50k_orto',
                        "type": "symbol",
                        "maxzoom": 10,
                        'layout': {
                            'text-field': ['to-string', ['get', 'identificadorMI']]

                        },
                        'paint': {

                        }
                    }
                ]
            },
            { // CO 1:100.000 -- AMAN ESA
                name: 'aman_esa_2024_100k_orto',
                subtitle: 'Cartas Ortoimagem 1:100.000 da Região da AMAN-ESA',
                description: '2 cartas na escala 1:100.000 visando atender a demanda da DSG para apresentação de produtos cartográficos atualizados aos Cadetes da AMAN e aos Alunos da ESA.',
                legend: [
                    2
                ],
                styles: [
                    {
                        'id': 'aman_esa_2024_100k_orto-fill',
                        'source': 'aman_esa_2024_100k_orto',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'aman_esa_2024_100k_orto-border',
                        'source': 'aman_esa_2024_100k_orto',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'aman_esa_2024_100k_orto-text',
                        'source': 'aman_esa_2024_100k_orto',
                        "type": "symbol",
                        "maxzoom": 10,
                        'layout': {
                            'text-field': ['to-string', ['get', 'identificadorMI']]

                        },
                        'paint': {

                        }
                    }
                ]
            },
            { // CO 1:250.000 -- AMAN ESA
                name: 'aman_esa_2024_250k',
                subtitle: 'Carta Ortoimagem 1:250.000 da Região da AMAN-ESA',
                description: '1 carta na escala 1:250.000 visando atender a demanda da DSG para apresentação de produtos cartográficos atualizados aos Cadetes da AMAN e aos Alunos da ESA.',
                legend: [
                    2
                ],
                styles: [
                    {
                        'id': 'aman_esa_2024_250k-fill',
                        'source': 'aman_esa_2024_250k',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'aman_esa_2024_250k-border',
                        'source': 'aman_esa_2024_250k',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'aman_esa_2024_250k-text',
                        'source': 'aman_esa_2024_250k',
                        "type": "symbol",
                        "maxzoom": 10,
                        'layout': {
                            'text-field': ['to-string', ['get', 'identificadorMI']]

                        },
                        'paint': {

                        }
                    }
                ]
            },
        ]
    },
    'carta-topografica-2023': {
        title: 'Carta Topográfica 2023',
        group: "Entregas",
        subgroup: "2023",
        description: '',
        lotes: [
            { // CT 25k
                name: 'ct-2023-25k',
                subtitle: '1:25.000',
                description: '15 cartas na escala 1:25.000 com o objetivo de mapear Campos de Instrução do Comando Militar do Sul, sendo estes: Alegrete - RS (3), Quaraí - RS (2), 4 cartas em Santana do Livramento - RS (4) e Curitiba - PR (6).',
                legend: [2],
                styles: [
                    {
                        'id': 'ct-2023-25k-fill',
                        'source': 'ct-2023-25k',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'ct-2023-25k-border',
                        'source': 'ct-2023-25k',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'ct-2023-25k-text',
                        'source': 'ct-2023-25k',
                        "type": "symbol",
                        "maxzoom": 10,
                        'layout': {
                            'text-field': ['to-string', ['get', 'identificadorMI']]
                        },
                        'paint': {}
                    }
                ]
            },
            { // CT 50k
                name: 'ct-2023-50k',
                subtitle: '1:50.000',
                description: '95 cartas na escala 1:50.000 com o planejamento de atender as demandas operacionais do CMS na região sudoeste do Estado do Rio Grande do Sul',
                legend: [2],
                styles: [
                    {
                        'id': 'ct-2023-50k-fill',
                        'source': 'ct-2023-50k',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'ct-2023-50k-border',
                        'source': 'ct-2023-50k',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'ct-2023-50k-text',
                        'source': 'ct-2023-50k',
                        "type": "symbol",
                        "maxzoom": 10,
                        'layout': {
                            'text-field': ['to-string', ['get', 'identificadorMI']]
                        },
                        'paint': {}
                    }
                ]
            },
            { // CT 100k
                name: 'ct-2023-100k',
                subtitle: '1:100.000',
                description: '82 cartas na escala 1:100.000, 30 no oeste do Estado do Paraná e 52 no sudoeste do Estado do Rio Grande do Sul, visando atender as demandas de uma Simulação para o C Av Ex',
                legend: [2],
                styles: [
                    {
                        'id': 'ct-2023-100k-fill',
                        'source': 'ct-2023-100k',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'ct-2023-100k-border',
                        'source': 'ct-2023-100k',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'ct-2023-100k-text',
                        'source': 'ct-2023-100k',
                        "type": "symbol",
                        "maxzoom": 10,
                        'layout': {
                            'text-field': ['to-string', ['get', 'identificadorMI']]
                        },
                        'paint': {}
                    }
                ]
            },
        ]
    },
    'carta-ortoimagem-2023': {
        title: 'Carta Ortoimagem 2023',
        group: "Entregas",
        subgroup: "2023",
        description: '',
        lotes: [
            { // CO 25k
                name: 'co-2023-25k',
                subtitle: '1:25.000',
                description: '356 cartas na escala 1:25.000 com o planejamento de atender as demandas operacionais do CMS na região sudoeste do estado do Rio Grande do Sul.',
                legend: [2],
                styles: [
                    {
                        'id': 'co-2023-25k-fill',
                        'source': 'co-2023-25k',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'co-2023-25k-border',
                        'source': 'co-2023-25k',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'co-2023-25k-text',
                        'source': 'co-2023-25k',
                        "type": "symbol",
                        "maxzoom": 10,
                        'layout': {
                            'text-field': ['to-string', ['get', 'identificadorMI']]
                        },
                        'paint': {}
                    }
                ]
            },
            { // CO 50k
                name: 'co-2023-50k',
                subtitle: '1:50.000',
                description: '129 cartas na escala 1:50.000 com o planejamento de atender as demandas operacionais do CMS na região sudoeste do estado do Rio Grande do Sul e fronteira oeste do estado de Santa Catarina.',
                legend: [2],
                styles: [
                    {
                        'id': 'co-2023-50k-fill',
                        'source': 'co-2023-50k',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'co-2023-50k-border',
                        'source': 'co-2023-50k',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'co-2023-50k-text',
                        'source': 'co-2023-50k',
                        "type": "symbol",
                        "maxzoom": 10,
                        'layout': {
                            'text-field': ['to-string', ['get', 'identificadorMI']]
                        },
                        'paint': {}
                    }
                ]
            },
        ]
    },
    'carta-topografica-2022': {
        title: 'Carta Topográfica 2022',
        group: "Entregas",
        subgroup: "2022",
        description: '',
        lotes: [
            { // CT 25k
                name: 'ct-2022-25k',
                subtitle: '1:25.000',
                description: '11 cartas na escala 1:25.000 nas cidades de Uruguaiana - RS (2) e Florianópolis - SC (9)',
                legend: [2],
                styles: [
                    {
                        'id': 'ct-2022-25k-fill',
                        'source': 'ct-2022-25k',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'ct-2022-25k-border',
                        'source': 'ct-2022-25k',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'ct-2022-25k-text',
                        'source': 'ct-2022-25k',
                        "type": "symbol",
                        "maxzoom": 10,
                        'layout': {
                            'text-field': ['to-string', ['get', 'identificadorMI']]
                        },
                        'paint': {}
                    }
                ]
            },
            { // CT 50k
                name: 'ct-2022-50k',
                subtitle: '1:50.000',
                description: '37 cartas na escala 1:50.000 construídas pelo intermédio do processo de generalização cartográfica das 174 cartas 1:25.000 do ano de 2021, no contexto do Convênio com o Estado do Rio Grande do Sul',
                legend: [2],
                styles: [
                    {
                        'id': 'ct-2022-50k-fill',
                        'source': 'ct-2022-50k',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'ct-2022-50k-border',
                        'source': 'ct-2022-50k',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'ct-2022-50k-text',
                        'source': 'ct-2022-50k',
                        "type": "symbol",
                        "maxzoom": 10,
                        'layout': {
                            'text-field': ['to-string', ['get', 'identificadorMI']]
                        },
                        'paint': {}
                    }
                ]
            },
            { // CT 100k
                name: 'ct-2022-100k',
                subtitle: '1:100.000',
                description: '12 cartas na escala 1:100.000 construídas por intermédio do processo de generalização cartográfica, na região de Porto Alegre - RS e na região central do Estado de Santa Catarina.',
                legend: [2],
                styles: [
                    {
                        'id': 'ct-2022-100k-fill',
                        'source': 'ct-2022-100k',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'ct-2022-100k-border',
                        'source': 'ct-2022-100k',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'ct-2022-100k-text',
                        'source': 'ct-2022-100k',
                        "type": "symbol",
                        "maxzoom": 10,
                        'layout': {
                            'text-field': ['to-string', ['get', 'identificadorMI']]
                        },
                        'paint': {}
                    }
                ]
            },
        ]
    },
    'carta-ortoimagem-2022': {
        title: 'Carta Ortoimagem 2022',
        group: "Entregas",
        subgroup: "2022",
        description: '',
        lotes: [
            { // CO 50k
                name: 'co-2022-50k',
                subtitle: '1:50.000',
                description: '76 cartas na escala 1:50.000 visando atender as demandas do Comando Militar do Sul no planejamento de operação ao longo do Rio Paraná',
                legend: [2],
                styles: [
                    {
                        'id': 'co-2022-50k-fill',
                        'source': 'co-2022-50k',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'co-2022-50k-border',
                        'source': 'co-2022-50k',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'co-2022-50k-text',
                        'source': 'co-2022-50k',
                        "type": "symbol",
                        "maxzoom": 10,
                        'layout': {
                            'text-field': ['to-string', ['get', 'identificadorMI']]
                        },
                        'paint': {}
                    }
                ]
            },
        ]
    },
    'projeto-roraima-2022': {
        title: 'Projeto Roraima',
        group: "Entregas",
        subgroup: "2022",
        description: '',
        lotes: [
            { // Complemento Uraricoera
                name: 'roraima',
                subtitle: '1:50.000',
                description: '22 cartas topográficas na escala 1:50.000 na região da fronteira de Roraima em complemento as cartas do Projeto Uraricoera.',
                zoom: [
                    [
                        -63.93490169478686,
                        2.3460501179199724
                    ],
                    [
                        -58.48288600488843,
                        6.32638916302372
                    ]
                ],
                legend: [2],
                styles: [
                    {
                        'id': 'roraima-fill',
                        'source': 'roraima',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'mapintfter-2022-sub-meta-b-carta-topo-50k-rr-border',
                        'source': 'roraima',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'roraima-text',
                        'source': 'roraima',
                        "type": "symbol",
                        "maxzoom": 10,
                        "minzoom": 6.03,
                        'layout': {
                            'text-field': ['to-string', ['get', 'identificadorMI']]

                        },
                        'paint': {}
                    }
                ]
            }
        ]
    },
    'carta-topografica-2021': {
        title: 'Carta Topográfica 2021',
        group: "Entregas",
        subgroup: "2021",
        description: '',
        lotes: [
            { // CT 25k
                name: 'ct-2021-25k',
                subtitle: '1:25.000',
                description: '174 cartas na escala 1:25.000 e seus respectivos insumos geoespaciais (ortoimagens, modelos digitais de elevação e dados geoespaciais vetoriais), correspondentes à RF1, compreendendo Porto Alegre, Região Metropolitana e municípios adjacentes. O projeto foi executado no contexto da parceria entre o Governo do Estado do Rio Grande do Sul e o Exército Brasileiro.',
                legend: [2],
                styles: [
                    {
                        'id': 'ct-2021-25k-fill',
                        'source': 'ct-2021-25k',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'ct-2021-25k-border',
                        'source': 'ct-2021-25k',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'ct-2021-25k-text',
                        'source': 'ct-2021-25k',
                        "type": "symbol",
                        "maxzoom": 10,
                        'layout': {
                            'text-field': ['to-string', ['get', 'identificadorMI']]
                        },
                        'paint': {}
                    }
                ]
            },
            { // CT 50k
                name: 'ct-2021-50k',
                subtitle: '1:50.000',
                description: '12 cartas na escala 1:50.000 na região de fronteira do Estado do Paraná no contexto do Projeto SISFRON (17º RC Mec)',
                legend: [2],
                styles: [
                    {
                        'id': 'ct-2021-50k-fill',
                        'source': 'ct-2021-50k',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'ct-2021-50k-border',
                        'source': 'ct-2021-50k',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'ct-2021-50k-text',
                        'source': 'ct-2021-50k',
                        "type": "symbol",
                        "maxzoom": 10,
                        'layout': {
                            'text-field': ['to-string', ['get', 'identificadorMI']]
                        },
                        'paint': {}
                    }
                ]
            },
            { // CT 100k
                name: 'ct-2021-100k',
                subtitle: '1:100.000',
                description: '3 cartas na escala 1:100.000 na região de fronteira do Estado do Paraná no contexto do Projeto SISFRON (17º RC Mec)',
                legend: [2],
                styles: [
                    {
                        'id': 'ct-2021-100k-fill',
                        'source': 'ct-2021-100k',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'ct-2021-100k-border',
                        'source': 'ct-2021-100k',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'ct-2021-100k-text',
                        'source': 'ct-2021-100k',
                        "type": "symbol",
                        "maxzoom": 10,
                        'layout': {
                            'text-field': ['to-string', ['get', 'identificadorMI']]
                        },
                        'paint': {}
                    }
                ]
            }
        ]
    },
    'uraricoera-2021': {
        title: 'Projeto Uraricoera',
        group: "Entregas",
        subgroup: "2021",
        description: '',
        lotes: [
            { // Uraricoera
                name: 'uraricoera',
                subtitle: '1:50.000',
                description: '54 cartas na escala 1:50.000 distribuídas no estado de Roraima visando atender demanda do COTER relativa a realização de exercícios de Problemas Militares Simulados.',
                legend: [2],
                styles: [
                    {
                        'id': 'uraricoera-fill',
                        'source': 'uraricoera',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'uraricoera-border',
                        'source': 'uraricoera',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'uraricoera-text',
                        'source': 'uraricoera',
                        "type": "symbol",
                        "maxzoom": 10,
                        'layout': {
                            'text-field': ['to-string', ['get', 'identificadorMI']]
                        },
                        'paint': {}
                    }
                ]
            }
        ]
    },
    'carta-topografica-2020': {
        title: 'Carta Topográfica 2020',
        group: "Entregas",
        subgroup: "2020",
        description: '',
        lotes: [
            { // CT 25k
                name: 'ct-2020-25k',
                subtitle: '1:25.000',
                description: '44 cartas na escala 1:25.000 na região de fronteira do Estado do Paraná no contexto do Projeto SISFRON (17º RC Mec)',
                legend: [2],
                styles: [
                    {
                        'id': 'ct-2020-25k-fill',
                        'source': 'ct-2020-25k',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'ct-2020-25k-border',
                        'source': 'ct-2020-25k',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'ct-2020-25k-text',
                        'source': 'ct-2020-25k',
                        "type": "symbol",
                        "maxzoom": 10,
                        'layout': {
                            'text-field': ['to-string', ['get', 'identificadorMI']]
                        },
                        'paint': {}
                    }
                ]
            },
        ]
    },
    'carta-topografica-2019': {
        title: 'Carta Topográfica 2019',
        group: "Entregas",
        subgroup: "2019",
        description: '',
        lotes: [
            { // CT 50k
                name: 'ct-2019-50k',
                subtitle: '1:50.000',
                description: '42 cartas na escala 1:50.000, construídas por intermédio de procesos de generalização cartográfica no contexto do Projeto de Mapeamento do Vazio de Santa Catarina.',
                legend: [2],
                styles: [
                    {
                        'id': 'ct-2019-50k-fill',
                        'source': 'ct-2019-50k',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'ct-2019-50k-border',
                        'source': 'ct-2019-50k',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'ct-2019-50k-text',
                        'source': 'ct-2019-50k',
                        "type": "symbol",
                        "maxzoom": 10,
                        'layout': {
                            'text-field': ['to-string', ['get', 'identificadorMI']]
                        },
                        'paint': {}
                    }
                ]
            },
        ]
    },
    'carta-topografica-2018': {
        title: 'Carta Topográfica 2018',
        group: "Entregas",
        subgroup: "2018",
        description: '',
        lotes: [
            { // CT 25k
                name: 'ct-2018-25k',
                subtitle: '1:25.000',
                description: '190 cartas na escala 1:25.000, sendo 168 (duas cartas em sobreposição com o CIMH) cartas na região central do Estado de Santa Catarina e 24 cartas nos principais Campos de Instrução do Comando Militar do Sul.',
                legend: [2],
                styles: [
                    {
                        'id': 'ct-2018-25k-fill',
                        'source': 'ct-2018-25k',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'ct-2018-25k-border',
                        'source': 'ct-2018-25k',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'ct-2018-25k-text',
                        'source': 'ct-2018-25k',
                        "type": "symbol",
                        "maxzoom": 10,
                        'layout': {
                            'text-field': ['to-string', ['get', 'identificadorMI']]
                        },
                        'paint': {}
                    }
                ]
            },
            { // CT 50k
                name: 'ct-2018-50k',
                subtitle: '1:50.000',
                description: '6 cartas na escala 1:50.000 dos principais Campos de Instrução do Comando Militar do Sul: Campo de Instrução de Rincão (CIR), Campo de Instrução de Santa Maria (CISM), Campo de Instrução Barão de São Borja (CIBSB), Campo de Instrução de Butiá (CIB), Campo de Instrução de Marechal Hermes (CIMH).',
                legend: [2],
                styles: [
                    {
                        'id': 'ct-2018-50k-fill',
                        'source': 'ct-2018-50k',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'ct-2018-50k-border',
                        'source': 'ct-2018-50k',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'ct-2018-50k-text',
                        'source': 'ct-2018-50k',
                        "type": "symbol",
                        "maxzoom": 10,
                        'layout': {
                            'text-field': ['to-string', ['get', 'identificadorMI']]
                        },
                        'paint': {}
                    }
                ]
            },
        ]
    },
    'radiografia-amazonia-2018': {
        title: 'Projeto Radiografia da Amazônia',
        group: "Entregas",
        subgroup: "2018",
        description: '',
        lotes: [
            { // Radiografia AM
                name: 'radiografia-am',
                subtitle: '1:50.000',
                description: '614 cartas na escala 1:50.000, sendo o 1º CGEO o responsável pela extração dos dados vetoriais e edição das cartas com base nos dados geoespaciais de vegetação obtidos pelo 2º CGEO, da área já imageada do projeto.',
                legend: [2],
                styles: [
                    {
                        'id': 'radiografia-am-50k-fill',
                        'source': 'radiografia-am',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'radiografia-am-border',
                        'source': 'radiografia-am',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'radiografia-am-text',
                        'source': 'radiografia-am',
                        "type": "symbol",
                        "maxzoom": 10,
                        'layout': {
                            'text-field': ['to-string', ['get', 'identificadorMI']]
                        },
                        'paint': {}
                    }
                ]
            }
        ]
    }
}

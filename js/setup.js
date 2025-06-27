
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
        description: `Apresenta a situação dos produtos existentes na área de responsabilidade do 1º CGEO, na escala 1:50.000. Ao aproximar é possível ver o ano de mapeamento da carta. Se a carta possuir mais de uma edição, ao clicar serão mostrados os anos que a carta possui edição.`,
        lotes: [
            {
                name: 'situacao-geral-ct-50k',
                subtitle: 'Cartas 1:50.000',
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
        description: `Apresenta a situação dos produtos existentes na área de responsabilidade do 1º CGEO, na escala 1:100.000. Ao aproximar é possível ver o ano de mapeamento da carta. Se a carta possuir mais de uma edição, ao clicar serão mostrados os anos que a carta possui edição.`,
        lotes: [
            {
                name: 'situacao-geral-ct-100k',
                subtitle: 'Cartas 1:100.000',
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
        description: `Apresenta a situação dos produtos existentes na área de responsabilidade do 1º CGEO, na escala 1:250.000. Ao aproximar é possível ver o ano de mapeamento da carta. Se a carta possuir mais de uma edição, ao clicar serão mostrados os anos que a carta possui edição.`,
        lotes: [
            {
                name: 'situacao-geral-ct-250k',
                subtitle: 'Cartas 1:250.000',
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
                        'paint': {

                        }
                    }
                ]
            }
        ]
    },
    'meta-1-producao-geoinformacao-2025':{
        title: 'Meta de Produção de Geoinformação da Diretoria de Serviço Geográfico',
        group: 'Entregas',
        subgroup: '2025',
        description: 'O objetivo do presente projeto consiste na elaboração de produtos para atender as demandas constantes no Item 1. Metas de Trabalho, subitem a. do Plano Interno de Trabalho do 1º CGEO - 2025.',
        lotes: [
            {
                name: 'bloco_1a_2025',
                subtitle: 'Cartas Topográficas 1:25.000 da Região Oeste do Estado do Paraná, na Região de Foz do Iguaçu',
                description: 'Construção de 25 cartas topográficas na escala 1:25.000 na região de Foz do Iguaçu',
                legend: [
                    2
                ],
                styles: [
                    {
                        'id': 'bloco_1a_2025-fill',
                        'source': 'bloco_1a_2025',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'bloco_1a_2025-border',
                        'source': 'bloco_1a_2025',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'bloco_1a_2025-text',
                        'source': 'bloco_1a_2025',
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
            {
                name: 'bloco_1b_2025',
                subtitle: 'Cartas Topográficas 1:25.000 da Região Leste do Estado do Paraná, na Região de Ponta Grossa',
                description: 'Construção de 2 cartas topográficas na escala 1:25.000 na Região de Ponta Grossa, em complemento as Cartas da cidade de Ponta Grossa - PR',
                legend: [
                    2
                ],
                styles: [
                    {
                        'id': 'bloco_1b_2025-fill',
                        'source': 'bloco_1b_2025',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'bloco_1b_2025-border',
                        'source': 'bloco_1b_2025',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'bloco_1b_2025-text',
                        'source': 'bloco_1b_2025',
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
            {
                name: 'bloco_1c_2025',
                subtitle: 'Cartas Topográficas 1:25.000 da Escola de Aperfeiçoamento de Sargentos das Armas em Cruz Alta - RS',
                description: 'Construção de 4 cartas topográficas na escala 1:25.000 da Escola de Aperfeiçoamento de Sargentos das Armas',
                legend: [
                    2
                ],
                styles: [
                    {
                        'id': 'bloco_1c_2025-fill',
                        'source': 'bloco_1c_2025',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'bloco_1c_2025-border',
                        'source': 'bloco_1c_2025',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'bloco_1c_2025-text',
                        'source': 'bloco_1c_2025',
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
            {
                name: 'bloco_1d_2025',
                subtitle: 'Cartas Topográficas 1:25.000 de Bagé - RS',
                description: 'Construção de 4 cartas topográficas na escala 1:25.000 de Bagé - RS',
                legend: [
                    2
                ],
                styles: [
                    {
                        'id': 'bloco_1d_2025-fill',
                        'source': 'bloco_1d_2025',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'bloco_1d_2025-border',
                        'source': 'bloco_1d_2025',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'bloco_1d_2025-text',
                        'source': 'bloco_1d_2025',
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
            {
                name: 'bloco_1e_2025',
                subtitle: 'Cartas Topográficas 1:50.000 de Reserva - PR',
                description: 'Construção de 1 carta topográfica na escala 1:50.000 em Reserva - PR',
                legend: [
                    2
                ],
                styles: [
                    {
                        'id': 'bloco_1e_2025-fill',
                        'source': 'bloco_1e_2025',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'bloco_1e_2025-border',
                        'source': 'bloco_1e_2025',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'bloco_1e_2025-text',
                        'source': 'bloco_1e_2025',
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
            {
                name: 'bloco_1f_2025',
                subtitle: 'Cartas Topográficas 1:50.000 em Blumenau e Florianópolis - SC',
                description: 'Construção de 2 cartas topográficas na escala 1:50.000, sendo uma em Blumenau e outra em Florianópolis',
                legend: [
                    2
                ],
                styles: [
                    {
                        'id': 'bloco_1f_2025-fill',
                        'source': 'bloco_1f_2025',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'bloco_1f_2025-border',
                        'source': 'bloco_1f_2025',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'bloco_1f_2025-text',
                        'source': 'bloco_1f_2025',
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
            {
                name: 'bloco_1g_2025',
                subtitle: 'Carta Topográfica 1:50.000 da Escola de Aperfeiçoamento de Sargentos das Armas em Cruz Alta - RS',
                description: 'Construção de 1 carta topográfica na escala 1:50.000, produzida pela generalização das Cartas 1:25.000 da região',
                legend: [
                    2
                ],
                styles: [
                    {
                        'id': 'bloco_1g_2025-fill',
                        'source': 'bloco_1g_2025',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'bloco_1g_2025-border',
                        'source': 'bloco_1g_2025',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'bloco_1g_2025-text',
                        'source': 'bloco_1g_2025',
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
            {
                name: 'bloco_1k_2025',
                subtitle: 'Carta Topográfica 1:50.000 de Bagé - RS',
                description: 'Construção de 1 carta topográfica na escala 1:50.000, produzida pela generalização das Cartas 1:25.000 da região',
                legend: [
                    2
                ],
                styles: [
                    {
                        'id': 'bloco_1k_2025-fill',
                        'source': 'bloco_1k_2025',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'bloco_1k_2025-border',
                        'source': 'bloco_1k_2025',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'bloco_1k_2025-text',
                        'source': 'bloco_1k_2025',
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
            {
                name: 'bloco_1l_2025',
                subtitle: 'Carta Topográfica 1:50.000 de Ponta Grossa - RS',
                description: 'Construção de 1 carta topográfica na escala 1:50.000, produzida pela generalização das Cartas 1:25.000 da região, que foram produzidas em 2024.',
                legend: [
                    2
                ],
                styles: [
                    {
                        'id': 'bloco_1l_2025-fill',
                        'source': 'bloco_1l_2025',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'bloco_1l_2025-border',
                        'source': 'bloco_1l_2025',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'bloco_1l_2025-text',
                        'source': 'bloco_1l_2025',
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
            {
                name: 'bloco_1m_2025',
                subtitle: 'Cartas Topográficas 1:25.000 na região metropolitana de Curitiba - PR',
                description: 'Construção de 8 cartas topográficas na escala 1:25.000, na região metropolitana de Curitiba - PR',
                legend: [
                    2
                ],
                styles: [
                    {
                        'id': 'bloco_1m_2025-fill',
                        'source': 'bloco_1m_2025',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'bloco_1m_2025-border',
                        'source': 'bloco_1m_2025',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'bloco_1m_2025-text',
                        'source': 'bloco_1m_2025',
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
            {
                name: 'bloco_1n_2025',
                subtitle: 'Cartas Ortoimagem 1:25.000 nos estados do Rio Grande do Sul e Paraná',
                description: 'Construção de 84 cartas ortoimagem na escala 1:25.000 nos estados do Rio Grande do Sul e Paraná',
                legend: [
                    2
                ],
                styles: [
                    {
                        'id': 'bloco_1n_2025-fill',
                        'source': 'bloco_1n_2025',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'bloco_1n_2025-border',
                        'source': 'bloco_1n_2025',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'bloco_1n_2025-text',
                        'source': 'bloco_1n_2025',
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
            {
                name: 'bloco_1o_2025',
                subtitle: 'Cartas Ortoimagem 1:50.000 no estado do Paraná',
                description: 'Construção de 5 cartas ortoimagem na escala 1:50.000 no estado do Paraná',
                legend: [
                    2
                ],
                styles: [
                    {
                        'id': 'bloco_1o_2025-fill',
                        'source': 'bloco_1o_2025',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'bloco_1o_2025-border',
                        'source': 'bloco_1o_2025',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'bloco_1o_2025-text',
                        'source': 'bloco_1o_2025',
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
            {
                name: 'bloco_1p_2025',
                subtitle: 'Cartas Ortoimagem 1:100.000 das cidades de Gaurapuava e Ponta Grossa no estado do Paraná',
                description: 'Construção de 2 cartas ortoimagem na escala 1:100.000 nas cidades de Gaurapuava e Ponta Grossa',
                legend: [
                    2
                ],
                styles: [
                    {
                        'id': 'bloco_1p_2025-fill',
                        'source': 'bloco_1p_2025',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'bloco_1p_2025-border',
                        'source': 'bloco_1p_2025',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'bloco_1p_2025-text',
                        'source': 'bloco_1p_2025',
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
            {
                name: 'bloco_1q_2025',
                subtitle: 'Cartas Ortoimagem 1:25.000 na região metropolitana de Porto Alegre - RS',
                description: 'Construção de 3 cartas ortoimagem na escala 1:25.000 na região metropolitana de Porto Alegre',
                legend: [
                    2
                ],
                styles: [
                    {
                        'id': 'bloco_1q_2025-fill',
                        'source': 'bloco_1q_2025',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'bloco_1q_2025-border',
                        'source': 'bloco_1q_2025',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'bloco_1q_2025-text',
                        'source': 'bloco_1q_2025',
                        "type": "symbol",
                        "maxzoom": 10,
                        'layout': {
                            'text-field': ['to-string', ['get', 'identificadorMI']]

                        },
                        'paint': {
                        }
                    }
                ]
            }
        ]
    },
    'plano-desenvolvimento-2024': {
        title: 'Mapeamento para a Força Terrestre 2024',
        group: "Entregas",
        subgroup: "2024",
        description: 'O objetivo do presente projeto consiste na elaboração de produtos para atender as demandas constantes no Item 2. Metas de Trabalho, subitem a. do Plano Interno de Trabalho do 1° CGEO - 2024.',
        lotes: [
            { // CT 1:25.000 -- Campos de Instrução do Comando Militar do Sul
                name: 'ct_ci_125000',
                subtitle: 'Cartas Topográficas 1:25.000 de Campos de Instrução do Comando Militar do Sul',
                description: 'Construção de 22 cartas topográficas na escala 1:25.000 visando atender a demanda de atualização de cartas nos Campos de Instrução do Comando Militar do Sul.',
                legend: [
                    2
                ],
                styles: [
                    {
                        'id': 'ct_ci_125000-fill',
                        'source': 'ct_ci_125000',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'ct_ci_125000-border',
                        'source': 'ct_ci_125000',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'ct_ci_125000-text',
                        'source': 'ct_ci_125000',
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
            { // CT 1:50.000 -- Demanda CMO
                name: 'demanda_cmo',
                subtitle: 'Cartas Topográficas 1:50.000 da região de interesse do CMO',
                description: 'Construção de 16 cartas topográficas na escala 1:50.000 visando atender a demanda de atualização de cartas em áreas de interesse do Comando Militar do Oeste.',
                legend: [
                    2
                ],
                styles: [
                    {
                        'id': 'demanda_cmo-fill',
                        'source': 'demanda_cmo',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'demanda_cmo-border',
                        'source': 'demanda_cmo',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'demanda_cmo-text',
                        'source': 'demanda_cmo',
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
            { // CO 1:50.000 -- Marechal Hermes
                name: 'co_cimh',
                subtitle: 'Cartas Ortoimagem 1:50.000 do CIMH',
                description: 'Construção de 6 cartas ortoimagem na escala 1:50.000 visando atualizar a geoinformação referente ao Campo de Instrução de Marechal Hermes.',
                legend: [
                    2,
                ],
                styles: [
                    {
                        'id': 'co_cimh-fill',
                        'source': 'co_cimh',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'co_cimh-border',
                        'source': 'co_cimh',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'co_cimh-text',
                        'source': 'co_cimh',
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
            { // CO 1:25.000 -- Região Metropolitana de Porto Alegre
                name: 'poa_metropolitana',
                subtitle: 'Cartas Ortoimagem 1:25.000 da Região Metropoliana de Porto Alegre',
                description: 'Construção de 8 cartas ortoimagem na escala 1:25.000 visando atender a atualização das Cartas Ortoimagem na Região Metropolitana de Porto Alegre.',
                legend: [
                    2,
                ],
                styles: [
                    {
                        'id': 'poa_metropolitana-fill',
                        'source': 'poa_metropolitana',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'poa_metropolitana-border',
                        'source': 'poa_metropolitana',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'poa_metropolitana-text',
                        'source': 'poa_metropolitana',
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
            { // CO 1:25.000 -- Campos de Instrução do Comando Militar do Sul
                name: 'ci_co_125000',
                subtitle: 'Cartas Ortoimagem 1:25.000 de Campos de Instrução do CMS',
                description: 'Construção de 35 cartas ortoimagem na escala 1:25.000 visando atender o planejamento de operações para o CMS.',
                legend: [
                    2,
                ],
                styles: [
                    {
                        'id': 'ci_co_125000-fill',
                        'source': 'ci_co_125000',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'ci_co_125000-border',
                        'source': 'ci_co_125000',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'ci_co_125000-text',
                        'source': 'ci_co_125000',
                        "type": "symbol",
                        "maxzoom": 10,
                        'layout': {
                            'text-field': ['to-string', ['get', 'identificadorMI']]

                        },
                        'paint': {

                        }
                    }
                ]
            }
        ]
    },
    'solicitacao-decex-2024': {
        title: 'Mapeamento DECEx',
        group: "Entregas",
        subgroup: "2024",
        description: 'O objetivo do presente projeto consiste na elaboração de produtos para atender as demandas constantes no Item 2. Metas de Trabalho, subitem b. do Plano Interno de Trabalho do 1° CGEO - 2024.',
        lotes: [
            { // CT 1:50.000 -- CPOR/CMPS
                name: 'decex_cpor_cmsp',
                subtitle: 'Carta Topográfica 1:50.000 de da Região de Apiai',
                description: 'Construção de 1 carta topográfica na escala 1:50.000 visando atender a demanda apresentada pelo Departamento de Educação e Cultura do Exército.',
                legend: [
                    2
                ],
                styles: [
                    {
                        'id': 'decex_cpor_cmsp-fill',
                        'source': 'decex_cpor_cmsp',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'decex_cpor_cmsp-border',
                        'source': 'decex_cpor_cmsp',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'decex_cpor_cmsp-text',
                        'source': 'decex_cpor_cmsp',
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
            { // CT 1:50.000 -- Demanda EsACosAAe
                name: 'decex_esacosaae',
                subtitle: 'Cartas Topográficas 1:50.000 da região metropolitana de Curitiba',
                description: 'Construção de 4 cartas topográficas na escala 1:50.000 visando atender a demanda apresentada pela Escola de Artilharia de Costa e Antiaérea.',
                legend: [
                    2
                ],
                styles: [
                    {
                        'id': 'decex_esacosaae-fill',
                        'source': 'decex_esacosaae',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'decex_esacosaae-border',
                        'source': 'decex_esacosaae',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'decex_esacosaae-text',
                        'source': 'decex_esacosaae',
                        "type": "symbol",
                        "maxzoom": 10,
                        'layout': {
                            'text-field': ['to-string', ['get', 'identificadorMI']]

                        },
                        'paint': {

                        }
                    }
                ]
            }
        ]
    },
    'mapeamento-aman-esa-2024': {
        title: 'Mapeamento por solicitação da DSG',
        group: "Entregas",
        subgroup: "2024",
        description: 'O objetivo do presente projeto consiste na elaboração de produtos para atender as demandas constantes na disseminação de produtos cartográficos aos Cadetes da AMAN e aos Alunos da ESA',
        lotes: [
            { // CT/CO 1:250.000 -- AMAN ESA
                name: 'aman_esa_2024_250k',
                subtitle: 'Carta Topográfica e Carta Ortoimagem 1:250.000 da Região da AMAN-ESA',
                description: 'Construção de 1 carta topográfica e 1 carta ortoimagem na escala 1:250.000 visando atender a demanda da DSG para apresentação de produtos cartográficos atualizados aos Cadetes da AMAN e aos Alunos da ESA.',
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
            { // CT 1:100.000 -- AMAN ESA
                name: 'aman_esa_2024_100k_topo',
                subtitle: 'Cartas Topográfica 1:100.000 da Região da AMAN-ESA',
                description: 'Construção de 2 cartas topográficas na escala 1:100.000 visando atender a demanda da DSG para apresentação de produtos cartográficos atualizados aos Cadetes da AMAN e aos Alunos da ESA.',
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
            { // CO 1:100.000 -- AMAN ESA
                name: 'aman_esa_2024_100k_orto',
                subtitle: 'Cartas Ortoimagem 1:100.000 da Região da AMAN-ESA',
                description: 'Construção de 2 cartas ortoimagem na escala 1:100.000 visando atender a demanda da DSG para apresentação de produtos cartográficos atualizados aos Cadetes da AMAN e aos Alunos da ESA.',
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
            { // CT 1:50.000 -- AMAN ESA
                name: 'aman_esa_2024_50k_topo',
                subtitle: 'Carta Topográfica 1:50.000 da Região da AMAN-ESA',
                description: 'Construção de 1 carta topográfica na escala 1:50.000 visando atender a demanda da DSG para apresentação de produtos cartográficos atualizados aos Cadetes da AMAN e aos Alunos da ESA.',
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
            { // CO 1:50.000 -- AMAN ESA
                name: 'aman_esa_2024_50k_orto',
                subtitle: 'Carta Ortoimagem 1:50.000 da Região da AMAN-ESA',
                description: 'Construção de 1 carta ortoimagem na escala 1:50.000 visando atender a demanda da DSG para apresentação de produtos cartográficos atualizados aos Cadetes da AMAN e aos Alunos da ESA.',
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
            { // CT 1:25.000 -- AMAN ESA
                name: 'aman_esa_2024_25k_topo',
                subtitle: 'Cartas Topográfica 1:25.000 da Região da AMAN-ESA',
                description: 'Construção de 4 cartas topográficas na escala 1:25.000 visando atender a demanda da DSG para apresentação de produtos cartográficos atualizados aos Cadetes da AMAN e aos Alunos da ESA.',
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
            { // CO 1:25.000 -- AMAN ESA
                name: 'aman_esa_2024_25k_orto',
                subtitle: 'Cartas Ortoimagem 1:25.000 da Região da AMAN-ESA',
                description: 'Construção de 4 cartas ortoimagem na escala 1:25.000 visando atender a demanda da DSG para apresentação de produtos cartográficos atualizados aos Cadetes da AMAN e aos Alunos da ESA.',
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
            }
        ]
    },
    'plano-desenvolvimento-2023': {
        title: 'PDDMT 2023',
        group: "Entregas",
        subgroup: "2023",
        description: 'O objetivo do presente projeto consiste na elaboração de produtos para atender as demandas constantes no Anexo E - Programa de Difusão de Produtos e Serviços de Geoinformação, do PDDMT.',
        lotes: [
            { // PDDMT 2022 52 CT 1:100K RS
                name: 'pddmt-2022-sub-meta-b1-carta-topo-100k-rs',
                subtitle: 'Carta Topográfica 1:100.000 do RS',
                description: 'Construção de 52 cartas topográficas na escala 1:100.000 visando atender o exercício de adestramento em Jogo de Guerra do C Av Ex na região do RS.',
                zoom: [
                    [-58.24018173756117, -32.47368087864978], // southwestern corner of the bounds
                    [-51.39593216041132, -28.148451192980446] // northeastern corner of the bounds
                ],
                legend: [2],
                styles: [
                    {
                        'id': 'pddmt-2022-sub-meta-b1-carta-topo-100k-rs-fill',
                        'source': 'pddmt-2022-sub-meta-b1-carta-topo-100k-rs',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'pddmt-2022-sub-meta-b1-carta-topo-100k-rs-border',
                        'source': 'pddmt-2022-sub-meta-b1-carta-topo-100k-rs',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'pddmt-2022-sub-meta-b1-carta-topo-100k-rs-text',
                        'source': 'pddmt-2022-sub-meta-b1-carta-topo-100k-rs',
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
            { // PDDMT 2022 30 CT 1:100K PR
                name: 'pddmt-2022-sub-meta-b2-carta-topo-100k-pr',
                subtitle: 'Carta Topográfica 1:100.000 do PR',
                description: 'Construção de 30 cartas topográficas na escala 1:100.000 visando atender o exercício de adestramento em Jogo de Guerra do C Av Ex na região do PR.',
                zoom: [
                    [-54.00995, -25.50903],
                    [-50.99005, -22.99097]
                ],
                legend: [2],
                styles: [
                    {
                        'id': 'pddmt-2022-sub-meta-b2-carta-topo-100k-pr-fill',
                        'source': 'pddmt-2022-sub-meta-b2-carta-topo-100k-pr',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'pddmt-2022-sub-meta-b2-carta-topo-100k-pr-border',
                        'source': 'pddmt-2022-sub-meta-b2-carta-topo-100k-pr',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'pddmt-2022-sub-meta-b2-carta-topo-100k-pr-text',
                        'source': 'pddmt-2022-sub-meta-b2-carta-topo-100k-pr',
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
            { // PDDMT 2023 95 CO 1:50K RS
                name: 'pddmt-2023-sub-meta-a1-carta-orto-50k-rs',
                subtitle: 'Carta Ortoimagem 1:50.000 no RS',
                description: 'Construção de 95 cartas ortoimagem na escala 1:50.000 visando atender o planejamento de operações para o CMS.',
                zoom: [
                    [-54.75999, -26.00903], // southwestern corner of the bounds
                    [-52.49001, -22.49097] // northeastern corner of the bounds
                ],
                legend: [2],
                styles: [
                    {
                        'id': 'pddmt-2023-sub-meta-a1-carta-orto-50k-rs-fill',
                        'source': 'pddmt-2023-sub-meta-a1-carta-orto-50k-rs',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'pddmt-2023-sub-meta-a1-carta-orto-50k-rs-border',
                        'source': 'pddmt-2023-sub-meta-a1-carta-orto-50k-rs',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'pddmt-2023-sub-meta-a1-carta-orto-50k-rs-text',
                        'source': 'pddmt-2023-sub-meta-a1-carta-orto-50k-rs',
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
            { // PDDMT 2023 356 CO 1:25K RS
                name: 'pddmt-2023-sub-meta-a2-carta-orto-25k-rs',
                subtitle: 'Carta Ortoimagem 1:25.000 no RS',
                description: 'Construção de 356 cartas ortoimagem na escala 1:25.000 visando atender o planejamento de operações para o CMS.',
                zoom: [
                    [-54.75999, -26.00903], // southwestern corner of the bounds
                    [-52.49001, -22.49097] // northeastern corner of the bounds
                ],
                legend: [2],
                styles: [
                    {
                        'id': 'pddmt-2023-sub-meta-a2-carta-orto-25k-rs-fill',
                        'source': 'pddmt-2023-sub-meta-a2-carta-orto-25k-rs',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'pddmt-2023-sub-meta-a2-carta-orto-25k-rs-border',
                        'source': 'pddmt-2023-sub-meta-a2-carta-orto-25k-rs',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'pddmt-2023-sub-meta-a2-carta-orto-25k-rs-text',
                        'source': 'pddmt-2023-sub-meta-a2-carta-orto-25k-rs',
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
            { // PDDMT 2023 34 CO 1:50K SC
                name: 'pddmt-2023-sub-meta-b1-carta-orto-50k-sc',
                subtitle: 'Carta Ortoimagem 1:50.000 em SC',
                description: 'Construção de 34 cartas ortoimagem na escala 1:50.000 visando atender o planejamento de operações para o CMS.',
                zoom: [
                    [-54.75999, -26.00903], // southwestern corner of the bounds
                    [-52.49001, -22.49097] // northeastern corner of the bounds
                ],
                legend: [2],
                styles: [
                    {
                        'id': 'pddmt-2023-sub-meta-b1-carta-orto-50k-sc-fill',
                        'source': 'pddmt-2023-sub-meta-b1-carta-orto-50k-sc',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'pddmt-2023-sub-meta-b1-carta-orto-50k-sc-border',
                        'source': 'pddmt-2023-sub-meta-b1-carta-orto-50k-sc',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'pddmt-2023-sub-meta-b1-carta-orto-50k-sc-text',
                        'source': 'pddmt-2023-sub-meta-b1-carta-orto-50k-sc',
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
            { // PDDMT 2023 95 CT 1:50K RS
                name: 'pddmt-2023-sub-meta-b2-carta-topo-50k-rs',
                subtitle: 'Carta Topográfica 1:50.000 no RS',
                description: 'Construção de 95 cartas topográficas na escala 1:50.000 visando atender o planejamento de operações para o CMS.',
                zoom: [
                    [-54.75999, -26.00903], // southwestern corner of the bounds
                    [-52.49001, -22.49097] // northeastern corner of the bounds
                ],
                legend: [2],
                styles: [
                    {
                        'id': 'pddmt-2023-sub-meta-b2-carta-topo-50k-rs-fill',
                        'source': 'pddmt-2023-sub-meta-b2-carta-topo-50k-rs',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'pddmt-2023-sub-meta-b2-carta-topo-50k-rs-border',
                        'source': 'pddmt-2023-sub-meta-b2-carta-topo-50k-rs',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'pddmt-2023-sub-meta-b2-carta-topo-50k-rs-text',
                        'source': 'pddmt-2023-sub-meta-b2-carta-topo-50k-rs',
                        "type": "symbol",
                        "maxzoom": 10,
                        'layout': {
                            'text-field': ['to-string', ['get', 'identificadorMI']]

                        },
                        'paint': {

                        }
                    }
                ]
            }
        ]
    },
    'mapeamento-interesse-da-forca-2023': {
        title: 'Map Int F Ter 2023',
        group: "Entregas",
        subgroup: "2023",
        description: 'O objetivo do presente projeto consiste na elaboração de cartas topográfica em escalas entre 1:25.000 e 1:250.000 de áreas de interesse da Força Terrestre pelo território nacional. A Área de Suprimento Cartográfico (ASC) do 1º Centro de Geoinformação (1º CGEO) corresponde à área de responsabilidade do Comando Militar do Sul (CMS), abrangendo os estados do Rio Grande do Sul, Santa Catarina e Paraná. Dessa forma, o 1º CGEO será responsável por executar esse projeto em sua respectiva área de responsabilidade.',
        lotes: [
            { // Alegrete
                name: 'mapintfter-2023-sub-meta-a2-carta-topo-25k-alegrete',
                subtitle: 'Carta Topográfica 1:25.000 de Alegrete',
                description: 'Construção de 03 cartas topográficas na escala 1:25.000 visando atender a atualização das campos de instrução das ASC.',
                zoom: [
                    [-55.88536, -30.00902], // southwestern corner of the bounds
                    [-55.61464, -29.74098] // northeastern corner of the bounds
                ],
                legend: [2],
                styles: [
                    {
                        'id': 'mapintfter-2023-sub-meta-a2-carta-topo-25k-alegrete-fill',
                        'source': 'mapintfter-2023-sub-meta-a2-carta-topo-25k-alegrete',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'mapintfter-2023-sub-meta-a2-carta-topo-25k-alegrete-border',
                        'source': 'mapintfter-2023-sub-meta-a2-carta-topo-25k-alegrete',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'mapintfter-2023-sub-meta-a2-carta-topo-25k-alegrete-text',
                        'source': 'mapintfter-2023-sub-meta-a2-carta-topo-25k-alegrete',
                        "type": "symbol",
                        "maxzoom": 10,
                        "minzoom": 8.86,
                        'layout': {
                            'text-field': ['to-string', ['get', 'identificadorMI']]

                        },
                        'paint': {

                        }
                    }
                ]
            },
            { // Santana do Livramento
                name: 'mapintfter-2023-sub-meta-a3-carta-topo-25k-stnalivramento',
                subtitle: 'Carta Topográfica 1:25.000 de Santana do Livramento',
                description: 'Construção de 04 cartas topográficas na escala 1:25.000 visando atender a atualização das campos de instrução das ASC.',
                zoom: [
                    [-55.88536, -30.00902], // southwestern corner of the bounds
                    [-55.61464, -29.74098] // northeastern corner of the bounds
                ],
                legend: [2],
                styles: [
                    {
                        'id': 'mapintfter-2023-sub-meta-a3-carta-topo-25k-stnalivramento-fill',
                        'source': 'mapintfter-2023-sub-meta-a3-carta-topo-25k-stnalivramento',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'mapintfter-2023-sub-meta-a3-carta-topo-25k-stnalivramento-border',
                        'source': 'mapintfter-2023-sub-meta-a3-carta-topo-25k-stnalivramento',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'mapintfter-2023-sub-meta-a3-carta-topo-25k-stnalivramento-text',
                        'source': 'mapintfter-2023-sub-meta-a3-carta-topo-25k-stnalivramento',
                        "type": "symbol",
                        "maxzoom": 10,
                        "minzoom": 8.86,
                        'layout': {
                            'text-field': ['to-string', ['get', 'identificadorMI']]

                        },
                        'paint': {

                        }
                    }
                ]
            },
            { // Curitiba
                name: 'mapintfter-2023-sub-meta-a1-carta-topo-25k-curitiba',
                subtitle: 'Carta Topográfica 1:25.000 de Curitiba',
                description: 'Construção de 06 cartas topográficas na escala 1:25.000 visando atender a atualização das campos de instrução das ASC.',
                zoom: [
                    [-55.88536, -30.00902], // southwestern corner of the bounds
                    [-55.61464, -29.74098] // northeastern corner of the bounds
                ],
                legend: [2],
                styles: [
                    {
                        'id': 'mapintfter-2023-sub-meta-a1-carta-topo-25k-curitiba-fill',
                        'source': 'mapintfter-2023-sub-meta-a1-carta-topo-25k-curitiba',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'mapintfter-2023-sub-meta-a1-carta-topo-25k-curitiba-border',
                        'source': 'mapintfter-2023-sub-meta-a1-carta-topo-25k-curitiba',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'mapintfter-2023-sub-meta-a1-carta-topo-25k-curitiba-text',
                        'source': 'mapintfter-2023-sub-meta-a1-carta-topo-25k-curitiba',
                        "type": "symbol",
                        "maxzoom": 10,
                        "minzoom": 8.86,
                        'layout': {
                            'text-field': ['to-string', ['get', 'identificadorMI']]

                        },
                        'paint': {

                        }
                    }
                ]
            },
            { // Quaraí
                name: 'mapintfter-2023-sub-meta-a4-carta-topo-25k-quarai',
                subtitle: 'Carta Topográfica 1:25.000 de Quaraí',
                description: 'Construção de 02 cartas topográficas na escala 1:25.000 visando atender a atualização das campos de instrução das ASC.',
                zoom: [
                    [-55.88536, -30.00902], // southwestern corner of the bounds
                    [-55.61464, -29.74098] // northeastern corner of the bounds
                ],
                legend: [2],
                styles: [
                    {
                        'id': 'mapintfter-2023-sub-meta-a4-carta-topo-25k-quarai-fill',
                        'source': 'mapintfter-2023-sub-meta-a4-carta-topo-25k-quarai',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'mapintfter-2023-sub-meta-a4-carta-topo-25k-quarai-border',
                        'source': 'mapintfter-2023-sub-meta-a4-carta-topo-25k-quarai',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'mapintfter-2023-sub-meta-a4-carta-topo-25k-quarai-text',
                        'source': 'mapintfter-2023-sub-meta-a4-carta-topo-25k-quarai',
                        "type": "symbol",
                        "maxzoom": 10,
                        "minzoom": 8.86,
                        'layout': {
                            'text-field': ['to-string', ['get', 'identificadorMI']]

                        },
                        'paint': {

                        }
                    }
                ]
            }
        ]
    },
    'plano-desenvolvimento-2022': {
        title: 'PDDMT 2022',
        group: "Entregas",
        subgroup: "2022",
        description: 'O objetivo do presente projeto consiste na elaboração de produtos para atender as demandas constantes no Anexo E - Programa de Difusão de Produtos e Serviços de Geoinformação, do PDDMT.',
        lotes: [
            {
                name: 'pddmt-2022-sub-meta-a-carta-orto-50k-pr',
                subtitle: 'Carta Ortoimagem 1:50.000 no PR',
                description: 'Construção de 76 cartas ortoimagem na escala 1:50.000 visando atender o planejamento de operações no Lago de Itaipu para o CMS.',
                zoom: [
                    [-54.94972409601194, -26.180512277006958], // southwestern corner of the bounds
                    [-52.30027568484421, -22.31939338230858] // northeastern corner of the bounds
                ],
                legend: [2],
                styles: [
                    {
                        'id': 'pddmt-2022-sub-meta-a-carta-orto-50k-pr-fill',
                        'source': 'pddmt-2022-sub-meta-a-carta-orto-50k-pr',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'pddmt-2022-sub-meta-a-carta-orto-50k-pr-border',
                        'source': 'pddmt-2022-sub-meta-a-carta-orto-50k-pr',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'pddmt-2022-sub-meta-a-carta-orto-50k-pr-text',
                        'source': 'pddmt-2022-sub-meta-a-carta-orto-50k-pr',
                        "type": "symbol",
                        "maxzoom": 10,
                        'layout': {
                            'text-field': ['to-string', ['get', 'identificadorMI']]

                        },
                        'paint': {

                        }
                    }
                ]
            }
        ]
    },
    'mapeamento-interesse-da-forca-2022': {
        title: 'Map Int F Ter 2022',
        group: "Entregas",
        subgroup: "2022",
        description: 'O objetivo do presente projeto consistiu na elaboração de cartas topográfica em escalas entre 1:25.000 e 1:250.000 de áreas de interesse da Força Terrestre pelo território nacional. A Área de Suprimento Cartográfico (ASC) do 1º Centro de Geoinformação (1º CGEO) corresponde à área de responsabilidade do Comando Militar do Sul (CMS), abrangendo os estados do Rio Grande do Sul, Santa Catarina e Paraná. Dessa forma, o 1º CGEO será responsável por executar esse projeto em sua respectiva área de responsabilidade.',
        lotes: [
            {
                name: 'mapintfter-2022-sub-meta-a1-carta-topo-25k-florianopolis',
                subtitle: 'Carta Topográfica 1:25.000 de Florianópolis',
                description: 'Construção de 09 cartas topográficas na escala 1:25.000 visando atender a atualização das capitais do ASC.',
                zoom: [
                    [-48.82809677372772, -28.05547382461215], // southwestern corner of the bounds
                    [-48.046903497479974, -27.1945079332596] // northeastern corner of the bounds
                ],
                legend: [2],
                styles: [
                    {
                        'id': 'mapintfter-2022-sub-meta-a1-carta-topo-25k-florianopolis-fill',
                        'source': 'mapintfter-2022-sub-meta-a1-carta-topo-25k-florianopolis',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'mapintfter-2022-sub-meta-a1-carta-topo-25k-florianopolis-border',
                        'source': 'mapintfter-2022-sub-meta-a1-carta-topo-25k-florianopolis',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'mapintfter-2022-sub-meta-a1-carta-topo-25k-florianopolis-text',
                        'source': 'mapintfter-2022-sub-meta-a1-carta-topo-25k-florianopolis',
                        "type": "symbol",
                        "maxzoom": 10,
                        "minzoom": 8.86,
                        'layout': {
                            'text-field': ['to-string', ['get', 'identificadorMI']]

                        },
                        'paint': {

                        }
                    }
                ]
            },
            {
                name: 'mapintfter-2022-sub-meta-a2-carta-topo-25k-uruguaiana',
                subtitle: 'Carta Topográfica 1:25.000 de Uruguaiana',
                description: 'Construção de 02 cartas topográficas na escala 1:25.000 visando atender a atualização das campos de instrução das ASC.',
                zoom: [
                    [-57.33202394228996, -30.055420752836497], // southwestern corner of the bounds
                    [-56.79297573646644, -29.444567158256913] // northeastern corner of the bounds
                ],
                legend: [2],
                styles: [
                    {
                        'id': 'mapintfter-2022-sub-meta-a2-carta-topo-25k-uruguaiana-fill',
                        'source': 'mapintfter-2022-sub-meta-a2-carta-topo-25k-uruguaiana',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'mapintfter-2022-sub-meta-a2-carta-topo-25k-uruguaiana-border',
                        'source': 'mapintfter-2022-sub-meta-a2-carta-topo-25k-uruguaiana',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'mapintfter-2022-sub-meta-a2-carta-topo-25k-uruguaiana-text',
                        'source': 'mapintfter-2022-sub-meta-a2-carta-topo-25k-uruguaiana',
                        "type": "symbol",
                        "maxzoom": 10,
                        "minzoom": 8.86,
                        'layout': {
                            'text-field': ['to-string', ['get', 'identificadorMI']]

                        },
                        'paint': {

                        }
                    }
                ]
            },
            {
                name: 'mapintfter-2022-sub-meta-b-carta-topo-50k-rr',
                subtitle: 'Carta Topográfica 1:50.000 de Roraima',
                description: 'Construção de 22 cartas topográficas na escala 1:50.000 na região da fronteira de Roraima.',
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
                        'id': 'mapintfter-2022-sub-meta-b-carta-topo-50k-rr-fill',
                        'source': 'mapintfter-2022-sub-meta-b-carta-topo-50k-rr',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'mapintfter-2022-sub-meta-b-carta-topo-50k-rr-border',
                        'source': 'mapintfter-2022-sub-meta-b-carta-topo-50k-rr',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'mapintfter-2022-sub-meta-b-carta-topo-50k-rr-text',
                        'source': 'mapintfter-2022-sub-meta-b-carta-topo-50k-rr',
                        "type": "symbol",
                        "maxzoom": 10,
                        "minzoom": 6.03,
                        'layout': {
                            'text-field': ['to-string', ['get', 'identificadorMI']]

                        },
                        'paint': {

                        }
                    }
                ]
            },
            {
                name: 'mapintfter-2022-sub-meta-c-carta-topo-100k-rs-sc',
                subtitle: 'Generalização Carta Topográfica 1:100.000',
                description: 'O objetivo do presente projeto consistiu em realizar a Generalização Cartográfica na escala 1:100.000 de produtos na região de Santa Catarina e Rio Grande do Sul, para gerar 12 cartas topográficas na escala 1:100.000.',
                zoom: [
                    [-52.209372285465335, -31.180376012441414],
                    [-49.79062798683473, -26.319489869099446]
                ],
                legend: [2],
                styles: [
                    {
                        'id': 'mapintfter-2022-sub-meta-c-carta-topo-100k-rs-sc-fill',
                        'source': 'mapintfter-2022-sub-meta-c-carta-topo-100k-rs-sc',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'mapintfter-2022-sub-meta-c-carta-topo-100k-rs-sc-border',
                        'source': 'mapintfter-2022-sub-meta-c-carta-topo-100k-rs-sc',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'mapintfter-2022-sub-meta-c-carta-topo-100k-rs-sc-text',
                        'source': 'mapintfter-2022-sub-meta-c-carta-topo-100k-rs-sc',
                        "type": "symbol",
                        "maxzoom": 10,
                        "minzoom": 4.56,
                        'layout': {
                            'text-field': ['to-string', ['get', 'identificadorMI']]

                        },
                        'paint': {

                        }
                    }
                ]
            }
        ]
    },
    'rio-grande-do-sul-2022': {
        title: 'Convênio RS - RF1',
        group: "Entregas",
        subgroup: "2022",
        description: 'O objetivo principal do projeto foi a generalização cartográfica do Profeto do Convênio RS totalizando 37 carta topográfica em 1:50.000.',
        lotes: [
            {
                name: 'conv-rs-carta-topo-50k-rs',
                subtitle: '1:50.000',
                description: 'Produção de cartas topográficas 1:50.000 por processo de generalização',
                zoom: [
                    [
                        -53.07164719034553,
                        -31.604238517208366
                    ],
                    [
                        -49.139097694440665,
                        -29.11968658972779
                    ]
                ],
                legend: [2],
                styles: [
                    {
                        'id': 'conv-rs-carta-topo-50k-rs-fill',
                        'source': 'conv-rs-carta-topo-50k-rs',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'conv-rs-carta-topo-50k-rs-border',
                        'source': 'conv-rs-carta-topo-50k-rs',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'conv-rs-carta-topo-50k-rs-text',
                        'source': 'conv-rs-carta-topo-50k-rs',
                        "type": "symbol",
                        "maxzoom": 10,
                        "minzoom": 8.89,
                        'layout': {
                            'text-field': ['to-string', ['get', 'identificadorMI']]

                        },
                        'paint': {

                        }
                    }
                ]
            }
        ]
    },
    'rio-grande-do-sul-2021': {
        title: 'Convênio RS - RF1',
        group: "Entregas",
        subgroup: "2021",
        description: 'O objetivo principal do projeto foi a elaboração de 174 (cento e setenta e quatro) cartas topográficas na escala 1:25.000, e seus respectivos insumos geoespaciais (ortoimagens, modelos digitais de elevação e dados geoespaciais vetoriais), correspondentes à RF 1, compreendendo Porto Alegre, Região Metropolitana e municípios adjacentes, identificadas segundo a nomenclatura utilizada no Mapa-Índice (MI), de acordo com as Normas e Especificações Técnicas previstas para a Infraestrutura Nacional de Dados Espaciais (INDE).',
        lotes: [
            {
                name: 'conv-rs-carta-topo-25k-rs',
                subtitle: '1:25.000',
                description: 'A elaboração das cartas topográficas foi executada em 5 (cinco) lotes de produção cartográfica. Além da base cartográfica digital contínua, foram entregues as imagens brutas, os modelos digitais de superfície, os modelos digitais do terreno e as ortoimagens de cada carta produzida, além da carta topográfica em formato matricial.',
                zoom: [
                    [
                        -53.08078039276313,
                        -31.599938879777334
                    ],
                    [
                        -49.102955546684086,
                        -29.08630601676895
                    ]
                ],
                legend: [2],
                styles: [
                    {
                        'id': 'conv-rs-carta-topo-25k-rs-fill',
                        'source': 'conv-rs-carta-topo-25k-rs',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'conv-rs-carta-topo-25k-rs-border',
                        'source': 'conv-rs-carta-topo-25k-rs',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'conv-rs-carta-topo-25k-rs-text',
                        'source': 'conv-rs-carta-topo-25k-rs',
                        "type": "symbol",
                        "maxzoom": 10,
                        "minzoom": 8.89,
                        'layout': {
                            'text-field': ['to-string', ['get', 'identificadorMI']]

                        },
                        'paint': {

                        }
                    }
                ]
            }
        ]
    },
    'sisfron-17rcmec-2021': {
        title: 'SISFRON - 17º RC Mec',
        group: "Entregas",
        subgroup: "2021",
        description: 'Execução de generalização cartográfica do Projeto SISFRON - 17º RC Mec nas escalas 1:50.000 e 1:100.000, totalizando 15 cartas topográficas e seus dados vetoriais na região de fronteira do Paraná.',
        lotes: [
            {
                name: 'sisfron-17rcmec-carta-topo-50k-pr',
                subtitle: '1:50.000',
                description: 'Execução de mapeamento topográfico na escalas 1:50.000 de 12 cartas topográficas e seus dados vetoriais na região de fronteira do Paraná.',
                zoom: [
                    [-54.69732378130477, -24.6805561899923],
                    [-53.30267614980163, -22.81940267434254]
                ],
                legend: [2],
                styles: [
                    {
                        'id': 'sisfron-17rcmec-carta-topo-50k-pr-fill',
                        'source': 'sisfron-17rcmec-carta-topo-50k-pr',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'sisfron-17rcmec-carta-topo-50k-pr-border',
                        'source': 'sisfron-17rcmec-carta-topo-50k-pr',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'sisfron-17rcmec-carta-topo-50k-pr-text',
                        'source': 'sisfron-17rcmec-carta-topo-50k-pr',
                        "type": "symbol",
                        "maxzoom": 10,
                        "minzoom": 7.89,
                        'layout': {
                            'text-field': ['to-string', ['get', 'identificadorMI']]

                        },
                        'paint': {

                        }
                    }
                ]
            },
            {
                name: 'sisfron-17rcmec-carta-topo-100k-pr',
                subtitle: '1:100.000',
                description: 'Execução de mapeamento topográfico na escalas 1:100.000 de 03 cartas topográficas e seus dados vetoriais na região de fronteira do Paraná.',
                zoom: [
                    [-54.69732378130477, -24.6805561899923],
                    [-53.30267614980163, -22.81940267434254]
                ],
                legend: [2],
                styles: [
                    {
                        'id': 'sisfron-17rcmec-carta-topo-100k-pr-fill',
                        'source': 'sisfron-17rcmec-carta-topo-100k-pr',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'sisfron-17rcmec-carta-topo-100k-pr-border',
                        'source': 'sisfron-17rcmec-carta-topo-100k-pr',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'sisfron-17rcmec-carta-topo-100k-pr-text',
                        'source': 'sisfron-17rcmec-carta-topo-100k-pr',
                        "type": "symbol",
                        "maxzoom": 10,
                        "minzoom": 7.89,
                        'layout': {
                            'text-field': ['to-string', ['get', 'identificadorMI']]

                        },
                        'paint': {

                        }
                    }
                ]
            }
        ]
    },
    'uraricoera': {
        title: 'Exercício Uraricoera',
        group: "Entregas",
        subgroup: "2021",
        description: 'O objetivo do presente projeto consistiu na elaboração de 48 cartas topográficas na escala 1:50.000 distribuídas no estado de Roraima visando atender demanda do COTER relativa a realização de exercícios de Problemas Militares Simulados.',
        lotes: [
            {
                name: 'uraricoera',
                subtitle: '',
                zoom: [
                    [-61.68024984824885, 1.3191292999480237],
                    [-60.31974985130867, 4.9308586451198915]
                ],
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
                        "minzoom": 7.26,
                        'layout': {
                            'text-field': ['to-string', ['get', 'identificadorMI']]

                        },
                        'paint': {

                        }
                    }
                ]
            }
        ]
    },
    'sisfron-17rcmec-2020': {
        title: 'SISFRON - 17º RC Mec',
        group: "Entregas",
        subgroup: "2020",
        description: 'Execução de mapeamento topográfico, na escala 1:25.000, totalizando 44 cartas topográficas e seus dados vetoriais na região de fronteira do Paraná.',
        lotes: [
            {
                name: 'sisfron-17rcmec-carta-topo-25k-pr',
                subtitle: '1:25.000',
                description: 'Execução de mapeamento topográfico na escalas 1:25.000 de 44 cartas topográficas e seus dados vetoriais na região de fronteira do Paraná.',
                zoom: [
                    [-54.69732378130477, -24.6805561899923],
                    [-53.30267614980163, -22.81940267434254]
                ],
                legend: [2],
                styles: [
                    {
                        'id': 'sisfron-17rcmec-carta-topo-25k-pr-fill',
                        'source': 'sisfron-17rcmec-carta-topo-25k-pr',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'sisfron-17rcmec-carta-topo-25k-pr-border',
                        'source': 'sisfron-17rcmec-carta-topo-25k-pr',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'sisfron-17rcmec-carta-topo-25k-pr-text',
                        'source': 'sisfron-17rcmec-carta-topo-25k-pr',
                        "type": "symbol",
                        "maxzoom": 10,
                        "minzoom": 8.89,
                        'layout': {
                            'text-field': ['to-string', ['get', 'identificadorMI']]

                        },
                        'paint': {

                        }
                    }
                ]
            }
        ]
    },
    'santa-catarina-2019': {
        title: 'Map Int F Ter - Santa Catarina',
        group: "Entregas",
        subgroup: "2019",
        description: 'Execução de generalização cartográfica do Projeto do Vazio SC, totalizando 42 folhas na escala 1:50.000 na região do Santa Catarina.',
        lotes: [
            {
                name: 'santa-catarina-50k',
                subtitle: 'Escala 1:50.000',
                zoom: [
                    [-52.454258275555226, -28.680443365430413],
                    [-49.79574195439098, -26.069483443263103]
                ],
                legend: [2],
                styles: [
                    {
                        'id': 'santa-catarina-50k-fill',
                        'source': 'santa-catarina-50k',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'santa-catarina-50k-border',
                        'source': 'santa-catarina-50k',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'santa-catarina-50k-text',
                        'source': 'santa-catarina-50k',
                        "type": "symbol",
                        "maxzoom": 10,
                        "minzoom": 7.4,
                        'layout': {
                            'text-field': ['to-string', ['get', 'identificadorMI']]

                        },
                        'paint': {

                        }
                    }
                ]
            }
        ]
    },
    'santa-catarina-2018': {
        title: 'Map Int F Ter - Santa Catarina',
        group: "Entregas",
        subgroup: "2018",
        description: 'Execução de mapeamento topográfico, totalizando 168 folhas na escala 1:25.000, da Área de Suprimento Cartográfico (ASC) do 1º Centro de Geoinformação na região de Santa Catarina.',
        lotes: [
            {
                name: 'santa-catarina-25k',
                subtitle: 'Escala 1:25.000',
                zoom: [
                    [
                        -52.5586923820878,
                        -28.700997713134676
                    ],
                    [
                        -48.54318247763669,
                        -26.090528839826753
                    ]
                ],
                legend: [2],
                styles: [
                    {
                        'id': 'santa-catarina-25k-fill',
                        'source': 'santa-catarina-25k',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'santa-catarina-25k-border',
                        'source': 'santa-catarina-25k',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'santa-catarina-25k-text',
                        'source': 'santa-catarina-25k',
                        "type": "symbol",
                        "maxzoom": 10,
                        "minzoom": 9.01,
                        'layout': {
                            'text-field': ['to-string', ['get', 'identificadorMI']]

                        },
                        'paint': {

                        }
                    }
                ]
            }
        ]
    },
    'campo-instrucao': {
        title: 'Map Int F Ter - Campos de Instrução',
        group: "Entregas",
        subgroup: "2018",
        description: 'Execução de mapeamento topográfico na escala 1:25.000 e 1:50.000, referentes à 05 Campos de Instrução da Área de Suprimento Cartográfico (ASC) do 1º Centro de Geoinformação e que estão contidos na área de responsabilidade do Comando Militar do Sul.',
        lotes: [
            { // CI 25K
                name: 'campo-instrucao-25k',
                subtitle: 'Escala 1:25.000',
                description: 'Os campos mapeados foram CIB, CISM, CIR, CIMH e CIBSB, totalizando 24 cartas topográficas.',
                zoom: [
                    [
                        -56.18915089919898,
                        -31.213375905552738
                    ],
                    [
                        -48.04916183186424,
                        -25.982504667730154
                    ]
                ],
                legend: [2],
                styles: [
                    {
                        'id': 'campo-instrucao-25k-fill',
                        'source': 'campo-instrucao-25k',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'campo-instrucao-25k-border',
                        'source': 'campo-instrucao-25k',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'campo-instrucao-25k-text',
                        'source': 'campo-instrucao-25k',
                        "type": "symbol",
                        "maxzoom": 10,
                        "minzoom": 8.86,
                        'layout': {
                            'text-field': ['to-string', ['get', 'identificadorMI']]

                        },
                        'paint': {

                        }
                    }
                ]
            },
            { // CI 50K
                name: 'campo-instrucao-50k',
                subtitle: 'Escala 1:50.000',
                description: 'Os campos mapeados foram CIB, CISM, CIR, CIMH e CIBSB, totalizando 6 cartas topográficas.',
                zoom: [
                    [
                        -56.66123922488663,
                        -31.498994346004366
                    ],
                    [
                        -47.59830566095303,
                        -25.675197661624992
                    ]
                ],
                legend: [2],
                styles: [
                    {
                        'id': 'campo-instrucao-50k-fill',
                        'source': 'campo-instrucao-50k',
                        'type': 'fill',
                        'layout': {},
                        'paint': {
                            'fill-opacity': 0.9
                        }
                    },
                    {
                        'id': 'campo-instrucao-50k-border',
                        'source': 'campo-instrucao-50k',
                        'type': 'line',
                        'layout': {},
                        'paint': {
                            'line-color': '#050505',
                            'line-width': 0.5
                        }
                    },
                    {
                        'id': 'campo-instrucao-50k-text',
                        'source': 'campo-instrucao-50k',
                        "type": "symbol",
                        "maxzoom": 10,
                        "minzoom": 9.01,
                        'layout': {
                            'text-field': ['to-string', ['get', 'identificadorMI']]

                        },
                        'paint': {

                        }
                    }
                ]
            }
        ]
    },
    'radiografia': {
        title: 'Projeto Radiografia da Amazônia',
        group: "Entregas",
        subgroup: "2018",
        description: 'O 1º CGEO foi responsável pela aquisição dos dados geoespaciais vetoriais (altimetria, hidrografia e planimetria) e edição de cartas topográficas, com base nos dados geoespaciais de vegetação obtidos pelo 2º CGEO (Brasília-DF), da área já imageada do projeto.',
        lotes: [
            { // RAM
                name: 'radiografia-am',
                subtitle: '',
                zoom: [
                    [
                        -75.4914065314648,
                        -13.074583626077953
                    ],
                    [
                        -45.8294395582202,
                        8.500903062364785
                    ]
                ],
                legend: [2],
                styles: [
                    {
                        'id': 'radiografia-am-fill',
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
                        "minzoom": 7.4,
                        'layout': {
                            'text-field': ['to-string', ['get', 'identificadorMI']]

                        },
                        'paint': {

                        }
                    }
                ]
            }
        ]
    }
}
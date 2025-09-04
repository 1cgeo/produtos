import json
import pandas as pd
from datetime import datetime
import numpy as np

def carregar_dados_topograficos(arquivos):
    """
    Carrega dados dos arquivos GeoJSON e extrai informações das edições topográficas e ortoimagem
    """
    dados_por_escala = {}
    
    for arquivo in arquivos:
        # Extrair escala do nome do arquivo (25k, 50k, 100k, 250k)
        escala = arquivo.split('-')[-1].replace('.geojson', '')
        
        try:
            with open(arquivo, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            edicoes_por_carta_topo = []
            edicoes_por_carta_combinada = []
            
            # Extrair edições de cada feature
            for feature in data['features']:
                edicoes_topo = feature['properties'].get('edicoes_topo', [])
                edicoes_orto = feature['properties'].get('edicoes_orto', [])
                
                # Análise apenas topográficas
                if edicoes_topo:
                    anos_topo = [int(ano) for ano in edicoes_topo if ano.isdigit()]
                    if anos_topo:
                        edicoes_por_carta_topo.append(anos_topo)
                
                # Análise combinada (topográfica + ortoimagem)
                anos_todos = []
                if edicoes_topo:
                    anos_todos.extend([int(ano) for ano in edicoes_topo if ano.isdigit()])
                if edicoes_orto:
                    anos_todos.extend([int(ano) for ano in edicoes_orto if ano.isdigit()])
                
                if anos_todos:
                    edicoes_por_carta_combinada.append(anos_todos)
            
            dados_por_escala[escala] = {
                'topo_apenas': edicoes_por_carta_topo,
                'combinada': edicoes_por_carta_combinada
            }
            
            print(f"Escala {escala}: {len(edicoes_por_carta_topo)} cartas topo, {len(edicoes_por_carta_combinada)} cartas combinadas")
            
        except FileNotFoundError:
            print(f"Arquivo {arquivo} não encontrado, pulando...")
        except Exception as e:
            print(f"Erro ao carregar {arquivo}: {e}")
    
    return dados_por_escala

def calcular_media_anual(dados_por_escala, tipo_analise='topo_apenas', ano_inicial=2000, ano_final=None):
    """
    Calcula a média anual dos anos máximos das cartas por escala e geral
    tipo_analise: 'topo_apenas' ou 'combinada'
    """
    if ano_final is None:
        ano_final = datetime.now().year
    
    resultados = []
    
    for ano in range(ano_inicial, ano_final + 1):
        resultado_ano = {'ano': ano}
        todos_anos_maximos = []  # Para cálculo da média geral
        
        for escala, dados_escala in dados_por_escala.items():
            cartas = dados_escala[tipo_analise]
            anos_maximos = []
            
            for edicoes_carta in cartas:
                # Filtrar apenas edições até o ano atual
                edicoes_ate_ano = [ed for ed in edicoes_carta if ed <= ano]
                
                if edicoes_ate_ano:
                    # Pegar o maior ano disponível para esta carta até este momento
                    ano_maximo = max(edicoes_ate_ano)
                    anos_maximos.append(ano_maximo)
            
            # Calcular média se há dados
            if anos_maximos:
                media_escala = np.mean(anos_maximos)
                resultado_ano[f'media_{escala}'] = round(media_escala, 2)
                resultado_ano[f'cartas_com_dados_{escala}'] = len(anos_maximos)
                # Adicionar à lista geral
                todos_anos_maximos.extend(anos_maximos)
            else:
                resultado_ano[f'media_{escala}'] = None
                resultado_ano[f'cartas_com_dados_{escala}'] = 0
        
        # Calcular média geral (todas as escalas)
        if todos_anos_maximos:
            media_geral = np.mean(todos_anos_maximos)
            resultado_ano['media_geral'] = round(media_geral, 2)
            resultado_ano['total_cartas_com_dados'] = len(todos_anos_maximos)
        else:
            resultado_ano['media_geral'] = None
            resultado_ano['total_cartas_com_dados'] = 0
        
        resultados.append(resultado_ano)
    
    return resultados

def calcular_gap_anual(dados_por_escala, tipo_analise='topo_apenas', ano_inicial=2000, ano_final=None):
    """
    Calcula o gap anual (diferença entre ano atual e ano médio das cartas) por escala e geral
    tipo_analise: 'topo_apenas' ou 'combinada'
    """
    if ano_final is None:
        ano_final = datetime.now().year
    
    resultados_gap = []
    
    for ano in range(ano_inicial, ano_final + 1):
        resultado_ano = {'ano': ano}
        todos_anos_maximos = []  # Para cálculo do gap geral
        
        for escala, dados_escala in dados_por_escala.items():
            cartas = dados_escala[tipo_analise]
            anos_maximos = []
            
            for edicoes_carta in cartas:
                # Filtrar apenas edições até o ano atual
                edicoes_ate_ano = [ed for ed in edicoes_carta if ed <= ano]
                
                if edicoes_ate_ano:
                    # Pegar o maior ano disponível para esta carta até este momento
                    ano_maximo = max(edicoes_ate_ano)
                    anos_maximos.append(ano_maximo)
            
            # Calcular gap se há dados
            if anos_maximos:
                media_escala = np.mean(anos_maximos)
                gap_escala = ano - media_escala
                resultado_ano[f'gap_{escala}'] = round(gap_escala, 2)
                resultado_ano[f'cartas_com_dados_{escala}'] = len(anos_maximos)
                # Adicionar à lista geral
                todos_anos_maximos.extend(anos_maximos)
            else:
                resultado_ano[f'gap_{escala}'] = None
                resultado_ano[f'cartas_com_dados_{escala}'] = 0
        
        # Calcular gap geral (todas as escalas)
        if todos_anos_maximos:
            media_geral = np.mean(todos_anos_maximos)
            gap_geral = ano - media_geral
            resultado_ano['gap_geral'] = round(gap_geral, 2)
            resultado_ano['total_cartas_com_dados'] = len(todos_anos_maximos)
        else:
            resultado_ano['gap_geral'] = None
            resultado_ano['total_cartas_com_dados'] = 0
        
        resultados_gap.append(resultado_ano)
    
    return resultados_gap

def analisar_cartas_topograficas():
    """
    Função principal para análise das cartas topográficas
    """
    # Lista de arquivos a serem processados
    arquivos = [
        'situacao-geral-ct-25k.geojson',
        'situacao-geral-ct-50k.geojson', 
        'situacao-geral-ct-100k.geojson',
        'situacao-geral-ct-250k.geojson'
    ]
    
    print("=== Análise Temporal de Cartas Topográficas ===\n")
    
    # Carregar dados
    print("1. Carregando dados dos arquivos GeoJSON...")
    dados_por_escala = carregar_dados_topograficos(arquivos)
    
    if not dados_por_escala:
        print("Nenhum arquivo foi carregado com sucesso!")
        return None, None, None, None
    
    print("\n" + "="*60)
    print("ANÁLISE 1: APENAS CARTAS TOPOGRÁFICAS")
    print("="*60)
    
    # Calcular médias anuais - apenas topográficas
    print("\n2. Calculando médias anuais (apenas topográficas)...")
    resultados_media_topo = calcular_media_anual(dados_por_escala, 'topo_apenas')
    df_media_topo = pd.DataFrame(resultados_media_topo)
    
    # Calcular gaps anuais - apenas topográficas
    print("3. Calculando gaps anuais (apenas topográficas)...")
    resultados_gap_topo = calcular_gap_anual(dados_por_escala, 'topo_apenas')
    df_gap_topo = pd.DataFrame(resultados_gap_topo)
    
    # Mostrar resultados topográficas
    print(f"\n4. Resultados MÉDIAS TOPOGRÁFICAS de {resultados_media_topo[0]['ano']} a {resultados_media_topo[-1]['ano']}:")
    colunas_medias = ['ano'] + [col for col in df_media_topo.columns if col.startswith('media_')]
    print("Últimos 5 anos:")
    print(df_media_topo[colunas_medias].tail().to_string(index=False))
    
    print(f"\n5. Resultados GAPS TOPOGRÁFICAS:")
    colunas_gaps = ['ano'] + [col for col in df_gap_topo.columns if col.startswith('gap_')]
    print("Últimos 5 anos:")
    print(df_gap_topo[colunas_gaps].tail().to_string(index=False))
    
    print("\n" + "="*60)
    print("ANÁLISE 2: CARTAS TOPOGRÁFICAS + ORTOIMAGEM")
    print("="*60)
    
    # Calcular médias anuais - combinada
    print("\n6. Calculando médias anuais (topográficas + ortoimagem)...")
    resultados_media_comb = calcular_media_anual(dados_por_escala, 'combinada')
    df_media_comb = pd.DataFrame(resultados_media_comb)
    
    # Calcular gaps anuais - combinada
    print("7. Calculando gaps anuais (topográficas + ortoimagem)...")
    resultados_gap_comb = calcular_gap_anual(dados_por_escala, 'combinada')
    df_gap_comb = pd.DataFrame(resultados_gap_comb)
    
    # Mostrar resultados combinada
    print(f"\n8. Resultados MÉDIAS COMBINADAS de {resultados_media_comb[0]['ano']} a {resultados_media_comb[-1]['ano']}:")
    print("Últimos 5 anos:")
    print(df_media_comb[colunas_medias].tail().to_string(index=False))
    
    print(f"\n9. Resultados GAPS COMBINADAS:")
    print("Últimos 5 anos:")
    print(df_gap_comb[colunas_gaps].tail().to_string(index=False))
    
    # Mostrar estatísticas gerais
    print("\n10. Resumo dos dados carregados:")
    total_topo = 0
    total_comb = 0
    for escala, dados_escala in dados_por_escala.items():
        cartas_topo = len(dados_escala['topo_apenas'])
        cartas_comb = len(dados_escala['combinada'])
        total_topo += cartas_topo
        total_comb += cartas_comb
        print(f"   Escala {escala}: {cartas_topo} cartas topo, {cartas_comb} cartas combinadas")
    print(f"   TOTAL TOPOGRÁFICAS: {total_topo} cartas")
    print(f"   TOTAL COMBINADAS: {total_comb} cartas")
    
    # Salvar resultados
    df_media_topo.to_csv('analise_temporal_cartas_medias_TOPO.csv', index=False)
    df_gap_topo.to_csv('analise_temporal_cartas_gaps_TOPO.csv', index=False)
    df_media_topo[colunas_medias].to_csv('medias_anuais_cartas_TOPO.csv', index=False)
    df_gap_topo[colunas_gaps].to_csv('gaps_anuais_cartas_TOPO.csv', index=False)
    
    df_media_comb.to_csv('analise_temporal_cartas_medias_COMBINADA.csv', index=False)
    df_gap_comb.to_csv('analise_temporal_cartas_gaps_COMBINADA.csv', index=False)
    df_media_comb[colunas_medias].to_csv('medias_anuais_cartas_COMBINADA.csv', index=False)
    df_gap_comb[colunas_gaps].to_csv('gaps_anuais_cartas_COMBINADA.csv', index=False)
    
    print(f"\n11. Resultados salvos:")
    print("   APENAS TOPOGRÁFICAS:")
    print("   - analise_temporal_cartas_medias_TOPO.csv")
    print("   - analise_temporal_cartas_gaps_TOPO.csv")
    print("   - medias_anuais_cartas_TOPO.csv")
    print("   - gaps_anuais_cartas_TOPO.csv")
    print("   TOPOGRÁFICAS + ORTOIMAGEM:")
    print("   - analise_temporal_cartas_medias_COMBINADA.csv")
    print("   - analise_temporal_cartas_gaps_COMBINADA.csv")
    print("   - medias_anuais_cartas_COMBINADA.csv")
    print("   - gaps_anuais_cartas_COMBINADA.csv")
    
    return df_media_topo, df_gap_topo, df_media_comb, df_gap_comb

def plotar_evolucao_medias(df_media_topo, df_media_comb):
    """
    Plota a evolução temporal das médias - gráficos para topográficas e combinadas
    """
    try:
        import matplotlib.pyplot as plt
        
        # Configurar estilo
        plt.style.use('default')
        
        # GRÁFICO 1: Evolução das médias por escala - TOPOGRÁFICAS
        plt.figure(figsize=(14, 8))
        
        escalas = ['25k', '50k', '100k', '250k']
        cores = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728']
        
        for escala, cor in zip(escalas, cores):
            coluna_media = f'media_{escala}'
            if coluna_media in df_media_topo.columns:
                dados_validos = df_media_topo.dropna(subset=[coluna_media])
                if not dados_validos.empty:
                    plt.plot(dados_validos['ano'], dados_validos[coluna_media], 
                            marker='o', label=f'Escala 1:{escala}', color=cor, 
                            linewidth=2, markersize=4)
        
        plt.xlabel('Ano', fontsize=12)
        plt.ylabel('Ano Médio das Cartas', fontsize=12)
        plt.title('Evolução da Idade Média das Cartas Topográficas por Escala', fontsize=14, fontweight='bold')
        plt.legend(fontsize=11)
        plt.grid(True, alpha=0.3)
        plt.tight_layout()
        
        plt.savefig('evolucao_medias_por_escala_TOPO.png', dpi=300, bbox_inches='tight')
        plt.show()
        
        # GRÁFICO 2: Evolução da média geral - TOPOGRÁFICAS
        plt.figure(figsize=(12, 8))
        
        dados_validos_geral = df_media_topo.dropna(subset=['media_geral'])
        
        if not dados_validos_geral.empty:
            plt.plot(dados_validos_geral['ano'], dados_validos_geral['media_geral'], 
                    marker='o', color='#9467bd', linewidth=3, markersize=6, 
                    label='Média Geral Topográficas')
        
        plt.xlabel('Ano', fontsize=12)
        plt.ylabel('Ano Médio das Cartas', fontsize=12)
        plt.title('Evolução da Idade Média das Cartas Topográficas - Média Geral', 
                 fontsize=14, fontweight='bold')
        plt.legend(fontsize=11)
        plt.grid(True, alpha=0.3)
        plt.tight_layout()
        
        plt.savefig('evolucao_media_geral_TOPO.png', dpi=300, bbox_inches='tight')
        plt.show()
        
        # GRÁFICO 3: Evolução das médias por escala - COMBINADAS
        plt.figure(figsize=(14, 8))
        
        for escala, cor in zip(escalas, cores):
            coluna_media = f'media_{escala}'
            if coluna_media in df_media_comb.columns:
                dados_validos = df_media_comb.dropna(subset=[coluna_media])
                if not dados_validos.empty:
                    plt.plot(dados_validos['ano'], dados_validos[coluna_media], 
                            marker='s', label=f'Escala 1:{escala}', color=cor, 
                            linewidth=2, markersize=4)
        
        plt.xlabel('Ano', fontsize=12)
        plt.ylabel('Ano Médio das Cartas', fontsize=12)
        plt.title('Evolução da Idade Média das Cartas (Topográficas + Ortoimagem) por Escala', fontsize=14, fontweight='bold')
        plt.legend(fontsize=11)
        plt.grid(True, alpha=0.3)
        plt.tight_layout()
        
        plt.savefig('evolucao_medias_por_escala_COMBINADA.png', dpi=300, bbox_inches='tight')
        plt.show()
        
        # GRÁFICO 4: Evolução da média geral - COMBINADAS
        plt.figure(figsize=(12, 8))
        
        dados_validos_geral_comb = df_media_comb.dropna(subset=['media_geral'])
        
        if not dados_validos_geral_comb.empty:
            plt.plot(dados_validos_geral_comb['ano'], dados_validos_geral_comb['media_geral'], 
                    marker='s', color='#17becf', linewidth=3, markersize=6, 
                    label='Média Geral Combinada')
        
        plt.xlabel('Ano', fontsize=12)
        plt.ylabel('Ano Médio das Cartas', fontsize=12)
        plt.title('Evolução da Idade Média das Cartas (Topográficas + Ortoimagem) - Média Geral', 
                 fontsize=14, fontweight='bold')
        plt.legend(fontsize=11)
        plt.grid(True, alpha=0.3)
        plt.tight_layout()
        
        plt.savefig('evolucao_media_geral_COMBINADA.png', dpi=300, bbox_inches='tight')
        plt.show()
        
        # GRÁFICO 5: Comparação entre médias gerais
        plt.figure(figsize=(12, 8))
        
        if not dados_validos_geral.empty:
            plt.plot(dados_validos_geral['ano'], dados_validos_geral['media_geral'], 
                    marker='o', color='#9467bd', linewidth=3, markersize=6, 
                    label='Apenas Topográficas', linestyle='-')
        
        if not dados_validos_geral_comb.empty:
            plt.plot(dados_validos_geral_comb['ano'], dados_validos_geral_comb['media_geral'], 
                    marker='s', color='#17becf', linewidth=3, markersize=6, 
                    label='Topográficas + Ortoimagem', linestyle='--')
        
        plt.xlabel('Ano', fontsize=12)
        plt.ylabel('Ano Médio das Cartas', fontsize=12)
        plt.title('Comparação: Médias Gerais (Topográficas vs Combinadas)', 
                 fontsize=14, fontweight='bold')
        plt.legend(fontsize=11)
        plt.grid(True, alpha=0.3)
        plt.tight_layout()
        
        plt.savefig('comparacao_medias_gerais.png', dpi=300, bbox_inches='tight')
        plt.show()
        
        print("Gráficos de médias salvos:")
        print("- evolucao_medias_por_escala_TOPO.png")
        print("- evolucao_media_geral_TOPO.png")
        print("- evolucao_medias_por_escala_COMBINADA.png")
        print("- evolucao_media_geral_COMBINADA.png")
        print("- comparacao_medias_gerais.png")
        
    except ImportError:
        print("Matplotlib não disponível. Instale com: pip install matplotlib")

def plotar_evolucao_gaps(df_gap_topo, df_gap_comb):
    """
    Plota a evolução temporal dos gaps - gráficos para topográficas e combinadas
    """
    try:
        import matplotlib.pyplot as plt
        
        # Configurar estilo
        plt.style.use('default')
        
        # GRÁFICO 1: Evolução dos gaps por escala - TOPOGRÁFICAS
        plt.figure(figsize=(14, 8))
        
        escalas = ['25k', '50k', '100k', '250k']
        cores = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728']
        
        for escala, cor in zip(escalas, cores):
            coluna_gap = f'gap_{escala}'
            if coluna_gap in df_gap_topo.columns:
                dados_validos = df_gap_topo.dropna(subset=[coluna_gap])
                if not dados_validos.empty:
                    plt.plot(dados_validos['ano'], dados_validos[coluna_gap], 
                            marker='o', label=f'Escala 1:{escala}', color=cor, 
                            linewidth=2, markersize=4)
        
        plt.xlabel('Ano', fontsize=12)
        plt.ylabel('Gap de Atualização (Anos)', fontsize=12)
        plt.title('Evolução do Gap de Atualização das Cartas Topográficas por Escala', fontsize=14, fontweight='bold')
        plt.legend(fontsize=11)
        plt.grid(True, alpha=0.3)
        plt.tight_layout()
        
        plt.savefig('evolucao_gaps_por_escala_TOPO.png', dpi=300, bbox_inches='tight')
        plt.show()
        
        # GRÁFICO 2: Evolução do gap geral - TOPOGRÁFICAS
        plt.figure(figsize=(12, 8))
        
        dados_validos_geral = df_gap_topo.dropna(subset=['gap_geral'])
        
        if not dados_validos_geral.empty:
            plt.plot(dados_validos_geral['ano'], dados_validos_geral['gap_geral'], 
                    marker='o', color='#e377c2', linewidth=3, markersize=6, 
                    label='Gap Geral Topográficas')
        
        plt.xlabel('Ano', fontsize=12)
        plt.ylabel('Gap de Atualização (Anos)', fontsize=12)
        plt.title('Evolução do Gap de Atualização das Cartas Topográficas - Gap Geral', 
                 fontsize=14, fontweight='bold')
        plt.legend(fontsize=11)
        plt.grid(True, alpha=0.3)
        plt.tight_layout()
        
        plt.savefig('evolucao_gap_geral_TOPO.png', dpi=300, bbox_inches='tight')
        plt.show()
        
        # GRÁFICO 3: Evolução dos gaps por escala - COMBINADAS
        plt.figure(figsize=(14, 8))
        
        for escala, cor in zip(escalas, cores):
            coluna_gap = f'gap_{escala}'
            if coluna_gap in df_gap_comb.columns:
                dados_validos = df_gap_comb.dropna(subset=[coluna_gap])
                if not dados_validos.empty:
                    plt.plot(dados_validos['ano'], dados_validos[coluna_gap], 
                            marker='s', label=f'Escala 1:{escala}', color=cor, 
                            linewidth=2, markersize=4)
        
        plt.xlabel('Ano', fontsize=12)
        plt.ylabel('Gap de Atualização (Anos)', fontsize=12)
        plt.title('Evolução do Gap de Atualização das Cartas (Topográficas + Ortoimagem) por Escala', fontsize=14, fontweight='bold')
        plt.legend(fontsize=11)
        plt.grid(True, alpha=0.3)
        plt.tight_layout()
        
        plt.savefig('evolucao_gaps_por_escala_COMBINADA.png', dpi=300, bbox_inches='tight')
        plt.show()
        
        # GRÁFICO 4: Evolução do gap geral - COMBINADAS
        plt.figure(figsize=(12, 8))
        
        dados_validos_geral_comb = df_gap_comb.dropna(subset=['gap_geral'])
        
        if not dados_validos_geral_comb.empty:
            plt.plot(dados_validos_geral_comb['ano'], dados_validos_geral_comb['gap_geral'], 
                    marker='s', color='#bcbd22', linewidth=3, markersize=6, 
                    label='Gap Geral Combinado')
        
        plt.xlabel('Ano', fontsize=12)
        plt.ylabel('Gap de Atualização (Anos)', fontsize=12)
        plt.title('Evolução do Gap de Atualização das Cartas (Topográficas + Ortoimagem) - Gap Geral', 
                 fontsize=14, fontweight='bold')
        plt.legend(fontsize=11)
        plt.grid(True, alpha=0.3)
        plt.tight_layout()
        
        plt.savefig('evolucao_gap_geral_COMBINADA.png', dpi=300, bbox_inches='tight')
        plt.show()
        
        # GRÁFICO 5: Comparação entre gaps gerais
        plt.figure(figsize=(12, 8))
        
        if not dados_validos_geral.empty:
            plt.plot(dados_validos_geral['ano'], dados_validos_geral['gap_geral'], 
                    marker='o', color='#e377c2', linewidth=3, markersize=6, 
                    label='Apenas Topográficas', linestyle='-')
        
        if not dados_validos_geral_comb.empty:
            plt.plot(dados_validos_geral_comb['ano'], dados_validos_geral_comb['gap_geral'], 
                    marker='s', color='#bcbd22', linewidth=3, markersize=6, 
                    label='Topográficas + Ortoimagem', linestyle='--')
        
        plt.xlabel('Ano', fontsize=12)
        plt.ylabel('Gap de Atualização (Anos)', fontsize=12)
        plt.title('Comparação: Gaps Gerais (Topográficas vs Combinadas)', 
                 fontsize=14, fontweight='bold')
        plt.legend(fontsize=11)
        plt.grid(True, alpha=0.3)
        plt.tight_layout()
        
        plt.savefig('comparacao_gaps_gerais.png', dpi=300, bbox_inches='tight')
        plt.show()
        
        print("Gráficos de gaps salvos:")
        print("- evolucao_gaps_por_escala_TOPO.png")
        print("- evolucao_gap_geral_TOPO.png")
        print("- evolucao_gaps_por_escala_COMBINADA.png")
        print("- evolucao_gap_geral_COMBINADA.png")
        print("- comparacao_gaps_gerais.png")
        
    except ImportError:
        print("Matplotlib não disponível. Instale com: pip install matplotlib")

def relatorio_estatisticas(df_media_topo, df_gap_topo, df_media_comb, df_gap_comb):
    """
    Gera relatório de estatísticas detalhado para médias e gaps de ambas as análises
    """
    print("\n" + "="*60)
    print("RELATÓRIO ESTATÍSTICO DETALHADO")
    print("="*60)
    
    # Dados válidos para análise topográficas
    dados_validos_media_topo = df_media_topo.dropna(subset=['media_geral'])
    dados_validos_gap_topo = df_gap_topo.dropna(subset=['gap_geral'])
    
    # Dados válidos para análise combinada
    dados_validos_media_comb = df_media_comb.dropna(subset=['media_geral'])
    dados_validos_gap_comb = df_gap_comb.dropna(subset=['gap_geral'])
    
    print(f"\n1. ESTATÍSTICAS - APENAS TOPOGRÁFICAS:")
    if not dados_validos_media_topo.empty:
        print(f"   Idade média atual: {dados_validos_media_topo['media_geral'].iloc[-1]:.2f} anos")
    if not dados_validos_gap_topo.empty:
        print(f"   Gap atual: {dados_validos_gap_topo['gap_geral'].iloc[-1]:.2f} anos")
        print(f"   Gap médio: {dados_validos_gap_topo['gap_geral'].mean():.2f} anos")
    
    print(f"\n2. ESTATÍSTICAS - TOPOGRÁFICAS + ORTOIMAGEM:")
    if not dados_validos_media_comb.empty:
        print(f"   Idade média atual: {dados_validos_media_comb['media_geral'].iloc[-1]:.2f} anos")
    if not dados_validos_gap_comb.empty:
        print(f"   Gap atual: {dados_validos_gap_comb['gap_geral'].iloc[-1]:.2f} anos")
        print(f"   Gap médio: {dados_validos_gap_comb['gap_geral'].mean():.2f} anos")
    
    # Comparação entre as análises
    if (not dados_validos_gap_topo.empty and not dados_validos_gap_comb.empty):
        gap_atual_topo = dados_validos_gap_topo['gap_geral'].iloc[-1]
        gap_atual_comb = dados_validos_gap_comb['gap_geral'].iloc[-1]
        melhoria = gap_atual_topo - gap_atual_comb
        
        print(f"\n3. COMPARAÇÃO ENTRE ANÁLISES:")
        print(f"   Melhoria com ortoimagem: {melhoria:.2f} anos")
        print(f"   Percentual de melhoria: {(melhoria/gap_atual_topo)*100:.1f}%")
    
    # Tendências
    if not dados_validos_gap_topo.empty:
        coef_gap_topo = np.polyfit(dados_validos_gap_topo['ano'], dados_validos_gap_topo['gap_geral'], 1)[0]
        print(f"\n4. TENDÊNCIAS GAP:")
        print(f"   Topográficas: {'+' if coef_gap_topo > 0 else ''}{coef_gap_topo:.3f} anos por ano")
    
    if not dados_validos_gap_comb.empty:
        coef_gap_comb = np.polyfit(dados_validos_gap_comb['ano'], dados_validos_gap_comb['gap_geral'], 1)[0]
        print(f"   Combinadas: {'+' if coef_gap_comb > 0 else ''}{coef_gap_comb:.3f} anos por ano")

# Função principal - Exemplo de uso
if __name__ == "__main__":
    # Executar análise completa
    print("Iniciando análise temporal de cartas topográficas e ortoimagem...\n")
    
    df_media_topo, df_gap_topo, df_media_comb, df_gap_comb = analisar_cartas_topograficas()
    
    if all(df is not None for df in [df_media_topo, df_gap_topo, df_media_comb, df_gap_comb]):
        # Gerar gráficos das médias
        print("\n12. Gerando gráficos das médias...")
        plotar_evolucao_medias(df_media_topo, df_media_comb)
        
        # Gerar gráficos dos gaps
        print("\n13. Gerando gráficos dos gaps...")
        plotar_evolucao_gaps(df_gap_topo, df_gap_comb)
        
        # Gerar relatório estatístico
        relatorio_estatisticas(df_media_topo, df_gap_topo, df_media_comb, df_gap_comb)
        
        print(f"\n{'='*60}")
        print("ANÁLISE CONCLUÍDA COM SUCESSO!")
        print("Arquivos gerados:")
        print("DADOS - TOPOGRÁFICAS:")
        print("- analise_temporal_cartas_medias_TOPO.csv")
        print("- analise_temporal_cartas_gaps_TOPO.csv") 
        print("- medias_anuais_cartas_TOPO.csv")
        print("- gaps_anuais_cartas_TOPO.csv")
        print("DADOS - COMBINADAS:")
        print("- analise_temporal_cartas_medias_COMBINADA.csv")
        print("- analise_temporal_cartas_gaps_COMBINADA.csv")
        print("- medias_anuais_cartas_COMBINADA.csv")
        print("- gaps_anuais_cartas_COMBINADA.csv")
        print("GRÁFICOS - MÉDIAS:")
        print("- evolucao_medias_por_escala_TOPO.png")
        print("- evolucao_media_geral_TOPO.png")
        print("- evolucao_medias_por_escala_COMBINADA.png")
        print("- evolucao_media_geral_COMBINADA.png")
        print("- comparacao_medias_gerais.png")
        print("GRÁFICOS - GAPS:")
        print("- evolucao_gaps_por_escala_TOPO.png")
        print("- evolucao_gap_geral_TOPO.png")
        print("- evolucao_gaps_por_escala_COMBINADA.png")
        print("- evolucao_gap_geral_COMBINADA.png")
        print("- comparacao_gaps_gerais.png")
        print("="*60)
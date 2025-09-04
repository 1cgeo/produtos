import pandas as pd
import numpy as np
from datetime import datetime
import matplotlib.pyplot as plt

def carregar_dados_csv(arquivo_csv):
    """
    Carrega dados do CSV e processa as informações cartográficas
    """
    try:
        # Ler CSV com separador |
        df = pd.read_csv(arquivo_csv, sep='|', encoding='utf-8')
        
        # Verificar colunas esperadas
        colunas_esperadas = ['Data de conclusão', 'Tipo de recurso', 'Escala']
        for col in colunas_esperadas:
            if col not in df.columns:
                print(f"Coluna '{col}' não encontrada. Colunas disponíveis: {list(df.columns)}")
                return None
        
        # Converter data de conclusão para datetime
        df['Data de conclusão'] = pd.to_datetime(df['Data de conclusão'], format='%d/%m/%Y', errors='coerce')
        df['Ano'] = df['Data de conclusão'].dt.year
        
        # Filtrar dados válidos
        df = df.dropna(subset=['Data de conclusão', 'Tipo de recurso', 'Escala'])
        
        # Categorizar tipos
        df['Tipo_Categoria'] = df['Tipo de recurso'].apply(lambda x: 
            'Ortoimagem' if 'Ortoimagem' in str(x) else 
            'Topografica' if 'Topografica' in str(x) else 'Outro'
        )
        
        # Processar escalas (extrair número da escala)
        df['Escala_Num'] = df['Escala'].astype(str).str.replace(':', '').astype(int, errors='ignore')
        df['Escala_Categoria'] = df['Escala_Num'].apply(lambda x: 
            '25k' if x == 25000 else
            '50k' if x == 50000 else
            '100k' if x == 100000 else
            '250k' if x == 250000 else
            'Outra'
        )
        
        print(f"Dados carregados: {len(df)} registros")
        print(f"Período: {df['Ano'].min()} a {df['Ano'].max()}")
        print(f"Tipos encontrados: {df['Tipo_Categoria'].value_counts().to_dict()}")
        print(f"Escalas encontradas: {df['Escala_Categoria'].value_counts().to_dict()}")
        
        return df
        
    except Exception as e:
        print(f"Erro ao carregar CSV: {e}")
        return None

def processar_dados_por_ano_escala(df, tipo_analise='topo_apenas', ano_inicial=None, ano_final=None):
    """
    Processa dados agrupando por ano e escala
    tipo_analise: 'topo_apenas' ou 'combinada'
    """
    if ano_inicial is None:
        ano_inicial = df['Ano'].min()
    if ano_final is None:
        ano_final = datetime.now().year
    
    # Filtrar tipos conforme análise
    if tipo_analise == 'topo_apenas':
        df_filtrado = df[df['Tipo_Categoria'] == 'Topografica'].copy()
    else:  # combinada
        df_filtrado = df[df['Tipo_Categoria'].isin(['Topografica', 'Ortoimagem'])].copy()
    
    resultados = []
    
    for ano in range(ano_inicial, ano_final + 1):
        resultado_ano = {'ano': ano}
        
        # Dados até este ano
        dados_ate_ano = df_filtrado[df_filtrado['Ano'] <= ano]
        
        escalas = ['25k', '50k', '100k', '250k']
        todos_anos_conclusao = []
        
        for escala in escalas:
            dados_escala = dados_ate_ano[dados_ate_ano['Escala_Categoria'] == escala]
            
            if not dados_escala.empty:
                # Para cada carta (assumindo que cada linha é uma carta concluída)
                # Pegar o ano mais recente de conclusão para esta escala
                anos_conclusao = dados_escala['Ano'].tolist()
                
                if anos_conclusao:
                    ano_medio = np.mean(anos_conclusao)
                    resultado_ano[f'media_{escala}'] = round(ano_medio, 2)
                    resultado_ano[f'cartas_concluidas_{escala}'] = len(anos_conclusao)
                    todos_anos_conclusao.extend(anos_conclusao)
                else:
                    resultado_ano[f'media_{escala}'] = None
                    resultado_ano[f'cartas_concluidas_{escala}'] = 0
            else:
                resultado_ano[f'media_{escala}'] = None
                resultado_ano[f'cartas_concluidas_{escala}'] = 0
        
        # Calcular média geral
        if todos_anos_conclusao:
            media_geral = np.mean(todos_anos_conclusao)
            resultado_ano['media_geral'] = round(media_geral, 2)
            resultado_ano['total_cartas_concluidas'] = len(todos_anos_conclusao)
        else:
            resultado_ano['media_geral'] = None
            resultado_ano['total_cartas_concluidas'] = 0
        
        resultados.append(resultado_ano)
    
    return resultados

def calcular_gaps_anuais(resultados_medias):
    """
    Calcula gaps baseado nos resultados das médias
    """
    resultados_gap = []
    
    for resultado in resultados_medias:
        resultado_gap = {'ano': resultado['ano']}
        
        escalas = ['25k', '50k', '100k', '250k']
        
        for escala in escalas:
            media_col = f'media_{escala}'
            cartas_col = f'cartas_concluidas_{escala}'
            
            if resultado[media_col] is not None:
                gap = resultado['ano'] - resultado[media_col]
                resultado_gap[f'gap_{escala}'] = round(gap, 2)
                resultado_gap[f'cartas_concluidas_{escala}'] = resultado[cartas_col]
            else:
                resultado_gap[f'gap_{escala}'] = None
                resultado_gap[f'cartas_concluidas_{escala}'] = 0
        
        # Gap geral
        if resultado['media_geral'] is not None:
            gap_geral = resultado['ano'] - resultado['media_geral']
            resultado_gap['gap_geral'] = round(gap_geral, 2)
            resultado_gap['total_cartas_concluidas'] = resultado['total_cartas_concluidas']
        else:
            resultado_gap['gap_geral'] = None
            resultado_gap['total_cartas_concluidas'] = 0
        
        resultados_gap.append(resultado_gap)
    
    return resultados_gap

def analisar_dados_cartograficos(arquivo_csv):
    """
    Função principal para análise dos dados cartográficos
    """
    print("=== Análise Temporal de Dados Cartográficos ===\n")
    
    # Carregar dados
    print("1. Carregando dados do CSV...")
    df = carregar_dados_csv(arquivo_csv)
    
    if df is None:
        print("Falha ao carregar dados!")
        return None, None, None, None
    
    print("\n" + "="*60)
    print("ANÁLISE 1: APENAS CARTAS TOPOGRÁFICAS")
    print("="*60)
    
    # Processar dados - apenas topográficas
    print("\n2. Processando dados topográficas...")
    resultados_media_topo = processar_dados_por_ano_escala(df, 'topo_apenas')
    df_media_topo = pd.DataFrame(resultados_media_topo)
    
    resultados_gap_topo = calcular_gaps_anuais(resultados_media_topo)
    df_gap_topo = pd.DataFrame(resultados_gap_topo)
    
    # Mostrar resultados topográficas
    print(f"\n3. Resultados MÉDIAS TOPOGRÁFICAS:")
    colunas_medias = ['ano'] + [col for col in df_media_topo.columns if col.startswith('media_')]
    print("Últimos 5 anos:")
    print(df_media_topo[colunas_medias].tail().to_string(index=False))
    
    print(f"\n4. Resultados GAPS TOPOGRÁFICAS:")
    colunas_gaps = ['ano'] + [col for col in df_gap_topo.columns if col.startswith('gap_')]
    print("Últimos 5 anos:")
    print(df_gap_topo[colunas_gaps].tail().to_string(index=False))
    
    print("\n" + "="*60)
    print("ANÁLISE 2: CARTAS TOPOGRÁFICAS + ORTOIMAGEM")
    print("="*60)
    
    # Processar dados - combinada (a partir de 2000)
    print("\n5. Processando dados combinados (a partir de 2000)...")
    resultados_media_comb = processar_dados_por_ano_escala(df, 'combinada', ano_inicial=2000)
    df_media_comb = pd.DataFrame(resultados_media_comb)
    
    resultados_gap_comb = calcular_gaps_anuais(resultados_media_comb)
    df_gap_comb = pd.DataFrame(resultados_gap_comb)
    
    # Mostrar resultados combinada
    print(f"\n6. Resultados MÉDIAS COMBINADAS:")
    print("Últimos 5 anos:")
    print(df_media_comb[colunas_medias].tail().to_string(index=False))
    
    print(f"\n7. Resultados GAPS COMBINADAS:")
    print("Últimos 5 anos:")
    print(df_gap_comb[colunas_gaps].tail().to_string(index=False))
    
    # Estatísticas dos dados
    print("\n8. Estatísticas dos dados originais:")
    df_topo = df[df['Tipo_Categoria'] == 'Topografica']
    df_orto = df[df['Tipo_Categoria'] == 'Ortoimagem']
    
    print(f"   Total topográficas: {len(df_topo)} cartas")
    print(f"   Total ortoimagens: {len(df_orto)} cartas")
    print(f"   Total geral: {len(df)} cartas")
    
    print("\n   Distribuição por escala:")
    for escala in ['25k', '50k', '100k', '250k']:
        topo_escala = len(df_topo[df_topo['Escala_Categoria'] == escala])
        orto_escala = len(df_orto[df_orto['Escala_Categoria'] == escala])
        print(f"   Escala {escala}: {topo_escala} topo, {orto_escala} orto")
    
    # Salvar resultados
    df_media_topo.to_csv('analise_csv_medias_TOPO.csv', index=False)
    df_gap_topo.to_csv('analise_csv_gaps_TOPO.csv', index=False)
    df_media_topo[colunas_medias].to_csv('medias_anuais_csv_TOPO.csv', index=False)
    df_gap_topo[colunas_gaps].to_csv('gaps_anuais_csv_TOPO.csv', index=False)
    
    df_media_comb.to_csv('analise_csv_medias_COMBINADA.csv', index=False)
    df_gap_comb.to_csv('analise_csv_gaps_COMBINADA.csv', index=False)
    df_media_comb[colunas_medias].to_csv('medias_anuais_csv_COMBINADA.csv', index=False)
    df_gap_comb[colunas_gaps].to_csv('gaps_anuais_csv_COMBINADA.csv', index=False)
    
    print(f"\n9. Resultados salvos:")
    print("   APENAS TOPOGRÁFICAS:")
    print("   - analise_csv_medias_TOPO.csv")
    print("   - analise_csv_gaps_TOPO.csv")
    print("   - medias_anuais_csv_TOPO.csv")
    print("   - gaps_anuais_csv_TOPO.csv")
    print("   TOPOGRÁFICAS + ORTOIMAGEM:")
    print("   - analise_csv_medias_COMBINADA.csv")
    print("   - analise_csv_gaps_COMBINADA.csv")
    print("   - medias_anuais_csv_COMBINADA.csv")
    print("   - gaps_anuais_csv_COMBINADA.csv")
    
    return df_media_topo, df_gap_topo, df_media_comb, df_gap_comb

def plotar_evolucao_medias_csv(df_media_topo, df_media_comb):
    """
    Plota a evolução temporal das médias para dados CSV
    """
    try:
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
        plt.ylabel('Ano Médio de Conclusão das Cartas', fontsize=12)
        plt.title('Evolução da Idade Média das Cartas Topográficas por Escala', fontsize=14, fontweight='bold')
        plt.legend(fontsize=11)
        plt.grid(True, alpha=0.3)
        plt.tight_layout()
        
        plt.savefig('evolucao_medias_csv_por_escala_TOPO.png', dpi=300, bbox_inches='tight')
        plt.show()
        
        # GRÁFICO 2: Evolução da média geral - TOPOGRÁFICAS
        plt.figure(figsize=(12, 8))
        
        dados_validos_geral = df_media_topo.dropna(subset=['media_geral'])
        
        if not dados_validos_geral.empty:
            plt.plot(dados_validos_geral['ano'], dados_validos_geral['media_geral'], 
                    marker='o', color='#9467bd', linewidth=3, markersize=6, 
                    label='Média Geral Topográficas')
        
        plt.xlabel('Ano', fontsize=12)
        plt.ylabel('Ano Médio de Conclusão das Cartas', fontsize=12)
        plt.title('Evolução da Idade Média das Cartas Topográficas - Média Geral', 
                 fontsize=14, fontweight='bold')
        plt.legend(fontsize=11)
        plt.grid(True, alpha=0.3)
        plt.tight_layout()
        
        plt.savefig('evolucao_media_csv_geral_TOPO.png', dpi=300, bbox_inches='tight')
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
        plt.ylabel('Ano Médio de Conclusão das Cartas', fontsize=12)
        plt.title('Evolução da Idade Média das Cartas (Topográficas + Ortoimagem) por Escala', fontsize=14, fontweight='bold')
        plt.legend(fontsize=11)
        plt.grid(True, alpha=0.3)
        plt.tight_layout()
        
        plt.savefig('evolucao_medias_csv_por_escala_COMBINADA.png', dpi=300, bbox_inches='tight')
        plt.show()
        
        # GRÁFICO 4: Evolução da média geral - COMBINADAS
        plt.figure(figsize=(12, 8))
        
        dados_validos_geral_comb = df_media_comb.dropna(subset=['media_geral'])
        
        if not dados_validos_geral_comb.empty:
            plt.plot(dados_validos_geral_comb['ano'], dados_validos_geral_comb['media_geral'], 
                    marker='s', color='#17becf', linewidth=3, markersize=6, 
                    label='Média Geral Combinada')
        
        plt.xlabel('Ano', fontsize=12)
        plt.ylabel('Ano Médio de Conclusão das Cartas', fontsize=12)
        plt.title('Evolução da Idade Média das Cartas (Topográficas + Ortoimagem) - Média Geral', 
                 fontsize=14, fontweight='bold')
        plt.legend(fontsize=11)
        plt.grid(True, alpha=0.3)
        plt.tight_layout()
        
        plt.savefig('evolucao_media_csv_geral_COMBINADA.png', dpi=300, bbox_inches='tight')
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
        plt.ylabel('Ano Médio de Conclusão das Cartas', fontsize=12)
        plt.title('Comparação: Médias Gerais (Topográficas vs Combinadas)', 
                 fontsize=14, fontweight='bold')
        plt.legend(fontsize=11)
        plt.grid(True, alpha=0.3)
        plt.tight_layout()
        
        plt.savefig('comparacao_medias_csv_gerais.png', dpi=300, bbox_inches='tight')
        plt.show()
        
        print("Gráficos de médias salvos:")
        print("- evolucao_medias_csv_por_escala_TOPO.png")
        print("- evolucao_media_csv_geral_TOPO.png")
        print("- evolucao_medias_csv_por_escala_COMBINADA.png")
        print("- evolucao_media_csv_geral_COMBINADA.png")
        print("- comparacao_medias_csv_gerais.png")
        
    except ImportError:
        print("Matplotlib não disponível. Instale com: pip install matplotlib")

def plotar_evolucao_gaps_csv(df_gap_topo, df_gap_comb):
    """
    Plota a evolução temporal dos gaps para dados CSV
    """
    try:
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
        
        plt.savefig('evolucao_gaps_csv_por_escala_TOPO.png', dpi=300, bbox_inches='tight')
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
        
        plt.savefig('evolucao_gap_csv_geral_TOPO.png', dpi=300, bbox_inches='tight')
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
        
        plt.savefig('evolucao_gaps_csv_por_escala_COMBINADA.png', dpi=300, bbox_inches='tight')
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
        
        plt.savefig('evolucao_gap_csv_geral_COMBINADA.png', dpi=300, bbox_inches='tight')
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
        
        plt.savefig('comparacao_gaps_csv_gerais.png', dpi=300, bbox_inches='tight')
        plt.show()
        
        print("Gráficos de gaps salvos:")
        print("- evolucao_gaps_csv_por_escala_TOPO.png")
        print("- evolucao_gap_csv_geral_TOPO.png")
        print("- evolucao_gaps_csv_por_escala_COMBINADA.png")
        print("- evolucao_gap_csv_geral_COMBINADA.png")
        print("- comparacao_gaps_csv_gerais.png")
        
    except ImportError:
        print("Matplotlib não disponível. Instale com: pip install matplotlib")

def relatorio_estatisticas_csv(df_media_topo, df_gap_topo, df_media_comb, df_gap_comb):
    """
    Gera relatório de estatísticas detalhado para dados CSV
    """
    print("\n" + "="*60)
    print("RELATÓRIO ESTATÍSTICO DETALHADO - DADOS CSV")
    print("="*60)
    
    # Dados válidos para análise
    dados_validos_media_topo = df_media_topo.dropna(subset=['media_geral'])
    dados_validos_gap_topo = df_gap_topo.dropna(subset=['gap_geral'])
    dados_validos_media_comb = df_media_comb.dropna(subset=['media_geral'])
    dados_validos_gap_comb = df_gap_comb.dropna(subset=['gap_geral'])
    
    print(f"\n1. ESTATÍSTICAS - APENAS TOPOGRÁFICAS:")
    if not dados_validos_media_topo.empty:
        print(f"   Idade média atual: {dados_validos_media_topo['media_geral'].iloc[-1]:.2f} anos")
        print(f"   Total cartas atuais: {dados_validos_media_topo['total_cartas_concluidas'].iloc[-1]}")
    if not dados_validos_gap_topo.empty:
        print(f"   Gap atual: {dados_validos_gap_topo['gap_geral'].iloc[-1]:.2f} anos")
        print(f"   Gap médio: {dados_validos_gap_topo['gap_geral'].mean():.2f} anos")
    
    print(f"\n2. ESTATÍSTICAS - TOPOGRÁFICAS + ORTOIMAGEM:")
    if not dados_validos_media_comb.empty:
        print(f"   Idade média atual: {dados_validos_media_comb['media_geral'].iloc[-1]:.2f} anos")
        print(f"   Total cartas atuais: {dados_validos_media_comb['total_cartas_concluidas'].iloc[-1]}")
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
        if gap_atual_topo > 0:
            print(f"   Percentual de melhoria: {(melhoria/gap_atual_topo)*100:.1f}%")

# Função principal - Exemplo de uso
if __name__ == "__main__":
    # Nome do arquivo CSV
    arquivo_csv = 'relatorio_recursoscadastrados_fonte-20250904_1751_5cgeo.csv'  # Altere para o nome do seu arquivo
    
    print("Iniciando análise temporal de dados cartográficos CSV...\n")
    
    df_media_topo, df_gap_topo, df_media_comb, df_gap_comb = analisar_dados_cartograficos(arquivo_csv)
    
    if all(df is not None for df in [df_media_topo, df_gap_topo, df_media_comb, df_gap_comb]):
        # Gerar gráficos das médias
        print("\n10. Gerando gráficos das médias...")
        plotar_evolucao_medias_csv(df_media_topo, df_media_comb)
        
        # Gerar gráficos dos gaps
        print("\n11. Gerando gráficos dos gaps...")
        plotar_evolucao_gaps_csv(df_gap_topo, df_gap_comb)
        
        # Gerar relatório estatístico
        relatorio_estatisticas_csv(df_media_topo, df_gap_topo, df_media_comb, df_gap_comb)
        
        print(f"\n{'='*60}")
        print("ANÁLISE CSV CONCLUÍDA COM SUCESSO!")
        print("Arquivos gerados:")
        print("DADOS - TOPOGRÁFICAS:")
        print("- analise_csv_medias_TOPO.csv")
        print("- analise_csv_gaps_TOPO.csv") 
        print("- medias_anuais_csv_TOPO.csv")
        print("- gaps_anuais_csv_TOPO.csv")
        print("DADOS - COMBINADAS:")
        print("- analise_csv_medias_COMBINADA.csv")
        print("- analise_csv_gaps_COMBINADA.csv")
        print("- medias_anuais_csv_COMBINADA.csv")
        print("- gaps_anuais_csv_COMBINADA.csv")
        print("GRÁFICOS - MÉDIAS:")
        print("- evolucao_medias_csv_por_escala_TOPO.png")
        print("- evolucao_media_csv_geral_TOPO.png")
        print("- evolucao_medias_csv_por_escala_COMBINADA.png")
        print("- evolucao_media_csv_geral_COMBINADA.png")
        print("- comparacao_medias_csv_gerais.png")
        print("GRÁFICOS - GAPS:")
        print("- evolucao_gaps_csv_por_escala_TOPO.png")
        print("- evolucao_gap_csv_geral_TOPO.png")
        print("- evolucao_gaps_csv_por_escala_COMBINADA.png")
        print("- evolucao_gap_csv_geral_COMBINADA.png")
        print("- comparacao_gaps_csv_gerais.png")
        print("="*60)
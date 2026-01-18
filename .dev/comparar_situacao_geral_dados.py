#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para comparar produtos da situação geral com os arquivos de dados.
Identifica produtos que estão mapeados na situação geral (de 2018 em diante)
mas NÃO estão presentes nos arquivos separados (ct-*, co-*).
"""

import json
import os
from pathlib import Path
from collections import defaultdict

# Diretório base
BASE_DIR = Path(__file__).parent.parent
DATA_DIR = BASE_DIR / "data"

# Ano mínimo para considerar (inclusive)
ANO_MINIMO = 2018

# Arquivos de situação geral (fonte de verdade)
SITUACAO_GERAL_FILES = {
    "25k": DATA_DIR / "situacao-geral-ct-25k.geojson",
    "50k": DATA_DIR / "situacao-geral-ct-50k.geojson",
    "100k": DATA_DIR / "situacao-geral-ct-100k.geojson",
    "250k": DATA_DIR / "situacao-geral-ct-250k.geojson",
}

# ARQUIVO DE EXCEÇÕES
EXCECOES_ANO_FILE = BASE_DIR / ".dev" / "excecoes_ano.txt"


def load_geojson(filepath):
    """Carrega um arquivo GeoJSON."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"  [AVISO] Arquivo não encontrado: {filepath}")
        return None
    except json.JSONDecodeError as e:
        print(f"  [ERRO] Erro ao decodificar JSON: {filepath} - {e}")
        return None
    
def load_excecoes_ano():
    excecoes = {}  # {(mi, escala, tipo, ano_situacao): ano_arquivo}
    if EXCECOES_ANO_FILE.exists():
        with open(EXCECOES_ANO_FILE, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#'):
                    parts = line.split(',')
                    if len(parts) == 5:
                        mi, escala, tipo, ano_sg, ano_arq = parts
                        excecoes[(mi.strip(), escala.strip(), tipo.strip(), ano_sg.strip())] = ano_arq.strip()
    return excecoes


def extract_produtos_recentes_situacao_geral():
    """
    Extrai os produtos que estão mapeados na situação geral com edições >= ANO_MINIMO.
    Retorna dicionários separados para topo e orto.
    Formato: {escala: {mi: [anos]}}
    """
    mapeados_topo = {}
    mapeados_orto = {}

    for escala, filepath in SITUACAO_GERAL_FILES.items():
        mapeados_topo[escala] = {}
        mapeados_orto[escala] = {}

        geojson = load_geojson(filepath)
        if geojson is None:
            continue

        for feature in geojson.get("features", []):
            props = feature.get("properties", {})
            mi = props.get("identificadorMI")

            if not mi:
                continue

            # Verificar edições topográficas
            edicoes_topo = props.get("edicoes_topo", [])
            anos_recentes_topo = [ano for ano in edicoes_topo if ano.isdigit() and int(ano) >= ANO_MINIMO]
            if anos_recentes_topo:
                mapeados_topo[escala][mi] = sorted(anos_recentes_topo)

            # Verificar edições ortoimagem
            edicoes_orto = props.get("edicoes_orto", [])
            anos_recentes_orto = [ano for ano in edicoes_orto if ano.isdigit() and int(ano) >= ANO_MINIMO]
            if anos_recentes_orto:
                mapeados_orto[escala][mi] = sorted(anos_recentes_orto)

    return mapeados_topo, mapeados_orto


def extract_produtos_from_files():
    """
    Extrai todos os produtos dos arquivos ct-* e co-*.
    Retorna: {tipo: {escala: {ano: set(MIs)}}}
    """
    produtos = {
        "CT": defaultdict(lambda: defaultdict(set)),
        "CO": defaultdict(lambda: defaultdict(set))
    }

    # Padrões de arquivos
    for arquivo in DATA_DIR.glob("*.geojson"):
        nome = arquivo.stem.lower()

        # Detectar tipo e escala/ano
        tipo = None
        escala = None
        ano = None

        if nome.startswith("ct-"):
            tipo = "CT"
            # Formato esperado: ct-YYYY-escala
            parts = nome.split("-")
            if len(parts) >= 3:
                ano = parts[1]
                escala = parts[2]
        elif nome.startswith("co-"):
            tipo = "CO"
            # Formato esperado: co-YYYY-escala
            parts = nome.split("-")
            if len(parts) >= 3:
                ano = parts[1]
                escala = parts[2]

        if tipo is None or escala is None or ano is None:
            continue

        # Carregar e extrair MIs
        geojson = load_geojson(arquivo)
        if geojson is None:
            continue

        for feature in geojson.get("features", []):
            props = feature.get("properties", {})
            mi = props.get("identificadorMI")
            if mi:
                produtos[tipo][escala][ano].add(mi)

    return produtos


def main():
    excecoes_ano = load_excecoes_ano()
    """Função principal."""
    print("=" * 70)
    print(f"Comparação Inversa - Situação Geral vs Arquivos de Dados")
    print(f"(Produtos com edições de {ANO_MINIMO} em diante)")
    print("=" * 70)

    # Extrair produtos recentes da situação geral
    print("\n" + "-" * 70)
    print("Carregando arquivos situacao-geral-ct-*...")
    mapeados_topo, mapeados_orto = extract_produtos_recentes_situacao_geral()

    print(f"\nProdutos com edições >= {ANO_MINIMO} na situação geral:")
    for escala in ["25k", "50k", "100k", "250k"]:
        n_topo = len(mapeados_topo.get(escala, {}))
        n_orto = len(mapeados_orto.get(escala, {}))
        print(f"  {escala}: {n_topo} CT (topo), {n_orto} CO (orto)")

    # Extrair produtos dos arquivos separados
    print("\n" + "-" * 70)
    print("Carregando arquivos ct-* e co-*...")
    produtos_arquivos = extract_produtos_from_files()

    print("\nProdutos nos arquivos separados:")
    for tipo in ["CT", "CO"]:
        print(f"  {tipo}:")
        for escala in ["25k", "50k", "100k", "250k"]:
            if escala in produtos_arquivos[tipo]:
                for ano in sorted(produtos_arquivos[tipo][escala].keys()):
                    count = len(produtos_arquivos[tipo][escala][ano])
                    print(f"    {escala} ({ano}): {count} produtos")

    # Comparar: produtos na situação geral que não estão nos arquivos separados
    print("\n" + "-" * 70)
    print("Comparando...")

    nao_encontrados = defaultdict(list)  # {(tipo, escala, ano): [mi]}

    # Verificar CT (topo)
    for escala, produtos in mapeados_topo.items():
        for mi, anos in produtos.items():
            for ano in anos:
                # Verificar se existe exceção de ano para este produto
                ano_verificar = excecoes_ano.get((mi, escala, "CT", ano), ano)
                # Verificar se existe no arquivo correspondente
                if mi not in produtos_arquivos["CT"].get(escala, {}).get(ano_verificar, set()):
                    nao_encontrados[("CT", escala, ano)].append(mi)

    # Verificar CO (orto)
    for escala, produtos in mapeados_orto.items():
        for mi, anos in produtos.items():
            for ano in anos:
                # Verificar se existe exceção de ano para este produto
                ano_verificar = excecoes_ano.get((mi, escala, "CO", ano), ano)
                # Verificar se existe no arquivo correspondente
                if mi not in produtos_arquivos["CO"].get(escala, {}).get(ano_verificar, set()):
                    nao_encontrados[("CO", escala, ano)].append(mi)

    # Gerar relatório
    print("\n" + "=" * 70)
    print("RELATÓRIO: Produtos na Situação Geral que NÃO estão nos arquivos")
    print("=" * 70)

    total_nao_encontrados = sum(len(v) for v in nao_encontrados.values())
    print(f"\nTotal de produtos não encontrados nos arquivos: {total_nao_encontrados}")

    # Salvar em arquivo TXT
    output_file = BASE_DIR / "produtos_faltando_nos_arquivos.txt"

    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("=" * 70 + "\n")
        f.write("RELATÓRIO: Produtos mapeados na situação geral (de 2018 em diante)\n")
        f.write("que NÃO estão presentes nos arquivos ct-*/co-*\n")
        f.write("=" * 70 + "\n\n")

        f.write(f"Ano mínimo considerado: {ANO_MINIMO}\n")
        f.write(f"Total de produtos faltando: {total_nao_encontrados}\n\n")

        if nao_encontrados:
            # Agrupar por tipo
            for tipo in ["CT", "CO"]:
                tipo_nome = "Carta Topográfica" if tipo == "CT" else "Carta Ortoimagem"

                # Filtrar entradas deste tipo
                entradas_tipo = {k: v for k, v in nao_encontrados.items() if k[0] == tipo}

                if not entradas_tipo:
                    continue

                total_tipo = sum(len(v) for v in entradas_tipo.values())
                f.write("-" * 70 + "\n")
                f.write(f"{tipo_nome} ({tipo}) - {total_tipo} produtos faltando\n")
                f.write("-" * 70 + "\n")

                # Agrupar por escala e ano
                for escala in ["25k", "50k", "100k", "250k"]:
                    entradas_escala = {k: v for k, v in entradas_tipo.items() if k[1] == escala}

                    if not entradas_escala:
                        continue

                    f.write(f"\n  Escala {escala}:\n")

                    for ano in sorted(set(k[2] for k in entradas_escala.keys())):
                        key = (tipo, escala, ano)
                        if key in nao_encontrados:
                            produtos = nao_encontrados[key]
                            arquivo_esperado = f"{tipo.lower()}-{ano}-{escala}.geojson"
                            f.write(f"\n    Ano {ano} (deveria estar em {arquivo_esperado}):\n")
                            f.write(f"    Total: {len(produtos)} produtos\n")
                            for mi in sorted(produtos):
                                f.write(f"      - {mi}\n")

                f.write("\n")

            # Resumo consolidado
            f.write("\n" + "=" * 70 + "\n")
            f.write("RESUMO CONSOLIDADO\n")
            f.write("=" * 70 + "\n\n")

            resumo = defaultdict(lambda: defaultdict(int))
            for (tipo, escala, ano), produtos in nao_encontrados.items():
                resumo[tipo][(escala, ano)] = len(produtos)

            for tipo in ["CT", "CO"]:
                if tipo not in resumo:
                    continue
                tipo_nome = "Carta Topográfica" if tipo == "CT" else "Carta Ortoimagem"
                f.write(f"{tipo_nome}:\n")
                for (escala, ano), count in sorted(resumo[tipo].items()):
                    f.write(f"  {tipo.lower()}-{ano}-{escala}.geojson: {count} produtos faltando\n")
                f.write("\n")

        else:
            f.write("Nenhum produto faltando.\n")
            f.write("Todos os produtos da situação geral estão presentes nos arquivos separados.\n")

    print(f"\nRelatório salvo em: {output_file}")

    # Imprimir resumo no console
    if nao_encontrados:
        print("\nResumo por arquivo esperado:")
        for (tipo, escala, ano), produtos in sorted(nao_encontrados.items()):
            arquivo = f"{tipo.lower()}-{ano}-{escala}.geojson"
            print(f"  {arquivo}: {len(produtos)} produtos faltando")


if __name__ == "__main__":
    main()

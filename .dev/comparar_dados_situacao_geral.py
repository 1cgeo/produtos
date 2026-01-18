#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para comparar produtos dos GeoJSON com os arquivos situacao-geral-ct-*.
Identifica produtos que existem nos arquivos de dados mas não estão presentes
como mapeados nos arquivos de situação geral.
"""

import json
import os
from pathlib import Path
from collections import defaultdict

# Diretório base
BASE_DIR = Path(__file__).parent.parent
DATA_DIR = BASE_DIR / "data"

# Arquivos de blacklist (a ignorar)
BLACKLIST_FILE = BASE_DIR / ".dev" / "blacklist.txt"
BLACKLIST_MI_FILE = BASE_DIR / ".dev" / "blacklist_mi.txt"

# Arquivos de situação geral (fonte de verdade)
SITUACAO_GERAL_FILES = {
    "25k": DATA_DIR / "situacao-geral-ct-25k.geojson",
    "50k": DATA_DIR / "situacao-geral-ct-50k.geojson",
    "100k": DATA_DIR / "situacao-geral-ct-100k.geojson",
    "250k": DATA_DIR / "situacao-geral-ct-250k.geojson",
}

def load_blacklist():
    """Carrega a lista de arquivos a serem ignorados."""
    blacklist = set()
    if BLACKLIST_FILE.exists():
        with open(BLACKLIST_FILE, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip().rstrip(',')
                if line and not line.startswith('#'):
                    # Remove extensão .geojson se presente
                    if line.endswith('.geojson'):
                        line = line[:-8]
                    blacklist.add(line)
    return blacklist


def load_blacklist_mi():
    blacklist = set()
    if BLACKLIST_MI_FILE.exists():
        with open(BLACKLIST_MI_FILE, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#'):
                    blacklist.add(line)
    return blacklist


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


def get_escala_from_mi(mi):
    """
    Tenta inferir a escala a partir do identificadorMI.
    25k: formato XXXX-X-XX (ex: 2753-1-NE)
    50k: formato XXXX-X (ex: 2753-1)
    100k: formato XXXX (ex: 2753)
    250k: formato XXX (ex: 275 ou similar)
    """
    if mi is None:
        return None

    parts = mi.split('-')
    if len(parts) == 3:
        return "25k"
    elif len(parts) == 2:
        return "50k"
    elif len(parts) == 1:
        if len(mi) <= 3:
            return "250k"
        else:
            return "100k"
    return None


def extract_situacao_geral_mapeados():
    """
    Extrai os produtos que estão mapeados (concluídos) nos arquivos situacao-geral.
    Retorna dicionários separados para topo e orto.
    """
    mapeados_topo = {}  # {escala: {mi: [edicoes]}}
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
            if edicoes_topo and len(edicoes_topo) > 0:
                mapeados_topo[escala][mi] = edicoes_topo

            # Verificar edições ortoimagem
            edicoes_orto = props.get("edicoes_orto", [])
            if edicoes_orto and len(edicoes_orto) > 0:
                mapeados_orto[escala][mi] = edicoes_orto

    return mapeados_topo, mapeados_orto


def extract_produtos_from_file(filepath):
    """Extrai os identificadorMI de um arquivo GeoJSON."""
    produtos = set()
    geojson = load_geojson(filepath)

    if geojson is None:
        return produtos

    for feature in geojson.get("features", []):
        props = feature.get("properties", {})
        mi = props.get("identificadorMI")
        if mi:
            produtos.add(mi)

    return produtos


def detect_tipo_escala(filename):
    """
    Detecta o tipo (CT/CO) e escala a partir do nome do arquivo.
    Retorna (tipo, escala) ou (None, None) se não detectável.
    """
    filename_lower = filename.lower()

    # Detectar tipo
    tipo = None
    if 'ct-' in filename_lower or 'topo' in filename_lower or 'carta-topo' in filename_lower:
        tipo = 'CT'
    elif 'co-' in filename_lower or 'orto' in filename_lower or 'carta-orto' in filename_lower:
        tipo = 'CO'

    # Detectar escala
    escala = None
    if '250k' in filename_lower or '250000' in filename_lower:
        escala = '250k'
    elif '100k' in filename_lower or '100000' in filename_lower:
        escala = '100k'
    elif '50k' in filename_lower or '50000' in filename_lower:
        escala = '50k'
    elif '25k' in filename_lower or '25000' in filename_lower:
        escala = '25k'


    return tipo, escala


def main():
    """Função principal."""
    print("=" * 70)
    print("Comparação de Produtos - Situação Geral vs Arquivos de Dados")
    print("=" * 70)

    # Carregar blacklist
    blacklist = load_blacklist()
    print(f"\nArquivos na blacklist ({len(blacklist)}):")
    for item in sorted(blacklist):
        print(f"  - {item}")
    blacklist_mi = load_blacklist_mi()

    # Extrair produtos mapeados da situação geral
    print("\n" + "-" * 70)
    print("Carregando arquivos situacao-geral-ct-*...")
    mapeados_topo, mapeados_orto = extract_situacao_geral_mapeados()

    print("\nProdutos MAPEADOS na situação geral:")
    for escala in ["25k", "50k", "100k", "250k"]:
        n_topo = len(mapeados_topo.get(escala, {}))
        n_orto = len(mapeados_orto.get(escala, {}))
        print(f"  {escala}: {n_topo} CT (topo), {n_orto} CO (orto)")

    # Listar arquivos de dados (excluindo blacklist e situacao-geral)
    print("\n" + "-" * 70)
    print("Analisando arquivos de dados...")

    arquivos_ignorados = set(["situacao-geral-ct-25k", "situacao-geral-ct-50k",
                              "situacao-geral-ct-100k", "situacao-geral-ct-250k"])
    arquivos_ignorados.update(blacklist)

    # Dicionário para armazenar produtos não encontrados
    nao_encontrados = defaultdict(list)  # {arquivo: [(mi, escala, tipo)]}

    # Processar cada arquivo GeoJSON
    for arquivo in sorted(DATA_DIR.glob("*.geojson")):
        nome = arquivo.stem

        if nome in arquivos_ignorados:
            continue

        print(f"\n  Processando: {nome}.geojson")

        # Detectar tipo e escala do arquivo
        tipo, escala = detect_tipo_escala(nome)
        print(f"    Tipo detectado: {tipo or 'N/A'}, Escala detectada: {escala or 'N/A'}")

        # Extrair produtos do arquivo
        produtos = extract_produtos_from_file(arquivo)
        print(f"    Produtos no arquivo: {len(produtos)}")

        if not produtos:
            continue

        # Verificar quais não estão na situação geral
        for mi in produtos:
            if mi in blacklist_mi:
                continue
            # Inferir escala do MI se não detectada do nome do arquivo
            mi_escala = escala or get_escala_from_mi(mi)

            if mi_escala is None:
                print(f"    [AVISO] Não foi possível determinar escala para MI: {mi}")
                continue

            # Verificar se o produto existe na situação geral
            encontrado = False

            if tipo == 'CT' or tipo is None:
                if mi in mapeados_topo.get(mi_escala, {}):
                    encontrado = True

            if tipo == 'CO' or tipo is None:
                if mi in mapeados_orto.get(mi_escala, {}):
                    encontrado = True

            if not encontrado:
                nao_encontrados[nome].append((mi, mi_escala, tipo or "N/A"))

    # Gerar relatório
    print("\n" + "=" * 70)
    print("RELATÓRIO: Produtos NÃO encontrados na Situação Geral")
    print("=" * 70)

    total_nao_encontrados = sum(len(v) for v in nao_encontrados.values())
    print(f"\nTotal de produtos não encontrados: {total_nao_encontrados}")

    # Salvar em arquivo TXT
    output_file = BASE_DIR / "produtos_nao_mapeados.txt"

    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("=" * 70 + "\n")
        f.write("RELATÓRIO: Produtos nos arquivos de dados que NÃO estão\n")
        f.write("presentes como mapeados nos arquivos situacao-geral-ct-*\n")
        f.write("=" * 70 + "\n\n")

        f.write(f"Total de produtos não encontrados: {total_nao_encontrados}\n\n")

        if nao_encontrados:
            f.write("-" * 70 + "\n")
            f.write("DETALHAMENTO POR ARQUIVO:\n")
            f.write("-" * 70 + "\n\n")

            for arquivo in sorted(nao_encontrados.keys()):
                produtos_lista = nao_encontrados[arquivo]
                f.write(f"\n{arquivo}.geojson ({len(produtos_lista)} produtos):\n")

                for mi, escala, tipo in sorted(produtos_lista, key=lambda x: x[0]):
                    f.write(f"  - {mi} (escala: {escala}, tipo: {tipo})\n")

            # Resumo por escala/tipo
            f.write("\n" + "-" * 70 + "\n")
            f.write("RESUMO POR ESCALA:\n")
            f.write("-" * 70 + "\n")

            por_escala = defaultdict(lambda: defaultdict(set))
            for arquivo, produtos in nao_encontrados.items():
                for mi, escala, tipo in produtos:
                    por_escala[escala][tipo].add(mi)

            for escala in ["25k", "50k", "100k", "250k"]:
                if escala in por_escala:
                    f.write(f"\n{escala}:\n")
                    for tipo in ["CT", "CO", "N/A"]:
                        if tipo in por_escala[escala]:
                            count = len(por_escala[escala][tipo])
                            f.write(f"  {tipo}: {count} produtos\n")
                            for mi in sorted(por_escala[escala][tipo]):
                                f.write(f"    - {mi}\n")
        else:
            f.write("Nenhum produto não mapeado encontrado.\n")
            f.write("Todos os produtos dos arquivos de dados estão presentes na situação geral.\n")

    print(f"\nRelatório salvo em: {output_file}")

    # Imprimir resumo no console
    if nao_encontrados:
        print("\nResumo por arquivo:")
        for arquivo in sorted(nao_encontrados.keys()):
            print(f"  {arquivo}: {len(nao_encontrados[arquivo])} produtos")


if __name__ == "__main__":
    main()

"""
Script para verificar inconsistências nos arquivos de situação geral.

Regras de validação:
1. "Não mapeado" -> deve ter lista de edições vazia
2. "Concluído" -> deve ter exatamente 1 edição
3. Múltiplas edições -> não pode ter situação "Concluído" ou "Não mapeado"
4. Edições vazias -> deve ter situação "Não mapeado"
"""

import json
import os
from pathlib import Path


def carregar_geojson(caminho):
    """Carrega um arquivo GeoJSON e retorna as features."""
    with open(caminho, 'r', encoding='utf-8') as f:
        data = json.load(f)
    return data.get('features', [])


def verificar_inconsistencias(features, nome_arquivo):
    """Verifica inconsistências entre situação e edições."""
    inconsistencias = []

    for feature in features:
        props = feature.get('properties', {})
        mi = props.get('identificadorMI', 'DESCONHECIDO')

        # Campos de topo
        situacao_topo = props.get('situacao_topo', '')
        edicoes_topo = props.get('edicoes_topo', [])

        # Campos de orto
        situacao_orto = props.get('situacao_orto', '')
        edicoes_orto = props.get('edicoes_orto', [])

        # Verificações para TOPO
        erros_topo = verificar_campo(situacao_topo, edicoes_topo, 'topo')
        for erro in erros_topo:
            inconsistencias.append({
                'arquivo': nome_arquivo,
                'mi': mi,
                'tipo': 'TOPO',
                'situacao': situacao_topo,
                'edicoes': edicoes_topo,
                'erro': erro
            })

        # Verificações para ORTO
        erros_orto = verificar_campo(situacao_orto, edicoes_orto, 'orto')
        for erro in erros_orto:
            inconsistencias.append({
                'arquivo': nome_arquivo,
                'mi': mi,
                'tipo': 'ORTO',
                'situacao': situacao_orto,
                'edicoes': edicoes_orto,
                'erro': erro
            })

    return inconsistencias


def verificar_campo(situacao, edicoes, tipo_campo):
    """Verifica inconsistências de um campo (topo ou orto)."""
    erros = []
    num_edicoes = len(edicoes) if edicoes else 0

    # Regra 1: "Não mapeado" deve ter lista vazia
    if situacao == "Não mapeado" and num_edicoes > 0:
        erros.append(f"Situação 'Não mapeado' mas possui {num_edicoes} edição(ões): {edicoes}")

    # Regra 2: "Concluído" deve ter exatamente 1 edição
    if situacao == "Concluído" and num_edicoes == 0:
        erros.append("Situação 'Concluído' mas não possui nenhuma edição")

    if situacao == "Concluído" and num_edicoes > 1:
        erros.append(f"Situação 'Concluído' mas possui {num_edicoes} edições: {edicoes}")

    # Regra 3: Se tem edições mas situação é vazia ou inválida
    if num_edicoes > 0 and situacao == "":
        erros.append(f"Possui {num_edicoes} edição(ões) mas situação está vazia")

    # Regra 4: Se não tem edições mas situação indica mapeamento concluído
    if num_edicoes == 0 and situacao not in ["Não mapeado", ""]:
        erros.append(f"Situação '{situacao}' mas não possui nenhuma edição")

    return erros


def gerar_relatorio(inconsistencias, caminho_saida):
    """Gera um arquivo TXT com o relatório de inconsistências."""
    with open(caminho_saida, 'w', encoding='utf-8') as f:
        f.write("=" * 80 + "\n")
        f.write("RELATÓRIO DE INCONSISTÊNCIAS - SITUAÇÃO GERAL CT\n")
        f.write("=" * 80 + "\n\n")

        if not inconsistencias:
            f.write("Nenhuma inconsistência encontrada.\n")
            return

        f.write(f"Total de inconsistências encontradas: {len(inconsistencias)}\n\n")

        # Agrupar por arquivo
        por_arquivo = {}
        for inc in inconsistencias:
            arquivo = inc['arquivo']
            if arquivo not in por_arquivo:
                por_arquivo[arquivo] = []
            por_arquivo[arquivo].append(inc)

        for arquivo, incs in sorted(por_arquivo.items()):
            f.write("-" * 80 + "\n")
            f.write(f"Arquivo: {arquivo}\n")
            f.write(f"Quantidade de inconsistências: {len(incs)}\n")
            f.write("-" * 80 + "\n\n")

            for inc in incs:
                f.write(f"  MI: {inc['mi']}\n")
                f.write(f"  Tipo: {inc['tipo']}\n")
                f.write(f"  Situação: {inc['situacao']}\n")
                f.write(f"  Edições: {inc['edicoes']}\n")
                f.write(f"  ERRO: {inc['erro']}\n")
                f.write("\n")

        f.write("=" * 80 + "\n")
        f.write("FIM DO RELATÓRIO\n")
        f.write("=" * 80 + "\n")


def main():
    # Diretório dos arquivos
    diretorio_data = Path(__file__).parent / "data"

    # Padrão dos arquivos
    padrao = "situacao-geral-ct-*.geojson"

    todas_inconsistencias = []

    # Processar cada arquivo
    arquivos = list(diretorio_data.glob(padrao))

    if not arquivos:
        print(f"Nenhum arquivo encontrado com o padrão {padrao} em {diretorio_data}")
        return

    print(f"Processando {len(arquivos)} arquivo(s)...")

    for arquivo in arquivos:
        print(f"  - {arquivo.name}")
        features = carregar_geojson(arquivo)
        inconsistencias = verificar_inconsistencias(features, arquivo.name)
        todas_inconsistencias.extend(inconsistencias)

    # Gerar relatório
    caminho_saida = Path(__file__).parent / "inconsistencias_situacao_geral.txt"
    gerar_relatorio(todas_inconsistencias, caminho_saida)

    print(f"\nRelatório gerado: {caminho_saida}")
    print(f"Total de inconsistências: {len(todas_inconsistencias)}")


if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""
Script para gerar automaticamente as páginas de cursos individuais.
Lê o ficheiro cursos/template-curso.html (fonte única da verdade) e cria
uma cópia para cada curso. Como o template deteta o curso automaticamente
pelo nome do ficheiro (via JavaScript), todas as cópias são idênticas.

Uso: python3 gerar-paginas-cursos.py
"""

import os

# IDs dos cursos (devem corresponder às chaves em CURSOS_DATABASE, em dados-cursos.js)
CURSOS = [
    "plano-negocio-pratico",
    "marketing-digital-inteligente",
    "projeto-academico",
    "softwares-educativos",
    "cv-carta-profissional",
]

TEMPLATE_PATH = os.path.join("cursos", "template-curso.html")


def criar_paginas_cursos():
    """Cria as páginas de cursos individuais a partir do template mestre"""

    if not os.path.exists("cursos"):
        os.makedirs("cursos")
        print("✅ Pasta 'cursos' criada")

    if not os.path.exists(TEMPLATE_PATH):
        print(f"❌ Não encontrei {TEMPLATE_PATH}. Este ficheiro é a fonte única do template e é necessário.")
        return

    with open(TEMPLATE_PATH, encoding="utf-8") as f:
        template_conteudo = f.read()

    for curso_id in CURSOS:
        filename = f"cursos/{curso_id}.html"
        with open(filename, "w", encoding="utf-8") as f:
            f.write(template_conteudo)
        print(f"✅ Página criada: {filename}")

    print(f"\n✅ {len(CURSOS)} páginas de cursos foram criadas/atualizadas com sucesso!")
    print("\n📌 Próximas ações:")
    print("1. Editar dados-cursos.js para atualizar preços, descrições, etc.")
    print("2. Quando tiver os vídeos prontos, adicione o ID do YouTube em 'videoYouTubeId'")
    print("3. Se editar cursos/template-curso.html, corra este script de novo para propagar a mudança às 5 páginas")


if __name__ == "__main__":
    criar_paginas_cursos()

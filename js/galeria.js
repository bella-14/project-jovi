// src/galeria.js

document.addEventListener('DOMContentLoaded', () => {
  // Elementos do DOM
  const inputPesquisa = document.getElementById('pesquisa');
  const botoesFiltro = document.querySelectorAll('[data-filtro]');
  const conteinerGaleria = document.getElementById('galeria-fotos');
  const cardsFotos = conteinerGaleria ? conteinerGaleria.querySelectorAll('a[data-categoria]') : [];
  const totalItensLabel = document.querySelector('main section.mt-8 p.text-slate-400');
  const btnLimparDuplicadas = document.getElementById('botao-limpar');

  // Estado do filtro selecionado
  let filtroCategoriaAtivo = 'todos';

  // 1. Função para aplicar filtros e busca combinados
  function aplicarFiltros() {
    const termoBusca = inputPesquisa ? inputPesquisa.value.toLowerCase().trim() : '';
    let visiveis = 0;

    cardsFotos.forEach(card => {
      const categoriaCard = card.dataset.categoria ? card.dataset.categoria.toLowerCase() : '';
      const img = card.querySelector('img');
      const altTexto = img && img.alt ? img.alt.toLowerCase() : '';
      const badgeTexto = card.innerText.toLowerCase();

      // Checa categoria
      const passaFiltro = filtroCategoriaAtivo === 'todos' || categoriaCard === filtroCategoriaAtivo;

      // Checa busca por texto (no alt da imagem ou no texto interno)
      const passaBusca = termoBusca === '' || altTexto.includes(termoBusca) || badgeTexto.includes(termoBusca);

      if (passaFiltro && passaBusca) {
        card.style.display = '';
        visiveis++;
      } else {
        card.style.display = 'none';
      }
    });

    // Atualiza a contagem exibida no cabeçalho da galeria
    if (totalItensLabel) {
      totalItensLabel.textContent = `${visiveis} ${visiveis === 1 ? 'item encontrado' : 'itens encontrados'}`;
    }
  }

  // 2. Evento dos Botões de Categoria (Todos, Viagem, Natureza, etc.)
  botoesFiltro.forEach(btn => {
    btn.addEventListener('click', () => {
      // Reseta estilo visual dos botões
      botoesFiltro.forEach(b => {
        b.className = 'w-full min-w-0 rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-300 transition hover:border-violet-400/50 hover:text-violet-300';
      });

      // Aplica estilo ativo no botão clicado
      btn.className = 'w-full min-w-0 rounded-full bg-violet-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-400';

      filtroCategoriaAtivo = btn.dataset.filtro;
      aplicarFiltros();
    });
  });

  // 3. Evento de Pesquisa em Tempo Real
  if (inputPesquisa) {
    inputPesquisa.addEventListener('input', aplicarFiltros);
  }

  // 4. Ação do Botão "Liberar Espaço" (Fotos Duplicadas)
  if (btnLimparDuplicadas) {
    btnLimparDuplicadas.addEventListener('click', () => {
      const secaoDuplicadas = btnLimparDuplicadas.closest('section');

      btnLimparDuplicadas.disabled = true;
      btnLimparDuplicadas.textContent = 'Limpando...';

      setTimeout(() => {
        if (secaoDuplicadas) {
          secaoDuplicadas.style.transition = 'all 0.4s ease';
          secaoDuplicadas.style.opacity = '0';
          secaoDuplicadas.style.transform = 'translateY(-10px)';

          setTimeout(() => {
            secaoDuplicadas.remove();
          }, 400);
        }
      }, 600);
    });
  }
});

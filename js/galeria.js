
document.addEventListener('DOMContentLoaded', () => {

  const inputPesquisa = document.getElementById('pesquisa');
  const botoesFiltro = document.querySelectorAll('[data-filtro]');
  const conteinerGaleria = document.getElementById('galeria-fotos');
  const cardsFotos = conteinerGaleria ? conteinerGaleria.querySelectorAll('a[data-categoria]') : [];
  const totalItensLabel = document.querySelector('main section.mt-8 p.text-slate-400');
  const btnLimparDuplicadas = document.getElementById('botao-limpar');


  let filtroCategoriaAtivo = 'todos';

os
  function aplicarFiltros() {
    const termoBusca = inputPesquisa ? inputPesquisa.value.toLowerCase().trim() : '';
    let visiveis = 0;

    cardsFotos.forEach(card => {
      const categoriaCard = card.dataset.categoria ? card.dataset.categoria.toLowerCase() : '';
      const img = card.querySelector('img');
      const altTexto = img && img.alt ? img.alt.toLowerCase() : '';
      const badgeTexto = card.innerText.toLowerCase();


      const passaFiltro = filtroCategoriaAtivo === 'todos' || categoriaCard === filtroCategoriaAtivo;


      const passaBusca = termoBusca === '' || altTexto.includes(termoBusca) || badgeTexto.includes(termoBusca);

      if (passaFiltro && passaBusca) {
        card.style.display = '';
        visiveis++;
      } else {
        card.style.display = 'none';
      }
    });


    if (totalItensLabel) {
      totalItensLabel.textContent = `${visiveis} ${visiveis === 1 ? 'item encontrado' : 'itens encontrados'}`;
    }
  }


  botoesFiltro.forEach(btn => {
    btn.addEventListener('click', () => {
 
      botoesFiltro.forEach(b => {
        b.className = 'w-full min-w-0 rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-300 transition hover:border-violet-400/50 hover:text-violet-300';
      });


      btn.className = 'w-full min-w-0 rounded-full bg-violet-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-400';

      filtroCategoriaAtivo = btn.dataset.filtro;
      aplicarFiltros();
    });
  });


  if (inputPesquisa) {
    inputPesquisa.addEventListener('input', aplicarFiltros);
  }


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

// src/edicao.js

document.addEventListener('DOMContentLoaded', () => {
  // Elementos do DOM
  const imgPreview = document.getElementById('imagem-preview');
  const btnComparar = document.getElementById('botao-comparar');
  const btnCorrecao = document.getElementById('botao-correcao');
  const btnCorte = document.getElementById('botao-corte');

  // Controles de Sliders
  const inputTemp = document.getElementById('temperatura');
  const valorTemp = document.getElementById('valor-temperatura');

  const inputBrilho = document.getElementById('brilho');
  const valorBrilho = document.getElementById('valor-brilho');

  const inputContraste = document.getElementById('contraste');
  const valorContraste = document.getElementById('valor-contraste');

  // Botões de Efeitos e Formatos
  const botoesEfeito = document.querySelectorAll('[data-efeito]');
  const botoesFormato = document.querySelectorAll('[data-formato]');

  // Guardar estado do filtro ativo
  let filtroAtual = 'natural';

  // 1. Função para atualizar os filtros visuais na imagem
  function atualizarFiltrosImagem() {
    if (!imgPreview) return;

    // Converte os valores dos sliders para filtros CSS
    const brilhoVal = inputBrilho ? inputBrilho.value : 62;
    const contrasteVal = inputContraste ? inputContraste.value : 50;
    const tempVal = inputTemp ? inputTemp.value : 50;

    // Cálculo simplificado de temperatura de cor via hue-rotate e sepia
    const hueVal = (tempVal - 50) * 0.5;

    let estiloFiltro = `brightness(${brilhoVal / 50}) contrast(${contrasteVal / 50}) hue-rotate(${hueVal}deg)`;

    // Aplica efeitos específicos de estilo
    switch (filtroAtual) {
      case 'urbano':
        estiloFiltro += ' saturate(1.3) contrast(1.2)';
        break;
      case 'quente':
        estiloFiltro += ' sepia(0.3) saturate(1.2)';
        break;
      case 'frio':
        estiloFiltro += ' hue-rotate(180deg) saturate(0.8)';
        break;
      case 'preto-branco':
        estiloFiltro += ' grayscale(1)';
        break;
      case 'natural':
      default:
        break;
    }

    imgPreview.style.filter = estiloFiltro;
  }

  // 2. Atualizar valores dos Sliders e reagir à mudança
  [
    { input: inputTemp, label: valorTemp },
    { input: inputBrilho, label: valorBrilho },
    { input: inputContraste, label: valorContraste }
  ].forEach(item => {
    if (item.input && item.label) {
      item.input.addEventListener('input', () => {
        item.label.textContent = item.input.value;
        atualizarFiltrosImagem();
      });
    }
  });

  // 3. Alteração dos Filtros (Natural, Urbano, Quente, Frio, P&B)
  botoesEfeito.forEach(btn => {
    btn.addEventListener('click', () => {
      // Atualiza estilo dos botões
      botoesEfeito.forEach(b => {
        b.className = 'w-full min-w-0 rounded-xl border border-slate-700 px-2 py-2.5 text-sm text-slate-300 transition hover:border-amber-400/50 hover:text-amber-300';
      });

      btn.className = 'w-full min-w-0 rounded-xl bg-amber-400 px-2 py-2.5 text-sm font-medium text-slate-950';

      filtroAtual = btn.dataset.efeito;
      atualizarFiltrosImagem();
    });
  });

  // 4. Alteração de Formato de Imagem (Proporções Aspect Ratio)
  botoesFormato.forEach(btn => {
    btn.addEventListener('click', () => {
      botoesFormato.forEach(b => {
        b.className = 'w-full min-w-0 rounded-xl border border-slate-700 px-2 py-3 text-sm text-slate-300 transition hover:border-amber-400/50 hover:text-amber-300';
      });

      btn.className = 'w-full min-w-0 rounded-xl border border-amber-400/50 bg-amber-400/10 px-2 py-3 text-sm text-amber-300';

      const formato = btn.dataset.formato;
      if (imgPreview) {
        if (formato === 'quadrado') {
          imgPreview.className = 'aspect-square h-full w-full object-cover transition-all duration-300';
        } else if (formato === 'stories') {
          imgPreview.className = 'aspect-[9/16] max-h-[400px] w-full object-cover mx-auto transition-all duration-300';
        } else {
          imgPreview.className = 'aspect-[4/3] h-full w-full object-cover transition-all duration-300';
        }
      }
    });
  });

  // 5. Botão Comparar com Original (Segurar ou Clicar)
  if (btnComparar && imgPreview) {
    const ativarOriginal = () => {
      imgPreview.style.filter = 'none';
      btnComparar.textContent = 'Exibindo original';
    };

    const desativarOriginal = () => {
      atualizarFiltrosImagem();
      btnComparar.textContent = 'Ver original';
    };

    btnComparar.addEventListener('mousedown', ativarOriginal);
    btnComparar.addEventListener('mouseup', desativarOriginal);
    btnComparar.addEventListener('mouseleave', desativarOriginal);

    // Suporte a toque para mobile
    btnComparar.addEventListener('touchstart', (e) => { e.preventDefault(); ativarOriginal(); });
    btnComparar.addEventListener('touchend', desativarOriginal);
  }

  // 6. Sugestões Rápidas (Correção Automática e Corte Sugerido)
  if (btnCorrecao) {
    btnCorrecao.addEventListener('click', () => {
      if (inputBrilho) inputBrilho.value = 68;
      if (valorBrilho) valorBrilho.textContent = 68;

      if (inputContraste) inputContraste.value = 58;
      if (valorContraste) valorContraste.textContent = 58;

      if (inputTemp) inputTemp.value = 55;
      if (valorTemp) valorTemp.textContent = 55;

      atualizarFiltrosImagem();
    });
  }

  if (btnCorte) {
    btnCorte.addEventListener('click', () => {
      const btnQuadrado = document.querySelector('[data-formato="quadrado"]');
      if (btnQuadrado) btnQuadrado.click();
    });
  }

  // Inicializa com o filtro atual
  atualizarFiltrosImagem();
});

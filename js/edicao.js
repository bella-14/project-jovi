

document.addEventListener('DOMContentLoaded', () => {

  const imgPreview = document.getElementById('imagem-preview');
  const btnComparar = document.getElementById('botao-comparar');
  const btnCorrecao = document.getElementById('botao-correcao');
  const btnCorte = document.getElementById('botao-corte');


  const inputTemp = document.getElementById('temperatura');
  const valorTemp = document.getElementById('valor-temperatura');

  const inputBrilho = document.getElementById('brilho');
  const valorBrilho = document.getElementById('valor-brilho');

  const inputContraste = document.getElementById('contraste');
  const valorContraste = document.getElementById('valor-contraste');


  const botoesEfeito = document.querySelectorAll('[data-efeito]');
  const botoesFormato = document.querySelectorAll('[data-formato]');

  
  let filtroAtual = 'natural';

  
  function atualizarFiltrosImagem() {
    if (!imgPreview) return;


    const brilhoVal = inputBrilho ? inputBrilho.value : 62;
    const contrasteVal = inputContraste ? inputContraste.value : 50;
    const tempVal = inputTemp ? inputTemp.value : 50;

 
    const hueVal = (tempVal - 50) * 0.5;

    let estiloFiltro = `brightness(${brilhoVal / 50}) contrast(${contrasteVal / 50}) hue-rotate(${hueVal}deg)`;


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


  botoesEfeito.forEach(btn => {
    btn.addEventListener('click', () => {
     
      botoesEfeito.forEach(b => {
        b.className = 'w-full min-w-0 rounded-xl border border-slate-700 px-2 py-2.5 text-sm text-slate-300 transition hover:border-amber-400/50 hover:text-amber-300';
      });

      btn.className = 'w-full min-w-0 rounded-xl bg-amber-400 px-2 py-2.5 text-sm font-medium text-slate-950';

      filtroAtual = btn.dataset.efeito;
      atualizarFiltrosImagem();
    });
  });

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

 
    btnComparar.addEventListener('touchstart', (e) => { e.preventDefault(); ativarOriginal(); });
    btnComparar.addEventListener('touchend', desativarOriginal);
  }


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


  atualizarFiltrosImagem();
});

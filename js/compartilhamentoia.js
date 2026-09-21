

document.addEventListener('DOMContentLoaded', () => {
  
  const campoLegenda = document.getElementById('legenda');
  const btnUsarLegenda = document.getElementById('botao-usar-legenda');
  const btnGerarLegenda = document.getElementById('botao-gerar-legenda');
  const btnEditarLegenda = document.getElementById('botao-editar-legenda');
  
  const botoesPlataforma = document.querySelectorAll('[data-plataforma]');
  const checkboxCompressao = document.getElementById('compressao');
  const btnCompartilhar = document.getElementById('botao-compartilhar');

  
  const legendasIA = [
    "Um momento cheio de cores e boas lembranças. Cada detalhe merece ser guardado. #JOVI #SnapFlow",
    "A luz certa no momento certo. Capturado e aprimorado com inteligência. ✨ #SnapFlowIA",
    "Perspectivas únicas e memórias inesquecíveis. Vivendo o presente! 📸 #JOVI",
    "Transformando instantes simples em obras de arte. #FotografiaComIA #SnapFlow"
  ];

  
  if (btnGerarLegenda && campoLegenda) {
    btnGerarLegenda.addEventListener('click', () => {
      const legendaAtual = campoLegenda.value;
      let novaLegenda = legendaAtual;

      while (novaLegenda === legendaAtual && legendasIA.length > 1) {
        const indiceAleatorio = Math.floor(Math.random() * legendasIA.length);
        novaLegenda = legendasIA[indiceAleatorio];
      }

      campoLegenda.value = novaLegenda;
    
  
  if (btnUsarLegenda && campoLegenda) {
    btnUsarLegenda.addEventListener('click', () => {
      navigator.clipboard.writeText(campoLegenda.value)
        .then(() => {
          const textoOriginal = btnUsarLegenda.textContent;
          btnUsarLegenda.textContent = 'Copiado! ✓';
          btnUsarLegenda.classList.add('bg-emerald-300');

          setTimeout(() => {
            btnUsarLegenda.textContent = textoOriginal;
            btnUsarLegenda.classList.remove('bg-emerald-300');
          }, 2000);
        })
        .catch(() => alert('Legenda pronta para publicação!'));
    });
  }

  
  if (btnEditarLegenda && campoLegenda) {
    btnEditarLegenda.addEventListener('click', () => {
      campoLegenda.focus();
    });
  }

  
  botoesPlataforma.forEach(botao => {
    botao.addEventListener('click', () => {
      
      const estaAtivo = botao.classList.contains('border-emerald-400') || botao.classList.contains('bg-slate-800');

      if (estaAtivo) {
        botao.classList.remove('border-emerald-400', 'bg-slate-800');
        botao.classList.add('border-slate-700');
      } else {
        botao.classList.remove('border-slate-700');
        botao.classList.add('border-emerald-400', 'bg-slate-800');
      }
    });
  });


  if (btnCompartilhar) {
    btnCompartilhar.addEventListener('click', () => {
      
      const plataformasSelecionadas = Array.from(botoesPlataforma)
        .filter(b => b.classList.contains('border-emerald-400') || b.classList.contains('bg-slate-800') || b.dataset.plataforma === 'instagram')
        .map(b => b.dataset.plataforma);

      const estaComprimido = checkboxCompressao ? checkboxCompressao.checked : false;

   
      const textoBotaoOriginal = btnCompartilhar.textContent;
      btnCompartilhar.disabled = true;
      btnCompartilhar.textContent = 'Publicando com IA...';
      btnCompartilhar.classList.add('opacity-75');

      setTimeout(() => {
        alert(`✨ Foto publicada com sucesso!\n\nPlataformas: ${plataformasSelecionadas.join(', ') || 'Instagram'}\nCompressão Ativa: ${estaComprimido ? 'Sim (2,7 MB)' : 'Não (8,4 MB)'}`);
        
        btnCompartilhar.disabled = false;
        btnCompartilhar.textContent = textoBotaoOriginal;
        btnCompartilhar.classList.remove('opacity-75');
      }, 1500);
    });
  }
});

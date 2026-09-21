// src/compartilhamentoia.js

document.addEventListener('DOMContentLoaded', () => {
  // Elementos do DOM
  const campoLegenda = document.getElementById('legenda');
  const btnUsarLegenda = document.getElementById('botao-usar-legenda');
  const btnGerarLegenda = document.getElementById('botao-gerar-legenda');
  const btnEditarLegenda = document.getElementById('botao-editar-legenda');
  
  const botoesPlataforma = document.querySelectorAll('[data-plataforma]');
  const checkboxCompressao = document.getElementById('compressao');
  const btnCompartilhar = document.getElementById('botao-compartilhar');

  // Banco de legendas simuladas pela IA
  const legendasIA = [
    "Um momento cheio de cores e boas lembranças. Cada detalhe merece ser guardado. #JOVI #SnapFlow",
    "A luz certa no momento certo. Capturado e aprimorado com inteligência. ✨ #SnapFlowIA",
    "Perspectivas únicas e memórias inesquecíveis. Vivendo o presente! 📸 #JOVI",
    "Transformando instantes simples em obras de arte. #FotografiaComIA #SnapFlow"
  ];

  // 1. Alternar / Gerar nova legenda pela IA
  if (btnGerarLegenda && campoLegenda) {
    btnGerarLegenda.addEventListener('click', () => {
      const legendaAtual = campoLegenda.value;
      let novaLegenda = legendaAtual;

      // Garante que traga uma legenda diferente da atual
      while (novaLegenda === legendaAtual && legendasIA.length > 1) {
        const indiceAleatorio = Math.floor(Math.random() * legendasIA.length);
        novaLegenda = legendasIA[indiceAleatorio];
      }

      campoLegenda.value = novaLegenda;
    });
  }

  // 2. Copiar/Confirmar legenda (Usar esta)
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

  // 3. Focar na caixa de texto para edição
  if (btnEditarLegenda && campoLegenda) {
    btnEditarLegenda.addEventListener('click', () => {
      campoLegenda.focus();
    });
  }

  // 4. Seleção e Destaque de Plataformas
  botoesPlataforma.forEach(botao => {
    botao.addEventListener('click', () => {
      // Alterna estilo ativo/inativo ao clicar na rede social
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

  // 5. Ação do Botão de Compartilhar (Simulação)
  if (btnCompartilhar) {
    btnCompartilhar.addEventListener('click', () => {
      // Coleta plataformas selecionadas
      const plataformasSelecionadas = Array.from(botoesPlataforma)
        .filter(b => b.classList.contains('border-emerald-400') || b.classList.contains('bg-slate-800') || b.dataset.plataforma === 'instagram')
        .map(b => b.dataset.plataforma);

      const estaComprimido = checkboxCompressao ? checkboxCompressao.checked : false;

      // Animação de carregamento no botão
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

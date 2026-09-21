// src/index.js

document.addEventListener('DOMContentLoaded', () => {
  // Elementos do DOM
  const elementoSaudacao = document.querySelector('header p.text-slate-400');
  const cardIa = document.querySelector('main section div.border-cyan-400\\/20');
  const badgeIaStatus = cardIa ? cardIa.querySelector('span.inline-flex') : null;

  // 1. Atualizar a saudação dinamicamente conforme a hora do dia
  function atualizarSaudacao() {
    if (!elementoSaudacao) return;

    const hora = new Date().getHours();
    let textoSaudacao = 'Olá, usuário';

    if (hora >= 5 && hora < 12) {
      textoSaudacao = 'Bom dia, usuário';
    } else if (hora >= 12 && hora < 18) {
      textoSaudacao = 'Boa tarde, usuário';
    } else {
      textoSaudacao = 'Boa noite, usuário';
    }

    elementoSaudacao.textContent = textoSaudacao;
  }

  // 2. Simular animação de pulso no indicador "IA ativa"
  function animarStatusIa() {
    if (!badgeIaStatus) return;

    const pontoVerde = badgeIaStatus.querySelector('span');
    if (pontoVerde) {
      pontoVerde.classList.add('animate-ping');
      setTimeout(() => {
        pontoVerde.classList.remove('animate-ping');
      }, 1500);
    }
  }

  // 3. Efeito visual ao clicar no card de sugestões da IA
  if (cardIa) {
    cardIa.style.cursor = 'pointer';
    cardIa.addEventListener('click', () => {
      animarStatusIa();
    });
  }

  // Executa inicializações
  atualizarSaudacao();
  
  // Pisca o indicador a cada 4 segundos para dar sensação de sistema dinâmico
  setInterval(animarStatusIa, 4000);
});

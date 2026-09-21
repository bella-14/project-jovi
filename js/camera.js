

document.addEventListener('DOMContentLoaded', () => {
    const btnCapturar = document.getElementById('botao-capturar');
    const containerCamera = document.querySelector('section div.relative');

    // Módulos de métricas para simulação dinâmica da IA
    const elementoExposicao = document.querySelectorAll('article p.font-semibold')[1];
    const elementoISO = document.querySelectorAll('article p.font-semibold')[3];

    if (btnCapturar) {
        btnCapturar.addEventListener('click', () => {
           
            executarEfeitoFlash(containerCamera);

            
            btnCapturar.classList.add('scale-90');
            setTimeout(() => btnCapturar.classList.remove('scale-90'), 150);

           
            simularAnaliseIA(elementoExposicao, elementoISO);
        });
    }
});


function executarEfeitoFlash(container) {
    if (!container) return;

    const flash = document.createElement('div');
    flash.className = 'absolute inset-0 bg-white z-40 transition-opacity duration-300 opacity-100';
    container.appendChild(flash);

    setTimeout(() => {
        flash.classList.add('opacity-0');
        setTimeout(() => flash.remove(), 300);
    }, 100);
}


function simularAnaliseIA(exposicaoEl, isoEl) {
    const exposicoes = ['+0.0', '+0.3', '-0.3', '+0.7'];
    const isos = ['64', '80', '100', '200'];

    const novaExp = exposicoes[Math.floor(Math.random() * exposicoes.length)];
    const novoISO = isos[Math.floor(Math.random() * isos.length)];

    if (exposicaoEl) exposicaoEl.textContent = novaExp;
    if (isoEl) isoEl.textContent = novoISO;
}

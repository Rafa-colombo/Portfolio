<script>
  const carrossel = document.getElementById('carrossel');
  let isDown = false;
  let startX;
  let scrollLeft;
  let autoScrollInterval;

  // Função para fazer o scroll automático lento
  function iniciarAutoScroll() {
    autoScrollInterval = setInterval(() => {
      carrossel.scrollLeft += 1; // Velocidade do scroll (aumente para mais rápido)
      
      // Se chegar no final, volta suavemente para o início
      if (carrossel.scrollLeft >= (carrossel.scrollWidth - carrossel.clientWidth - 1)) {
        carrossel.scrollLeft = 0;
      }
    }, 25); // Tempo em ms entre os 'passos' (menor = mais fluído)
  }

  // Inicia o auto-scroll quando a página carrega
  iniciarAutoScroll();

  // Pausa se o usuário colocar o mouse em cima
  carrossel.addEventListener('mouseenter', () => {
    clearInterval(autoScrollInterval);
  });

  // Retoma quando o mouse sai
  carrossel.addEventListener('mouseleave', () => {
    iniciarAutoScroll();
    isDown = false;
  });

  // Lógica para permitir "arrastar" com o mouse (Drag to Scroll)
  carrossel.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - carrossel.offsetLeft;
    scrollLeft = carrossel.scrollLeft;
    carrossel.style.cursor = 'grabbing';
  });

  carrossel.addEventListener('mouseup', () => {
    isDown = false;
    carrossel.style.cursor = 'pointer';
  });

  carrossel.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carrossel.offsetLeft;
    const walk = (x - startX) * 2; // Multiplicador da velocidade do arraste
    carrossel.scrollLeft = scrollLeft - walk;
  });
  
  // Para mobile (Toque)
  carrossel.addEventListener('touchstart', () => clearInterval(autoScrollInterval));
  carrossel.addEventListener('touchend', iniciarAutoScroll);
</script>

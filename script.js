
// 1. LÓGICA DO CARROSSEL INFINITO 
const carrossel = document.getElementById('carrossel');

const projetos = Array.from(carrossel.children);
projetos.forEach(projeto => {
  const clone = projeto.cloneNode(true);
  carrossel.appendChild(clone);
});

projetos.forEach(projeto => {
  const clone = projeto.cloneNode(true);
  carrossel.appendChild(clone);
});

let isDown = false;
let startX;
let scrollLeft;
let autoScrollInterval;

function iniciarAutoScroll() {
  autoScrollInterval = setInterval(() => {
    carrossel.scrollLeft += 1; 
    
    if (carrossel.scrollLeft >= carrossel.scrollWidth / 2) {
      carrossel.scrollLeft = 0;
    }
  }, 25);
}

iniciarAutoScroll();

// Eventos para pausar o carrossel no mouse ou toque
carrossel.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
carrossel.addEventListener('mouseleave', () => { iniciarAutoScroll(); isDown = false; });

// Lógica de arrastar com o mouse (Drag to Scroll)
carrossel.addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.pageX - carrossel.offsetLeft;
  scrollLeft = carrossel.scrollLeft;
  carrossel.style.cursor = 'grabbing';
});

carrossel.addEventListener('mouseup', () => { 
    isDown = false; 
    carrossel.style.cursor = 'grab'; 
});

carrossel.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - carrossel.offsetLeft;
  const walk = (x - startX) * 2; // Multiplicador de velocidade do arrasto
  carrossel.scrollLeft = scrollLeft - walk;
});

// Suporte para touch no Mobile (pausa o auto-scroll quando o usuário interage)
carrossel.addEventListener('touchstart', () => clearInterval(autoScrollInterval));
carrossel.addEventListener('touchend', iniciarAutoScroll);


// 2. LÓGICA DE COPIAR E-MAIL E ALERTA
const emailLink = document.getElementById("email-link");
const alerta = document.getElementById("alerta-copy");

emailLink.addEventListener("click", (e) => {
  e.preventDefault();
  const email = "rafaelcolombomiranda@gmail.com";
  
  navigator.clipboard.writeText(email).then(() => {
    alerta.classList.add("show");

    setTimeout(() => {
      alerta.classList.remove("show");
    }, 2500); 
  });
});

// 3. LÓGICA DO ACCORDION DE CERTIFICAÇÕES
// Seleciona apenas os headers que têm a funcionalidade de clique (ignora os standalones)
const accordions = document.querySelectorAll('.accordion-header:not(.standalone)');

accordions.forEach(acc => {
  acc.addEventListener('click', function() {
    // Alterna a classe active para girar a setinha
    this.classList.toggle('active');
    
    // Pega a div do conteúdo logo abaixo do botão
    const content = this.nextElementSibling;
    
    // Se já estiver aberto (com max-height), ele fecha. Se não, ele calcula a altura exata e abre.
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
});

// ==========================================
// 1. LÓGICA DO CARROSSEL DE PROJETOS INFINITO
// ==========================================
const carrossel = document.getElementById('carrossel');

// O GRANDE TRUQUE: Clonar os itens originais para o loop perfeito
const projetos = Array.from(carrossel.children);
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
    
    // Quando chegar exatamente na metade (onde os clones começam), reseta pro 0
    if (carrossel.scrollLeft >= carrossel.scrollWidth / 2) {
      carrossel.scrollLeft = 0;
    }
  }, 25); // Velocidade (menor = mais rápido/fluido)
}

iniciarAutoScroll();

carrossel.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
carrossel.addEventListener('mouseleave', () => { iniciarAutoScroll(); isDown = false; });
carrossel.addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.pageX - carrossel.offsetLeft;
  scrollLeft = carrossel.scrollLeft;
  carrossel.style.cursor = 'grabbing';
});
carrossel.addEventListener('mouseup', () => { isDown = false; carrossel.style.cursor = 'pointer'; });
carrossel.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - carrossel.offsetLeft;
  const walk = (x - startX) * 2; 
  carrossel.scrollLeft = scrollLeft - walk;
});
carrossel.addEventListener('touchstart', () => clearInterval(autoScrollInterval));
carrossel.addEventListener('touchend', iniciarAutoScroll);

// ==========================================
// 2. LÓGICA DE COPIAR E-MAIL E ALERTA
// ==========================================
const emailLink = document.getElementById("email-link");
const alerta = document.getElementById("alerta-copy");

emailLink.addEventListener("click", (e) => {
  e.preventDefault();
  const email = "rafaelcolombomiranda@gmail.com";
  
  navigator.clipboard.writeText(email).then(() => {
    // Mostra alerta
    alerta.classList.add("show");

    // Esconde após 2 segundos
    setTimeout(() => {
      alerta.classList.remove("show");
    }, 2000);
  });
});

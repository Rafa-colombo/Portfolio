// ==========================================
// 1. LÓGICA DO CARROSSEL DE PROJETOS
// ==========================================
const carrossel = document.getElementById('carrossel');
let isDown = false;
let startX;
let scrollLeft;
let autoScrollInterval;

function iniciarAutoScroll() {
  autoScrollInterval = setInterval(() => {
    carrossel.scrollLeft += 1; 
    if (carrossel.scrollLeft >= (carrossel.scrollWidth - carrossel.clientWidth - 1)) {
      carrossel.scrollLeft = 0;
    }
  }, 25); 
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

// 1. Efeito do Header (Fica mais sólido e com sombra ao rolar a página)
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.background = 'rgba(5, 11, 20, 0.98)';
        header.style.boxShadow = '0 4px 30px rgba(57, 255, 20, 0.1)'; // Sombra leve neon verde
        header.style.transition = 'all 0.3s ease';
    } else {
        header.style.background = 'rgba(5, 11, 20, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// 2. Navegação Suave (Smooth Scroll) para os links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Calcula a posição considerando a altura do header fixo (80px)
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// 3. Efeito de Revelação (Scroll Reveal) estilo sites Premium
// Configuração do observador
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Dispara quando 15% do elemento aparece na tela
};

// Lógica de observação
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target); // Anima apenas na primeira vez que aparece
        }
    });
}, observerOptions);

// Seleciona os elementos que terão animação e os observa
document.addEventListener('DOMContentLoaded', () => {
    const elementosParaAnimar = document.querySelectorAll('.method-card, .sol-card, .expert-img, .expert-text');
    
    elementosParaAnimar.forEach((el) => {
        el.classList.add('reveal-hidden'); // Prepara o elemento escondendo-o
        observer.observe(el);
    });
});
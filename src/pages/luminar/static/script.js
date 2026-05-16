document.addEventListener('DOMContentLoaded', () => {
    // Sticky Navbar
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach(el => observer.observe(el));

    // Form Submission (WhatsApp Redirect)
    const form = document.getElementById('lead-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Captura os dados do formulário
            const nome = document.getElementById('nome').value;
            const interesseSelect = document.getElementById('interesse');
            const interesse = interesseSelect.options[interesseSelect.selectedIndex].text;
            
            // Número do WhatsApp da clínica (substitua pelo número real)
            const numeroClinica = "5512988903785"; 
            
            // Monta a mensagem
            const mensagem = `Olá, clínica Lumina! Meu nome é ${nome} e tenho interesse em: ${interesse}. Gostaria de mais informações sobre avaliação.`;
            
            // Redireciona para o WhatsApp
            const url = `https://wa.me/${numeroClinica}?text=${encodeURIComponent(mensagem)}`;
            window.open(url, '_blank');
            
            // Limpa o formulário
            form.reset();
        });
    }
});

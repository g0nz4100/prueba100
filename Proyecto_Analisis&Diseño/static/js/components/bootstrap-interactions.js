/* ========================================
   INTERACCIONES BOOTSTRAP - MELIMEL
   Funcionalidades avanzadas y animaciones
   ======================================== */

// Espera a que el DOM esté completamente cargado antes de ejecutar
document.addEventListener('DOMContentLoaded', function() {
    
    /* ========================================
       INICIALIZACIÓN DE TOOLTIPS
       ======================================== */
    // Inicializa todos los tooltips de Bootstrap para los botones hexagonales
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl, {
            delay: { "show": 300, "hide": 100 },    // Retrasos para mostrar/ocultar
            animation: true                          // Habilita animaciones
        });
    });
    
    /* ========================================
       ANIMACIONES DE TARJETAS AL SCROLL
       ======================================== */
    // Selecciona todas las tarjetas temáticas de miel
    const honeyCards = document.querySelectorAll('.honey-card');
    
    // Intersection Observer para detectar cuando las tarjetas entran en el viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {              // Si el elemento es visible
                entry.target.style.opacity = '1';    // Hace visible la tarjeta
                entry.target.style.transform = 'translateY(0)';  // La mueve a su posición final
            }
        });
    });
    
    // Configura el estado inicial y aplica el observer a cada tarjeta
    honeyCards.forEach(card => {
        card.style.opacity = '0';                    // Inicialmente invisible
        card.style.transform = 'translateY(30px)';  // Desplazada hacia abajo
        card.style.transition = 'all 0.6s ease';   // Transición suave
        observer.observe(card);                      // Inicia la observación
    });
    
    /* ========================================
       ANIMACIÓN DE CONTADORES ESTADÍSTICOS
       ======================================== */
    // Selecciona todos los números de las estadísticas
    const statNumbers = document.querySelectorAll('.stat-item .display-4');
    
    // Función para animar el conteo de números desde 0 hasta el valor final
    function animateCounter(element) {
        const target = parseInt(element.textContent.replace(/\D/g, ''));  // Extrae solo los números
        const suffix = element.textContent.replace(/\d/g, '');           // Extrae símbolos (+, %, etc.)
        let current = 0;                                                 // Contador inicial
        const increment = target / 50;                                   // Incremento por paso
        
        // Timer que actualiza el contador cada 30ms
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {                                     // Si alcanza el objetivo
                current = target;                                        // Fija el valor final
                clearInterval(timer);                                    // Detiene el timer
            }
            element.textContent = Math.floor(current) + suffix;          // Actualiza el texto
        }, 30);
    }
    
    /* ========================================
       OBSERVER PARA ESTADÍSTICAS
       ======================================== */
    // Observer específico para activar la animación de contadores
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {                              // Si la estadística es visible
                const number = entry.target.querySelector('.display-4');
                if (number && !number.classList.contains('animated')) {  // Si no ha sido animado aún
                    number.classList.add('animated');               // Marca como animado
                    animateCounter(number);                          // Inicia la animación del contador
                }
            }
        });
    });
    
    // Aplica el observer a todos los elementos de estadísticas
    document.querySelectorAll('.stat-item').forEach(stat => {
        statsObserver.observe(stat);
    });
    
    /* ========================================
       EFECTO PARALLAX PARA ABEJAS FLOTANTES
       ======================================== */
    // Añade efecto parallax suave a las abejas flotantes durante el scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;                     // Cantidad de scroll vertical
        const bees = document.querySelectorAll('.floating-bee'); // Selecciona todas las abejas flotantes
        
        // Aplica diferentes velocidades de movimiento a cada abeja
        bees.forEach((bee, index) => {
            const speed = 0.5 + (index * 0.2);                  // Velocidad única para cada abeja
            bee.style.transform = `translateY(${scrolled * speed}px)`;  // Aplica el desplazamiento
        });
    });
    
});
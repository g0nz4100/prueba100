// Navegación del navbar con expansión automática de acordeón
document.addEventListener('DOMContentLoaded', function() {
    // Verificar si hay un hash en la URL
    const hash = window.location.hash;
    
    if (hash) {
        // Esperar a que la página cargue completamente
        setTimeout(() => {
            const targetId = hash.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement && targetElement.classList.contains('accordion-item')) {
                // Buscar el botón del acordeón correspondiente
                const accordionButton = targetElement.querySelector('.accordion-button');
                
                if (accordionButton) {
                    // Obtener el target del collapse
                    const collapseTarget = accordionButton.getAttribute('data-bs-target');
                    const collapseElement = document.querySelector(collapseTarget);
                    
                    if (collapseElement) {
                        // Expandir el acordeón
                        const bsCollapse = new bootstrap.Collapse(collapseElement, {
                            show: true
                        });
                    }
                }
                
                // Hacer scroll suave al elemento después de expandir
                setTimeout(() => {
                    targetElement.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start'
                    });
                    // Ajustar por el navbar sticky
                    window.scrollBy(0, -100);
                }, 400);
            }
        }, 300);
    }
});

// ACORDEÓN MODERNO CON BOOTSTRAP 5
document.addEventListener('DOMContentLoaded', function() {
    console.log('Acordeón inicializado');
    
    // Asegurar que Bootstrap esté disponible
    if (typeof bootstrap === 'undefined') {
        console.error('Bootstrap no está cargado');
        return;
    }
    
    // Inicializar todos los acordeones de Bootstrap
    const accordionButtons = document.querySelectorAll('.accordion-button');
    accordionButtons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            console.log('Clic en acordeón:', this);
            // Bootstrap manejará automáticamente el toggle
        });
    });
    
    // Tooltips para cada sección
    const tooltipTexts = {
        'introduccion': '¿Qué es el SGPP y por qué es importante?',
        'antecedentes': '¿Cómo llegamos a necesitar esta solución?',
        'planteamiento': '¿Cuáles son los problemas específicos que debemos resolver?',
        'arbol-problemas': '¿Cuáles son las causas y efectos del problema?',
        'formulacion': '¿Cómo formulamos la pregunta de investigación?',
        'objetivos': '¿Qué queremos lograr con este proyecto?',
        'proposito': '¿Cuál es la finalidad de esta investigación?',
        'metodologia': '¿Cómo vamos a desarrollar la solución?',
        'planificacion': '¿Cuál es el cronograma del proyecto?'
    };
    
    // Crear tooltips para cada sección del acordeón
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(function(item) {
        const sectionId = item.id;
        const tooltipText = tooltipTexts[sectionId];
        
        if (tooltipText) {
            // Crear elemento tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'section-tooltip';
            tooltip.textContent = tooltipText;
            item.appendChild(tooltip);
            
            const button = item.querySelector('.accordion-button');
            
            // Eventos de hover en el botón del acordeón
            const accordionButton = item.querySelector('.accordion-button');
            
            accordionButton.addEventListener('mouseenter', function(e) {
                console.log('Hover en:', sectionId);
                tooltip.classList.add('show');
            });
            
            accordionButton.addEventListener('mouseleave', function() {
                tooltip.classList.remove('show');
            });
        }
    });
    
    // Función para scroll suave al hacer clic en el índice
    window.scrollToSection = function(sectionId) {
        console.log('Navegando a:', sectionId);
        const element = document.getElementById(sectionId);
        if (element) {
            // Scroll suave a la sección
            element.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
            
            // Abrir automáticamente la sección si está cerrada
            const accordionButton = element.querySelector('.accordion-button');
            const accordionCollapse = element.querySelector('.accordion-collapse');
            
            if (accordionButton && accordionCollapse && !accordionCollapse.classList.contains('show')) {
                // Usar Bootstrap para abrir el acordeón
                const bsCollapse = new bootstrap.Collapse(accordionCollapse, {
                    show: true
                });
            }
        } else {
            console.log('Elemento no encontrado:', sectionId);
        }
    };
    
    // Agregar efectos de hover mejorados (solo a los botones que no tienen el event listener de clic)
    const allAccordionButtons = document.querySelectorAll('.accordion-button');
    allAccordionButtons.forEach(function(button) {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.01)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Animación de entrada para las secciones
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observar todas las secciones del acordeón
    const accordionSections = document.querySelectorAll('.accordion-item');
    accordionSections.forEach(function(section) {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Agregar eventos de clic a los elementos del índice
    const indexItems = document.querySelectorAll('.index-item');
    indexItems.forEach(function(item) {
        item.addEventListener('click', function() {
            const onclick = this.getAttribute('onclick');
            if (onclick) {
                // Extraer el ID de la función onclick
                const match = onclick.match(/scrollToSection\('([^']+)'\)/);
                if (match) {
                    scrollToSection(match[1]);
                }
            }
        });
    });
});

// Función para alternar secciones (compatibilidad con código existente)
function toggleSection(sectionId) {
    const targetId = sectionId.replace('content-', 'collapse');
    const collapseElement = document.getElementById(targetId);
    if (collapseElement) {
        const bsCollapse = new bootstrap.Collapse(collapseElement, {
            toggle: true
        });
    }
}
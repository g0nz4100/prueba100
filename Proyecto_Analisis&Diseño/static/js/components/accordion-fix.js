document.addEventListener('DOMContentLoaded', function() {
    console.log('Accordion Fix cargado y perfeccionado.');

    // Función para resaltar el item activo en el índice
    function setActiveIndex(sectionId) {
        const allIndexItems = document.querySelectorAll('.index-item');
        allIndexItems.forEach(item => {
            item.classList.remove('active');
        });
        
        if (sectionId) {
            const activeItem = document.querySelector(`.index-item[onclick="scrollToSection('${sectionId}')"]`);
            if (activeItem) {
                activeItem.classList.add('active');
            }
        }
    }

    // Función para scroll suave y apertura de sección desde el índice
    window.scrollToSection = function(sectionId) {
        console.log('Navegando a:', sectionId);
        const element = document.getElementById(sectionId);

        if (element) {
            // 1. Resaltar el elemento del índice inmediatamente.
            setActiveIndex(sectionId);

            // 2. Abrir la sección del acordeón correspondiente.
            // Bootstrap se encargará de cerrar cualquier otra sección abierta gracias a `data-bs-parent`.
            const collapseElement = element.querySelector('.accordion-collapse');
            if (collapseElement && !collapseElement.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getOrCreateInstance(collapseElement);
                
                // 3. Escuchar el evento 'shown.bs.collapse' que se dispara CUANDO la sección TERMINA de abrirse.
                // Esto es clave para asegurar que el scroll se calcule con la posición final correcta.
                collapseElement.addEventListener('shown.bs.collapse', function onShown() {
                    const navbarHeight = document.querySelector('.navbar.sticky-top')?.offsetHeight || 70;
                    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                    const offsetPosition = elementPosition - navbarHeight - 20; // 20px de margen extra.

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Limpiamos el listener para que no se ejecute múltiples veces en el futuro.
                    collapseElement.removeEventListener('shown.bs.collapse', onShown);
                });

                bsCollapse.show();
            }
        }
    };

    // Sincronizar el índice cuando el usuario interactúa directamente con el acordeón
    const accordion = document.getElementById('marcoTeoricoAccordion');
    if (accordion) {
        // Cuando una sección se cierra, quitamos el resaltado del índice.
        accordion.addEventListener('hidden.bs.collapse', function (event) {
            const closedSectionId = event.target.parentElement.id;
            const activeIndex = document.querySelector('.index-item.active');
            if (activeIndex && activeIndex.getAttribute('onclick').includes(closedSectionId)) {
                setActiveIndex(null); // Quita la clase 'active'.
            }
        });

        // Cuando una sección se abre, resaltamos el elemento correspondiente en el índice.
        accordion.addEventListener('shown.bs.collapse', function (event) {
            const openedSectionId = event.target.parentElement.id;
            setActiveIndex(openedSectionId); // Resalta el índice correcto.
        });
    }
});
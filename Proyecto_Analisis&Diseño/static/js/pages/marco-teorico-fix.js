// ACORDEÓN SOLO CON FLECHAS EN HEADERS
function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    const header = document.querySelector(`[onclick="toggleSection('${sectionId}')"]`);
    const arrow = header ? header.querySelector('.toggle-icon') : null;
    
    if (section && arrow) {
        // Alternar visibilidad
        if (section.style.display === 'none' || section.style.display === '') {
            section.style.display = 'block';
            arrow.className = 'bi bi-chevron-up toggle-icon'; // Flecha hacia arriba
        } else {
            section.style.display = 'none';
            arrow.className = 'bi bi-chevron-down toggle-icon'; // Flecha hacia abajo
        }
    }
}

// Cuando la página carga
document.addEventListener('DOMContentLoaded', function() {
    // Ocultar todas las secciones al inicio
    const sections = [
        'content-introduccion',
        'content-antecedentes', 
        'content-planteamiento',
        'content-arbol-problemas',
        'content-formulacion',
        'content-objetivos',
        'content-metodologia',
        'content-planificacion'
    ];
    
    sections.forEach(function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.style.display = 'none';
        }
    });
    
    // Asegurar que todas las flechas estén hacia abajo al inicio
    const arrows = document.querySelectorAll('.toggle-icon');
    arrows.forEach(function(arrow) {
        arrow.className = 'bi bi-chevron-down toggle-icon';
    });
});
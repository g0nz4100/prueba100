/* ========================================
   SCRIPT PRINCIPAL - MELIMEL
   Funcionalidades JavaScript para el sitio web
   ======================================== */

/* ========================================
   NAVEGACIÓN SUAVE ENTRE SECCIONES
   ======================================== */
// Implementa scroll suave para todos los enlaces internos (que empiecen con #)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    // Añade event listener a cada enlace interno
    anchor.addEventListener('click', function (e) {
        e.preventDefault();                                    // Previene el comportamiento por defecto del enlace
        const target = document.querySelector(this.getAttribute('href'));  // Obtiene el elemento destino
        
        // Si el elemento destino existe, hace scroll suave hacia él
        if (target) {
            target.scrollIntoView({ 
                behavior: 'smooth',     // Scroll suave en lugar de instantáneo
                block: 'start'         // Alinea el elemento al inicio del viewport
            });
        }
    });
});
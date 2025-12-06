document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.hexagon-dropdown');

    dropdowns.forEach(dropdown => {
        const dropdownContent = dropdown.querySelector('.hexagon-dropdown-content');
        let timeoutId;

        dropdown.addEventListener('mouseenter', () => {
            clearTimeout(timeoutId);
            if (dropdownContent) {
                dropdownContent.style.display = 'block';
            }
        });

        dropdown.addEventListener('mouseleave', () => {
            timeoutId = setTimeout(() => {
                if (dropdownContent) dropdownContent.style.display = 'none';
            }, 200); // Pequeño delay para mejorar la usabilidad
        });
    });
});
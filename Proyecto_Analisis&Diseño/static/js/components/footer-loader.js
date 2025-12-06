// Footer Loader - Carga automática del footer común
document.addEventListener('DOMContentLoaded', function() {
    // Función para cargar el footer común
    function loadFooter() {
        fetch('../templates/components/footer.html')
            .then(response => response.text())
            .then(data => {
                // Buscar el elemento donde insertar el footer
                const footerContainer = document.getElementById('footer-container');
                if (footerContainer) {
                    footerContainer.innerHTML = data;
                }
            })
            .catch(error => {
                console.log('Footer ya está incluido directamente en la página');
            });
    }

    // Cargar footer si existe el contenedor
    loadFooter();
});
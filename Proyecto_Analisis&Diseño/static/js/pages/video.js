// ========================================
// FUNCIONALIDADES PARA PÁGINA DE VIDEO
// ========================================

// ID del video de YouTube (extraído de la URL)
const youtubeVideoId = 'T9XmtrcUgys';
let youtubeVideoUrl = 'https://youtu.be/T9XmtrcUgys?list=RDT9XmtrcUgys';

// Función para cargar el video de YouTube
function loadVideo(customUrl = null) {
    const videoFrame = document.getElementById('videoFrame');
    const url = customUrl || youtubeVideoUrl;
    
    if (!url) {
        alert('🎥 URL del video no configurada aún. Proporciona la URL de YouTube.');
        return;
    }
    
    // Mostrar indicador de carga
    videoFrame.innerHTML = `
        <div class="video-placeholder loading-video">
            <div class="placeholder-content">
                <div class="spinner-border text-warning mb-3" role="status">
                    <span class="visually-hidden">Cargando...</span>
                </div>
                <h4 class="text-white">Cargando video...</h4>
            </div>
        </div>
    `;
    
    // Simular tiempo de carga y luego mostrar el video
    setTimeout(() => {
        const embedUrl = `https://www.youtube.com/embed/${youtubeVideoId}?rel=0&modestbranding=1&controls=1`;
        videoFrame.innerHTML = `
            <iframe 
                src="${embedUrl}" 
                title="Video Demostrativo Melimel" 
                frameborder="0" 
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowfullscreen>
            </iframe>
        `;
    }, 1500);
}

// Función para convertir URL de YouTube a formato embed
function convertToEmbedUrl(url) {
    // Extraer el ID del video de diferentes formatos de URL de YouTube
    let videoId = '';
    
    if (url.includes('youtube.com/watch?v=')) {
        videoId = url.split('v=')[1].split('&')[0];
    } else if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1].split('?')[0];
    } else if (url.includes('youtube.com/embed/')) {
        return url; // Ya está en formato embed
    }
    
    return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&controls=1`;
}

// Función para establecer la URL del video
function setVideoUrl(url) {
    youtubeVideoUrl = url;
    console.log('🎥 URL del video configurada:', url);
}

// Función para manejar videos relacionados
function playRelatedVideo(videoTitle) {
    alert(`🎬 Reproduciendo: ${videoTitle}\n\n(Esta funcionalidad se implementará con URLs reales)`);
}

// Event listeners para videos relacionados
document.addEventListener('DOMContentLoaded', function() {
    // Agregar event listeners a las tarjetas de videos relacionados
    const relatedVideoCards = document.querySelectorAll('.related-video-card');
    
    relatedVideoCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h5').textContent;
            playRelatedVideo(title);
        });
        
        // Agregar efecto de hover mejorado
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Agregar funcionalidad al botón de cargar video
    const loadButton = document.querySelector('.video-placeholder button');
    if (loadButton) {
        loadButton.addEventListener('click', function() {
            loadVideo();
        });
    }
});

// Función para crear efecto de partículas en el video
function createVideoParticles() {
    const videoWrapper = document.querySelector('.video-wrapper');
    if (!videoWrapper) return;
    
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.className = 'video-particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: #FFC107;
            border-radius: 50%;
            pointer-events: none;
            animation: float-particle ${3 + Math.random() * 2}s infinite ease-in-out;
            animation-delay: ${Math.random() * 2}s;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: 0.6;
        `;
        videoWrapper.appendChild(particle);
    }
}

// CSS para animación de partículas (se inyecta dinámicamente)
const particleStyles = `
    @keyframes float-particle {
        0%, 100% { 
            transform: translateY(0px) scale(1); 
            opacity: 0.6; 
        }
        50% { 
            transform: translateY(-20px) scale(1.2); 
            opacity: 1; 
        }
    }
`;

// Inyectar estilos de partículas
const styleSheet = document.createElement('style');
styleSheet.textContent = particleStyles;
document.head.appendChild(styleSheet);

// Inicializar efectos cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    // Crear partículas después de un pequeño delay
    setTimeout(createVideoParticles, 1000);
    
    // Agregar efecto de brillo al wrapper del video
    const videoWrapper = document.querySelector('.video-wrapper');
    if (videoWrapper) {
        videoWrapper.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 25px 70px rgba(255,193,7,0.4)';
        });
        
        videoWrapper.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 20px 60px rgba(0,0,0,0.3)';
        });
    }
});

// Función para copiar enlace del video
function copyVideoLink() {
    const videoUrl = 'https://youtu.be/T9XmtrcUgys?list=RDT9XmtrcUgys';
    navigator.clipboard.writeText(videoUrl).then(() => {
        alert('🔗 Enlace copiado al portapapeles!');
    }).catch(() => {
        prompt('Copia este enlace:', videoUrl);
    });
}

// Función para compartir video
function shareVideo() {
    const videoUrl = 'https://youtu.be/T9XmtrcUgys?list=RDT9XmtrcUgys';
    const title = '🍯 Video Demostrativo Melimel - Proceso Artesanal';
    
    if (navigator.share) {
        navigator.share({
            title: title,
            text: 'Descubre el proceso artesanal de Melimel',
            url: videoUrl
        });
    } else {
        const shareText = `${title}\n${videoUrl}`;
        navigator.clipboard.writeText(shareText).then(() => {
            alert('📤 Información del video copiada para compartir!');
        });
    }
}

// Función para cargar video de Google Drive
function loadDriveVideo() {
    const driveId = prompt('Ingresa el ID de tu video de Google Drive:\n\nEjemplo: si tu enlace es\nhttps://drive.google.com/file/d/1ABC123XYZ/view\n\nEl ID es: 1ABC123XYZ');
    
    if (driveId) {
        const driveUrl = `https://drive.google.com/file/d/${driveId}/preview`;
        const placeholder = document.querySelector('.drive-video-placeholder');
        const iframe = document.getElementById('driveVideo');
        
        iframe.src = driveUrl;
        placeholder.style.display = 'none';
        iframe.style.display = 'block';
        
        console.log('Video de Drive cargado:', driveUrl);
    }
}

// Función pública para configurar video de Drive directamente
window.configurarDrive = function(driveId) {
    const driveUrl = `https://drive.google.com/file/d/${driveId}/preview`;
    const placeholder = document.querySelector('.drive-video-placeholder');
    const iframe = document.getElementById('driveVideo');
    
    iframe.src = driveUrl;
    placeholder.style.display = 'none';
    iframe.style.display = 'block';
    
    console.log('Video de Drive configurado:', driveUrl);
};

// Funciones para controles del video de Google Drive
function reloadVideo() {
    const iframe = document.getElementById('videoPlayer');
    const currentSrc = iframe.src;
    iframe.src = '';
    setTimeout(() => {
        iframe.src = currentSrc;
    }, 100);
}

function toggleFullscreen() {
    const iframe = document.getElementById('videoPlayer');
    if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
    } else if (iframe.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) {
        iframe.msRequestFullscreen();
    }
}

function openInDrive() {
    const driveUrl = 'https://drive.google.com/file/d/1Mfi1G3QzUXmcFDuDSCX8fMDMN7keklMp/view';
    window.open(driveUrl, '_blank');
}

function copyVideoLink() {
    const videoUrl = 'https://drive.google.com/file/d/1Mfi1G3QzUXmcFDuDSCX8fMDMN7keklMp/view';
    navigator.clipboard.writeText(videoUrl).then(() => {
        alert('🔗 Enlace del video copiado!');
    }).catch(() => {
        prompt('Copia este enlace:', videoUrl);
    });
}

// Función para copiar enlace de YouTube
function copyYouTubeLink() {
    const youtubeUrl = 'https://youtu.be/NM88M18peYY?list=RDNM88M18peYY';
    navigator.clipboard.writeText(youtubeUrl).then(() => {
        alert('🔗 Enlace de YouTube copiado!');
    }).catch(() => {
        prompt('Copia este enlace:', youtubeUrl);
    });
}

// Función pública para que puedas configurar el video desde la consola
window.configurarVideo = function(url) {
    setVideoUrl(url);
    loadVideo();
};

// Mostrar instrucciones en la consola
console.log(`
🍯 MELIMEL - Página de Video Configurada
========================================
Para cargar tu video de YouTube, usa:
configurarVideo('TU_URL_DE_YOUTUBE_AQUÍ')

Ejemplo:
configurarVideo('https://www.youtube.com/watch?v=ABC123')
`);

// Función para pantalla completa
function toggleFullscreen() {
    const videoFrame = document.getElementById('videoFrame');
    const iframe = videoFrame.querySelector('iframe');
    
    if (iframe) {
        if (iframe.requestFullscreen) {
            iframe.requestFullscreen();
        } else if (iframe.webkitRequestFullscreen) {
            iframe.webkitRequestFullscreen();
        } else if (iframe.msRequestFullscreen) {
            iframe.msRequestFullscreen();
        }
    }
}

// Agregar botón de pantalla completa (opcional)
function addFullscreenButton() {
    const videoWrapper = document.querySelector('.video-wrapper');
    if (videoWrapper && !videoWrapper.querySelector('.fullscreen-btn')) {
        const fullscreenBtn = document.createElement('button');
        fullscreenBtn.className = 'btn btn-outline-warning fullscreen-btn';
        fullscreenBtn.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            z-index: 10;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        fullscreenBtn.innerHTML = '<i class="bi bi-fullscreen"></i>';
        fullscreenBtn.onclick = toggleFullscreen;
        fullscreenBtn.title = 'Pantalla completa';
        
        videoWrapper.appendChild(fullscreenBtn);
    }
}
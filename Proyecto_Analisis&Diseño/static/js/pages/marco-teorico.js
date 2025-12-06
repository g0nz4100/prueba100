function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        if (section.classList.contains('show')) {
            section.classList.remove('show');
        } else {
            section.classList.add('show');
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(function(item) {
        item.addEventListener('click', function() {
            const targetId = this.dataset.target;
            
            timelineItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            const sectionMap = {
                'introduccion': 'content-introduccion',
                'antecedentes': 'content-antecedentes',
                'planteamiento': 'content-planteamiento',
                'arbol-problemas': 'content-arbol-problemas',
                'formulacion': 'content-formulacion',
                'objetivos': 'content-objetivos',
                'metodologia': 'content-metodologia',
                'planificacion': 'content-planificacion'
            };
            
            const sectionId = sectionMap[targetId];
            if (sectionId) {
                toggleSection(sectionId);
            }
        });
    });
    
    if (timelineItems.length > 0) {
        timelineItems[0].classList.add('active');
    }
});
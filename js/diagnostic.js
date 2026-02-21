/**
 * Diagnostic Tool
 * Herramienta interactiva para evaluar madurez de modernización
 */

/**
 * NOTA SOBRE BENCHMARKS:
 * 
 * Los benchmarks utilizados en esta herramienta son estimaciones basadas en:
 * - Modelos de madurez de capacidad (CMM/CMMI)
 * - Estudios de transformación digital de Gartner, McKinsey y Forrester
 * - Datos de adopción tecnológica por industria
 * - Experiencia de deeb Advisory en proyectos de modernización
 * 
 * Estos datos son INDICATIVOS y no representan un estudio estadístico formal.
 * Se utilizan como referencia comparativa para contextualizar tu posición.
 * 
 * Para un análisis más preciso de tu industria específica, recomendamos:
 * - Consultar reportes de Gartner Magic Quadrant
 * - Revisar estudios de McKinsey sobre transformación digital
 * - Agendar una consulta con deeb Advisory para un análisis personalizado
 */

// Benchmarks por industria y tamaño (Estimaciones indicativas)
const benchmarks = {
    retail: {
        small: { strategy: 2.5, architecture: 2.3, operations: 2.4, data: 2.2, culture: 2.3 },
        medium: { strategy: 3.2, architecture: 3.1, operations: 3.2, data: 3.0, culture: 3.1 },
        large: { strategy: 3.8, architecture: 3.7, operations: 3.8, data: 3.6, culture: 3.7 }
    },
    fintech: {
        small: { strategy: 3.5, architecture: 3.4, operations: 3.6, data: 3.7, culture: 3.5 },
        medium: { strategy: 4.0, architecture: 4.1, operations: 4.0, data: 4.2, culture: 4.0 },
        large: { strategy: 4.4, architecture: 4.5, operations: 4.4, data: 4.6, culture: 4.3 }
    },
    manufacturing: {
        small: { strategy: 2.2, architecture: 2.1, operations: 2.3, data: 2.0, culture: 2.2 },
        medium: { strategy: 2.9, architecture: 2.8, operations: 3.0, data: 2.7, culture: 2.9 },
        large: { strategy: 3.5, architecture: 3.4, operations: 3.6, data: 3.3, culture: 3.5 }
    },
    healthcare: {
        small: { strategy: 2.8, architecture: 2.7, operations: 2.9, data: 2.6, culture: 2.8 },
        medium: { strategy: 3.4, architecture: 3.3, operations: 3.5, data: 3.2, culture: 3.4 },
        large: { strategy: 4.0, architecture: 3.9, operations: 4.1, data: 3.8, culture: 4.0 }
    },
    technology: {
        small: { strategy: 3.8, architecture: 3.9, operations: 3.8, data: 3.9, culture: 3.8 },
        medium: { strategy: 4.2, architecture: 4.3, operations: 4.2, data: 4.3, culture: 4.2 },
        large: { strategy: 4.6, architecture: 4.7, operations: 4.6, data: 4.7, culture: 4.6 }
    },
    energy: {
        small: { strategy: 2.4, architecture: 2.3, operations: 2.5, data: 2.2, culture: 2.4 },
        medium: { strategy: 3.1, architecture: 3.0, operations: 3.2, data: 2.9, culture: 3.1 },
        large: { strategy: 3.7, architecture: 3.6, operations: 3.8, data: 3.5, culture: 3.7 }
    }
};

const industryLabels = {
    retail: 'Retail',
    fintech: 'Fintech',
    manufacturing: 'Manufactura',
    healthcare: 'Salud',
    technology: 'Tecnología',
    energy: 'Energía'
};

const sizeLabels = {
    small: 'Pequeña (< 100 empleados)',
    medium: 'Mediana (100-1000 empleados)',
    large: 'Grande (> 1000 empleados)'
};

const dimensions = {
    strategy: {
        name: 'Estrategia & Gobernanza',
        questions: [
            'Tenemos una estrategia tecnológica documentada y alineada con objetivos de negocio',
            'Las decisiones de inversión en tecnología se toman basadas en criterios claros',
            'Existe gobernanza definida para decisiones tecnológicas',
            'La tecnología es considerada una palanca estratégica en la empresa'
        ]
    },
    architecture: {
        name: 'Arquitectura & Stack',
        questions: [
            'Tenemos una arquitectura clara y documentada',
            'Nuestros sistemas están integrados y se comunican sin problemas',
            'La deuda técnica está controlada y documentada',
            'Podemos escalar sin rediseñar completamente'
        ]
    },
    operations: {
        name: 'Operaciones & Delivery',
        questions: [
            'Nuestras entregas son predecibles y confiables',
            'Tenemos automatización en procesos críticos',
            'Los incidentes operativos son infrecuentes',
            'Podemos hacer cambios sin afectar la operación'
        ]
    },
    data: {
        name: 'Datos & Analítica',
        questions: [
            'Nuestros datos están centralizados y accesibles',
            'Tomamos decisiones basadas en datos, no en intuición',
            'Tenemos visibilidad de métricas clave en tiempo real',
            'Podemos hacer análisis predictivos'
        ]
    },
    culture: {
        name: 'Cultura & Organización',
        questions: [
            'Existe colaboración fluida entre áreas',
            'Los roles y responsabilidades están claros',
            'Hay mentalidad de mejora continua',
            'El equipo está empoderado para tomar decisiones'
        ]
    }
};

let responses = {};

function initDiagnostic() {
    const container = document.getElementById('diagnostic-container');
    let html = '';

    Object.keys(dimensions).forEach((key, index) => {
        const dimension = dimensions[key];
        html += `
            <div class="diagnostic-section" data-dimension="${key}">
                <div class="diagnostic-header">
                    <h3>${index + 1}. ${dimension.name}</h3>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 0%"></div>
                    </div>
                </div>
                
                <div class="questions-container">
        `;

        dimension.questions.forEach((question, qIndex) => {
            const questionId = `${key}-q${qIndex}`;
            html += `
                    <div class="question-item">
                        <label for="${questionId}" class="question-label">
                            <span class="question-text">${question}</span>
                        </label>
                        <div class="rating-scale">
                            <input type="radio" name="${questionId}" value="1" id="${questionId}-1" class="rating-input">
                            <label for="${questionId}-1" class="rating-label" title="Totalmente en desacuerdo">1</label>
                            
                            <input type="radio" name="${questionId}" value="2" id="${questionId}-2" class="rating-input">
                            <label for="${questionId}-2" class="rating-label" title="En desacuerdo">2</label>
                            
                            <input type="radio" name="${questionId}" value="3" id="${questionId}-3" class="rating-input">
                            <label for="${questionId}-3" class="rating-label" title="Neutral">3</label>
                            
                            <input type="radio" name="${questionId}" value="4" id="${questionId}-4" class="rating-input">
                            <label for="${questionId}-4" class="rating-label" title="De acuerdo">4</label>
                            
                            <input type="radio" name="${questionId}" value="5" id="${questionId}-5" class="rating-input">
                            <label for="${questionId}-5" class="rating-label" title="Totalmente de acuerdo">5</label>
                        </div>
                    </div>
            `;
        });

        html += `
                </div>
            </div>
        `;
    });

    container.innerHTML = html;

    // Add event listeners
    document.querySelectorAll('.rating-input').forEach(input => {
        input.addEventListener('change', updateProgress);
    });
}

function updateProgress() {
    Object.keys(dimensions).forEach(key => {
        const section = document.querySelector(`[data-dimension="${key}"]`);
        const questions = dimensions[key].questions.length;
        let answered = 0;

        dimensions[key].questions.forEach((_, qIndex) => {
            const questionId = `${key}-q${qIndex}`;
            const checked = document.querySelector(`input[name="${questionId}"]:checked`);
            if (checked) answered++;
        });

        const progress = (answered / questions) * 100;
        section.querySelector('.progress-fill').style.width = progress + '%';
    });

    // Check if all answered
    const allAnswered = Object.keys(dimensions).every(key => {
        return dimensions[key].questions.every((_, qIndex) => {
            const questionId = `${key}-q${qIndex}`;
            return document.querySelector(`input[name="${questionId}"]:checked`);
        });
    });

    const submitBtn = document.getElementById('submit-diagnostic');
    if (submitBtn) {
        submitBtn.disabled = !allAnswered;
        submitBtn.style.opacity = allAnswered ? '1' : '0.5';
    }
}

function calculateResults() {
    const results = {};
    let totalScore = 0;

    Object.keys(dimensions).forEach(key => {
        let dimensionScore = 0;
        let count = 0;

        dimensions[key].questions.forEach((_, qIndex) => {
            const questionId = `${key}-q${qIndex}`;
            const value = document.querySelector(`input[name="${questionId}"]:checked`);
            if (value) {
                dimensionScore += parseInt(value.value);
                count++;
            }
        });

        const average = count > 0 ? dimensionScore / count : 0;
        results[key] = {
            name: dimensions[key].name,
            score: average,
            level: getLevel(average)
        };

        totalScore += average;
    });

    results.overall = {
        score: totalScore / Object.keys(dimensions).length,
        level: getLevel(totalScore / Object.keys(dimensions).length)
    };

    return results;
}

function getLevel(score) {
    if (score < 1.5) return 1;
    if (score < 2.5) return 2;
    if (score < 3.5) return 3;
    if (score < 4.5) return 4;
    return 5;
}

function getLevelColor(level) {
    const colors = {
        1: '#EF4444',
        2: '#F97316',
        3: '#FBBF24',
        4: '#60A5FA',
        5: '#10B981'
    };
    return colors[level] || '#64748B';
}

function getLevelName(level) {
    const names = {
        1: 'Inicial',
        2: 'Repetible',
        3: 'Definido',
        4: 'Gestionado',
        5: 'Optimizado'
    };
    return names[level] || 'Desconocido';
}

function showResults(results) {
    const container = document.getElementById('diagnostic-container');
    
    let html = `
        <div class="results-container">
            <div class="results-header">
                <h2>Resultados de tu Diagnóstico</h2>
                <p>Aquí está tu evaluación de madurez de modernización tecnológica</p>
            </div>

            <div class="overall-score">
                <div class="score-circle" style="background: linear-gradient(135deg, ${getLevelColor(results.overall.level)} 0%, ${getLevelColor(results.overall.level)} 100%);">
                    <div class="score-value">${results.overall.score.toFixed(1)}</div>
                    <div class="score-label">${getLevelName(results.overall.level)}</div>
                </div>
                <div class="score-description">
                    <h3>Nivel General: ${getLevelName(results.overall.level)}</h3>
                    <p>Tu empresa está en el nivel ${results.overall.level} de madurez de modernización tecnológica.</p>
                </div>
            </div>

            <!-- Comparación con Industria -->
            <div class="comparison-section">
                <h3>Compara tu resultado con tu industria</h3>
                <div class="comparison-controls">
                    <div class="control-group">
                        <label for="industry-select">Industria:</label>
                        <select id="industry-select" onchange="updateComparison()">
                            <option value="retail">Retail</option>
                            <option value="fintech">Fintech</option>
                            <option value="manufacturing">Manufactura</option>
                            <option value="healthcare">Salud</option>
                            <option value="technology">Tecnología</option>
                            <option value="energy">Energía</option>
                        </select>
                    </div>
                    <div class="control-group">
                        <label for="size-select">Tamaño de empresa:</label>
                        <select id="size-select" onchange="updateComparison()">
                            <option value="small">Pequeña (< 100 empleados)</option>
                            <option value="medium">Mediana (100-1000 empleados)</option>
                            <option value="large">Grande (> 1000 empleados)</option>
                        </select>
                    </div>
                </div>
                <div class="radar-container">
                    <canvas id="radarChart"></canvas>
                </div>
                <div id="gap-analysis" class="gap-analysis"></div>
            </div>

            <div class="dimensions-results">
                <h3>Resultados por Dimensión</h3>
                <div class="dimensions-grid">
    `;

    Object.keys(dimensions).forEach(key => {
        const result = results[key];
        const color = getLevelColor(result.level);
        
        html += `
                    <div class="dimension-result">
                        <div class="dimension-header" style="border-left: 4px solid ${color};">
                            <h4>${result.name}</h4>
                            <div class="dimension-score">
                                <span class="score-number">${result.score.toFixed(1)}</span>
                                <span class="score-level" style="color: ${color};">${getLevelName(result.level)}</span>
                            </div>
                        </div>
                        <div class="dimension-bar">
                            <div class="bar-fill" style="width: ${(result.score / 5) * 100}%; background: ${color};"></div>
                        </div>
                    </div>
        `;
    });

    html += `
                </div>
            </div>

            <div class="results-actions">
                <button class="btn-primary" style="background: var(--primary-blue);" onclick="downloadResults()">Descargar Reporte</button>
                <button class="btn-secondary" onclick="location.href='maturity-model.html'">Ver Modelo Completo</button>
                <button class="btn-secondary" onclick="location.href='index.html#contacto'">Contactar</button>
            </div>

            <button class="btn-secondary" style="width: 100%; margin-top: 2rem;" onclick="resetDiagnostic()">Hacer Diagnóstico Nuevamente</button>
        </div>
    `;

    container.innerHTML = html;
    
    // Guardar resultados globales para comparación
    window.currentResults = results;
    
    // Cargar Chart.js si no está cargado
    if (!window.Chart) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.onload = () => {
            setTimeout(() => updateComparison(), 100);
        };
        document.head.appendChild(script);
    } else {
        updateComparison();
    }
}

function downloadResults() {
    const results = calculateResults();
    const text = `DIAGNÓSTICO DE MADUREZ DE MODERNIZACIÓN TECNOLÓGICA\n\n`;
    const timestamp = new Date().toLocaleDateString('es-ES');
    
    let content = `${text}Fecha: ${timestamp}\n\n`;
    content += `NIVEL GENERAL: ${results.overall.level} - ${getLevelName(results.overall.level)}\n`;
    content += `Puntuación: ${results.overall.score.toFixed(2)}/5\n\n`;
    content += `RESULTADOS POR DIMENSIÓN:\n`;
    content += `${'='.repeat(50)}\n\n`;

    Object.keys(dimensions).forEach(key => {
        const result = results[key];
        content += `${result.name}\n`;
        content += `Nivel: ${getLevelName(result.level)}\n`;
        content += `Puntuación: ${result.score.toFixed(2)}/5\n\n`;
    });

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', `diagnostico-madurez-${timestamp}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function resetDiagnostic() {
    document.querySelectorAll('.rating-input').forEach(input => {
        input.checked = false;
    });
    document.getElementById('diagnostic-container').innerHTML = '';
    initDiagnostic();
}

// Función para actualizar comparación
function updateComparison() {
    if (!window.currentResults) return;
    
    const industry = document.getElementById('industry-select').value;
    const size = document.getElementById('size-select').value;
    const benchmark = benchmarks[industry][size];
    
    // Preparar datos para el gráfico
    const labels = ['Estrategia', 'Arquitectura', 'Operaciones', 'Datos', 'Cultura'];
    const currentData = [
        window.currentResults.strategy.score,
        window.currentResults.architecture.score,
        window.currentResults.operations.score,
        window.currentResults.data.score,
        window.currentResults.culture.score
    ];
    const benchmarkData = [
        benchmark.strategy,
        benchmark.architecture,
        benchmark.operations,
        benchmark.data,
        benchmark.culture
    ];
    
    // Calcular gaps
    const gaps = currentData.map((val, idx) => benchmarkData[idx] - val);
    const avgGap = (gaps.reduce((a, b) => a + b, 0) / gaps.length).toFixed(2);
    
    // Generar recomendaciones basadas en niveles
    const recommendations = generateRecommendations(window.currentResults, gaps);
    
    // Mostrar análisis de gaps
    let gapHtml = `
        <div class="gap-summary">
            <h4>Análisis de Brecha y Oportunidades</h4>
            <p>Comparado con empresas de tu industria y tamaño:</p>
            <div class="gap-metrics">
    `;
    
    const dimensionKeys = ['strategy', 'architecture', 'operations', 'data', 'culture'];
    dimensionKeys.forEach((key, idx) => {
        const gap = gaps[idx];
        const status = gap > 0 ? 'atrás' : 'adelante';
        const icon = gap > 0 ? '↑' : '↓';
        gapHtml += `
            <div class="gap-item">
                <span class="gap-label">${labels[idx]}</span>
                <span class="gap-value ${status}">${icon} ${Math.abs(gap).toFixed(1)}</span>
            </div>
        `;
    });
    
    gapHtml += `
            </div>
            
            <div class="gap-overall">
                <p><strong>Brecha promedio:</strong> ${avgGap} puntos</p>
            </div>

            <div class="recommendations-section">
                <h4>Lo que puedes hacer ahora</h4>
                <div class="recommendations-list">
                    ${recommendations.canDo.map(rec => `
                        <div class="recommendation can-do">
                            <span class="rec-icon">✓</span>
                            <div class="rec-content">
                                <strong>${rec.title}</strong>
                                <p>${rec.description}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <h4 style="margin-top: 2rem;">Limitaciones actuales</h4>
                <div class="recommendations-list">
                    ${recommendations.cannotDo.map(rec => `
                        <div class="recommendation cannot-do">
                            <span class="rec-icon">✗</span>
                            <div class="rec-content">
                                <strong>${rec.title}</strong>
                                <p>${rec.description}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <h4 style="margin-top: 2rem;">Prioridades de mejora</h4>
                <div class="recommendations-list">
                    ${recommendations.priorities.map((rec, idx) => `
                        <div class="recommendation priority">
                            <span class="rec-number">${idx + 1}</span>
                            <div class="rec-content">
                                <strong>${rec.title}</strong>
                                <p>${rec.description}</p>
                                <span class="rec-impact">Impacto: ${rec.impact}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('gap-analysis').innerHTML = gapHtml;
    
    // Crear gráfico radar
    const ctx = document.getElementById('radarChart');
    if (ctx) {
        if (window.radarChartInstance) {
            window.radarChartInstance.destroy();
        }
        
        window.radarChartInstance = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Tu Empresa',
                        data: currentData,
                        borderColor: '#10B981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        borderWidth: 2,
                        pointBackgroundColor: '#10B981',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 5,
                        pointHoverRadius: 7
                    },
                    {
                        label: `Benchmark (${industryLabels[industry]} - ${sizeLabels[size]})`,
                        data: benchmarkData,
                        borderColor: '#3B82F6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        borderWidth: 2,
                        pointBackgroundColor: '#3B82F6',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 5,
                        pointHoverRadius: 7
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            font: { size: 12 },
                            padding: 15,
                            usePointStyle: true
                        }
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 5,
                        ticks: {
                            stepSize: 1,
                            font: { size: 11 }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    }
                }
            }
        });
    }
}

// Función para generar recomendaciones basadas en niveles
function generateRecommendations(results, gaps) {
    const canDo = [];
    const cannotDo = [];
    const priorities = [];
    
    // Análisis por nivel general
    const overallLevel = results.overall.level;
    
    // Lo que SÍ puede hacer según su nivel
    if (overallLevel >= 1) {
        canDo.push({
            title: 'Mantener operaciones estables',
            description: 'Tu empresa puede mantener la operación en funcionamiento y resolver problemas operativos básicos.'
        });
    }
    
    if (overallLevel >= 2) {
        canDo.push({
            title: 'Documentar procesos',
            description: 'Puedes documentar y estandarizar procesos básicos para reducir dependencia de personas clave.'
        });
        canDo.push({
            title: 'Medir indicadores básicos',
            description: 'Tienes capacidad de recopilar y analizar métricas operativas simples.'
        });
    }
    
    if (overallLevel >= 3) {
        canDo.push({
            title: 'Planificar cambios tecnológicos',
            description: 'Puedes planificar e implementar cambios sin romper la operación actual.'
        });
        canDo.push({
            title: 'Alinear TI con negocio',
            description: 'Tienes estructura para alinear decisiones tecnológicas con objetivos de negocio.'
        });
        canDo.push({
            title: 'Automatizar procesos clave',
            description: 'Puedes automatizar procesos repetitivos y críticos para mejorar eficiencia.'
        });
    }
    
    if (overallLevel >= 4) {
        canDo.push({
            title: 'Tomar decisiones basadas en datos',
            description: 'Tienes capacidad de análisis avanzado para decisiones estratégicas.'
        });
        canDo.push({
            title: 'Innovar continuamente',
            description: 'Puedes experimentar con nuevas tecnologías sin afectar operaciones críticas.'
        });
        canDo.push({
            title: 'Escalar rápidamente',
            description: 'Tu arquitectura permite crecer sin rediseños mayores.'
        });
    }
    
    if (overallLevel >= 5) {
        canDo.push({
            title: 'Liderar con tecnología',
            description: 'Eres referente en tu industria en modernización y innovación tecnológica.'
        });
    }
    
    // Lo que NO puede hacer según su nivel
    if (overallLevel < 2) {
        cannotDo.push({
            title: 'Escalar sin riesgo',
            description: 'Aún no tienes procesos documentados para crecer sin aumentar significativamente el riesgo operativo.'
        });
        cannotDo.push({
            title: 'Tomar decisiones basadas en datos',
            description: 'Tu capacidad de análisis es limitada. Las decisiones aún dependen mucho de intuición.'
        });
    }
    
    if (overallLevel < 3) {
        cannotDo.push({
            title: 'Cambios tecnológicos sin disrupciones',
            description: 'Los cambios tecnológicos aún generan disrupciones operativas significativas.'
        });
        cannotDo.push({
            title: 'Automatización integral',
            description: 'Tu arquitectura no permite automatización end-to-end de procesos complejos.'
        });
    }
    
    if (overallLevel < 4) {
        cannotDo.push({
            title: 'Innovación sin riesgo',
            description: 'Experimentar con nuevas tecnologías aún implica riesgo operativo significativo.'
        });
        cannotDo.push({
            title: 'Análisis predictivo',
            description: 'Tu capacidad de datos no permite análisis predictivos o machine learning.'
        });
    }
    
    if (overallLevel < 5) {
        cannotDo.push({
            title: 'Ser líder de mercado en tecnología',
            description: 'Aún no tienes la madurez para ser referente tecnológico en tu industria.'
        });
    }
    
    // Prioridades basadas en gaps
    const dimensionKeys = ['strategy', 'architecture', 'operations', 'data', 'culture'];
    const dimensionNames = ['Estrategia', 'Arquitectura', 'Operaciones', 'Datos', 'Cultura'];
    
    gaps.forEach((gap, idx) => {
        if (gap > 0.5) {
            const dimensionKey = dimensionKeys[idx];
            const dimensionName = dimensionNames[idx];
            
            let priority = {
                title: `Mejorar ${dimensionName}`,
                impact: 'Alto'
            };
            
            if (dimensionKey === 'strategy') {
                priority.description = 'Alinea decisiones tecnológicas con objetivos de negocio. Define gobernanza clara para inversiones TI.';
            } else if (dimensionKey === 'architecture') {
                priority.description = 'Moderniza tu arquitectura para reducir deuda técnica. Esto habilitará cambios más rápidos.';
            } else if (dimensionKey === 'operations') {
                priority.description = 'Automatiza procesos operativos. Esto mejorará confiabilidad y velocidad de entregas.';
            } else if (dimensionKey === 'data') {
                priority.description = 'Centraliza datos y crea capacidad de análisis. Esto mejorará calidad de decisiones.';
            } else if (dimensionKey === 'culture') {
                priority.description = 'Fomenta colaboración y mentalidad de mejora. Esto acelera adopción de cambios.';
            }
            
            priorities.push(priority);
        }
    });
    
    // Si no hay gaps grandes, sugerir consolidación
    if (priorities.length === 0) {
        priorities.push({
            title: 'Consolidar y optimizar',
            description: 'Estás alineado con tu industria. Enfócate en optimizar lo que ya funciona bien.',
            impact: 'Medio'
        });
    }
    
    return { canDo, cannotDo, priorities };
}

// Initialize on load
document.addEventListener('DOMContentLoaded', initDiagnostic);

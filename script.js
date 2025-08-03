// Neural Food Network - Juego Educativo
console.log('=== SCRIPT CARGADO ===');

// Variables globales
let currentEpoch = 0;
let activeNeurons = [];
let targetFood = null;
let gameActive = false;
let dataset = [];
let characteristics = {};

// Función para cargar el dataset desde CSV
function loadDataset() {
    console.log('=== CARGANDO DATASET ===');
    
    Papa.parse('dataset_alimentos_120clases_25rasgos.csv', {
        download: true,
        header: true,
        complete: function(results) {
            console.log('CSV cargado:', results.data.length, 'filas');
            dataset = results.data.filter(row => row.Clase && row.Clase.trim() !== '');
            console.log('Dataset filtrado:', dataset.length, 'alimentos');
            
            // Extraer características únicas
            const headers = Object.keys(dataset[0]).filter(key => key !== 'Clase');
            headers.forEach(header => {
                const values = [...new Set(dataset.map(row => row[header]))].filter(val => val && val.trim() !== '');
                characteristics[header] = values;
            });
            
            console.log('Características extraídas:', Object.keys(characteristics).length);
            console.log('Dataset cargado correctamente');
            
            // Inicializar el juego después de cargar los datos
            initializeGame();
        },
        error: function(error) {
            console.error('Error cargando CSV:', error);
            // Fallback a dataset simplificado
            loadFallbackDataset();
        }
    });
}

// Dataset de fallback en caso de error
function loadFallbackDataset() {
    console.log('Usando dataset de fallback');
    dataset = [
        {Clase: 'Mango', 'Color dominante': 'Naranja', Forma: 'Ovalado', 'Piel/cáscara': 'Gruesa', 'Semillas/hueso': 'Muchas pequeñas', Jugosidad: 'Media', 'Sabor dominante': 'Dulce', Dulzor: 'Alto', Acidez: 'Alta', Textura: 'Harinoso', Aroma: 'Alto', 'Preparación típica': 'Crudo', 'Consumo habitual': 'En mezcla', 'Plato frecuente': 'Ensalada', 'Temperatura de consumo': 'Frío', 'Parte comestible': 'Pulpa', Conservación: 'Ambiente', 'Vida útil': 'Corta', Estacionalidad: 'Estacional', 'Sensibilidad al golpe': 'Alta', 'Facilidad de limpieza/pelado': 'Alta', 'Contenido de agua': 'Alto', Fibra: 'Alta', Grasas: 'Bajas', Procesamiento: 'Mínimo', 'Piel comestible': 'No'},
        {Clase: 'Papaya', 'Color dominante': 'Morado', Forma: 'Ovalado', 'Piel/cáscara': 'Gruesa', 'Semillas/hueso': 'Sin', Jugosidad: 'Media', 'Sabor dominante': 'Dulce', Dulzor: 'Alto', Acidez: 'Media', Textura: 'Fibroso', Aroma: 'Alto', 'Preparación típica': 'Crudo', 'Consumo habitual': 'Solo', 'Plato frecuente': 'Snack', 'Temperatura de consumo': 'Ambiente', 'Parte comestible': 'Pulpa', Conservación: 'Refrigerar', 'Vida útil': 'Corta', Estacionalidad: 'Estacional', 'Sensibilidad al golpe': 'Media', 'Facilidad de limpieza/pelado': 'Media', 'Contenido de agua': 'Alto', Fibra: 'Alta', Grasas: 'Bajas', Procesamiento: 'Mínimo', 'Piel comestible': 'No'},
        {Clase: 'Piña', 'Color dominante': 'Amarillo', Forma: 'Alargado', 'Piel/cáscara': 'Gruesa', 'Semillas/hueso': 'Hueso', Jugosidad: 'Media', 'Sabor dominante': 'Ácido', Dulzor: 'Alto', Acidez: 'Alta', Textura: 'Harinoso', Aroma: 'Alto', 'Preparación típica': 'Crudo', 'Consumo habitual': 'Solo', 'Plato frecuente': 'Ensalada', 'Temperatura de consumo': 'Frío', 'Parte comestible': 'Pulpa', Conservación: 'Refrigerar', 'Vida útil': 'Corta', Estacionalidad: 'Todo el año', 'Sensibilidad al golpe': 'Media', 'Facilidad de limpieza/pelado': 'Alta', 'Contenido de agua': 'Alto', Fibra: 'Media', Grasas: 'Bajas', Procesamiento: 'Mínimo', 'Piel comestible': 'No'}
    ];
    
    characteristics = {
        'Color dominante': ['Naranja', 'Morado', 'Amarillo', 'Verde', 'Rojo', 'Blanco', 'Café'],
        'Forma': ['Ovalado', 'Alargado', 'Redondo', 'Irregular', 'Plano'],
        'Piel/cáscara': ['Gruesa', 'Fina', 'Sin piel'],
        'Semillas/hueso': ['Muchas pequeñas', 'Sin', 'Pequeñas', 'Hueso', 'Semilla'],
        'Jugosidad': ['Media', 'Alta', 'Baja'],
        'Sabor dominante': ['Dulce', 'Ácido', 'Umami', 'Salado'],
        'Dulzor': ['Alto', 'Medio', 'Bajo'],
        'Acidez': ['Alta', 'Media', 'Baja'],
        'Textura': ['Harinoso', 'Fibroso', 'Jugoso', 'Cremoso', 'Crujiente'],
        'Aroma': ['Alto', 'Medio', 'Bajo'],
        'Preparación típica': ['Crudo', 'Cocido', 'Ambos'],
        'Consumo habitual': ['Solo', 'En mezcla', 'Acompañante'],
        'Plato frecuente': ['Ensalada', 'Snack', 'Jugo', 'Postre', 'Sopa', 'Principal'],
        'Temperatura de consumo': ['Frío', 'Ambiente', 'Caliente'],
        'Parte comestible': ['Pulpa', 'Tallo', 'Hoja', 'Grano', 'Raíz', 'Semilla', 'Líquido'],
        'Conservación': ['Ambiente', 'Refrigerar'],
        'Vida útil': ['Corta', 'Media', 'Larga'],
        'Estacionalidad': ['Estacional', 'Todo el año'],
        'Sensibilidad al golpe': ['Alta', 'Media', 'Baja'],
        'Facilidad de limpieza/pelado': ['Alta', 'Media'],
        'Contenido de agua': ['Alto', 'Medio', 'Bajo'],
        'Fibra': ['Alta', 'Media', 'Baja'],
        'Grasas': ['Altas', 'Medias', 'Bajas'],
        'Procesamiento': ['Mínimo', 'Medio', 'Alto'],
        'Piel comestible': ['Sí', 'No']
    };
    
    initializeGame();
}

// Función para inicializar el juego
function initializeGame() {
    console.log('=== INICIALIZANDO JUEGO ===');
    createNeuralNetwork();
    setupEventListeners();
    resetGame();
    console.log('=== JUEGO INICIALIZADO CORRECTAMENTE ===');
}

// Función para crear la red neuronal
function createNeuralNetwork() {
    console.log('=== CREANDO RED NEURONAL ===');
    const networkContainer = document.getElementById('neural-network');
    if (!networkContainer) {
        console.error('No se encontró el contenedor de la red neuronal');
        return;
    }
    
    networkContainer.innerHTML = '';

    for (let layer = 1; layer <= 4; layer++) {
        const layerDiv = document.createElement('div');
        layerDiv.className = 'neural-layer';
        
        const layerLabel = document.createElement('div');
        layerLabel.className = 'layer-label';
        layerLabel.textContent = `Capa ${layer}`;
        layerDiv.appendChild(layerLabel);

        for (let neuron = 1; neuron <= 4; neuron++) {
            const neuronDiv = document.createElement('div');
            neuronDiv.className = `neuron inactive layer-${layer}`;
            neuronDiv.id = `neuron-${layer}-${neuron}`;
            neuronDiv.textContent = `N${neuron}`;
            
            // Hacer las neuronas clickeables para activación manual
            neuronDiv.style.cursor = 'pointer';
            neuronDiv.addEventListener('click', () => activateNeuron(layer, neuron));
            
            const tooltip = document.createElement('div');
            tooltip.className = 'neuron-tooltip';
            tooltip.textContent = 'Clic para activar';
            neuronDiv.appendChild(tooltip);

            layerDiv.appendChild(neuronDiv);
        }
        
        networkContainer.appendChild(layerDiv);
    }
    
    // Verificar que las neuronas se crearon correctamente
    const neurons = document.querySelectorAll('.neuron');
    console.log('Neuronas creadas:', neurons.length);
    console.log('Neuronas inactivas:', document.querySelectorAll('.neuron.inactive').length);
    console.log('=== RED NEURONAL CREADA ===');
}

// Función para activar neurona manualmente
function activateNeuron(layer, neuron) {
    console.log('=== ACTIVANDO NEURONA MANUALMENTE ===');
    console.log('Capa:', layer, 'Neurona:', neuron);
    
    const neuronElement = document.getElementById(`neuron-${layer}-${neuron}`);
    if (!neuronElement || !neuronElement.classList.contains('inactive')) {
        console.log('Neurona no disponible para activar');
        return;
    }
    
    // Verificar que no se haya activado una neurona de esta capa en esta época
    const neuronsInThisLayer = activeNeurons.filter(n => n.layer === layer && n.epoch === currentEpoch);
    if (neuronsInThisLayer.length > 0) {
        console.log('Ya se activó una neurona en esta capa en esta época');
        return;
    }
    
    // Seleccionar característica aleatoria disponible
    const availableCharacteristics = Object.keys(characteristics);
    const usedCharacteristics = activeNeurons.map(n => n.characteristic);
    const remainingCharacteristics = availableCharacteristics.filter(c => !usedCharacteristics.includes(c));
    
    if (remainingCharacteristics.length === 0) {
        console.log('No hay características disponibles');
        return;
    }
    
    const characteristic = remainingCharacteristics[Math.floor(Math.random() * remainingCharacteristics.length)];
    const possibleValues = characteristics[characteristic];
    const value = possibleValues[Math.floor(Math.random() * possibleValues.length)];
    
    // Activar la neurona
    neuronElement.className = neuronElement.className.replace('inactive', 'active');
    const tooltip = neuronElement.querySelector('.neuron-tooltip');
    if (tooltip) tooltip.textContent = `${characteristic}: ${value}`;
    
    activeNeurons.push({ layer, neuron, characteristic, value, epoch: currentEpoch });
    console.log('Neurona activada:', { layer, neuron, characteristic, value, epoch: currentEpoch });
    console.log('Total de neuronas activas:', activeNeurons.length);
    
    updateActiveCharacteristics();
    updateCostFunction();
    updateFilteredFoods();
}

// Función para configurar event listeners
function setupEventListeners() {
    console.log('=== CONFIGURANDO EVENT LISTENERS ===');
    
    const nextEpochBtn = document.getElementById('next-epoch-btn');
    const resetBtn = document.getElementById('reset-btn');
    const predictBtn = document.getElementById('predict-btn');
    
    if (nextEpochBtn) {
        nextEpochBtn.addEventListener('click', nextEpoch);
        console.log('Event listener agregado para next-epoch-btn');
    } else {
        console.error('No se encontró next-epoch-btn');
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', resetGame);
        console.log('Event listener agregado para reset-btn');
    } else {
        console.error('No se encontró reset-btn');
    }
    
    if (predictBtn) {
        predictBtn.addEventListener('click', makePrediction);
        console.log('Event listener agregado para predict-btn');
    } else {
        console.error('No se encontró predict-btn');
    }
    
    const predictionInput = document.getElementById('prediction-input');
    if (predictionInput) {
        predictionInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                makePrediction();
            }
        });
        console.log('Event listener agregado para prediction-input');
    }
    
    console.log('=== EVENT LISTENERS CONFIGURADOS ===');
}

// Función para reiniciar el juego
function resetGame() {
    console.log('=== REINICIANDO JUEGO ===');
    currentEpoch = 0;
    activeNeurons = [];
    gameActive = true;
    targetFood = dataset[Math.floor(Math.random() * dataset.length)];
    
    const currentEpochElement = document.getElementById('current-epoch');
    const activeCharacteristicsElement = document.getElementById('active-characteristics');
    const predictionInputElement = document.getElementById('prediction-input');
    const predictionResultElement = document.getElementById('prediction-result');
    const filteredFoodsElement = document.getElementById('filtered-foods');
    
    if (currentEpochElement) currentEpochElement.textContent = '0';
    if (activeCharacteristicsElement) activeCharacteristicsElement.innerHTML = '<p class="text-muted">Haz clic en las neuronas para activarlas</p>';
    if (predictionInputElement) predictionInputElement.value = '';
    if (predictionResultElement) predictionResultElement.innerHTML = '';
    if (filteredFoodsElement) filteredFoodsElement.innerHTML = '<p class="text-muted">Los alimentos aparecerán aquí</p>';
    
    // Reiniciar todas las neuronas como inactivas
    const neurons = document.querySelectorAll('.neuron');
    console.log('Reiniciando neuronas:', neurons.length);
    
    if (neurons.length === 0) {
        console.error('¡NO SE ENCONTRARON NEURONAS!');
        return;
    }
    
    neurons.forEach((neuron, index) => {
        console.log(`Neurona ${index + 1} - Clases antes:`, neuron.className);
        
        // Remover todas las clases de estado y agregar inactive
        neuron.className = neuron.className.replace('active', '').replace('inactive', '');
        neuron.classList.add('inactive');
        
        console.log(`Neurona ${index + 1} - Clases después:`, neuron.className);
        
        const tooltip = neuron.querySelector('.neuron-tooltip');
        if (tooltip) tooltip.textContent = 'Clic para activar';
        
        console.log(`Neurona ${index + 1} reiniciada como inactiva`);
    });
    
    // Verificar que se reiniciaron correctamente
    const inactiveNeurons = document.querySelectorAll('.neuron.inactive');
    console.log('Neuronas inactivas después del reset:', inactiveNeurons.length);
    
    // Verificar todas las neuronas
    const allNeurons = document.querySelectorAll('.neuron');
    console.log('Total de neuronas después del reset:', allNeurons.length);
    allNeurons.forEach((neuron, index) => {
        console.log(`Neurona ${index + 1} final:`, neuron.className);
    });
    
    updateCostFunction();
    console.log('Alimento objetivo:', targetFood.Clase);
    console.log('=== JUEGO REINICIADO ===');
}

// Función para siguiente época
function nextEpoch() {
    console.log('=== SIGUIENTE ÉPOCA ===');
    if (!gameActive || currentEpoch >= 16) {
        console.log('Juego no activo o máximo de épocas alcanzado');
        return;
    }
    
    currentEpoch++;
    console.log('Época actual:', currentEpoch);
    
    const currentEpochElement = document.getElementById('current-epoch');
    if (currentEpochElement) currentEpochElement.textContent = currentEpoch.toString();
    
    // Verificar si se activó al menos una neurona por capa
    const neuronsThisEpoch = activeNeurons.filter(n => n.epoch === currentEpoch - 1);
    const layersActivated = [...new Set(neuronsThisEpoch.map(n => n.layer))];
    
    if (layersActivated.length < 4) {
        console.log('No se activaron neuronas en todas las capas');
        alert('Debes activar al menos una neurona en cada capa antes de continuar');
        currentEpoch--; // Revertir el incremento
        if (currentEpochElement) currentEpochElement.textContent = currentEpoch.toString();
        return;
    }
    
    console.log('=== ÉPOCA COMPLETADA ===');
}

// Función para actualizar características activas
function updateActiveCharacteristics() {
    console.log('=== ACTUALIZANDO CARACTERÍSTICAS ACTIVAS ===');
    console.log('Neuronas activas:', activeNeurons.length);
    
    const container = document.getElementById('active-characteristics');
    if (!container) {
        console.error('No se encontró el contenedor de características activas');
        return;
    }
    
    container.innerHTML = '';
    
    if (activeNeurons.length === 0) {
        container.innerHTML = '<p class="text-muted">Haz clic en las neuronas para activarlas</p>';
        console.log('No hay neuronas activas, mostrando mensaje por defecto');
        return;
    }
    
    console.log('Creando dropdowns para', activeNeurons.length, 'neuronas');
    
    activeNeurons.forEach((neuron, index) => {
        console.log('Creando dropdowns para neurona:', index, neuron);
        
        const div = document.createElement('div');
        div.className = 'characteristic-dropdown';
        div.style.border = '3px solid #ff0000';
        div.style.padding = '15px';
        div.style.margin = '15px 0';
        div.style.borderRadius = '10px';
        div.style.backgroundColor = '#fff3cd';
        div.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
        
        const label = document.createElement('div');
        label.className = 'characteristic-label';
        label.textContent = `Neurona ${neuron.neuron} - Capa ${neuron.layer} (Época ${neuron.epoch})`;
        label.style.fontWeight = 'bold';
        label.style.fontSize = '14px';
        label.style.marginBottom = '10px';
        label.style.color = '#007bff';
        
        // Dropdown para seleccionar característica
        const characteristicSelect = document.createElement('select');
        characteristicSelect.className = 'form-select form-select-sm mb-2';
        characteristicSelect.id = `char-select-${index}`;
        characteristicSelect.style.marginBottom = '10px';
        characteristicSelect.style.border = '2px solid #007bff';
        
        Object.keys(characteristics).forEach(char => {
            const option = document.createElement('option');
            option.value = char;
            option.textContent = char;
            if (char === neuron.characteristic) {
                option.selected = true;
            }
            characteristicSelect.appendChild(option);
        });
        
        // Dropdown para seleccionar valor
        const valueSelect = document.createElement('select');
        valueSelect.className = 'form-select form-select-sm';
        valueSelect.id = `value-select-${index}`;
        valueSelect.style.border = '2px solid #28a745';
        
        characteristics[neuron.characteristic].forEach(val => {
            const option = document.createElement('option');
            option.value = val;
            option.textContent = val;
            if (val === neuron.value) {
                option.selected = true;
            }
            valueSelect.appendChild(option);
        });
        
        // Event listeners
        characteristicSelect.onchange = (e) => {
            const newCharacteristic = e.target.value;
            updateNeuronCharacteristic(index, newCharacteristic);
        };
        
        valueSelect.onchange = (e) => {
            const newValue = e.target.value;
            updateNeuronValue(index, newValue);
        };
        
        div.appendChild(label);
        div.appendChild(characteristicSelect);
        div.appendChild(valueSelect);
        container.appendChild(div);
        
        console.log('Dropdowns creados para neurona:', index);
    });
    
    console.log('=== CARACTERÍSTICAS ACTIVAS ACTUALIZADAS ===');
}

// Función para actualizar valor de neurona
function updateNeuronValue(neuronIndex, newValue) {
    console.log('Updating neuron value:', neuronIndex, newValue);
    
    if (neuronIndex >= 0 && neuronIndex < activeNeurons.length) {
        activeNeurons[neuronIndex].value = newValue;
        
        const neuron = activeNeurons[neuronIndex];
        const neuronElement = document.getElementById(`neuron-${neuron.layer}-${neuron.neuron}`);
        if (neuronElement) {
            const tooltip = neuronElement.querySelector('.neuron-tooltip');
            if (tooltip) {
                tooltip.textContent = `${neuron.characteristic}: ${newValue}`;
            }
        }
        
        updateCostFunction();
        updateFilteredFoods();
    }
}

// Función para actualizar característica de neurona
function updateNeuronCharacteristic(neuronIndex, newCharacteristic) {
    console.log('Updating neuron characteristic:', neuronIndex, newCharacteristic);
    
    if (neuronIndex >= 0 && neuronIndex < activeNeurons.length) {
        activeNeurons[neuronIndex].characteristic = newCharacteristic;
        
        // Actualizar el dropdown de valores
        const valueSelect = document.getElementById(`value-select-${neuronIndex}`);
        if (valueSelect) {
            valueSelect.innerHTML = '';
            characteristics[newCharacteristic].forEach(val => {
                const option = document.createElement('option');
                option.value = val;
                option.textContent = val;
                valueSelect.appendChild(option);
            });
            // Seleccionar el primer valor por defecto
            activeNeurons[neuronIndex].value = characteristics[newCharacteristic][0];
            valueSelect.value = characteristics[newCharacteristic][0];
        }
        
        // Actualizar tooltip
        const neuron = activeNeurons[neuronIndex];
        const neuronElement = document.getElementById(`neuron-${neuron.layer}-${neuron.neuron}`);
        if (neuronElement) {
            const tooltip = neuronElement.querySelector('.neuron-tooltip');
            if (tooltip) {
                tooltip.textContent = `${newCharacteristic}: ${activeNeurons[neuronIndex].value}`;
            }
        }
        
        updateCostFunction();
        updateFilteredFoods();
    }
}

// Función para obtener alimentos filtrados
function getFilteredFoods() {
    return dataset.filter(food => {
        return activeNeurons.every(neuron => {
            return food[neuron.characteristic] === neuron.value;
        });
    });
}

// Función para actualizar función de costo
function updateCostFunction() {
    const filteredFoods = getFilteredFoods();
    const count = filteredFoods.length;
    const percentage = (count / dataset.length) * 100;
    
    const possibleCountElement = document.getElementById('possible-count');
    const costProgressElement = document.getElementById('cost-progress');
    
    if (possibleCountElement) possibleCountElement.textContent = count.toString();
    if (costProgressElement) costProgressElement.style.width = `${percentage}%`;
    
    if (costProgressElement) {
        if (percentage > 50) {
            costProgressElement.className = 'progress-bar bg-danger';
        } else if (percentage > 20) {
            costProgressElement.className = 'progress-bar bg-warning';
        } else {
            costProgressElement.className = 'progress-bar bg-success';
        }
    }
}

// Función para actualizar alimentos filtrados
function updateFilteredFoods() {
    const filteredFoods = getFilteredFoods();
    const container = document.getElementById('filtered-foods');
    
    if (!container) return;
    
    if (filteredFoods.length === 0) {
        container.innerHTML = '<p class="text-danger">No hay alimentos que cumplan estas características</p>';
        return;
    }
    
    container.innerHTML = filteredFoods.map(food => 
        `<span class="food-item" onclick="selectFood('${food.Clase}')">${food.Clase}</span>`
    ).join('');
}

// Función para seleccionar alimento
function selectFood(foodName) {
    const predictionInput = document.getElementById('prediction-input');
    if (predictionInput) predictionInput.value = foodName;
}

// Función para hacer predicción
function makePrediction() {
    const predictionInput = document.getElementById('prediction-input');
    const resultDiv = document.getElementById('prediction-result');
    
    if (!predictionInput || !resultDiv) return;
    
    const prediction = predictionInput.value.trim().toLowerCase();
    const target = targetFood.Clase.toLowerCase();
    
    if (!prediction) {
        resultDiv.innerHTML = '<div class="alert alert-warning">Por favor, escribe tu predicción</div>';
        return;
    }
    
    if (prediction === target) {
        gameActive = false;
        resultDiv.innerHTML = `<div class="prediction-correct">¡CORRECTO! Era ${targetFood.Clase} 🎉</div>`;
        showVictoryModal();
    } else {
        resultDiv.innerHTML = `<div class="prediction-incorrect">Incorrecto. Sigue intentando... 🤔</div>`;
        
        setTimeout(() => {
            resultDiv.innerHTML = '';
            predictionInput.value = '';
        }, 2000);
    }
}

// Función para mostrar modal de victoria
function showVictoryModal() {
    const modal = new bootstrap.Modal(document.getElementById('victory-modal'));
    const victoryMessage = document.getElementById('victory-message');
    const victoryDetails = document.getElementById('victory-details');
    
    if (victoryMessage) victoryMessage.textContent = `¡Adivinaste! Era ${targetFood.Clase}`;
    if (victoryDetails) victoryDetails.textContent = `Lo lograste en ${currentEpoch} épocas con ${activeNeurons.length} características activadas.`;
    
    modal.show();
}

// Función para actualizar timestamp
function updateTimestamp() {
    const now = new Date();
    const timestamp = now.toLocaleString('es-ES');
    const timestampElement = document.getElementById('last-update');
    if (timestampElement) {
        timestampElement.textContent = timestamp;
    }
}

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    console.log('=== DOM CARGADO - INICIALIZANDO JUEGO ===');
    
    // Actualizar timestamp
    updateTimestamp();
    
    // Cargar dataset desde CSV
    loadDataset();
});

// Función global para reiniciar (llamada desde modal)
window.resetGame = resetGame; 
// Neural Food Network - Juego Educativo
console.log('=== SCRIPT CARGADO ===');

// Variables globales
let currentEpoch = 0;
let activeNeurons = [];
let targetFood = null;
let gameActive = false;
let dataset = [];
let characteristics = {};
let selectedNeuron = null;

// Función para cargar el dataset desde CSV
function loadDataset() {
    console.log('=== CARGANDO DATASET ===');
    
    Papa.parse('dataset_alimentos_480plus_25rasgos.csv', {
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
    setupModalEventListeners();
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
            
            // Hacer las neuronas clickeables para activación modal
            neuronDiv.style.cursor = 'pointer';
            neuronDiv.addEventListener('click', () => openNeuronActivationModal(layer, neuron));
            
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

// Función para abrir modal de activación de neurona
function openNeuronActivationModal(layer, neuron) {
    console.log('=== ABRIENDO MODAL DE ACTIVACIÓN ===');
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
        alert('Ya se activó una neurona en esta capa en esta época');
        return;
    }
    
    selectedNeuron = { layer, neuron };
    
    // Llenar dropdown de características
    const characteristicSelect = document.getElementById('characteristic-select');
    characteristicSelect.innerHTML = '<option value="">Elige una característica...</option>';
    
    const availableCharacteristics = Object.keys(characteristics);
    const usedCharacteristics = activeNeurons.map(n => n.characteristic);
    const remainingCharacteristics = availableCharacteristics.filter(c => !usedCharacteristics.includes(c));
    
    remainingCharacteristics.forEach(char => {
        const option = document.createElement('option');
        option.value = char;
        option.textContent = char;
        characteristicSelect.appendChild(option);
    });
    
    // Limpiar dropdown de valores
    const valueSelect = document.getElementById('value-select');
    valueSelect.innerHTML = '<option value="">Primero elige una característica...</option>';
    
    // Abrir modal
    const modal = new bootstrap.Modal(document.getElementById('neuron-activation-modal'));
    modal.show();
}

// Función para configurar event listeners del modal
function setupModalEventListeners() {
    const characteristicSelect = document.getElementById('characteristic-select');
    const valueSelect = document.getElementById('value-select');
    const activateBtn = document.getElementById('activate-neuron-btn');
    
    if (characteristicSelect) {
        characteristicSelect.addEventListener('change', function() {
            const selectedCharacteristic = this.value;
            if (selectedCharacteristic) {
                // Llenar dropdown de valores
                valueSelect.innerHTML = '<option value="">Elige un valor...</option>';
                characteristics[selectedCharacteristic].forEach(val => {
                    const option = document.createElement('option');
                    option.value = val;
                    option.textContent = val;
                    valueSelect.appendChild(option);
                });
            } else {
                valueSelect.innerHTML = '<option value="">Primero elige una característica...</option>';
            }
            updateActivateButton();
        });
    }
    
    if (valueSelect) {
        valueSelect.addEventListener('change', updateActivateButton);
    }
    
    if (activateBtn) {
        activateBtn.addEventListener('click', activateSelectedNeuron);
    }
}

// Función para actualizar estado del botón de activar
function updateActivateButton() {
    const characteristicSelect = document.getElementById('characteristic-select');
    const valueSelect = document.getElementById('value-select');
    const activateBtn = document.getElementById('activate-neuron-btn');
    
    if (activateBtn) {
        const canActivate = characteristicSelect.value && valueSelect.value;
        activateBtn.disabled = !canActivate;
    }
}

// Función para activar la neurona seleccionada
function activateSelectedNeuron() {
    if (!selectedNeuron) return;
    
    const characteristicSelect = document.getElementById('characteristic-select');
    const valueSelect = document.getElementById('value-select');
    
    const characteristic = characteristicSelect.value;
    const value = valueSelect.value;
    
    if (!characteristic || !value) return;
    
    // Activar la neurona
    const { layer, neuron } = selectedNeuron;
    const neuronElement = document.getElementById(`neuron-${layer}-${neuron}`);
    
    neuronElement.className = neuronElement.className.replace('inactive', 'active');
    const tooltip = neuronElement.querySelector('.neuron-tooltip');
    if (tooltip) tooltip.textContent = `${characteristic}: ${value}`;
    
    activeNeurons.push({ layer, neuron, characteristic, value, epoch: currentEpoch });
    console.log('Neurona activada:', { layer, neuron, characteristic, value, epoch: currentEpoch });
    console.log('Total de neuronas activas:', activeNeurons.length);
    
    // Cerrar modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('neuron-activation-modal'));
    modal.hide();
    
    // Limpiar selección
    selectedNeuron = null;
    
    updateActiveNeuronsInfo();
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
    const activeNeuronsInfoElement = document.getElementById('active-neurons-info');
    const predictionInputElement = document.getElementById('prediction-input');
    const predictionResultElement = document.getElementById('prediction-result');
    const filteredFoodsElement = document.getElementById('filtered-foods');
    
    if (currentEpochElement) currentEpochElement.textContent = '0';
    if (activeNeuronsInfoElement) activeNeuronsInfoElement.innerHTML = '<p class="text-muted">Haz clic en las neuronas para activarlas</p>';
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

// Función para actualizar información de neuronas activas
function updateActiveNeuronsInfo() {
    console.log('=== ACTUALIZANDO INFORMACIÓN DE NEURONAS ACTIVAS ===');
    console.log('Neuronas activas:', activeNeurons.length);
    
    const container = document.getElementById('active-neurons-info');
    if (!container) {
        console.error('No se encontró el contenedor de información de neuronas activas');
        return;
    }
    
    container.innerHTML = '';
    
    if (activeNeurons.length === 0) {
        container.innerHTML = '<p class="text-muted">Haz clic en las neuronas para activarlas</p>';
        console.log('No hay neuronas activas, mostrando mensaje por defecto');
        return;
    }
    
    console.log('Creando información para', activeNeurons.length, 'neuronas');
    
    activeNeurons.forEach((neuron, index) => {
        console.log('Creando información para neurona:', index, neuron);
        
        const div = document.createElement('div');
        div.className = 'neuron-info-item';
        
        const header = document.createElement('div');
        header.className = 'neuron-info-header';
        header.textContent = `Neurona ${neuron.neuron} - Capa ${neuron.layer} (Época ${neuron.epoch})`;
        
        const details = document.createElement('div');
        details.className = 'neuron-info-details';
        details.textContent = `${neuron.characteristic}: ${neuron.value}`;
        
        div.appendChild(header);
        div.appendChild(details);
        container.appendChild(div);
        
        console.log('Información creada para neurona:', index);
    });
    
    console.log('=== INFORMACIÓN DE NEURONAS ACTIVAS ACTUALIZADA ===');
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
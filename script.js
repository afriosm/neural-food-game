// Neural Food Network - Juego Educativo
console.log('Script cargado correctamente');

// Variables globales
let currentEpoch = 0;
let activeNeurons = [];
let targetFood = null;
let gameActive = false;

// Características disponibles
const characteristics = {
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

// Dataset simplificado
const dataset = [
    {clase: 'Mango', 'Color dominante': 'Naranja', Forma: 'Ovalado', 'Piel/cáscara': 'Gruesa', 'Semillas/hueso': 'Muchas pequeñas', Jugosidad: 'Media', 'Sabor dominante': 'Dulce', Dulzor: 'Alto', Acidez: 'Alta', Textura: 'Harinoso', Aroma: 'Alto', 'Preparación típica': 'Crudo', 'Consumo habitual': 'En mezcla', 'Plato frecuente': 'Ensalada', 'Temperatura de consumo': 'Frío', 'Parte comestible': 'Pulpa', Conservación: 'Ambiente', 'Vida útil': 'Corta', Estacionalidad: 'Estacional', 'Sensibilidad al golpe': 'Alta', 'Facilidad de limpieza/pelado': 'Alta', 'Contenido de agua': 'Alto', Fibra: 'Alta', Grasas: 'Bajas', Procesamiento: 'Mínimo', 'Piel comestible': 'No'},
    {clase: 'Papaya', 'Color dominante': 'Morado', Forma: 'Ovalado', 'Piel/cáscara': 'Gruesa', 'Semillas/hueso': 'Sin', Jugosidad: 'Media', 'Sabor dominante': 'Dulce', Dulzor: 'Alto', Acidez: 'Media', Textura: 'Fibroso', Aroma: 'Alto', 'Preparación típica': 'Crudo', 'Consumo habitual': 'Solo', 'Plato frecuente': 'Snack', 'Temperatura de consumo': 'Ambiente', 'Parte comestible': 'Pulpa', Conservación: 'Refrigerar', 'Vida útil': 'Corta', Estacionalidad: 'Estacional', 'Sensibilidad al golpe': 'Media', 'Facilidad de limpieza/pelado': 'Media', 'Contenido de agua': 'Alto', Fibra: 'Alta', Grasas: 'Bajas', Procesamiento: 'Mínimo', 'Piel comestible': 'No'},
    {clase: 'Piña', 'Color dominante': 'Amarillo', Forma: 'Alargado', 'Piel/cáscara': 'Gruesa', 'Semillas/hueso': 'Hueso', Jugosidad: 'Media', 'Sabor dominante': 'Ácido', Dulzor: 'Alto', Acidez: 'Alta', Textura: 'Harinoso', Aroma: 'Alto', 'Preparación típica': 'Crudo', 'Consumo habitual': 'Solo', 'Plato frecuente': 'Ensalada', 'Temperatura de consumo': 'Frío', 'Parte comestible': 'Pulpa', Conservación: 'Refrigerar', 'Vida útil': 'Corta', Estacionalidad: 'Todo el año', 'Sensibilidad al golpe': 'Media', 'Facilidad de limpieza/pelado': 'Alta', 'Contenido de agua': 'Alto', Fibra: 'Media', Grasas: 'Bajas', Procesamiento: 'Mínimo', 'Piel comestible': 'No'},
    {clase: 'Banano', 'Color dominante': 'Amarillo', Forma: 'Ovalado', 'Piel/cáscara': 'Gruesa', 'Semillas/hueso': 'Pequeñas', Jugosidad: 'Media', 'Sabor dominante': 'Dulce', Dulzor: 'Alto', Acidez: 'Alta', Textura: 'Harinoso', Aroma: 'Medio', 'Preparación típica': 'Crudo', 'Consumo habitual': 'Solo', 'Plato frecuente': 'Jugo', 'Temperatura de consumo': 'Ambiente', 'Parte comestible': 'Pulpa', Conservación: 'Ambiente', 'Vida útil': 'Corta', Estacionalidad: 'Todo el año', 'Sensibilidad al golpe': 'Media', 'Facilidad de limpieza/pelado': 'Media', 'Contenido de agua': 'Alto', Fibra: 'Media', Grasas: 'Bajas', Procesamiento: 'Mínimo', 'Piel comestible': 'Sí'},
    {clase: 'Manzana', 'Color dominante': 'Verde', Forma: 'Alargado', 'Piel/cáscara': 'Gruesa', 'Semillas/hueso': 'Sin', Jugosidad: 'Media', 'Sabor dominante': 'Dulce', Dulzor: 'Medio', Acidez: 'Media', Textura: 'Harinoso', Aroma: 'Alto', 'Preparación típica': 'Crudo', 'Consumo habitual': 'En mezcla', 'Plato frecuente': 'Snack', 'Temperatura de consumo': 'Frío', 'Parte comestible': 'Pulpa', Conservación: 'Ambiente', 'Vida útil': 'Corta', Estacionalidad: 'Estacional', 'Sensibilidad al golpe': 'Alta', 'Facilidad de limpieza/pelado': 'Media', 'Contenido de agua': 'Alto', Fibra: 'Alta', Grasas: 'Bajas', Procesamiento: 'Mínimo', 'Piel comestible': 'Sí'},
    {clase: 'Naranja', 'Color dominante': 'Rojo', Forma: 'Redondo', 'Piel/cáscara': 'Fina', 'Semillas/hueso': 'Hueso', Jugosidad: 'Alta', 'Sabor dominante': 'Dulce', Dulzor: 'Medio', Acidez: 'Baja', Textura: 'Jugoso', Aroma: 'Alto', 'Preparación típica': 'Crudo', 'Consumo habitual': 'Solo', 'Plato frecuente': 'Snack', 'Temperatura de consumo': 'Frío', 'Parte comestible': 'Pulpa', Conservación: 'Ambiente', 'Vida útil': 'Corta', Estacionalidad: 'Todo el año', 'Sensibilidad al golpe': 'Alta', 'Facilidad de limpieza/pelado': 'Media', 'Contenido de agua': 'Alto', Fibra: 'Alta', Grasas: 'Bajas', Procesamiento: 'Mínimo', 'Piel comestible': 'No'},
    {clase: 'Papa', 'Color dominante': 'Blanco', Forma: 'Redondo', 'Piel/cáscara': 'Fina', 'Semillas/hueso': 'Sin', Jugosidad: 'Media', 'Sabor dominante': 'Umami', Dulzor: 'Medio', Acidez: 'Baja', Textura: 'Harinoso', Aroma: 'Medio', 'Preparación típica': 'Cocido', 'Consumo habitual': 'Acompañante', 'Plato frecuente': 'Sopa', 'Temperatura de consumo': 'Caliente', 'Parte comestible': 'Raíz', Conservación: 'Ambiente', 'Vida útil': 'Larga', Estacionalidad: 'Todo el año', 'Sensibilidad al golpe': 'Media', 'Facilidad de limpieza/pelado': 'Media', 'Contenido de agua': 'Bajo', Fibra: 'Alta', Grasas: 'Bajas', Procesamiento: 'Medio', 'Piel comestible': 'No'},
    {clase: 'Arroz', 'Color dominante': 'Blanco', Forma: 'Alargado', 'Piel/cáscara': 'Fina', 'Semillas/hueso': 'Semilla', Jugosidad: 'Baja', 'Sabor dominante': 'Umami', Dulzor: 'Bajo', Acidez: 'Baja', Textura: 'Harinoso', Aroma: 'Bajo', 'Preparación típica': 'Cocido', 'Consumo habitual': 'Acompañante', 'Plato frecuente': 'Sopa', 'Temperatura de consumo': 'Caliente', 'Parte comestible': 'Raíz', Conservación: 'Ambiente', 'Vida útil': 'Larga', Estacionalidad: 'Todo el año', 'Sensibilidad al golpe': 'Baja', 'Facilidad de limpieza/pelado': 'Alta', 'Contenido de agua': 'Bajo', Fibra: 'Media', Grasas: 'Bajas', Procesamiento: 'Medio', 'Piel comestible': 'No'},
    {clase: 'Café', 'Color dominante': 'Blanco', Forma: 'Plano', 'Piel/cáscara': 'Sin piel', 'Semillas/hueso': 'Sin', Jugosidad: 'Alta', 'Sabor dominante': 'Dulce', Dulzor: 'Alto', Acidez: 'Baja', Textura: 'Jugoso', Aroma: 'Bajo', 'Preparación típica': 'Ambos', 'Consumo habitual': 'Solo', 'Plato frecuente': 'Snack', 'Temperatura de consumo': 'Caliente', 'Parte comestible': 'Líquido', Conservación: 'Refrigerar', 'Vida útil': 'Larga', Estacionalidad: 'Todo el año', 'Sensibilidad al golpe': 'Baja', 'Facilidad de limpieza/pelado': 'Alta', 'Contenido de agua': 'Alto', Fibra: 'Baja', Grasas: 'Bajas', Procesamiento: 'Mínimo', 'Piel comestible': 'No'},
    {clase: 'Agua', 'Color dominante': 'Verde', Forma: 'Plano', 'Piel/cáscara': 'Sin piel', 'Semillas/hueso': 'Sin', Jugosidad: 'Alta', 'Sabor dominante': 'Dulce', Dulzor: 'Medio', Acidez: 'Media', Textura: 'Cremoso', Aroma: 'Medio', 'Preparación típica': 'Ambos', 'Consumo habitual': 'Solo', 'Plato frecuente': 'Snack', 'Temperatura de consumo': 'Caliente', 'Parte comestible': 'Líquido', Conservación: 'Ambiente', 'Vida útil': 'Media', Estacionalidad: 'Todo el año', 'Sensibilidad al golpe': 'Baja', 'Facilidad de limpieza/pelado': 'Alta', 'Contenido de agua': 'Alto', Fibra: 'Baja', Grasas: 'Bajas', Procesamiento: 'Mínimo', 'Piel comestible': 'No'}
];

// Función para crear la red neuronal
function createNeuralNetwork() {
    console.log('Creando red neuronal...');
    const networkContainer = document.getElementById('neural-network');
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
            
            const tooltip = document.createElement('div');
            tooltip.className = 'neuron-tooltip';
            tooltip.textContent = 'Inactiva';
            neuronDiv.appendChild(tooltip);

            layerDiv.appendChild(neuronDiv);
        }
        
        networkContainer.appendChild(layerDiv);
    }
    console.log('Red neuronal creada');
}

// Función para configurar event listeners
function setupEventListeners() {
    console.log('Configurando event listeners...');
    
    document.getElementById('next-epoch-btn').addEventListener('click', nextEpoch);
    document.getElementById('reset-btn').addEventListener('click', resetGame);
    document.getElementById('predict-btn').addEventListener('click', makePrediction);
    
    document.getElementById('prediction-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            makePrediction();
        }
    });
    
    console.log('Event listeners configurados');
}

// Función para reiniciar el juego
function resetGame() {
    console.log('Reiniciando juego...');
    currentEpoch = 0;
    activeNeurons = [];
    gameActive = true;
    targetFood = dataset[Math.floor(Math.random() * dataset.length)];
    
    document.getElementById('current-epoch').textContent = '0';
    document.getElementById('active-characteristics').innerHTML = '<p class="text-muted">Haz clic en "Siguiente Época" para activar neuronas</p>';
    document.getElementById('prediction-input').value = '';
    document.getElementById('prediction-result').innerHTML = '';
    document.getElementById('filtered-foods').innerHTML = '<p class="text-muted">Los alimentos aparecerán aquí conforme se activen las neuronas</p>';
    
    const neurons = document.querySelectorAll('.neuron');
    neurons.forEach(neuron => {
        neuron.className = neuron.className.replace('active', 'inactive');
        neuron.querySelector('.neuron-tooltip').textContent = 'Inactiva';
    });
    
    updateCostFunction();
    console.log('Alimento objetivo:', targetFood.clase);
}

// Función para siguiente época
function nextEpoch() {
    console.log('Siguiente época...');
    if (!gameActive || currentEpoch >= 16) return;
    
    currentEpoch++;
    document.getElementById('current-epoch').textContent = currentEpoch.toString();
    
    activateRandomNeuron();
    updateActiveCharacteristics();
    updateCostFunction();
    updateFilteredFoods();
}

// Función para activar neurona aleatoria
function activateRandomNeuron() {
    console.log('Activando neurona aleatoria...');
    const availableCharacteristics = Object.keys(characteristics);
    const usedCharacteristics = activeNeurons.map(n => n.characteristic);
    const remainingCharacteristics = availableCharacteristics.filter(c => !usedCharacteristics.includes(c));
    
    if (remainingCharacteristics.length === 0) return;
    
    const characteristic = remainingCharacteristics[Math.floor(Math.random() * remainingCharacteristics.length)];
    const possibleValues = characteristics[characteristic];
    const value = possibleValues[Math.floor(Math.random() * possibleValues.length)];
    
    const inactiveNeurons = document.querySelectorAll('.neuron.inactive');
    if (inactiveNeurons.length === 0) return;
    
    const randomNeuron = inactiveNeurons[Math.floor(Math.random() * inactiveNeurons.length)];
    const [, layer, neuron] = randomNeuron.id.split('-').map(Number);
    
    randomNeuron.className = randomNeuron.className.replace('inactive', 'active');
    randomNeuron.querySelector('.neuron-tooltip').textContent = `${characteristic}: ${value}`;
    
    activeNeurons.push({ layer, neuron, characteristic, value });
    console.log('Neurona activada:', { layer, neuron, characteristic, value });
}

// Función para actualizar características activas
function updateActiveCharacteristics() {
    console.log('Actualizando características activas. Neuronas activas:', activeNeurons.length);
    const container = document.getElementById('active-characteristics');
    container.innerHTML = '';
    
    if (activeNeurons.length === 0) {
        container.innerHTML = '<p class="text-muted">Haz clic en "Siguiente Época" para activar neuronas</p>';
        return;
    }
    
    activeNeurons.forEach((neuron, index) => {
        console.log('Creando dropdowns para neurona:', index, neuron);
        
        const div = document.createElement('div');
        div.className = 'characteristic-dropdown';
        div.style.border = '3px solid #ff0000';
        div.style.padding = '15px';
        div.style.margin = '15px 0';
        div.style.borderRadius = '10px';
        div.style.backgroundColor = '#f8f9fa';
        
        const label = document.createElement('div');
        label.className = 'characteristic-label';
        label.textContent = `Neurona ${neuron.neuron} - Capa ${neuron.layer}`;
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
    
    console.log('Características activas actualizadas');
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
    
    document.getElementById('possible-count').textContent = count.toString();
    document.getElementById('cost-progress').style.width = `${percentage}%`;
    
    const progressBar = document.getElementById('cost-progress');
    if (percentage > 50) {
        progressBar.className = 'progress-bar bg-danger';
    } else if (percentage > 20) {
        progressBar.className = 'progress-bar bg-warning';
    } else {
        progressBar.className = 'progress-bar bg-success';
    }
}

// Función para actualizar alimentos filtrados
function updateFilteredFoods() {
    const filteredFoods = getFilteredFoods();
    const container = document.getElementById('filtered-foods');
    
    if (filteredFoods.length === 0) {
        container.innerHTML = '<p class="text-danger">No hay alimentos que cumplan estas características</p>';
        return;
    }
    
    container.innerHTML = filteredFoods.map(food => 
        `<span class="food-item" onclick="selectFood('${food.clase}')">${food.clase}</span>`
    ).join('');
}

// Función para seleccionar alimento
function selectFood(foodName) {
    document.getElementById('prediction-input').value = foodName;
}

// Función para hacer predicción
function makePrediction() {
    const prediction = document.getElementById('prediction-input').value.trim().toLowerCase();
    const target = targetFood.clase.toLowerCase();
    const resultDiv = document.getElementById('prediction-result');
    
    if (!prediction) {
        resultDiv.innerHTML = '<div class="alert alert-warning">Por favor, escribe tu predicción</div>';
        return;
    }
    
    if (prediction === target) {
        gameActive = false;
        resultDiv.innerHTML = `<div class="prediction-correct">¡CORRECTO! Era ${targetFood.clase} 🎉</div>`;
        showVictoryModal();
    } else {
        resultDiv.innerHTML = `<div class="prediction-incorrect">Incorrecto. Sigue intentando... 🤔</div>`;
        
        setTimeout(() => {
            resultDiv.innerHTML = '';
            document.getElementById('prediction-input').value = '';
        }, 2000);
    }
}

// Función para mostrar modal de victoria
function showVictoryModal() {
    const modal = new bootstrap.Modal(document.getElementById('victory-modal'));
    document.getElementById('victory-message').textContent = `¡Adivinaste! Era ${targetFood.clase}`;
    document.getElementById('victory-details').textContent = `Lo lograste en ${currentEpoch} épocas con ${activeNeurons.length} características activadas.`;
    modal.show();
}

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM cargado, inicializando juego...');
    createNeuralNetwork();
    setupEventListeners();
    resetGame();
    console.log('Juego inicializado correctamente');
});

// Función global para reiniciar (llamada desde modal)
window.resetGame = resetGame; 
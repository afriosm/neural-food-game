// Neural Food Network - Juego Educativo
class NeuralFoodNetwork {
    constructor() {
        // Definir características y sus posibles valores
        this.characteristics = {
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
        this.dataset = [
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

        // Variables del juego
        this.currentEpoch = 0;
        this.maxEpochs = 16;
        this.activeNeurons = [];
        this.targetFood = null;
        this.gameActive = false;
        
        this.init();
    }

    init() {
        this.createNeuralNetwork();
        this.setupEventListeners();
        this.resetGame();
    }

    createNeuralNetwork() {
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
    }

    setupEventListeners() {
        document.getElementById('next-epoch-btn').addEventListener('click', () => this.nextEpoch());
        document.getElementById('reset-btn').addEventListener('click', () => this.resetGame());
        document.getElementById('predict-btn').addEventListener('click', () => this.makePrediction());
        
        document.getElementById('prediction-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.makePrediction();
            }
        });
    }

    resetGame() {
        this.currentEpoch = 0;
        this.activeNeurons = [];
        this.gameActive = true;
        this.targetFood = this.dataset[Math.floor(Math.random() * this.dataset.length)];
        
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
        
        this.updateCostFunction();
        console.log('Alimento objetivo:', this.targetFood.clase);
    }

    nextEpoch() {
        if (!this.gameActive || this.currentEpoch >= this.maxEpochs) return;
        
        this.currentEpoch++;
        document.getElementById('current-epoch').textContent = this.currentEpoch.toString();
        
        this.activateRandomNeuron();
        this.updateActiveCharacteristics();
        this.updateCostFunction();
        this.updateFilteredFoods();
    }

    activateRandomNeuron() {
        const availableCharacteristics = Object.keys(this.characteristics);
        const usedCharacteristics = this.activeNeurons.map(n => n.characteristic);
        const remainingCharacteristics = availableCharacteristics.filter(c => !usedCharacteristics.includes(c));
        
        if (remainingCharacteristics.length === 0) return;
        
        const characteristic = remainingCharacteristics[Math.floor(Math.random() * remainingCharacteristics.length)];
        const possibleValues = this.characteristics[characteristic];
        const value = possibleValues[Math.floor(Math.random() * possibleValues.length)];
        
        const inactiveNeurons = document.querySelectorAll('.neuron.inactive');
        if (inactiveNeurons.length === 0) return;
        
        const randomNeuron = inactiveNeurons[Math.floor(Math.random() * inactiveNeurons.length)];
        const [, layer, neuron] = randomNeuron.id.split('-').map(Number);
        
        randomNeuron.className = randomNeuron.className.replace('inactive', 'active');
        randomNeuron.querySelector('.neuron-tooltip').textContent = `${characteristic}: ${value}`;
        
        this.activeNeurons.push({ layer, neuron, characteristic, value });
    }

    updateActiveCharacteristics() {
        const container = document.getElementById('active-characteristics');
        container.innerHTML = '';
        
        if (this.activeNeurons.length === 0) {
            container.innerHTML = '<p class="text-muted">Haz clic en "Siguiente Época" para activar neuronas</p>';
            return;
        }
        
        this.activeNeurons.forEach((neuron, index) => {
            const div = document.createElement('div');
            div.className = 'characteristic-dropdown';
            
            const label = document.createElement('div');
            label.className = 'characteristic-label';
            label.textContent = `Neurona ${neuron.neuron} - Capa ${neuron.layer}`;
            
            const select = document.createElement('select');
            select.className = 'form-select form-select-sm';
            
            this.characteristics[neuron.characteristic].forEach(val => {
                const option = document.createElement('option');
                option.value = val;
                option.textContent = val;
                if (val === neuron.value) {
                    option.selected = true;
                }
                select.appendChild(option);
            });
            
            // Event listener simple y directo
            select.onchange = (e) => {
                console.log('Dropdown changed:', index, e.target.value);
                this.updateNeuronValue(index, e.target.value);
            };
            
            const small = document.createElement('small');
            small.className = 'text-muted';
            small.textContent = neuron.characteristic;
            
            div.appendChild(label);
            div.appendChild(select);
            div.appendChild(small);
            container.appendChild(div);
        });
    }

    updateNeuronValue(neuronIndex, newValue) {
        console.log('Updating neuron value:', neuronIndex, newValue);
        
        if (neuronIndex >= 0 && neuronIndex < this.activeNeurons.length) {
            this.activeNeurons[neuronIndex].value = newValue;
            
            const neuron = this.activeNeurons[neuronIndex];
            const neuronElement = document.getElementById(`neuron-${neuron.layer}-${neuron.neuron}`);
            if (neuronElement) {
                const tooltip = neuronElement.querySelector('.neuron-tooltip');
                if (tooltip) {
                    tooltip.textContent = `${neuron.characteristic}: ${newValue}`;
                }
            }
            
            this.updateCostFunction();
            this.updateFilteredFoods();
        }
    }

    getFilteredFoods() {
        return this.dataset.filter(food => {
            return this.activeNeurons.every(neuron => {
                return food[neuron.characteristic] === neuron.value;
            });
        });
    }

    updateCostFunction() {
        const filteredFoods = this.getFilteredFoods();
        const count = filteredFoods.length;
        const percentage = (count / this.dataset.length) * 100;
        
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

    updateFilteredFoods() {
        const filteredFoods = this.getFilteredFoods();
        const container = document.getElementById('filtered-foods');
        
        if (filteredFoods.length === 0) {
            container.innerHTML = '<p class="text-danger">No hay alimentos que cumplan estas características</p>';
            return;
        }
        
        container.innerHTML = filteredFoods.map(food => 
            `<span class="food-item" onclick="game.selectFood('${food.clase}')">${food.clase}</span>`
        ).join('');
    }

    selectFood(foodName) {
        document.getElementById('prediction-input').value = foodName;
    }

    makePrediction() {
        const prediction = document.getElementById('prediction-input').value.trim().toLowerCase();
        const target = this.targetFood.clase.toLowerCase();
        const resultDiv = document.getElementById('prediction-result');
        
        if (!prediction) {
            resultDiv.innerHTML = '<div class="alert alert-warning">Por favor, escribe tu predicción</div>';
            return;
        }
        
        if (prediction === target) {
            this.gameActive = false;
            resultDiv.innerHTML = `<div class="prediction-correct">¡CORRECTO! Era ${this.targetFood.clase} 🎉</div>`;
            this.showVictoryModal();
        } else {
            resultDiv.innerHTML = `<div class="prediction-incorrect">Incorrecto. Sigue intentando... 🤔</div>`;
            
            setTimeout(() => {
                resultDiv.innerHTML = '';
                document.getElementById('prediction-input').value = '';
            }, 2000);
        }
    }

    showVictoryModal() {
        const modal = new bootstrap.Modal(document.getElementById('victory-modal'));
        document.getElementById('victory-message').textContent = `¡Adivinaste! Era ${this.targetFood.clase}`;
        document.getElementById('victory-details').textContent = `Lo lograste en ${this.currentEpoch} épocas con ${this.activeNeurons.length} características activadas.`;
        modal.show();
    }
}

// Instancia global del juego
let game;

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    game = new NeuralFoodNetwork();
});

// Función global para reiniciar
function resetGame() {
    if (game) {
        game.resetGame();
    }
} 
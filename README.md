# 🧠 Red Neuronal - Juego de Alimentos

Un juego educativo interactivo para aprender cómo funcionan las redes neuronales a través de la clasificación de alimentos colombianos.

## 🎯 ¿Qué es?

Este proyecto simula una red neuronal donde los estudiantes pueden activar "neuronas" (representadas visualmente) para clasificar alimentos. Cada neurona activada añade una característica que ayuda a reducir las posibilidades hasta adivinar el alimento secreto.

## 🎮 Cómo Jugar

### Objetivo
Adivinar el alimento secreto activando neuronas estratégicamente para reducir las posibilidades.

### Mecánica del Juego
1. **Activar Neuronas**: Haz clic en las neuronas para activarlas y seleccionar características
2. **Seleccionar Características**: Elige características que ayuden a distinguir el alimento
3. **Reducir Posibilidades**: Cada característica activa reduce el número de alimentos posibles
4. **Hacer Predicción**: Cuando tengas pocas opciones, intenta adivinar el alimento
5. **Siguiente Época**: Si no aciertas, activa más neuronas y continúa

### Función de Costo
- Mide la cantidad de alimentos posibles que cumplen con las características activas
- **Verde**: Pocas posibilidades (¡casi lo tienes!)
- **Amarillo**: Posibilidades moderadas
- **Rojo**: Muchas posibilidades (necesitas más características)

## 📊 Dataset

El juego utiliza un dataset de **475 alimentos colombianos** con **25 características** cada uno:

### Características Incluidas:
- Color dominante
- Forma
- Piel/cáscara
- Semillas/hueso
- Jugosidad
- Sabor dominante
- Dulzor
- Acidez
- Textura
- Aroma
- Preparación típica
- Consumo habitual
- Plato frecuente
- Temperatura de consumo
- Parte comestible
- Conservación
- Vida útil
- Estacionalidad
- Sensibilidad al golpe
- Facilidad de limpieza/pelado
- Contenido de agua
- Fibra
- Grasas
- Procesamiento
- Piel comestible

## 🚀 Cómo Usar

### Opción 1: GitHub Pages (Recomendado)
1. Ve a: [https://afriosm.github.io/neural-food-game/](https://afriosm.github.io/neural-food-game/)
2. ¡Empieza a jugar inmediatamente!

### Opción 2: Local
1. Clona este repositorio
2. Abre `index.html` en tu navegador
3. ¡Listo para jugar!

## 🎓 Uso Educativo

### Para Profesores
- **Workshops de IA**: Perfecto para introducir conceptos de redes neuronales
- **Clases de Programación**: Ejemplo práctico de clasificación
- **Ciencias de Datos**: Demostración de filtrado y clasificación

### Conceptos que Enseña
- **Redes Neuronales**: Cómo las neuronas procesan información
- **Clasificación**: Agrupar elementos por características
- **Filtrado**: Reducir opciones basándose en criterios
- **Función de Costo**: Medir el progreso hacia una meta
- **Estrategia**: Pensamiento lógico y deductivo

## 🛠️ Tecnologías

- **Frontend**: HTML5, CSS3, JavaScript ES6
- **UI Framework**: Bootstrap 5
- **Iconos**: Font Awesome
- **CSV Parsing**: PapaParse
- **Deployment**: GitHub Pages

## 📁 Estructura del Proyecto

```
neural-food-game/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # Lógica del juego
├── dataset_alimentos_475clases_25rasgos.csv  # Dataset limpio
└── README.md           # Documentación
```

## 🔧 Características Técnicas

### Interfaz
- **Diseño Responsivo**: Funciona en desktop, tablet y móvil
- **Activación Modal**: Interfaz intuitiva para activar neuronas
- **Visualización en Tiempo Real**: Actualización instantánea de posibilidades
- **Animaciones**: Efectos visuales atractivos

### Funcionalidades
- **Activación Manual**: Los usuarios controlan qué neuronas activar
- **Validación**: No permite activar neuronas ya usadas
- **Persistencia**: Mantiene el estado durante la sesión
- **Reinicio**: Función para empezar un nuevo juego

## 🎯 Beneficios Educativos

1. **Aprendizaje Visual**: Las redes neuronales se ven y se entienden
2. **Interactividad**: Los estudiantes participan activamente
3. **Contexto Local**: Usa alimentos colombianos familiares
4. **Progresión Clara**: La función de costo muestra el progreso
5. **Estrategia**: Requiere pensamiento lógico

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Puedes:
- Reportar bugs
- Sugerir nuevas características
- Añadir más alimentos al dataset
- Mejorar la documentación

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

Desarrollado para workshops educativos de inteligencia artificial y redes neuronales.

---

**¡Disfruta aprendiendo sobre redes neuronales con alimentos colombianos!** 🇨🇴🧠 
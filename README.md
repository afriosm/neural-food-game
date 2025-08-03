# 🧠 Neural Food Network - Juego Educativo

Un juego interactivo para enseñar cómo funcionan las redes neuronales usando alimentos colombianos como ejemplo.

## 🎯 Descripción del Juego

**Neural Food Network** es una herramienta educativa que simula el funcionamiento de una red neuronal a través de un juego de adivinanzas. Los estudiantes aprenden:

- Cómo se activan las neuronas por épocas
- Cómo las características se combinan para hacer predicciones
- Qué es una función de costo y cómo mejora el aprendizaje
- La importancia del filtrado de datos en machine learning

## 🎮 Cómo Jugar

1. **Objetivo**: Adivinar el alimento secreto que seleccionó la computadora
2. **Mecánica**: 
   - Haz clic en "Siguiente Época" para activar neuronas
   - Cada neurona representa una característica del alimento
   - Puedes cambiar los valores de las características usando los dropdowns
   - Observa cómo se reduce la lista de alimentos posibles
   - Haz tu predicción cuando tengas suficiente información

3. **Función de Costo**: La barra de progreso muestra cuántos alimentos siguen siendo posibles
   - 🔴 Rojo: Muchas posibilidades (>50%)
   - 🟡 Amarillo: Posibilidades medias (20-50%)
   - 🟢 Verde: Pocas posibilidades (<20%)

## 🚀 Deployment en GitHub Pages

### Opción 1: Usando GitHub Web Interface (Más Fácil)

1. **Crear Repositorio**:
   - Ve a [GitHub.com](https://github.com) y crea una cuenta si no tienes
   - Crea un nuevo repositorio llamado `neural-food-game`
   - Asegúrate que sea **público**

2. **Subir Archivos**:
   - En tu repositorio, haz clic en "uploading an existing file"
   - Arrastra y suelta estos archivos:
     - `index.html`
     - `styles.css`
     - `script.js`
     - `dataset_alimentos_60clases_25rasgos.csv`
     - `README.md`

3. **Activar GitHub Pages**:
   - Ve a Settings → Pages
   - En "Source", selecciona "Deploy from a branch"
   - Selecciona branch `main` y folder `/ (root)`
   - Haz clic en "Save"

4. **Acceder al Juego**:
   - Tu juego estará disponible en: `https://tuusuario.github.io/neural-food-game`
   - GitHub te dará la URL exacta en la sección Pages

### Opción 2: Usando Git (Si tienes Git instalado)

```bash
# Clonar o crear repositorio
git init
git add .
git commit -m "Initial commit: Neural Food Network Game"
git branch -M main
git remote add origin https://github.com/tuusuario/neural-food-game.git
git push -u origin main
```

Luego activar Pages como en la Opción 1.

### Alternativas de Deployment

#### 🔸 Netlify (Recomendado para principiantes)
1. Ve a [netlify.com](https://netlify.com)
2. Arrastra la carpeta con todos los archivos
3. Tu sitio estará listo en 30 segundos
4. URL gratuita tipo: `https://amazing-name-123456.netlify.app`

#### 🔸 Vercel
1. Ve a [vercel.com](https://vercel.com)
2. Conecta tu repositorio de GitHub
3. Deploy automático
4. URL gratuita tipo: `https://neural-food-game.vercel.app`

#### 🔸 CodePen (Para pruebas rápidas)
1. Ve a [codepen.io](https://codepen.io)
2. Crea un nuevo pen
3. Copia el contenido de cada archivo en su sección respectiva
4. Comparte el enlace directamente

## 📊 Dataset

El juego usa un dataset de **296 alimentos colombianos** con **25 características** cada uno:

- **Físicas**: Color, forma, piel, semillas, textura
- **Sensoriales**: Sabor, dulzor, acidez, aroma, jugosidad  
- **Consumo**: Preparación, temperatura, plato frecuente
- **Nutricionales**: Fibra, grasas, contenido de agua
- **Prácticas**: Conservación, vida útil, facilidad de pelado

## 🎓 Uso Educativo

### Para Profesores:
- Explica conceptos de ML de forma visual
- Demuestra cómo las redes neuronales "aprenden"
- Ilustra la importancia de las características en la clasificación
- Enseña sobre sobreajuste y generalización

### Para Estudiantes:
- Comprende la arquitectura de redes neuronales
- Ve cómo funciona el entrenamiento por épocas
- Experimenta con diferentes combinaciones de características
- Aprende sobre la función de costo

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura del juego
- **CSS3**: Estilos y animaciones de la red neuronal
- **JavaScript ES6**: Lógica del juego y simulación
- **Bootstrap 5**: Interfaz responsive y moderna
- **Font Awesome**: Iconos

## 🎨 Características del Juego

- ✅ Red neuronal visual con 4 capas y 4 neuronas cada una
- ✅ Animaciones en tiempo real cuando se activan neuronas
- ✅ Dropdowns interactivos para cambiar características
- ✅ Función de costo visual (barra de progreso)
- ✅ Filtrado en tiempo real de alimentos posibles
- ✅ Sistema de épocas y predicciones
- ✅ Modal de victoria con confetti
- ✅ Diseño responsive para móviles y tablets
- ✅ Interfaz intuitiva y educativa

## 🤝 Contribuciones

¿Quieres mejorar el juego? ¡Las contribuciones son bienvenidas!

1. Haz fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Añadir nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🙋‍♂️ Soporte

¿Tienes preguntas? ¿Encontraste un bug? 

- Abre un [Issue](https://github.com/tuusuario/neural-food-game/issues)
- O contáctame directamente

---

¡**Disfruta enseñando y aprendiendo sobre redes neuronales!** 🧠🎓✨ 
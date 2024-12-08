// import { skinManager } from './skinManager.js';

// document.addEventListener('DOMContentLoaded', async () => {
//     const selectedDifficulty = JSON.parse(sessionStorage.getItem('selectedDifficulty'));
//     const osuContent = sessionStorage.getItem('osuContent');
//     const audioBlob = await getFromIndexedDB('audioFiles', 'currentAudio');

//     if (!audioBlob) {
//         alert('No se encontró el archivo de audio. Volviendo a la página principal.');
//         window.location.href = 'select.html';
//         return;
//     }

//     const audioUrl = URL.createObjectURL(audioBlob);
//     const audio = new Audio(audioUrl);

//     // Validar que los datos necesarios estén presentes
//     if (!selectedDifficulty || !osuContent || !audioBlob) {
//         alert('Por favor, selecciona una dificultad primero.');
//         window.location.href = 'select.html';
//         return;
//     }

//     document.getElementById('difficultyLabel').textContent = `Dificultad: ${selectedDifficulty.title}`;

//     // Parsear el archivo .osu para obtener los objetos
//     const hitObjects = parseOsuMap(osuContent);

//     // Depurar audio para asegurar que se cargue correctamente
//     audio.addEventListener('canplay', () => {
//         console.log('Audio cargado correctamente. Reproduciendo...');
//         audio.play();
//         startGame(hitObjects, audio);
//     });

//     audio.addEventListener('error', () => {
//         console.error('Error al cargar el audio. Verifica que el archivo .mp3 sea válido.');
//     });
// });

// // Parsear el archivo .osu para obtener las notas (HitObjects)
// function parseOsuMap(osuText) {
//     const lines = osuText.split('\n');
//     const hitObjects = [];
//     let inHitObjectsSection = false;

//     console.log("Procesando el archivo .osu...");

//     for (let line of lines) {
//         line = line.trim();
//         if (line === '[HitObjects]') {
//             console.log("Sección [HitObjects] encontrada.");
//             inHitObjectsSection = true;
//             continue; // Saltar esta línea
//         }
//         if (line.startsWith('[') && inHitObjectsSection) break;

//         if (inHitObjectsSection && line) {
//             const parts = line.split(',');
//             if (parts.length < 3) {
//                 console.warn("Línea malformada en [HitObjects]:", line);
//                 continue;
//             }

//             const [x, , time] = parts.map(Number);
//             const column = Math.floor((x / 512) * 4); // Asumiendo 4 columnas
//             hitObjects.push({ time, column });
//         }
//     }

//     if (hitObjects.length === 0) {
//         console.error("No se encontraron objetos en [HitObjects].");
//     } else {
//         console.log("Objetos encontrados:", hitObjects.length);
//     }

//     return hitObjects;
// }

// // Iniciar el juego
// function startGame(hitObjects, audio) {
//     const columns = document.querySelectorAll('.column');
//     const interval = setInterval(() => {
//         const currentTime = audio.currentTime * 1000; // Convertir tiempo a milisegundos
//         console.log(`Tiempo actual del audio: ${currentTime}`);

//         hitObjects.forEach((hit, index) => {
//             if (currentTime >= hit.time - 400 && currentTime <= hit.time + 100) {
//                 spawnNote(columns[hit.column]);
//                 hitObjects.splice(index, 1); // Eliminar la nota procesada
//             }
//         });

//         if (!hitObjects.length) {
//             console.log("Todas las notas se han procesado.");
//             clearInterval(interval);
//         }
//     }, 10);
// }

// // Crear y mover las notas
// function spawnNote(column) {
//     const note = document.createElement('div');
//     note.classList.add('note');
//     note.style.top = '0px'; // Posición inicial
//     column.appendChild(note);

//     const direction = column.getAttribute('data-direction');
//     note.classList.add(direction);  // Esto agrega 'down', 'up', 'left', o 'right'

//     column.appendChild(note);

//     moveNoteDown(note);
// }

// function moveNoteDown(note) {
//     let position = 0;
//     const noteSpeed = 15; // Velocidad de las notas
//     const interval = setInterval(() => {
//         position += noteSpeed; // Actualizar la posición de la nota
//         note.style.top = `${position}px`;

//         if (position > 540) { // Si la nota sale de la pantalla
//             console.log('Nota eliminada: salió de la pantalla.');
//             clearInterval(interval);
//             note.remove();
//         }
//     }, 20);
// }

// // Primero definimos todas las funciones necesarias
// function showJudgement(type) {
//     console.log('Mostrando judgement:', type);
//     const judgementImage = new Image();
//     judgementImage.src = `./assets/skins/${type}.png`;
//     judgementImage.className = 'judgement';
    
//     // Limpiar judgements anteriores
//     judgementDisplay.innerHTML = '';
//     judgementDisplay.appendChild(judgementImage);
    
//     setTimeout(() => {
//         judgementImage.remove();
//     }, 500);
// }

// function updateScoreDisplay(score) {
//     const scoreStr = score.toString().padStart(3, '0');
//     const scoreImages = scoreStr.split('').map(num => {
//         const img = new Image();
//         img.src = `./assets/skins/num${num}.png`;
//         return img;
//     });
    
//     const scoreDisplay = document.getElementById('scoreDisplay');
//     if (!scoreDisplay) {
//         console.error('No se encontró scoreDisplay');
//         return;
//     }

//     scoreDisplay.innerHTML = '';
    
//     scoreImages.forEach(img => {
//         scoreDisplay.appendChild(img);
//     });
// }

// let currentScore = 0;
// function updateScore(points) {
//     currentScore += points;
//     updateScoreDisplay(currentScore);
// }

// function showHitValue(value) {
//     const hitValueDisplay = document.createElement('div');
//     hitValueDisplay.className = 'hit-value';
//     hitValueDisplay.style.position = 'absolute';
//     hitValueDisplay.style.zIndex = '1000';
    
//     const valueString = value.toString();
//     for (let digit of valueString) {
//         const digitImg = document.createElement('img');
//         digitImg.src = `./assets/skins/num${digit}.png`;
//         digitImg.style.height = '20px';
//         digitImg.style.width = 'auto';
//         hitValueDisplay.appendChild(digitImg);
//     }
    
//     const judgementDisplay = document.getElementById('judgementDisplay');
//     if (judgementDisplay) {
//         hitValueDisplay.style.top = '60%';
//         hitValueDisplay.style.left = '50%';
//         hitValueDisplay.style.transform = 'translate(-50%, -50%)';
//         judgementDisplay.appendChild(hitValueDisplay);
        
//         setTimeout(() => {
//             hitValueDisplay.remove();
//         }, 500);
//     }
// }

// // Luego el evento keydown
// document.addEventListener('keydown', (event) => {
//     const columns = document.querySelectorAll('.column');
//     const column = Array.from(columns).find(col => col.getAttribute('data-key') === event.key);
    
//     if (!column) return;
    
//     const note = column.querySelector('.note');
//     if (!note) return;

//     const position = parseInt(note.style.top, 10);
//     console.log('Posición de la nota:', position);

//     if (position >= 460 && position <= 500) {
//         console.log('¡SICK!');
//         showJudgement('sick');
//         updateScore(300);
//         showHitValue(300);
//         note.remove();
//     } else if (position >= 440 && position < 460) {
//         console.log('¡GOOD!');
//         showJudgement('good');
//         updateScore(100);
//         showHitValue(100);
//         note.remove();
//     } else if (position >= 400 && position < 440) {
//         console.log('¡BAD!');
//         showJudgement('bad');
//         updateScore(50);
//         showHitValue(50);
//         note.remove();
//     } else {
//         console.log('¡SHIT!');
//         showJudgement('shit');
//         showHitValue(0);
//         if (note.parentElement) note.remove();
//     }
// });

// function openDatabase() {
//     return new Promise((resolve, reject) => {
//         const request = indexedDB.open('OsuGameDB', 1);

//         request.onupgradeneeded = (event) => {
//             const db = event.target.result;
//             if (!db.objectStoreNames.contains('audioFiles')) {
//                 db.createObjectStore('audioFiles', { keyPath: 'id' });
//             }
//         };

//         request.onsuccess = (event) => resolve(event.target.result);
//         request.onerror = (event) => reject(event.target.error);
//     });
// }

// function saveToIndexedDB(storeName, id, data) {
//     return openDatabase().then((db) => {
//         return new Promise((resolve, reject) => {
//             const transaction = db.transaction(storeName, 'readwrite');
//             const store = transaction.objectStore(storeName);
//             store.put({ id, data });

//             transaction.oncomplete = () => resolve();
//             transaction.onerror = (event) => reject(event.target.error);
//         });
//     });
// }

// function getFromIndexedDB(storeName, id) {
//     return openDatabase().then((db) => {
//         return new Promise((resolve, reject) => {
//             const transaction = db.transaction(storeName, 'readonly');
//             const store = transaction.objectStore(storeName);
//             const request = store.get(id);

//             request.onsuccess = () => resolve(request.result ? request.result.data : null);
//             request.onerror = (event) => reject(event.target.error);
//         });
//     });
// }


// // //? cambios animacion avatar
// // // Variables para las imágenes y el contador de aciertos
// let consecutiveHits = 0; // Contador de aciertos consecutivos
// const maxHits = 5; // Número de aciertos necesarios para activar el fuego

// const baseImage = document.getElementById('character-base');
// const fireImage = document.getElementById('character-fire');

// // // Función para manejar los aciertos
// function handleHit(isCorrect) {
//     if (isCorrect) {
//         consecutiveHits++;
//         console.log(`Aciertos consecutivos: ${consecutiveHits}`);
        
// //         // Activa el fuego si se alcanzan los aciertos necesarios
//         if (consecutiveHits === maxHits) {
//             activateFireEffect();
//         }
//     } else {
//         consecutiveHits = 0; // Reinicia el contador en caso de fallo
//         deactivateFireEffect();
//     }
// }

// // // Activar efecto de fuego
// function activateFireEffect() {
//     fireImage.classList.add('fire-effect'); // Activa la animación
//     console.log("¡Fuego activado!");
// }

// // // Desactivar efecto de fuego
// function deactivateFireEffect() {
//     fireImage.classList.remove('fire-effect'); // Detiene la animación
//     console.log("Fuego desactivado.");
// }




import { skinManager } from './skinManager.js';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const selectedDifficulty = JSON.parse(sessionStorage.getItem('selectedDifficulty'));
        const osuContent = sessionStorage.getItem('osuContent');
        
        if (!selectedDifficulty || !osuContent) {
            throw new Error('Faltan datos necesarios para iniciar el juego');
        }

        const audioBlob = await getAudioBlob();
        if (!audioBlob) {
            throw new Error('No se pudo cargar el audio');
        }

        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);

        document.getElementById('difficultyLabel').textContent = 
            `Dificultad: ${selectedDifficulty.version || 'Desconocida'}`;

        audio.addEventListener('canplay', () => {
            console.log('Audio listo para reproducir');
            const hitObjects = parseOsuMap(osuContent);
            audio.play();
            startGame(hitObjects, audio);
        });

        audio.addEventListener('error', (e) => {
            console.error('Error al cargar el audio:', e);
            throw new Error('Error al cargar el audio');
        });

    } catch (error) {
        console.error('Error al iniciar el juego:', error);
        alert('Error al cargar el juego. Volviendo a la selección.');
        window.location.href = 'select.html';
    }
});

async function getAudioBlob() {
    try {
        const db = await openDatabase();
        const transaction = db.transaction('audioFiles', 'readonly');
        const store = transaction.objectStore('audioFiles');
        
        return new Promise((resolve, reject) => {
            const request = store.get('currentAudio');
            
            request.onsuccess = () => {
                const result = request.result;
                if (!result) {
                    reject(new Error('No se encontró el audio en IndexedDB'));
                } else {
                    resolve(result);
                }
            };
            
            request.onerror = () => reject(request.error);
        });
    } catch (error) {
        console.error('Error al obtener el audio:', error);
        throw error;
    }
}

function startGame(hitObjects, audio) {
    console.log('Iniciando juego con', hitObjects.length, 'notas');
    const columns = document.querySelectorAll('.column');

    const interval = setInterval(() => {
        const currentTime = audio.currentTime * 1000;

        hitObjects.forEach((hit, index) => {
            if (currentTime >= hit.time - 400 && currentTime <= hit.time + 100) {
                console.log(`Generando nota en columna ${hit.column} en tiempo ${currentTime}`);
                spawnNote(columns[hit.column]);
                hitObjects.splice(index, 1);
            }
        });

        if (!hitObjects.length) {
            console.log('Todas las notas procesadas');
            clearInterval(interval);
        }
    }, 16);
}

// Parsear el archivo .osu para obtener las notas (HitObjects)
function parseOsuMap(osuText) {
    const lines = osuText.split('\n');
    const hitObjects = [];
    let inHitObjectsSection = false;

    console.log("Procesando el archivo .osu...");

    for (let line of lines) {
        line = line.trim();
        if (line === '[HitObjects]') {
            console.log("Sección [HitObjects] encontrada.");
            inHitObjectsSection = true;
            continue; // Saltar esta línea
        }
        if (line.startsWith('[') && inHitObjectsSection) break;

        if (inHitObjectsSection && line) {
            const parts = line.split(',');
            if (parts.length < 3) {
                console.warn("Línea malformada en [HitObjects]:", line);
                continue;
            }

            const [x, , time] = parts.map(Number);
            const column = Math.floor((x / 512) * 4); // Asumiendo 4 columnas
            hitObjects.push({ time, column });
        }
    }

    if (hitObjects.length === 0) {
        console.error("No se encontraron objetos en [HitObjects].");
    } else {
        console.log("Objetos encontrados:", hitObjects.length);
    }

    return hitObjects;
}

// Crear y mover las notas
function spawnNote(column) {
    const note = document.createElement('div');
    note.classList.add('note');
    note.style.top = '0px'; // Posición inicial
    column.appendChild(note);

    const direction = column.getAttribute('data-direction');
    note.classList.add(direction);  // Esto agrega 'down', 'up', 'left', o 'right'

    column.appendChild(note);

    moveNoteDown(note);
}

function moveNoteDown(note) {
    let position = 0;
    const noteSpeed = 15; // Velocidad de las notas
    const interval = setInterval(() => {
        position += noteSpeed; // Actualizar la posición de la nota
        note.style.top = `${position}px`;

        if (position > 540) { // Si la nota sale de la pantalla
            console.log('Nota eliminada: salió de la pantalla.');
            clearInterval(interval);
            note.remove();
        }
    }, 20);
}

// Primero definimos todas las funciones necesarias
function showJudgement(type) {
    console.log('Mostrando judgement:', type);
    const judgementDisplay = document.getElementById('judgementDisplay');
    if (!judgementDisplay) {
        console.error('No se encontró el elemento judgementDisplay');
        return;
    }

    const judgement = document.createElement('div');
    judgement.className = 'judgement';
    judgement.textContent = type.toUpperCase();
    
    // Asignar color según el tipo
    switch(type.toLowerCase()) {
        case 'sick':
            judgement.style.color = '#00ff00';
            break;
        case 'good':
            judgement.style.color = '#ffff00';
            break;
        case 'bad':
            judgement.style.color = '#ff9900';
            break;
        case 'shit':
            judgement.style.color = '#ff0000';
            break;
    }
    
    // Limpiar judgements anteriores
    judgementDisplay.innerHTML = '';
    judgementDisplay.appendChild(judgement);
    
    // Remover después de 500ms
    setTimeout(() => {
        if (judgement.parentNode === judgementDisplay) {
            judgement.remove();
        }
    }, 500);
}

function updateScoreDisplay(score) {
    const scoreStr = score.toString().padStart(3, '0');
    const scoreImages = scoreStr.split('').map(num => {
        const img = new Image();
        img.src = `./assets/skins/num${num}.png`;
        return img;
    });
    
    const scoreDisplay = document.getElementById('scoreDisplay');
    if (!scoreDisplay) {
        console.error('No se encontró scoreDisplay');
        return;
    }

    scoreDisplay.innerHTML = '';
    
    scoreImages.forEach(img => {
        scoreDisplay.appendChild(img);
    });
}

let currentScore = 0;
function updateScore(points) {
    currentScore += points;
    updateScoreDisplay(currentScore);
}

function showHitValue(value) {
    const hitValueDisplay = document.createElement('div');
    hitValueDisplay.className = 'hit-value';
    hitValueDisplay.style.position = 'absolute';
    hitValueDisplay.style.zIndex = '1000';
    
    const valueString = value.toString();
    for (let digit of valueString) {
        const digitImg = document.createElement('img');
        digitImg.src = `./assets/skins/num${digit}.png`;
        digitImg.style.height = '20px';
        digitImg.style.width = 'auto';
        hitValueDisplay.appendChild(digitImg);
    }
    
    const judgementDisplay = document.getElementById('judgementDisplay');
    if (judgementDisplay) {
        hitValueDisplay.style.top = '60%';
        hitValueDisplay.style.left = '50%';
        hitValueDisplay.style.transform = 'translate(-50%, -50%)';
        judgementDisplay.appendChild(hitValueDisplay);
        
        setTimeout(() => {
            hitValueDisplay.remove();
        }, 500);
    }
}

// Luego el evento keydown
document.addEventListener('keydown', (event) => {
    const columns = document.querySelectorAll('.column');
    const column = Array.from(columns).find(col => col.getAttribute('data-key') === event.key);
    
    if (!column) return;
    
    const note = column.querySelector('.note');
    if (!note) return;

    const position = parseInt(note.style.top, 10);
    console.log('Posición de la nota:', position);

    if (position >= 460 && position <= 500) {
        console.log('¡SICK!');
        showJudgement('sick');
        updateScore(300);
        showHitValue(300);
        note.remove();
    } else if (position >= 440 && position < 460) {
        console.log('¡GOOD!');
        showJudgement('good');
        updateScore(100);
        showHitValue(100);
        note.remove();
    } else if (position >= 400 && position < 440) {
        console.log('¡BAD!');
        showJudgement('bad');
        updateScore(50);
        showHitValue(50);
        note.remove();
    } else {
        console.log('¡SHIT!');
        showJudgement('shit');
        showHitValue(0);
        if (note.parentElement) note.remove();
    }
});

function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('gameDB', 1);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('audioFiles')) {
                db.createObjectStore('audioFiles');
            }
        };

        request.onsuccess = (event) => resolve(event.target.result);
        request.onerror = (event) => reject(event.target.error);
    });
}

function saveToIndexedDB(storeName, id, data) {
    return openDatabase().then((db) => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            store.put({ id, data });

            transaction.oncomplete = () => resolve();
            transaction.onerror = (event) => reject(event.target.error);
        });
    });
}

function getFromIndexedDB(storeName, id) {
    return openDatabase().then((db) => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(storeName, 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.get(id);

            request.onsuccess = () => resolve(request.result ? request.result.data : null);
            request.onerror = (event) => reject(event.target.error);
        });
    });
}


// //? cambios animacion avatar
// // Variables para las imágenes y el contador de aciertos
let consecutiveHits = 0; // Contador de aciertos consecutivos
const maxHits = 5; // Número de aciertos necesarios para activar el fuego

const baseImage = document.getElementById('character-base');
const fireImage = document.getElementById('character-fire');

// // Función para manejar los aciertos
function handleHit(isCorrect) {
    if (isCorrect) {
        consecutiveHits++;
        console.log(`Aciertos consecutivos: ${consecutiveHits}`);
        
//         // Activa el fuego si se alcanzan los aciertos necesarios
        if (consecutiveHits === maxHits) {
            activateFireEffect();
        }
    } else {
        consecutiveHits = 0; // Reinicia el contador en caso de fallo
        deactivateFireEffect();
    }
}

// // Activar efecto de fuego
function activateFireEffect() {
    fireImage.classList.add('fire-effect'); // Activa la animación
    console.log("¡Fuego activado!");
}

// // Desactivar efecto de fuego
function deactivateFireEffect() {
    fireImage.classList.remove('fire-effect'); // Detiene la animación
    console.log("Fuego desactivado.");
}

// Añadir estos estilos CSS
const style = document.createElement('style');
style.textContent = `
    .judgement {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 24px;
        font-weight: bold;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        z-index: 1000;
        animation: fadeIn 0.1s ease-in, fadeOut 0.4s ease-out 0.1s;
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    }

    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);


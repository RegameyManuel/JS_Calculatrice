// Variables pour stocker les valeurs et l'opérateur
let currentInput = '0';
let previousInput = '';
let operator = null;
let shouldResetScreen = false;

// Sélectionner l'écran de la calculatrice
const screen = document.getElementById('screen');

// Mettre à jour l'écran avec la valeur actuelle
function updateScreen() {
    screen.value = currentInput;
}

// Ajouter un écouteur pour les boutons numériques
for (let i = 0; i <= 9; i++) {
    document.getElementById(i.toString()).addEventListener('click', () => {
        if (shouldResetScreen) {
            currentInput = i.toString();
            shouldResetScreen = false;
        } else {
            currentInput = currentInput === '0' ? i.toString() : currentInput + i.toString();
        }
        updateScreen();
    });
}

// Ajouter un écouteur pour les opérateurs (+, -, *, /)
const operators = ['+', '-', '*', '/'];
operators.forEach(op => {
    document.getElementById(op).addEventListener('click', () => {
        if (operator !== null) {
            calculate();
        }
        previousInput = currentInput;
        operator = op;
        shouldResetScreen = true;
    });
});

// Fonction pour effectuer les calculs
function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }
    currentInput = result.toString();
    operator = null;
    shouldResetScreen = true;
    updateScreen();
}

// Ajouter un écouteur pour le bouton égal
document.getElementById('=').addEventListener('click', () => {
    if (operator === null) return;
    calculate();
});

// Ajouter un écouteur pour le bouton de mise à zéro
document.getElementById('clear').addEventListener('click', () => {
    currentInput = '0';
    previousInput = '';
    operator = null;
    shouldResetScreen = false;
    updateScreen();
});

// Ajouter un écouteur pour le bouton ± (changer le signe)
document.getElementById('signe').addEventListener('click', () => {
    currentInput = (parseFloat(currentInput) * -1).toString();
    updateScreen();
});

// Ajouter un écouteur pour le bouton .
document.getElementById('.').addEventListener('click', () => {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        updateScreen();
    }
});

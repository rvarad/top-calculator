"use strict";

let currentOpScreen = document.getElementById('currentopscreen');
let previousOpScreen = document.getElementById('previousopscreen');
let allClearBtn = document.querySelector('[data-clear]');
let deleteBtn = document.querySelector('[data-delete]');
let numberButtons = document.querySelectorAll('[data-number]');
let operatorButtons = document.querySelectorAll('[data-operator]');
let equalsTo = document.querySelector('[data-equalsto]');

let firstOperand = 0;
let operator = null;
let secondOperand = null;
let operationSet = false;
let shouldResetScreen = false;

window.addEventListener('keydown', (e) => keyboardInputHandler(e.key));
allClearBtn.addEventListener('click', () => allClear());
deleteBtn.addEventListener('click', () => deleteNumber());
numberButtons.forEach((button) => {
    button.addEventListenr('click', () => appendNumber(button.innerText))
});
operatorButtons.forEach((button) => {
    button.addEventListener('click', () => setOperator(button.innerText))
});
equalsTo.addEventListener('click', () => { calculate() });

function appendNumber(num) {
    if (currentOpScreen.innerText === '0' || shouldResetScreen) {
        resetScreen();
    };
    if (num === '.') {
        appendPoint();
    } else {
        currentOpScreen.innerText += num;
    };
};

function appendPoint() {
    if (!currentOpScreen.innerText.includes('.')) {
        if (currentOpScreen.innerText === '') {
            currentOpScreen.innerText = '0.';
        } else {
            currentOpScreen.innerText += '.';
        }
    }
};

function deleteNumber() {
    currentOpScreen.innerText = currentOpScreen.innerText.slice(0, -1);
};

function allClear() {
    resetScreen();
    currentOpScreen.innerText = '0';
    previousOpScreen.innerText = '';
    firstOperand = 0;
    operator = null;
    secondOperand = null;
    operationSet = false;
    shouldResetScreen = false;
};

function resetScreen() {
    currentOpScreen.innerText = '';
    shouldResetScreen = false;
};

function setOperator(sign) {
    if (operationSet) { calculate() };
    operator = sign;
    firstOperand = currentOpScreen.innerText;
    previousOpScreen.innerText = `${firstOperand} ${operator}`;
    operationSet = true;
    shouldResetScreen = true;
};

function calculate() {
    if (!operationSet || shouldResetScreen) { return; }
    secondOperand = currentOpScreen.innerText;
    currentOpScreen.innerText = (secondOperand === '0' && operator === '÷') ? err('div by zero') : (Math.round(operate(firstOperand, operator, secondOperand) * 1000)) / 1000;
    previousOpScreen.innerText = `${firstOperand} ${operator} ${secondOperand} = `;
    operationSet = false;
};

function operate(a, operator, b) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case '÷':
            if (b === 0) return
            else return (a / b)
        case '×':
            return (a * b)
        case '-':
            return (a - b)
        case '+':
            return (a + b)
        default:
            return;
    }
};

function err(code) {
    switch (code) {
        case 'divided by zero':
            previousOpScreen.innerText = `${firstOperand} ${operator}`;
            currentOpScreen.innerText = '';
            equalsToClicked = false;
            alert('Divided by zero! Undefined.');
            return currentOpScreen.innerText;
        case 'no second operand input':
            previousOpScreen.innerText = `${firstOperand} ${operator}`;
            currentOpScreen.innerText = '';
            equalsToClicked = false;
            alert('input a second number.');
            return currentOpScreen.innerText;

        default:
            break;
    }
};

function inputConvertor(input) {
    switch (input) {
        case '/':
            return ('÷');
        case '*':
            return ('×');
        case '-':
            return ('-');
        case '+':
            return ('+');

        default:
            break;
    }
};

function keyboardInputHandler(input) {
    console.log(input)
    switch (true) {
        case (0 <= Number(input) && Number(input) <= 9):
            return appendNumber(input);
        case (input === '.'):
            return appendNumber(input);
        case (input === '/' || input === '*' || input === '-' || input === '+'):
            return setOperator(inputConvertor(input));
        case (input === '=' || input === 'Enter'):
            return calculate('equals to sign');
        case (input === 'Backspace' || input === 'Delete'):
            return deleteNumber();
        case (input === 'Escape' || input === 'End'):
            return allClear();

        default:
            break;
    }
};
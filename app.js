let numberButtons = document.querySelectorAll('.number');

let currentOpScreen = document.querySelector('.currentopscreen');
let previousOpScreen = document.querySelector('.previousopscreen');

let val = '';
let firstOperand = '';
let secondOperand = '';
let operator = '';

numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        val = val + button.innerText;
        currentOpScreen.innerText = val;
    })
})

let clearBtn = document.querySelector('#clear');

clearBtn.addEventListener('click', () => {
    val = '';
    firstOperand = '';
    secondOperand = '';
    operator = '';
    currentOpScreen.innerText = '0';
    previousOpScreen.innerText = '';
})

let deleteBtn = document.querySelector('#delete');

deleteBtn.addEventListener('click', () => {
    currentOpScreen.innerText = currentOpScreen.innerText.slice(0, -1);
    val = currentOpScreen.innerText;
});

let dotBtn = document.querySelector('#dot');

dotBtn.addEventListener('click', () => {
    if (currentOpScreen.innerText.includes('.')) {
        currentOpScreen.innerText = currentOpScreen.innerText;
        val = currentOpScreen.innerText;
    } else {
        currentOpScreen.innerText = currentOpScreen.innerText + '.';
        val = currentOpScreen.innerText;
    }
});

let signButtons = document.querySelectorAll('.sign');

signButtons.forEach((button) => {
    button.addEventListener('click', () => {
        firstOperand = val;
        operator = button.innerText;
        previousOpScreen.innerText = currentOpScreen.innerText + button.innerText;
        currentOpScreen.innerText = val;
        val = '';
    })
})

let equalsTo = document.querySelector('#equals');

equalsTo.addEventListener('click', () => {
    secondOperand = val;
    previousOpScreen.innerText = firstOperand + operator + secondOperand + '='
    currentOpScreen.innerText = calculate(firstOperand, secondOperand);
    val = currentOpScreen.innerText;
})

const calculate = function (a, b) {
    if (operator == '+') {
        return (Number(a) + Number(b));
    } else if (operator == '-') {
        return (Number(a) - Number(b));
    } else if (operator == '*') {
        return (Number(a) * Number(b));
    } else if (operator == '/') {
        return (Number(a) / Number(b));
    } else {
        return ('ERROR');
    }
}
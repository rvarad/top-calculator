let numberButtons = document.querySelectorAll('.number');

let currentOpScreen = document.querySelector('.currentopscreen');
let previousOpScreen = document.querySelector('.previousopscreen');

let val = '';
let firstOperand = '';
let secondOperand = '';
let operator = '';

numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (lengthLimitReached(val)) {
            alert('Length Limit for calculator reached! Please choose an operation to be performed.');
        } else {
            val = val + button.innerText;
            currentOpScreen.innerText = val;
        }
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
    signBtnClicked = false;
    equalsToClicked = false;
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
let signBtnClicked = false;

signButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (!signBtnClicked) {
            operator = button.innerText;
            firstOperand = (currentOpScreen.innerText === '0') ? '0' : val;
            previousOpScreen.innerText = currentOpScreen.innerText + button.innerText;
            currentOpScreen.innerText = val;
            val = '';
            signBtnClicked = true;
        } else {
            previousOpScreen.innerText = calculate(firstOperand, val) + button.innerText;
            currentOpScreen.innerText = calculate(firstOperand, val);
            firstOperand = currentOpScreen.innerText;
            val = '';
            operator = button.innerText;
        }
        equalsToClicked = false;
    })
})

let equalsTo = document.querySelector('#equals');
let equalsToClicked = false;

equalsTo.addEventListener('click', () => {
    if (!equalsToClicked) {
        secondOperand = val;
        currentOpScreen.innerText = calculate(firstOperand, secondOperand);
        if (secondOperand != 0) {
            previousOpScreen.innerText = firstOperand + operator + secondOperand + '=';
            equalsToClicked = true;
        } else {
            previousOpScreen.innerText = firstOperand + operator;
            equalsToClicked = false;
        };
        val = currentOpScreen.innerText;
    };
});

// window.addEventListener('keydown', (e) => {
//     console.log(e);
// });

const calculate = function (a, b) {
    let result;
    if (operator == '+') {
        result = roundResult(Number(a) + Number(b));
    } else if (operator == '-') {
        result = roundResult(Number(a) - Number(b));
    } else if (operator == '*') {
        result = roundResult(Number(a) * Number(b));
    } else if (operator == '÷') {
        if (b == '0') {
            alert('Divided by 0, undefined');
            result = b;
        } else {
            result = roundResult(Number(a) / Number(b));
        }
    } else {
        result = 'ERROR';
    }
    return result;
};

const lengthLimitReached = function (str) {
    if (str.length >= 28) {
        return true;
    } else {
        return false;
    }
};

const roundResult = function (number) {
    return (Math.round(number*1000))/1000;
};

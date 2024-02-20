function add(addend1, addend2) {
    const sum = addend1 + addend2
    return sum;
}

function subtract(minuend, subtrahend) {
    const difference = minuend - subtrahend
    return difference;
}

function multiply(multiplicand, multiplier) {
    const product = multiplicand * multiplier
    return product;
}

function divide(dividend, divisor) {
    const quotient = dividend / divisor;
    return quotient;
}

let operator;
let firstNumber;
let secondNumber;

const multiplySign = document.querySelector("#multiply-button").textContent;
const divideSign = document.querySelector("#divide-button").textContent;

function operate(operator, firstNumber, secondNumber) {
    firstNumber = +firstNumber;
    secondNumber = +secondNumber;
    switch (operator) {
        case "+":
            return add(firstNumber, secondNumber);
        case "-":
            return subtract(firstNumber, secondNumber);
        case multiplySign:
            return multiply(firstNumber, secondNumber);
        case divideSign:
            // Handle divide by 0
            if (+secondNumber === 0) {
                return console.log("Cannot divide by 0");
            }
            return divide(firstNumber, secondNumber);
        case "":
            return console.log("No operation");
    }
}

// Assign variable for display text box
let display = document.querySelector("#display");

// Add event listeners to each number button and update display with selected number
document.querySelectorAll(".number").forEach(e => {
    e.addEventListener("click", e => {
        let number = e.target.textContent;
        updateDisplay(number);
    });
});

// Add event listeners to each operation button and update operator variable
document.querySelectorAll(".operation").forEach(e => {
    e.addEventListener("click", e => {
        overwriteDisplayValue = true;
        operator = e.target.textContent;
    });
});

// Track keystrokes, prevent non-numeric characters, update display with number
display.addEventListener("keydown", e => {
    if (e.key === "Backspace") {
        return;
    }
    e.preventDefault();
    if ((!/^[0-9]*$/.test(e.key))) {
        return;
    }
    let number = e.key;
    updateDisplay(number);
});

// Initialize variable for overwriting the display value
let overwriteDisplayValue = true;

function updateDisplay(number) {
    // Limit number of characters to 16
    if (display.value.length >= 16) {
        return;
    }

    // Overwrite display
    if (display.value === "0" || overwriteDisplayValue === true) {
        display.value = number;
        overwriteDisplayValue = false;
        return;
    }
    
    display.value += number;
}
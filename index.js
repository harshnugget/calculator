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

let firstNumber;
let operator;
let secondNumber;

function operate(firstNumber, operator, secondNumber) {
    switch (operator) {
        case "+":
            return add(firstNumber, secondNumber);
        case "-":
            return subtract(firstNumber, secondNumber);
        case "*":
            return multiply(firstNumber, secondNumber);
        case "/":
            // Handle divide by 0
            if (secondNumber === 0) {
                return console.log("Cannot divide by 0");
            }
            return divide(firstNumber, secondNumber);
        case "":
            return console.log("No operation");
    }
}

// Add event listeners to each number button
document.querySelectorAll(".number").forEach(e => e.addEventListener("click", updateDisplay))

// Assign variable for display box
let display = document.querySelector("#display");

function updateDisplay(e) {
    // Limit number of characters to 16
    if (display.value.length >= 16) {
        return;
    }
    display.value += e.target.textContent;
}
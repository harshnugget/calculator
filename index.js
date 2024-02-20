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

const addSymbol = document.querySelector("#add-button").textContent;
const subtractSymbol = document.querySelector("#subtract-button").textContent;
const multiplySymbol = document.querySelector("#multiply-button").textContent;
const divideSymbol = document.querySelector("#divide-button").textContent;

function operate(operator, firstNumber, secondNumber) {
    firstNumber = +firstNumber;
    secondNumber = +secondNumber;
    switch (operator) {
        case addSymbol:
            return add(firstNumber, secondNumber);
        case subtractSymbol:
            return subtract(firstNumber, secondNumber);
        case multiplySymbol:
            return multiply(firstNumber, secondNumber);
        case divideSymbol:
            // Handle divide by 0
            if (+secondNumber === 0) {
                return console.log("Cannot divide by 0");
            }
            return divide(firstNumber, secondNumber);
        case "":
            return console.log("No operation");
    }
}

// Assign variable for display input box
const display = document.querySelector("#display");

// Add event listeners to each number button and update display with selected number
document.querySelectorAll(".number").forEach(e => {
    e.addEventListener("click", e => {
        const number = e.target.textContent;
        
        updateDisplay(number);
    });
});

// Add event listeners to each operator button
document.querySelectorAll(".operation").forEach(e => {
    e.addEventListener("click", e => {
        // Assign chosen operator to a variable
        const currentOperator = e.target.textContent;

        // Set current display value to be overwritten on next input
        overwriteDisplayValue = true;

        // Perform checks on chosen operator to calculate next value
        handleOperators(currentOperator);
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

// Initialize variable for toggling between first and second number assignment
let activeNumber = "firstNumber";

function updateDisplay(number) {
    // Overwrite display with the current number
    if (overwriteDisplayValue === true) {
        display.value = number;
        if (overwriteDisplayValue === true) {
            overwriteDisplayValue = false;
        }
    } else {
        // Limit number of characters to 16
        if (display.value.length >= 16) {
            return;
        }
        // Append number to display value
        display.value += number; 
    }

    // Switches between assigning value to first number and second number
    activeNumber === "firstNumber" ? firstNumber = display.value : secondNumber = display.value;
}

function handleOperators(currentOperator) {
    // Check if operator is equals sign and necessary values are defined
    if (currentOperator === "=" && firstNumber !== undefined && operate !== undefined && secondNumber !== undefined) {
        // Perform calculation and update display
        firstNumber = operate(operator, firstNumber, secondNumber);
        display.value = firstNumber;
        activeNumber = "firstNumber";
    } else if (currentOperator !== "=") {
        // Update global operator variable if not equals sign
        operator = currentOperator;
        activeNumber = "secondNumber";
    } else if (firstNumber !== undefined && operate !== undefined && secondNumber !== undefined) {
        // Perform calculation when firstNumber, operator, and secondNumber are defined
        firstNumber = operate(operator, firstNumber, secondNumber);
        display.value = firstNumber;
    }
}
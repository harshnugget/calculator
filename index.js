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
    // Handle divide by 0
    if (+secondNumber === 0) {
        return "Cannot divide by zero";
    }
    const quotient = dividend / divisor;
    return quotient;
}

let operator;
let firstNumber;
let secondNumber;

// Operator symbols
const addSymbol = document.querySelector("#add-button").textContent;
const subtractSymbol = document.querySelector("#subtract-button").textContent;
const multiplySymbol = document.querySelector("#multiply-button").textContent;
const divideSymbol = document.querySelector("#divide-button").textContent;

// Function to perform arithmetic operations based on the operator
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
            return divide(firstNumber, secondNumber);
        case "":
            console.log("No operation");
            return;
    }
}

// Display input box
const display = document.querySelector("#display");

// Event listeners for number buttons
document.querySelectorAll(".number").forEach(e => {
    e.addEventListener("click", e => {
        const number = e.target.textContent;
        
        updateDisplay(number);
    });
});

// Event listeners for operator buttons
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

// Track keystrokes | Prevent non-numeric characters | Update display with number
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

// Variable for overwriting the display value
let overwriteDisplayValue = true;

// Variable for toggling between first and second number assignment
let activeNumber = "firstNumber";

// Update display with the current number
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

    // Switch between assigning value to the first and second numbers
    activeNumber === "firstNumber" ? firstNumber = display.value : secondNumber = display.value;
}

// Handle operators for calculations
function handleOperators(currentOperator) {
    // Check if operator is equals sign and necessary values are defined
    if (currentOperator === "=" && firstNumber !== undefined && operate !== undefined && secondNumber !== undefined) {
        // Perform calculation and update display
        firstNumber = operate(operator, firstNumber, secondNumber);
        display.value = firstNumber;
        activeNumber = "firstNumber";
    } else if (currentOperator !== "=") {
        // Update global operator variable and active number
        operator = currentOperator;
        activeNumber = "secondNumber";
        if (firstNumber !== undefined && operate !== undefined && secondNumber !== undefined) {
            // Perform calculation when firstNumber, operator, and secondNumber are defined
            firstNumber = operate(operator, firstNumber, secondNumber);
            display.value = firstNumber;
            secondNumber = undefined;
        }
    }
}
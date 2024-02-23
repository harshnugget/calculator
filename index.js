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
    if (+divisor === 0) {
        return "Cannot divide by zero!";
    }
    const quotient = dividend / divisor;
    return quotient;
}

// Input box
const display = document.querySelector("#display");

// Variables to be used in the operate function
let operator;
const numbersObj = {
    firstNumber: undefined,
    secondNumber: undefined,
    tempSecondNumber: undefined
}

// Variable for toggling between first and second number assignment
let activeNumber;

// Reset all variables
function clearAll() {
    display.value = 0;
    numbersObj.firstNumber = 0;
    numbersObj.secondNumber = undefined;
    operator = undefined;
    activeNumber = "firstNumber"
}

// Initialize variables
clearAll();

// Button symbols
const addSymbol = document.querySelector("#add-button").textContent;
const subtractSymbol = document.querySelector("#subtract-button").textContent;
const multiplySymbol = document.querySelector("#multiply-button").textContent;
const divideSymbol = document.querySelector("#divide-button").textContent;
const equalSymbol = document.querySelector("#equal-button").textContent;
const decimalSymbol = document.querySelector("#decimal-button").textContent;
const signSymbol = document.querySelector("#sign-button").textContent;
const deleteSymbol = document.querySelector("#delete-button").textContent;

// Buttons
const clearButton = document.querySelector("#clear-button");
clearButton.addEventListener("click", clearAll);

const decimalButton = document.querySelector("#decimal-button");
decimalButton.addEventListener("click", e => updateDisplay(e.target.textContent));

const signButton = document.querySelector("#sign-button")
signButton.addEventListener("click", e => updateDisplay(e.target.textContent));

const deleteButton = document.querySelector("#delete-button")
deleteButton.addEventListener("click", e => updateDisplay(e.target.textContent));

// Event listeners for number buttons
document.querySelectorAll(".number").forEach(e => {
    e.addEventListener("click", e => {
        const number = e.target.textContent;
        
        updateDisplay(number);
    });
});

// Event listeners for operator buttons
document.querySelectorAll(".operator").forEach(e => {
    e.addEventListener("click", e => {
        const currentOperator = e.target.textContent;



        // Perform checks on chosen operator to calculate next value
        handleOperators(currentOperator);
    });
});

// Track keystrokes in display input | Prevent non-numeric characters | Update display with number
display.addEventListener("keydown", e => {
    if (e.key === "Backspace") {
        return;
    }
    e.preventDefault();
    if ((!/^[0-9.]*$/.test(e.key))) {
        return;
    }
    let number = e.key;
    updateDisplay(number);
});

// Handle operators for calculations
function handleOperators(currentOperator) {
    if (currentOperator === equalSymbol) {
        if (numbersObj.tempSecondNumber !== undefined && activeNumber === "secondNumber") {
            numbersObj.secondNumber = numbersObj.tempSecondNumber;
        }
        if (numbersObj.secondNumber !== undefined) {
            numbersObj.firstNumber = operate(operator, numbersObj.firstNumber, numbersObj.secondNumber);
            display.value = numbersObj.firstNumber;
            activeNumber = "firstNumber";
        }
    } else if (currentOperator !== equalSymbol) {
        if (!operator) {
            operator = currentOperator;
        }
        if (numbersObj.secondNumber !== undefined || activeNumber === "firstNumber") {
            if (activeNumber !== "firstNumber") {
                numbersObj.firstNumber = operate(operator, numbersObj.firstNumber, numbersObj.secondNumber);
                display.value = numbersObj.firstNumber;
            }
            numbersObj.tempSecondNumber = numbersObj.secondNumber;
            numbersObj.secondNumber = undefined;
        }
        activeNumber = "secondNumber";
        operator = currentOperator; // Update operator to current choice
    }
}

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

// Update display with the current number
function updateDisplay(number) {
    // Initialize to not overwrite
    let overwriteDisplayValue = false;

    if (!numbersObj.firstNumber || (activeNumber === "secondNumber" && !numbersObj.secondNumber)) {
        overwriteDisplayValue = true;
    }

    if (activeNumber === "firstNumber" && numbersObj.secondNumber !== undefined) {
        overwriteDisplayValue = true;
        numbersObj.secondNumber = undefined;
    }

    if (number === decimalSymbol) {
        if (display.value.includes(decimalSymbol)) {
            return;
        }
    }

    if (number === deleteSymbol) {
        // Extract number to get actual length (ignore the sign)
        let absoluteNumber = Math.abs(parseInt(display.value, 10)).toString();
        number = (absoluteNumber.length > 1) ? display.value.slice(0, -1) : '';
        overwriteDisplayValue = true;
    }
    
    if (number === signSymbol && display.value !== "0") {
        overwriteDisplayValue = true;
    } else if (number === signSymbol) {
        return;
    }

    if (overwriteDisplayValue === true) {
        numbersObj.tempSecondNumber = undefined;
        switch (number) {
            case signSymbol:
                if (display.value[0] === "-") {
                    number = display.value.substring(1);
                } else {
                    number = "-" + display.value;
                }
                break;
            case decimalSymbol:
                display.value += number;
                break;
        }
        display.value = number;
    } else {
        // Limit number of characters to 16
        if (display.value.length >= 16) {
            return;
        }
        display.value += number; 
    }

    // Switch between assigning value to the first and second numbers
    activeNumber === "firstNumber" ? numbersObj.firstNumber = display.value : numbersObj.secondNumber = display.value;
}

// Maintain aspect ratio of calculator
function updateCalculatorHeight() {
    let calculatorContainer = document.querySelector('.calculator-container');
    let currentWidth = calculatorContainer.offsetWidth;
    let maxHeight = getComputedStyle(calculatorContainer).getPropertyValue("max-height").replace("px", "");
    let maxWidth = getComputedStyle(calculatorContainer).getPropertyValue("max-width").replace("px", "");
    let aspectRatio = maxHeight / maxWidth;
    let newHeight = currentWidth * aspectRatio;
    calculatorContainer.style.height = `${newHeight}px`;
}

// Add an event listener to update the height when the window is resized
window.addEventListener('resize', updateCalculatorHeight);
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
        return "ERROR";
    }
    const quotient = dividend / divisor;
    return quotient;
}

// Variables to be used in the operate function
let operator;
const numbersObj = {
    firstNumber: undefined,
    secondNumber: undefined,
    tempFirstNumber: undefined,
    tempSecondNumber: undefined
}

// Variable for toggling between first and second number assignment
let activeNumber;

// Reset all variables
function clearAll() {
    resultDisplay.value = 0;
    previousDisplay.value = "";
    operator = undefined;
    numbersObj.firstNumber = 0;
    numbersObj.secondNumber = undefined;
    numbersObj.tempFirstNumber = undefined;
    numbersObj.tempSecondNumber = undefined;
    activeNumber = "firstNumber";
}

// Reset active number / input
function clearEntry() {
    if (numbersObj.tempFirstNumber) {
        clearAll();
        return;
    }
    numbersObj[activeNumber] = 0;
    resultDisplay.value = 0;
}

// Display boxes
const previousDisplay = document.querySelector("#previous-display");
const resultDisplay = document.querySelector("#result-display");

// Initialize variables
clearAll();

// Buttons and symbols
const clearButton = document.querySelector("#clear-button");
clearButton.addEventListener("click", clearAll);

const clearEntryButton = document.querySelector("#clear-entry-button")
clearEntryButton.addEventListener("click", clearEntry);

const addSymbol = document.querySelector("#add-button").textContent;
const subtractSymbol = document.querySelector("#subtract-button").textContent;
const multiplySymbol = document.querySelector("#multiply-button").textContent;
const divideSymbol = document.querySelector("#divide-button").textContent;
const equalSymbol = document.querySelector("#equal-button").textContent;

const decimalButton = document.querySelector("#decimal-button");
const decimalSymbol = decimalButton.textContent;
decimalButton.addEventListener("click", e => updateResultDisplay(e.target.textContent));

const signButton = document.querySelector("#sign-button")
const signSymbol = signButton.textContent;
signButton.addEventListener("click", e => updateResultDisplay(e.target.textContent));

const deleteButton = document.querySelector("#delete-button")
const deleteSymbol = deleteButton.textContent;
deleteButton.addEventListener("click", e => updateResultDisplay(e.target.textContent));

// Event listeners for number buttons
document.querySelectorAll(".number").forEach(e => {
    e.addEventListener("click", e => {
        const number = e.target.textContent;
        updateResultDisplay(number);
    });
});

// Event listeners for operator buttons
document.querySelectorAll(".operator").forEach(e => {
    e.addEventListener("click", e => {
        const currentOperator = e.target.textContent;
        handleOperators(currentOperator);   // Perform checks on chosen operator for calculating next value
    });
});

// Keyboard input
window.addEventListener("keydown", e => {
    if (e.key === "Backspace") {
        return;
    }
    e.preventDefault();
    if ((!/^[0-9.]*$/.test(e.key))) {
        return;
    }
    updateResultDisplay(e.key);
});

// Handle operators for calculations
function handleOperators(currentOperator) {
    if (currentOperator === equalSymbol) {
        if (numbersObj.tempSecondNumber !== undefined && activeNumber === "secondNumber") {
            numbersObj.secondNumber = numbersObj.tempSecondNumber;
        }
        if (numbersObj.secondNumber !== undefined) {
            executeOperationAndDisplayResult();
            activeNumber = "firstNumber";
        }
    } else if (currentOperator !== equalSymbol) {
        if (!operator) {
            operator = currentOperator;
        }
        previousDisplay.value = numbersObj.firstNumber + " " + currentOperator;
        if (numbersObj.secondNumber !== undefined || activeNumber === "firstNumber") {
            if (activeNumber !== "firstNumber") {
                executeOperationAndDisplayResult();
            }
            numbersObj.tempSecondNumber = numbersObj.secondNumber;
            numbersObj.secondNumber = undefined;
        }
        activeNumber = "secondNumber";
        operator = currentOperator; // Update operator to current choice
    }

    function executeOperationAndDisplayResult() {
        numbersObj.tempFirstNumber = numbersObj.firstNumber;
        numbersObj.firstNumber = operate(operator, numbersObj.firstNumber, numbersObj.secondNumber);
        if (numbersObj.firstNumber === "ERROR") {
            resultDisplay.value = "ERROR DIV BY ZERO";
            return;
        }
        previousDisplay.value = updatePreviousDisplay(operator, numbersObj.tempFirstNumber, numbersObj.secondNumber);
        resultDisplay.value = numbersObj.firstNumber.toString().slice(0, 16);
    }
}

// Function to perform arithmetic operations based on the operator
function operate(operator, firstNumber, secondNumber) {
    firstNumber = +firstNumber;
    secondNumber = +secondNumber;
    let result;
    switch (operator) {
        case addSymbol:
            result = add(firstNumber, secondNumber);
            break;
        case subtractSymbol:
            result = subtract(firstNumber, secondNumber);
            break;
        case multiplySymbol:
            result = multiply(firstNumber, secondNumber);
            break;
        case divideSymbol:
            result = divide(firstNumber, secondNumber);
            break;
        case "":
            console.log("No operation");
            return;
    }
    result = result.toFixed(16);
    return +result;
}

// Update display with the current number or result
function updateResultDisplay(number) {
    let overwriteDisplayValue = false;

    // Prevent preceding number with zero
    if (resultDisplay.value === "0") {
        overwriteDisplayValue = true;
    }

    if (!numbersObj.firstNumber || (activeNumber === "secondNumber" && !numbersObj.secondNumber)) {
        overwriteDisplayValue = true;
    }

    if (activeNumber === "firstNumber" && numbersObj.secondNumber !== undefined) {
        overwriteDisplayValue = true;
        numbersObj.secondNumber = undefined;
        previousDisplay.value = "";
    }

    if (number === decimalSymbol) {
        previousDisplay.value = "";
        if (resultDisplay.value.includes(decimalSymbol)) {
            return;
        }
    } 
    else if (number === deleteSymbol) {
        let absoluteNumber = Math.abs(parseInt(resultDisplay.value, 10)).toString();    // Extract number to get length (ignoring sign)
        number = (absoluteNumber.length > 1) ? resultDisplay.value.slice(0, -1) : '';
        if (!number) {
            clearEntry();   // Revert number to 0
            return;
        }
        overwriteDisplayValue = true;
    }
    
    if (number === signSymbol && resultDisplay.value !== "0") {
        overwriteDisplayValue = true;
    } else if (number === signSymbol) {
        previousDisplay.value = "";
        return;
    }

    if (overwriteDisplayValue === true) {
        numbersObj.tempSecondNumber = undefined;
        switch (number) {
            case signSymbol:
                if (resultDisplay.value[0] === "-") {
                    number = resultDisplay.value.substring(1);
                } else {
                    number = "-" + resultDisplay.value;
                }
                break;
            case decimalSymbol:
                resultDisplay.value += number;
                break;
        }
        resultDisplay.value = number;
    } else {
        // Limit number of characters to 16
        if (resultDisplay.value.length >= 16) {
            return;
        }
        resultDisplay.value += number; 
    }

    // Switch between assigning value to the first and second numbers
    activeNumber === "firstNumber" ? numbersObj.firstNumber = resultDisplay.value : numbersObj.secondNumber = resultDisplay.value;
}

// Show previous operation
function updatePreviousDisplay(operator="", firstNumber="", secondNumber="") {
    let result;
    if (firstNumber) {
        result = `${firstNumber.toString().slice(0, 16)}`;
    }
    if (operator) {
        result += ` ${operator} `;
    } 
    if (secondNumber) {
        result += `${secondNumber} = `
    }
    return result;
}
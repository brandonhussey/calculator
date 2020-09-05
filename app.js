/********** SELECTORS **********/

const calculator = document.querySelector(".calculator");
const keys = document.querySelector(".keys");
const display = document.querySelector(".display");
const operators = document.querySelectorAll(".operator");

/********** EVENT LISTENERS **********/

keys.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    //the specific key targeted
    const key = e.target;

    //action attribute from html
    const action = key.dataset.action;

    const numberKey = key.textContent;
    const displayValue = display.textContent;

    //this is to know which key was last presssed
    //add an attribute to the button
    const previousKeyType = calculator.dataset.previousKeyType;

    if (!action) {
      //if a number was pressed change the all clear to clear element
      //only removes the last number i.e b in a+b
      const clearButton = calculator.querySelector("[data-action=clear]");
      clearButton.textContent = "CE";
      //show a new number on the display
      if (
        displayValue === "0" ||
        previousKeyType === "operator" ||
        previousKeyType === "calculate"
      ) {
        display.textContent = numberKey;
        //when creating multi digit number
      } else {
        display.textContent = displayValue + numberKey;
      }
      ResetActiveOperator();
      calculator.dataset.previousKeyType = "number";
    }

    if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      //hold the values of the operation
      const firstNum = calculator.dataset.firstNum;
      const secondNum = displayValue;
      const operator = calculator.dataset.operator;
      if (
        firstNum &&
        operator &&
        previousKeyType !== "operator" &&
        previousKeyType !== "calculate"
      ) {
        //for a multi operator calculation, display the result of the first
        //i.e. 1+2 then pressing - would display 3
        const result = operate(firstNum, operator, secondNum);
        display.textContent = result;
        calculator.dataset.firstNum = result;
      } else {
        calculator.dataset.firstNum = displayValue;
      }
      ResetActiveOperator();
      key.classList.add("active");
      calculator.dataset.operator = action;
      calculator.dataset.previousKeyType = "operator";
    }

    if (action === "decimal") {
      //only allows one decimial
      if (!displayValue.includes(".")) {
        display.textContent = displayValue + ".";
      }
      //if a user presses decimal after an operation, displays 0.
      //rather than appending a decimal to the initial value
      if (previousKeyType === "operator" || previousKeyType === "calculate") {
        display.textContent = "0.";
      }
      calculator.dataset.previousKeyType = "decimal";
    }

    if (action === "clear") {
      //is AC is pressed, resets everything
      if (key.textContent === "AC") {
        calculator.dataset.firstNum = "";
        calculator.dataset.modValue = "";
        calculator.dataset.operator = "";
        calculator.dataset.previousKeyType = "";
      } else {
        key.textContent = "AC";
      }
      //if CE is pressed, erase the currently displayed number only
      display.textContent = 0;
      calculator.dataset.previousKeyType = "clear";
    }

    if (action === "calculate") {
      //hold the values
      let firstNum = calculator.dataset.firstNum;
      let secondNum = displayValue;
      const operator = calculator.dataset.operator;
      //if a number is stored, use the display as second number
      //when equals is pressed, the result becomes number 1, number 2 remains the same
      //i.e. 5-1=4=3=2=1=...
      if (firstNum) {
        if (previousKeyType === "calculate") {
          firstNum = displayValue;
          secondNum = calculator.dataset.modValue;
        }

        display.textContent = operate(firstNum, operator, secondNum);
      }

      ResetActiveOperator();
      calculator.dataset.modValue = secondNum;
      calculator.dataset.previousKeyType = "calculate";
    }
  }
});

/********** FUCNTIONS **********/

function add(a, b) {
  return parseFloat(a) + parseFloat(b);
}

function subtract(a, b) {
  return parseFloat(a) - parseFloat(b);
}

function multiply(a, b) {
  return parseFloat(a) * parseFloat(b);
}

function divide(a, b) {
  return parseFloat(a) / parseFloat(b);
}

function operate(a, operand, b) {
  switch (operand) {
    case "add":
      return add(a, b);
      break;
    case "subtract":
      return subtract(a, b);
      break;
    case "multiply":
      return multiply(a, b);
      break;
    case "divide":
      return divide(a, b);
      break;

    default:
      break;
  }
}

//remove the active class from all operators
//shows that none are being 'pressed'
function ResetActiveOperator() {
  operators.forEach((operator) => {
    operator.classList.remove("active");
  });
}

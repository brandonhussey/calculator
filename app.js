const calculator = document.querySelector(".calculator");
const keys = document.querySelector(".keys");

keys.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    const key = e.target;
    const action = key.dataset.action;

    if (!action) {
      console.log("number");
    }

    if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      console.log("operator");
    }

    if (action === "decimal") {
      console.log("decimal");
    }

    if (action === "clear") {
      console.log("clear");
    }

    if (action === "calculate") {
      console.log("equal");
    }
  }
});

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(a, b, operand) {
  switch (operand) {
    case "+":
      return add(a, b);
      break;
    case "-":
      return subtract(a, b);
      break;
    case "*":
      return multiply(a, b);
      break;
    case "/":
      return divide(a, b);
      break;

    default:
      break;
  }
}

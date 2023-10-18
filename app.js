import Decimal from "decimal.js";

const themeBtn = document.querySelector("#themeBtn");
const currentNumber = document.querySelector("#currentNumber");
const prevNumber = document.querySelector("#prevNumber");
const numberBtn = document.querySelectorAll("#number");
const operationBtn = document.querySelectorAll("#operation");
const clearBtn = document.querySelector("#clear");
const deleteBtn = document.querySelector("#delete");
const equalBtn = document.querySelector("#equal");

let currentOperation = "";

// Theme variables
const userTheme = localStorage.getItem("theme");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (userTheme === "dark" || (!userTheme && systemTheme)) {
  document.documentElement.classList.add("dark");
  themeBtn.parentElement.classList.add("-translate-x-9");
}

function themeSwitch() {
  const { documentElement } = document;
  if (documentElement.classList.contains("dark")) {
    documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
    themeBtn.parentElement.classList.remove("-translate-x-9");
  } else {
    documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
    themeBtn.parentElement.classList.add("-translate-x-9");
  }
}

function addToCurrentNumber(number) {
  if (currentNumber.textContent.includes(".") && number === ".") return;
  if (currentNumber.textContent === "0" && number === "0") return;

  currentNumber.textContent =
    currentNumber.textContent === "0" && number !== "."
      ? number
      : currentNumber.textContent + number;

  changeClearType();
}

function changeClearType() {
  if (currentNumber.textContent.length > 1) return;
  clearBtn.textContent = currentNumber.textContent.length > 0 ? "C" : "AC";
}

function clear() {
  currentNumber.textContent = "";
  if (clearBtn.textContent === "AC") prevNumber.textContent = "";
  changeClearType();
}

function calculateNumbers() {
  if (prevNumber.textContent.length === 0) return;
  const firstNumber = new Decimal(prevNumber.textContent);
  const secondNumber = new Decimal(currentNumber.textContent);

  let total;

  switch (currentOperation) {
    case "fa-divide":
    case "/":
      total = firstNumber.dividedBy(secondNumber);
      break;
    case "fa-xmark":
    case "*":
      total = firstNumber.times(secondNumber);
      break;
    case "fa-minus":
    case "-":
      total = firstNumber.minus(secondNumber);
      break;
    case "fa-plus":
    case "+":
      total = firstNumber.plus(secondNumber);
      break;
    default:
      total = (firstNumber / 100) * secondNumber;
      break;
  }

  currentNumber.textContent = total;
  prevNumber.textContent = "";
}

function addOperation(operation) {
  if (isCurrentNumberEmpty()) return;
  currentOperation = operation;

  if (operation === "fa-plus-minus" && currentNumber.textContent.length > 0) {
    currentNumber.textContent = currentNumber.textContent.includes("-")
      ? currentNumber.textContent.substring(1)
      : `-${currentNumber.textContent}`;
    return;
  }

  if (
    prevNumber.textContent.length > 0 &&
    currentNumber.textContent.length > 0
  ) {
    calculateNumbers();
  } else {
    prevNumber.textContent = currentNumber.textContent;
    currentNumber.textContent = "";
  }
}

function deleteNumber() {
  if (isCurrentNumberEmpty()) return;
  currentNumber.textContent = currentNumber.textContent.slice(0, -1);
  if (isCurrentNumberEmpty()) changeClearType(); // only for when current number becomes empty.
}

function isCurrentNumberEmpty() {
  return currentNumber.textContent.length === 0 ? true : false;
}

themeBtn.addEventListener("click", () => themeSwitch());

numberBtn.forEach((btn) => {
  btn.addEventListener("click", () => addToCurrentNumber(btn.textContent));
});

operationBtn.forEach((btn) => {
  btn.addEventListener("click", () =>
    addOperation(btn.childNodes[1].classList.value.split(" ")[1])
  );
});

clearBtn.addEventListener("click", clear);

deleteBtn.addEventListener("click", deleteNumber);

equalBtn.addEventListener("click", calculateNumbers);

window.addEventListener("keydown", (ev) => {
  const { key } = ev;
  const allowedNumbers = "1234567890.";
  const allowedOperations = "+-*/%";

  if (allowedNumbers.includes(key)) {
    addToCurrentNumber(key);
  } else if (allowedOperations.includes(key)) {
    addOperation(key);
  } else if (key === "Enter") {
    calculateNumbers();
  } else if (key === "Backspace") {
    deleteNumber();
  } else if (key === "Escape") {
    clear();
  }
});

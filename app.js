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
  clearBtn.textContent = currentNumber.textContent.length > 0 ? "C" : "AC";
}

function clear(type) {
  currentNumber.textContent = "";
  if (type === "AC") prevNumber.textContent = "";
  changeClearType();
}

function calculateNumbers() {
  const operationTypes = {
    "fa-divide": "/",
    "fa-xmark": "*",
    "fa-minus": "-",
    "fa-plus": "+",
  };

  const firstNumber = parseFloat(prevNumber.textContent);
  const secondNumber = parseFloat(currentNumber.textContent);

  let total;

  switch (currentOperation) {
    case "fa-divide":
      total = firstNumber / secondNumber;
      break;
    case "fa-xmark":
      total = firstNumber * secondNumber;
      break;
    case "fa-minus":
      total = firstNumber - secondNumber;
      break;
    case "fa-plus":
      total = firstNumber + secondNumber;
      break;
    default:
      total = (firstNumber / 100) * secondNumber;
      break;
  }

  currentNumber.textContent = total;
  prevNumber.textContent = "";
}

themeBtn.addEventListener("click", () => themeSwitch());

numberBtn.forEach((btn) => {
  btn.addEventListener("click", () => addToCurrentNumber(btn.textContent));
});

operationBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const operation = btn.childNodes[1].classList.value.split(" ")[1];
    currentOperation = operation;
    if (operation === "fa-plus-minus" && currentNumber.textContent.length > 0) {
      currentNumber.textContent = `-${currentNumber.textContent}`;
    } else {
      prevNumber.textContent = currentNumber.textContent;
      currentNumber.textContent = "";
    }
  });
});

clearBtn.addEventListener("click", () => clear(clearBtn.textContent));

deleteBtn.addEventListener("click", () => {
  currentNumber.textContent = currentNumber.textContent.slice(0, -1);
  if (currentNumber.textContent.length === 0) changeClearType();
});

equalBtn.addEventListener("click", calculateNumbers);

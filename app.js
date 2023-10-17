const themeBtn = document.querySelector("#themeBtn");
const currentNumber = document.querySelector("#currentNumber");
const prevNumber = document.querySelector("#prevNumber");
const numberBtn = document.querySelectorAll("#number");
const clearBtn = document.querySelector("#clear");
const deleteBtn = document.querySelector("#delete");
const equalBtn = document.querySelector("#equal");

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
  const currentContent = currentNumber.textContent;
  if (currentContent.includes(".") && number === ".") return;
  currentNumber.textContent =
    currentContent === "0" && number === "0"
      ? "0"
      : currentContent === "0" && number !== "."
      ? number
      : currentContent + number;
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

themeBtn.addEventListener("click", () => themeSwitch());

numberBtn.forEach((btn) => {
  btn.addEventListener("click", () => addToCurrentNumber(btn.textContent));
});

clearBtn.addEventListener("click", () => clear(clearBtn.textContent));

deleteBtn.addEventListener("click", () => {
  currentNumber.textContent = currentNumber.textContent.slice(0, -1);
});

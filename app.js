const themeBtn = document.querySelector("#themeBtn");

// Theme variables
const userTheme = localStorage.getItem("theme");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

function themeCheck() {
  if (userTheme === "dark" || (!userTheme && systemTheme)) {
    document.documentElement.classList.add("dark");
    themeBtn.parentElement.classList.add("-translate-x-9");
  }
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

themeBtn.addEventListener("click", () => themeSwitch());

// On load
themeCheck();

const themeBtn = document.querySelector("#themeBtn");

// Theme variables
const userTheme = localStorage.getItem("theme");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

function themeCheck() {
  if (userTheme === "dark" || (!userTheme && systemTheme))
    document.documentElement.classList.add("dark");
}

function themeSwitch() {
  const { documentElement } = document;
  console.log(documentElement);
  if (documentElement.classList.contains("dark")) {
    documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  } else {
    documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }
}

themeBtn.addEventListener("click", () => themeSwitch());

// On load
themeCheck();

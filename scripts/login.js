const loginPage = document.getElementById("login-page");
const mainPage = document.getElementById("main-page");

const userInput = document.getElementById("user-input");
const passwordInput = document.getElementById("password-input");

const loginButton = document.getElementById("login-btn");

loginButton.addEventListener("click", function (e) {
  e.preventDefault();
  const user = userInput.value;
  const password = passwordInput.value;

  console.log(user, password);

  if (user === "admin" && password === "admin123") {
    loginPage.classList.add("hidden");
    mainPage.classList.remove("hidden");
  } else {
    alert("Wrong Credentials");
  }
});

// console.log(userInput);

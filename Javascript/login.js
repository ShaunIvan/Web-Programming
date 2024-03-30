// document.addEventListener("DOMContentLoaded", () => {
//   const loginbutton = document.getElementById("loginbutton");
//   loginbutton.addEventListener("click", login);
// });

// function login() {
//   const username = document.getElementById("username_input").value;
//   const password = document.getElementById("password_input").value;
//   const getUsername = sessionStorage.getItem("user_username");
//   const getPassword = sessionStorage.getItem("user_password");

//   if (username === "CSELEC03" && password === "webprog") {
//     sessionStorage.setItem("logged", true);
//     sessionStorage.setItem("user", username);
//     window.location.href = "./index.html";
//   } else if (getUsername === username && getPassword === password) {
//     sessionStorage.setItem("logged", true);
//     window.location.href = "./index.html";
//   } else {
//     alert("Invalid Username or password. Please try again");
//   }
// }

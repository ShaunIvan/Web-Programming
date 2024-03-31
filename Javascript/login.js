 document.addEventListener("DOMContentLoaded", () => {
   const loginbutton = document.getElementById("loginbutton");
   loginbutton.addEventListener("click", login);
 })

//  CHECKS USER CREDENTIALS
 function login() {
   const username = document.getElementById("username_input").value;
   const password = document.getElementById("password_input").value;
   const getUsername = sessionStorage.getItem("user_username");
   const getPassword = sessionStorage.getItem("user_password");
   const errorMessage = document.querySelector(".userError");
  errorMessage.innerHTML="";


   if (username === "CSELEC03" && password === "webprog") {
     sessionStorage.setItem("logged", true);
     sessionStorage.setItem("user", username);
     window.location.href = "./index.html";
   } else if (getUsername === username && getPassword === password) {
     sessionStorage.setItem("logged", true);
     window.location.href = "./index.html";
   } else {
     errorMessage.innerHTML =`
      <div> 
        <h1>Username Error</h1>
      </div>
    `;
    setTimeout(() => {
      errorMessage.innerHTML =``;
      errorMessage.style.display ="none";
    }, 1500);
   }
 }

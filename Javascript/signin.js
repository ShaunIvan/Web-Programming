// STORES USER CREDENTIALS TO THE SESSIONSTORAGE
function register() {
  const username = document.getElementById("username_input").value;
  const password = document.getElementById("password_input").value;
  const passwordrepeat = document.getElementById("repeat_password").value;

  if (username !== "CSELEC03") {
    if (username !== "") {
      if (password !== "") {
        if (passwordrepeat !== "") {
          if (password == passwordrepeat) {
            sessionStorage.setItem("user_username", username);
            sessionStorage.setItem("user_password", password);
            window.location.href = "./login_page.html";
          } else {
            alert("Password doesn't match up with repeat password");
          }
        } else {
          alert("Repeat Password is missing");
        }
      } else {
        alert("Password is missing");
      }
    } else {
      alert("Username is missing");
    }
  } else {
    alert("Username already exists!");
  }
}

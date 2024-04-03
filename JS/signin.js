// STORES USER CREDENTIALS TO THE SESSIONSTORAGE
function register() {
  const username = document.getElementById("username_input").value;
  const password = document.getElementById("password_input").value;
  const passwordrepeat = document.getElementById("repeat_password").value;
  const firstName = document.getElementById("first_Name").value;
  const lastName = document.getElementById("last_Name").value;
  const errorMessage = document.querySelector(".userError");
  errorMessage.innerHTML = "";

  if (username !== "CSELEC03") {
    if (username !== "") {
      if (password !== "") {
        if (passwordrepeat !== "") {
          if (firstName !== "") {
            if (lastName !== "") {
              if (password == passwordrepeat) {
                sessionStorage.setItem("user_username", username);
                sessionStorage.setItem("user_password", password);
                sessionStorage.setItem("first_Name", firstName);
                sessionStorage.setItem("last_Name", lastName);
                window.location.href = "./login_page.html";
              } else {
                errorMessage.innerHTML = `
                <div> 
                  <h1>Password does not match with repeat password</h1>
                </div>
              `;
                setTimeout(() => {
                  errorMessage.innerHTML = ``;
                  errorMessage.style.display = "none";
                }, 1500);
              }
            } else {
              errorMessage.innerHTML = `
                <div> 
                  <h1>Please Enter Your Last Name</h1>
                </div>
              `;
              setTimeout(() => {
                errorMessage.innerHTML = ``;
                errorMessage.style.display = "none";
              }, 1500);
            }
          } else {
            errorMessage.innerHTML = `
                <div> 
                  <h1>Please Enter Your First Name</h1>
                </div>
              `;
            setTimeout(() => {
              errorMessage.innerHTML = ``;
              errorMessage.style.display = "none";
            }, 1500);
          }
        } else {
          errorMessage.innerHTML = `
      <div> 
        <h1>Please Repeat your Password</h1>
      </div>
    `;
          setTimeout(() => {
            errorMessage.innerHTML = ``;
            errorMessage.style.display = "none";
          }, 1500);
        }
      } else {
        errorMessage.innerHTML = `
      <div> 
        <h1>Password is Missing</h1>
      </div>
    `;
        setTimeout(() => {
          errorMessage.innerHTML = ``;
          errorMessage.style.display = "none";
        }, 1500);
      }
    } else {
      errorMessage.innerHTML = `
      <div> 
        <h1>Username is missing</h1>
      </div>
    `;
      setTimeout(() => {
        errorMessage.innerHTML = ``;
        errorMessage.style.display = "none";
      }, 1500);
    }
  } else {
    errorMessage.innerHTML = `
      <div> 
        <h1>Username Already Exists</h1>
      </div>
    `;
    setTimeout(() => {
      errorMessage.innerHTML = ``;
      errorMessage.style.display = "none";
    }, 1500);
  }
}

document.addEventListener("DOMContentLoaded", () => {
    const loginbutton = document.getElementById("loginbutton");
    loginbutton.addEventListener("click", login);
    


})

function login()
{
    console.log('test');
    const username = document.getElementById("username_input").value
    const password = document.getElementById("password_input").value
    let userusername = sessionStorage.getItem("user_username");
    let userpassword = sessionStorage.getItem("user_password");


    if (username === "CSELEC03" && password === "webprog")
    {
        window.location.href = "./index.html"
        sessionStorage.setItem("logged", true)
    }
    
    else if (userusername == username, userpassword == password)
    {
        let userusername = sessionStorage.getItem("user_username");
        let userpassword = sessionStorage.getItem("user_password");
        window.location.href = "./index.html"
        sessionStorage.setItem("logged", true)
    }
    
    else 
    { 
        alert ("Invalid Username or password. Please try again")    
    }
    
}
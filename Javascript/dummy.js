document.addEventListener("DOMContentLoaded", () => {
  let logged = sessionStorage.getItem("logged");

  if (logged == "true")
  {
    alert(logged)
    sessionStorage.setItem("logged in", true)
  }
  else if (logged == "false"){
    
    alert("User not logged in, redirecting to login...")
    window.location.href = "./login_page.html"
  }

  sessionStorage.setItem("logged", false)
});


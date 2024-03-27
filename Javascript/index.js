function myFunction() {
    var addCartBtn = document.getElementsByClassName("addToCart");

    for (var i = 0; i < addCartBtn.length; i++) {
      addCartBtn[i].addEventListener("click", addToCart);
    }
  }

  function addToStorage() {
    
  }

function logout() {
    alert("Logged out successfully!")
}
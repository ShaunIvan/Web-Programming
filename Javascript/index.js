function myFunction() {
  var addCartBtn = document.getElementsByClassName("addToCart");

  for (var i = 0; i < addCartBtn.length; i++) {
    addCartBtn[i].addEventListener("click", addToCart);
  }
}

function addToCart(event) {
  var button = event.target;
  var parentContainer = button.parentElement;

  var itemImage = parentContainer.getElementsByClassName("item_image")[0].src;
  var itemName =
    parentContainer.getElementsByClassName("item_name")[0].textContent;
  var itemPrice =
    parentContainer.getElementsByClassName("item_price")[0].textContent;

  let itemDetails = {
    image: itemImage,
    name: itemName,
    price: itemPrice,
  };

  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  cartItems.push(itemDetails);

  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  var storedItem = localStorage.getItem("cartItems");
  var storedItemParse = JSON.parse(storedItem);

  console.log(storedItemParse);

}

function logout() {
  alert("Logged out successfully!");
}

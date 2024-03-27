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

  let product_items = JSON.parse(localStorage.getItem("product_items")) || [];

  product_items.push(itemDetails);

  localStorage.setItem("product_items", JSON.stringify(product_items));

  var storedItem = localStorage.getItem("product_items");
  var storedItemParse = JSON.parse(storedItem);

  console.log(storedItemParse);
}

function logout() {
  alert("Logged out successfully!");
}

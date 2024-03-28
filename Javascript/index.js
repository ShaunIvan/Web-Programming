function myFunction() {
  var addCartBtn = document.getElementsByClassName("addToCart");

  for (var i = 0; i < addCartBtn.length; i++) {
    addCartBtn[i].addEventListener("click", addToCart);
  }

  //anchor link array

  const searchButton = document.querySelector(".searchbox button");
  const searchInput = document.querySelector(".searchbox input");
  const items = document.querySelectorAll(".grid.product__container > div");

  function performSearch() {
    const searchText = searchInput.value.trim().toLowerCase();
    let searchMatchFound = false;

    items.forEach((item) => {
      // Search both in item names and categories
      const itemName = item
        .querySelector(".item_name")
        .textContent.trim()
        .toLowerCase();
      const itemCategory = item.querySelector(".category")
        ? item.querySelector(".category").textContent.trim().toLowerCase()
        : "";

      if (itemName.includes(searchText) || itemCategory.includes(searchText)) {
        item.style.display = "";
        searchMatchFound = true;
      } else {
        item.style.display = "none";
      }
    });
    if (!searchMatchFound) {
      items.forEach((item) => {
        item.style.display = "";
      });
    }
  }

  searchButton.addEventListener("click", performSearch);
  searchInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      performSearch();
    }
  });

  // Product Function

  function proceedToProduct(id) {
    var itemImage = document.querySelector(`#item${id} .item_image`).innerHTML;
    var itemName = document.querySelector(`#item${id} .item_name`).innerText;
    var itemPrice = document.querySelector(`#item${id} .item_price`).innerText;
    var encodedName = encodeURIComponent(itemName);
    var encodedPrice = encodeURIComponent(itemPrice);

    window.location.href = 'product_page.html?name=${encodeName}&price=${encodePrice}';
  }

  
  // End of Product Funtion
}

function addToCart(event) {
  var button = event.target;
  var parentContainer = button.closest(".item-style");

  var itemImage = parentContainer.querySelector(".item_image").src;
  var itemName = parentContainer.querySelector(".item_name").textContent;
  var itemPrice = parentContainer.querySelector(".item_price").textContent;

  var dataPrice = parentContainer
    .querySelector(".item_price")
    .getAttribute("data-price");

  let itemDetails = {
    image: itemImage,
    name: itemName,
    price: itemPrice,
    dataP: dataPrice,
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
  console.log(window.Function);
}

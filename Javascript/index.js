function myFunction() {
  var addCartBtn = document.getElementsByClassName("addToCart");
  var productLink = document.getElementsByClassName("productlink");

  for (var i = 0; i < productLink.length; i++) {
    productLink[i].addEventListener("click", nextPage);
  }

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
        .textContent.toLowerCase();

      const itemCategory = item.querySelector(".category")
        ? item.querySelector(".category").textContent.toLowerCase()
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
      event.preventDefault();
      performSearch();
    }
  });
}

function nextPage(event) {
  event.preventDefault(); // Prevent the default anchor action
  var parentContainer = event.target.closest(".item-style");

  var itemDetails = {
    image: parentContainer.querySelector(".item_image").src,
    name: parentContainer.querySelector(".item_name").textContent,
    price: parentContainer.querySelector(".item_price").textContent,
    details: parentContainer.querySelector(".item_details")
      ? parentContainer.querySelector(".item_details").textContent
      : "",
  };

  localStorage.setItem("productItem", JSON.stringify(itemDetails));

  // Navigate to the product page
  window.location.href = "product_page.html";
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

function login() {
  const userlogged = sessionStorage.getItem("logged");
  const isUser = sessionStorage.getItem("user");

  if (userlogged && isUser) {
    return true;
  } else {
    return false;
  }
}

if (login()) {
  alert("You are Logged in");
} else {
  window.location.href = "./login_page.html";
}

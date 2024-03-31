function myFunction() {
  isLogged();
  imageSlider();
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
  const productContainer = document.querySelector(".product__container");

  function performSearch() {
    const searchText = searchInput.value.trim().toLowerCase();
    let searchMatchFound = false;
    let searchMatchCount = 0;

    items.forEach((item) => {
      const itemName = item
        .querySelector(".item_name")
        .textContent.toLowerCase(); // Adjust selector as needed
      const itemCategory = item.querySelector(".category")
        ? item.querySelector(".category").textContent.toLowerCase()
        : "";
      if (
        itemName.includes(searchText.toLowerCase()) ||
        itemCategory.includes(searchText.toLowerCase())
      ) {
        searchMatchCount += 1;
        console.log(searchMatchCount);
      }
    });

    if (searchMatchCount <= 2) {
      productContainer.style.gridTemplateColumns = "repeat(2, auto)";
    } else {
      productContainer.style.gridTemplateColumns = "";
    }
    if (searchMatchCount <= 3) {
      productContainer.style.gridTemplateColumns = "repeat(3, auto)";
    } else {
      productContainer.style.gridTemplateColumns = "";
    }

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

        if (searchMatchCount <= 2) {
          item.style.margin = "0 auto";
          item.style.width = "400px";
        } else {
          item.style.margin = "";
          item.style.width = "";
        }
        if (searchMatchCount <= 3) {
          item.style.margin = "0 auto";
          item.style.width = "300px";
        } else {
          item.style.margin = "";
          item.style.width = "";
        }
      } else {
        item.style.display = "none";
      }
    });

    if (!searchMatchFound) {
      items.forEach((item) => {
        item.style.display = "";
      });

      productContainer.style.gridTemplateColumns = "";
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

function imageSlider() {
  var counter = 1;
  setInterval(function () {
    document.getElementById("radio" + counter).checked = true;
    counter++;

    if (counter > 3) {
      counter = 1;
    }
  }, 5000);
}

function isLogged() {
  let logged = sessionStorage.getItem("logged");

  if (logged == "true") {
    sessionStorage.setItem("logged", true);
  } else if (logged == "false") {
    alert("User not logged in, redirecting to login...");
    window.location.href = "./login_page.html";
  } else {
    alert("User not logged in for the first time, redirecting to login...");
    window.location.href = "./login_page.html";
  }
}

function logoutinstant() {
  let logged = sessionStorage.getItem("logged");
  sessionStorage.setItem("logged", false);
  window.location.reload();
}

function nextPage(event) {
  event.preventDefault(); // Prevent the default anchor action
  var parentContainer = event.target.closest(".product__card");

  var itemDetails = {
    image: parentContainer.querySelector(".item_image").src,
    name: parentContainer.querySelector(".item_name").textContent,
    price: parentContainer.querySelector(".item_price").textContent,
    details: parentContainer.querySelector(".item_details")
      ? parentContainer.querySelector(".item_details").textContent
      : "",
    dataP: parentContainer
      .querySelector(".item_price")
      .getAttribute("data-price"),
  };

  localStorage.setItem("productItem", JSON.stringify(itemDetails));

  // Navigate to the product page
  window.location.href = "product_page.html";
}

function addToCart(event) {
  var button = event.target;
  var parentContainer = button.closest(".product__card");

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

  let product_items = JSON.parse(sessionStorage.getItem("product_items")) || [];

  product_items.push(itemDetails);

  sessionStorage.setItem("product_items", JSON.stringify(product_items));

  var storedItem = sessionStorage.getItem("product_items");
  var storedItemParse = JSON.parse(storedItem);

  console.log(storedItemParse);
}

// function logout() {
//   alert("Logged out successfully!");
//   console.log(window.Function);
// }

// function login() {
//   const userlogged = sessionStorage.getItem("logged");
//   const isUser = sessionStorage.getItem("user");

//   if (userlogged && isUser) {
//     return true;
//   } else {
//     return false;
//   }
// }

// if (login()) {
//   alert("You are Logged in");
// } else {
//   window.location.href = "./login_page.html";
// }

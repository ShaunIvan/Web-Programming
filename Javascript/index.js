function myFunction() {
  isLogged();
  updateCart();
  imageSlider();
  var addCartBtn = document.getElementsByClassName("addToCart");
  var productLink = document.getElementsByClassName("productlink");

  // CART BUTTON
  const confirmPop = document.querySelector(".confirmPop");
  const cartButton = document.getElementById("cart__button");
  const cartContainer = document.querySelector(".modal__cart_container");

  cartButton.addEventListener("click", () => {
    cartContainer.classList.toggle("open");
    confirmPop.innerHTML = "";
  });
  //ANCHOR LINK ARRAY
  for (var i = 0; i < productLink.length; i++) {
    productLink[i].addEventListener("click", nextPage);
  }
  // BUTTON ARRAY
  for (var i = 0; i < addCartBtn.length; i++) {
    addCartBtn[i].addEventListener("click", addToCart);
  }
  // PROCEED CHECKOUT BTN
  const proceedButton = document.getElementById("checkoutbtn");
  proceedButton.addEventListener("click", proceedCheckOut);

  // SEARCH FUNCTION
  const searchButton = document.querySelector(".searchbox button");
  const searchInput = document.querySelector(".searchbox input");
  const items = document.querySelectorAll(".grid.product__container > div");
  const productContainer = document.querySelector(".product__container");

  function performSearch() {
    const searchText = searchInput.value.trim().toLowerCase();
    let searchMatchFound = false;
    let searchMatchCount = 0;

    // CHANGES GRID COLUMNS ON SEARCH
    items.forEach((item) => {
      const itemName = item
        .querySelector(".item_name")
        .textContent.toLowerCase();
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
    } else if (searchMatchCount <= 3) {
      productContainer.style.gridTemplateColumns = "repeat(3, auto)";
    } else {
      productContainer.style.gridTemplateColumns = "";
    }

    // SEARCH AND DISPLAY SEARCHED ITEMS
    items.forEach((item) => {
      // SEARCH ITEM NAMES AND CATEGORIES
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
        } else if (searchMatchCount <= 3) {
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

  // PERFORM SEARCH IF USER IS IN THE PRODUCT PAGE

  const searchQuery = sessionStorage.getItem("searchQuery");

  if (searchQuery) {
    const searchInput = document.querySelector(".searchbox input");
    searchInput.value = searchQuery;
    sessionStorage.removeItem("searchQuery");

    performSearch();
  }
}

// IMAGE SLIDER AUTOMATIC
function imageSlider() {
  var counter = 2;
  setInterval(function () {
    document.getElementById("radio" + counter).checked = true;
    counter++;

    if (counter > 3) {
      counter = 1;
    }
  }, 5000);
}

// CHECKS IF USER IS LOGGED IN
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

// USER LOGOUT
function logoutinstant() {
  sessionStorage.setItem("logged", false);
  window.location.href = "login_page.html";
}

// NEXT PAGE REDIRECT
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
    itemList: parentContainer.querySelector(".list_ItemDetails").innerHTML,
  };

  localStorage.setItem("productItem", JSON.stringify(itemDetails));

  // Navigate to the product page
  window.location.href = "product_page.html";
}

// ADD TO CART FUNCTION
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
  updateCart();
}

// UPDATE CART

function updateCart() {
  const cartContainer = document.querySelector(".cart__container");
  const items = JSON.parse(sessionStorage.getItem("product_items")) || [];

  cartContainer.innerHTML = "";

  // DISPLAYS EACH PRODUCT FROM THE SESSIONSTORAGE
  items.forEach((item, index) => {
    const itemElement = document.createElement("div");
    itemElement.classList.add("cart__items");
    itemElement.innerHTML = `
                <input type="checkbox" class="select-item"/>
                <img src="${item.image}" alt="" class="product__image" />
                <p class="item__name">${item.name}</p>
                <div class="price--delete">
                    <p class="product__price" data-price="${item.dataP}">${item.price}</p>
                    <button class="deletebtn">
                    <img class="deletebtn-img" src="./IMG/trashbin.png" alt="" />
                    </button>
                </div>
                <label for="item__quantity">Quantity:</label>
                <input type="number" min="1" value="1" class="item__quantity" />
            `;
    cartContainer.appendChild(itemElement);
    itemElement
      .querySelector(".deletebtn")
      .addEventListener("click", function () {
        showDeletePrompt(index);
      });
  });

  checkboxAndQuantity();
  commandDelete();
  updateCartTotal();
}

// UPDATES THE TOTAL PRICE OF THE ITEMS
function updateCartTotal() {
  const cartItems = document.querySelectorAll(".cart__items");
  let subtotal = 0;
  let total = 0;
  let shippingTotal = 0;
  let itemCheckOutQty = 0;

  cartItems.forEach((item) => {
    const isChecked = item.querySelector(".select-item").checked;
    if (isChecked) {
      const quantity = parseInt(item.querySelector(".item__quantity").value);
      const price = parseFloat(
        item.querySelector(".product__price").getAttribute("data-price")
      );

      itemCheckOutQty += quantity;
      shippingTotal += 160;
      subtotal += price * quantity;
      total += shippingTotal + price * quantity;
    }
  });

  // FORMATS THE PRICE
  const subTotalFormat = new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  }).format(subtotal);

  const shippingTotalFormat = new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  }).format(shippingTotal);

  const totalFormat = new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  }).format(total);

  document.getElementById("cartTotal").textContent = subTotalFormat;
  document.getElementById("shippingFee").textContent = shippingTotalFormat;
  document.getElementById("totalPrice").textContent = totalFormat;
  document
    .querySelectorAll(".itemQty")
    .forEach((el) => (el.textContent = itemCheckOutQty));
}

// CHECKS THE CHECKBOXES AND QUANTITY
function checkboxAndQuantity() {
  const itemCheckBox = document.querySelectorAll(".select-item");
  const quantity = document.querySelectorAll(".item__quantity");
  const selectAll = document.getElementById("selectAll");

  itemCheckBox.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      if (!this.checked) {
        selectAll.checked = false;
      } else {
        selectAll.checked = Array.from(itemCheckBox).every((c) => c.checked);
      }
      updateCartTotal();
    });
  });

  selectAll.addEventListener("change", function () {
    itemCheckBox.forEach((checkbox) => {
      checkbox.checked = this.checked;
    });
    updateCartTotal();
  });

  quantity.forEach((input) => {
    input.addEventListener("change", updateCartTotal);
  });

  updateCartTotal();
}

// SHOWS A DELETE PROMPT UPON CLICKING DELETE
function showDeletePrompt(index) {
  const confirmPop = document.querySelector(".confirmPop");
  confirmPop.innerHTML = `
        <div class='confirmation'>
            <h1>Remove From Checkout?</h1>
            <p>Item(s) will be removed from order</p>
            <div class="button_container">
                <button class="cancelBtn">Cancel</button>
                <button class="removeBtn">Remove</button>
            </div>
        </div>
    `;

  document.querySelector(".removeBtn").addEventListener("click", function () {
    removeItem(index);
  });

  document.querySelector(".cancelBtn").addEventListener("click", function () {
    confirmPop.innerHTML = "";
  });
}

// REMOVES ITEM FROM THE CART AND SESSIONSTORAGE
function removeItem(index) {
  let items = JSON.parse(sessionStorage.getItem("product_items")) || [];
  items.splice(index, 1);
  sessionStorage.setItem("product_items", JSON.stringify(items));

  const modalOverlay = document.getElementById("modalOverlay");
  modalOverlay.style.display = "none";
  document.querySelector(".confirmPop").innerHTML = "";
  updateCart();
}

// NEEDS TO CHECK IF THE ITEM IS SELECTED TO DELETE
function commandDelete() {
  const deleteAllBtn = document.querySelector(".command_deleteBtn");
  deleteAllBtn.addEventListener("click", deleteSelected);
}

// SHOWS PROMPTS OF THE SELECTED ITEMS FOR DELETION AND REMOVES ITEMS FROM SESSIONSTORAGE
function deleteSelected() {
  const checkedItem = document.querySelectorAll(
    ".cart__items .select-item:checked"
  );
  const modalOverlay = document.getElementById("modalOverlay");
  modalOverlay.style.display = "block";
  const confirmPop = document.querySelector(".confirmPop");
  if (checkedItem.length === 0) {
    confirmPop.innerHTML = `
        <div class='confirmation errorDelete'>
            <p>Please Select An Item to Delete</p>
        </div>
    `;
    setTimeout(() => {
      confirmPop.innerHTML = "";
      modalOverlay.style.display = "none";
    }, 1500);
    return;
  } else {
    // Show confirmation dialog for deletion
    confirmPop.innerHTML = `
      <div class='confirmation selected_confirm'>
          <h1>Remove Selected Items From Checkout?</h1>
          <p>The selected items will be removed from your order.</p>
          <div class="button_container">
              <button class="cancelBtn">Cancel</button>
              <button class="removeBtn">Remove</button>
          </div>
      </div>
    `;
    modalOverlay.style.display = "block";

    document.querySelector(".cancelBtn").addEventListener("click", function () {
      confirmPop.innerHTML = "";
      modalOverlay.style.display = "none";
    });

    document.querySelector(".removeBtn").addEventListener("click", function () {
      const items = JSON.parse(sessionStorage.getItem("product_items")) || [];
      // Filter out the items that are not checked, to keep them
      const newItems = items.filter(
        (_, index) =>
          !document.querySelectorAll(".cart__items .select-item")[index].checked
      );

      sessionStorage.setItem("product_items", JSON.stringify(newItems));
      confirmPop.innerHTML = ""; // Clear confirmation dialog
      modalOverlay.style.display = "none"; // Hide overlay
      updateCart(); // Re-render the cart items
    });
  }
}

function proceedCheckOut() {
  const noItemPop = document.querySelector(".noItemPop");
  const cartItems = document.querySelectorAll(".cart__items");
  const items = JSON.parse(sessionStorage.getItem("product_items")) || [];
  let confirmedItems = [];

  cartItems.forEach((item, index) => {
    const isChecked = item.querySelector(".select-item").checked;
    if (isChecked) {
      const itemImage = item.querySelector(".product__image").src;
      const itemName = item.querySelector(".item__name").textContent;
      const quantity = parseInt(item.querySelector(".item__quantity").value);
      const itemPrice = item.querySelector(".product__price").textContent;
      const dPrice = parseFloat(
        item.querySelector(".product__price").getAttribute("data-price")
      );

      confirmedItems.push({
        itemName: itemName,
        itemImg: itemImage,
        itemQty: quantity,
        itemPrice: itemPrice,
        itemDataP: dPrice,
      });

      items.splice(index - confirmedItems.length + 1, 1);
    }
  });

  sessionStorage.setItem("product_items", JSON.stringify(items));
  if (confirmedItems.length > 0) {
    sessionStorage.setItem("confirmedItems", JSON.stringify(confirmedItems));
    window.location.href = "order_form_page.html";
  } else {
    noItemPop.innerHTML = `
        <div class='confirmation errorSelectItem'>
            <p>Please Select An Item to purchase</p>
        </div>
    `;
    setTimeout(() => {
      noItemPop.innerHTML = "";
    }, 1500);
    return;
  }
  updateCart();
}

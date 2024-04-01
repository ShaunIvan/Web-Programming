document.addEventListener("DOMContentLoaded", () => {
  updateCart();

  const cartButton = document.getElementById("cartbtn");
  const cartContainer = document.querySelector(".modal__cart_container");

  cartButton.addEventListener("click", () => {
    cartContainer.classList.toggle("open");
  });

  // ADD TO CART FUNCTION
  const addCart = document.querySelector(".addToCart");
  addCart.addEventListener("click", addToCart);

  // PROCEED CHECKOUT BTN
  const proceedButton = document.getElementById("checkout");
  proceedButton.addEventListener("click", proceedCheckOut);

  productLoad();

  // REDIRECTS THE USER TO THE INDEX TO SEARCH THE PRODUCT
  const searchInput = document.querySelector('.searchbox input');
  const searchButton = document.querySelector(".searchbox button");

  function searchItem(){
    const searchText = searchInput.value.trim().toLowerCase();
    if(searchText){
      sessionStorage.setItem('searchQuery', searchText);

      window.location.href = 'index.html';
    }
  }

  searchButton.addEventListener('click', searchItem);
  searchInput.addEventListener('keypress', function(event){
    if(event.key === "Enter"){
      searchItem();
    }
  });
  
});

// LOADS THE PRODUCT
function productLoad() {
  const productDetails = JSON.parse(localStorage.getItem("productItem"));

  // TAKES ALL PRODUCT DETAILS
  if (productDetails) {
    document.querySelector(".item_image").src = productDetails.image;
    document.querySelector(".item_name").textContent = productDetails.name;
    document.querySelector(".item_price").textContent = productDetails.price;
    document.querySelector(".item_price").dataset.price = productDetails.dataP;
    document.querySelector(".item_details").textContent =
      productDetails.details;
    productDetails.details || "No additional details available.";
    document.querySelector(".list_details").innerHTML = productDetails.itemList;
  } else {
    console.log("No product details found in localStorage.");
  }
}

// ADD TO CART FUNCTION
function addToCart(event) {
  var button = event.target;
  var parentContainer = button.closest(".product__item");

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
  const modalOverlay = document.getElementById("modalOverlay");
  modalOverlay.style.display = "block";

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
    modalOverlay.style.display = "none";
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

// PROCEEDS THE USER TO THE ORDER CONFIRM PAGE
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

function logoutinstant() {
  sessionStorage.setItem("logged", false);
  window.location.href = "login_page.html";
}


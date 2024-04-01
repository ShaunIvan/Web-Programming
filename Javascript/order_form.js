document.addEventListener("DOMContentLoaded", () => {
  orderInvoice();
  userDetailsLoad();

  //CANCELS PURCHASE
  const cancelPurchase = document.getElementById("cancelPurchase");
  cancelPurchase.addEventListener("click", cancelBuy);

  const proceedButton = document.getElementById("place_Order");
  proceedButton.addEventListener("click", proceedCheckOut);
});

function orderInvoice() {
  const orderContainer = document.querySelector(".cart__container");
  const cartItems = JSON.parse(sessionStorage.getItem("confirmedItems"));

  orderContainer.innerHTML = "";

  cartItems.forEach((items) => {
    const itemElement = document.createElement("div");
    itemElement.classList.add("cart__items");
    itemElement.innerHTML = `
            <img src="${items.itemImg}" alt="" class="product__image" />
            <p class="item__name">${items.itemName}</p>
            <div class="price--delete">
                <p class="product__price" data-price="${items.itemDataP}">${items.itemPrice}</p>
            </div>
            <label for="item__quantity">Quantity:</label>
            <input class="item__quantity" value="${items.itemQty}" readonly/>
        `;
    orderContainer.appendChild(itemElement);
  });
  updateCartTotal();
}

function cancelBuy() {
  sessionStorage.removeItem("confirmedItems");
  window.location.href = "index.html";
}

function updateCartTotal() {
  const cartItems = document.querySelectorAll(".cart__items");
  let subtotal = 0;
  let total = 0;
  let shippingTotal = 0;
  let itemCheckOutQty = 0;

  cartItems.forEach((item) => {
    const quantity = parseInt(item.querySelector(".item__quantity").value);
    const price = parseFloat(
      item.querySelector(".product__price").getAttribute("data-price")
    );

    itemCheckOutQty += quantity;
    shippingTotal += 160;
    subtotal += price * quantity;
    total += shippingTotal + price * quantity;
  });

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

function orderInvoice() {
  const orderContainer = document.querySelector(".cart__container");
  const cartItems = JSON.parse(sessionStorage.getItem("confirmedItems"));

  orderContainer.innerHTML = "";

  cartItems.forEach((items) => {
    const itemElement = document.createElement("div");
    itemElement.classList.add("cart__items");
    itemElement.innerHTML = `
            <img src="${items.itemImg}" alt="" class="product__image" />
            <p class="item__name">${items.itemName}</p>
            <div class="price--delete">
                <p class="product__price" data-price="${items.itemDataP}">${items.itemPrice}</p>
            </div>
            <label for="item__quantity">Quantity:</label>
            <input class="item__quantity" value="${items.itemQty}" readonly/>
        `;
    orderContainer.appendChild(itemElement);
  });
  updateCartTotal();
}

// NAME PRELOAD

function userDetailsLoad() {
  const firstName = sessionStorage.getItem("first_Name");
  const lastName = sessionStorage.getItem("last_Name");
  if (firstName) {
    document.getElementById("firstName").value = firstName;
  }
  if (lastName) {
    document.getElementById("lastName").value = lastName;
  }
}

// CHECKS IF SHIPPING DETAILS HAVE BEEN FILLED
function shippingDetails() {
  const fname = document.getElementById("firstName").value.trim();
  const lname = document.getElementById("lastName").value.trim();
  const phoneNum = document.getElementById("mobile__number").value.trim();
  const emailAd = document.getElementById("email__address").value.trim();
  const houseAd = document.getElementById("house__address").value.trim();
  const provinceAd = document.getElementById("province").value.trim();
  const cityAd = document.getElementById("user__city").value.trim();
  const barangAd = document.getElementById("user__barangay").value.trim();
  if (
    fname &&
    lname &&
    phoneNum &&
    emailAd &&
    houseAd &&
    provinceAd &&
    cityAd &&
    barangAd
  ) {
    sessionStorage.setItem(
      "shippingDetails",
      JSON.stringify({
        fname,
        lname,
        phoneNum,
        emailAd,
        houseAd,
        provinceAd,
        cityAd,
        barangAd,
      })
    );
    return true;
  }
}

// STORES ALL SELECTED ITEMS WHEN CHECKOUT BUTTON IS
// CLICKED TO THE SESSION STORAGE AND REDIRECTS TO THE ORDER CONFIRMATION PAGE
function proceedCheckOut() {
  const shippingPop = document.querySelector(".shippingPop");
  if (!shippingDetails()) {
    shippingPop.innerHTML = `
        <div class='confirmation errorShippingDetails'>
            <p>Please Fill the Shipping Details</p>
        </div>
    `;
    setTimeout(() => {
      shippingPop.innerHTML = "";
    }, 1500);
    return false;
  } else {
    window.location.href = "order_confirm_page.html";
  }

  updateCart();
}

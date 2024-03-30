document.addEventListener("DOMContentLoaded", () => {
  orderShippingConfirmed();
  orderInvoice();
});

function orderShippingConfirmed() {
  const users = JSON.parse(localStorage.getItem("shippingDetails"));
  if (users) {
    document.getElementById("fullname").textContent =
      users.fname + " " + users.lname || "No name provided";
    document.getElementById("address").textContent =
      users.houseAd || "No address provided";

    document.getElementById("user_fullname").textContent =
      users.fname + " " + users.lname || "No name provided";
    document.getElementById("user_Address").textContent =
      users.houseAd +
        " " +
        users.provinceAd +
        " " +
        users.cityAd +
        " " +
        users.barangAd || "No Address provided";
    document.getElementById("user_PhoneNum").textContent =
      users.phoneNum || "No mobile number provided";
    document.getElementById("user_Email").textContent =
      users.emailAd || "No email provided";
  }

  const item = JSON.parse(localStorage.getItem("confirmedItems"));
}

function orderInvoice() {
  const orderContainer = document.querySelector(".ordered_items");
  const cartItems = JSON.parse(localStorage.getItem("confirmedItems"));

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
            <input class="item__quantity" value="${items.itemQty}" readonly/>
        `;
    orderContainer.appendChild(itemElement);
  });
  updateCartTotal();
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

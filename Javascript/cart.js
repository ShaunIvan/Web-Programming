document.addEventListener("DOMContentLoaded", () => {
  updateCart();
});

function updateCart() {
  const cartContainer = document.querySelector(".cart__container");
  const items = JSON.parse(localStorage.getItem("product_items")) || [];

  cartContainer.innerHTML = "";

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
  updateCartTotal();
}

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

function removeItem(index) {
  let items = JSON.parse(localStorage.getItem("product_items")) || [];
  items.splice(index, 1);
  localStorage.setItem("product_items", JSON.stringify(items));

  const modalOverlay = document.getElementById("modalOverlay");
  modalOverlay.style.display = "none";
  document.querySelector(".confirmPop").innerHTML = "";
  updateCart();
}
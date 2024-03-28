document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.querySelector(".cart__container");
  const items = JSON.parse(localStorage.getItem("product_items")) || [];

  cartContainer.innerHTML = "";

  items.forEach((item) => {
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
  });
});

function updateCartTotal() {
  const cartItems = document.querySelectorAll(".cart__items");
  let total = 0;

  cartItems.forEach((item) => {
    const isChecked = item.querySelector(".select-item").checked;
    if (isChecked) {
      const quantity = item.querySelector(".item__quantity").value;
      const price = parseFloat(
        item.querySelector(".product__price").getAttribute("data-price")
      );
      total += price * quantity;
    }
  });

  const totalFormat = new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  }).format(total);

  document.getElementById("cartTotal").textContent = totalFormat;
}

document.addEventListener("DOMContentLoaded", () => {
  const select_product = document.querySelectorAll(".select-item");
  const quantity = document.querySelectorAll(".item__quantity");

  select_product.forEach((checkbox) => {
    checkbox.addEventListener("change", updateCartTotal);
  });

  quantity.forEach((input) => {
    input.addEventListener("change", updateCartTotal);
  });

  updateCartTotal();
});

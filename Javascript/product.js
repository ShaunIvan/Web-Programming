document.addEventListener("DOMContentLoaded", () => {
  // const productDetails = JSON.parse(localStorage.getItem("productItem"));

  // if (productDetails) {
  //   document.querySelector(".item_image").src = productDetails.image;
  //   document.querySelector(".item_name").textContent = productDetails.name;
  //   document.querySelector(".item_price").textContent = productDetails.price;
  //   // Assuming you have a place to show the detailed description
  //   document.querySelector(".item_details").textContent = productDetails.details;

  //     productDetails.details || "No additional details available.";
  // } else {
  //   console.log("No product details found in localStorage.");
  // }
  const addCart = document.querySelector(".addToCart");
  addCart.addEventListener("click", addToCart);

  productLoad();
});

function productLoad() {
  const productDetails = JSON.parse(localStorage.getItem("productItem"));

  if (productDetails) {
    document.querySelector(".item_image").src = productDetails.image;
    document.querySelector(".item_name").textContent = productDetails.name;
    document.querySelector(".item_price").textContent = productDetails.price;
    document.querySelector(".item_price").dataset.price = productDetails.dataP;
    // Assuming you have a place to show the detailed description
    document.querySelector(".item_details").textContent =
      productDetails.details;

    productDetails.details || "No additional details available.";
  } else {
    console.log("No product details found in localStorage.");
  }
}

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

  let product_items = JSON.parse(localStorage.getItem("product_items")) || [];

  product_items.push(itemDetails);

  localStorage.setItem("product_items", JSON.stringify(product_items));

  var storedItem = localStorage.getItem("product_items");
  var storedItemParse = JSON.parse(storedItem);

  console.log(storedItemParse);
}

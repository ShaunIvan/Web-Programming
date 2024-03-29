document.addEventListener("DOMContentLoaded", () => {
  const productDetails = JSON.parse(localStorage.getItem("productItem"));

  if (productDetails) {
    document.querySelector(".item_image").src = productDetails.image;
    document.querySelector(".item_name").textContent = productDetails.name;
    document.querySelector(".item_price").textContent = productDetails.price;
    // Assuming you have a place to show the detailed description
    document.querySelector(".item_description").textContent =
      productDetails.details || "No additional details available.";
  } else {
    console.log("No product details found in localStorage.");
  }
});

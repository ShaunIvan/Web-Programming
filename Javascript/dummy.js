document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const name = urlParams.get("name");
  const price = urlParams.get("price");
  const image = urlParams.get("image");

  document.querySelector(".item_name").textContent = decodeURIComponent(name);
  document.querySelector(".item_price").textContent = `₱ ${parseFloat(
    decodeURIComponent(price)
  ).toFixed(2)}`;
  document.querySelector(".item_image").src = decodeURIComponent(image);
});


// Product Function

  //  document.querySelectorAll('.product'),forEach(item => {
  //    item.addEventListener('click', () => {
  //      localStorage.setItem('item_image', item.getAttribute('date-image'));
  //      localStorage.setItem('item_name', item.getAttribute('date-name'));
  //      localStorage.setItem('item_price' item.getAttribute('data-price'));
  //      window.location.href = 'product_page.html';
  //    })
  //  })

  //  function proceedToProductPage(itemId) {
  //    const productContainer = document.getElementById(`item${itemId}`);
  //    const itemImage = productContainer.querySelector(".item_image").src;
  //    const itemName = productContainer.querySelector(".item_name").textContent;
  //    const itemPrice = productContainer.querySelector(".item_price").textContent
  //    window.location.href = `product_page.html?name=${encodeURIComponent(
  //      itemName
  //    )}&price=${encodeURIComponent(itemPrice)}&image=${encodeURIComponent(
  //      itemImage
  //    )}`;
  //  }

  // End of Product Funtion
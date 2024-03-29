document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const name = urlParams.get('name');
  const price = urlParams.get('price');
  const image = urlParams.get('image');

  document.querySelector(".item_name").textContent = decodeURLComponent(name);
  document.querySelector(".item_price").textContent = `₱ ${parseFloat(decodeURLComponent(price)).toFixed(2)}`;
  document.querySelector(".item_image").src = decodeURLComponent(image);
});
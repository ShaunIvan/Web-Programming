function myFunction() {
  var openProduct = document.getElementsByClassName(container1);
}

function openProductPage(productName) {
  window.location.href =
    "product_page.html?product=" + encodeURLComponent(productname);
}

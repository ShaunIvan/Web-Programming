  document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const price = urlParams.get('price');
    const image = urlParams.get('image')
    document.querySelector(".item_name").textContent = decodeURLComponent(name).innerHTML=localStorage.getItem("textvalue");
    document.querySelector(".item_price").textContent = `₱ ${parseFloat(decodeURLComponent(price)).toFixed(2)}`;
    document.querySelector(".item_image").src = decodeURLComponent(image);
  });

// document.addEventListener('DOMContentLoaded', function() {
//   const dataElement = document.getElementById('item_image');

//   // Get the data from localStorage
//   const storedData = localStorage.getItem('myData');

//   // Display the data in the HTML
//   if (storedData) {
//       dataElement.innerText = storedData;
//   } else {
//       dataElement.innerText = 'No data found in localStorage';
//   }
// });
/* global Product, Cart */

"use strict";

// Set up an empty cart for use on this page.
var cart = new Cart([]);

// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {
  //TODO: Add an <option> tag inside the form's select for each product
  var selectElement = document.getElementById("items");
  for (var i in Product.allProducts) {
    var option = document.createElement("option");
    option.setAttribute("value", Product.allProducts[i].name);
    option.textContent = Product.allProducts[i].name;
    selectElement.appendChild(option);
  }
}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit() {
  // TODO: Prevent the page from reloading
  event.preventDefault();
  var inputNumber = document.querySelector("input[type='number']");
  var valueOfQuntity = inputNumber.value;
  var selectedTag = document.querySelector("select");
  var valueOfProduct = selectedTag.options[selectedTag.selectedIndex].value;
  for (var i = 0; i < Product.allProducts.length; i++) {
    if (valueOfProduct == Product.allProducts[i].name) {
      var filePath = Product.allProducts[i].filePath;
      break;
    }
  }
  // Do all the things ...
  addSelectedItemToCart(valueOfProduct, valueOfQuntity, filePath);
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();
  inputNumber.value = "";
}

// TODO: Add the selected item and quantity to the cart
function addSelectedItemToCart(product, quantity, image) {
  // TODO: suss out the item picked from the select list
  // TODO: get the quantity
  // TODO: using those, add one item to the Cart
  cart.addItem(product, quantity, image);
}

// TODO: Update the cart count in the header nav with the number of items in the Cart
function updateCounter() {
  var jsonParse = JSON.parse(localStorage.getItem("items"));
  var countNumer = document.getElementById("itemCount");
  countNumer.textContent = jsonParse.length;
}

// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  var cartContent = document.getElementById("cartContents");
  cartContent.innerHTML = "";
  var comfirmPara = document.createElement("p");
  comfirmPara.setAttribute("id", "comfirm");
  comfirmPara.textContent = "your order has been added";
  cartContent.innerHTML = "";
  var table = document.createElement("table");
  var row = document.createElement("tr");
  row.appendChild(comfirmPara);
  table.appendChild(row);
  row = document.createElement("tr");
  var td = document.createElement("td");
  td.textContent = "Product Name";
  row.appendChild(td);
  td = document.createElement("td");
  td.textContent = "Product Quntity";
  row.appendChild(td);
  table.appendChild(row);
  for (var i = 0; i < cart.items.length; i++) {
    row = document.createElement("tr");
    td = document.createElement("td");
    td.textContent = cart.items[i].product;
    row.appendChild(td);
    td = document.createElement("td");
    td.textContent = cart.items[i].quantity;
    row.appendChild(td);
    table.appendChild(row);
  }
  cartContent.appendChild(table);
  // TODO: Get the item and quantity from the form
  // TODO: Add a new element to the cartContents div with that information
}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
var catalogForm = document.getElementById("catalog");
catalogForm.addEventListener("submit", handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();

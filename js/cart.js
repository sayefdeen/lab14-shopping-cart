/* global Cart */
"use strict";

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
var table = document.getElementById("cart");

table.addEventListener("click", removeItemFromCart);
var cart;
var tableContent = document.querySelector("tbody");
var theadRow = document.querySelector("thead tr");
var picture = (theadRow.insertCell(-1).outerHTML = `<th>Picture</th>`);

function loadCart() {
  var cartItems = JSON.parse(localStorage.getItem("items")) || [];
  cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  tableContent.innerHTML = "";
}

// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {
  for (let index = 0; index < cart.items.length; index++) {
    var row = document.createElement("tr");
    var td = document.createElement("td");
    var button = document.createElement("button");
    button.setAttribute("class", cart.items[index].product + "@" + index);
    button.innerText = "delete";
    td.appendChild(button);
    row.appendChild(td);
    td = document.createElement("td");
    td.textContent = cart.items[index].quantity;
    row.appendChild(td);
    td = document.createElement("td");
    td.textContent = cart.items[index].product;
    row.appendChild(td);
    td = document.createElement("td");
    td.innerHTML = `<img src="../${cart.items[index].image}"/>`;
    row.appendChild(td);
    tableContent.appendChild(row);
  }
  // TODO: Find the table body

  // TODO: Iterate over the items in the cart
  // TODO: Create a TR
  // TODO: Create a TD for the delete link, quantity,  and the item
  // TODO: Add the TR to the TBODY and each of the TD's to the TR
}

function removeItemFromCart() {
  var targetClicked = event.target;
  if (targetClicked.innerText == "delete") {
    var productClassName = targetClicked.classList[0];
    var productIndex = productClassName.split("@")[1];
    cart.removeItem(productIndex);
  }
  renderCart();
}
// clickHandler();

// TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
// TODO: Save the cart back to local storage
// TODO: Re-draw the cart table

// }

// This will initialize the page and draw the cart on screen
renderCart();
renderForm();

function renderForm() {
  var comfirmPara = document.createElement("p");
  comfirmPara.setAttribute("id", "comfirm");
  var divSelect = document.querySelectorAll("div[class='card']")[1];

  var newInputArr = [
    "Name",
    "Street",
    "city",
    "state",
    "ZIP code",
    "Phone Number",
  ];
  var newForm = document.createElement("form");
  newForm.setAttribute("id", "newForm");
  newForm.appendChild(comfirmPara);
  for (var i = 0; i < newInputArr.length; i++) {
    var label = document.createElement("label");
    label.textContent = newInputArr[i];
    var input = document.createElement("input");
    if (i == newInputArr.length - 1) {
      input.setAttribute("type", "number");
    } else {
      input.setAttribute("type", "text");
    }
    input.setAttribute("placeholder", newInputArr[i]);
    input.required = true;
    newForm.appendChild(label);
    newForm.appendChild(input);
  }
  input = document.createElement("input");
  input.setAttribute("type", "submit");
  input.setAttribute("value", "Process Order");
  newForm.appendChild(input);
  divSelect.appendChild(newForm);
}

var form = document.querySelector("#newForm");
form.addEventListener("submit", approve);

function approve() {
  event.preventDefault();
  var selectForm = document.getElementById("newForm");
  for (var i = 0; i < selectForm.length - 1; i++) {
    selectForm[i].value = "";
  }
  var message = document.querySelector("#comfirm");
  message.textContent = "your order has been submitted";
}

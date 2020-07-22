/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
var table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
var cart;

function loadCart() {
  var cartItems = JSON.parse(localStorage.getItem('items')) || [];
  cart = new Cart(cartItems);
  console.log(cart.items.length);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();

}

// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() { }

// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {
  
  var tableContent = document.querySelector('tbody');
  for (let index = 0; index < cart.items.length-1; index++) {
    var row = document.createElement('tr');
    row.setAttribute('class', cart.items[index].product + index);

    var td = document.createElement('td');
    var button = document.createElement('button');
    button.setAttribute('class', cart.items[index].product + index + ' delBtn');
    button.innerText = 'delete';
    td.appendChild(button);
    row.appendChild(td);
    td = document.createElement('td');
    td.textContent = cart.items[index].product;
    row.appendChild(td)
    td = document.createElement('td');
    td.textContent = cart.items[index].quantity;
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
  console.log(cart);
  for (let index = 0; index < cart.items.length; index++) {

    var delBtn = document.getElementsByClassName("delBtn")[index];
    delBtn.addEventListener('click', clickHandler);
    function clickHandler(event) {
      //  removeChild(row);
      console.log(event.target.className.split(' ')[0]);
      let className = event.target.className.split(' ')[0];
      document.getElementsByClassName(className)[0].remove();
      let localSto = JSON.parse( localStorage.getItem("items"))
      console.log(localSto);
    }
  }
  
  
}
// clickHandler();

// TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
// TODO: Save the cart back to local storage
// TODO: Re-draw the cart table

// }

// This will initialize the page and draw the cart on screen
renderCart();
removeItemFromCart();


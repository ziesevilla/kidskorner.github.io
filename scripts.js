//Function that Adds the Class Clicked to the Icons when it is Clicked

document.querySelectorAll('.fas').forEach(function(fas) {
    fas.addEventListener('click', function() {
        this.classList.toggle('clicked');
    });
});

//Function that will update the product price in the checkout page
function updateProductPrice(button, pricePerUnit) {
    const quantityElement = button.parentElement.querySelector('.quantity');
    const totalPriceElement = button.parentElement.parentElement.querySelector('.total-price');
    
    let quantity = parseInt(quantityElement.textContent);
    let totalPrice = pricePerUnit * quantity;
    
    totalPriceElement.textContent = `Php ${totalPrice.toFixed(2)}`;
    updateTotal(); // Update the overall total whenever a product's total is updated
}

//Function that will update a product total price when the quantity button is pressed
function increaseQuantity(button) {
    const quantityElement = button.parentElement.querySelector('.quantity');
    let quantity = parseInt(quantityElement.textContent);
    quantityElement.textContent = ++quantity;

    const priceElement = button.parentElement.parentElement.querySelector('.price');
    let pricePerUnit = parseFloat(priceElement.textContent.replace('Php ', ''));
    
    updateProductPrice(button, pricePerUnit);
}

function decreaseQuantity(button) {
    const quantityElement = button.parentElement.querySelector('.quantity');
    let quantity = parseInt(quantityElement.textContent);
    if (quantity > 1) {
        quantityElement.textContent = --quantity;

        const priceElement = button.parentElement.parentElement.querySelector('.price');
        let pricePerUnit = parseFloat(priceElement.textContent.replace('Php ', ''));
        
        updateProductPrice(button, pricePerUnit);
    }
}


//Function that updates the grand total of the products included the shipping fee of Php 150
const shippingFee = 150.00;

function updateTotal() {
    const productRows = document.querySelectorAll('.check-table tbody tr');
    let subtotal = 0;

    productRows.forEach(row => {
        const totalPriceElement = row.querySelector('.total-price');
        let totalPrice = parseFloat(totalPriceElement.textContent.replace('Php ', ''));
        subtotal += totalPrice;
    });

    const subtotalElement = document.getElementById('sum-total');
    const totalElement = document.querySelector('.check-details-section-total:nth-of-type(3) h3');

    subtotalElement.textContent = `Php ${subtotal.toFixed(2)}`;
    let total = subtotal + shippingFee;
    totalElement.textContent = `Php ${total.toFixed(2)}`;
}



// Function for the pop-up message for the icon button of cart and checkout
var checkmodal = document.getElementById("checkModal");

var checkmodalMessage = document.getElementById("checkmodalMessage");

var checkclickCounts = [0, 0, 0, 0, 0];

var checkmessages = ["added to checkout.", "removed from checkout."];

var checkicons = document.querySelectorAll(".heart-container");
checkicons.forEach(function(icon) {
    icon.addEventListener("click", function() {
        var checkindex = icon.getAttribute("data-index");
        var productName = icon.getAttribute("data-name");
        checkmodal.style.display = "block";
        checkmodalMessage.textContent =  productName + " is " + checkmessages[checkclickCounts[checkindex] % 2];
        checkclickCounts[checkindex]++;
    });
});



var cartmodal = document.getElementById("cartModal");

var cartmodalMessage = document.getElementById("cartmodalMessage");

var cartclickCounts = [0, 0, 0, 0, 0];

var cartmessages = ["added to cart.", "removed from cart."];

var carticons = document.querySelectorAll(".cart");
carticons.forEach(function(icon) {
    icon.addEventListener("click", function() {
        var cartindex = icon.getAttribute("data-index");
        var productName = icon.getAttribute("data-name");
        cartmodal.style.display = "block";
        cartmodalMessage.textContent =  productName + " is " + cartmessages[cartclickCounts[cartindex] % 2];
        cartclickCounts[cartindex]++;
    });
});



var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
    checkmodal.style.display = "none";
    cartmodal.style.display = "none";
}
  
window.onclick = function(event) {
    if (event.target == checkmodal || event.target == cartmodal) {
      checkmodal.style.display = "none";
      cartmodal.style.display = "none";
    }
}


//Function that will pop up a dialog box that updates the user of the order summary  
function checkoutAllItems() {
    const productRows = document.querySelectorAll('.check-table tbody tr');
    let orderSummary = "Order Summary:\n\n";

    productRows.forEach(row => {
        const nameElement = row.querySelector('td:nth-child(2) div');
        const quantityElement = row.querySelector('.quantity');
        const totalPriceElement = row.querySelector('.total-price');

        let name = nameElement.textContent.trim();
        let quantity = quantityElement.textContent;
        let totalPrice = totalPriceElement.textContent;

        orderSummary += `${name} - Quantity: ${quantity}, Total Price: ${totalPrice}\n`;
    });

    const subtotalElement = document.getElementById('sum-total').textContent;
    const totalElement = document.querySelector('.check-details-section-total:nth-of-type(3) h3').textContent;

    orderSummary += `\nSubtotal: ${subtotalElement}`;
    orderSummary += `\nShipping Fee: Php ${shippingFee.toFixed(2)}`;
    orderSummary += `\nTotal: ${totalElement}`;

    alert(orderSummary);
}


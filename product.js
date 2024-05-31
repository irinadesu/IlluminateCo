// Event listener for logout icon
var logoutIcon = document.querySelector(".fa-sign-out");

logoutIcon.addEventListener("click", function () {
    // Confirmation dialog for logout
    var confirmLogout = confirm("Click OK if you want to log out.");
    if (confirmLogout) {
        // Alert upon successful logout and redirect to login page
        alert("Logged out");
        window.location.href = "index.html";
    }
});

// Selecting elements
let cart = document.querySelector('#cart');
let close = document.querySelector('.close');
let body = document.querySelector('body');

// Selecting product list containers
let unscentedListHTML = document.querySelector('#unscented .product-list');
let scentedListHTML = document.querySelector('#scented .product-list');
let decorativeListHTML = document.querySelector('#decorative .product-list');
let beeswaxListHTML = document.querySelector('#beeswax .product-list');
let soywaxListHTML = document.querySelector('#soywax .product-list');

// Selecting cart elements
let listCartHTML = document.querySelector('.list-cart');
let iconCartSpan = document.querySelector('.quant');
let checkoutButton = document.querySelector('.checkout');

// Initializing arrays
let productList = [];
let carts = [];

// Toggle cart visibility
cart.addEventListener('click', () => {
    body.classList.toggle('showcart');
});
close.addEventListener('click', () => {
    body.classList.toggle('showcart');
});

// Function to add product data to HTML
const addDatatoHTML = () => {
    // Clearing product lists
    unscentedListHTML.innerHTML = '';
    scentedListHTML.innerHTML = '';
    decorativeListHTML.innerHTML = '';
    beeswaxListHTML.innerHTML = '';
    soywaxListHTML.innerHTML = '';

    if (productList.length > 0) {
        productList.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.dataset.id = product.id;
            newProduct.innerHTML =
                `<img src="${product.image}">
                <h2>${product.name}</h2>
                <div class="price">PHP ${product.price}</div>
                <button class="addCart">Add to Cart</button>`;
            
            // Appending products to respective category lists
            if (product.category === "unscented") {
                unscentedListHTML.appendChild(newProduct);
            } else if (product.category === "scented") {
                scentedListHTML.appendChild(newProduct);
            } else if (product.category === "decorative") {
                decorativeListHTML.appendChild(newProduct);
            } else if (product.category === "beeswax") {
                beeswaxListHTML.appendChild(newProduct);
            } else if (product.category === "soywax") {
                soywaxListHTML.appendChild(newProduct);
            }
        });
    }
}

// Event listeners for adding products to cart
document.querySelectorAll('.product-list').forEach(list => {
    list.addEventListener('click', (event) => {
        let positionClick = event.target;
        if (positionClick.classList.contains('addCart')) {
            let productID = positionClick.parentElement.dataset.id;
            addToCart(productID);
        }
    });
});

// Function to add product to cart
const addToCart = (productID) => {
    let positionThisProduct = carts.findIndex((value) => value.productID == productID);

    if (carts.length <= 0) {
        carts = [{
            productID: productID,
            quantity: 1
        }]
    } else if (positionThisProduct < 0) {
        carts.push({
            productID: productID,
            quantity: 1
        });

    } else {
        carts[positionThisProduct].quantity = carts[positionThisProduct].quantity + 1;
    }
    addCartToHTML();
}

// Function to update cart HTML
const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalOrder = 0;
    if (carts.length === 0) {
        listCartHTML.innerHTML = '<p>Your cart is empty</p>';
    } else {
        carts.forEach(cart => {
            totalOrder += cart.quantity;
            let newCart = document.createElement('div');
            let positionProduct = productList.findIndex((value) => value.id == cart.productID);
            let info = productList[positionProduct];
            newCart.classList.add('item');
            newCart.innerHTML =
                `   <div class="image">
                        <img src="${info.image}">
                    </div>
                    <div class="name">${info.name}</div>
                    <div class="total">PHP${info.price * cart.quantity}</div>
                    <div class="quantity">
                        <span class="minus" data-product-id="${info.id}"> < </span>
                        <span>${cart.quantity}</span>
                        <span class="add" data-product-id="${info.id}"> > </span>`;
            listCartHTML.appendChild(newCart);

            // Event listeners for updating cart quantity
            newCart.querySelector('.minus').addEventListener('click', () => {
                updateQuantity(cart.productID, -1);
            });

            newCart.querySelector('.add').addEventListener('click', () => {
                updateQuantity(cart.productID, 1);
            });
        });
    }

    iconCartSpan.innerText = totalOrder;
}

// Function to update quantity in cart
const updateQuantity = (productID, change) => {
    let positionThisProduct = carts.findIndex((value) => value.productID == productID);
    if (positionThisProduct >= 0) {
        carts[positionThisProduct].quantity += change;
        if (carts[positionThisProduct].quantity <= 0) {
            carts.splice(positionThisProduct, 1);
        }
        addCartToHTML();
    }
}

// Function to handle checkout process
const checkout = () => {
    if (carts.length === 0) {
        alert("Your cart is empty. You cannot checkout.");
        return;
    }

    let totalAmount = 0;
    let orderDetails = carts.map(cart => {
        let product = productList.find(p => p.id == cart.productID);
        let productTotal = product.price * cart.quantity;
        totalAmount += productTotal;
        return `${product.name} - ${cart.quantity} x PHP${product.price}`;
    }).join('\n');

    let orderSummary = `Order Summary:\n\nItems:\n${orderDetails}\n\nTotal Amount: PHP${totalAmount}\n\nDo you want to proceed to checkout?`;
    let confirmOrderSummary = confirm(orderSummary);

    if (!confirmOrderSummary) {
        alert("Order canceled.");
        return;
    }

    let name = prompt("Please enter your name:");
    while (!name) {
        if (name === null) {
            alert("Order canceled.");
            return;
        }
        name = prompt("Name is required. Please enter your name:");
    }

    let address = prompt("Please enter your address:");
    while (!address) {
        if (address === null) {
            alert("Order canceled.");
            return;
        }
        address = prompt("Address is required. Please enter your address:");
    }

    let contact = prompt("Please enter your contact number:");
    while (!contact) {
        if (contact === null) {
            alert("Order canceled.");
            return;
        }
        contact = prompt("Contact number is required. Please enter your contact number:");
    }

    let finalSummary = `Order Summary:\n\nName: ${name}\nAddress: ${address}\nContact: ${contact}\n\nItems:\n${orderDetails}\n\nTotal Amount: PHP${totalAmount}\n\nDo you want to confirm the order?`;
    let confirmFinalOrder = confirm(finalSummary);

    if (confirmFinalOrder) {
        carts = [];
        addCartToHTML();
        alert("Thank you for your order! Your items will be delivered soon.");
    } else {
        alert("Order canceled.");
    }
}

checkoutButton.addEventListener('click', checkout);

const initApp = () => {
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            productList = data;
            addDatatoHTML();
        })
        .catch(error => console.error('Error fetching products:', error));
}

initApp();


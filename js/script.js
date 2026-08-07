function addToWishlist(product) {

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    let exist = wishlist.find(item => item.id === product.id);
    if (exist) {
        alert("Product already in Wishlist ❤️");
        return;
    }

    wishlist.push(product);

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    updateNavbarCount();

    alert("Added to Wishlist ❤️");
}

function addToCart(product) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let exist = cart.find(item => item.id === product.id);
    if (exist) {

        exist.qty++;

    } else {

        product.qty = 1;

        cart.push(product);

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateNavbarCount();

    alert("Added to Cart 🛒");
}

// ===========================
// Update Navbar Counter
// ===========================

function updateNavbarCount() {

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Wishlist Count
    let wishlistCount = document.getElementById("wishlistCount");

    if (wishlistCount) {
        wishlistCount.innerText = wishlist.length;
    }

    // Cart Count
    let totalQty = 0;

    cart.forEach(item => {

        totalQty += item.qty;

    });

    let cartCount = document.getElementById("cartCount");

    if (cartCount) {
        cartCount.innerText = totalQty;
    }

}

// Page Load hote hi Count Update
window.onload = updateNavbarCount;



// ===============================
// CART PAGE
// ===============================

if (document.getElementById("cartItems")) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    displayCart();

    function displayCart() {

        let output = "";
        let total = 0;
        let selected = 0;

        if (cart.length == 0) {

            document.getElementById("cartItems").innerHTML = `

<div class="empty">

<i class="fa-solid fa-cart-shopping"></i>

<h3 class="mt-3">

Your Cart is Empty

</h3>

<a href="index.html"

class="btn btn-warning mt-3">

Continue Shopping

</a>

</div>

`;

            document.getElementById("grandTotal").innerHTML = 0;
            document.getElementById("itemCount").innerHTML = 0;

            return;

        }

        cart.forEach((item, index) => {

            if (item.selected === undefined) {

                item.selected = true;

            }

            if (item.selected) {

                selected++;

                total += item.price * item.qty;

            }

            output += `

<div class="card cart-card shadow mb-4">

<div class="row g-0">

<div class="col-md-4">

<img src="${item.image}"

class="img-fluid h-100">

</div>

<div class="col-md-8">

<div class="card-body">

<div class="form-check mb-2">

<input class="form-check-input"

type="checkbox"

${item.selected ? "checked" : ""}

onchange="toggleSelect(${index})">

<label>

Select Product

</label>

</div>

<h4>

${item.name}

</h4>

<p class="price">

₹${item.price.toLocaleString()}

</p>

<div class="qty-box">

<button onclick="decreaseQty(${index})">

-

</button>

<strong>

${item.qty}

</strong>

<button onclick="increaseQty(${index})">

+

</button>

</div>

<h5 class="mt-3">

Subtotal :

₹${(item.price * item.qty).toLocaleString()}

</h5>

<div class="mt-3">

<button

class="btn btn-remove"

onclick="removeCart(${index})">

🗑 Remove

</button>

<button

class="btn btn-buy"

onclick="buyNow(${index})">

⚡ Buy Now

</button>

</div>

</div>

</div>

</div>

</div>

`;

        });

        document.getElementById("cartItems").innerHTML = output;

        document.getElementById("grandTotal").innerHTML = total.toLocaleString();

        document.getElementById("itemCount").innerHTML = selected;

        localStorage.setItem("cart", JSON.stringify(cart));

    }

    window.increaseQty = function (index) {

        cart[index].qty++;

        localStorage.setItem("cart", JSON.stringify(cart));

        displayCart();

    }

    window.decreaseQty = function (index) {

        if (cart[index].qty > 1) {

            cart[index].qty--;

        }

        localStorage.setItem("cart", JSON.stringify(cart));

        displayCart();

    }

    window.removeCart = function (index) {

        cart.splice(index, 1);

        localStorage.setItem("cart", JSON.stringify(cart));

        displayCart();

    }

    window.toggleSelect = function (index) {

        cart[index].selected = !cart[index].selected;

        localStorage.setItem("cart", JSON.stringify(cart));

        displayCart();

    }

    window.buyCartItem = function (index) {

        let buyProduct = [cart[index]];

        localStorage.setItem("checkoutItems", JSON.stringify(buyProduct));

        window.location.href = "checkout.html";

    }
    document.getElementById("checkoutBtn").onclick = function (e) {

        e.preventDefault();

        let selectedProducts = cart.filter(item => item.selected);

        if (selectedProducts.length == 0) {

            alert("Please select at least one product.");

            return;

        }

        localStorage.setItem("checkoutItems",
            JSON.stringify(selectedProducts));
        window.location.href = "checkout.html";

    }

}


// =========================
// BUY NOW
// =========================

function buyNow(product){

    product.qty = 1;

    localStorage.setItem(
        "checkoutItems",
        JSON.stringify([product])
    );

    window.location.href = "checkout.html";

}
async function loadProducts() {

    const response = await fetch("/api/products");
    const products = await response.json();

    const container = document.getElementById("products");

    container.innerHTML = "";

    products.forEach(product => {

        container.innerHTML += `
        <div class="card">

            <img src="${product.image}" alt="${product.name}">

            <div class="card-content">

                <h3>${product.name}</h3>

                <p class="product-price">
                    ₹${product.price}
                </p>

                <button
                    class="view-btn"
                    onclick="viewProduct(${product.id})">

                    View Details

                </button>

            </div>

        </div>
        `;
    });
}

async function viewProduct(id) {

    const response =
        await fetch(`/api/product/${id}`);

    const data =
        await response.json();

    document.getElementById("modal-body").innerHTML = `

    <div class="product-page">

        <div class="product-left">

            <img
                src="${data.product.image}"
                class="product-image">

        </div>

        <div class="product-right">

            <h1>${data.product.name}</h1>

            <p class="category">
                ${data.product.category}
            </p>

            <h2 class="price">
                ₹${data.product.price}
            </h2>

            <div class="inventory-box">

                <h3>Inventory</h3>

                <p>
                    <strong>Stock:</strong>
                    ${data.inventory.stock}
                </p>

                <p>
                    <strong>Status:</strong>
                    ${data.inventory.status}
                </p>

                <p>
                    <strong>Warehouse:</strong>
                    ${data.inventory.warehouse}
                </p>

            </div>

            <div class="billing-box">

                <h3>Order Summary</h3>

                <p>
                    Tax:
                    ₹${data.billing.tax}
                </p>

                <p>
                    Shipping:
                    ₹${data.billing.shipping}
                </p>

                <p>
                    Discount:
                    ₹${data.billing.discount}
                </p>

                <h2>
                    Total:
                    ₹${data.billing.total}
                </h2>

            </div>

            <button
                class="cart-button"
                onclick="addToCart(
                    ${data.product.id},
                    '${data.product.name}',
                    ${data.product.price}
                )">

                Add To Cart 🛒

            </button>

        </div>

    </div>

    <div class="recommend-section">

        <h2>Recommended Products</h2>

        <div class="recommend-grid">

            ${data.recommendation.recommendations
                .map(item => `
                    <div class="recommend-card">
                        ${item}
                    </div>
                `)
                .join("")}

        </div>

    </div>
    `;

    document.getElementById("modal")
        .style.display = "flex";
}

function addToCart(id, name, price) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({
        id,
        name,
        price
    });

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

    showToast(`${name} added to cart 🛒`);
}

function updateCartCount() {

    const cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    const counter =
        document.getElementById("cart-count");

    if (counter) {

        counter.innerText = cart.length;
    }
}

function openCart() {

    const cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;

    let html = `
        <div class="cart-container">

            <h2>🛒 Shopping Cart</h2>
    `;

    if (cart.length === 0) {

        html += `
            <p>Your cart is empty.</p>
        `;

    } else {

        cart.forEach((item,index) => {

            total += item.price;

            html += `
                <div class="cart-item">

                    <div>

                        <h3>${item.name}</h3>

                        <p>₹${item.price}</p>

                    </div>

                    <button
                        class="remove-btn"
                        onclick="removeFromCart(${index})">

                        Remove

                    </button>

                </div>
            `;
        });

        html += `
            <hr>

            <h2>Total: ₹${total}</h2>

            <button
                class="checkout-btn"
                onclick="checkout()">

                Proceed to Checkout

            </button>
        `;
    }

    html += `</div>`;

    document.getElementById("modal-body")
        .innerHTML = html;

    document.getElementById("modal")
        .style.display = "flex";
}

function removeFromCart(index) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index,1);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

    openCart();
}

function checkout() {

    alert("🎉 Order Placed Successfully!");

    localStorage.removeItem("cart");

    updateCartCount();

    closeModal();
}

function closeModal() {

    document.getElementById("modal")
        .style.display = "none";
}
function showToast(message){

    const toast =
        document.getElementById("toast");

    toast.innerText = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);
}

window.onclick = function(event) {

    const modal =
        document.getElementById("modal");

    if (event.target === modal) {

        closeModal();
    }
};

document
    .getElementById("search")
    ?.addEventListener("input", function() {

        const search =
            this.value.toLowerCase();

        const cards =
            document.querySelectorAll(".card");

        cards.forEach(card => {

            const title =
                card.querySelector("h3")
                    .innerText
                    .toLowerCase();

            card.style.display =
                title.includes(search)
                    ? "block"
                    : "none";
        });
    });

loadProducts();
updateCartCount();
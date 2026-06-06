async function loadProducts() {

    const response =
        await fetch("/api/products");

    const products =
        await response.json();

    const container =
        document.getElementById("products");

    container.innerHTML = "";

    products.forEach(product => {

        container.innerHTML += `
        <div class="card">

            <img src="${product.image}">

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

    document.getElementById("modal-body")
        .innerHTML = `

        <h2>${data.product.name}</h2>

        <img
            src="${data.product.image}"
            style="
                width:100%;
                max-height:300px;
                object-fit:cover;
                border-radius:10px;
            ">

        <h3>₹${data.product.price}</h3>

        <p>
            Category:
            ${data.product.category}
        </p>

        <p>
            Stock:
            ${data.inventory.stock}
        </p>

        <p>
            Status:
            ${data.inventory.status}
        </p>

        <h3>
            Total:
            ₹${data.billing.total}
        </h3>

        <button
            class="cart-button"
            onclick="addToCart(
                ${data.product.id},
                '${data.product.name}',
                ${data.product.price}
            )">

            Add To Cart 🛒

        </button>
    `;

    document.getElementById("modal")
        .style.display = "flex";
}

function addToCart(id,name,price){

    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];

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

    showToast(
        `${name} added to cart`
    );
}

function updateCartCount(){

    const cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];

    const counter =
        document.getElementById(
            "cart-count"
        );

    if(counter){

        counter.innerText =
            cart.length;
    }
}

function openCart(){

    const cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];

    let total = 0;

    let html = `
        <h2>🛒 Shopping Cart</h2>
    `;

    if(cart.length === 0){

        html += `
            <p>
                Cart is empty
            </p>
        `;

    }else{

        cart.forEach((item,index)=>{

            total += item.price;

            html += `

            <div class="cart-item">

                <div>

                    <h3>
                        ${item.name}
                    </h3>

                    <p>
                        ₹${item.price}
                    </p>

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

        <h2>
            Total:
            ₹${total}
        </h2>

        <button
            class="checkout-btn"
            onclick="showAddressForm()">

            Proceed To Checkout

        </button>
        `;
    }

    document.getElementById("modal-body")
        .innerHTML = html;

    document.getElementById("modal")
        .style.display = "flex";
}

function removeFromCart(index){

    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];

    cart.splice(index,1);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

    openCart();
}

function showAddressForm() {

    document.getElementById("modal-body").innerHTML = `

        <div class="address-form">

            <h2>📦 Delivery Address</h2>

            <div class="form-group">

                <label>Door / House No</label>

                <input
                    type="text"
                    id="doorNo"
                    placeholder="e.g. 12A">

            </div>

            <div class="form-group">

                <label>Street</label>

                <input
                    type="text"
                    id="street"
                    placeholder="Street Name">

            </div>

            <div class="form-group">

                <label>Area / Locality</label>

                <input
                    type="text"
                    id="area"
                    placeholder="Area">

            </div>

            <div class="form-group">

                <label>City</label>

                <input
                    type="text"
                    id="city"
                    placeholder="City">

            </div>

            <div class="form-group">

                <label>State</label>

                <input
                    type="text"
                    id="state"
                    placeholder="State">

            </div>

            <div class="form-group">

                <label>Pincode</label>

                <input
                    type="text"
                    id="pincode"
                    placeholder="Pincode">

            </div>

            <button
                class="checkout-btn"
                onclick="placeOrder()">

                Place Order

            </button>

        </div>
    `;

    document.getElementById("modal")
        .style.display = "flex";
}

async function placeOrder() {

    const address = {

        doorNo:
            document.getElementById("doorNo").value,

        street:
            document.getElementById("street").value,

        area:
            document.getElementById("area").value,

        city:
            document.getElementById("city").value,

        state:
            document.getElementById("state").value,

        pincode:
            document.getElementById("pincode").value
    };

    const fullAddress = `
${address.doorNo},
${address.street},
${address.area},
${address.city},
${address.state} - ${address.pincode}
`;

    const cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    const userId =
        localStorage.getItem("userId");

    const response =
        await fetch("/place-order", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                userId,
                cart,
                address: fullAddress
            })
        });

    const data =
        await response.json();

    if (data.success) {

        localStorage.removeItem("cart");

        updateCartCount();

        closeModal();

        showToast(
            "🎉 Order Placed Successfully"
        );

    } else {

        alert(data.error);
    }
}

function openProfile(){

    const username =
        localStorage.getItem(
            "username"
        );

    document.getElementById(
        "modal-body"
    ).innerHTML = `

        <h2>
            👤 ${username}
        </h2>

        <button
            class="logout-btn"
            onclick="logout()">

            Logout

        </button>
    `;

    document.getElementById(
        "modal"
    ).style.display = "flex";
}

function logout(){

    localStorage.clear();

    window.location =
        "/login.html";
}

function loadUser(){

    const username =
        localStorage.getItem(
            "username"
        );

    if(username){

        document.getElementById(
            "username-display"
        ).innerText = username;
    }
}

function closeModal(){

    document.getElementById(
        "modal"
    ).style.display = "none";
}

function showToast(message){

    const toast =
        document.getElementById(
            "toast"
        );

    toast.innerText =
        message;

    toast.classList.add(
        "show"
    );

    setTimeout(()=>{

        toast.classList.remove(
            "show"
        );

    },2500);
}

document
.getElementById("search")
?.addEventListener(
    "input",
    function(){

        const search =
            this.value.toLowerCase();

        const cards =
            document.querySelectorAll(
                ".card"
            );

        cards.forEach(card=>{

            const title =
                card.querySelector("h3")
                .innerText
                .toLowerCase();

            card.style.display =
                title.includes(search)
                ? "block"
                : "none";
        });
    }
);

window.onclick = function(event){

    const modal =
        document.getElementById(
            "modal"
        );

    if(event.target === modal){

        closeModal();
    }
};

loadProducts();
updateCartCount();
loadUser();
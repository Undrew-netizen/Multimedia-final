document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // CART STORAGE FUNCTIONS
    // =========================
    function getCart() {
        return JSON.parse(localStorage.getItem("cart")) || [];
    }

    function saveCart(cart) {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    const cartCounts = document.querySelectorAll(".cart-count");

    updateCartCount();

    // =========================
    // ADD TO CART
    // =========================
    document.querySelectorAll(".add-button").forEach(button => {

        button.addEventListener("click", function () {

            const product = this.closest(".detail-cover");
            if (!product) return;

            const nameEl = product.querySelector(".product-name");
            const priceEl = product.querySelector(".product-price");
            const imageEl = product.querySelector(".product-img");

            if (!nameEl || !priceEl) return;

            const name = nameEl.textContent.trim();
            const price = priceEl.textContent
                .replace("KSH", "")
                .replace(",", "")
                .trim();

            const image = imageEl ? imageEl.src : "";

            const item = { name, price, image };

            let cart = getCart();
            cart.push(item);
            saveCart(cart);

            updateCartCount();

            const originalHTML = button.innerHTML;
            button.innerHTML = "Added ✓";
            button.disabled = true;

            setTimeout(() => {
                button.innerHTML = originalHTML;
                button.disabled = false;
            }, 1000);

        });

    });

    // =========================
    // UPDATE CART COUNT
    // =========================
    function updateCartCount() {
        const cart = getCart();

        cartCounts.forEach(span => {
            span.textContent = cart.length;
            span.classList.add("pop");

            setTimeout(() => {
                span.classList.remove("pop");
            }, 200);
        });
    }

    // =========================
    // DARK MODE
    // =========================
    const darkToggle = document.getElementById("dark-toggle");

    if (darkToggle) {

        if (localStorage.getItem("darkMode") === "enabled") {
            document.body.classList.add("dark");
            darkToggle.checked = true;
        }

        darkToggle.addEventListener("change", function () {

            if (this.checked) {
                document.body.classList.add("dark");
                localStorage.setItem("darkMode", "enabled");
            } else {
                document.body.classList.remove("dark");
                localStorage.setItem("darkMode", "disabled");
            }

        });

    }

});


// =======================================
// 🌊 WAVE ANIMATION (p5.js)
// =======================================

let yoff = 0;

function setup() {

    const container = document.getElementById("wave-container");
    if (!container) return;

    let canvas = createCanvas(window.innerWidth, 250);
    canvas.parent("wave-container");
}

function draw() {

    if (!document.getElementById("wave-container")) return;

    clear();
    noStroke();

    fill(0, 150, 255, 180);

    beginShape();

    let xoff = 0;

    for (let x = 0; x <= width; x += 10) {
        let y = map(noise(xoff, yoff), 0, 1, 100, 200);
        vertex(x, y);
        xoff += 0.05;
    }

    yoff += 0.01;

    vertex(width, height);
    vertex(0, height);
    endShape(CLOSE);
}

function windowResized() {
    resizeCanvas(window.innerWidth, 250);
}

document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("notificationButton");
    const tooltip = document.getElementById("tooltip");
    let isClicked = false;

    button.addEventListener("mouseenter", function () {
        if (!isClicked) {
            tooltip.style.display = "block";
            positionTooltip();
        }
    });

    button.addEventListener("mouseleave", function () {
        if (!isClicked) {
            tooltip.style.display = "none";
        }
    });

    button.addEventListener("click", function () {
        isClicked = !isClicked;
        if (isClicked) {
            tooltip.style.display = "block";
            positionTooltip();
        } else {
            tooltip.style.display = "none";
        }
    });

    document.addEventListener("click", function (event) {
        if (!button.contains(event.target) && !tooltip.contains(event.target)) {
            tooltip.style.display = "none";
            isClicked = false;
        }
    });

    function positionTooltip() {
        const buttonRect = button.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        let left = buttonRect.left;
        let top = buttonRect.bottom + 10;
        if (left + tooltipRect.width > screenWidth) {
            left = screenWidth - tooltipRect.width - 100;
        }
        
        if (top + tooltipRect.height > screenHeight) {
            top = buttonRect.top - tooltipRect.height - 10;
        }

        tooltip.style.left = left + "px";
        tooltip.style.top = top + "px";
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const cartButtons = document.querySelectorAll(".cart-button");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.forEach(item => {
        const menuItem = [...document.querySelectorAll(".menu-item")].find(menu => 
            menu.querySelector(".menu-name").innerText === item.name
        );
        if (menuItem) {
            updateCartButton(menuItem, item.quantity, item.price);
        }
    });
    cartButtons.forEach(button => {
        button.addEventListener("click", function () {
            const menuItem = this.closest(".menu-item");
            const itemName = menuItem.querySelector(".menu-name").innerText;
            const priceText = menuItem.querySelector(".menu-price").textContent;
            const pricePerUnit = parseInt(priceText.replace(/\D/g, ""));
            const itemImage = menuItem.querySelector("img").src;
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            let existingItem = cart.find(item => item.name === itemName);
            let quantity = 1;
            if (existingItem) {
                quantity = existingItem.quantity + 1;
            } else {
                cart.push({
                    name: itemName,
                    price: pricePerUnit,
                    image: itemImage,
                    quantity: 1
                });
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartButton(menuItem, quantity, pricePerUnit);
        });
    });
    function updateCartButton(menuItem, quantity, pricePerUnit) {
        const cartButton = menuItem.querySelector(".cart-button");
        const quantityContainer = document.createElement("div");
        quantityContainer.classList.add("quantity-container");
        const totalPrice = pricePerUnit * quantity;
        quantityContainer.innerHTML = `
            <div class="menu-price">ราคา ${totalPrice} บาท</div>
            <div class="number">
                <button class="decrease">-</button>
                <span class="quantity">${quantity}</span>
                <button class="increase">+</button>
            </div>
        `;
        cartButton.replaceWith(quantityContainer);
        const decreaseButton = quantityContainer.querySelector(".decrease");
        const increaseButton = quantityContainer.querySelector(".increase");
        const quantitySpan = quantityContainer.querySelector(".quantity");
        const priceDisplay = quantityContainer.querySelector(".menu-price");
        decreaseButton.addEventListener("click", function () {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            let itemIndex = cart.findIndex(item => item.name === menuItem.querySelector(".menu-name").innerText);
            if (itemIndex !== -1) {
                if (cart[itemIndex].quantity > 1) {
                    cart[itemIndex].quantity--;
                } else {
                    cart.splice(itemIndex, 1);
                    quantityContainer.replaceWith(cartButton);
                }
                localStorage.setItem("cart", JSON.stringify(cart));
                quantitySpan.textContent = cart[itemIndex]?.quantity || 1;
                priceDisplay.textContent = `ราคา ${(cart[itemIndex]?.quantity || 1) * pricePerUnit} บาท`;
            }
        });
        increaseButton.addEventListener("click", function () {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            let itemIndex = cart.findIndex(item => item.name === menuItem.querySelector(".menu-name").innerText);
            if (itemIndex !== -1) {
                cart[itemIndex].quantity++;
                localStorage.setItem("cart", JSON.stringify(cart));
                quantitySpan.textContent = cart[itemIndex].quantity;
                priceDisplay.textContent = `ราคา ${cart[itemIndex].quantity * pricePerUnit} บาท`;
            }
        });
    }
});
document.addEventListener("DOMContentLoaded", function() {
    let btn = document.getElementById("account-btn");
    let text = btn.innerText;

    if (text.length > 6) {
        btn.innerText = text.substring(0, 7) + "...";
    }
});
let registeredaccount = localStorage.getItem("registeredaccount");
document.getElementById("account-btn").textContent = registeredaccount;
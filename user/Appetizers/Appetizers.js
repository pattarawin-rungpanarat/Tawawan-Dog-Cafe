document.addEventListener("DOMContentLoaded", function () {
    const menuContainer = document.querySelector(".menu-grid");

    function loadAppetizers() {
        const appetizers = JSON.parse(localStorage.getItem('appetizers')) || [];
        appetizers.forEach(menu => {
            createMenuItem(menu.imageUrl, menu.name, menu.price);
        });
    }

    function createMenuItem(imageUrl, menuName, menuPrice) {
        const menuItem = document.createElement("div");
        menuItem.classList.add("menu-item");
        menuItem.innerHTML = `
            <img src="${imageUrl}" class="menu-img">
            <div class="menu-details">
                <div class="menu-name">${menuName}</div>
                <div class="menu-price">ราคา ${menuPrice} บาท</div>
                <button class="cart-button"><i class='bx bx-basket'></i></button>
            </div>
        `;
        menuContainer.appendChild(menuItem);
    }

    loadAppetizers();
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

    if (text.length > 2) {
        btn.innerText = text.substring(0, 3) + "...";
    }
});
let registeredaccount = localStorage.getItem("registeredaccount");
document.getElementById("account-btn").textContent = registeredaccount;


document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector("input[type='search']");
    const searchButton = document.querySelector("button");
    const menuItems = document.querySelectorAll(".menu-item");
    const menuTitle = document.getElementById("menu-title");

    function filterMenu() {
        const searchQuery = searchInput.value.toLowerCase();
        let found = false;
        menuItems.forEach(function (menuItem) {
            const menuName = menuItem.querySelector(".menu-name").innerText.toLowerCase();
            if (menuName.includes(searchQuery)) {
                menuItem.style.display = "flex";
                found = true;
            } else {
                menuItem.style.display = "none";
            }
        });

        if (found) {
            menuTitle.innerText = "เมนูการค้นหา";
        } else {
            menuTitle.innerText = "ไม่มีเมนูที่ตรงกับการค้นหา";
        }
    }

    searchButton.addEventListener("click", function () {
        filterMenu();
    });

    searchInput.addEventListener("input", function () {
        if (searchInput.value === "") {
            menuItems.forEach(function (menuItem) {
                menuItem.style.display = "flex";
            });
            menuTitle.innerText = "เมนูแนะนำ";
        } else {
            filterMenu();
        }
    });
});

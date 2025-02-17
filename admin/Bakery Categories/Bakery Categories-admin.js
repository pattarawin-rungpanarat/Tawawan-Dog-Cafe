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
document.addEventListener("DOMContentLoaded", function () {
    let btn = document.getElementById("account-btn");
    let registeredAccount =localStorage.getItem("registeredaccountadmin");

    if (registeredAccount.length > 5) {
        btn.innerText = registeredAccount.substring(0, 5) + "...";
    } else {
        btn.innerText = registeredAccount;
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const deleteButtons = document.querySelectorAll(".bx-trash");

    deleteButtons.forEach(button => {
        button.addEventListener("click", function () {
            if (confirm("คุณแน่ใจหรือไม่ว่าต้องการลบเมนูนี้?")) {
                let menuItem = this.closest(".menu-item");
                const menuName = menuItem.querySelector(".menu-name").textContent.replace(/\s+/g, ' ').trim();

                menuItem.remove();

                let menus = JSON.parse(localStorage.getItem('menus')) || [];
                menus = menus.filter(menu => menu.name !== menuName);
                localStorage.setItem('menus', JSON.stringify(menus));
            }
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const menuContainer = document.querySelector(".menu-grid");
    const addButton = document.getElementById("add-menu-button");
    const menuImageInput = document.getElementById("menu-image");
    const menuNameInput = document.getElementById("menu-name");
    const menuPriceInput = document.getElementById("menu-price");
    const previewContainer = document.querySelector(".preview-container");
    const previewIcon = document.querySelector(".preview-image");

    function loadMenus() {
        const menus = JSON.parse(localStorage.getItem('menus')) || [];
        menus.forEach(menu => {
            createMenuItem(menu.imageUrl, menu.name, menu.price);
        });
    }

    function createMenuItem(imageUrl, menuName, menuPrice) {
        const menuItem = document.createElement("div");
        menuItem.classList.add("menu-item");
        menuItem.innerHTML = `
            <img src="${imageUrl}" class="menu-img">
            <div class="menu-details">
                <div class="menu-name">${menuName} <i class='bx bx-trash' onclick="deleteMenu(this)"></i></div>
                <div class="menu-price">ราคา ${menuPrice} บาท</div>
                <button class="edit-button"><i class='bx bx-edit-alt'></i></button>
            </div>
        `;
        menuContainer.appendChild(menuItem);
    }

    loadMenus();

    menuImageInput.addEventListener("change", function (event) {
        if (event.target.files.length > 0) {
            const imageUrl = URL.createObjectURL(event.target.files[0]);

            previewIcon.style.display = "none";
            let imgElement = previewContainer.querySelector("img");
            if (!imgElement) {
                imgElement = document.createElement("img");
                previewContainer.appendChild(imgElement);
            }
            imgElement.src = imageUrl;
            imgElement.style.display = "block";
        }
    });

    addButton.addEventListener("click", function () {
        const imgElement = previewContainer.querySelector("img");
        const imageUrl = imgElement ? imgElement.src : "./picture/default.jpg";
        const menuName = menuNameInput.value.trim();
        const menuPrice = menuPriceInput.value.trim();

        if (menuName === "" || menuPrice === "" || imageUrl === "./picture/default.jpg") {
            alert("กรุณากรอกชื่อเมนูและราคาให้ครบถ้วน!");
            return;
        }
        createMenuItem(imageUrl, menuName, menuPrice);

        const menus = JSON.parse(localStorage.getItem('menus')) || [];
        menus.push({ imageUrl, name: menuName, price: menuPrice });
        localStorage.setItem('menus', JSON.stringify(menus));

        menuImageInput.value = "";
        menuNameInput.value = "";
        menuPriceInput.value = "";
        if (imgElement) imgElement.remove();
        previewIcon.style.display = "block";
    });
});

function deleteMenu() {
    const deleteButtons = document.querySelectorAll(".bx-trash");
    deleteButtons.forEach(button => {
        button.addEventListener("click", function () {
            if (confirm("คุณแน่ใจหรือไม่ว่าต้องการลบเมนูนี้?")) {
                let menuItem = this.closest(".menu-item");
                const menuName = menuItem.querySelector(".menu-name").textContent.replace(/\s+/g, ' ').trim();

                menuItem.remove();

                let menus = JSON.parse(localStorage.getItem('menus')) || [];
                menus = menus.filter(menu => menu.name !== menuName);
                localStorage.setItem('menus', JSON.stringify(menus));
            }
        });
    });
}


document.addEventListener("DOMContentLoaded", function () {
    const editButtons = document.querySelectorAll(".bx-edit-alt");

    editButtons.forEach(button => {
        button.addEventListener("click", function () {
            let menuItem = this.closest(".menu-item");
            let nameElement = menuItem.querySelector(".menu-name");
            let priceElement = menuItem.querySelector(".menu-price");
            

            if (!menuItem.dataset.editing) {
                menuItem.dataset.editing = "true";

                let nameInput = document.createElement("input");
                nameInput.type = "text";
                nameInput.value = nameElement.textContent.trim();
                nameElement.replaceWith(nameInput);

                let priceInput = document.createElement("input");
                priceInput.type = "number";
                priceInput.value = parseInt(priceElement.textContent.replace(/\D/g, ""));
                priceElement.replaceWith(priceInput);

                this.classList.replace("bx-edit-alt", "bx-check");

                this.addEventListener("click", function saveEdit() {
                    nameElement.textContent = nameInput.value;
                    priceElement.textContent = `ราคา ${priceInput.value} บาท`;

                    nameInput.replaceWith(nameElement);
                    priceInput.replaceWith(priceElement);

                    this.classList.replace("bx-check", "bx-edit-alt");
                    delete menuItem.dataset.editing;

                    this.removeEventListener("click", saveEdit);
                }, { once: true });
            }
        });
    });
});;
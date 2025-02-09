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
    renderCart();
});

function renderCart() {
    const cartContainer = document.getElementById("menu-container"); 
    const totalPriceElement = document.getElementById("total-price");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cartContainer.innerHTML = ""; 

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>ไม่มีสินค้าในตะกร้า</p>";
        totalPriceElement.innerHTML = "ราคารวม: 0 บาท";
        return;
    }

    let totalPrice = 0;

    const table = document.createElement("table");
    table.classList.add("cart-table");
    table.innerHTML = `
        <tr>
            <th>สินค้า</th>
            <th>ราคา</th>
            <th>จำนวน</th>
            <th>รวม</th>
            <th>ลบ</th>
        </tr>
    `;

    cart.forEach((item, index) => {
        const row = document.createElement("tr");

        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        row.innerHTML = `
            <td><img src="${item.image}" alt="${item.name}" width="80"> ${item.name}</td>
            <td>${item.price} บาท</td>
            <td>
                <button class="decrease" onclick="changeQuantity(${index}, -1)">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="increase" onclick="changeQuantity(${index}, 1)">+</button>
            </td>
            <td>${itemTotal} บาท</td>
            <td><button onclick="removeItem(${index})">❌</button></td>
        `;

        table.appendChild(row);
    });

    cartContainer.appendChild(table);
    totalPriceElement.innerHTML = `ราคารวม: ${totalPrice} บาท`;
}

function changeQuantity(index, amount) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    if (cart[index].quantity + amount > 0) {
        cart[index].quantity += amount;
    } else {
        cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function clearCart() {
    localStorage.removeItem("cart");
    renderCart();
}
function checkout() {
    var cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("ไม่พบสินค้า กรุณาตรวจสอบตะกร้าสินค้า");
        return;
    }
    document.getElementById("qrCodeContainer").style.display = "block";
    document.getElementById("qrcode").innerHTML = "";
    var totalPrice = 0;
    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
    });
    if (totalPrice === 0) {
        alert("ไม่พบสินค้า กรุณาตรวจสอบตะกร้าสินค้า");
        return;
    }
    var xValue = "7";
    if (totalPrice < 10) {
        xValue = "4";
    } else if (totalPrice < 100) {
        xValue = "5";
    } else if (totalPrice < 1000) {
        xValue = "6";
    }
    var qrText = "00020101021229370016A000000677010111011300668284999015802TH5303764540" + 
                xValue + totalPrice.toFixed(2) + "63044B37";
    var qrcode = new QRCode(document.getElementById("qrcode"), {
        text: qrText,
        width: 256,
        height: 256
    });
    setTimeout(() => {
        let qrContainer = document.getElementById("qrcode");
        let icon = document.createElement("img");
        icon.src = "./picture/icon.png";
        icon.style.position = "absolute";
        icon.style.width = "50px";
        icon.style.height = "50px";
        icon.style.left = "50%";
        icon.style.top = "50%";
        icon.style.transform = "translate(-50%, -50%)";
        icon.style.borderRadius = "10px";
        qrContainer.style.position = "relative";
        qrContainer.appendChild(icon);
    });
}
function completeOrder() {
    document.getElementById("qrCodeContainer").style.display = "none"; 
    clearCart();
    alert("สั่งซื้อสำเร็จ");
}
let registeredaccount = localStorage.getItem("registeredaccount");
document.getElementById("account-btn").textContent = registeredaccount;
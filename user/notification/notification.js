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
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    let notificationContainer = document.getElementById("notification-container");

    if (orders.length === 0) {
        notificationContainer.innerHTML = "<i class='bx bx-message-dots'></i><br><p>ไม่มีการแจ้งเตือน</p>";
        return;
    }

    orders.forEach(order => {
        let orderElement = document.createElement("div");
        orderElement.classList.add("menu-grid");
        orderElement.innerHTML = `
            <div class="menu-item">
                <i class='bx bx-bell'></i>
                <div class="menu-details">
                    <div class="menu-order" onclick="viewOrder(${order.id})">
                        <div class="menu-name">สั่งออเดอร์เสร็จสิ้น
                            <div class="menu-topic">(${order.date})</div>
                        </div>
                    </div>
                    <button class="cart-button" onclick="deleteNotification(${order.id})">
                    <i class='bx bx-trash'></i>
                    </button>
                    </div>
            </div>
        `;
        notificationContainer.prepend(orderElement);
    });
});

function viewOrder(orderId) {
    localStorage.setItem("selectedOrder", orderId);
    window.location.href = "orderDetails.html";
}

function deleteNotification(orderId) {
    let confirmDelete = confirm("คุณต้องการลบการแจ้งเตือนนี้หรือไม่?");
    if (confirmDelete) {
        let orders = JSON.parse(localStorage.getItem("orders")) || [];
        let updatedOrders = orders.filter(order => order.id !== orderId);
        localStorage.setItem("orders", JSON.stringify(updatedOrders));
        location.reload();
    }
}

function viewOrder(orderId) {
    localStorage.setItem("selectedOrder", orderId);
    window.location.href = "../orderDetails/orderDetails.html";
}

document.addEventListener("DOMContentLoaded", function () {
    let btn = document.getElementById("account-btn");
    let loggedInUser = localStorage.getItem("registeredaccount") || "Guest";
    btn.textContent = loggedInUser.length > 5 ? loggedInUser.substring(0, 5) + "..." : loggedInUser;

    let userOrders = JSON.parse(localStorage.getItem("userorders")) || [];
    let userNotifications = JSON.parse(localStorage.getItem("userNotifications")) || [];
    let notificationContainer = document.getElementById("notification-container");

    if (userOrders.length === 0 && userNotifications.length === 0) {
        notificationContainer.innerHTML = "<i class='bx bx-message-dots'></i><br><p>ไม่มีการแจ้งเตือน</p>";
        return;
    }
    let allNotifications = [
        ...userOrders.map(order => ({ ...order, type: "order" })),
        ...userNotifications.map(notification => ({ ...notification, type: "notification" }))
    ];
    allNotifications.sort((a, b) => new Date(b.date) - new Date(a.date));

    allNotifications.forEach(notification => {
        let notificationElement = document.createElement("div");
        notificationElement.classList.add("menu-grid");

        if (notification.type === "notification") {
            notificationElement.innerHTML = `
                <div class="menu-item" id="notification-${notification.id}">
                    <i class='bx bx-bell'></i>
                    <div class="menu-details">
                        <div class="menu-name">${notification.message}
                            <div class="menu-topic">(${notification.date})</div>
                        </div>
                        <button class="cart-button" onclick="deleteNotification(${notification.id}, 'userNotifications')">
                            <i class='bx bx-trash'></i>
                        </button>
                    </div>
                </div>
            `;
        } else {
            notificationElement.innerHTML = `
                <div class="menu-item" id="notification-${notification.id}">
                    <i class='bx bx-bell'></i>
                    <div class="menu-details">
                        <div class="menu" onclick="viewOrder(${notification.id})">
                            <div class="menu-name">สั่งออเดอร์เสร็จสิ้น
                                <div class="menu-topic">(${notification.date})</div>
                            </div>
                        </div>
                        <button class="cart-button" onclick="deleteNotification(${notification.id}, 'userorders')">
                            <i class='bx bx-trash'></i>
                        </button>
                    </div>
                </div>
            `;
        }
        notificationContainer.prepend(notificationElement);
    });
});

function viewOrder(orderId) {
    localStorage.setItem("selectedOrder", orderId);
    window.location.href = "../orderDetails/orderDetails.html";
}
function deleteNotification(notificationId, type) {
    let confirmDelete = confirm("คุณต้องการลบการแจ้งเตือนนี้หรือไม่?");
    if (confirmDelete) {
        let data = JSON.parse(localStorage.getItem(type)) || [];
        let updatedData = data.filter(item => item.id !== notificationId);
        localStorage.setItem(type, JSON.stringify(updatedData));
        location.reload();
        document.getElementById(`notification-${notificationId}`).remove();
    }
}


function addNewOrder(order) {
    let userOrders = JSON.parse(localStorage.getItem("userorders")) || [];
    let adminOrders = JSON.parse(localStorage.getItem("adminOrders")) || [];

    userOrders.push(order);
    adminOrders.push(order);

    localStorage.setItem("userorders", JSON.stringify(userOrders));
    localStorage.setItem("adminOrders", JSON.stringify(adminOrders));
}

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
    const deleteButtons = document.querySelectorAll(".bx-trash");

    deleteButtons.forEach(button => {
        button.addEventListener("click", function () {
            if (confirm("คุณแน่ใจหรือไม่ว่าต้องการลบเมนูนี้?")) {
                let menuItem = this.closest(".menu-item");
                menuItem.remove();
                // อาจเพิ่มโค้ดเพื่อลบข้อมูลจาก localStorage หรือฐานข้อมูล
            }
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const editButtons = document.querySelectorAll(".bx-edit-alt");

    editButtons.forEach(button => {
        button.addEventListener("click", function () {
            let menuItem = this.closest(".menu-item");
            let nameElement = menuItem.querySelector(".menu-name");
            let priceElement = menuItem.querySelector(".menu-price");

            let nameInput = document.createElement("input");
            nameInput.type = "text";
            nameInput.value = nameElement.textContent.trim();
            nameElement.replaceWith(nameInput);

            let priceInput = document.createElement("input");
            priceInput.type = "number";
            priceInput.value = parseInt(priceElement.textContent.replace(/\D/g, ""));
            priceElement.replaceWith(priceInput);

            button.innerHTML = "<i class='bx bx-check'></i>";

            button.addEventListener("click", function () {
                nameElement.textContent = nameInput.value;
                priceElement.textContent = `ราคา ${priceInput.value} บาท`;

                nameInput.replaceWith(nameElement);
                priceInput.replaceWith(priceElement);

                button.innerHTML = "<i class='bx bx-edit-alt'></i>";
            }, { once: true });
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    function checkMenuItems() {
        const menuGrid = document.querySelector(".menu-grid");
        let menuItems = document.querySelectorAll(".menu-item");
        if (menuItems.length < 4) {
            if (!document.querySelector(".menu-item-edit")) {
                let addMenuItem = document.createElement("div");
                addMenuItem.classList.add("menu-item-edit");
                addMenuItem.innerHTML = `
                    <label class="file-upload">
                        <i class='bx bx-landscape'></i>
                    </label>
                    <div class="menu-details-edit">
                        <div class="menu-name-edit">+ เพิ่มเมนู</div>
                    </div>
                `;
                menuGrid.appendChild(addMenuItem);
            }
        } else {
            let existingAddButton = document.querySelector(".menu-item-edit");
            if (existingAddButton) {
                existingAddButton.remove();
            }
        }
    }
    checkMenuItems();

    document.querySelectorAll(".bx-trash").forEach(button => {
        button.addEventListener("click", function () {
            setTimeout(checkMenuItems, 100);
        });
    });
});

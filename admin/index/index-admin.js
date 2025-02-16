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
                menuItem.remove();
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

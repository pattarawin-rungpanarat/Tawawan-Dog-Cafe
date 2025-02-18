document.addEventListener("DOMContentLoaded", function () {
    let btn = document.getElementById("account-btn");
    let registeredAccount =localStorage.getItem("registeredaccountadmin");

    if (registeredAccount.length > 4) {
        btn.innerText = registeredAccount.substring(0, 5) + "...";
    } else {
        btn.innerText = registeredAccount;
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const deleteButtons = document.querySelectorAll(".bx-trash");

    deleteButtons.forEach(button => {
        button.addEventListener("click", function () {
            if (confirm("คุณแน่ใจหรือไม่ว่าต้องการลบโปรโมชันนี้นี้?")) {
                let menuItem = this.closest(".menu-item");
                const menuName = menuItem.querySelector(".menu-name").textContent.replace(/\s+/g, ' ').trim();

                menuItem.remove();

                let promotion = JSON.parse(localStorage.getItem('promotion')) || [];
                promotion = promotion.filter(menu => menu.name !== menuName);
                localStorage.setItem('promotion', JSON.stringify(promotion));
            }
        });
    });
});
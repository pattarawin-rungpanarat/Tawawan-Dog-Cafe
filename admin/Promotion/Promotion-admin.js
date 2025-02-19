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
document.addEventListener("DOMContentLoaded", function () {
    const promoContainer = document.getElementById("promotionList");

    // ฟังก์ชันตรวจสอบและลบโปรโมชั่นที่หมดอายุ
    function checkAndRemoveExpiredPromotions() {
        let promotions = JSON.parse(localStorage.getItem("promotion")) || [];
        const currentDate = new Date().toISOString().split("T")[0]; // วันที่ปัจจุบันในรูปแบบ YYYY-MM-DD

        // กรองโปรโมชั่นที่ยังไม่หมดอายุ
        promotions = promotions.filter(promo => {
            return promo.endDate >= currentDate; // เก็บเฉพาะโปรโมชั่นที่ endDate ยังไม่ถึง
        });

        // บันทึกข้อมูลโปรโมชั่นที่ยังไม่หมดอายุกลับเข้า localStorage
        localStorage.setItem("promotion", JSON.stringify(promotions));
    }

    // ฟังก์ชันแสดงโปรโมชั่น
    function displayPromotions() {
        let promotions = JSON.parse(localStorage.getItem("promotion")) || [];
        promoContainer.innerHTML = "";

        promotions.forEach((promo, index) => {
            let promoElement = document.createElement("div");
            promoElement.classList.add("menu-item");

            let promoHTML = `
                <img src="${promo.image}">
                <div class="menu-details">
                    <div class="menu-name">${promo.name} <i class='bx bx-trash' onclick="deletePromotion(${index})"></i></div>
                    <div class="menu-price">
                        รายละเอียด: ${promo.condition}
                        ${promo.type === "แถม" ? `แถม ${promo.discount}` : ""}
                        ${promo.type === "ส่วนลด" ? `ได้รับส่วนลด ${promo.discount}` : ""}
                    </div>
                     <div class="date">
                     <div class="pomo-expired">เริ่มใช้ตั้งแต่: ${promo.startDate}</div>
                        <div class="pomo-expired">หมดเขต: ${promo.endDate}</div>
                    </div>
                </div>
            `;

            promoElement.innerHTML = promoHTML;
            promoContainer.appendChild(promoElement);
        });
    }

    window.deletePromotion = function (index) {
        let promotions = JSON.parse(localStorage.getItem("promotion")) || [];
        promotions.splice(index, 1);
        localStorage.setItem("promotion", JSON.stringify(promotions));
        displayPromotions();
    };
    checkAndRemoveExpiredPromotions();
    displayPromotions();
});
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
    const promoContainer = document.getElementById("promotionList");

    function displayPromotions() {
        let promotions = JSON.parse(localStorage.getItem("promotion")) || [];
        promoContainer.innerHTML = "";

        promotions.forEach((promo, index) => {
            let promoElement = document.createElement("div");
            promoElement.classList.add("menu-item");

            let promoHTML = `
                <img src="${promo.image}">
                <div class="menu-details">
                    <div class="menu-name">${promo.name}</div>
                    <div class="menu-price">
                        รายละเอียด: ${promo.condition}
                        ${promo.type === "แถม" ? `แถม ${promo.discount}` : ""}
                        ${promo.type === "ส่วนลด" ? `ได้รับส่วนลด ${promo.discount}` : ""}
                        </div>
                    <div class="date">
                        <div class="pomo-expired">หมดเขต: ${promo.endDate}</div>
                    </div>
                </div>
            `;

            promoElement.innerHTML = promoHTML;
            promoContainer.appendChild(promoElement);
        });
    }
    displayPromotions();
});
document.addEventListener("DOMContentLoaded", function () {
    let btn = document.getElementById("account-btn");
    let registeredAccount =localStorage.getItem("registeredaccountadmin");

    if (registeredAccount.length > 4) {
        btn.innerText = registeredAccount.substring(0,8) + "...";
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const conditionSelect = document.querySelector(".form-group select");
    const additionalFieldsContainer = document.querySelector(".un");

    function updateFields() {
        const selectedValue = conditionSelect.value;
        additionalFieldsContainer.innerHTML = "";
        if (selectedValue === "แถม") {
            additionalFieldsContainer.innerHTML = `
                <div class="form-group">
                    <label>เงื่อนไขของแถม :</label>
                    <input type="text" class="input" placeholder="เงื่อนไขของแถม">
                </div>
                <div class="form-group">
                    <label>แถม :</label>
                    <input type="text" class="input" placeholder="แถม">
                </div>
                <div class="form-group">
                    <label>กี่ชิ้น :</label>
                    <input type="number" class="input" placeholder="จำนวนที่แถม">
                </div>
                <div class="button-group">
                    <a href="./Addapromotion.html"><button class="cancel-button">ยกเลิก</button></a>
                    <button class="confirm-button">ยืนยัน</button>
                </div>
            `;
        } else if (selectedValue === "ส่วนลด") {
            additionalFieldsContainer.innerHTML = `
                <div class="form-group">
                    <label>เงื่อนไขส่วนลด :</label>
                    <input type="text" class="input" placeholder="เงื่อนไขส่วนลด">
                </div>
                <div class="form-group">
                    <label>จะได้ส่วนลด :</label>
                    <input type="number" class="input" placeholder="จำนวนส่วนลด">
                </div>
                <div class="button-group">
                    <a href="./Addapromotion.html"><button class="cancel-button">ยกเลิก</button></a>
                    <button class="confirm-button">ยืนยัน</button>
                </div>
            `;
        }
    }

    conditionSelect.addEventListener("change", updateFields);
});

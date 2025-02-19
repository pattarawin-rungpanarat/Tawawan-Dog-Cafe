document.addEventListener("DOMContentLoaded", function() {
    let btn = document.getElementById("account-btn");
    let text = btn.innerText;

    if (text.length > 2) {
        btn.innerText = text.substring(0, 3) + "...";
    }
});
let registeredAccount =localStorage.getItem("registeredaccountadmin");
document.getElementById("account-btn").textContent = registeredAccount;


document.getElementById("menu-image").addEventListener("change", function(event) {
    const file = event.target.files[0]; 
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageData = e.target.result;
            localStorage.setItem("promotionImage", imageData);

            const previewContainer = document.getElementById("image-preview");
            const previewIcon = document.getElementById("preview-icon");

            if (previewIcon) {
                previewIcon.style.display = "none"; 
            }

            let imgElement = previewContainer.querySelector("img");

            if (!imgElement) {
                imgElement = document.createElement("img");
                imgElement.style.width = "100%";
                imgElement.style.height = "100%";
                imgElement.style.objectFit = "cover";
                imgElement.style.borderRadius = "10%";
                previewContainer.appendChild(imgElement);
            }

            imgElement.src = imageData; 
            imgElement.style.display = "block"; 
        };
        reader.readAsDataURL(file);
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
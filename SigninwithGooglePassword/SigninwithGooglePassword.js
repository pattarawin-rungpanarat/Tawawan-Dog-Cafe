function validatePassword() {
    let password = document.getElementById("password").value;
    let errorMessage = document.getElementById("password-error");
    if (password.length < 8) {
        errorMessage.innerText = "";
        document.getElementById("password").style.border = "1px solid #ccc";
    } else {
        errorMessage.innerText = "";
        document.getElementById("password").style.border = "1px solid #ccc";
    }
}
document.getElementById("toggle-password").addEventListener("click", function () {
    const passwordInput = document.getElementById("password");
    const toggleIcon = document.getElementById("toggle-password");
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleIcon.classList.replace("bx-square", "bx-check-square");
    } else {
        passwordInput.type = "password";
        toggleIcon.classList.replace("bx-check-square", "bx-square");
    }
});
document.querySelector(".next-bnt").addEventListener("click", function (event) {
    let password = document.getElementById("password").value.trim();
    let passwordError = document.getElementById("password-error").innerText.trim();
    let errorMessage = document.getElementById("password-error");
    if (password === "") {``
        errorMessage.innerText = "❗ป้อนรหัสผ่าน";
        document.getElementById("password").style.border = "2px solid red";
        event.preventDefault();
    } else if (passwordError !== ""){
        errorMessage.innerText = "❗รหัสผ่านไม่ถูกต้อง ลองอีกครั้งหรือคลิก ลืมรหัสผ่าน เพื่อรีเซ็ตรหัส";
        document.getElementById("password").style.border = "2px solid red";
        event.preventDefault();
    } else{
        return;
    }
});
let registeredaccount = localStorage.getItem("registeredaccount");
document.getElementById("email").textContent = registeredaccount;
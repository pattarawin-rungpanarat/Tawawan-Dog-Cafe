function validatePassword() {
    let password = document.getElementById("password").value;
    let passwordError = document.getElementById("password-error");
    if (password.length < 8) {
        passwordError.innerText = "รหัสผ่านไม่ถูกต้อง ลองอีกครั้งหรือคลิก ลืมรหัสผ่าน เพื่อรีเซ็ตรหัส";
        document.getElementById("password").style.border = "2px solid red";
    } else {
        passwordError.innerText = "";
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
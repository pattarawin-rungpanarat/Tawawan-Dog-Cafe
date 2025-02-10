function validateEmail() {
    let emailInput = document.getElementById("email");
    let errorMessage = document.getElementById("email-error");
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let phonePattern = /^0[0-9]{9}$/;
    let email = document.getElementById("email").value;
    localStorage.setItem("registeredaccount", email);
    if (emailPattern.test(emailInput.value) || phonePattern.test(emailInput.value) || emailInput.value === "") {
        emailInput.style.border = "1px solid #ccc";
        errorMessage.innerText = "";
    } else {
        emailInput.style.border = "2px solid red";
        errorMessage.innerText = "❗ป้อนอีเมลหรือหมายเลขโทรศัพท์ที่ถูกต้อง";
    }
}
document.querySelector(".next-bnt").addEventListener("click", function (event) {
    let email = document.getElementById("email").value.trim();
    let emailError = document.getElementById("email-error").innerText.trim(); 
    let errorMessage = document.getElementById("email-error");
    if (email === "") {
        errorMessage.innerText = "❗ป้อนอีเมลหรือหมายเลขโทรศัพท์"
        event.preventDefault();
    } else if (emailError !== ""){
        errorMessage.innerText = "❗ป้อนอีเมลหรือหมายเลขโทรศัพท์ที่ถูกต้อง";
        event.preventDefault();
    } else{
        return;
    }
});
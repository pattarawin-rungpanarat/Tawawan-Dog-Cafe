const inputs = document.querySelectorAll('.input-group input');
inputs.forEach((input, index) => {
    input.addEventListener('input', (event) => {
        event.target.value = event.target.value.replace(/\D/g, '');
    });
    input.addEventListener('input', (event) => {
        const value = event.target.value;
        if (value && index < inputs.length - 1) {
            inputs[index + 1].focus();
        }
    });
    input.addEventListener('keydown', (e) => {
        const value = e.target.value;
        if (e.key === 'Backspace') {
            if (!value && index > 0) {
                inputs[index - 1].focus();
            } else {
                input.value = ''; 
            }
        }
    });
});
function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}
function sendOtp() {
    generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    alert("รหัส OTP ของคุณคือ " + generatedOtp);
    let otpButton = document.getElementById("otp-button");
    otpButton.disabled = true;
    let seconds = 60;
    otpButton.innerText = `รับ OTP อีกครั้ง (${seconds}s)`;
    let countdown = setInterval(() => {
        seconds--;
        otpButton.innerText = `รับ OTP อีกครั้ง (${seconds}s)`;
        if (seconds === 0) {
            clearInterval(countdown);
            otpButton.innerText = "รับ OTP";
            otpButton.disabled = false;
        }
    }, 1000);
}
function validateOtp() {
    let otpInputs = document.querySelectorAll(".input-group input");
    let otpValue = Array.from(otpInputs).map(input => input.value.trim()).join("");
    let otpErrorMessage = document.getElementById("otp-error");
    if (otpValue !== generatedOtp && otpValue.length == 6) {
        otpErrorMessage.innerText = "รหัส OTP ไม่ถูกต้อง";
        otpErrorMessage.style.color = "red";
    } else {
        otpErrorMessage.innerText = "";
    }
}
function logout() {
    alert("ออกจากระบบเรียบร้อย!");
    window.location.href = "../login/login.html";
}
document.addEventListener("DOMContentLoaded", function() {
    let btn = document.getElementById("account-btn");
    let text = btn.innerText;

    if (text.length > 6) {
        btn.innerText = text.substring(0, 7) + "...";
    }
});
let registeredaccount = localStorage.getItem("registeredaccount");
document.getElementById("account-btn").textContent = registeredaccount;
function logout() {
    alert("ออกจากระบบเรียบร้อย!");
    window.location.href = "../login/login.html";
}
let registeredaccount = localStorage.getItem("registeredaccount");
document.getElementById("account-btn").textContent = registeredaccount;
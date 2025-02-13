document.addEventListener("DOMContentLoaded", function() {
    let btn = document.getElementById("account-btn");
    let text = btn.innerText;

    if (text.length > 5) {
        btn.innerText = text.substring(0, 5) + "...";
    }
});
let registeredaccount = localStorage.getItem("registeredaccount");
document.getElementById("account-btn").textContent = registeredaccount;
document.addEventListener("DOMContentLoaded", function() {
    let btn = document.getElementById("avatar-btn");
    let registeredaccount = localStorage.getItem("registeredaccount");

    if (registeredaccount.length > 1) {
        btn.innerText = registeredaccount.substring(0, 2);
    }
});
let registeredaccount = localStorage.getItem("registeredaccount");
document.getElementById("email").innerText = localStorage.getItem("registeredemail");
document.addEventListener("DOMContentLoaded", function () {
    let btn = document.getElementById("account-btn");
    let registeredAccount =localStorage.getItem("registeredaccountadmin");

    if (registeredAccount.length > 4) {
        btn.innerText = registeredAccount.substring(0, 5) + "...";
    } else {
        btn.innerText = registeredAccount;
    }
});
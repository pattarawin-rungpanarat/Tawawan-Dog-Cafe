function logout() {
    alert("ออกจากระบบเรียบร้อย!");
    window.location.href = "../Frist/frist.html";
}
document.addEventListener("DOMContentLoaded", function() {
    let btn = document.getElementById("account-btn");
    let text = btn.innerText;

    if (text.length > 5) {
        btn.innerText = text.substring(0, 5) + "...";
    }
});
let registeredaccount = localStorage.getItem("registeredaccount");
document.getElementById("account-btn").textContent = registeredaccount;

document.getElementById("username").innerText = localStorage.getItem("registeredaccount");



document.addEventListener("DOMContentLoaded", function () {
    const usernameField = document.getElementById("username");
    const editButton = document.querySelector(".edit");
    let registeredaccount = localStorage.getItem("registeredaccount");
    let username = registeredaccount;
    usernameField.textContent = username;

    editButton.addEventListener("click", function () {
        const input = document.createElement("input");
        input.type = "text";
        input.value = username;
        input.classList.add("edit-input");

        usernameField.replaceWith(input);
        input.focus();

        input.addEventListener("blur", function () {
            username = input.value.trim() || "ชื่อของคุณ";
            localStorage.setItem("registeredaccount", username);
            usernameField.textContent = username;
            input.replaceWith(usernameField);
        });

        input.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                input.blur();
            }
        });
    });
});
function registeredaccount() {
    let email = document.getElementById("email").innerText;
    let account = document.getElementById("account").innerText;
    localStorage.setItem("registeredemail", email);
    localStorage.setItem("registeredaccount", account);
    window.location.href = "../google/google.html";
}
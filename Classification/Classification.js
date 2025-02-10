document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("notificationButton");
    const tooltip = document.getElementById("tooltip");
    let isClicked = false;

    button.addEventListener("mouseenter", function () {
        if (!isClicked) {
            tooltip.style.display = "block";
            positionTooltip();
        }
    });

    button.addEventListener("mouseleave", function () {
        if (!isClicked) {
            tooltip.style.display = "none";
        }
    });

    button.addEventListener("click", function () {
        isClicked = !isClicked;
        if (isClicked) {
            tooltip.style.display = "block";
            positionTooltip();
        } else {
            tooltip.style.display = "none";
        }
    });

    document.addEventListener("click", function (event) {
        if (!button.contains(event.target) && !tooltip.contains(event.target)) {
            tooltip.style.display = "none";
            isClicked = false;
        }
    });

    function positionTooltip() {
        const buttonRect = button.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        let left = buttonRect.left;
        let top = buttonRect.bottom + 10;
        if (left + tooltipRect.width > screenWidth) {
            left = screenWidth - tooltipRect.width - 100;
        }
        
        if (top + tooltipRect.height > screenHeight) {
            top = buttonRect.top - tooltipRect.height - 10;
        }

        tooltip.style.left = left + "px";
        tooltip.style.top = top + "px";
    }
});
document.addEventListener("DOMContentLoaded", function() {
    let btn = document.getElementById("account-btn");
    let text = btn.innerText;

    if (text.length > 6) {
        btn.innerText = text.substring(0, 7) + "...";
    }
});
let registeredaccount = localStorage.getItem("registeredaccount");
document.getElementById("account-btn").textContent = registeredaccount;
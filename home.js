
var logoutIcon = document.querySelector(".fa-sign-out");

logoutIcon.addEventListener("click", function () {
    var confirmLogout = confirm("Click OK if you want to log out.");
    if (confirmLogout) {
        alert("Logged out");
        window.location.href = "index.html";
    }
});

const loadingMask = document.querySelector("#loadingMask");
const uploadProgressText = document.querySelector("#uploadProgressText");

function showLoading() {
    loadingMask.style.display = "flex";
}

function hideLoading() {
    loadingMask.style.display = "none";
}
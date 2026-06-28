const resultModal = document.querySelector("#resultModal");
const modalTitle = document.querySelector("#modalTitle");
const modalMessage = document.querySelector("#modalMessage");

function showModal(title, message, type = "success") {
    modalTitle.innerText = title;
    if (type === "success") {
        modalTitle.style.color = "green";
    } else {
        modalTitle.style.color = "red";
    }

    modalMessage.innerText = message;
    resultModal.style.display = "flex";
}

function closeModal() {
    resultModal.style.display = "none";
}
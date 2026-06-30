const resultModal = document.querySelector("#resultModal");
const modalTitle = document.querySelector("#modalTitle");
const modalMessage = document.querySelector("#modalMessage");

function showModal(title, message) {
    modalTitle.innerText = title;
    modalMessage.innerText = message;
    resultModal.style.display = "flex";
}

function closeModal() {
    resultModal.style.display = "none";
}
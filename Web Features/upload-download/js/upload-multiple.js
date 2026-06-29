const multipleUploadForm = document.querySelector('#multipleUploadForm');
const multipleFileUploadInput = document.querySelector('#multipleFileUploadInput');

multipleUploadForm.addEventListener('submit', function(event){
    const files = multipleFileUploadInput.files;
    if(files.length === 0) {
        fileUploadError.innerHTML = "Please select at least one file";
        fileUploadSuccess.style.display = "block";
    }
    uploadMultipleFiles(files);
    event.preventDefault();
}, true);

function uploadMultipleFiles(files) {
    showLoading();

    const formData = new FormData();
    for(let index = 0; index < files.length; index++) {
        formData.append("files", files[index]);
    }
    const xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open("POST", "http://localhost:8080/v1/file/upload/multiple");

    // 控制上传进度条
    xmlHttpRequest.upload.onprogress = function (event) {
        if (event.lengthComputable) {
            const percent = Math.round((event.loaded / event.total) * 100);
            uploadProgressText.innerText = percent + "%";
        }
    };

    // Callback回调函数
    xmlHttpRequest.onload = function () {
        hideLoading();
        showModal("Upload Success", xmlHttpRequest.responseText, "success");
        multipleFileUploadInput.value = '';
        uploadProgressText.innerText = "0%";
    };
    xmlHttpRequest.onerror = function () {
        hideLoading();
        showModal("Upload Failed", xmlHttpRequest.responseText || "Internal Server Error", "error");
    };
    xmlHttpRequest.send(formData);
}
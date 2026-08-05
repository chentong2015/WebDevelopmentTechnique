const singleUploadForm = document.querySelector('#singleUploadForm');
const singleFileUploadInput = document.querySelector('#singleFileUploadInput');

const fileUploadError = document.querySelector('#fileUploadError');
const fileUploadSuccess = document.querySelector('#fileUploadSuccess');

singleUploadForm.addEventListener('submit', function(event){
    const files = singleFileUploadInput.files;
    if(files.length === 0) {
        fileUploadError.innerHTML = "Please select a file";
        fileUploadSuccess.style.display = "block";
    }
    uploadSingleFile(files[0]);
    event.preventDefault();
}, true);

// 普通的单文件上传, 一次上传整个大文件
function uploadSingleFile(file) {
    showLoading();
    const formData = new FormData();
    formData.append("file", file);

    const xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open("POST", "http://localhost:8080/v1/file/upload/single");

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
        uploadProgressText.innerText = "0%";
        showModal("Upload Finish", xmlHttpRequest.responseText);
        singleFileUploadInput.value = '';
    };
    xmlHttpRequest.onerror = function () {
        hideLoading();
        showModal("Upload Failed", xmlHttpRequest.responseText || "Internal Server Error");
    };
    xmlHttpRequest.send(formData);
}

// TODO. 如果后端返回Object对象则解析JSON.parse(xmlHttpRequest.responseText);
function handleUploadResponse(xmlHttpRequest) {
    if (xmlHttpRequest.status === 200) {
        fileUploadError.style.display = "none";
        fileUploadSuccess.innerHTML = "<b> Success ! " + xmlHttpRequest.responseText + "</b>";
        fileUploadSuccess.style.display = "block";
    } else {
        fileUploadSuccess.style.display = "none";
        fileUploadError.innerHTML = "<b> Error: Upload failed </b>";
    }
}
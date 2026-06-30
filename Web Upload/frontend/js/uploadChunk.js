const chunkUploadForm = document.querySelector('#chunkUploadForm');
const chunkFileUploadInput = document.querySelector('#chunkFileUploadInput');

chunkUploadForm.addEventListener('submit', function(event){
    const files = chunkFileUploadInput.files;
    if(files.length === 0) {
        fileUploadError.innerHTML = "Please select a file";
        fileUploadSuccess.style.display = "block";
    }
    uploadWithChunks(files[0]);
    event.preventDefault();
}, true);

// TODO. Chunk分片上传: 定义上传文件唯一ID, 并记录上传进度
async function uploadWithChunks(file) {
    showLoading();
    uploadProgressText.innerText = "0%";

    const chunks = createChunks(file);
    const timestamp = Math.floor(Date.now() / 1000);
    const fileId = file.name + "-" + timestamp;
    for (let i = 0; i < chunks.length; i++) {
        const formData = new FormData();
        formData.append("file", chunks[i], file.name);
        formData.append("index", i);
        formData.append("total", chunks.length);
        formData.append("fileId", fileId);

        try {
            // await只能出现在async函数中
            // 暂停当前函数, 接收resolve()通知, 直到uploadChunk完成再继续
            await uploadChunk(formData);

            const percent = Math.round(((i + 1) / chunks.length) * 100);
            uploadProgressText.innerText = percent + "%";
            chunkFileUploadInput.value = '';
        } catch (err) {
            showModal("Upload Failed", xmlHttpRequest.responseText || "Internal Server Error", "error");
            console.log("upload paused, network error");
            return; // 停止上传，等待恢复
        }
    }
    hideLoading();
    showModal("Success", "Upload completed", "success");
}

// Chunk file size = 32M
function createChunks(file, chunkSize = 32 * 1024 * 1024) {
    const chunks = [];
    let start = 0;
    while (start < file.size) {
        const end = Math.min(start + chunkSize, file.size);
        chunks.push(file.slice(start, end));
        start = end;
    }
    return chunks;
}

// TODO. Promise未来完成的任务(成功或失败)
// 成功调resolve() -> 告诉await这轮上传已经完成, 可以继续下一轮
// 失败调reject() -> 停止上传
function uploadChunk(formData) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:8080/v1/file/upload/chunk");
        xhr.onload = function () {
            if (xhr.status === 200) {
                resolve();
            } else {
                reject();
            }
        };
        xhr.onerror = function () {
            reject();
        };
        xhr.send(formData);
    });
}
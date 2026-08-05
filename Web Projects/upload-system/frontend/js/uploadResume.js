// TODO. 重新加载页面, 联网恢复, 重启电脑
// 添加特定的时间监听器来实现真正的断点续传
window.addEventListener("online", () => {
    console.log("network restored, resume upload");
    resumeUpload();
});

// 从后端获取特定文件上传的进度, 继续上传缺失的分片
function resumeUpload() {
    const fileId = localStorage.getItem("currentFileId");
    if (fileId) {
        // uploadWithResume(pendingFile);
    }
}

// 不推荐使用localStorage存储上传进度, 应该由后端存储
function updateChunkIndex(fileId) {
    // let uploadedIndex = localStorage.getItem(fileId) || 0;
    // localStorage.setItem(fileId, i + 1);
    // localStorage.removeItem(fileId);
}
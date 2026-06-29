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
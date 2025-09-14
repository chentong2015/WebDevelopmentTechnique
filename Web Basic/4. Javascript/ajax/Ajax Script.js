let oldPercentage = 0;
const baseUrlPath = "http://localhost:8081/status/refresh/";

// 设置Ajax请求的时间间隔，定时刷新页面的数据
setInterval(refreshStatusCallback, 500);

function refreshStatusCallback() {
    let orderId = '001';
    if (orderId !== "search") {
        $.ajax({
            url: baseUrlPath + orderId
        }).then(function (data) {
            if (data.percentage > oldPercentage) {
                oldPercentage = data.percentage;
                // refresh web page data
            }
        });
    }
}
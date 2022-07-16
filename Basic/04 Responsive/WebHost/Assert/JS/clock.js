// 实现页面时钟的简单效果
// 将date时间动态(每隔1秒中) 实时刷新在页面上
// 通过JS实际逻辑 控制页面标签的动态属性

const tagDivSecond = document.getElementById("");
const tagDivMinute = document.getElementById("");
const tagDivHour = document.getElementById("");

// 控制transform转变属性 !!!

function updateClock() {
    var date = new Date();
    var second = date.getSeconds() / 60;
    var minute = date.getMinutes() / 60;
    var hour = date.getHours() / 12;
    // 设置时钟的显示UI 旋转的角度
    tagDivSecond.style.transform = "rotate(" + (second * 360) + ")deg";
    tagDivMinute.style.transform = "rotate(" + (minute * 360) + ")deg";
    tagDivHour.style.transform = "rotate(" + (hour * 360) + ")deg";
}

// 设置刷新的频率 调用方法的时间间隔
setInterval(updateClock, 1000);

updateClock();
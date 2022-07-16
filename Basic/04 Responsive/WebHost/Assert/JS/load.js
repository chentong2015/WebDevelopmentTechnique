//////////////////////////////////////////
// JS 动态类型的语言，弱类型的语言，基于原型prototype-based 
// 方法的规范: 首字母小写, 大小写敏感
// 问题一般是在运行的时候发现 !!!!
/////////////////////////////////////////

var onLoadCallBacks = []; // 全局的变量 数组

// 添加一个在页面加载时候需要被回调的方法
function onLoad(callback) {
    onLoadCallBacks.push(callback);
}

// JS Event事件处理器 "DOMContentLoaded"作为后面方法的参数
// Event在DOM页面的元素加载完成之后执行
document.addEventListener("DOMContentLoaded", function () {
    processOnLoad();
});

// 页面加载时的处理逻辑
function processOnLoad() {
    // 执行回调数组中的所有的方法
    for (var i = 0; i < onLoadCallBacks.length; i++) {
        onLoadCallBacks[i]();
    }
}

onLoad(function () {
    // 多种选择页面元素的方式 ==>  CSS 选择器
    // a 直接选择标签的名称
    // .className 选择指定的名称
    // [] 属性选择指定的属性值 href="#topmenu"
    var menuExpanders = document.querySelectorAll("[href='#topmenu']");
    console.log("log conole");
    console.debug("debug console");

    // 监听元素的Event事件
    for (var i = 0; i < menuExpanders.length; i++) {
        menuExpanders[i].addEventListener("click", function (e) {
            // http://127.0.0.1:5500/WebHost/blog.html#topmenu
            // Disable link url 取消自动跳转的链接
            e.preventDefault();

            // 给指定的标签添加class名称属性
            var topNavMenu = document.getElementById("top-nav-ul");
            // 使用触发模式，再次点击可以取消
            topNavMenu.classList.toggle("expanded");
        });
    }
});
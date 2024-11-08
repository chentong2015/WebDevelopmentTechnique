var scrollCallBacks = [];

// Tracking id for the scroll timer 
var scrollTimerCallbackID = null;
var lastScrollTime = 0;
var scrollUpdateInterval = 200;

// 页面滚动的向上和向下的相对位置举例 
function getScrollTopPosition() {
    return window.scrollY || window.screenTop || document.getElementsByTagName("html")[0].screenTop;
}

function onScroll(callback) {
    scrollCallBacks.push(callback);
}

function processOnScroll() {
    for (var i = 0; i < scrollCallBacks.length; i++) {
        scrollCallBacks[i]();
    }
}

// Hook into page scrolling 
window.addEventListener("scroll", function () {
    // 页面滚动的时候，这里执行的次数过多 !! 滚动一次，触发20多次

    // 自定义控制页面滚动效果下的事件触发
    // If the last callback has finished, or it has never been fired 
    if (!scrollTimerCallbackID) {
        // For the first time
        if (lastScrollTime == 0) {
            lastScrollTime = new Date().getTime();
            processOnScroll();
        }

        // Start a timeout to fire after the interval
        // 在指定的时间间隔之后，触发一个方法，返回一个number给ID ==> 避免拖慢页面的渲染
        scrollTimerCallbackID = setTimeout(function () {
            processOnScroll();
            // 启动之后，在时间间隔之后重置
            scrollTimerCallbackID = null;
        }, scrollUpdateInterval);
    }
});

// 标识滚动的记录
var scrollDown = false;
var scrollDownStart = 0;

// 拿到标签上面现有的属性的名称，再添加到标签的class值上面
// var navTagItem = document.querySelectorAll("[data-scrolldown-class");
onScroll(function () {
    var navTagItem = document.getElementById("top-nav");
    // 确定是滚动向下的时候添加
    if (!scrollDown && getScrollTopPosition() > scrollDownStart) {
        scrollDown = true;
        navTagItem.classList.add("reduced");
    } else if (scrollDown && getScrollTopPosition() <= scrollDownStart) {
        // 滚回到顶部的时候
        scrollDown = false;
        navTagItem.classList.remove("reduced");
    }
});

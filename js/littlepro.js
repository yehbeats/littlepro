/**
 * Created by lenovo on 2016/6/6.
 */
(function (window, undefined) {
    window.onload = function () {

        var btn = document.querySelector(".menu-button");
        var clock = document.querySelector("#clock");
        var body = document.body;
        btn.onclick = function () {
            if(body.className.indexOf("close") !== -1){
                body.className = "nav-opened";
            }else {
                body.className = "nav-closed";
            }
        };

        function setClock(element) {
            var hour = element.querySelector(".hour");
            var minute = element.querySelector(".minute");
            var second = element.querySelector(".second");

            var rotate = function (elem, num) {
                elem.style.transform = 'rotate('+ (num * 6)+'deg)';
            };

            var step = function () {
                var now = new Date();

                //得到总的秒数
                var time = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds() * 1 + now.getMilliseconds() / 1000;
                rotate(hour, time / 60 / 12);
                rotate(minute, time / 60);
                rotate(second, time);
                requestAnimationFrame(step);
            };
            step();
        }
        setClock(clock);
    }
})(window);
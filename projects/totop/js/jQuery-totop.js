/**
 * Created by yehbeats on 2016/7/10.
 */
//返回顶部
//style="position:fixed;bottom:150px;right:50px;cursor: pointer;"
function totop(opt) {
    var option = {
        upperLimit: 500,
        scrollSpeed: 500,
        fadeTime: 300,

        //位置信息
        bottom: 150,
        right: 50
    };
    var scrollElem = $('#totop');


    //初始化参数，看是否有新的参数传入
    var opts = $.extend(option, opt || {});
    var upperLimit = opts.upperLimit,
        scrollSpeed = opts.scrollSpeed,
        fadeTime = opts.fadeTime,
        bottom = opts.bottom,
        right = opts.right;

    scrollElem.css({position: "fixed", cursor: "pointer", bottom: bottom+"px", right: right+"px"});
    scrollElem.hide();
    $(window).scroll(function () {
        var scrollTop = $(document).scrollTop();
        if ( scrollTop > upperLimit ) {
            $(scrollElem).stop().fadeTo(fadeTime, 1); // fade back in
        }else{
            $(scrollElem).stop().fadeTo(fadeTime, 0); // fade out
        }
    });

    // Scroll to top animation on click
    $(scrollElem).click(function(){
        $('html, body').animate({scrollTop:0}, scrollSpeed); return false;
    });
}
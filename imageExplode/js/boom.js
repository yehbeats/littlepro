/**
 * Created by lenovo on 2016/5/5.
 */
(function(window, undefined){
    window.onload = function(){

        var picDiv = document.getElementById("picture"),
            btn = document.getElementById("reset"),
            height = picDiv.offsetHeight,
            width = picDiv.offsetWidth,
            centerX = width / 2,
            centerY = height / 2;

        picDiv.onclick = function () {
            console.log(height+":"+width);
            insertDiv();
            Boom();
        };

        btn.onclick = function() {
            picDiv.innerHTML = "";
            picDiv.className = "img-block picture";
        };

        function insertDiv(){
            picDiv.className = "img-block";
            var rows = 10,
                littleLength = Math.floor(height / 10),
                cols = Math.floor(width / littleLength);

            for(var i=0; i < rows; i++){
                for(var j = 0; j < cols; j++){
                    var div = document.createElement("div");
                    var randomSize = Math.random() * 3;
                    div.style.width = littleLength + "px";
                    div.style.height = littleLength + "px";
                    div.style.position = "absolute";
                    div.style.left = littleLength * j + "px";
                    div.style.top = littleLength * i + "px";
                    div.style.backgroundImage = "url('img/10.jpg')";
                    div.style.backgroundPosition = -littleLength * j+"px "+-littleLength*i+"px";
                    div.style.borderRadius = "50%";
                    div.style.transform = "scale("+randomSize+")";
                    picDiv.appendChild(div);
                }
            }
        }

        function getPosition(div){
            var slope = 0, //直线斜率
                boomScale = Math.random() * 3,
                distance = boomScale * centerX,
                result = {
                    x : 0,
                    y : 0
                };
            if(centerX != div.x && centerY != div.y) {
                slope = (div.y - centerY) / (div.x - centerX);
                var b = centerY - (slope * centerX); //以当前的斜率，b的值为多少 y=kx+b;

                //求轨迹终止的y点
                result.y = (2 * div.y - centerY) + ((Math.random() > 0.5 ? Math.random() * 4 : -Math.random() * 4));

                //求轨迹终止的x点
                result.x = (result.y - b) / slope;

                return result;
            }else if(centerX === div.x){
                if(centerY > div.y){
                    return {
                        x: centerX,
                        y: centerY - distance
                    }
                }else {
                    return {
                        x: centerX,
                        y: centerY + distance
                    }
                }
            }else if(centerY === div.y){
                if(centerX > div.x) {
                    return {
                        x: centerX - distance,
                        y: centerY
                    }
                }else{
                    return {
                        x:centerX + distance,
                        y: centerY
                    }
                }
            }else{
                return;
            }
        }

        function Boom(){
            var divs = picDiv.getElementsByTagName("div");
            for(var i=0; i<divs.length; i++){
                var now = divs[i];
                var divPoint = {
                    x : parseInt(now.style.left),
                    y : parseInt(now.style.top)
                };
                var resultPoint = getPosition(divPoint);
                $(divs).eq(i).animate({
                    left: resultPoint.x,
                    top: resultPoint.y,
                    opacity: 0
                }, 700);

            }
        }

    };
}(window));
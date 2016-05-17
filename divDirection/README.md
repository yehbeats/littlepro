# 根据鼠标进入div的方向显示遮罩层
---
&emsp;&emsp;在一个前端群里有人提到了百度图片上，图片信息遮罩层的显示效果。[在这个网址](http://image.baidu.com/search/index?tn=baiduimage&st=-1&ipn=r&ct=201326592&nc=1&lm=-1&cl=2&ie=utf-8&word=%E7%A7%BB%E8%BD%B4%E6%91%84%E5%BD%B1&ie=utf-8&istype=2&fm=se0)，可以点进去看一下，自己便想尝试做一下。


&emsp;&emsp;先上自己实现的样例[点我点我](http://yehbeats.github.io/littlepro/divDirection/)问题的关键在于判断进入div的方向，查找了网上的资料，下面这个算法很不错，根据自己的理解整理如下。

##核心代码（jQuery版）
```javascript
<script type="text/javascript">
  $("#wrap").bind("mouseenter mouseleave",function(e) {
          var w = $(this).width();
          var h = $(this).height();
          var x = (e.pageX - this.offsetLeft - (w / 2)) * (w > h ? (h / w) : 1);
          var y = (e.pageY - this.offsetTop - (h / 2)) * (h > w ? (w / h) : 1);
          var direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4; //direction的值为“0,1,2,3”分别对应着“上，右，下，左”
          var eventType = e.type;
          var dirName = new Array('上方','右侧','下方','左侧');
          if(e.type == 'mouseenter'){
              $("#result").html(dirName[direction]+'进入');
          }else{
              $('#result').html(dirName[direction]+'离开');
          }
});
</script>

```
##理解
&emsp;&emsp;如下图所示，以高和宽的最小值作为直径画圆，将圆分为了四个象限，分别代表着鼠标所进入的不同方向。

![如图](http://ww3.sinaimg.cn/mw690/7ee04834jw1f3yn3v6iukj20of0bmta2.jpg)

&emsp;&emsp;`w`和`h`分别为div的宽度和高度，`e.pageX`和`e.pageY`得到鼠标进入div时的位置，由此可以计算出在圆形所属正方形内`x`和`y`。计算x坐标值时，如果点原来的x坐标的绝对值大于圆的半径值，则按 `h/w`这个比例进行缩小，使得到的点的位置在容器的边界位置所对应的象限区间里。


**注意：atan2所计算出的是弧度。弧度与角度的转换关系为：**`1弧度=180度/PI`


&emsp;&emsp;下图是`atan2`的计算图示，返回值是-PI到到PI的范围`[-PI,PI]`。

![如图](http://ww1.sinaimg.cn/mw690/7ee04834jw1f3yn9fur9bj20as0c1jry.jpg)

&emsp;&emsp;所以由此可知，当在x轴上方时，也就是y轴的负方向，`atan(y, x)`的值在`-PI到0`之间；x轴下方，也就是y轴的正方向，在`0到PI`之间。

&emsp;&emsp;所以最后在计算方向时，先将弧度转化成角度，加上180度保证了不会出现负的度数，从而使度数的范围为`0度-360度`。

&emsp;&emsp;如果仔细算的话，会发现`0度-360度`的分布其实是从x轴的负方向开始为0度，顺时针计算，这样的话，分为的四个部分分别是：【上部`45-135`】【右部`135-225`】【下部`225-315`】【左部`0-45`和`315-360`】。

&emsp;&emsp;在计算方向时，还有一个很精妙的地方就是`除以90，再取四舍五入值`，这样就以45度为分界线，最后的加3和对4取余是为了修正结果，使结果按照0，1，2，3分别代表上、右、下、左。

&emsp;&emsp;最后根据方向可以实现信息遮罩层的出入。[我实现的一个样例](http://yehbeats.github.io/littlepro/divDirection/)，当鼠标在不同的div间移动时，产生信息层连贯动画的效果。
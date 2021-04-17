$(function (){
//    1.监听‘游戏规则’的点击
    $('.rules').click(function (){
        $('.rule').stop().fadeIn(100)
    })
//    2.监听‘关闭’按钮的点击
    $('.close').click(function (){
        $('.rule').stop().fadeOut(100)
    })
//    3.监听‘开始按钮’的点击
    $('.start').click(function (){
        $(this).stop().fadeOut(100)
        //调用处理进度条的方法
        progressHandler();
        //调用处理灰太狼动画的方法
        startWolfAnimation()
    })
//    4.监听重新开始按钮
    $('.reStart').click(function (){
        $('.mask').stop().fadeOut(100)
        progressHandler()
        startWolfAnimation()
        $('.score').text(0)
    })
//    5.


//定义处理进度条的方法
    function progressHandler(){
    //    重新设置进度条宽度
        $('.progress').css({
            width: 180
        })
    //    开启定时器处理进度条
        var timer = setInterval(function (){
            var progressWidth = $('.progress').width()
            progressWidth -= 1
            $('.progress').css({
                width: progressWidth
            })
            if (progressWidth <= 0){
                clearInterval(timer)
                $('.mask').stop().fadeIn(100)

                stopWolfAnimation()
            }
        }, 50)
    }

})

var wolfTimer
//定义处理灰太狼动画的方法
function startWolfAnimation() {

    var wolf_1=['./images/h0.png','./images/h1.png','./images/h2.png','./images/h3.png','./images/h4.png','./images/h5.png','./images/h6.png','./images/h7.png','./images/h8.png','./images/h9.png'];
    var wolf_2=['./images/x0.png','./images/x1.png','./images/x2.png','./images/x3.png','./images/x4.png','./images/x5.png','./images/x6.png','./images/x7.png','./images/x8.png','./images/x9.png'];
    var arrPos = [
        {left:"100px",top:"115px"},
        {left:"20px",top:"160px"},
        {left:"190px",top:"142px"},
        {left:"105px",top:"193px"},
        {left:"19px",top:"221px"},
        {left:"202px",top:"212px"},
        {left:"120px",top:"275px"},
        {left:"30px",top:"295px"},
        {left:"209px",top:"297px"}
    ];
    var $wolfImage = $('<img src="" class="wolfImage">')
    var posIndex = Math.round(Math.random() * 8)
    $wolfImage.css({
        position: 'absolute',
        left: arrPos[posIndex].left,
        top: arrPos[posIndex].top
    })
    var wolfType = Math.round(Math.random()) == 0 ? wolf_1 : wolf_2
    window.wolfIndex = 0
    window.wolfIndexEnd = 5
    wolfTimer = setInterval(function () {
        if (wolfIndex > wolfIndexEnd){
            $wolfImage.remove()
            clearInterval(wolfTimer)
            startWolfAnimation()
        }
        $wolfImage.attr('src', wolfType[wolfIndex])
        wolfIndex++
    }, 70)

    $('.container').append($wolfImage)

    //调用处理游戏规则的方法
    gameRules($wolfImage)
}

//定义处理游戏规则的方法
function gameRules($wolfImage){
    $wolfImage.one('click',function (){
        window.wolfIndex = 5
        window.wolfIndexEnd = 9
        var $src = $(this).attr('src')
        var flag = $src.indexOf('h') >= 0
        if (flag){
            //加分
            $('.score').text(parseInt($('.score').text())+10)
        }else{
            $('.score').text(parseInt($('.score').text())-5)
        }
    })
}

function stopWolfAnimation(){
    $('.wolfImage').remove()
    clearInterval(wolfTimer)
}

    /*
    0  * 8 = 0   == 0
    0.1* 8 = 0.8 == 1
    0.2* 8 = 1.6 == 2
    0.3* 8 = 2.4 == 2
    0.4* 8 = 3.2 == 3
    0.5* 8 = 4.0 == 4
    0.6* 8 = 4.8 == 5
    0.7* 8 = 5.6 == 6
    0.8* 8 = 6.4 == 6
    0.9* 8 = 7.2 == 7
    1* 8 =  8    == 8
    */
    // console.log(Math.random());
    // console.log(Math.round(0.5));
//swiperFather配置
var swiperFather = new Swiper('.swiper-container-father', {
    effect : 'slide', //切换效果
    flipEffect: {
        slideShadows : true,
        limitRotation : true,
    },
    direction: 'vertical', //垂直翻页
    onlyExternal : true, //值为true时，slide无法拖动
});
//swiperSon配置
var swiperSon = new Swiper('.swiper-container-son',{
    effect: 'cube',
    grabCursor: true,
    onlyExternal : true,
    cube: {
        shadow: false,
        slideShadows: false
    },
    onTransitionStart: function (swiper) {
        isPage = swiper.activeIndex + 1;
    }
});

//声明_czc对象:
var _czc = _czc || [];
//绑定siteid，请用您的siteid替换下方"XXXXXXXX"部分
_czc.push(["_setAccount", "1274469920"]);
var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
document.write(unescape("%3Cspan id='cnzz_stat_icon_1274469920'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s13.cnzz.com/z_stat.php%3Fid%3D1274469920%26show%3Dpic' type='text/javascript'%3E%3C/script%3E"));

//音乐自动播放
document.addEventListener('DOMContentLoaded', function () {
  	function audioAutoPlay() {
      	var audio = document.getElementById('bgmusic');
        audio.play();
      	document.addEventListener("WeixinJSBridgeReady", function () {
          	audio.play();
      	}, false);
  	}
  	audioAutoPlay();
});
//弹幕
var int = self.setInterval("clock()",500)
function clock() { 
    var words = [
        "<img src='./images/page1/tm1.png'>",
        "<img src='./images/page1/tm2.png'>",
        "<img src='./images/page1/tm3.png'>",
        "<img src='./images/page1/tm4.png'>",
        "<img src='./images/page1/tm5.png'>",
        "<img src='./images/page1/tm6.png'>",
        "<img src='./images/page1/tm7.png'>",       
    ];
    var word = words[Math.floor(Math.random()*words.length)];//随机产生一个弹幕的内容
    //定义一个变量用来存储top值。最小值是0，最大值是600.
    $top = Math.random() * 280;
    
    //定义词一个变量图片的大小,最小值10，最大值40.
    $fon = Math.random() * 200 + 100;
    //为span设置随机的速度,最快速度为5000.
    $speed = Math.random() * 7000 + 5000;
    //创建span节点追加到div中
    $("<span class='dmSpan'>"+ word +"</span>").appendTo(".barrage").addClass("span").siblings().removeClass("span");
    $(".span>img").css({"width":$fon});
    //获取span的宽度
    $wid = $(".span").width();
    //设置样式
    $(".span").css({"top":$top,"right":-$wid});
    //设置目的地、速度、运动方式、回调函数。
    $(".span").animate({"left":-$wid},$speed,"linear",function(){
        $(this).remove();
    });
}
//题目总数
var total;
//当前页
var isPage;
//答题得分数组
var gradeArr = [];
var imgUrl = 'https://h5myeyes.github.io/answer/images/page2/tag.png';
var shareTitle = '测一测，你是哪种类型的追剧人';
var shareDesc = '找出自己鲜为人知的一面';

//分享
document.getElementById('call').addEventListener('click', function() {
    soshm.popIn({
        // 分享的链接，默认使用location.href
        url: 'https://h5myeyes.github.io/answer/index.html',
        // 分享的标题，默认使用document.title
        title: '测一测，你是哪种类型的追剧人',
        // 分享的摘要，默认使用<meta name="description" content="">content的值
        digest: '寻找自己鲜为人知的一面',
        // 分享的图片，默认获取本页面第一个img元素的src
        pic: 'https://h5myeyes.github.io/answer/images/page2/tag.png',
        // 默认显示的网站为以下六个个,支持设置的网站有
        sites: ['weixin', 'weixintimeline', 'weibo', 'tqq', 'tieba', 'douban']
    });
    _czc.push(['_trackEvent', '测一测，你是哪种类型的追剧人', '点击分享按钮']);
    
}, false);

//拆礼包
document.getElementById('gift').addEventListener('click', function() {
    window.open("https://m.miguvideo.com/wap/resource/migu/activity/topic/indexTopic.jsp?nodeId=70060982");
    _czc.push(['_trackEvent', '测一测，你是哪种类型的追剧人', '点击拆礼包按钮']);
}, false);
window.onload = function () {
    _czc.push(['_trackEvent', '测一测，你是哪种类型的追剧人', '进入页面']);
    //分享信息
    if ($.is_weixn()){
        $.weixinSecondShare(shareTitle, shareDesc, imgUrl);
    }
  
    //隐藏loading
    $(".loading").css("display","none");
	//翻下一页
    $('.fatherBtn').click(function(){
        //清除定时器
        window.clearInterval(int);
    	swiperFather.slideNext(true, 1000);
        //swiperSon下一题
        nextBackPng ();
        _czc.push(['_trackEvent', '测一测，你是哪种类型的追剧人', '点我立即测试']);
    });
  	// 音乐播放
  	var music = $("#bgmusic").get(0);
  	var onOff = $(".ctrl");
  	onOff.on("click", function (e) {
  		music.paused ? music.play() : music.pause();
  	}), $(music).on("play pause", function (t) {
  		switch (t.type) {
              case "play":
                    onOff.addClass("on");
                    _czc.push(['_trackEvent', '测一测，你是哪种类型的追剧人', '打开音乐']);
  				break;
  			case "pause":
                    onOff.removeClass("on");
                    _czc.push(['_trackEvent', '测一测，你是哪种类型的追剧人', '关闭音乐']);
  		}
  	});

    //渲染题目
    var radios;
    function getOption () {
        var fatherData = '';
        $.each(fixtureDate.data.option, function(index, val) {
            var sonData = '';
            total = fixtureDate.data.option.length;
            $.each(val.answers, function(optIndex, optVal) {
                sonData += 
                    '<p>\
                        <input id=' + "item_" + val.id + '_' + optIndex + ' type="radio" name=' + "item_" + val.id + ' value=' + optVal.grade + '>\
                        <label for=' + "item_" + val.id + '_' + optIndex + '>\
                            <span>\
                                <b>' + optVal.number + '</b>\
                                ' + optVal.topic + '\
                            </span>\
                        </label>\
                    </p>'
            });

            fatherData += 
                '<div class="swiper-slide question">\
                    <img class="questionBack" src="./images/page2/paper.png">\
                    <div class="">\
                        <img class="tag" src=' + val.tag + '>\
                        <span class="qNum">' + val.qn + '</span>\
                        <p class="title">' + val.title + '</p>\
                        <div class="option">' + sonData + '</div>\
                    </div>\
                </div>'
        });
        swiperSon.appendSlide(fatherData);
    }
    
    //答题数组
    function putRadioVal () {
        for (var i = 1; i <= total; i++) {
            $(document).on('change', 'input[name="item_'+ i +'"]:radio', function(){
                //js控制input点击
                $(this).parents('p').children('input').eq(0).prop('checked',true);
                // console.info($(this).parents('p').find('span').text())
                _czc.push(['_trackEvent', '点击的答案', $(this).parents('p').find('span').text()]);

                let arrNum = $(this)[0].name.substr($(this)[0].name.length-1,1);
                //获取到答题数组gradeArr
                gradeArr[arrNum - 1] = $(this).val()
                if (isPage == total) {
                    resultPng (); 
                    changBtn ();          
                    
                } else {  
                    nextPng ();                
                    changBtn ();

                }
            });
        }
    }
    //可点下一题
    function nextPng () {
        let sonBtn = '<img class="animated tada sonNextBtn" src="./images/page2/next.png">'
        $(".sonBtn").html(sonBtn);
        _czc.push(['_trackEvent', '测一测，你是哪种类型的追剧人', '点击进入下一题按钮']);
    }
    //禁点下一题
    function nextBackPng () {
        let sonBtn = '<img src="./images/page2/nextBack.png">'
        $(".sonBtn").html(sonBtn);
        _czc.push(['_trackEvent', '测一测，你是哪种类型的追剧人', '点击禁止进入下一题按钮']);
        
    }
    //获取结果
    function resultPng () {
        let sonBtn = '<img class="animated tada resultBtn" src="./images/page2/result.png">'
        $(".sonBtn").html(sonBtn);
        _czc.push(['_trackEvent', '测一测，你是哪种类型的追剧人', '点击获取结果按钮']);
        
    }
    //更换下一题按钮
    function changBtn () {
        $('.sonNextBtn').click(function(){
            swiperSon.slideNext(true, 1000);
            nextBackPng ();
        });
        //最后得分        
        $(".resultBtn").click(function(){
            swiperSon.removeAllSlides(); //移除全部
            
            var sum = 0;
            for (j = 0; j < gradeArr.length; j++) {
                sum += parseInt(gradeArr[j]);
            }
            console.info(gradeArr, sum)
            if (5 <= sum && sum <= 10) {
                resultData (0);
            } else if (26 <= sum && sum <= 35) {
                resultData (1);
            } else if (11 <= sum && sum <= 15) {
                resultData (2);
            } else if (16 <= sum && sum <= 25) {
                resultData (3);
            } else {
                resultData (0);
            }
            swiperFather.slideNext(true, 1000);
            
        })
    }
    //四种结果分析
    function resultData (e) {
        let data = fixtureDate.data.result;
        let page3Div = "";
        
        page3Div +=
            '<div class="page3Title">\
                <img src=' + data[e].title + '>\
            </div>\
            <div class="page3Details">\
                <img src=' + data[e].analysis + '>\
            </div>'
        $(".page3Div").append(page3Div);
    }
    
    getOption ();
    putRadioVal ();
}


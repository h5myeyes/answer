/**
 * Created by shaoxiaolai on 2017/2/21 0021.
 */
;
(function($, window, document) {
  $.extend({
    "getUrlParam": function(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return decodeURI(r[2]);
      return null
    },
    "isEmptyObject": function(obj) {
      for (var n in obj) {
        return false
      }
      return true
    },
    "is_weixn": function(){
      var ua = navigator.userAgent.toLowerCase();if(ua.match(/MicroMessenger/i)=="micromessenger") {
        return true;
      } else {
        return false;
      }
    },
    "weixinSecondShare": function(title, desc, imgSrc) {
      if(!imgSrc){          imgSrc = '/wap/resource/mh/hd/ht/img/shareLogo.png';
      }

      var signUrl = location.href.split('#')[0];
      $.ajax({
        //url: "/getWechatAccessToken.msp?site=2&weiboType=WEIXIN&url="+signUrl,
        url: "/getWechatAccessToken.msp",
        dataType: "json",
        type: "POST",
        data: {
          site: "2",
          weiboType: "WEIXIN",
          url: signUrl
        },
        success: function(data) {
          wx.config({
            debug: false,
            appId: 'wx87370e05e9d51a3c',
            timestamp: data.timestamp,
            nonceStr: data.noncestr,
            signature: data.signature,
            jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
          });
          wx.ready(function() {
            wx.onMenuShareAppMessage({
              title: title,
              desc: desc,
              link: signUrl,
              imgUrl: location.origin + imgSrc,
              trigger: function(res) {},
              success: function(res) {},
              cancel: function(res) {},
              fail: function(res) {}
            });
            wx.onMenuShareTimeline({
              title: title,
              link: signUrl,
              imgUrl: location.origin + imgSrc,
              trigger: function(res) {},
              success: function(res) {},
              cancel: function(res) {},
              fail: function(res) {
                alert(JSON.stringify(res))
              }
            })
          })
        }
      })
    }
  })
})(jQuery, window, document);
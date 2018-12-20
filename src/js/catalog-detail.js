/*
 * @Author: mikey.zhaopeng
 * @Date: 2018-09-26 17:24:15
 * @Last Modified by: fly
 * @Last Modified time: 2018-12-20 18:13:51
 */
$(function() {
  // var urlBase = 'http://cdyoue.com.cn:19082/zwjh/api/v1';  // 改成开发地址(不经过nginx代理的地址)
  var urlBase = "/portalapi/zwjh/api/v1"; // 打包后用nginx代理到目标地址
  // var urlBase = "http://192.168.100.16:2181/zwjh/api/v1"; // 改成开发地址(不经过nginx代理的地址)
  function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
  }
  $.ajax({
    type: "get",
    url: urlBase + "/getResourceTypeById",
    data: { resourceId: getUrlParam("id") },
    success: function(res) {
      if (+res.code === 0) {
        $("#detail .info").html(template("detail-template", res.data));
        // $("#detail .info").children(".downloadBtn").click(function(){

        // })
      }
    },
    error: function(error) {
      console.log(error);
    },
    timeout: function() {
      console.log("连接超时");
    }
  });
  $.ajax({
    type: "get",
    url: urlBase + "/getResourceItemList",
    data: { limit: 10, index: 1, resourceId: getUrlParam("id") },
    success: function(res) {
      if (+res.code === 0) {
        $("#detail .info_footer").html(template("code_list", res.data));
      }
    },
    error: function(error) {
      console.log(error);
    },
    timeout: function() {
      console.log("连接超时");
    }
  });
  function downloadFile(url) {
    try {
      var elemIF = document.createElement("iframe");
      elemIF.src = url;
      elemIF.style.display = "none";
      document.body.appendChild(elemIF);
    } catch (e) {
      zzrw.alert("下载异常！");
    }
  }
  $.ajax({
    type: "get",
    url: urlBase + "/getReqBeanEntityInfo",
    // url: "http://192.168.100.16:8805/getReqBeanEntityInfo",
    data: { id: getUrlParam("id") },
    success: function(res) {
      if (+res.code === 0) {
        $("#detail .info").on("click", ".downloadBtn", function() {
          var hrefs = res.result && res.result.data;
          var $eleForm = $("<form method='get'></form>");
          $eleForm.attr("action", hrefs);
          $(document.body).append($eleForm);
          $eleForm.submit();
          $eleForm.remove();
          // var eleLink = document.createElement('a');
          // eleLink.download = hrefs;
          // eleLink.style.display = 'none';
          // // 字符内容转变成blob地址
          // // var blob = new Blob([hrefs]);
          // // eleLink.href = URL.createObjectURL(blob);
          // eleLink.href = hrefs
          // document.body.appendChild(eleLink);
          // eleLink.click();
          // document.body.removeChild(eleLink);
        });
      }
    },
    error: function(error) {
      console.log(error);
    },
    timeout: function() {
      console.log("连接超时");
    }
  });
});

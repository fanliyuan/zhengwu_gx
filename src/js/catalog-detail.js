/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-09-26 17:24:15 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-09-27 16:10:01
 */
$(function() {
  function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
  }
  $.ajax({
    type: "get",
    url: "http://testgoveportal.tpaas.youedata.com/getResourceTypeById",
    data: { resourceId: getUrlParam("id") },
    success: function(res) {
      if (+res.code === 0) {
        $("#detail .info").html(
          template("detail-template", JSON.parse(res.data))
        );
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
    url: "http://testgoveportal.tpaas.youedata.com/getResourceItemList",
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
  $.ajax({
    type: "get",
    url: "http://testgoveportal.tpaas.youedata.com/getReqBeanEntityInfo",
    data: { id: getUrlParam("id") },
    success: function(res) {
      if (+res.code === 200) {
        var cs = res.data.kafkaTopic ? res.data.kafkaTopic : "jdbc-20";
        $("#detail .info").on("click", ".downloadBtn", function() {
          var hrefs = "http://cdyoue.com.cn:19081/connector/" + cs;
          // window.open(hrefs);
          window.location = hrefs;
          window.location.href = hrefs;
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

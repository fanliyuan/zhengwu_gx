/*
 * @Author: mikey.zhaopeng
 * @Date: 2018-09-26 17:24:15
 * @Last Modified by: fly
 * @Last Modified time: 2019-01-21 16:42:08
 */
$(function() {
  // var urlBase = 'http://cdyoue.com.cn:19082/zwjh/api/v1';  // 改成开发地址(不经过nginx代理的地址)
  // var urlBase = "/portalapi/zwjh/api/v1"; // 打包后用nginx代理到目标地址
  var urlBase = "http://172.16.0.190:2181/zwjh/api/v1";
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
        // $("#detail .info").html(template("detail-template", res.data));
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
        // $("#detail .info_footer").html(template("code_list", res.data));
      }
    },
    error: function(error) {
      console.log(error);
    },
    timeout: function() {
      console.log("连接超时");
    }
  });
  var data1 = {
    providerName: "中南海保卫厅",
    classify: "类-项-目-细目",
    shareTime: "2019-12-24 12:24:00",
    updateTime: "2019-12-24 12:24:00",
    abstract: "北京市领导出行安排路线",
    useCount: 34
  };
  $("#detail .info").html(template("detail-template", data1));
  var data2 = [
    {
      itemCode: "pag",
      isRequire: "是",
      dataType: "int",
      description: "路线节点数据"
    },
    {
      itemCode: "whr",
      isRequire: "否",
      dataType: "ch",
      description: "护卫装备数据"
    }
  ];
  $("#detail .info_footer").html(template("code_list", data2));
  $("#detail .info_backFooter").html(template("code_list", data2));
});

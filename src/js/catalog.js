/*
 * @Author: mikey.zhaopeng
 * @Date: 2018-09-26 17:22:08
 * @Last Modified by: fly
 * @Last Modified time: 2018-12-27 15:25:39
 */
// $(function() {
//   var queryData = {};
//   // var urlBase = "http://192.168.100.16:8805";
//   var urlBase = "http://testgoveportal.tpaas.youedata.com";
$(function() {
  var queryData = {};
  // var urlBase = 'http://cdyoue.com.cn:19082/zwjh/api/v1';  // 改成开发地址(不经过nginx代理的地址)
  // var urlBase = 'http://124.152.158.55:8521/portalapi/zwjh/api/v1';  // 改成开发地址(不经过nginx代理的地址)
  var urlBase = "/portalapi/zwjh/api/v1"; // 打包后用nginx代理到目标地址
  // var urlBase = "http://192.168.100.16:2181/zwjh/api/v1"; // 改成开发地址(不经过nginx代理的地址)
  function getItem(levels, codes, ids) {
    $.ajax({
      type: "get",
      url: urlBase + "/getResourcePropertyByCodeAndLevel",
      data: { id: ids, level: levels, code: codes },
      success: function(res) {
        if (+res.code === 0) {
          $("#itemsList").html(template("item-list", res.data));
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
      url: urlBase + "/listResourceBasicByType",
      contentType: "application/json",
      data: { classId: ids, index: 1, limit: 10 },
      success: function(res) {
        if (+res.code === 0) {
          $(".content1 .newInstitutionSource").html(
            template("card-list_new", res.data)
          );
          $(".content2 .newInstitutionSource").html(
            template("card-list_hot", res.data)
          );
        }
      },
      error: function(error) {
        console.log(error);
      },
      timeout: function() {
        console.log("连接超时");
      }
    });
  }
  getItem(1, 1, 1);
  $("#classfiy").on("click", "li", function() {
    var i = $(this).attr("i");
    $(this)
      .parent("ul")
      .children("li")
      .removeClass("active");
    $(this).addClass("active");
    getItem(1, i, i);
  });
  $("#itemsList").on("mouseenter", ".itemList li a", function() {
    $(this)
      .find("i")
      .css("opacity", 1);
  });
  $("#itemsList").on("mouseleave", ".itemList li a", function() {
    $(this)
      .find("i")
      .css("opacity", 0);
  });
});

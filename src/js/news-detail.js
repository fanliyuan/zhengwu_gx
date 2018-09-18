$(function() {
  function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
  }
  $.ajax({
    type: "get",
    url: "http://testgoveportal.tpaas.youedata.com/getArtiInfoById", //http://testgoveportal.tpaas.youedata.com
    data: { articleId: getUrlParam("id") },
    success: function(res) {
      res.result.data.createOpenTime = moment(
        +res.result.data.createOpenTime
      ).format("YYYY-MM-DD");
      var divHtml = document.createElement("div");
      divHtml.innerHTML = res.result.data.articleContent;
      // $(divHtml).find("em").replaceWith("i")
      // $(divHtml).find("strong").replaceWith("b")
      // res.result.data.articleContent
      $(".new_detail .newInstitutionSource").html(
        template("news_article", res.result.data)
      );
    },
    error: function(err) {
      console.log(err);
    },
    timeout: function() {
      console.log("网络超时");
    }
  });
});

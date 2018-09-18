$(function() {
  function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
  }
  function results(res) {
    if (+res.code === 0) {
      if (res.result.datas.length > 0) {
        for (var i = 0; i < res.result.datas.length; i++) {
          res.result.datas[i].articleContent = res.result.datas[
            i
          ].articleContent
            .replace(/\bsrc=".*?"[\b|>]/g, "")
            .trim();
          res.result.datas[i].createOpenTime = moment(
            +res.result.datas[0].createOpenTime
          ).format("YYYY-MM-DD");
          var divHtml = document.createElement("div");
          divHtml.innerHTML = res.result.datas[i].articleContent;
          res.result.datas[i].articleContent = "";
          $(divHtml)
            .contents()
            .each(function(index, item) {
              res.result.datas[i].articleContent += item.textContent;
            });
          if (res.result.datas[i].articleContent.length > 130) {
            res.result.datas[i].articleContent =
              res.result.datas[i].articleContent.substr(0, 130) + "...";
          }
        }
      }
      $("#list_container").html(template("list_template", res.result.datas));
    }
  }
  function getList(pagination) {
    $.ajax({
      type: "get",
      url: "http://testgoveportal.tpaas.youedata.com/getColumnArtiListById",
      data: {
        articleCid: getUrlParam("articleCid"),
        pageNum: pagination.pageNum,
        pageSize: pagination.pageSize
      },
      success: results,
      error: function(error) {
        console.log(error);
      },
      timeout: function() {
        console.log("连接超时");
      }
    });
  }
  getList({ pageNum: 1, pageSize: 10 });
});

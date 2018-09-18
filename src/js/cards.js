$(function() {
  function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
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
      success: function(res) {
        if (+res.code === 0) {
          if (res.result.datas.length > 0) {
            var datas = res.result.datas;
            for (var i = 0; i < datas.length; i++) {
              res.result.datas[
                i
              ].articleContent = res.result.datas[0].articleContent
                .replace(/\bsrc=".*?"[\b|>]/g, "")
                .trim();
              res.result.datas[i].createOpenTime = moment(
                +res.result.datas[0].createOpenTime
              ).format("YYYY-MM-DD");
              if (datas[i].articleContent.length > 300) {
                datas[i].articleContent =
                  datas[i].articleContent.substr(0, 300) + "...";
              }
            }
          }
          $("#list_container").html(template("list_template", datas));
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
  getList({ pageNum: 1, pageSize: 10 });
});

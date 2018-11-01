$(function() {
  // var urlBase = 'http://192.168.100.16:8804/zwjh/api/v1';
  var urlBase = "http://testgoveportal.tpaas.youedata.com";
  function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
  }
  function handleDownload(articleId) {
    $.ajax({
      type: "get",
      url: urlBase + "/downloadOssFile",
      data: {
        articleId: articleId
      },
      success: function(res) {
        if (+res.code === 0) {
          // window.open(res.result.data);
          window.location = res.result.data;
          window.location.href = res.result.data;
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
  function results(res) {
    // if (+res.code === 0) {
    if (res.length > 0) {
      for (var i = 0; i < res.length; i++) {
        res[i].articleContent = res[i].articleContent
          .replace(/\bsrc=".*?"[\b|>]/g, "")
          .trim();
        res[i].createOpenTime = moment(+res[i].createOpenTime).format(
          "YYYY-MM-DD"
        );
        var divHtml = document.createElement("div");
        divHtml.innerHTML = res[i].articleContent;
        res[i].articleContent = "";
        $(divHtml)
          .contents()
          .each(function(index, item) {
            res[i].articleContent += item.textContent;
          });
        if (res[i].articleContent.length > 130) {
          res[i].articleContent = res[i].articleContent.substr(0, 130) + "...";
        }
      }
    }
    $("#list_container").html(template("list_template", res));
    $("#list_container .downItem").click(function() {
      var id = $(this).attr("data-id");
      handleDownload(id);
    });
    // }
  }
  // var pagination = { pageNum: 1, pageSize: 10 }
  $("#pagination_container").pagination({
    dataSource:
      urlBase +
      "/getColumnArtiListById?articleCid=" +
      getUrlParam("articleCid"),
    locator: "result.datas",
    totalNumberLocator: function(res) {
      return res.result.total;
    },
    callback: function(data, pagination) {
      results(data);
    },
    pageNumber: 1,
    pageSize: 10,
    prevText: "上一页",
    nextText: "下一页",
    ellipsisText: "···",
    footer: function(currentPage, totalPage, totalNumber) {
      return (
        '<span class="pagination-footer">每页10条数据,' +
        "共" +
        totalPage +
        "页</span>"
      );
    },
    pageLink: "javascript:;",
    alias: {
      pageNumber: "pageNum",
      pageSize: "pageSize"
    },
    formatAjaxError: function() {
      console.log("访问错误");
    }
  });
});

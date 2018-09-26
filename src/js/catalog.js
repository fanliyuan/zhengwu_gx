$(function() {
  var queryData = {};
  function getList(queryData) {
    $("#pagination_container").pagination({
      dataSource:
        "http://testgoveportal.tpaas.youedata.com/listResourceBasicByType?typeId=" +
        (queryData.typeId ? queryData.typeId : null),
      locator: "data.rows",
      totalNumberLocator: function(res) {
        return res.data.total;
      },
      callback: function(data, pagination) {
        $(".content1 .newInstitutionSource").html(template("card-list", data));
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
        pageNumber: "index",
        pageSize: "limit"
      },
      formatAjaxError: function() {
        console.log("访问错误");
      }
    });
  }
  function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
  }
  $.ajax({
    type: "get",
    url: "http://testgoveportal.tpaas.youedata.com/directoryOpenList",
    success: function(res) {
      if (+res.code === 0) {
        if (res.result.datas.length > 16) {
          res.result.datas = res.result.datas.slice(0, 16);
        }
        // var typeId = 0;
        // var queryData = {}
        $("#catalog").html(template("catalog_list", res.result.datas));

        $("#catalog li").each(function(item, index) {
          if (
            (getUrlParam("id") || +getUrlParam("id") === 0) &&
            +$(item).attr("data-id") === +getUrlParam("id")
          ) {
            $(item).addClass("click");
            queryData.typeId = $(item).attr("data-href");
          } else if (
            !getUrlParam("id") &&
            +getUrlParam("id") !== 0 &&
            +$(item).attr("data-id") === 0
          ) {
            $(item).addClass("click");
            queryData.typeId = $(item).attr("data-href");
          }
        });

        getList(queryData);
        $("#catalog")
          .children("ul")
          .on("click", "li", function() {
            // queryData.catalogId = $(this).data('typeId')
            $(this)
              .parent()
              .children(".click")
              .removeClass("click");
            $(this).addClass("click");
            queryData.typeId = $(this).attr("data-href");
            getList(queryData);
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
  var timeData = ["全部", 2018, 2017, 2016, 2015, 2014, 2013, 2012];
  $("#times")
    .html(template("time_list", timeData))
    .children("ul")
    .on("click", "li", function() {
      queryData.time = $(this).data("time");
      $(this)
        .parent()
        .children(".active")
        .removeClass("active");
      $(this).addClass("active");
      getList(queryData);
    });
  var typeDatas = ["全部", "XLS", "XML", "JSON", "CSV"];
  $("#types")
    .html(template("type_list", typeDatas))
    .children("ul")
    .on("click", "li", function() {
      queryData.type = $(this).data("type");
      $(this)
        .parent()
        .children(".active")
        .removeClass("active");
      $(this).addClass("active");
      getList(queryData);
    });
  $("#sorts").on("click", "li", function() {
    // alert($(this).html())
    queryData.sort = $(this).data("sort");
    $(this)
      .parent()
      .children(".active")
      .removeClass("active");
    $(this).addClass("active");
    getList(queryData);
  });
});

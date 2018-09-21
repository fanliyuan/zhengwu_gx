$(function() {
  $.ajax({
    type: "get",
    url: "http://192.168.100.16:8805/directoryOpenList",
    success: function(res) {
      if (+res.code === 0) {
        if (res.result.datas.length > 16) {
          res.result.datas = res.result.datas.slice(0, 16);
        }
        // var queryData = {}
        $("#catalog").html(template("catalog_list", res.result.datas));
        $("#catalog")
          .children("ul")
          .on("click", "li", function() {
            // queryData.catalogId = $(this).data('typeId')
            $(this)
              .parent()
              .children(".click")
              .removeClass("click");
            $(this).addClass("click");
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
  // $.ajax({
  //   type:'get',
  //   url:'http://192.168.100.16:8805/listResourceBasicByType',
  //   data:{
  //     index:1,
  //     limit:10,
  //   },
  //   success:function(res){
  //     $('#card').html(template('card-list', res.data.rows))
  //   },
  //   error: function(error) {
  //     console.log(error);
  //   },
  //   timeout: function() {
  //     console.log("连接超时");
  //   }
  // })
  $("#pagination_container").pagination({
    dataSource: "http://192.168.100.16:8805/listResourceBasicByType",
    locator: "data.rows",
    totalNumberLocator: function(res) {
      return res.data.total;
    },
    callback: function(data, pagination) {
      $("#card").html(template("card-list", data));
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
});

$(function() {
  // var urlBase = 'http://cdyoue.com.cn:19082/zwjh/api/v1';  // 改成开发地址(不经过nginx代理的地址)
  // var urlBase = "/portalapi/zwjh/api/v1"; // 打包后用nginx代理到目标地址
  var urlBase = "http://192.168.100.16:2181/zwjh/api/v1"; // 改成开发地址(不经过nginx代理的地址)
  function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
  }
  var mu_id = "";
  var params = {};
  function stringify(params) {
    var str = "";
    for (var key in params) {
      str = str + "&" + key + "=" + params[key];
    }
    return str.substr(1);
  }
  function getItem(levels, codes, ids, parentDiv, templates) {
    $.ajax({
      type: "get",
      url: urlBase + "/getResourcePropertyByCodeAndLevel",
      data: { id: ids, level: levels, code: codes },
      success: function(res) {
        if (+res.code === 0) {
          $(parentDiv).html(template(templates, res.data));
          if (levels === 2 && res.data.length > 0) {
            mu_id = res.data[0].id;
            getItem(
              3,
              res.data[0].code,
              res.data[0].id,
              "#classify",
              "classify_list"
            );
            // getResource("catalogId",res.data[0].id,".content1 .newInstitutionSource","card-list",1,10)
            fy(
              "catalogId",
              res.data[0].id,
              ".content1 .newInstitutionSource",
              "card-list",
              1,
              10
            );
          }
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
  // function getResource (types,ids,parents,templates,indexs,limits) {
  //   var dataParams = {
  //     index:indexs,
  //     limit:limits
  //   }
  //   dataParams[types] = ids;
  //   params = dataParams
  //   $.ajax({
  //     type: 'get',
  //     url: urlBase + "/listResourceBasicByType",
  //     contentType: "application/json",
  //     data:dataParams,
  //     success: function(res) {
  //       if (+res.code === 0) {
  //         $(parents).html(
  //           template(templates, res.data)
  //         );
  //       }
  //     },
  //     error: function(error) {
  //       console.log(error);
  //     },
  //     timeout: function() {
  //       console.log("连接超时");
  //     }
  //   });
  // }
  getItem(2, getUrlParam("code"), getUrlParam("id"), ".layout_left", "mu_list");
  $(".layout_left").on("click", "li", function() {
    var codes = $(this).attr("data-code");
    var ids = $(this).attr("data-id");
    $(this)
      .parent("ul")
      .children("li")
      .removeClass("active");
    $(this).addClass("active");
    mu_id = ids;
    getItem(3, codes, ids, "#classify", "classify_list");
  });
  $("#classify").on("click", "li", function() {
    var codes = $(this).attr("data-code");
    var ids = $(this).attr("data-id");
    $(this)
      .parent("ul")
      .children("li")
      .removeClass("active");
    $(this).addClass("active");
    if (+ids === -1) {
      // getResource("catalogId",mu_id,".content1 .newInstitutionSource","card-list",1,10)
      fy(
        "catalogId",
        mu_id,
        ".content1 .newInstitutionSource",
        "card-list",
        1,
        10
      );
    } else {
      // getResource("typeId",ids,".content1 .newInstitutionSource","card-list",1,10)
      fy("typeId", ids, ".content1 .newInstitutionSource", "card-list", 1, 10);
    }
  });
  $(".times").on("mouseenter", ".row", function() {
    $(this)
      .children("i")
      .css("opacity", 1);
  });
  $(".times").on("mouseleave", ".row", function() {
    $(this)
      .children("i")
      .css("opacity", 0);
  });
  var timeData = ["全部", 2018, 2017, 2016, 2015, 2014, 2013, 2012];
  $("#times").html(template("time_list", timeData));
  $("#times").on("click", "li", function() {
    $(this)
      .parent("ul")
      .children("li")
      .removeClass("active");
    $(this).addClass("active");
  });
  var typeDatas = ["全部", "XLS", "XML", "JSON", "CSV"];
  $("#types")
    .html(template("type_list", typeDatas))
    // .children("ul")
    .on("click", "li", function() {
      // queryData.type = $(this).data("type");
      $(this)
        .parent()
        .children("li")
        .removeClass("active");
      $(this).addClass("active");
      // getList(queryData);
    });
  $("#sorts").on("click", "li", function() {
    // alert($(this).html())
    // queryData.sort = $(this).data("sort");
    $(this)
      .parent()
      .children(".active")
      .removeClass("active");
    $(this).addClass("active");
    // getList(queryData);
  });
  function fy(type, id, parents, templates, indexs, limits) {
    var pares = {};
    pares[type] = id;
    $("#pagination_container").pagination({
      dataSource: urlBase + "/listResourceBasicByType?" + stringify(pares),
      locator: "data",
      totalNumberLocator: function(res) {
        return res.total;
      },
      callback: function(data, pagination) {
        $(".content1 .newInstitutionSource").html(template("card-list", data));
      },
      alias: {
        pageNumber: "index",
        pageSize: "limit"
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
      formatAjaxError: function() {
        console.log("访问错误");
      }
    });
  }
  var data = [
    {
      resourceName: "贵阳市主要粮油",
      dataType: "xls",
      typeName: "5245234",
      resourceName: "提供贵阳市主要粮油"
    },
    {
      resourceName: "贵阳市主要粮油",
      dataType: "xls",
      typeName: "5245234",
      resourceName: "提供贵阳市主要粮油"
    }
  ];
  // $(".content1 .newInstitutionSource").html(template("card-list", data));
});

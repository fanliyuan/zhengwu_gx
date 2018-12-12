$(function() {
  // var urlBase = 'http://cdyoue.com.cn:19082/zwjh/api/v1';  // 改成开发地址(不经过nginx代理的地址)
  var urlBase = "/portalapi/zwjh/api/v1/"; // 打包后用nginx代理到目标地址
  function results(res) {
    if (+res.code === 0) {
      if (res.result.datas.length > 0) {
        res.result.datas[0].articleContent = res.result.datas[0].articleContent
          .replace(/\bsrc=".*?"[\b|>]/g, "")
          .trim();
        res.result.datas[0].createOpenTime = moment(
          +res.result.datas[0].createOpenTime
        ).format("YYYY-MM-DD");
        var divHtml = document.createElement("div");
        divHtml.innerHTML = res.result.datas[0].articleContent;
        res.result.datas[0].articleContent = "";
        $(divHtml)
          .contents()
          .each(function(index, item) {
            res.result.datas[0].articleContent += item.textContent;
          });
        if (res.result.datas[0].articleContent.length > 78) {
          res.result.datas[0].articleContent =
            res.result.datas[0].articleContent.substr(0, 78) + "...";
        }
        if (res.result.datas[0].articleTitle.length > 20) {
          res.result.datas[0].articleTitle =
            res.result.datas[0].articleTitle.substr(0, 20) + "...";
        }
        for (var i = 1; i < res.result.datas.length; i++) {
          res.result.datas[i].createOpenTime = moment(
            +res.result.datas[i].createOpenTime
          ).format("YYYY-MM-DD");
          if (res.result.datas[i].articleTitle.length > 30) {
            res.result.datas[i].articleTitle =
              res.result.datas[i].articleTitle.substr(0, 30).trim() + "...";
          }
        }
      }
      $("#important_news").html(template("affiche_template", res.result.datas));
    }
  }
  $.ajax({
    type: "get",
    url: urlBase + "/getColumnArtiListById",
    // dataType:'jsonp',
    data: { articleCid: 5, pageNum: 1, pageSize: 10 },
    success: results,
    error: function(error) {
      console.log(error);
    },
    timeout: function() {
      console.log("连接超时");
    }
  });
  $.ajax({
    type: "get",
    url: urlBase + "/getColumnArtiListById",
    // dataType:'jsonp',
    data: { articleCid: 4, pageNum: 1, pageSize: 10 },
    success: function(res) {
      if (+res.code === 0) {
        if (res.result.datas.length > 0) {
          res.result.datas[0].articleContent = res.result.datas[0].articleContent
            .replace(/\bsrc=".*?"[\b|>]/g, "")
            .trim();
          res.result.datas[0].createOpenTime = moment(
            +res.result.datas[0].createOpenTime
          ).format("YYYY-MM-DD");
          var divHtml = document.createElement("div");
          divHtml.innerHTML = res.result.datas[0].articleContent;
          res.result.datas[0].articleContent = "";
          $(divHtml)
            .contents()
            .each(function(index, item) {
              res.result.datas[0].articleContent += item.textContent;
            });
          if (res.result.datas[0].articleContent.length > 78) {
            res.result.datas[0].articleContent =
              res.result.datas[0].articleContent.substr(0, 78) + "...";
          }
          if (res.result.datas[0].articleTitle.length > 20) {
            res.result.datas[0].articleTitle =
              res.result.datas[0].articleTitle.substr(0, 20) + "...";
          }
          for (var i = 1; i < res.result.datas.length; i++) {
            res.result.datas[i].createOpenTime = moment(
              +res.result.datas[i].createOpenTime
            ).format("YYYY-MM-DD");
            if (res.result.datas[i].articleTitle.length > 30) {
              res.result.datas[i].articleTitle =
                res.result.datas[i].articleTitle.substr(0, 30).trim() + "...";
            }
          }
        }
        $("#affiche").html(template("affiche_template", res.result.datas));
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
    url: urlBase + "/getImListById",
    // dataType:'jsonp',
    data: { columnId: 1, pageNum: 1, pageSize: 10 },
    success: function(res) {
      if (+res.code === 0) {
        var datas = [];
        for (var i = 0; i < res.result.datas.length; i++) {
          var zc = {
            img: res.result.datas[i].imagePath,
            address: res.result.datas[i].imgAddress
          };
          datas.push(zc);
        }
        $(".carousel").html(template("carousel-list", datas));
        if (res.result.datas.length <= 1) {
          $(".leftBtn").removeClass("swiper-button-prev");
          $(".rightBtn").removeClass("swiper-button-next");
          var mySwiper = new Swiper(".swiper-container", {
            direction: "horizontal",
            observer: true,
            speed: 3000,
            // loop: true,
            observeParents: true,
            autoplay: false,
            autoplayDisableOnInteraction: false,
            // 如果需要分页器
            pagination: false,
            prevButton: null,
            nextButton: null
          });
          return;
        }
        $(".leftBtn").addClass("swiper-button-prev");
        $(".rightBtn").addClass("swiper-button-next");
        var mySwiper = new Swiper(".swiper-container", {
          direction: "horizontal",
          observer: true,
          speed: 3000,
          loop: true,
          observeParents: true,
          autoplay: 5000,
          paginationClickable: true,
          autoplayDisableOnInteraction: false,
          // 如果需要分页器
          pagination: ".swiper-pagination",
          prevButton: ".swiper-button-prev",
          nextButton: ".swiper-button-next"
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
  $.ajax({
    type: "get",
    url: urlBase + "/directoryOpenList",
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
  $.ajax({
    type: "get",
    url: urlBase + "/resourceNewList",
    success: function(res) {
      if (+res.code === 0) {
        if (res.result.datas.length > 4) {
          res.result.datas = res.result.datas.slice(0, 4);
        }
        $(".content1 .newInstitutionSource").append(
          template("card-list", res.result.datas)
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
  $.ajax({
    type: "get",
    url: urlBase + "/resourceHotList",
    success: function(res) {
      if (+res.code === 0) {
        if (res.result.datas.length > 4) {
          res.result.datas = res.result.datas.slice(0, 4);
        }
        $(".content2 .newInstitutionSource").append(
          template("card-list", res.result.datas)
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
  $.ajax({
    type: "get",
    url: urlBase + "/columnList",
    // dataType:'jsonp',
    // data: { articleCid: 5, pageNum: 1, pageSize: 10 },
    success: function(res) {
      if (+res.code === 0) {
        for (var i = 0; i < res.result.datas.length; i++) {
          if (+res.result.datas[i].columnId === 1) {
            var lmdata = res.result.datas[i].children;
            for (var j = 0; j < lmdata.length; j++) {
              if (+lmdata[j].columnId === 5) {
                $(".content5 .title_5 span").html(lmdata[j].columnPage);
              } else if (+lmdata[j].columnId === 4) {
                $(".content5 .title_4 span").html(lmdata[j].columnPage);
              }
            }
          }
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
});

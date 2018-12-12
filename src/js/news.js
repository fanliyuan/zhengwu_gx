$(function() {
  // var urlBase = 'http://cdyoue.com.cn:19082/zwjh/api/v1';  // 改成开发地址(不经过nginx代理的地址)
  var urlBase = "/portalapi/zwjh/api/v1/"; // 打包后用nginx代理到目标地址
  $.ajax({
    type: "get",
    url: urlBase + "/getImListById",
    // dataType:'jsonp',
    data: { columnId: 2, pageNum: 1, pageSize: 10 },
    success: function(res) {
      if (+res.code === 0) {
        var datas = [];
        for (var i = 0; i < res.result.datas.length; i++) {
          var zc = {
            img: res.result.datas[i].imagePath,
            address: res.result.datas[i].imgAddress,
            name: res.result.datas[i].imgName
          };
          datas.push(zc);
        }
        $(".contentN1 .news_img").html(template("carousel-list", datas));
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
            pagination: false
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
          paginationBulletRender: function(swiper, index, className) {
            return '<span class="' + className + '">' + "</span>";
          },
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
    url: urlBase + "/getColumnArtiListById",
    // dataType:'jsonp',
    data: { articleCid: 6, pageNum: 1, pageSize: 10 },
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
          if (res.result.datas[0].articleContent.length > 150) {
            res.result.datas[0].articleContent =
              res.result.datas[0].articleContent.substr(0, 150) + "...";
          }
          if (res.result.datas[0].articleTitle.length > 34) {
            res.result.datas[0].articleTitle =
              res.result.datas[0].articleTitle.substr(0, 34) + "...";
          }
          for (var i = 1; i < res.result.datas.length; i++) {
            res.result.datas[i].createOpenTime = moment(
              +res.result.datas[i].createOpenTime
            ).format("YYYY-MM-DD");
            if (res.result.datas[i].articleTitle.length > 22) {
              res.result.datas[i].articleTitle =
                res.result.datas[i].articleTitle.substr(0, 22).trim() + "...";
            }
          }
        }
        $(".news_new .important_news").html(
          template("affiche_template", res.result.datas)
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
    url: urlBase + "/getColumnArtiListById",
    // dataType:'jsonp',
    data: { articleCid: 10, pageNum: 1, pageSize: 10 },
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
        $("#floor1").html(template("affiche_template1", res.result.datas));
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
    url: urlBase + "/getColumnArtiListById",
    // dataType:'jsonp',
    data: { articleCid: 7, pageNum: 1, pageSize: 10 },
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
        $("#floor2").html(template("affiche_template1", res.result.datas));
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
    url: urlBase + "/getColumnArtiListById",
    // dataType:'jsonp',
    data: { articleCid: 8, pageNum: 1, pageSize: 10 },
    success: function(res) {
      if (+res.code === 0) {
        if (res.result.datas.length > 0) {
          for (var i = 0; i < res.result.datas.length; i++) {
            res.result.datas[i].createOpenTime = moment(
              +res.result.datas[i].createOpenTime
            ).format("YYYY-MM-DD");
            if (res.result.datas[i].articleTitle.length > 30) {
              res.result.datas[i].articleTitle =
                res.result.datas[i].articleTitle.substr(0, 30).trim() + "...";
            }
          }
        }
        $("#floor3").html(template("affiche_template2", res.result.datas));
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
    url: urlBase + "/getColumnArtiListById",
    // dataType:'jsonp',
    data: { articleCid: 9, pageNum: 1, pageSize: 10 },
    success: function(res) {
      if (+res.code === 0) {
        if (res.result.datas.length > 0) {
          for (var i = 0; i < res.result.datas.length; i++) {
            res.result.datas[i].createOpenTime = moment(
              +res.result.datas[i].createOpenTime
            ).format("YYYY-MM-DD");
            if (res.result.datas[i].articleTitle.length > 30) {
              res.result.datas[i].articleTitle =
                res.result.datas[i].articleTitle.substr(0, 30).trim() + "...";
            }
          }
        }
        $("#floor4").html(template("affiche_template2", res.result.datas));
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
    url: urlBase + "/articleHotList",
    success: function(res) {
      if (+res.code === 0) {
        if (!res.result.datas) {
          res.result.datas = [];
        }
        console.log(res.result);
        for (var i = 0; i < res.result.datas.length; i++) {
          res.result.datas[i].articleContent = res.result.datas[
            i
          ].articleContent
            .replace(/\bsrc=".*?"[\b|>]/g, "")
            .trim();
          var divHtml = document.createElement("div");
          divHtml.innerHTML = res.result.datas[i].articleContent;
          res.result.datas[i].articleContent = "";
          $(divHtml)
            .contents()
            .each(function(index, item) {
              res.result.datas[i].articleContent += item.textContent;
            });
          if (res.result.datas[i].articleContent.length > 17) {
            res.result.datas[i].articleContent =
              res.result.datas[i].articleContent.substr(0, 17) + "...";
          }
        }
        $(".hotItem .newInstitutionSource").append(
          template("hot_zt", res.result.datas)
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
          if (+res.result.datas[i].columnId === 2) {
            var lmdata = res.result.datas[i].children;
            for (var j = 0; j < lmdata.length; j++) {
              if (+lmdata[j].columnId === 6) {
                $(".zxdt span").html(lmdata[j].columnPage);
              } else if (+lmdata[j].columnId === 7) {
                $(".tzgg span").html(lmdata[j].columnPage);
              } else if (+lmdata[j].columnId === 8) {
                $(".zxzc span").html(lmdata[j].columnPage);
              } else if (+lmdata[j].columnId === 9) {
                $(".zcjd span").html(lmdata[j].columnPage);
              } else if (+lmdata[j].columnId === 10) {
                $(".zyxw span").html(lmdata[j].columnPage);
              } else if (+lmdata[j].columnId === 11) {
                $(".hotItem .rmzt span").html(lmdata[j].columnPage);
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

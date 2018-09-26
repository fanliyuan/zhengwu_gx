$(function() {
  $.ajax({
    type: "get",
    url: "http://testgoveportal.tpaas.youedata.com/getImListById",
    // dataType:'jsonp',
    data: { columnId: 2, pageNum: 1, pageSize: 10 },
    success: function(res) {
      if (+res.code === 0) {
        var datas = [];
        for (var i = 0; i < res.result.datas.length; i++) {
          datas.push(res.result.datas[i].imagePath);
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
    url: "http://testgoveportal.tpaas.youedata.com/getColumnArtiListById",
    // dataType:'jsonp',
    data: { articleCid: 13, pageNum: 1, pageSize: 10 },
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
    url: "http://testgoveportal.tpaas.youedata.com/getColumnArtiListById",
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
    url: "http://testgoveportal.tpaas.youedata.com/getColumnArtiListById",
    // dataType:'jsonp',
    data: { articleCid: 15, pageNum: 1, pageSize: 10 },
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
    url: "http://testgoveportal.tpaas.youedata.com/getColumnArtiListById",
    // dataType:'jsonp',
    data: { articleCid: 11, pageNum: 1, pageSize: 10 },
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
    url: "http://testgoveportal.tpaas.youedata.com/getColumnArtiListById",
    // dataType:'jsonp',
    data: { articleCid: 12, pageNum: 1, pageSize: 10 },
    success: function(res) {
      if (+res.code === 0) {
        if (res.result.datas.length > 0) {
          for (var i = 0; i < res.result.datas.length; i++) {
            res.result.datas[i].createOpenTime = moment(
              +res.result.datas[i].createOpenTime
            ).format("YYYY-MM-DD");
            console.log(res.result.datas[i].createOpenTime);
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
    url: "http://testgoveportal.tpaas.youedata.com/articleHotList",
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
});

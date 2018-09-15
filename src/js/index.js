$(function() {
  $.ajax({
    type: "get",
    url: "http://testgoveportal.tpaas.youedata.com/getColumnArtiListById",
    // dataType:'jsonp',
    data: { articleCid: 5, pageNum: 1, pageSize: 10 },
    success: function(res) {
      console.log(res);
      if (+res.code === 0) {
        if (res.result.datas.length > 0) {
          console.log(res.result.datas.length);
          for (var i = 0; i < res.result.datas; i++) {
            res.result.datas[i].articles = res.result.datas[
              i
            ].articleContent.replace(/\bsrc=".*?"[\b|>]/g, "");
          }
          console.log(res.result.datas);
          $("#important_news").html(
            template("affiche_template", res.result.datas)
          );
        }
      }
    },
    error: function(error) {},
    timeout: function() {}
  });
});

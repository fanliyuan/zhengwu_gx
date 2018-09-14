$(function() {
  $.ajax({
    type: "get",
    url: "http://testgoveportal.tpaas.youedata.com/getColumnArtiListById",
    // dataType:'jsonp',
    data: { articleCid: 5, pageNum: 1, pageSize: 10 },
    success: function(res) {
      if (+res.code === 0) {
        console.log(res.result.datas);
        $("#important_news").html(
          template("affiche_template", res.result.datas)
        );
      }
    },
    error: function(error) {},
    timeout: function() {}
  });
});

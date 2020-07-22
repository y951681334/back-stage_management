$(function () {
  const layer = layui.layer;
  const form = layui.form;
  const laypage = layui.laypage;
  const p = {
    pagenum: 1,
    pagesize: 2,
    cate_id: "",
    state: "",
  };

  function getInfo() {
    $.ajax({
      method: "get",
      url: "/my/article/list",
      data: p,
      success: function (res) {
        if (res.status != 0) return layer.msg("获取文章列表失败！");
        let htmlStr = template("template", res);
        $("tbody").html(htmlStr);
        setInfo(res.total);
      },
    });
  }

  template.defaults.imports.filterData = function (value) {
    return moment(value).format("YYYY-MM-DD HH:mm:ss");
  };

  function getCates() {
    $.ajax({
      method: "get",
      url: "/my/article/cates",
      success: function (res) {
        if (res.status != 0) return layer.msg("获取所有分类失败！");
        let htmlStr = template("template2", res);
        $("[name=cate_id]").html(htmlStr);
        form.render();
      },
    });
  }

  $("#form1").on("submit", function (e) {
    e.preventDefault();
    p.cate_id = $("[name=cate_id]").val();
    p.state = $("[name=state]").val();
    getInfo();
  });

  function setInfo(num) {
    laypage.render({
      elem: "page", //注意，这里的 test1 是 ID，不用加 # 号
      count: num, //数据总数，从服务端得到
      curr: p.pagenum,
      limit: p.pagesize,
      limits: [2, 3, 5, 10],
      layout: ["count", "limit", "prev", "page", "next", "skip"],
      jump: function (obj, first) {
        p.pagenum = obj.curr;
        p.pagesize = obj.limit;
        if (!first) {
          getInfo();
        }
      },
    });
  }

  $("tbody").on("click", ".sc", function () {
    let id = $(this).siblings().prop("id");
    let num = $(".sc").length;
    layer.confirm("是否删除?", { icon: 3, title: "提示" }, function (index) {
      $.ajax({
        method: "get",
        url: "/my/article/delete/" + id,
        success: function (res) {
          if (res.status != 0) return layer.msg("删除失败！");
          layer.msg("删除成功");

          if (num == 1) {
            p.pagenum = p.pagenum == 1 ? 1 : p.pagenum - 1;
          }

          getInfo();
        },
      });

      layer.close(index);
    });
  });

  getInfo();
  getCates();
});

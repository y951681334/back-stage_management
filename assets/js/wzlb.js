$(function () {
  const layer = layui.layer;
  const form = layui.form;
  const laypage = layui.laypage;

  let p = {
    pagenum: 1,
    pagesize: 2,
    cate_id: "",
    state: "",
  };

  getInfo();
  setInfo();
  function getInfo() {
    $.ajax({
      method: "get",
      url: "/my/article/list",
      data: p,
      success: function (res) {
        if (res.status != 0) return layer.msg("数据获取失败！");
        let htmlStr = template("mb", res);
        $("tbody").html(htmlStr);
        renderPage(res.total);
      },
    });
  }

  template.defaults.imports.filterData = function (value) {
    return moment(value).format("YYYY-MM-DD, HH:mm:ss");
  };

  function setInfo() {
    $.ajax({
      method: "GET",
      url: "/my/article/cates",
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("获取分类数据失败！");
        }
        // 调用模板引擎渲染分类的可选项
        var htmlStr = template("tpl-cate", res);
        $("[name=cate_id]").html(htmlStr);
        // 通过 layui 重新渲染表单区域的UI结构
        form.render();
      },
    });
  }

  $("#form1").on("submit", function (e) {
    e.preventDefault();
    let cate_id = $("[name=cate_id]").val();
    let state = $("[name=state]").val();
    p.cate_id = cate_id;
    p.state = state;
    getInfo();
  });

  function renderPage(value) {
    laypage.render({
      elem: "page",
      count: value,
      limit: p.pagesize,
      curr: p.pagenum,
      layout: ["count", "limit", "prev", "page", "next", "skip"],
      limits: [2, 3, 5, 10],
      jump: function (obj, first) {
        p.pagenum = obj.curr;
        p.pagesize = obj.limit;
        if (!first) {
          getInfo();
        }
      },
    });
  }

  $("tbody").on("click", ".btn-delete", function () {
    let id = $(this).prop("id");
    let num = $(".btn-delete").length;
    layer.confirm("是否删除?", { icon: 3, title: "提示" }, function (index) {
      $.ajax({
        method: "get",
        url: "/my/article/delete/" + id,
        success: function (res) {
          if (res.status != 0) return layer.msg("删除失败！");
          layer.msg("删除成功！");
          if (num == 1) p.pagenum = p.pagenum == 1 ? 1 : p.pagenum - 1;
          getInfo();
        },
      });

      layer.close(index);
    });
  });
});

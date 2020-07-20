$(function () {
  const form = layui.form;
  const layer = layui.layer;

  function getInfo() {
    $.ajax({
      method: "get",
      url: "/my/article/cates",
      success: function (res) {
        if (res.status != 0) return layer.msg("文章加载失败！");
        let htmlStr = template("template1", res);
        $("tbody").html(htmlStr);
      },
    });
  }

  getInfo();

  let index;
  $("#tjlb").on("click", () => {
    index = layer.open({
      type: 1,
      area: ["400px", "230px"],
      title: "添加文章类别",
      content: $("#template2").html(),
    });
  });

  $("body").on("submit", "#tjwz", (e) => {
    e.preventDefault();
    $.ajax({
      method: "post",
      url: "/my/article/addcates",
      data: $("#tjwz").serialize(),
      success: function (res) {
        if (res.status != 0) return layer.msg("添加分类失败！");
        layer.msg("添加分类成功！");
        getInfo();
        layer.close(index);
      },
    });
  });

  $("body").on("click", "#qx", (e) => {
    e.preventDefault();
    layer.close(index);
  });

  $("tbody").on("click", ".bj", function () {
    index = layer.open({
      type: 1,
      area: ["400px", "230px"],
      title: "修改文章类别",
      content: $("#template3").html(),
    });
    let id = $(this).attr("id");
    $.ajax({
      method: "get",
      url: "/my/article/cates/" + id,
      success: function (res) {
        if (res.status != 0) return layer.msg("获取文章分类失败");
        form.val("form1", res.data);
      },
    });
  });

  $("body").on("submit", "#bjwz", (e) => {
    e.preventDefault();
    $.ajax({
      method: "post",
      url: "/my/article/updatecate",
      data: $("#bjwz").serialize(),
      success: function (res) {
        if (res.status != 0) return layer.msg("更新分类失败");
        layer.msg("更新分类成功");
        getInfo();
        layer.close(index);
      },
    });
  });

  $("tbody").on("click", ".sc", function () {
    let id = $(this).siblings().attr("id");
    layer.confirm("是否删除?", { icon: 3, title: "提示" }, function (index) {
      $.ajax({
        method: "get",
        url: "/my/article/deletecate/" + id,
        success: function (res) {
          if (res.status != 0) return layer.msg("删除文章分类失败");
          layer.msg("删除文章分类成功");
          getInfo();
        },
      });

      layer.close(index);
    });
  });
});

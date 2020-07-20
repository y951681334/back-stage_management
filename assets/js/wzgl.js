$(function () {
  const layer = layui.layer;
  const form = layui.form;
  function setInfo() {
    $.ajax({
      method: "get",
      url: "/my/article/cates",
      success: function (res) {
        if (res.status != 0) return layer.msg("获取文字分类失败！");
        let htmlStr = template("mb", res);
        $("tbody").html(htmlStr);
      },
    });
  }

  setInfo();

  let index = null;
  $("#tjlb").on("click", function () {
    index = layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "添加分类",
      content: $("#mb2").html(),
    });
  });

  $("body").on("submit", "#addlist", function (e) {
    e.preventDefault();
    $("#tj").prop("disabled", true);
    $.ajax({
      method: "post",
      url: "/my/article/addcates",
      data: $("#addlist").serialize(),
      success: function (res) {
        if (res.status != 0) return layer.msg("添加失败！");
        setInfo();
        layer.close(index);
      },
    });
  });

  $("tbody").on("click", "#bj", function (e) {
    e.preventDefault();
    index = layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "修改分类",
      content: $("#mb3").html(),
    });

    let id = $(this).parents("tr").prop("id");

    $.ajax({
      method: "GET",
      url: "/my/article/cates/" + id,
      success: function (res) {
        if (res.status != 0) return layer.msg("添加失败！");
        form.val("addlist2", res.data);
      },
    });
  });

  $("body").on("submit", "#addlist2", function (e) {
    e.preventDefault();
    $.ajax({
      method: "post",
      url: "/my/article/updatecate",
      data: $("#addlist2").serialize(),
      success: function (res) {
        if (res.status != 0) return layer.msg("修改失败！");
        layer.msg("修改成功！");
        setInfo();
        layer.close(index);
      },
    });
  });

  $("tbody").on("click", "#sc", function (e) {
    e.preventDefault();
    let id = $(this).parents("tr").prop("id");
    layer.confirm("确定删除吗?", { icon: 3, title: "提示" }, function (index) {
      $.ajax({
        method: "GET",
        url: "/my/article/deletecate/" + id,
        success: function (res) {
          if (res.status != 0) return layer.msg("删除失败！");
          layer.msg("删除成功！");
          setInfo();
        },
      });
    });
    layer.close(index);
  });
});

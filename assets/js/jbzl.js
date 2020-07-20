$(function () {
  const form = layui.form;
  const layer = layui.layer;
  $(".layui-form").on("submit", function (e) {
    e.preventDefault();
    form.verify({
      unn: function (value) {
        if (value.length > 6) {
          return "用户昵称不能大于6个字符";
        }
      },
    });

    $.ajax({
      method: "post",
      url: "/my/userinfo",
      data: form.val("formTest"),
      success: function (res) {
        if (res.status != 0) return layer.msg(res.message);
        layer.msg("信息修改成功!");
        window.parent.getInfo();
      },
    });
  });

  setInfo();

  function setInfo() {
    $.ajax({
      method: "get",
      url: "/my/userinfo",
      success: function (res) {
        if (res.status != 0) return layer.msg(res.message);
        form.val("formTest", res.data);
      },
    });
  }

  $("button[type=reset]").on("click", function (e) {
    e.preventDefault();
    setInfo();
  });
});

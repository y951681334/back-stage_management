$(function () {
  const form = layui.form;
  const layer = layui.layer;
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return "昵称长度必须再 1 ~ 6 字符之间";
      }
    },
  });

  function getUserInfo() {
    $.ajax({
      method: "GET",
      url: "/my/userinfo",
      success: function (res) {
        if (res.status !== 0) return layer.msg("获取信息失败！");
        form.val("formUserInfo", res.data);
      },
    });
  }

  getUserInfo();

  $("button[type=reset]").on("click", function (e) {
    e.preventDefault();
    getInfo();
  });

  $(".layui-form").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      method: "post",
      url: "/my/userinfo",
      data: form.val("formUserInfo"),
      success: function (res) {
        if (res.status !== 0) return layer.msg("提交信息失败！");
        layer.msg("用户名更新成功！");
        window.parent.getInfo();
      },
    });
  });
});

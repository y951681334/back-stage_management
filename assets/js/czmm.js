$(function () {
  const form = layui.form;
  const layer = layui.layer;
  form.verify({
    newPwd: function (value) {
      if (value == $("[name=oldPwd]").val()) {
        return "新旧密码不能重复!";
      }
    },
    rePwd: function (value) {
      if (value !== $("[name=newPwd]").val()) {
        return "两次密码不一致！";
      }
    },
  });

  $(".layui-form").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      method: "post",
      url: "/my/updatepwd",
      data: form.val("formUserInfo"),
      success: function (res) {
        console.log(res);
        if (res.status !== 0) return layer.msg("密码重置错误！");
        layer.msg("密码重置成功！");
        $(".layui-form")[0].reset();
        localStorage.removeItem("token");
        window.parent.location.href = "../login.html";
      },
    });
  });
});

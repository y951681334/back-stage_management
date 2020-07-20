$(function () {
  const form = layui.form;
  const layer = layui.layer;
  form.verify({
    newPwd: function (value) {
      if ($("input[name=oldPwd]").val() == value) {
        return "新旧密码不能一样！";
      }
    },
    rePwd: function (value) {
      if ($("input[name=newPwd]").val() != value) {
        return "两次密码不一样!";
      }
    },
  });

  $(".layui-form").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      method: "post",
      url: "/my/updatepwd",
      data: $(".layui-form").serialize(),
      success: function (res) {
        if (res.status != 0) return layer.msg("密码重置错误");
        layer.msg("密码重置成功！");
        localStorage.removeItem("token");
        window.parent.location.href = "../login.html";
      },
    });
  });
});

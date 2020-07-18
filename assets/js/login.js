$(function () {
  $("#link_reg").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });

  $("#link_login").on("click", function () {
    $(".login-box").show();
    $(".reg-box").hide();
  });

  const form = layui.form;
  const layer = layui.layer;

  form.verify({
    pwd: [/^[\S]{6,12}$/, "密码必须为6~12位的非空字符"],
    repwd: function (value, item) {
      let paw = $(".reg-box [name=password]").val();
      if (paw !== value) return "密码确认不正确";
    },
  });

  $(".reg-box").on("submit", function (e) {
    e.preventDefault();
    let username = $(".reg-box [name=username]").val();
    let password = $(".reg-box [name=username]").val();
    $.ajax({
      method: "post",
      url: "/api/reguser",
      data: {
        username,
        password,
      },
      success: function (res) {
        if (res.status !== 0) return layer.msg(res.message);
        layer.msg("注册成功请登录");
        $("#link_login").click();
      },
    });
  });

  $(".login-box").on("submit", function (e) {
    e.preventDefault();
    let username = $(".login-box [name=username]").val();
    let password = $(".login-box [name=username]").val();
    $.ajax({
      method: "post",
      url: "/api/login",
      data: {
        username,
        password,
      },
      success: function (res) {
        if (res.status !== 0) return layer.msg(res.message);

        layer.msg("登录成功！");
        localStorage.setItem("token", res.token);
        location.href = "/index.html";
      },
    });
  });
});

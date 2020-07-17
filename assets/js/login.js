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
    $.ajax({
      method: "post",
      url: "/api/reguser",
      data: {
        username: $(".reg-box [name=username]").val(),
        password: $(".reg-box [name=username]").val(),
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
    $.ajax({
      method: "post",
      url: "/api/login",
      data: {
        username: $(".login-box [name=username]").val(),
        password: $(".login-box [name=username]").val(),
      },
      success: function (res) {
        console.log(res);
        if (res.status !== 0) return layer.msg(res.message);
        layer.msg("登录成功！");
        localStorage.setItem("token", res.token);
        location.href = "/index.html";
      },
    });
  });

  $.ajaxPrefilter(function (options) {
    console.log(options.url);
    options.url = "http://ajax.frontend.itheima.net" + options.url;
  });
});

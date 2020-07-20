$(function () {
  $(".denglu .btn").on("click", function () {
    $(".denglu").hide();
    $(".zhuce").show();
  });

  $(".zhuce .btn").on("click", function () {
    $(".denglu").show();
    $(".zhuce").hide();
  });

  const layer = layui.layer;
  const form = layui.form;

  form.verify({
    pwd: [/^[\S]{6,12}$/, "密码长度必须在 6 ~ 12 位！"],
    repwd: function (value) {
      if (value != $(".zhuce [name=password]").val()) {
        return "两次输入的密码不一样";
      }
    },
  });

  $(".zhuce").on("submit", function (e) {
    e.preventDefault();
    let username = $(".zhuce [name=username]").val();
    let password = $(".zhuce [name=password]").val();
    $.ajax({
      method: "post",
      url: "/api/reguser",
      data: {
        username,
        password,
      },
      success: function (res) {
        console.log(res);
        if (res.status !== 0) return layer.msg(res.message);
        layer.msg(res.message);
        $(".zhuce .btn").click();
      },
    });
  });

  $(".denglu").on("submit", function (e) {
    e.preventDefault();
    let username = $(".denglu [name=username]").val();
    let password = $(".denglu [name=password]").val();
    $.ajax({
      method: "post",
      url: "/api/login",
      data: {
        username,
        password,
      },
      success: function (res) {
        console.log(res);
        if (res.status !== 0) return layer.msg(res.message);
        localStorage.setItem("token", res.token);
        layer.msg(res.message);
        location.href = "/index.html";
      },
    });
  });
});

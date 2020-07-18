$(function () {
  const layer = layui.layer;
  function getInfo() {
    $.ajax({
      method: "GET",
      url: "/my/userinfo",
      success: function (res) {
        if (res.status !== 0) return layer.msg("获取信息失败！");
        setInfo(res.data);
      },
    });
  }

  getInfo();

  $("#userOut").on("click", function () {
    layer.confirm("确定退出吗？", { icon: 3, title: "提示" }, function (index) {
      localStorage.removeItem("token");
      location.href = "/login.html";
      layer.close(index);
    });
  });

  function setInfo(user) {
    let name = user.nickname || user.username;
    $(".welcome")
      .html("&nbsp&nbsp欢迎&nbsp&nbsp" + name)
      .css("display", "inline-block");
    let first = name[0].toUpperCase();
    if (user.user_pic) {
      $(".layui-nav-img")
        .prop("src", user.user_pic)
        .css("display", "inline-block");
      $(".text-avatar").hide();
    } else {
      $(".layui-nav-img").hide();
      $(".text-avatar").html(first).css("display", "inline-block");
    }
  }
});

$(function () {
  getInfo();

  $("#userout").on("click", function () {
    layer.confirm("是否退出登录？", { icon: 3, title: "提示" }, function (
      index
    ) {
      location.href = "/login.html";
      localStorage.removeItem("token");
      layer.close(index);
    });
  });
});

const layer = layui.layer;

function getInfo() {
  $.ajax({
    method: "get",
    url: "/my/userinfo",
    success: function (res) {
      if (res.status != 0) return layer.msg(res.message);
      setInfo(res.data);
    },
    complete: function (res) {
      let data = JSON.parse(res.responseText);
      if (data.status != 0) {
        location.href = "/login.html";
        localStorage.removeItem("token");
      }
    },
  });
}

function setInfo(user) {
  console.log(user);
  let name = user.nickname || user.username;
  $(".usn").html("欢迎&nbsp&nbsp" + name);
  $(".unn").html(name);
  if (user.user_pic) {
    $(".layui-nav-img").show();
    $(".touxiang").hide();
  } else {
    $(".layui-nav-img").hide();
    $(".touxiang").show();
  }
}

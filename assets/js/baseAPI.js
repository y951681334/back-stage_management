$.ajaxPrefilter(function (options) {
  options.url = "http://ajax.frontend.itheima.net" + options.url;

  if (options.url.indexOf("/my/") != -1) {
    options.headers = {
      Authorization: localStorage.getItem("token") || "",
    };
  }

  options.complete = function (res) {
    let data = JSON.parse(res.responseText);
    if (data.status == 1 && data.message == "身份认证失败！") {
      localStorage.removeItem("token");
      location.href = "/login.html";
    }
  };
});

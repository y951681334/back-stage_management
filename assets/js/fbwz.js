$(function () {
  const layer = layui.layer;
  const form = layui.form;
  function setInfo() {
    $.ajax({
      method: "GET",
      url: "/my/article/cates",
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("获取分类数据失败！");
        }
        // 调用模板引擎渲染分类的可选项
        var htmlStr = template("tpl-cate", res);
        $("[name=cate_id]").html(htmlStr);
        // 通过 layui 重新渲染表单区域的UI结构
        form.render();
      },
    });
  }

  setInfo();
  initEditor();

  var $image = $("#image");

  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: ".img-preview",
  };

  // 3. 初始化裁剪区域
  $image.cropper(options);

  $(".xzfm").on("click", function () {
    $("#file").click();
  });

  $("#file").on("change", function (e) {
    var file = e.target.files[0];
    var newImgURL = URL.createObjectURL(file);
    $image
      .cropper("destroy") // 销毁旧的裁剪区域
      .attr("src", newImgURL) // 重新设置图片路径
      .cropper(options); // 重新初始化裁剪区域
  });

  let state = "已发布";

  $(".cwcg").on("click", function () {
    state = "草稿";
  });

  $("#form1").on("submit", function (e) {
    e.preventDefault();
    let formData = new FormData($(this)[0]);
    formData.append("state", state);

    $image
      .cropper("getCroppedCanvas", {
        // 创建一个 Canvas 画布
        width: 400,
        height: 280,
      })
      .toBlob(function (blob) {
        // 将 Canvas 画布上的内容，转化为文件对象
        // 得到文件对象后，进行后续的操作
        formData.append("cover_img", blob);

        $.ajax({
          method: "post",
          url: "/my/article/add",
          data: formData,
          contentType: false,
          processData: false,
          success: function (res) {
            console.log(res);
          },
        });
      });
  });
});

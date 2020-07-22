$(function () {
  const form = layui.form;
  const layer = layui.layer;
  initEditor();
  // 1. 初始化图片裁剪器
  var $image = $("#image");

  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: ".img-preview",
  };

  // 3. 初始化裁剪区域
  $image.cropper(options);

  function getCates() {
    $.ajax({
      method: "get",
      url: "/my/article/cates",
      success: function (res) {
        if (res.status != 0) return layer.msg("获取所有分类失败！");
        let htmlStr = template("template2", res);
        $("[name=cate_id]").html(htmlStr);
        form.render();
      },
    });
  }

  $(".xzfm").on("click", function () {
    $("[name=file]").click();
  });

  $("[name=file]").on("change", function (e) {
    let file = e.target.files[0];
    let newImgURL = URL.createObjectURL(file);
    $image
      .cropper("destroy") // 销毁旧的裁剪区域
      .attr("src", newImgURL) // 重新设置图片路径
      .cropper(options); // 重新初始化裁剪区域
  });

  let state = "已发布";
  $(".cwcg").on("click", function () {
    state = "草稿";
  });

  $(".layui-form").on("submit", function (e) {
    e.preventDefault();
    let form = new FormData(this);
    form.append("state", state);
    $image
      .cropper("getCroppedCanvas", {
        // 创建一个 Canvas 画布
        width: 400,
        height: 280,
      })
      .toBlob(function (blob) {
        // 将 Canvas 画布上的内容，转化为文件对象
        // 得到文件对象后，进行后续的操作
        form.append("cover_img", blob);

        $.ajax({
          method: "post",
          url: "/my/article/add",
          data: form,
          contentType: false,
          processData: false,
          success: function (res) {
            if (res.status != 0) return layer.msg("文章添加失败！");
            layer.msg("文章添加成功！");
            $(".layui-form")[0].reset();
          },
        });
      });
  });

  getCates();
});

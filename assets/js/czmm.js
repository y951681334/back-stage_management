$(function () {
  const form = layui.form;
  form.verify({
    newPaw: function (value) {
      if (value == $("[name=pws]").val()) {
        return "新旧密码不能重复!";
      }
    },
    oldPaw: function (value) {
      if (value !== $("[name=newPws]").val()) {
        return "两次密码不一致！";
      }
    },
  });
});

<template>
  <div></div>
</template>

<script>
export default {
  mounted() {
    $.ajaxSetup({crossDomain: true, xhrFields: {withCredentials: true}});
    let this_vue = this;
    layui.use(["form", "layedit", "laydate"], function() {
      let layer = layui.layer
      layer.open({
        id: 1,
        type: 1,
        closeBtn: 0,
        anim: 0,
        scrollbar:false,
        title: "注册-激活",
        skin: "layui-layer-rim",
        area: ["28%", "45%"],

        content:
          '<div class="layui-row layui-col-space6" style="margin:auto; margin-top: 5%">' +
            '<div class="layui-card-body">' +
            '<label class="layui-form-label" style="font-size: medium">用户名：</label>' +
            "<div class='layui-input-block'>" +
            '<input id="enroll_username" class="layui-input layui-form-danger" lay-verify="required" placeholder="请输入唯一用户名">' +
            "</div>" +
            '<label class="layui-form-label" style="font-size: medium">邮箱：</label>' +
            "<div class='layui-input-block'>" +
            '<input id="enroll_email" class="layui-input layui-form-danger" lay-verify="required" placeholder="请输入注册邮箱">' +
            "</div>" +
            '<label class="layui-form-label" style="font-size: medium">密码：</label>' +
            "<div class='layui-input-block'>" +
            '<input id="enroll_password0" type="password" class="layui-input layui-form-danger" lay-verify="required" placeholder="请输入自定义密码">' +
            "</div>" +
            '<label class="layui-form-label" style="font-size: medium">密码：</label>' +
            "<div class='layui-input-block'>" +
            '<input id="enroll_password1" type="password" class="layui-input layui-form-danger" lay-verify="required" placeholder="请再次输入自定义密码">' +
            "</div>" +
            '<label class="layui-form-label" style="font-size: medium">激活码：</label>' +
            "<div class='layui-input-block'>" +
            '<input id="enroll_code" class="layui-input layui-form-danger" lay-verify="required" placeholder="请输入激活码">' +
            "</div>",
        btn: ["注册"],
        btn1: function(index) {
          let json = {
            username: $("#enroll_username").val(),
            email: $("#enroll_email").val(),
            password: $("#enroll_password0").val(),
            code: $("#enroll_code").val()
          };
          this_vue.$http
            .post(
              this_vue.$store.getters.getBaseUrl + "/enroll",
              JSON.stringify(json)
            )
            .then(res => {
              res = res.body;
              if (res.msg) {
                layer.msg("Successfully enrolled！", {
                  icon: 1,
                  time: 2000
                });
                layer.close(index);
              } else {
                layer.msg("Fail to enroll！", {
                  icon: 2,
                  time: 2000
                });
              }
            });
        }
      });
    });
  }
};
</script>

<style scoped>
</style>

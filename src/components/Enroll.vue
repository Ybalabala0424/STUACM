<template>
<div>
</div>
</template>

<script>
export default {
    mounted(){
      var this_vue = this;
      layer.open({
        id: 1,
        type: 1,
        title: "注册-激活",
        skin: "layui-layer-rim",
        area: ["450px", "auto"],

        content:
          '<div class="row" style="width: 420px;  margin-left:7px; margin-top:10px;">' +
          '<div class="col-sm-12">' +
          '<div class="input-group">' +
          '<span class="input-group-addon">用户名：</span>' +
          '<input id="enroll_username" class="form-control" placeholder="请输入唯一用户名">' +
          "</div>" +
          '<div class="input-group">' +
          '<span class="input-group-addon">邮箱：</span>' +
          '<input id="enroll_email" class="form-control" placeholder="请输入注册邮箱">' +
          "</div>" +
          '<div class="input-group">' +
          '<span class="input-group-addon">密码：</span>' +
          '<input id="enroll_password0" class="form-control" placeholder="请输入自定义密码">' +
          "</div>" +
          '<div class="input-group">' +
          '<span class="input-group-addon">密码：</span>' +
          '<input id="enroll_password1" class="form-control" placeholder="请再次输入自定义密码">' +
          "</div>" +
          '<div class="input-group">' +
          '<span class="input-group-addon">激活码：</span>' +
          '<input id="enroll_code" class="form-control" placeholder="请输入激活码">' +
          "</div>" +
          "</div>" +
          "</div>",
        btn: ["注册"],
        btn1: function(index, layero) {
          var json = {
            username: $("#enroll_username").val(),
            email: $("#enroll_email").val(),
            password: $("#enroll_password0").val(),
            code: $('#enroll_code').val()
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
    }
}
</script>

<style scoped>

</style>
<template>
  <div v-if="hasAcmer" class="container" style="width: 100%">
    <eP ref="editP"></eP>
    <div class="row" style="background-color: transparent;box-shadow:0px 0px 8px 5px #ccc;margin-bottom:1%">
      <div class="col-sm-3 col-md-3 col-lg-2">
        <h3>STUACM</h3>
      </div>
      <div class="col-sm-3 col-md-7 col-lg-8">
        <h3></h3>
      </div>
      <div class="col-sm-3 col-md-2 col-lg-2">
        <div class="btn-group" style="float: right;margin-right:25%">
          <button class="btn">Action</button>
          <button data-toggle="dropdown" class="btn dropdown-toggle">
            <span class="caret"></span>
          </button>
          <ul class="dropdown-menu">
            <li>
              <a v-if="this.$store.getters.getIsLogin" href="#" @click="editProfile">个人信息</a>
            </li>
            <li>
              <a v-if="this.$store.getters.getIsLogin" href="#" @click="changePassword">账号信息</a>
            </li>
            <li>
              <a v-if="this.$store.getters.getIsLogin" href="#" @click="tryLogout">Log out</a>
            </li>
            <li>
              <a v-if="!this.$store.getters.getIsLogin" href="#" @click="tryLogin">Log in</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-3 col-md-2 col-lg-2" style="background-color: transparent;box-shadow:0px 0px 8px 5px #ccc;margin-bottom:1%">
        <sPf></sPf>
      </div>
      <div class="col-sm-3 col-md-2 col-lg-10">
        <!-- <MsP></MsP> -->
        <router-view ref="rtv"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import sPf from "./showProfile";
import MsP from "./MissionsPage";
import eP from "./EditProfile";
export default {
  components: {
    sPf,
    MsP,
    eP
  },
  data() {
    return {
      hasAcmer: false
    };
  },
  created() {
    var acmer = this.getUrlParam("acmer");
    console.log(acmer);
    if (acmer == null) {
      alert("请附带ACMER参数");
      window.location.href = "/";
    } else {
      var json = {
        username: acmer
      };
      this.$http
        .post(this.$store.getters.getBaseUrl + "/isExits", JSON.stringify(json))
        .then(res => {
          res = res.body;
          if (!res.msg) {
            alert("ACMER不存在");
            window.location.href = "/";
          } else {
            this.hasAcmer = true;
          }
        });
    }
  },
  mounted() {
    layui.use(["form", "layedit", "laydate"], function() {
      var form = layui.form,
        layer = layui.layer,
        layedit = layui.layedit,
        laydate = layui.laydate;
    });
  },
  methods: {
    getUrlParam: function(name) {
      var reg = new RegExp(name + "=([^&]*)"); //构造一个含有目标参数的正则表达式对象
      var r = window.location.toString().match(reg); //匹配目标参数
      if (r != null) return r[1];
      return null; //返回参数值
    },
    editProfile: function() {
      this.$refs.editP.popup();
    },
    tryLogin: function() {
      var this_vue = this;
      layer.open({
        id: 1,
        type: 1,
        title: "登录",
        skin: "layui-layer-rim",
        area: ["450px", "auto"],

        content:
          '<div class="row" style="width: 420px;  margin-left:7px; margin-top:10px;">' +
          '<div class="col-sm-12">' +
          '<div class="input-group">' +
          '<span class="input-group-addon">邮箱：</span>' +
          '<input id="login_email" class="form-control" placeholder="请输入注册邮箱">' +
          "</div>" +
          '<div class="input-group">' +
          '<span class="input-group-addon">密码：</span>' +
          '<input id="login_password" class="form-control" placeholder="请输入该页面用户的密码">' +
          "</div>" +
          "</div>" +
          "</div>",
        btn: ["登录", "取消"],
        btn1: function(index, layero) {
          var json = {
            username: this_vue.$store.getters.getUserName,
            email: $("#login_email").val(),
            password: $("#login_password").val()
          };
          this_vue.$http
            .post(
              this_vue.$store.getters.getBaseUrl + "/login",
              JSON.stringify(json)
            )
            .then(res => {
              res = res.body;
              if (res.msg) {
                layer.msg("Successfully login！", {
                  icon: 1,
                  time: 2000
                });
                this_vue.$store.dispatch("asetIsLogin", true);
              } else {
                layer.msg("Fail to login！", {
                  icon: 2,
                  time: 2000
                });
              }
            });
          layer.close(index);
        },
        btn2: function(index, layero) {
          layer.close(index);
        }
      });
    },
    changePassword: function() {
      var this_vue = this;
      layer.open({
        id: 1,
        type: 1,
        title: "修改密码",
        skin: "layui-layer-rim",
        area: ["450px", "auto"],

        content:
          '<div class="row" style="width: 420px;  margin-left:7px; margin-top:10px;">' +
          '<div class="col-sm-12">' +
          '<div class="input-group">' +
          '<span class="input-group-addon">原密码：</span>' +
          '<input id="cpw_oldpw" class="form-control" placeholder="请输入现在在用的密码">' +
          "</div>" +
          '<div class="input-group">' +
          '<span class="input-group-addon">新密码：</span>' +
          '<input id="cpw_newpw0" class="form-control" placeholder="请输入更换后的密码">' +
          "</div>" +
          '<div class="input-group">' +
          '<span class="input-group-addon">新密码：</span>' +
          '<input id="cpw_newpw1" class="form-control" placeholder="请再次输入新密码">' +
          "</div>" +
          "</div>" +
          "</div>",
        btn: ["修改", "取消"],
        btn1: function(index, layero) {
          var json = {
            username: this_vue.$store.getters.getUserName,
            oldpw: $("#cpw_oldpw").val(),
            newpw: $("#cpw_newpw0").val()
          };
          this_vue.$http
            .post(
              this_vue.$store.getters.getBaseUrl + "/changePW",
              JSON.stringify(json)
            )
            .then(res => {
              res = res.body;
              if (res.msg) {
                layer.msg("修改成功!", {
                  icon: 1,
                  time: 2000
                });
              } else {
                layer.msg("修改失败!", {
                  icon: 2,
                  time: 2000
                });
              }
            });
          layer.close(index);
        },
        btn2: function(index, layero) {
          layer.close(index);
        }
      });
    },
    tryLogout: function(){
      var json = {
        username: this.$store.getters.getUserName
      }
      this.$http
        .post(
          this.$store.getters.getBaseUrl + "/logout",
          JSON.stringify(json)
        )
        .then(res => {
          res = res.body;
          if (res.msg) {
            layer.msg("Successfully logout!", {
              icon: 1,
              time: 2000
            });
            this.$store.dispatch("asetIsLogin", false);
          } else {
            layer.msg("Fail to logout!", {
              icon: 2,
              time: 2000
            });
          }
        });
    }
  }
};
</script>

<style scoped>
@import "../../static/bootstrap-3.3.7-dist/css/bootstrap.min.css";
</style>
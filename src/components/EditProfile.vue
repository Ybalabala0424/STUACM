<template>
  <!-- 编辑个人信息 弹窗内容开始 -->
  <div id="editProfile_background" class="back">
    <div class="editProfile">
      <div id="editProfile_close">
        <span id="editProfile_close-button">×</span>
        <h2>详细内容</h2>
      </div>
      <div style="height:625px">
        <div class="container">
          <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-12">
              <div class="layui-upload">
                <div class="layui-upload-list">
                  <img
                    id="test1"
                    ref="eP_user_img"
                    alt="140x140"
                    src="BG4.jpg"
                    class="img-circle layui-upload-img"
                    style="height: 140px;width:140px"
                  />
                  <p id="demoText"></p>
                </div>
              </div>
              <span class="help-block">点击头像以更换头像.</span>
              <form>
                <div class="row">
                  <label class="col-sm-6 col-md-6 col-lg-6">个性签名</label>
                  <textarea ref="eP_user_signature" class="col-sm-6 col-md-6 col-lg-6"></textarea>
                </div>
                <fieldset>
                  <legend>个人相关</legend>
                  <div class="row">
                    <label class="col-sm-6 col-md-6 col-lg-6">昵称</label>
                    <input ref="eP_user_nickname" class="col-sm-6 col-md-6 col-lg-6" type="text" />
                  </div>
                  <div class="row">
                    <label class="col-sm-6 col-md-6 col-lg-6">codeforces 用户名</label>
                    <input ref="eP_user_codeforces" class="col-sm-6 col-md-6 col-lg-6" type="text" />
                  </div>
                  <div class="row">
                    <label class="col-sm-6 col-md-6 col-lg-6">sdutacm 用户名</label>
                    <input ref="eP_user_sdutacm" class="col-sm-6 col-md-6 col-lg-6" type="text" />
                  </div>
                  <div class="row">
                    <label class="col-sm-6 col-md-6 col-lg-6">个人博客</label>
                    <ul ref="eP_user_blogs" class="col-sm-6 col-md-6 col-lg-6" style="padding: 0">
                      <li>
                        <input class="col-sm-6 col-md-6 col-lg-6" type="text" />
                        <input class="col-sm-6 col-md-6 col-lg-6" type="text" />
                      </li>
                      <li>
                        <input class="col-sm-6 col-md-6 col-lg-6" type="text" />
                        <input class="col-sm-6 col-md-6 col-lg-6" type="text" />
                      </li>
                      <li>
                        <input class="col-sm-6 col-md-6 col-lg-6" type="text" />
                        <input class="col-sm-6 col-md-6 col-lg-6" type="text" />
                      </li>
                    </ul>
                  </div>
                </fieldset>
              </form>
              <span class="help-block">修改任何信息都需要点击提交.</span>
              <button type="button" class="btn" @click="UpgProfile">提交</button>
            </div>
          </div>
        </div>
      </div>
      <!-- <h3 id="editProfile_foot">底部内容</h3> -->
    </div>
  </div>
  <!-- 弹窗内容结束 -->
</template>

<script>
export default {
  mounted() {
    var editProfile_div = document.getElementById("editProfile_background");
    var editProfile_close = document.getElementById("editProfile_close-button");
    editProfile_close.onclick = function close() {
      editProfile_div.style.display = "none";
    };
    window.onclick = function close(e) {
      if (e.target == editProfile_div) {
        editProfile_div.style.display = "none";
      }
    };

    var this_vue = this;
    layui.use("upload", function() {
      var $ = layui.jquery,
        upload = layui.upload;

      //普通图片上传
      var uploadInst = upload.render({
        elem: "#test1",
        url: this_vue.$store.getters.getBaseUrl + "/upgProfileImg",
        xhrFields: { withCredentials: true },
        data: {
          username: this_vue.$store.getters.getUserName
        },
        choose: function(obj) {
          //预读本地文件示例，不支持ie8
          obj.preview(function(index, file, result) {
            $(this_vue.$refs.eP_user_img).attr("src", result); //图片链接（base64）
          });
        },
        done: function(res) {
          console.log(res.new_imgurl);
          if (res.msg) {
            layer.msg("Successfully upgraded profile!", {
              icon: 1,
              time: 2000
            });
            this_vue.$parent.refreshSPF();
          } else {
            layer.msg("Fail to upgrade profile!", {
              icon: 2,
              time: 2000
            });
          }
        },
        error: function() {
          //演示失败状态，并实现重传
          var demoText = $("#demoText");
          demoText.html(
            '<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>'
          );
          demoText.find(".demo-reload").on("click", function() {
            uploadInst.upload();
          });
        }
      });
    });
  },
  methods: {
    popup: function() {
      var editProfile_div = document.getElementById("editProfile_background");
      editProfile_div.style.display = "block";
    },
    fillProfile: function(profile) {
      $(this.$refs.eP_user_img).attr("src", profile.user_img);
      $(this.$refs.eP_user_nickname).val(profile.user_nickname);
      $(this.$refs.eP_user_signature).val(profile.user_signature);
      $(this.$refs.eP_user_codeforces).val(profile.user_codeforces);
      $(this.$refs.eP_user_sdutacm).val(profile.user_sdutacm);
      for (var i = 0; i < 3; i++) {
        $($(this.$refs.eP_user_blogs).find("input")[i * 2]).val(
          profile.user_blogs[i].name
        );
        $($(this.$refs.eP_user_blogs).find("input")[i * 2 + 1]).val(
          profile.user_blogs[i].url
        );
      }
    },
    UpgProfile: function() {
      let user_blogs = [];
      for (var i = 0; i < 3; i++) {
        user_blogs.push({
          name: $($(this.$refs.eP_user_blogs).find("input")[i * 2]).val(),
          url: $($(this.$refs.eP_user_blogs).find("input")[i * 2 + 1]).val()
        });
      }
      var json = {
        username: this.$store.getters.getUserName,
        user_nickname: $(this.$refs.eP_user_nickname).val(),
        user_signature: $(this.$refs.eP_user_signature).val(),
        user_codeforces: $(this.$refs.eP_user_codeforces).val(),
        user_sdutacm: $(this.$refs.eP_user_sdutacm).val(),
        user_blogs: user_blogs
      };
      this.$http
        .post(
          this.$store.getters.getBaseUrl + "/upgProfile",
          JSON.stringify(json)
        )
        .then(res => {
          res = res.body;
          if (res.msg) {
            layer.msg("Successfully upgraded profile!", {
              icon: 1,
              time: 2000
            });
            this.$parent.refreshSPF();
          } else {
            layer.msg("Fail to upgrade profile!", {
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
ul li {
  list-style: none;
}
#editProfile_background {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 17px;
  text-align: 1.5;
  z-index: 1000;
  display: none;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.editProfile {
  background: #eeeeee;
  width: 56%;
  margin: 4% auto;
  overflow: auto;
}

#editProfile_close {
  padding: 5px;
  background: #ff6a6a;
}

#editProfile_close-button {
  float: right;
  font-size: 30px;
}

/* #editProfile_foot {
  padding: 5px 0;
  text-align: center;
  background: #ff6a6a;
  color: white;
} */
</style>
<template>
  <div class="container" style="width: 100%">
    <nMM ref="newaMM"></nMM>
    <div class="row">
      <div class="col-sm-12 col-md-12 col-lg-12">
        <button class="btn btn-block btn-large" type="button" style="margin-bottom: 3%">
          <router-link to="MissionsPage" style="font-size: large;margin-bottom: 5%">Missions</router-link>
        </button>
        <img
          ref="user_img"
          alt="140x140"
          src="BG4.jpg"
          class="img-circle"
          style="height: 140px;width:140px"
        />
        <h2 ref="user_nickname">...</h2>
        <blockquote>
          <p ref="user_signature">...</p>
        </blockquote>
        <form>
            <legend>个人相关</legend>
            <div class="row">
              <div class="media">
                <div>
                  <h4 class="media-heading" style="margin-bottom:5%"><i class="layui-icon layui-icon-face-smile" style="font-size: 22px; color: #4692cf;"></i>  codeforces：  <span ref="user_codeforces"></span></h4>
                  <h4 class="media-heading" style="margin-bottom:5%"><i class="layui-icon layui-icon-console" style="font-size: 22px; color: #4692cf;"></i>  sdutacm：  <span ref="user_sdutacm"></span></h4>
                  <h4 class="media-heading" style="margin-bottom:3%">
                    <div class="layui-row">
                      <div class="layui-col-xs7 layui-col-sm7 layui-col-md7" style="padding-left: 15%"><i class="layui-icon layui-icon-release" style="font-size: 22px; color: #4692cf;"></i>  个人博客：</div>
                      <div class="layui-col-xs1 layui-col-sm1 layui-col-md1">
                        <ul ref="user_blogs" style="display: inline-block">
                          <li>
                            <a href="javascript:;" style="display: block;margin: auto;font-size: larger;padding-bottom: 3%">...</a>
                          </li>
                          <li>
                            <a href="javascript:;" style="display: block;margin: auto;font-size: larger;padding-bottom: 3%">...</a>
                          </li>
                          <li>
                            <a href="javascript:;" style="display: block;margin: auto;font-size: larger;padding-bottom: 3%">...</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </h4>
                </div>
              </div>
            </div>
        </form>
          <div class="accordion" id="show_mindmaps">
            <div class="accordion-group">
              <div class="accordion-heading">
                <legend>
                  <a
                    class="accordion-toggle collapsed"
                    data-toggle="collapse"
                    data-parent="#show_mindmaps"
                    href="#mindmaps_box"
                    style="color: #33395f"
                  >Mind-maps <i id="iconMind" class="layui-icon layui-icon-template-1"></i></a>
                  <label v-if="this.$store.getters.getIsLogin" @click="newaMindMap">+</label>
                  <!-- <label @click="test">test</label> -->
                </legend>
              </div>
              <div id="mindmaps_box" class="accordion-body collapse">
                <div class="accordion-inner">
                  <ul v-if="refreshMMBox">
                    <aMM v-for="(info,index) in mindmap_infos" :key="index" :info="info"></aMM>
                  </ul>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
let iconMind = document.getElementById("iconMind");
import aMM from "./aMindMap";
import nMM from "./newMindMap";
export default {
  components: {
    aMM,
    nMM
  },
  data() {
    return {
      refreshMMBox: true,
      mindmap_infos: []
    };
  },
  created() {
    var json = {
      username : this.$store.getters.getUserName
    };
    this.$http
      .post(
        this.$store.getters.getBaseUrl + "/getProfile",
        JSON.stringify(json)
      )
      .then(res => {
        res = res.body;
        if (res.msg) {
          this.fillProfile(res.profile);
          this.$parent.$refs.editP.fillProfile(res.profile);
        } else {
          layer.msg("Fail to get profile!", {
            icon: 2,
            time: 2000
          });
        }
      });
  },
  mounted() {},
  methods: {
    // test: function(){
    //   this.$store.dispatch("asetIsLogin", !this.$store.getters.getIsLogin);
    //   console.log(this.$store.getters.getIsLogin)
    // },
    newaMindMap: function() {
      this.$refs.newaMM.popup();
    },
    fillProfile: function(profile) {
      this.mindmap_infos = profile.mindmap_infos;
      $(this.$refs.user_img).attr("src", profile.user_img);
      $(this.$refs.user_nickname).text(profile.user_nickname);
      $(this.$refs.user_signature).text(profile.user_signature);
      $(this.$refs.user_codeforces).text(profile.user_codeforces);
      $(this.$refs.user_sdutacm).text(profile.user_sdutacm);
      for (var i = 0; i < 3; i++) {
        $($(this.$refs.user_blogs).find("a")[i]).attr(
          "href",
          profile.user_blogs[i].url
        );
        $($(this.$refs.user_blogs).find("a")[i]).text(
          profile.user_blogs[i].name
        );
      }
    },
    refreshMindMapBox: function() {
      var json = {
        username: this.$store.getters.getUserName,
      };
      this.$http
        .post(
          this.$store.getters.getBaseUrl + "/getMindMapInfos",
          JSON.stringify(json)
        )
        .then(res => {
          res = res.body;
          if (res.msg) {
            this.mindmap_infos = res.mindmap_infos;

            // 移除组件
            this.refreshMMBox = false;
            // 在组件移除后，重新渲染组件
            // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
            this.$nextTick(() => {
              this.refreshMMBox = true;
            });
          } else {
            layer.msg("Fail to refresh!", {
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
</style>

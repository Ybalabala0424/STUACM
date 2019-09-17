<template>
  <div class="container" style="width: 100%">
    <nMM ref="newaMM"></nMM>
    <div class="row">
      <div class="col-sm-12 col-md-12 col-lg-12">
        <button class="btn btn-block btn-large" type="button">
          <router-link to="MissionsPage">Missions</router-link>
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
            <label class="col-sm-6 col-md-6 col-lg-6">codeforces：</label>
            <span ref="user_codeforces" class="col-sm-6 col-md-6 col-lg-6">...</span>
            <label class="col-sm-6 col-md-6 col-lg-6">sdutacm：</label>
            <span ref="user_sdutacm" class="col-sm-6 col-md-6 col-lg-6">...</span>
            <label class="col-sm-12 col-md-12 col-lg-12">个人博客：</label>
            <div class="col-sm-4 col-md-4 col-lg-4"></div>
            <ul ref="user_blogs" class="col-sm-8 col-md-8 col-lg-8">
              <li>
                <a href="">...</a>
              </li>
              <li>
                <a href="">...</a>
              </li>
              <li>
                <a href="">...</a>
              </li>
            </ul>
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
                  >Mind-maps</a>
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
	$($(this.$refs.user_blogs).find("a")[0]).attr("href",profile.user_blogs[0].url);
	$($(this.$refs.user_blogs).find("a")[1]).attr("href",profile.user_blogs[1].url);
	$($(this.$refs.user_blogs).find("a")[2]).attr("href",profile.user_blogs[2].url);
        $($(this.$refs.user_blogs).find("a")[0]).text(profile.user_blogs[0].name);
        $($(this.$refs.user_blogs).find("a")[1]).text(profile.user_blogs[1].name);
        $($(this.$refs.user_blogs).find("a")[2]).text(profile.user_blogs[2].name);
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

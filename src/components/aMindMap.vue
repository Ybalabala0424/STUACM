<template>
  <li class="layui-row" v-if="!isDeled">
    <a class="layui-col-md9" @click="routerTo" href="#" style="font-size: large;margin: 2%;display: inline">{{info.name}}</a>
    <label
      class="layui-col-md2 layui-col-md-offset8"
      v-if="this.$store.getters.getIsLogin"
      @click="delmindmap"
      style="margin-top: -10%"
    ><i class="layui-icon layui-icon-delete"></i></label>

  </li>
</template>

<script>
export default {
  props: {
    info: Object
  },
  data() {
    return {
      isDeled: false
    };
  },
  methods: {
    routerTo() {
      this.$router.push({
        path: "MindMap",
        query: {
          brief: this.info.brief,
          data: this.info.data,
          id: this.info.id,
          mindmap_name: this.info.name
        }
      });
      this.$parent.$parent.$refs.rtv.draw();
    },
    delmindmap: function() {
      var json = {
        username: this.$store.getters.getUserName,
        id: this.info.id
      };
      this.$http
        .post(
          this.$store.getters.getBaseUrl + "/delaMindMap",
          JSON.stringify(json)
        )
        .then(res => {
          res = res.body;
          if (res.msg) {
            layer.msg("Successfully deleted!", {
              icon: 1,
              time: 2000
            });
            this.isDeled = true;
          } else {
            layer.msg("Fail to get profile!", {
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

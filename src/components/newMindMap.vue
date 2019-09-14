<template>
  <!-- 编辑新导图 弹窗内容开始 -->
  <div id="newMindMap_background" class="back">
    <div class="newMindMap">
      <div id="newMindMap_close">
        <span id="newMindMap_close-button">×</span>
        <h2>详细内容</h2>
      </div>
      <div style="height:625px">
        <div class="container">
          <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-12">
              <form>
                <div class="row">
                  <label class="col-sm-6 col-md-6 col-lg-6">导图名称</label>
                  <input ref="nam_name" class="col-sm-6 col-md-6 col-lg-6" type="text" />
                </div>
                <div class="row">
                  <label class="col-sm-6 col-md-6 col-lg-6">导图简介</label>
                  <textarea ref="nam_brief" class="col-sm-6 col-md-6 col-lg-6"></textarea>
                </div>
                <div class="row">
                  <label class="col-sm-6 col-md-6 col-lg-6">首节点命名</label>
                  <input ref="nam_firstnode_name" class="col-sm-6 col-md-6 col-lg-6" type="text" />
                </div>
                <span class="help-block">修改任何信息都需要点击提交.</span>
              </form>
              <button type="submit" class="btn" @click="newaMindMap">提交</button>
            </div>
          </div>
        </div>
      </div>
      <!-- <h3 id="newMindMap_foot">底部内容</h3> -->
    </div>
  </div>
  <!-- 弹窗内容结束 -->
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    var newMindMap_div = document.getElementById("newMindMap_background");
    var newMindMap_close = document.getElementById("newMindMap_close-button");
    newMindMap_close.onclick = function close() {
      newMindMap_div.style.display = "none";
    };
    window.onclick = function close(e) {
      if (e.target == newMindMap_div) {
        newMindMap_div.style.display = "none";
      }
    };
  },
  methods: {
    popup: function() {
      var newMindMap_div = document.getElementById("newMindMap_background");
      newMindMap_div.style.display = "block";
    },
    newaMindMap: function() {
      var json = {
        username: this.$store.getters.getUserName,
        nam_name: $(this.$refs.nam_name).val(),
        nam_brief:$(this.$refs.nam_brief).val(),
        nam_firstnode_name:$(this.$refs.nam_firstnode_name).val()
      };
      this.$http
        .post(
          this.$store.getters.getBaseUrl + "/newaMindMap",
          JSON.stringify(json)
        )
        .then(res => {
          res = res.body;
          if (res.msg) {
            layer.msg("Successfully newed!", {
              icon: 1,
              time: 2000
            });
            $(this.$refs.nam_name).val("");
            $(this.$refs.nam_brief).val("");
            $(this.$refs.nam_firstnode_name).val("");
            this.$parent.refreshMindMapBox();
          } else {
            layer.msg("Fail to new!", {
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
#newMindMap_background {
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

.newMindMap {
  background: #eeeeee;
  width: 56%;
  margin: 4% auto;
  overflow: auto;
}

#newMindMap_close {
  padding: 5px;
  background: #ff6a6a;
}

#newMindMap_close-button {
  float: right;
  font-size: 30px;
}

/* #newMindMap_foot {
  padding: 5px 0;
  text-align: center;
  background: #ff6a6a;
  color: white;
} */
</style>
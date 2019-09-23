<template>
  <!-- 查看任务详情 弹窗内容开始 -->
  <div id="viewMission_background" class="back">
    <div class="viewMission">
      <div id="viewMission_close">
        <span id="viewMission_close-button" style="margin-top: auto">×</span>
        <h2>详细内容</h2>
      </div>
      <div style="height:625px;margin-top: 2%">
        <div class="container-fluid">
          <div class="row-fluid">
            <div class="span12">
              <span class="label badge-important" ref="am_belong" style="color: #009f95;font-size: 24px">文字标签</span>
              <div class="page-header">
                <h1 ref="am_title">页标题范例</h1>
              </div>
              <form style="margin:-2% 0 2% 0">
                <fieldset>
                  <label style="font-size: large;display: inline;margin-right: 1%" >开始时间  </label>
                  <p type="text" ref="am_start_t" style="font-size: large;display: inline">2019-09-08 00:00:00  </p>
                  <label  style="font-size: larger;margin:0 1% 0 1%;display: inline">—</label>
                  <label style="font-size: large;display: inline;margin-right: 1%">结束时间</label>
                  <p type="text" ref="am_end_t" style="margin-top: 4px;font-size: large;display: inline">2019-09-15 00:00:00</p>
<!--                  <div class="help-block" style="display: block">请在规定时间内完成任务哦!</div>-->
                </fieldset>
              </form>
              <div class="accordion" id="accordion-120870">
                <div class="accordion-group">
                  <div class="accordion-heading">
                    <a
                      class="accordion-toggle"
                      data-toggle="collapse"
                      data-parent="#accordion-120870"
                      href="#accordion-element-627540"
                    >
                      <h3 style="width: 20%;margin: auto;margin-bottom: 2%">任务简介</h3>
                    </a>
                  </div>
                  <div id="accordion-element-627540" class="accordion-body in collapse">
                    <div class="accordion-inner">
                      <blockquote>
                        <p ref="am_brief">写点东西</p>
                      </blockquote>
                    </div>
                  </div>
                </div>
                <div class="accordion-group">
                  <div class="accordion-heading">
                    <a
                      class="accordion-toggle"
                      data-toggle="collapse"
                      data-parent="#accordion-120874"
                      href="#accordion-element-627545"
                    >
                      <h3 style="width: 20%;margin: auto;margin-bottom: 2%">阅读材料</h3>
                    </a>
                  </div>
                  <div id="accordion-element-627545" class="accordion-body in collapse">
                    <div class="accordion-inner">
                      <ul ref="material_urls"></ul>
                    </div>
                  </div>
                </div>
                <div class="accordion-group">
                  <div class="accordion-heading">
                    <a
                      class="accordion-toggle"
                      data-toggle="collapse"
                      data-parent="#accordion-120874"
                      href="#accordion-element-962876"
                    >
                      <h3 style="width: 20%;margin: auto">实战例题</h3>
                    </a>
                  </div>
                  <div id="accordion-element-962876" class="accordion-body collapse">
                    <div class="accordion-inner" style="padding: 1% 10% 2% 10%">
                      <table class="table">
                        <thead style="margin: auto">
                          <tr style="margin-bottom: 2%">
                            <th style="text-align: center">题目</th>
                            <th style="text-align: center">截止状态</th>
                            <th style="text-align: center">当前状态</th>
                          </tr>
                        </thead>
                        <tbody ref="problem_urls">
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <h3 id="viewMission_foot">底部内容</h3> -->
    </div>
  </div>
  <!-- 弹窗内容结束 -->
</template>

<script>
export default {
  mounted() {
    var viewMission_div = document.getElementById("viewMission_background");
    var viewMission_close = document.getElementById("viewMission_close-button");
    viewMission_close.onclick = function close() {
      viewMission_div.style.display = "none";
    };
    window.onclick = function close(e) {
      if (e.target == viewMission_div) {
        viewMission_div.style.display = "none";
      }
    };
  },
  methods: {
    popup: function() {
      var viewMission_div = document.getElementById("viewMission_background");
      viewMission_div.style.display = "block";
    },
    addaurl: function(name, url, belong_ul) {
      let nli_str =
        '<li class="row"><a href="' + url + '">' + name + "</a></li>";
      let nli = $(nli_str);
      $(belong_ul).append(nli);
    },
    getStatusBGC(status){
      if(status=="Accepted") return "#009f95";
      if(status=="NotAccepted") return "indianred";
    },
    addapro: function(name, url, belong_tbody, status0, status1) {
      status0 = (status0=="Accepted"?"Accepted":"NotAccepted");
      status1 = (status1=="Accepted"?"Accepted":"NotAccepted");
      let ntr_str =
        '\
      <tr>\
        <td style="font-size:large;padding-top: 1%"><a href="' +
        url +
        '">' +
        name +
        "</a></td>\
        <td style='font-size:large'>" +
        status0 +
        "</td>\
        <td style='font-size:large'>" +
        status1 +
        "</td>\
      </tr>";
      let ntr = $(ntr_str);
      $(ntr.children("td")[1]).css("color",this.getStatusBGC(status0));
      $(ntr.children("td")[1]).css("padding-top","1%");
      $(ntr.children("td")[2]).css("color",this.getStatusBGC(status1));
      $(ntr.children("td")[2]).css("padding-top","1%");
      $(belong_tbody).append(ntr);
    },
    fillMissionDetail: function(title, start_t, end_t, belong, detail) {
      $(this.$refs.am_title).text(title);
      $(this.$refs.am_start_t).val(start_t);
      $(this.$refs.am_end_t).val(end_t);
      $(this.$refs.am_belong).text(belong);
      $(this.$refs.brief).text(detail.brief);

      $(this.$refs.material_urls).empty();
      for (var i = 0; i < detail.left_urls.length; i++) {
        this.addaurl(
          detail.left_urls[i].name,
          detail.left_urls[i].url,
          this.$refs.material_urls
        );
      }
      $(this.$refs.problem_urls).empty();
      for (var i = 0; i < detail.right_urls.length; i++) {
        this.addapro(
          detail.right_urls[i].name,
          detail.right_urls[i].url,
          this.$refs.problem_urls,
          detail.right_urls[i].status0,
          detail.right_urls[i].status1
        );
      }
    }
  }
};
</script>

<style scoped>
@import "../../static/bootstrap-3.3.7-dist/css/bootstrap.min.css";
#viewMission_background {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 17px;
  /* text-align: 1.5; */
  z-index: 1000;
  display: none;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.viewMission {
  background: #eeeeee;
  width: 56%;
  margin: 4% auto;
  overflow: auto;
}

#viewMission_close {
  padding: 5px;
  background: #a5bbcc;
}

#viewMission_close-button {
  float: right;
  font-size: 30px;
}

/* #viewMission_foot {
  padding: 5px 0;
  text-align: center;
  background: #ff6a6a;
  color: white;
} */
.Accepted{
  color: #009f95;
}

.NotAccepted{
  color:indianred;
}
</style>

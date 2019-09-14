<template>
  <div class="container">
    <button @click="viewaMission">view</button>
    <div class="row">
      <div class="col-sm-12 col-md-12 col-lg-12">
        <div class="accordion" id="accordion-367304">
          <aM ref="viewaM"></aM>
          <eP ref="editaP"></eP>
          <nM ref="newaM"></nM>
          <nMM ref="newaMM"></nMM>
          <asms :info="info2"></asms>
          <asms :info="info3"></asms>
          <dtper :dtper_info="dtper_info"></dtper>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apm from "./aPieceOfMission"
import asms from "./aSetOfMissions"
import aM from "./aMission"
import eP from "./EditProfile"
import dtper from "./timepicker"
import nM from "./newMission"
import nMM from "./newMindMap"
export default {
  name: 'HelloWorld',
  components:{
    apm, asms, aM, eP, dtper,nM,nMM
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      info: {
        title: "first",
        start_t: "2019-08-29 00:00:00",
        end_t: "2019-09-08 00:00:00",
        belong: "official"
      },
      info2: {
        data_parent: "accordion-367304",
        inner_id: "accordion-inner-123456"
      },
      info3: {
        data_parent: "accordion-367304",
        inner_id: "accordion-inner-123789"
      },
      dtper_info: {
        label_name: "开始时间",
        input_name: "start_t"
      }
    }
  },
  methods:{
    viewaMission: function(){
      this.$refs.newaM.popup();
    }
  }
}
</script>

<style scoped>
@import "../../static/bootstrap-3.3.7-dist/css/bootstrap.min.css";
</style>

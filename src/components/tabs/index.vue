<template>
  <el-tabs type="border-card">
    <el-tab-pane label="船舶信息">
      <el-scrollbar class="scrolls">
        <el-row class="el6" v-if="info">
          <el-col :span="12"><span>中文船名</span></el-col>
          <el-col :span="12"><span>{{info.zwcm}}</span></el-col>
          <el-col :span="12"><span>曾用中文船名</span></el-col>
          <el-col :span="12"><span>{{info.cyzwcm}}</span></el-col>
          <el-col :span="12"><span> 船舶总长(米)</span></el-col>
          <el-col :span="12"><span>{{info.cbzc}}</span></el-col>
          <el-col :span="12"><span>船舶登记号</span></el-col>
          <el-col :span="12"><span>{{info.cbdjh}}</span></el-col>
          <el-col :span="12"><span>船籍港代码</span></el-col>
          <el-col :span="12"><span>{{info.cjgdm}}</span></el-col>
          <el-col :span="12"><span>参考载重吨(吨) </span></el-col>
          <el-col :span="12"><span>{{info.ckzzd}}</span></el-col>
          <el-col :span="12"><span>船舶种类代码 </span></el-col>
          <el-col :span="12"><span>{{info.cbzldm}}</span></el-col>
          <el-col :span="12"><span>船检登记号 </span></el-col>
          <el-col :span="12"><span>{{info.cjdjh}}</span></el-col>
          <el-col :span="12"><span>空载吃水(米)</span></el-col>
          <el-col :span="12"><span>{{info.kzcs}}</span></el-col>
          <el-col :span="12"><span> 满载吃水(米) </span></el-col>
          <el-col :span="12"><span>{{info.mzcs}}</span></el-col>
          <el-col :span="12"><span>净吨位</span></el-col>
          <el-col :span="12"><span>{{info.jdw}}</span></el-col>
          <el-col :span="12"><span>船舶型宽(米) </span></el-col>
          <el-col :span="12"><span>{{info.cbxk}}</span></el-col>
          <el-col :span="12"><span>船舶型深(米)</span></el-col>
          <el-col :span="12"><span>{{info.cbxs}}</span></el-col>
          <el-col :span="12"><span>牌簿号</span></el-col>
          <el-col :span="12"><span>{{info.pbh}}</span></el-col>
          <el-col :span="12"><span>造船厂名称</span></el-col>
          <el-col :span="12"><span>{{info.zccmc}}</span></el-col>
          <el-col :span="12"><span>造船地点</span></el-col>
          <el-col :span="12"><span>{{info.zcdd}}</span></el-col>
          <el-col :span="12"><span>安放龙骨日期 </span></el-col>
          <el-col :span="12"><span>{{info.aflgrq}}</span></el-col>
          <el-col :span="12"><span>龙骨以上最大高度</span></el-col>
          <el-col :span="12"><span>{{info.lgyszdgd}}</span></el-col>
          <el-col :span="12"><span>所有人</span></el-col>
          <el-col :span="12"><span>{{info.syr}}</span></el-col>
          <el-col :span="12"><span>所有人联系电话</span></el-col>
          <el-col :span="12"><span>{{info.syrlxdh}}</span></el-col>
        </el-row>
      </el-scrollbar>
    </el-tab-pane>
    <el-tab-pane label="信号">
      <el-scrollbar class="scrolls">
        <el-row class="el1" v-if="Signal">
          <el-col :span="12"><span>信号接收时间</span></el-col>
          <el-col :span="12"><span>{{Signal.signalReceivedTime}}</span></el-col>
          <el-col :span="12"><span>航向</span></el-col>
          <el-col :span="12"><span>{{Signal.courseAngle}}</span></el-col>
          <el-col :span="12"><span>纬度</span></el-col>
          <el-col :span="12"><span>{{Signal.latitude}}</span></el-col>
          <el-col :span="12"><span>经度</span></el-col>
          <el-col :span="12"><span>{{Signal.longitude}}</span></el-col>
          <el-col :span="12"><span>船舶信息</span></el-col>
          <el-col :span="12"><span>{{Signal.shipMessage}}</span></el-col>
          <el-col :span="12"><span>速度</span></el-col>
          <el-col :span="12"><span>{{Signal.speed}}</span></el-col>
        </el-row>
      </el-scrollbar>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { getSignal, getShipInfo } from '@/api/tabs'
export default {
  props: ['shipName'],
  data () {
    return {
      info: null,
      Signal: null
    }
  },
  mounted () {
    this.getSignalFun()
    this.getShipInfoFun()
  },
  methods: {
    getSignalFun () {
      getSignal(this.shipName).then(response => {
        this.Signal = response.data
      })
    },
    getShipInfoFun () {
      getShipInfo(this.shipName).then(response => {
        this.info = response.data[0]
      })
    }
  },
  watch: {
    shipName () {
      this.getSignalFun()
      this.getShipInfoFun()
    }
  }
}
</script>

<style scoped lang="scss">
.el-col {
  height: 30px;
  line-height: 30px;
}

.el-tab-pane {
  height: 350px;
}

.scrolls {
  span {
    overflow: hidden; /*超出部分隐藏*/
    white-space: nowrap; /*不换行*/
    text-overflow: ellipsis; /*超出部分文字以...显示*/
  }

  p {
    text-align: center;
  }

  .el1,
  .el6 {
    .el-col {
      border: 1px solid #f5f5f5;
      height: 40px;
      line-height: 40px;
      padding-left: 10px;
    }
  }
}

.text {
  margin-top: 14px;

  ul {
    /*display: flex;*/
    /*align-items: center;*/
    /*flex-wrap: wrap;*/

    li {
      /*flex: 1;*/
      width: 100%;

      .item {
        height: 55px;
        display: flex;

        p {
          /*flex: 1;*/
          font-size: 15px;
        }

        p:nth-child(1) {
          width: 140px;
          padding-right: 30px;
          text-align: right;
        }
      }
    }
  }
}

.temp {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.active {
  display: inline-block;
  height: 22px;
  line-height: 22px;
  background: rgba(255, 242, 232, 1);
  border-radius: 4px;
  border: 1px solid rgba(255, 187, 150, 1);
  width: 50px;
  text-align: center;
}

.in {
  background: rgba(230, 247, 255, 1);
  border: 1px solid rgba(145, 213, 255, 1);
}
</style>

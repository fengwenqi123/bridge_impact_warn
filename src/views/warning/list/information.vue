<template>
  <div class="information">
    <div class="information-main">
      <el-scrollbar class="scrolls">
        <div class="main">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>预警信息</span>
            </div>
            <el-form v-if="form" :inline="true" class="form-inline" label-width="120px">
              <el-form-item label="中文船名">
                <el-input
                  v-model="form.zwShipName"
                  placeholder="请输入中文船名"
                  clearable
                />
              </el-form-item>
              <el-form-item label="船舶识别号">
                <el-input
                  placeholder="请输入船舶识别号"
                  clearable
                />
              </el-form-item>
              <el-form-item label="联系电话">
                <el-input
                  placeholder="请输入联系电话"
                  clearable
                />
              </el-form-item>
              <el-form-item label="预警时间">
                <el-input
                  v-model="form.addTimeString"
                  placeholder="请输入预警时间"
                  clearable
                />
              </el-form-item>
              <el-form-item label="预警地址">
                <el-input
                  placeholder="请输入预警地址"
                  clearable
                />
              </el-form-item>
              <el-form-item label="预警方式">
                <el-input
                  placeholder="请输入预警方式"
                  clearable
                />
              </el-form-item>
            </el-form>
          </el-card>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>视频轨迹</span>
            </div>
            <div class="con">
              <div class="video">
                <div class="title">视频回放</div>
                <div class="item">
                  <videoRtmp :url="videoUrl"></videoRtmp>
                </div>
              </div>
              <div class="gj">
                <div class="title">船舶航行轨迹</div>
                <div class="item">
                  <playBack :mmsi="form.mmsi"></playBack>
                </div>
              </div>
            </div>
          </el-card>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>信号</span>
            </div>
            <el-form :inline="true" class="form-inline" label-width="120px">
              <el-form-item label="信号接收时间">
                <el-input
                  v-model="shipName"
                  clearable
                />
              </el-form-item>
              <el-form-item label="经度">
                <el-input
                  v-model="shipName"
                  clearable
                />
              </el-form-item>
              <el-form-item label="纬度">
                <el-input
                  v-model="shipName"
                  clearable
                />
              </el-form-item>
              <el-form-item label="船舶信息">
                <el-input
                  v-model="shipName"
                  clearable
                />
              </el-form-item>
              <el-form-item label="速度">
                <el-input
                  v-model="shipName"
                  clearable
                />
              </el-form-item>
              <el-form-item label="航向">
                <el-input
                  v-model="shipName"
                  clearable
                />
              </el-form-item>
            </el-form>
          </el-card>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>船舶信息</span>
            </div>
            <el-form v-if="shipInfo" :inline="true" class="form-inline" label-width="120px">
              <el-form-item label="中文船名">
                <el-input
                  v-model="shipInfo.zwcm"
                  clearable
                />
              </el-form-item>
              <el-form-item label="曾用中文船名">
                <el-input
                  v-model="shipInfo.cyzwcm"
                  clearable
                />
              </el-form-item>
              <el-form-item label="船舶总长(米)">
                <el-input
                  v-model="shipInfo.cbzc"
                  clearable
                />
              </el-form-item>
              <el-form-item label="船舶识别号">
                <el-input
                  v-model="shipInfo.cbsbh"
                  clearable
                />
              </el-form-item>
              <el-form-item label="船籍港代码">
                <el-input
                  v-model="shipInfo.cjgdm"
                  clearable
                />
              </el-form-item>
              <el-form-item label="参考载重吨(吨)">
                <el-input
                  v-model="shipInfo.ckzzd"
                  clearable
                />
              </el-form-item>
              <el-form-item label="船舶种类代码">
                <el-input
                  v-model="shipInfo.cbzldm"
                  clearable
                />
              </el-form-item>
              <el-form-item label="船检登记号">
                <el-input
                  v-model="shipInfo.cjdjh"
                  clearable
                />
              </el-form-item>
              <el-form-item label="空载吃水(米)">
                <el-input
                  v-model="shipInfo.kzcs"
                  clearable
                />
              </el-form-item>
              <el-form-item label="满载吃水(米)">
                <el-input
                  v-model="shipInfo.mzcs"
                  clearable
                />
              </el-form-item>
              <el-form-item label="净吨位(吨)">
                <el-input
                  v-model="shipInfo.jdw"
                  clearable
                />
              </el-form-item>
              <el-form-item label="船舶型宽(米)">
                <el-input
                  v-model="shipInfo.cbxk"
                  clearable
                />
              </el-form-item>
              <el-form-item label="船舶型深(米)">
                <el-input
                  v-model="shipInfo.cbxs"
                  clearable
                />
              </el-form-item>
              <el-form-item label="牌簿号">
                <el-input
                  v-model="shipInfo.pbh"
                  clearable
                />
              </el-form-item>
              <el-form-item label="造船厂名称">
                <el-input
                  v-model="shipInfo.zccmc"
                  clearable
                />
              </el-form-item>
              <el-form-item label="造船厂地址">
                <el-input
                  v-model="shipInfo.glrdz"
                  clearable
                />
              </el-form-item>
            </el-form>
          </el-card>
        </div>
      </el-scrollbar>
    </div>
    <div slot="footer" class="information-foot" v-if="!readonly">
      <el-button
        icon="el-icon-document"
        size="small"
        class="blueButton"
        @click="submitForm('addForm')"
      >
        保存
      </el-button>
      <el-button
        icon="el-icon-refresh-left"
        size="small"
        class="whiteButton"
        @click="cancel"
      >
        返回
      </el-button>
    </div>
  </div>
</template>

<script>
import { add } from '@/api/DepManagement'
import dialogFormMixin from '@/mixins/dialogFormMixin'
import videoRtmp from '@/components/video/flv'
import playBack from '@/components/playBack/playBack'
import { getShipInfo, getShipSignal, getPaybackList, getRtmp } from '@/api/warning'

export default {
  mixins: [dialogFormMixin],
  components: {
    videoRtmp, playBack
  },
  props: {
    row: {
      type: Object,
      default () {
        return {}
      }
    },
    readonly: {
      type: Boolean
    }
  },
  data () {
    return {
      shipName: null,
      videoId: 'videoId1',
      form: null,
      shipInfo: null,
      ShipSignal: null,
      videoUrl: null
    }
  },
  created () {
    this.init()
  },

  methods: {
    init () {
      if (this.row) {
        this.form = JSON.parse(JSON.stringify(this.row))
        this.getShipInfoFun(this.form.mmsi)
        this.getShipSignalFun(this.form.mmsi)
        this.getPaybackListFun('0c21970f-e694-4bb8-a2dc-1b93049b421f')
        // this.getPaybackListFun(this.form.objid)
      }
    },
    // 船舶信息
    getShipInfoFun (mmsi) {
      getShipInfo(mmsi).then(response => {
        this.shipInfo = response.data[0]
      })
    },
    // 信号
    getShipSignalFun (mmsi) {
      getShipSignal(mmsi).then(response => {
        this.ShipSignal = response.data
      })
    },
    // 回放记录，然后查视频流数据
    getPaybackListFun (objId) {
      getPaybackList(objId).then(response => {
        this.getRtmpFun(response.data)
      })
    },
    getRtmpFun (list) {
      list.forEach(item => {
        getRtmp(item.webcamId, 'test').then(response => {
          this.videoUrl = response.data.url
        })
      })
    },
    // 表单操作
    submit () {
      add(this.form).then(response => {
        this.$message({
          message: response.msg,
          type: 'success'
        })
        this.$emit('submit')
      })
    },
    cancel () {
      this.$emit('cancel')
    }
  }

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.information {
  .information-main {
    height: 800px;

    .main {
      .box-card{
        margin-top: 20px;
      }
      .con {
        display: flex;
        align-content: flex-start;
        justify-content: space-between;

        .video {
          .item {
            width: 800px;
            height: 400px;
          }
        }

        .gj {
          .item {
            width: 800px;
            height: 400px;
          }
        }
      }
    }
  }
}
</style>

<template>
  <div class="information">
    <div class="information-main">
      <el-scrollbar class="scrolls">
        <div class="main">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>预警信息</span>
            </div>
            <el-form :inline="true" class="form-inline" label-width="120px">
              <el-form-item label="中文船名">
                <el-input
                  v-model="shipName"
                  placeholder="请输入中文船名"
                  clearable
                />
              </el-form-item>
              <el-form-item label="船舶识别号">
                <el-input
                  v-model="shipName"
                  placeholder="请输入船舶识别号"
                  clearable
                />
              </el-form-item>
              <el-form-item label="联系电话">
                <el-input
                  v-model="shipName"
                  placeholder="请输入联系电话"
                  clearable
                />
              </el-form-item>
              <el-form-item label="预警时间">
                <el-input
                  v-model="shipName"
                  placeholder="请输入预警时间"
                  clearable
                />
              </el-form-item>
              <el-form-item label="预警地址">
                <el-input
                  v-model="shipName"
                  placeholder="请输入预警地址"
                  clearable
                />
              </el-form-item>
              <el-form-item label="预警方式">
                <el-input
                  v-model="shipName"
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
                  <videoRtmp rtmp="http://10.100.70.228:9002/openUrl/8yxPRoA/live.m3u8" :id="videoId"></videoRtmp>
                </div>
              </div>
              <div class="gj">
                <div class="title">船舶航行轨迹</div>
                <div class="item">
                  <playBack></playBack>
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
            <el-form :inline="true" class="form-inline" label-width="120px">
              <el-form-item label="中文船名">
                <el-input
                  v-model="shipName"
                  clearable
                />
              </el-form-item>
              <el-form-item label="曾用中文船名">
                <el-input
                  v-model="shipName"
                  clearable
                />
              </el-form-item>
              <el-form-item label="船舶总长(米)">
                <el-input
                  v-model="shipName"
                  clearable
                />
              </el-form-item>
              <el-form-item label="船舶识别号">
                <el-input
                  v-model="shipName"
                  clearable
                />
              </el-form-item>
              <el-form-item label="船籍港代码">
                <el-input
                  v-model="shipName"
                  clearable
                />
              </el-form-item>
              <el-form-item label="参考载重吨(吨)">
                <el-input
                  v-model="shipName"
                  clearable
                />
              </el-form-item>
              <el-form-item label="船舶种类代码">
                <el-input
                  v-model="shipName"
                  clearable
                />
              </el-form-item>
              <el-form-item label="船检登记号">
                <el-input
                  v-model="shipName"
                  clearable
                />
              </el-form-item>
              <el-form-item label="空载吃水(米)">
                <el-input
                  v-model="shipName"
                  clearable
                />
              </el-form-item>
              <el-form-item label="满载吃水(米)">
                <el-input
                  v-model="shipName"
                  clearable
                />
              </el-form-item>
              <el-form-item label="净吨位(吨)">
                <el-input
                  v-model="shipName"
                  clearable
                />
              </el-form-item>
              <el-form-item label="船舶型宽(米)">
                <el-input
                  v-model="shipName"
                  clearable
                />
              </el-form-item>
              <el-form-item label="船舶型深(米)">
                <el-input
                  v-model="shipName"
                  clearable
                />
              </el-form-item>
              <el-form-item label="牌簿号">
                <el-input
                  v-model="shipName"
                  clearable
                />
              </el-form-item>
              <el-form-item label="造船厂名称">
                <el-input
                  v-model="shipName"
                  clearable
                />
              </el-form-item>
              <el-form-item label="造船厂地址">
                <el-input
                  v-model="shipName"
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
import { add, findDep } from '@/api/DepManagement'
import dialogFormMixin from '@/mixins/dialogFormMixin'
import videoRtmp from '@/components/video'
import playBack from '@/components/playBack/playBack'

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
      videoId: 'videoId1'
    }
  },
  created () {
    this.init()
    this.findAuth()
  },

  methods: {
    init () {
      if (this.row) {
        this.form = JSON.parse(JSON.stringify(this.row))
      }
    },
    // 数据操作
    findAuth () {
      findDep().then(response => {
        if (response.code === 200) {
          this.data2 = response.data.dataList
          if (this.form.id) {
            this.data2.forEach((item, index) => {
              if (this.form.layer.length === 3) {
                if (this.form.layer === item.layer) {
                  this.parent = item.name
                }
              } else {
                var leng = this.form.layer.substr(0, this.form.layer.length - 3)
                var list = response.data.dataList
                list.forEach((item, index) => {
                  if (leng === item.layer) {
                    this.parent = item.name
                  }
                })
              }
            })
          }
        }
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
            height: 600px;
          }
        }

        .gj {
          .item {
            width: 800px;
            height: 600px;
          }
        }
      }
    }
  }
}
</style>

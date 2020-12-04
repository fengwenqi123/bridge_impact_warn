<template>
  <div class="information">
    <div class="information-main">
      <el-scrollbar class="scrolls">
        <div class="information-form">
          <el-form ref="addForm" :inline="true" :model="form" status-icon :rules="rules" label-position="right"
                   label-width="180px">
            <el-form-item label="视频名称:">
              <el-input
                :readonly="readonly"
                :placeholder="havePlaceholder('请输入视频名称')"
                clearable
                v-model="form.videoName"
              />
            </el-form-item>
            <el-form-item label="区域位置">
              <el-button type="primary" size="mini" @click.native="modgis()">绘制区域</el-button>
              <p v-if="form.longitude" style="display: inline-block;">
                <span>{{ form.longitude }}</span>,
                <span>{{ form.latitude }}</span>
              </p>
            </el-form-item>
            <el-form-item label="视频类型:">
              <el-select v-model="form.videoType" clearable :placeholder="havePlaceholder('请选择')">
                <el-option
                  v-for="item in videoList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="设备编号:">
              <el-input
                :readonly="readonly"
                :placeholder="havePlaceholder('请输入设备编号')"
                clearable
                v-model="form.equipmentNumber"
              />
            </el-form-item>
            <el-form-item label="IP地址:">
              <el-input
                :readonly="readonly"
                :placeholder="havePlaceholder('请输入IP地址')"
                clearable
                v-model="form.ipAddress"
              />
            </el-form-item>
            <el-form-item label="端口号:">
              <el-input
                :readonly="readonly"
                :placeholder="havePlaceholder('请输入端口号')"
                clearable
                v-model="form.porte"
              />
            </el-form-item>
            <el-form-item label="通道号:">
              <el-input
                :readonly="readonly"
                :placeholder="havePlaceholder('请输入通道号')"
                clearable
                v-model="form.aisleNumber"
              />
            </el-form-item>
            <el-form-item label="用户名:">
              <el-input
                :readonly="readonly"
                :placeholder="havePlaceholder('请输入用户名')"
                clearable
                v-model="form.userName"
              />
            </el-form-item>
            <el-form-item label="密码:">
              <el-input
                :readonly="readonly"
                :placeholder="havePlaceholder('请输入密码')"
                clearable
                v-model="form.password"
              />
            </el-form-item>
            <el-form-item label="直播方式:">
              <el-select
                v-model="form.playType"
                clearable
                :placeholder="havePlaceholder('请选择')">
                <el-option
                  v-for="item in playList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="h5地址:">
              <el-input
                :readonly="readonly"
                :placeholder="havePlaceholder('请输入h5地址')"
                clearable
                v-model="form.h5Address"
              />
            </el-form-item>
            <el-form-item label="rtmp地址:">
              <el-input
                :readonly="readonly"
                :placeholder="havePlaceholder('请输入rtmp地址')"
                clearable
                v-model="form.rtmpSite"
              />
            </el-form-item>
            <el-form-item label="hls地址:">
              <el-input
                :readonly="readonly"
                :placeholder="havePlaceholder('请输入hls地址')"
                clearable
                v-model="form.hisAddress"
              />
            </el-form-item>
            <el-form-item label="接口服务器根地址:">
              <el-input
                :readonly="readonly"
                :placeholder="havePlaceholder('请输入接口服务器根地址')"
                clearable
                v-model="form.serveInterfaceAddress"
              />
            </el-form-item>
            <el-form-item label="回放类型:">
              <el-select v-model="form.playbackType" clearable
                         :placeholder="havePlaceholder('请选择')">
                <el-option
                  v-for="item in playBackList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="回放流名称:">
              <el-input
                :readonly="readonly"
                :placeholder="havePlaceholder('请输入回放流名称')"
                clearable
                v-model="form.playbackName"
              />
            </el-form-item>
            <el-form-item label="回放频道:">
              <el-input
                :readonly="readonly"
                :placeholder="havePlaceholder('请输入回放频道')"
                clearable
                v-model="form.playbackChannel"
              />
            </el-form-item>
            <el-form-item label="回放超时:">
              <el-input
                :readonly="readonly"
                :placeholder="havePlaceholder('请输入回放超时')"
                clearable
                v-model="form.playbackOvertime"
              />
            </el-form-item>
          </el-form>
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
    <el-dialog title="地图坐标" :visible.sync="dialogTableVisible" append-to-body>
      <areas :url="url"></areas>
    </el-dialog>
  </div>
</template>

<script>
import { add } from '@/api/videoManagement'
import dialogFormMixin from '@/mixins/dialogFormMixin'
import areas from '@/components/iframe/area'

export default {
  mixins: [dialogFormMixin],
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
  components: {
    areas
  },
  data () {
    return {
      // 表单内容
      dialogTableVisible: false,
      url: null,
      form: {
        ipAddress: null,
        porte: null,
        aisleNumber: null,
        userName: null,
        password: null,
        videoName: null,
        videoType: null,
        h5Address: null,
        rtmpSite: null,
        hisAddress: null,
        serveInterfaceAddress: null,
        playbackType: null,
        longitude: null,
        latitude: null,
        playType: null,
        playbackName: null,
        playbackChannel: null,
        playbackOvertime: null,
        equipmentNumber: null
      },
      // 表单验证
      rules: {},
      videoList: [{
        value: '枪机',
        label: '枪机'
      }, {
        value: '球机',
        label: '球机'
      }],
      playBackList: [{
        value: '录播回放',
        label: '录播回放'
      }],
      playList: [{
        value: 'flv',
        label: 'flv'
      }]
    }
  },
  created () {
    this.init()
  },
  mounted () {
    this.getgis()
  },
  methods: {
    havePlaceholder (string) {
      return this.readonly ? '' : string
    },
    init () {
      if (this.row) {
        this.form = JSON.parse(JSON.stringify(this.row))
      }
    },
    // 表单操作
    submit () {
      add({
        id: this.form.id,
        ipAddress: this.form.ipAddress,
        porte: this.form.porte,
        aisleNumber: this.form.aisleNumber,
        userName: this.form.userName,
        password: this.form.password,
        videoName: this.form.videoName,
        videoType: this.form.videoType,
        h5Address: this.form.h5Address,
        rtmpSite: this.form.rtmpSite,
        hisAddress: this.form.hisAddress,
        serveInterfaceAddress: this.form.serveInterfaceAddress,
        playbackType: this.form.playbackType,
        longitude: this.form.longitude,
        playType: this.form.playType,
        playbackName: this.form.playbackName,
        playbackChannel: this.form.playbackChannel,
        playbackOvertime: this.form.playbackOvertime,
        equipmentNumber: this.form.equipmentNumber,
        latitude: this.form.latitude
      }).then(response => {
        this.$message({
          message: response.msg,
          type: 'success'
        })
        this.$emit('submit')
      })
    },
    cancel () {
      this.$emit('cancel')
    },
    // 定位
    modgis () {
      if (this.form.longitude) {
        this.url = '/static/coor/coorMap.html?type=Point&precoor=' + this.form.longitude + ',' + this.form.latitude
      } else {
        this.url = '/static/coor/coorMap.html?type=Point&precoor=nocoor'
      }
      this.dialogTableVisible = true
    },
    getgis () {
      var _this = this
      window.addEventListener('message', function (e) {
        if (e.data.act === 'modgis') {
          _this.form.longitude = e.data.msg.coordinate[0]
          _this.form.latitude = e.data.msg.coordinate[1]
        }
      }, false)
    }
  }

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>

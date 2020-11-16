<template>
  <div class="information">
    <div class="information-main">
      <el-scrollbar class="scrolls">
        <div class="information-form">
          <el-form ref="addForm" :inline="true" :model="form" status-icon :rules="rules" label-position="right"
                   label-width="180px">
            <el-form-item label="IP地址:">
              <el-input
                :readonly="readonly"
                placeholder="请输入IP地址"
                clearable
                v-model="form.ipAddress"
              />
            </el-form-item>
            <el-form-item label="端口号:">
              <el-input
                :readonly="readonly"
                placeholder="请输入端口号"
                clearable
                v-model="form.porte"
              />
            </el-form-item>
            <el-form-item label="通道号:">
              <el-input
                :readonly="readonly"
                placeholder="请输入通道号"
                clearable
                v-model="form.aisleNumber"
              />
            </el-form-item>
            <el-form-item label="用户名:">
              <el-input
                :readonly="readonly"
                placeholder="请输入用户名"
                clearable
                v-model="form.userName"
              />
            </el-form-item>
            <el-form-item label="密码:">
              <el-input
                :readonly="readonly"
                placeholder="请输入密码"
                clearable
                v-model="form.password"
              />
            </el-form-item>
            <el-form-item label="名称:">
              <el-input
                :readonly="readonly"
                placeholder="请输入名称"
                clearable
                v-model="form.videoName"
              />
            </el-form-item>
            <el-form-item label="视频类型:">
              <el-input
                :readonly="readonly"
                placeholder="请输入视频类型"
                clearable
                v-model="form.videoType"
              />
            </el-form-item>
            <el-form-item label="h5地址:">
              <el-input
                :readonly="readonly"
                placeholder="请输入h5地址"
                clearable
                v-model="form.h5Address"
              />
            </el-form-item>
            <el-form-item label="rtmp地址:">
              <el-input
                :readonly="readonly"
                    placeholder="请输入rtmp地址"
                clearable
                v-model="form.rtmpSite"
              />
            </el-form-item>
            <el-form-item label="hls地址:">
              <el-input
                :readonly="readonly"
                placeholder="请输入hls地址"
                clearable
                v-model="form.hisAddress"
              />
            </el-form-item>
            <el-form-item label="接口服务器根地址:">
              <el-input
                :readonly="readonly"
                placeholder="请输入接口服务器根地址"
                clearable
                v-model="form.serveInterfaceAddress"
              />
            </el-form-item>
            <el-form-item label="回放类型:">
              <el-input
                :readonly="readonly"
                placeholder="请输入回放类型"
                clearable
                v-model="form.playbackType"
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
  </div>
</template>

<script>
import { add } from '@/api/videoManagement'
import dialogFormMixin from '@/mixins/dialogFormMixin'

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
  data () {
    return {
      // 表单内容
      form: {
        id: null,
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
        playbackType: null
      },
      // 表单验证
      rules: {}
    }
  },
  created () {
    this.init()
  },

  methods: {
    init () {
      if (this.row) {
        this.form = JSON.parse(JSON.stringify(this.row))
      }
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

</style>

<template>
  <div class="information">
    <div class="information-main">
      <el-scrollbar class="scrolls">
        <div class="information-form">
          <el-form ref="addForm" :model="form" status-icon :rules="rules" label-position="right" label-width="180px">
            <!--            <el-form-item label="用户姓名:">-->
            <!--              <el-input-->
            <!--                :readonly="readonly"-->
            <!--                :placeholder="havePlaceholder('请输入用户姓名')"-->
            <!--                clearable-->
            <!--                v-model="form.userName"-->
            <!--              />-->
            <!--            </el-form-item>-->
            <el-form-item label="预警类型:">
              <el-select v-model="form.warningType" disabled :placeholder="havePlaceholder('请选择')">
                <el-option v-for="item in warningTypeList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="录音内容:">
              <el-input type="textarea" :readonly="readonly" :rows="6" :placeholder="havePlaceholder('请输入录音内容')" v-model="form.gravacaoCondeudo">
              </el-input>
            </el-form-item>
            <el-form-item label="短信内容:">
              <div class="message">
                <div>预警来自xxx桥梁</div>
                <div>xx所属船户请注意，您的船舶<el-input v-model="form.status"></el-input>！请立即<el-input v-model="form.handle"></el-input>
                </div>
                <div>说明<el-input v-model="form.remark"></el-input>,预警时间：{{time}}</div>
              </div>
            </el-form-item>
            <!--            <el-form-item label="启用状态:">-->
            <!--              <el-radio v-model="form.start" :readonly="readonly" label="2">启用</el-radio>-->
            <!--              <el-radio v-model="form.start" :readonly="readonly" label="1">禁用</el-radio>-->
            <!--            </el-form-item>-->
            <el-form-item label="预警方式:">
              <el-checkbox-group v-model="form.warningMethod">
                <el-checkbox label="高音喇叭"></el-checkbox>
                <el-checkbox label="VHF语音播报"></el-checkbox>
                <el-checkbox label="船佳宝"></el-checkbox>
                <!-- <el-checkbox label="拨打电话"></el-checkbox> -->
                <el-checkbox label="E航运"></el-checkbox>
                <el-checkbox label="短信通知"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </div>
      </el-scrollbar>
    </div>
    <div slot="footer" class="information-foot" v-if="!readonly">
      <el-button icon="el-icon-document" size="small" class="blueButton" @click="submitForm('addForm')">
        保存
      </el-button>
      <el-button icon="el-icon-refresh-left" size="small" class="whiteButton" @click="cancel">
        返回
      </el-button>
    </div>
  </div>
</template>

<script>
import { add } from '@/api/yawWarning'
import dialogFormMixin from '@/mixins/dialogFormMixin'
import { timeToString } from '@/utils/index'

export default {
  mixins: [dialogFormMixin],
  props: {
    row: {
      type: Object,
      default() {
        return {}
      }
    },
    readonly: {
      type: Boolean
    }
  },
  data() {
    return {
      time: timeToString(new Date().getTime()),
      // 表单内容
      form: {
        id: null,
        userName: null,
        warningType: null,
        gravacaoCondeudo: null,
        start: null,
        status: null,
        handle: null,
        remark: null,
        warningMethod: []
      },
      // 表单验证
      rules: {},
      warningTypeList: [{
        value: '1',
        label: '预警警告（一级)'
      }, {
        value: '2',
        label: '紧急警告（二级)'
      }, {
        value: '3',
        label: '危急警告（三级)'
      }, {
        value: '4',
        label: '碰撞警告（四级)'
      }]
    }
  },
  created() {
    this.init()
  },

  methods: {
    havePlaceholder(string) {
      return this.readonly ? '' : string
    },
    init() {
      if (this.row) {
        this.form = JSON.parse(JSON.stringify(this.row))
        if (this.form.warningMethod) {
          this.form.warningMethod = this.form.warningMethod.split(',')
        } else {
          this.form.warningMethod = []
        }
      }
    },
    // 表单操作
    submit() {
      delete this.form.addTimeString
      delete this.form.deleted
      delete this.form.modifyTime
      delete this.form.modifyTimeString
      delete this.form.addTime
      this.form.broadcast = (this.form.warningMethod.indexOf('高音喇叭') > -1) ? 1 : 0
      this.form.vhfBroadcast = (this.form.warningMethod.indexOf('VHF语音播报') > -1) ? 1 : 0
      this.form.cjbPush = (this.form.warningMethod.indexOf('船佳宝') > -1) ? 1 : 0
      this.form.notePush = (this.form.warningMethod.indexOf('短信通知') > -1) ? 1 : 0
      this.form.ehyPush = (this.form.warningMethod.indexOf('E航运') > -1) ? 1 : 0
      if (typeof this.form.warningMethod === 'object') {
        this.form.warningMethod = this.form.warningMethod.join(',')
      }
      add(this.form).then(response => {
        this.$message({
          message: response.msg,
          type: 'success'
        })
        this.$emit('submit')
      })
    },
    cancel() {
      this.$emit('cancel')
    }
  }

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>

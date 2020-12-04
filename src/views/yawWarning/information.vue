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
                <el-option
                  v-for="item in warningTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="录音内容:">
              <el-input
                type="textarea"
                :readonly="readonly"
                :rows="6"
                :placeholder="havePlaceholder('请输入录音内容')"
                v-model="form.gravacaoCondeudo">
              </el-input>
            </el-form-item>
            <!--            <el-form-item label="启用状态:">-->
            <!--              <el-radio v-model="form.start" :readonly="readonly" label="2">启用</el-radio>-->
            <!--              <el-radio v-model="form.start" :readonly="readonly" label="1">禁用</el-radio>-->
            <!--            </el-form-item>-->
            <el-form-item label="预警方式:">
              <el-checkbox-group v-model="form.warningMethod">
                <el-checkbox label="广播呼叫"></el-checkbox>
                <el-checkbox label="VHF语音播报"></el-checkbox>
                <el-checkbox label="APP信息推送"></el-checkbox>
                <el-checkbox label="拨打电话"></el-checkbox>
                <el-checkbox label="发送短信"></el-checkbox>
                <el-checkbox label="船载终端信息推送"></el-checkbox>
              </el-checkbox-group>
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
import { add } from '@/api/yawWarning'
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
        userName: null,
        warningType: null,
        gravacaoCondeudo: null,
        start: null,
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
  created () {
    this.init()
  },

  methods: {
    havePlaceholder (string) {
      return this.readonly ? '' : string
    },
    init () {
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
    submit () {
      delete this.form.addTimeString
      delete this.form.deleted
      delete this.form.modifyTime
      delete this.form.modifyTimeString
      delete this.form.addTime
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
    cancel () {
      this.$emit('cancel')
    }
  }

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>

<template>
  <div class="information">
    <div class="information-main">
      <el-scrollbar class="scrolls">
        <div class="information-form">
          <el-form ref="addForm" :model="form" status-icon :rules="rules" label-position="right" label-width="180px">
            <el-form-item label="分类:" prop="classification">
              <el-input
                v-model="form.classification"
                placeholder="请输入分类"
                :readonly="readonly"
                clearable
              />
            </el-form-item>
            <el-form-item label="项目名称:" prop="itemName">
              <el-input
                v-model="form.itemName"
                :readonly="readonly"
                placeholder="请输入项目名称"
                clearable
              />
            </el-form-item>
            <el-form-item label="项目值:" prop="itemValue">
              <el-input
                v-model="form.itemValue"
                :readonly="readonly"
                placeholder="请输入项目值"
                clearable
              />
            </el-form-item>
            <el-form-item label="排序:" prop="sort">
              <el-input
                v-model="form.sort"
                :readonly="readonly"
                type="textarea"
                :rows="6"
                placeholder="请输入备注"
              />
            </el-form-item>
            <el-form-item label="类型:" prop="type">
              <el-radio v-model="form.type" label="1" :readonly="readonly">系统</el-radio>
              <el-radio v-model="form.type" label="2" :readonly="readonly">自定义</el-radio>
            </el-form-item>
            <el-form-item label="状态:" prop="status">
              <el-radio v-model="form.status" label="1" :readonly="readonly">启用</el-radio>
              <el-radio v-model="form.status" label="2" :readonly="readonly">禁用</el-radio>
            </el-form-item>
          </el-form>
        </div>
      </el-scrollbar>
    </div>
    <div slot="footer" class="information-foot"  v-if="!readonly">
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
import { add } from '@/api/DicManagement'
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
      disabled: false,
      authArr: [],
      sourceData: null,
      showButton: true,
      // 表单内容
      form: {
        id: null,
        classification: null,
        itemName: null,
        itemValue: null,
        sort: null,
        description: null,
        status: '1',
        type: '1'
      },
      // 表单验证
      rules: {
        classification: [{ required: true, message: '请输入分类', trigger: 'blur' }],
        itemName: [{ required: true, message: '请输入项目名称', trigger: 'blur' }],
        itemValue: [{ required: true, message: '请输入项目值', trigger: 'blur' }]
      }
    }
  },
  created () {
    this.init()
  },

  methods: {
    init () {
      if (this.row) {
        this.form = JSON.parse(JSON.stringify(this.row))
        this.form.status = this.form.status.toString()
        this.form.type = this.form.type.toString()
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

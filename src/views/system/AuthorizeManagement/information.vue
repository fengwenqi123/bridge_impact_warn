<template>
  <div class="information">
    <div class="information-main">
      <el-scrollbar class="scrolls">
        <div class="information-form">
          <el-form ref="addForm" :model="form" status-icon :rules="rules" label-position="right" label-width="180px">
            <el-form-item label="上级权限:" prop="supAuth">
              <el-input v-if="form.id" v-model="parent" disabled />
              <el-select v-if="!form.id" filterable clearable v-model="form.supLayer" placeholder="请选择">
                <el-option
                  v-for="(item,index) in authArr"
                  :key="index"
                  :label="item.name"
                  :value="item.layer"
                  :style="{ paddingLeft : (item.layer.length-2) * 10 + 'px' }"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="权限名称:" prop="name">
              <el-input v-model="form.name" :readonly="readonly" placeholder="请输入权限名称" clearable />
            </el-form-item>
            <el-form-item label="权限值:" prop="actionValue">
              <el-input v-model="form.actionValue" :readonly="readonly" placeholder="请输入权限值" clearable />
            </el-form-item>
            <el-form-item label="排序:" prop="sort">
              <el-input v-model="form.sort" :readonly="readonly" placeholder="请输入排序" clearable />
            </el-form-item>
            <el-form-item label="备注:" prop="description">
              <el-input v-model="form.description" :readonly="readonly" type="textarea" :rows="6" placeholder="请输入备注" />
            </el-form-item>
            <el-form-item label="状态:" prop="status">
              <el-radio v-model="form.status" :readonly="readonly" label="1">启用</el-radio>
              <el-radio v-model="form.status" :readonly="readonly" label="2">禁用</el-radio>
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

import { findAuthorize, add } from '@/api/AuthorizeManagement'
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
      parent: null,
      disabled: false,
      authArr: [],
      // 表单内容
      form: {
        id: null,
        supLayer: null,
        name: null,
        actionValue: null,
        sort: null,
        description: null,
        status: '1'
      },
      // 表单验证
      rules: {
        name: [{ required: true, message: '请输入权限名称', trigger: 'blur' }],
        actionValue: [
          { required: true, message: '请输入权限值', trigger: 'blur' }
        ],
        sort: [{ required: true, message: '请输入排序', trigger: 'blur' }]
      }
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
        this.form.status = this.form.status.toString()
      }
    },
    // 数据操作
    findAuth () {
      findAuthorize().then(response => {
        this.authArr = response.data.dataList
        if (this.form.id) {
          if (this.form.layer.length < 4) {
            this.parent = this.form.name
          } else {
            var leng = this.form.layer.substr(0, this.form.layer.length - 3)
            var list = response.data.dataList
            list.forEach((item, index) => {
              if (leng === item.layer) {
                this.parent = item.name
              }
            })
          }
        }
      })
    },
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
  .active {
    background: #67c23a;
    color: #fff;
  }
</style>

<template>
  <div class="information">
    <div class="information-main">
      <el-scrollbar class="scrolls">
        <div class="information-form">
          <el-form ref="addForm" :model="form" status-icon :rules="rules" label-position="right" label-width="180px">
            <el-form-item label="添加权限:">
              <el-tree
                ref="tree"
                :data="data2"
                :show-checkbox="flag"
                node-key="id"
                highlight-current
                :props="defaultProps"
              />
            </el-form-item>
            <el-form-item label="名称:" prop="name">
              <el-input
                v-model="form.name"
                :readonly="readonly"
                placeholder="请输入名称"
                clearable
              />
            </el-form-item>
            <el-form-item label="备注:" prop="description">
              <el-input
                v-model="form.description"
                :readonly="readonly"
                type="textarea"
                :rows="6"
                placeholder="请输入备注"
              />
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
import { listToTree } from '@/utils/index.js'
import { findRole, add, findRoleById } from '@/api/RoleManagement'

export default {
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
      flag: true,
      data2: [],
      disabled: false,
      authArr: [],
      sourceData: null,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      Jurisdiction: [],
      // 表单内容
      form: {
        id: null,
        name: null,
        description: null,
        status: '1',
        authorizeIds: null
      },
      // 表单验证
      rules: {
        name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }]
      }
    }
  },
  created () {
    this.init()
    this.getAll()
  },
  methods: {
    init () {
      if (this.row) {
        this.form = JSON.parse(JSON.stringify(this.row))
        this.form.status = this.form.status.toString()
      }
    },
    // 数据操作
    getAll () { // 查看所有权限
      findRole().then(response => {
        var list = response.data
        list.forEach((item, index) => {
          item.disabled = this.disabled
        })
        this.data2 = listToTree('id', 'layer', list)
        if (this.form.id) {
          this.findRoleByIds()
        }
      })
    },
    findRoleByIds () { // 根据角色id获取权限
      findRoleById(this.form.id).then(response => {
        this.Jurisdiction = response.data
        this.$refs.tree.setCheckedNodes(this.Jurisdiction)
      })
    },
    // 表单操作
    submitForm (formName) {
      this.form.authorizeIds = this.$refs.tree.getCheckedKeys().join(',')
      this.$refs[formName].validate((valid) => {
        if (valid) {
          add(this.form).then(response => {
            this.$message({
              message: response.msg,
              type: 'success'
            })
            this.submit()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    submit () {
      this.$emit('submit')
    },
    cancel () {
      this.$emit('cancel')
    }
  }

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>

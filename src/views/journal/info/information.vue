<template>
  <div class="information">
    <div class="information-main">
      <el-scrollbar class="scrolls">
        <div class="information-form">
          <el-form ref="addForm" :model="form" status-icon :rules="rules" label-position="right" label-width="180px">
            <el-form-item label="归属:" prop="supLayer">
              <el-input v-if="form.id" v-model="parent" disabled />
              <el-select v-if="!form.id" filterable clearable v-model="form.supLayer" placeholder="请选择">
                <el-option
                  v-for="(item,index) in data2"
                  :key="index"
                  :label="item.name"
                  :value="item.layer"
                  :style="{ paddingLeft : (item.layer.length-2) * 10 + 'px' }"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="部门名称:" prop="name">
              <el-input
                v-model="form.name"
                placeholder="请输入部门名称"
                :readonly="readonly"
                clearable
              />
            </el-form-item>
            <el-form-item label="部门编号:" prop="code">
              <el-input
                v-model="form.code"
                :readonly="readonly"
                placeholder="请输入部门编号"
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
import { add, findDep } from '@/api/DepManagement'
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
      selected: null,
      parent: null,
      disabled: false,
      data2: [],
      authArr: [],
      sourceData: null,
      showButton: true,
      // 表单内容
      form: {
        id: null,
        supLayer: null,
        name: null,
        code: null,
        description: null
      },
      // 表单验证
      rules: {
        name: [{ required: true, message: '请输入部门名称', trigger: 'blur' }]
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

</style>

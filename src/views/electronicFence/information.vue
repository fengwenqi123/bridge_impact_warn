<template>
  <div class="information">
    <div class="information-main">
      <el-scrollbar class="scrolls">
        <div class="information-form">
          <el-form ref="addForm" :model="form" status-icon :rules="rules" label-position="right" label-width="180px">
            <el-form-item label="围栏名称:" prop="cereaName">
              <el-input :readonly="readonly" :placeholder="havePlaceholder('请输入围栏名称')" clearable v-model="form.cereaName" />
            </el-form-item>
            <el-form-item label="启用状态:">
              <el-radio v-model="form.initiateState" label="1">启用</el-radio>
              <el-radio v-model="form.initiateState" label="2">禁用</el-radio>
            </el-form-item>
            <el-form-item label="归属部门:">
              <el-select v-model="form.deptId" clearable filterable :placeholder="havePlaceholder('请选择')">
                <el-option v-for="(item,index) in departmentList" :key="index" :label="item.name" :style="{ paddingLeft : (item.layer.length-2) * 10 + 'px' }" :value="item.id" />
              </el-select>
            </el-form-item>
            <el-form-item label="围栏编号:" prop="serialNumber">
              <el-input :readonly="readonly" :placeholder="havePlaceholder('请输入围栏编号')" v-model="form.serialNumber" clearable />
            </el-form-item>
            <el-form-item label="预警类型:">
              <el-select v-model="form.areaType" clearable :placeholder="havePlaceholder('请选择')">
                <el-option v-for="item in warningTypeList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="围栏坐标:" prop="cereaCoordinates">
              <el-input :readonly="readonly" :placeholder="havePlaceholder('请输入围栏坐标')" v-model="form.cereaCoordinates" clearable />
              <svg-icon icon-class="dingwei" @click.native="coor()" style="cursor: pointer; font-size: 15px;"></svg-icon>
            </el-form-item>
            <el-form-item label="备注:">
              <el-input type="textarea" :rows="6" :placeholder="havePlaceholder('请输入内容')" v-model="form.remark">
              </el-input>
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
    <el-dialog title="地图坐标" :visible.sync="dialogTableVisible" append-to-body>
      <areas :url="url"></areas>
    </el-dialog>
  </div>
</template>

<script>
import { findDepartmentsByPersonnel } from '@/api/DepManagement'
import dialogFormMixin from '@/mixins/dialogFormMixin'
import { add } from '@/api/electronicFence'
import areas from './area'

export default {
  mixins: [dialogFormMixin],
  components: {
    areas
  },
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
      // 表单内容
      departmentList: [],
      dialogTableVisible: false,
      form: {
        cereaName: null,
        initiateState: null,
        remark: null,
        deptId: null,
        deptName: null,
        cereaCoordinates: null,
        serialNumber: null,
        areaType: null
      },
      url: null,
      rules: {
        cereaName: [{ required: true, message: '请输入围栏名称', trigger: 'blur' }],
        serialNumber: [{ required: true, message: '请输入围栏编号', trigger: 'blur' }],
        cereaCoordinates: [{ required: true, message: '请选择围栏坐标', trigger: 'blur' }]
      },
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
    this.findAuth()
  },
  mounted() {
    this.getCoor()
  },
  methods: {
    havePlaceholder(string) {
      return this.readonly ? '' : string
    },
    init() {
      if (this.row) {
        this.form = JSON.parse(JSON.stringify(this.row))
      }
    },
    // 表单操作
    submit() {
      this.departmentList.forEach(item => {
        if (item.id === this.form.deptId) {
          this.form.deptName = item.name
        }
      })
      add({
        id: this.form.id,
        initiateState: this.form.initiateState,
        cereaName: this.form.cereaName,
        deptId: this.form.deptId,
        deptName: this.form.deptName,
        cereaCoordinates: this.form.cereaCoordinates,
        remark: this.form.remark,
        areaType: this.form.areaType,
        serialNumber: this.form.serialNumber
      }).then(response => {
        this.$message({
          message: response.msg,
          type: 'success'
        })
        this.$emit('submit')
      })
    },
    cancel() {
      this.$emit('cancel')
    },
    findAuth() {
      var id = this.$store.state.user.userInfo.id
      findDepartmentsByPersonnel(id).then(response => {
        this.departmentList = response.data
      })
    },
    // 定位
    coor() {
      this.dialogTableVisible = true
      if (this.form.cereaCoordinates) {
        this.url = `/static/coor/coorMap.html?type=Polygon&precoor=${this.form.cereaCoordinates.toString()}`
      } else {
        this.url = '/static/coor/coorMap.html?type=Polygon&precoor=nocoor'
      }
    },
    getCoor() {
      var _this = this
      window.addEventListener('message', function(e) {
        if (e.data.act === 'coor') {
          _this.form.cereaCoordinates = e.data.msg.name
        }
      }, false)
    }
  }

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>

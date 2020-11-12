<template>
  <div class="common-table">
    <div class="title">
      <title-header/>
    </div>
    <el-card class="content">
      <div class="search">
        <el-form :inline="true" class="form-inline" label-width="120px">
          <el-form-item label="围栏名称">
            <el-input
              v-model="cercaName"
              placeholder="请输入围栏名称"
              clearable
            />
          </el-form-item>
          <el-form-item label="启用状态">
            <el-select v-model="active" clearable placeholder="请选择">
              <el-option
                v-for="item in activeList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="归属部门">
            <el-select
              v-model="department"
              clearable
              filterable
              placeholder="请选择"
            >
              <el-option
                v-for="(item,index) in departmentList"
                :key="index"
                :label="item.name"
                :style="{ paddingLeft : (item.layer.length-2) * 10 + 'px' }"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="small" class="blueButton" @click="search">查询
            </el-button>
          </el-form-item>
        </el-form>
        <div class="table_search_buttonLeft">
          <el-button type="primary" icon="el-icon-circle-plus" size="small" class="blueButton" @click="add">添加
          </el-button>
        </div>
      </div>
      <div class="table">
        <el-table
          ref="multipleTable"
          :height="tableHeight"
          stripe
          border
          :data="tableData"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55"
          />
          <el-table-column
            prop="Id"
            label="序号"
            width="80"
          >
            <template slot-scope="scope">
              <span>{{ scope.$index+(page.pageNum - 1) * page.pageSize+1 }} </span>
            </template>
          </el-table-column>
          <el-table-column
            label="围栏名称"
            prop="cereaName">
          </el-table-column>
          <el-table-column
            label="启用状态">
            <template slot-scope="scope">
              <div>{{scope.row.initiateState==='1'?'启用':scope.row.initiateState==='2'?'禁用':''}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="affiliationDepartment"
            label="归属部门"
          />
          <el-table-column
            label="操作"
            fixed="right"
            width="220"
          >
            <template slot-scope="scope">
              <el-button-group>
                <div class="operation">
                  <el-button class="table_button" icon="el-icon-search" size="small" type="text"
                             @click="handleClickInfo(scope.row)">查看
                  </el-button>
                  <el-button class="table_button" icon="el-icon-edit-outline" size="small" type="text"
                             @click="handleClickModify(scope.row)">编辑
                  </el-button>
                </div>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="bottom">
        <div class="option">
          <el-checkbox
            v-model="checked"
            @change="toggleSelection(checked)"
          >全选
          </el-checkbox>
          <el-button
            class="whiteButton"
            icon="el-icon-delete"
            size="small"
            @click="del"
          >
            批量删除
          </el-button>
          <span class="checkNum">已选择{{ selectData.length }}项</span>
        </div>
        <div class="pagination">
          <pagination
            v-show="page.total>0"
            :limit.sync="page.pageSize"
            :page.sync="page.pageNum"
            :total="page.total"
            @pagination="list"
          />
        </div>
      </div>
    </el-card>
    <el-dialog v-el-drag-dialog :title="title" :visible.sync="addDialog" :before-close="handleClose" top="6vh">
      <information v-if="addDialog" :row="row" :readonly="readonly" @cancel="cancel" @submit="submit"/>
    </el-dialog>
  </div>
</template>

<script>
import titleHeader from '@/components/title/index'
import { lists, delt } from '@/api/electronicFence'
import information from './information'
import Pagination from '@/components/Paginations'
import elDragDialog from '@/directive/el-drag-dialog'
import tableMixin from '@/mixins/tableMixin'
import { findDepartmentsByPersonnel } from '@/api/DepManagement'

export default {
  components: {
    titleHeader,
    information,
    Pagination
  },
  directives: { elDragDialog },
  mixins: [tableMixin],
  data () {
    return {
      cercaName: null,
      tableData: [],
      activeList: [{
        value: '1',
        label: '启用'
      }, {
        value: '2',
        label: '禁用'
      }],
      active: null,
      department: null,
      departmentList: []
    }
  },
  created () {
    this.list()
    this.findAuth()
  },
  methods: {
    list () {
      lists(this.page.pageNum, this.page.pageSize, this.cercaName, this.active, this.department).then(response => {
        this.tableData = response.data.dataList
        this.page = response.data.page
      })
    },
    findAuth () {
      var id = this.$store.state.user.userInfo.id
      findDepartmentsByPersonnel(id).then(response => {
        this.departmentList = response.data
      })
    },
    _delt (listId) {
      delt(listId).then(response => {
        this.$message({
          message: response.msg,
          type: 'success'
        })
        this.list()
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>

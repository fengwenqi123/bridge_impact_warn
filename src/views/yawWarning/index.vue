<template>
  <div class="common-table">
    <div class="title">
      <title-header/>
    </div>
    <el-card class="content">
      <div class="search">
        <el-form :inline="true" class="form-inline" label-width="120px">
          <el-form-item label="预警方式">
            <el-input
              v-model="warningMethod"
              placeholder="请输入预警方式"
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
          <el-form-item label="预警类型">
            <el-select v-model="warningType" clearable placeholder="请选择">
              <el-option
                v-for="item in warningTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="small" class="blueButton" @click="search">查询
            </el-button>
            <el-button type="primary" icon="el-icon-refresh-left" size="small" class="blueButton" @click="reset">重置
            </el-button>
          </el-form-item>
        </el-form>
        <div class="table_search_buttonLeft">
<!--          <el-button type="primary" icon="el-icon-circle-plus" size="small" class="blueButton" @click="add">添加-->
<!--          </el-button>-->
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
            prop="warningType"
            label="预警类型">
            <template slot-scope="scope">
              {{scope.row.warningType==='1'?'预警警告（一级)':scope.row.warningType==='2'?'紧急警告（二级)':scope.row.warningType==='3'?'危急警告（三级)':scope.row.warningType==='4'?'碰撞警告（四级)':''}}
            </template>
          </el-table-column>
          <el-table-column
            prop="warningMethod"
            width="300"
            label="预警方式"
          />
          <el-table-column
            label="启用状态">
            <template slot-scope="scope">
              <span>{{ scope.row.start==='1'?'禁用':scope.row.start==='2'?'启用':'' }} </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="gravacaoCondeudo"
            width="600"
            label="录音内容"
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
<!--          <el-checkbox-->
<!--            v-model="checked"-->
<!--            @change="toggleSelection(checked)"-->
<!--          >全选-->
<!--          </el-checkbox>-->
<!--          <el-button-->
<!--            class="whiteButton"-->
<!--            icon="el-icon-delete"-->
<!--            size="small"-->
<!--            @click="del"-->
<!--          >-->
<!--            批量删除-->
<!--          </el-button>-->
<!--          <span class="checkNum">已选择{{ selectData.length }}项</span>-->
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
import { lists, delt } from '@/api/yawWarning'
import information from './information'
import Pagination from '@/components/Paginations'
import elDragDialog from '@/directive/el-drag-dialog'
import tableMixin from '@/mixins/tableMixin'

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
      warningMethod: null,
      tableData: [],
      active: null,
      activeList: [{
        value: '2',
        label: '已启用'
      }, {
        value: '1',
        label: '禁用'
      }],
      warningType: null,
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
    this.list()
  },
  methods: {
    list () {
      lists(this.page.pageNum, this.page.pageSize, this.warningType, this.warningMethod, this.active).then(response => {
        this.tableData = response.data.dataList
        this.page = response.data.page
      })
    },
    reset () {
      this.page.pageNum = 1
      this.warningType = null
      this.warningMethod = null
      this.active = null
      this.list()
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

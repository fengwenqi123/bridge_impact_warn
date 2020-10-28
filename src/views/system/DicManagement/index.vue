<template>
  <div class="common-table">
    <div class="title">
      <title-header />
    </div>
    <el-card class="content">
        <div class="search">
          <el-form :inline="true" class="form-inline" label-width="120px">
            <el-form-item label="关键字">
              <el-input
                v-model="keyword"
                placeholder="请输入关键字"
                clearable
              />
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
              sortable
              prop="classification"
              label="分类"
            >
              <template slot-scope="scope">
                <div>{{ scope.row.classification }}</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="itemName"
              sortable
              label="项目名称"
            />
            <el-table-column
              prop="itemValue"
              label="项目值"
              sortable
              width="180"
            />
            <el-table-column
              prop="sort"
              label="排序"
              sortable
              width="80"
            />
            <el-table-column
              prop="type"
              label="类型"
              sortable
              width="80"
            >
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">
                  {{ scope.row.type
                    =='1' ?
                      '系统' :
                      '自定义' }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="status"
              label="状态"
              width="120"
            >
              <template slot-scope="scope">
                <li slot="scope" :class="{ success: scope.row.status =='1',error:scope.row.status =='2' }">
                  {{ scope.row.status | toActive }}
                </li>
              </template>
            </el-table-column>
            <el-table-column
              prop="modifyTimeString"
              sortable
              label="更新时间"
              width="180"
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
          >全选</el-checkbox>
          <el-button
            class="whiteButton"
            icon="el-icon-delete"
            size="small"
            @click="del"
          >
            批量删除
          </el-button>
          <el-button
            class="whiteButton"
            icon="el-icon-circle-check"
            size="small"
            @click="Enable"
          >
            批量启用
          </el-button>
          <el-button
            class="whiteButton"
            icon="el-icon-circle-close"
            size="small"
            @click="Disable"
          >
            批量禁用
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
        <information v-if="addDialog" :row="row" :readonly="readonly" @cancel="cancel" @submit="submit" />
      </el-dialog>
  </div>
</template>

<script>
import titleHeader from '@/components/title/index'
import { lists, delt, enable, disable } from '@/api/DicManagement'
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
      border: true,
      order: '',
      sort: '',
      classification: '',
      type: '',
      status: 0,
      keyword: '',
      tableData: []
    }
  },
  created () {
    this.list()
  },
  methods: {
    list () {
      lists(this.page.pageNum, this.page.pageSize, this.order, this.sort, this.classification, this.type, this.status, this.keyword).then(response => {
        this.tableData = response.data.dataList
        this.page = response.data.page
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
    },
    _enable (listId) {
      enable(listId).then(response => {
        this.$message({
          message: response.msg,
          type: 'success'
        })
        this.list()
      })
    },
    _disable (listId) {
      disable(listId).then(response => {
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

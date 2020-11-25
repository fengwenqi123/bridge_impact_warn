<template>
  <div class="common-table">
    <div class="title">
      <title-header/>
    </div>
    <el-card class="content">
      <div class="search">
        <el-form :inline="true" class="form-inline" label-width="120px">
          <el-form-item label="登录账号">
            <el-input
              v-model="userLoginName"
              placeholder="请输入登录账号"
              clearable
            />
          </el-form-item>
          <el-form-item label="操作内容">
            <el-input
              v-model="description"
              placeholder="请输入操作内容"
              clearable
            />
          </el-form-item>
          <el-form-item label="操作时间">
            <el-date-picker
              v-model="addTime"
              type="date"
              placeholder="选择开始日期"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="small" class="blueButton" @click="search">查询
            </el-button>
          </el-form-item>
        </el-form>
        <div class="table_search_buttonLeft">
          <el-button type="primary" icon="el-icon-circle-plus" size="small" class="blueButton" @click="reset">重置
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
            prop="Id"
            label="序号"
            width="80"
          >
            <template slot-scope="scope">
              <span>{{ scope.$index+(page.pageNum - 1) * page.pageSize+1 }} </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="userLoginName"
            label="登录账号"
          />
          <el-table-column
            prop="userName"
            label="登录用户名"
          />
          <el-table-column
            prop="description"
            label="操作内容"
          />
          <el-table-column
            prop="addTimeString"
            label="操作时间"
          />
        </el-table>
      </div>
      <div class="bottom">
        <div class="option">
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
import { lists } from '@/api/operation'
import information from './information'
import Pagination from '@/components/Paginations/index'
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
      tableData: [],
      userLoginName: null,
      addTime: null,
      description: null
    }
  },
  created () {
    this.list()
  },
  methods: {
    list () {
      lists(this.page.pageNum, this.page.pageSize, this.userLoginName, this.description, this.addTime).then(response => {
        this.tableData = response.data.dataList
        this.page = response.data.page
      })
    },
    reset () {
      this.userLoginName = null
      this.description = null
      this.addTime = null
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>

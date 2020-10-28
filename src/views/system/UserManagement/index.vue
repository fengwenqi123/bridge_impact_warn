<template>
  <div class="common-table">
    <div class="title">
      <title-header />
    </div>
    <el-card class="content">
        <div class="search">
          <el-form
            :inline="true"
            class="form-inline"
            label-width="120px"
          >
            <el-form-item label="关键字">
              <el-input
                v-model="keyword"
                clearable
                placeholder="请输入关键字"
              />
            </el-form-item>
            <el-form-item label="选择部门">
              <el-select
                v-model="selected"
                clearable
                filterable
                placeholder="请选择"
              >
                <el-option
                  v-for="(item,index) in data2"
                  :key="index"
                  :label="item.name"
                  :style="{ paddingLeft : (item.layer.length-2) * 10 + 'px' }"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button
                class="blueButton"
                icon="el-icon-search"
                size="small"
                type="primary"
                @click="search"
              >
                查询
              </el-button>
            </el-form-item>
          </el-form>
          <div class="table_search_buttonLeft">
            <el-button
              class="blueButton"
              icon="el-icon-circle-plus"
              size="small"
              type="primary"
              @click="add"
            >
              添加
            </el-button>
          </div>
        </div>
        <div class="table">
          <el-table
            ref="multipleTable"
            :data="tableData"
            :height="tableHeight"
            stripe
            border
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="55"
            />
            <el-table-column
              label="序号"
              prop="Id"
              width="80"
            >
              <template slot-scope="scope">
                <span>{{ scope.$index+(page.pageNum - 1) * page.pageSize+1 }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="编号"
              prop="code"
              width="180"
              sortable
            >
              <template slot-scope="scope">
                <div>{{ scope.row.code }}</div>
              </template>
            </el-table-column>
            <el-table-column
              label="登录名"
              prop="loginName"
             width="180"
            />
            <el-table-column
              label="姓名"
              prop="name"
             width="180"
            />
            <el-table-column
              label="性别"
              prop="gender"
              width="80"
            >
              <template slot-scope="scope">
                <div
                  class="name-wrapper"
                  slot="reference"
                >{{ scope.row.gender =='1' ? '男' : '女' }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="生日"
              prop="birthday"
              width="120"
            />
            <el-table-column
              label="手机"
              prop="mobile"
              width="180"
            />
            <el-table-column
              label="状态"
              prop="status"
              width="120"
            >
              <template slot-scope="scope">
                <li
                  :class="{ success: scope.row.status =='1',error:scope.row.status =='2' }"
                  slot="scope"
                >{{ scope.row.status | toActive }}
                </li>
              </template>
            </el-table-column>
            <el-table-column
              label="更新时间"
              prop="modifyTimeString"
              sortable
            />
            <el-table-column
              fixed="right"
              label="操作"
              width="220"
            >
              <template slot-scope="scope">
                <el-button-group>
                  <div class="operation">
                    <el-button class="table_button" icon="el-icon-search" size="small" type="text" @click="handleClickInfo(scope.row)">查看</el-button>
                    <el-button class="table_button" icon="el-icon-edit-outline" size="small" type="text" @click="handleClickModify(scope.row)">编辑</el-button>
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
            <el-button
              class="whiteButton"
              icon="el-icon-refresh"
              size="small"
              @click="resetPassword"
            >
              重置密码
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
      <el-dialog
        v-el-drag-dialog
        :before-close="handleClose"
        :title="title"
        :visible.sync="addDialog"
        top="6vh"
      >
        <information
          v-if="addDialog"
          :readonly="readonly"
          :row="row"
          @cancel="cancel"
          @submit="submit"
        />
      </el-dialog>
  </div>
</template>

<script>
import titleHeader from '@/components/title/index'
import { lists, delt, enable, disable, resetpassword } from '@/api/UserManagement'
import Pagination from '@/components/Paginations'
import elDragDialog from '@/directive/el-drag-dialog'
import tableMixin from '@/mixins/tableMixin'
import { findDepartmentsByPersonnel } from '@/api/DepManagement'
import information from './information'

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
      order: null,
      sort: null,
      status: '',
      keyword: null,
      tableData: [],
      selected: this.$store.state.user.userInfo.upperDepartmentId,
      data2: null
    }
  },
  created () {
    this.list()
    this.findAuth()
  },
  methods: {
    findAuth () {
      var id = this.$store.state.user.userInfo.id
      findDepartmentsByPersonnel(id).then(response => {
        this.data2 = response.data
      })
    },
    list () {
      lists(
        this.page.pageNum,
        this.page.pageSize,
        this.order,
        this.sort,
        this.status,
        this.keyword,
        this.selected
      ).then(response => {
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
    },
    resetPassword () {
      if (this.selectData.length === 0) {
        this.$message({
          message: '请先选择'
        })
        return
      }
      this.$confirm('此操作即将启动, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          var num = []
          this.selectData.forEach((item, index) => {
            num.push(item.id)
          })
          resetpassword(num).then(response => {
            this.$message({
              message: response.msg,
              type: 'success'
            })
            this.list()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>

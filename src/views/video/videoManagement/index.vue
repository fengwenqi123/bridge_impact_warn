<template>
  <div class="common-table">
    <div class="title">
      <title-header/>
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
          <el-form-item label="视频类型">
            <el-select v-model="initiateState" clearable placeholder="请选择">
              <el-option
                v-for="item in videoList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="small" class="blueButton" @click="search">查询
            </el-button>
            <el-button type="primary" icon="el-icon-circle-plus" size="small" class="blueButton" @click="add">添加
            </el-button>
            <el-button type="primary" icon="el-icon-refresh-left" size="small" class="blueButton" @click="reset">重置
            </el-button>
          </el-form-item>
        </el-form>
        <div class="table_search_buttonLeft">

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
            label="视频名称"
            prop="videoName">
          </el-table-column>
          <el-table-column
            prop="videoType"
            label="视频类型"
          />
          <el-table-column
            prop="playbackType"
            label="回放类型"
            width="180"
          />
          <el-table-column
            label="直播方式"
            prop="playType"/>
          <el-table-column
            label="回放流名称"
            prop="playbackName"/>
          <el-table-column
            label="回放频道"
            prop="playbackChannel"/>
          <el-table-column
            label="设备编号"
            prop="equipmentNumber"/>
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
import { lists, delt } from '@/api/videoManagement'
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
      keyword: null,
      tableData: [],
      initiateState: null,
      videoList: [{
        value: '枪机',
        label: '枪机'
      }, {
        value: '球机',
        label: '球机'
      }]
    }
  },
  created () {
    this.list()
  },
  methods: {
    list () {
      lists(this.page.pageNum, this.page.pageSize, this.keyword, this.initiateState).then(response => {
        this.tableData = response.data.dataList
        this.page = response.data.page
      })
    },
    reset () {
      this.page.pageNum = 1
      this.keyword = null
      this.initiateState = null
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

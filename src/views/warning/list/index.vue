<template>
  <div class="common-table">
    <div class="title">
      <title-header/>
    </div>
    <el-card class="content">
      <div class="search">
        <el-form :inline="true" class="form-inline" label-width="100px">
          <el-form-item label="中文船名">
            <el-input
              v-model="keyword"
              placeholder="请输入中文船名"
              clearable
            />
          </el-form-item>
          <el-form-item label="预警时间">
            <el-date-picker
              v-model="startTime"
              type="datetime"
              placeholder="选择开始日期"
              value-format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
            <span>至</span>
            <el-date-picker
              v-model="endTime"
              type="datetime"
              placeholder="选择开始日期"
              value-format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="预警类型">
            <el-select v-model=" warnValue" clearable placeholder="请选择">
              <el-option
                v-for="item in warnType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="small" class="blueButton" @click="search">查询
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
            prop="Id"
            label="序号"
            width="80"
          >
            <template slot-scope="scope">
              <span>{{ scope.$index + (page.pageNum - 1) * page.pageSize + 1 }} </span>
            </template>
          </el-table-column>
          <el-table-column
            label="中文船名"
            width="400"
          >
            <template slot-scope="scope">
              <div :style="{paddingLeft:(scope.row.layer.length-3)*10+'px',textAlign:'left'}"
                   v-text="scope.row.name"/>
            </template>
          </el-table-column>
          <el-table-column
            prop="code"
            label="船舶识别号"
            width="180"
          />
          <el-table-column
            prop="description"
            label="联系电话"
          />
          <el-table-column
            prop="modifyTimeString"
            label="预警时间"
            width="180"
          />
          <el-table-column
            prop="modifyTimeString"
            label="预警类型"
            width="180"
          />
          <el-table-column
            prop="modifyTimeString"
            label="预警方式"
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
                </div>
              </el-button-group>
            </template>
          </el-table-column>
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
    <el-dialog v-el-drag-dialog :title="title" :visible.sync="addDialog" :before-close="handleClose" top="1vh" width="90%">
      <information v-if="addDialog" :row="row" :readonly="readonly" @cancel="cancel" @submit="submit"/>
    </el-dialog>
  </div>
</template>

<script>
import titleHeader from '@/components/title/index'
import { lists } from '@/api/DepManagement'
import information from './information'
import Pagination from '@/components/Paginations'
import elDragDialog from '@/directive/el-drag-dialog'
import tableMixin from '@/mixins/tableMixin'
import { mapGetters } from 'vuex'

export default {
  components: {
    titleHeader,
    information,
    Pagination
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  directives: { elDragDialog },
  mixins: [tableMixin],
  data () {
    return {
      border: true,
      keyword: '',
      startTime: null,
      endTime: null,
      tableData: [],
      warnValue: null,
      warnType: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }]
    }
  },
  created () {
    this.list()
  },
  methods: {
    list () {
      lists(this.page.pageNum, this.page.pageSize, this.order, this.sort, this.status, this.keyword, this.selected).then(response => {
        this.tableData = response.data.dataList
        this.page = response.data.page
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>

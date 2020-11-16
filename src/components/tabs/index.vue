<template>
  <el-tabs type="border-card">
    <el-tab-pane label="档案">
      <el-scrollbar class="scrolls">
        <el-row v-if="shipxinxi"
                class="el6">
          <el-col :span="12"><span>中文船名</span></el-col>
          <el-col :span="12"><span>{{ shipxinxi.zwcm }}</span></el-col>
          <el-col :span="12"><span>曾用中文船名</span></el-col>
          <el-col :span="12"><span>{{ shipxinxi.cyzwcm }}</span></el-col>
          <el-col :span="12"><span> 船舶总长(米)</span></el-col>
          <el-col :span="12"><span>{{ shipxinxi.cbzc }}</span></el-col>
          <el-col :span="12"><span>船舶登记号</span></el-col>
          <el-col :span="12"><span>{{ shipxinxi.cbdjh }}</span></el-col>
          <el-col :span="12"><span>船籍港代码</span></el-col>
          <el-col :span="12"><span>{{ shipxinxi.cjgdm }}</span></el-col>
          <el-col :span="12"><span>参考载重吨(吨) </span></el-col>
          <el-col :span="12"><span>{{ shipxinxi.ckzzd }}</span></el-col>
          <el-col :span="12"><span>船舶种类代码 </span></el-col>
          <el-col :span="12"><span>{{ shipxinxi.cbzldm }}</span></el-col>
          <el-col :span="12"><span>船检登记号 </span></el-col>
          <el-col :span="12"><span>{{ shipxinxi.cjdjh }}</span></el-col>
          <el-col :span="12"><span>空载吃水(米)</span></el-col>
          <el-col :span="12"><span>{{ shipxinxi.kzcs }}</span></el-col>
          <el-col :span="12"><span> 满载吃水(米) </span></el-col>
          <el-col :span="12"><span>{{ shipxinxi.mzcs }}</span></el-col>
          <el-col :span="12"><span>净吨位</span></el-col>
          <el-col :span="12"><span>{{ shipxinxi.jdw }}</span></el-col>
          <el-col :span="12"><span>船舶型宽(米) </span></el-col>
          <el-col :span="12"><span>{{ shipxinxi.cbxk }}</span></el-col>
          <el-col :span="12"><span>船舶型深(米)</span></el-col>
          <el-col :span="12"><span>{{ shipxinxi.cbxs }}</span></el-col>
          <el-col :span="12"><span>牌簿号</span></el-col>
          <el-col :span="12"><span>{{ shipxinxi.pbh }}</span></el-col>
          <el-col :span="12"><span>造船厂名称</span></el-col>
          <el-col :span="12"><span>{{ shipxinxi.zccmc }}</span></el-col>
          <el-col :span="12"><span>造船地点</span></el-col>
          <el-col :span="12"><span>{{ shipxinxi.zcdd }}</span></el-col>
          <el-col :span="12"><span>安放龙骨日期 </span></el-col>
          <el-col :span="12"><span>{{ shipxinxi.aflgrq }}</span></el-col>
          <el-col :span="12"><span>龙骨以上最大高度</span></el-col>
          <el-col :span="12"><span>{{ shipxinxi.lgyszdgd }}</span></el-col>
          <el-col :span="12"><span>所有人</span></el-col>
          <el-col :span="12"><span>{{ shipxinxi.syr }}</span></el-col>
          <el-col :span="12"><span>所有人联系电话</span></el-col>
          <el-col :span="12"><span>{{ shipxinxi.syrlxdh }}</span></el-col>
        </el-row>
      </el-scrollbar>
    </el-tab-pane>
    <el-tab-pane label="违章">
      <el-scrollbar class="scrolls">
        <p v-if="chufaList.length===0">暂无数据</p>
        <el-row
          v-for="(item,index) in chufaList"
          :key="index"
          style='margin-top: 16px;'
        >
          <el-card class="box-card" v-if="chufaList.length>0">
            <el-col :span="8"><span>违章时间</span></el-col>
            <el-col :span="16"><span>{{ item.violationDate }}</span></el-col>
            <el-col :span="8"><span>违章类型</span></el-col>
            <el-col :span="16"><span>{{ item.gcvTypeName }}</span></el-col>
            <el-col :span="8"><span>违章录入单位</span></el-col>
            <el-col :span="16"><span>{{ item.dockName }}</span></el-col>
            <el-col :span="8"><span>违章标记</span></el-col>
            <el-col :span="16"><span>{{ item.flag }}</span></el-col>
            <el-col :span="8"><span>违章处理状态</span></el-col>
            <el-col :span="16"><span>{{ item.status }}</span></el-col>
          </el-card>
        </el-row>
      </el-scrollbar>
    </el-tab-pane>
    <el-tab-pane label="持证">
      <el-scrollbar class="scrolls">
        <tree v-if="zhzsListobj"
              :zhzsListobj="zhzsListobj"></tree>
      </el-scrollbar>
    </el-tab-pane>
    <el-tab-pane label="检验">
      <el-scrollbar class="scrolls">
        <p v-if="jyList.length===0">暂无数据</p>
        <el-row
          v-for="(item,index) in jyList"
          :key="index"
          style='margin-top: 16px;'
         >
          <el-card class="box-card"  v-if="jyList.length>0">
            <el-col :span="8"><span>检验时间</span></el-col>
            <el-col :span="16"><span>{{ item.jywcrq }}</span></el-col>
            <el-col :span="8"><span>检验地点</span></el-col>
            <el-col :span="16"><span>{{ item.jydd }}</span></el-col>
            <el-col :span="8"><span>检验部门</span></el-col>
            <el-col :span="16"><span>{{ item.jybm }}</span></el-col>
            <el-col :span="8"><span>申请人</span></el-col>
            <el-col :span="16"><span>{{ item.sqr }}</span></el-col>
          </el-card>
        </el-row>
      </el-scrollbar>
    </el-tab-pane>
    <el-tab-pane label="报告">
      <el-scrollbar class="scrolls">
        <p v-if="dzbgList.length===0">暂无数据</p>
        <el-card class="box-card"
                 v-else>
          <el-collapse accordion>
            <el-collapse-item :name="index"
                              v-for="(item,index) in dzbgList"
                              :key="index">
              <template slot="title">
                <div class="temp">
                  <span>
                    {{ item.reportportname }}
                  </span>
                  <span>
                    {{ item.reporttimeStr }}
                  </span>
                  <span class="active"
                        :class="{in:item.arrivalorleave==='0'}">
                    {{ item.arrivalorleave === '0' ? '进港' : '出港' }}
                  </span>
                </div>
              </template>
              <div class="text">
                <ul>
                  <li>
                    <div class="item">
                      <p>报告时间</p>
                      <p>{{ item.reporttimeStr }}</p>
                    </div>
                  </li>
                  <li>
                    <div class="item">
                      <p>港口名称</p>
                      <p>{{ item.reportportname }}</p>
                    </div>
                  </li>
                  <li>
                    <div class="item">
                      <p>停靠泊位</p>
                      <p>{{ item.berthname }}</p>
                    </div>
                  </li>
                  <li>
                    <div class="item">
                      <p v-if="item.arrivalorleave==='0'">预抵时间</p>
                      <p v-else>预离时间</p>
                      <p>{{ item.expecttimeStr }}</p>
                    </div>
                  </li>
                  <li>
                    <div class="item">
                      <p>下一港口</p>
                      <p>{{ item.nextportname }}</p>
                    </div>
                  </li>
                  <li>
                    <div class="item">
                      <p>所有人联系电话</p>
                      <p>{{ item.ownertelephone }}</p>
                    </div>
                  </li>
                  <li v-for="(item1, index1) in item.shipReportGoodsBeans"
                      :key="index1">
                    <div class="item">
                      <p>货物名称</p>
                      <p v-if="item.shipReportGoodsBeans.length>0">{{ item1.goodsname }}</p>
                    </div>
                    <div class="item">
                      <p>货物数量（吨）</p>
                      <p v-if="item.shipReportGoodsBeans.length>0">{{ item1.realcargo }}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </el-scrollbar>
    </el-tab-pane>
    <el-tab-pane label="信号">
      <el-scrollbar class="scrolls">
        <el-row class="el1">
          <el-col :span="12"><span>信号接收时间</span></el-col>
          <el-col :span="12"><span>{{ ais.receiveTime }}</span></el-col>
          <el-col :span="12"><span>航向</span></el-col>
          <el-col :span="12"><span>{{ ais.shipDirection }}</span></el-col>
          <el-col :span="12"><span>纬度</span></el-col>
          <el-col :span="12"><span>{{ ais.shipLat }}</span></el-col>
          <el-col :span="12"><span>经度</span></el-col>
          <el-col :span="12"><span>{{ ais.shipLon }}</span></el-col>
          <el-col :span="12"><span>船舶信息</span></el-col>
          <el-col :span="12"><span>{{ ais.shipMessage }}</span></el-col>
          <el-col :span="12"><span>船舶名称</span></el-col>
          <el-col :span="12"><span>{{ ais.shipName }}</span></el-col>
          <el-col :span="12"><span>速度</span></el-col>
          <el-col :span="12"><span>{{ ais.shipSpeed }}</span></el-col>
          <el-col :span="12"><span>船艏向</span></el-col>
          <el-col :span="12"><span>{{ ais.shipheadDirection }}</span></el-col>
        </el-row>
      </el-scrollbar>
    </el-tab-pane>
    <el-tab-pane label="危货作业"
                 v-if="this.shipType===3">
      <el-scrollbar class="scrolls">
        <el-table :data="dangerList">
          <el-table-column label="作业泊位"
                           prop="zybw"></el-table-column>
          <el-table-column label="危货作业时间"
                           prop="lzykssj"></el-table-column>
          <el-table-column label="危险品类型"
                           prop="sqzynr"></el-table-column>
        </el-table>
      </el-scrollbar>
    </el-tab-pane>
  </el-tabs>
</template>

<script>

import { lists, shipchufa, shipzhzs, shipdzbg, shipJy } from '@/api/tabs.js'
import tree from '@/components/tree'
import { dangerShipInfoList } from '@/api/dangerShip'

export default {
  components: {
    tree
  },
  props: ['name', 'ais', 'shipType'],
  data () {
    return {
      shipxinxi: null,
      chufa: {
        pageNum: null,
        pageSize: null,
        order: null,
        sort: null,
        shipName: null,
        status: null
      },
      chufaList: [],
      zhzs: {
        pageNum: null,
        pageSize: null,
        order: null,
        sort: null,
        shipName: null,
        zsmc: null
      },
      dzbg: {
        pageNum: null,
        pageSize: null,
        order: null,
        sort: null,
        shipName: null,
        keyword: null
      },
      jy: {
        pageNum: 1,
        pageSize: 100,
        order: null,
        sort: null,
        cjdjh: null,
        jydd: null
      },
      dzbgList: [],
      zhzsList: [],
      zhzsListobj: [],
      children: [],
      jyList: [],
      dangerList: []
    }
  },
  created () {
    console.log('类型', this.shipType)
    this.getShipManage()
    this.getDangerShipRecord()
  },
  methods: {
    getDangerShipRecord () {
      dangerShipInfoList(this.name).then(res => {
        // console.log('危船', res)
        this.dangerList = res.data
      })
    },
    getShipManage () {
      this.$store.commit('remove_shipInfo')
      lists(this.name).then(response => {
        this.shipxinxi = response.data
        // console.log(this.shipxinxi)
        this.$store.commit('SET_shipInfo', this.shipxinxi)
        this.getJy()
      })
      this.chufa.shipName = this.name
      shipchufa(this.chufa).then(response => {
        this.chufaList = response.data.dataList
      })
      this.zhzs.shipName = this.name
      shipzhzs(this.zhzs).then(response => {
        this.zhzsList = response.data.dataList
        this.zhzsListobj = []
        this.zhzsList.forEach((item, index) => {
          this.children = []
          var obj1 = {}
          var obj2 = {}
          var obj3 = {}
          var obj4 = {}
          var objAll = {}
          objAll.label = item.zsmc
          obj1.label = '证书名称：' + item.zsmc
          obj2.label = '发证机构：' + item.fzjg
          obj3.label = '发证日期：' + item.fzrq
          obj4.label = '有效日期：' + item.yxrq
          this.children.push(obj1)
          this.children.push(obj2)
          this.children.push(obj3)
          this.children.push(obj4)
          objAll.children = this.children
          this.zhzsListobj.push(objAll)
        })
      })
      this.getDzbg()
    },
    getDzbg () {
      this.dzbg.shipName = this.name
      shipdzbg(this.dzbg).then(response => {
        this.dzbgList = response.data.dataList
      })
    },
    getJy () {
      this.jy.cjdjh = this.shipxinxi.cjdjh
      shipJy(this.jy).then(response => {
        // console.log(response)
        this.jyList = response.data
      })
    }
  },
  watch: {
    name () {
      this.getShipManage()
    }
  }
}
</script>

<style scoped lang="scss">
.el-col {
  height: 30px;
  line-height: 30px;
}

.el-tab-pane {
  height: 350px;
}

.scrolls {
  span {
    overflow: hidden; /*超出部分隐藏*/
    white-space: nowrap; /*不换行*/
    text-overflow: ellipsis; /*超出部分文字以...显示*/
  }

  p {
    text-align: center;
  }

  .el1,
  .el6 {
    .el-col {
      border: 1px solid #f5f5f5;
      height: 40px;
      line-height: 40px;
      padding-left: 10px;
    }
  }
}

.text {
  margin-top: 14px;

  ul {
    /*display: flex;*/
    /*align-items: center;*/
    /*flex-wrap: wrap;*/

    li {
      /*flex: 1;*/
      width: 100%;

      .item {
        height: 55px;
        display: flex;

        p {
          /*flex: 1;*/
          font-size: 15px;
        }

        p:nth-child(1) {
          width: 140px;
          padding-right: 30px;
          text-align: right;
        }
      }
    }
  }
}

.temp {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.active {
  display: inline-block;
  height: 22px;
  line-height: 22px;
  background: rgba(255, 242, 232, 1);
  border-radius: 4px;
  border: 1px solid rgba(255, 187, 150, 1);
  width: 50px;
  text-align: center;
}

.in {
  background: rgba(230, 247, 255, 1);
  border: 1px solid rgba(145, 213, 255, 1);
}
</style>

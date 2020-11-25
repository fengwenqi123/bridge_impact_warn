<template>
  <div class="container">
    <olMap>
    </olMap>
    <videoDrawer
      :videoList="videoList"
      :drawer.sync="drawer"
      @checked="play">
    </videoDrawer>
    <div v-for="(item,index) in checkedVideoList" :key="item.id">
      <div class="rtmp" v-if="item.show" v-focus>
        <p class="p1">{{ item.name }}<i @click="close(index)" class="el-icon-circle-close"></i></p>
        <videoCom :url="item.rtmp" :ids="item.id"></videoCom>
      </div>
    </div>
   <div class="video-list">
     <videoList :list="videoListData" @checked="play"></videoList>
   </div>
    <shipInfo v-if="shipInfo" :shipInfo="shipInfo" @closeTab="closeTab"></shipInfo>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import olMap from '@/components/map/index'
import { addInfoLayers, startGISWork } from '@/utils/mapConfig/gisLib/HMap.js'
import bus from '@/components/bus'
import videoCom from '@/components/video/flv1'
import HShipLayer from '@/utils/mapConfig/gisLib/HShipLayer'
import { GIS_SHIPWMS, GIS_SHIPWFS } from '@/utils/mapConfig/gisLib/HConfig'
import videoDrawer from '@/views/map/videoDrawer'
import shipInfo from '@/views/map/shipInfo'
import videoList from '@/views/map/videoList'
import { lists } from '@/api/videoManagement'

export default {
  name: 'mapView',
  computed: {
    ...mapGetters([
      'app'
    ])
  },
  data () {
    return {
      videoList: null,
      drawer: false,
      video: null,
      checkedVideoList: [],
      shipInfo: null,
      videoListData: null
    }
  },
  components: {
    olMap,
    videoCom,
    videoDrawer,
    shipInfo,
    videoList
  },
  created () {
    this.getVideoListFun()
  },
  mounted () {
    addInfoLayers(this.app) // 增加业务图层
    const shipLayer = new HShipLayer()
    shipLayer.init(this.app.map, GIS_SHIPWMS, GIS_SHIPWFS) // 船舶图层初始化
    shipLayer.refresh() // 船舶图层刷新
    startGISWork()
    this.onBus() // 接收地图发送的数据
  },
  methods: {
    // 点击要素触发事件
    onBus () {
      bus.$on('video', (obj) => {
        this.videoList = obj
        this.drawer = true
      })
      bus.$on('shipManage', (obj) => {
        this.shipInfo = obj
      })
    },
    // 播放视频前判断
    play (item) {
      console.log(item)
      if (!item.rtmp) {
        this.$message({
          message: '该地点暂无视频',
          type: 'warning'
        })
        return
      }
      const exist = this.checkedVideoList.some(v => v.id === item.id)
      if (!exist) {
        item.show = true
        this.checkedVideoList.push(item)
      } else {
        this.checkedVideoList.forEach(list => {
          if (list.id === item.id) {
            list.show = true
          }
        })
      }
    },
    // 逻辑关闭视频
    close (index) {
      const item = JSON.parse(JSON.stringify(this.checkedVideoList[index]))
      item.show = false
      this.$set(this.checkedVideoList, index, item)
    },
    closeTab () {
      this.shipInfo = null
    },
    // 视频列表
    getVideoListFun () {
      lists(1, 30).then(response => {
        this.videoListData = response.data.dataList
      })
    }
  },
  directives: {
    focus: {
      // 指令的定义
      inserted (el) {
        el.onmousedown = function (v) {
          var ev = v || event
          var X = ev.clientX
          var Y = ev.clientY
          var x1 = el.offsetLeft
          var y1 = el.offsetTop
          var disx = X - x1
          var disy = Y - y1
          document.onmousemove = function (ev1) {
            var ev = ev1 || event
            el.style.left = ev.clientX - disx + 200 + 'px'
            el.style.top = ev.clientY - disy + 120 + 'px'
          }
        }
        document.onmouseup = function (ev) {
          document.onmousemove = null
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  .rtmp {
    position: fixed;
    width: 484px;
    height: 272px;
    margin-left: -200px;
    margin-top: -120px;
    top: 50%;
    left: 50%;
    z-index: 3000;
    background: #fff;

    p {
      background: #1890ff;
      height: 30px;
      line-height: 30px;
      text-align: left;
      padding-right: 10px;
      padding-left: 10px;
      color: #fff;

      i {
        float: right;
        font-size: 20px;
        height: 30px;
        line-height: 30px;
        cursor: pointer;
      }
    }
  }
  .video-list{
    position: absolute;
    right: 0px;
    top: 10px;
    width: 400px;
  }
}
</style>

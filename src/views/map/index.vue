<template>
  <div class="container">
    <olMap>
    </olMap>
    <div class="drawer">
      <el-drawer
        :visible.sync="drawer"
        :with-header="false"
        size="250px"
        :direction="direction">
        <div class="video-list" :style="{height:clientHeight+'px'}">
          <el-scrollbar class="scrolls">
            <ul>
              <li v-for="(item) in videoList" :key="item.id">
                <div class="item" @click="play(item)">
                  <div class="name">
                    {{ item.name }}
                  </div>
                </div>
              </li>
            </ul>
          </el-scrollbar>
        </div>
      </el-drawer>
    </div>
    <div v-for="(item,index) in checkedVideoList" :key="item.id">
      <div class="rtmp" v-if="item.show" v-focus>
        <p class="p1">{{ item.name }}<i @click="close(index)" class="el-icon-circle-close"></i></p>
        <videoCom :rtmp="item.rtmp" :id="item.id"></videoCom>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import olMap from '@/components/map/index'
import { addInfoLayers, startGISWork } from '@/utils/mapConfig/gisLib/HMap.js'
import bus from '@/components/bus'
import videoCom from '@/components/video'

export default {
  computed: {
    ...mapGetters([
      'app'
    ])
  },
  data () {
    return {
      videoList: null,
      drawer: false,
      direction: 'ltr',
      clientHeight: document.body.clientHeight,
      video: null,
      checkedVideoList: []
    }
  },
  components: {
    olMap,
    videoCom
  },
  mounted () {
    addInfoLayers(this.app) // 增加业务图层
    startGISWork()
    this.onBus()
  },
  methods: {
    // 点击要素触发事件
    onBus () {
      bus.$on('video', (obj) => {
        this.videoList = obj
        this.drawer = true
      })
      bus.$on('bridge', (obj) => {
        console.log(obj)
      })
    },
    play (item) {
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
    close (index) {
      const item = JSON.parse(JSON.stringify(this.checkedVideoList[index]))
      item.show = false
      this.$set(this.checkedVideoList, index, item)
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
  .drawer {
    .video-list {
      ul {
        height: 100%;
        overflow: auto;

        li {
          padding: 5px 10px;

          .item {
            height: 120px;
            background: #000;
            background-size: 100% 100%;

            .name {
              padding-top: 5px;
              padding-left: 5px;
              color: #fff;
            }
          }
        }
      }
    }
  }

  .rtmp {
    position: fixed;
    width: 484px;
    height: 272px;
    margin-left: -200px;
    margin-top: -120px;
    top: 50%;
    left: 50%;
    z-index: 3000;

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
}
</style>

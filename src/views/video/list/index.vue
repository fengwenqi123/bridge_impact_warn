<template>
  <div class="common-table">
    <div class="title">
      <title-header />
    </div>
    <el-card class="content">
      <div class="video" ref="vedio" style="width:70%">
        <videoRtmp v-if="flag" :url="bannerUrl" :ids="ids"></videoRtmp>
      </div>
      <div style="width:30%;background:#dcdcdc" ref="vedioScroll">
        <div class="title1" style="display:flex">
          <span style="width:75%">视频列表</span>
          <span style="width:55px">{{chooseItem}}/{{tableData.length}}</span>
          <span style="line-height: 30px;cursor: pointer;" @click="reverse">
            <svg-icon :icon-class="iconClass"></svg-icon>
          </span>
        </div>
        <el-scrollbar style="height:95%">
          <el-row>
            <el-col :span="24" v-for="(item,index) in tableData" :key="item.id">
              <div class="item" @click="play(item,index)" :class="{active:active===item.id}">
                <div class="title1"> {{ item.videoName }}</div>
              </div>
            </el-col>
          </el-row>
        </el-scrollbar>
      </div>
    </el-card>
  </div>
</template>

<script>
import titleHeader from '@/components/title/index'
import videoRtmp from '@/components/video/flv1.vue'
import { lists } from '@/api/video.js'

export default {
  components: {
    videoRtmp,
    titleHeader
  },
  data() {
    return {
      videoId: 'videoId',
      jk: require('@/assets/img/jk.jpg'),
      tableData: [],
      tableData1: [],
      bannerUrl: null,
      ids: null,
      active: null,
      flag: false,
      iconClass: 'up',
      chooseItem: 1
    }
  },
  created() {
    this.$nextTick(() => {
      this.windowResize()
    })
    window.onresize = () => this.windowResize()
    this.list()
  },
  methods: {
    // 排序按钮
    reverse() {
      this.tableData.reverse()
      if (this.iconClass === 'up') {
        this.iconClass = 'down'
      } else {
        this.iconClass = 'up'
      }
      this.play(this.tableData[0], 0)
    },
    // 监听窗口变化
    windowResize() {
      const appMainHeight = document.querySelector('.app-main').clientHeight
      this.$refs.vedio.style.height = `${appMainHeight - 86}px`
      this.$refs.vedioScroll.style.height = `${appMainHeight - 86}px`
    },
    list() {
      lists(1, 500).then(response => {
        this.tableData = response.data.dataList
        this.bannerUrl = this.tableData[0].h5Address
        // this.bannerUrl = '/asset/Mon_1704/15868902d399b87.flv'
        this.ids = this.tableData[0].id
        this.flag = true
        this.active = this.tableData[0].id
      })
    },
    play(item, index) {
      this.chooseItem = index + 1
      this.flag = false
      this.$nextTick(() => {
        this.bannerUrl = item.h5Address
        this.ids = item.id
        this.active = item.id
        if (!this.bannerUrl) {
          // this.$message('当前无视频,请切换其他视频！')
          this.$message({
            dangerouslyUseHTMLString: true,
            message: '<strong>当前无视频,请切换其他视频！</strong>'
          })
          return
        }
        this.flag = true
      })
    }
  }
}
</script>

<style scoped lang="scss">
.content {
  /deep/ .el-card__body {
    display: flex;
  }
  .title1 {
    height: 30px;
    line-height: 30px;
    background: #dcdcdc;
    text-indent: 10px;
  }
  .item {
    cursor: pointer;
    .title1 {
      height: 30px;
      line-height: 30px;
      background: #dcdcdc;
      text-indent: 10px;
    }
  }
}

.active {
  box-shadow: 10px 10px 5px #888888;

  .title1 {
    background: #00bfff !important;

    color: #fff;
  }
}
</style>

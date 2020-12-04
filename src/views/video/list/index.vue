<template>
  <div class="container">
    <div class="line1" v-if="tableData.length">
      <div class="img">
        <el-row :gutter="20">
          <el-col :span="6" v-for="(item) in tableData" :key="item.id">
            <div class="item" @click="play(item)" :class="{active:active===item.id}">
             <div class="title"> {{item.videoName}}</div>
              <div class="value">
                <img :src="jk" alt="">
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="video" v-if="bannerUrl">
        <videoRtmp :url="bannerUrl" :ids="ids"></videoRtmp>
      </div>
    </div>
    <div class="line2" v-if="tableData1.length">
      <el-row :gutter="20">
        <el-col :span="4" v-for="item in tableData1" :key="item.id">
          <div class="item" @click="play(item)" :class="{active:active===item.id}">
            <div class="title"> {{item.videoName}}</div>
            <div class="value">
              <img :src="jk" alt="">
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import videoRtmp from '@/components/video/flv1.vue'
import { lists } from '@/api/video.js'
export default {
  components: {
    videoRtmp
  },
  data () {
    return {
      videoId: 'videoId',
      jk: require('@/assets/img/jk.jpg'),
      tableData: [],
      tableData1: [],
      bannerUrl: null,
      ids: null,
      active: null
    }
  },
  created () {
    this.list()
  },
  methods: {
    list () {
      lists(1, 500).then(response => {
        if (response.data.dataList.length <= 12) {
          this.tableData = response.data.dataList
        } else {
          response.data.dataList.forEach((item, index) => {
            if (index < 12) {
              this.tableData.push(item)
            } else {
              this.tableData1.push(item)
            }
          })
        }
        this.bannerUrl = this.tableData[0].h5Address
        // this.bannerUrl = '/asset/Mon_1704/15868902d399b87.flv'
        this.ids = this.tableData[0].id
      })
    },
    play (item) {
      this.bannerUrl = item.h5Address
      this.ids = item.id
      this.active = item.id
    }
  }
}
</script>

<style scoped lang="scss">
.container{
  padding: 10px;
  .line1{
    display: flex;
    align-items: flex-start;
    .img{
      margin-right: 20px;
      flex: 1;
      .item{
        margin: 10px 0;
        cursor: pointer;
        .title{
          height: 30px;
          line-height: 30px;
          background: #DCDCDC;
          text-indent: 10px;
        }
        .value{
          img{
            width: 100%;
            height: 130px;
          }
        }
      }
    }
    .video{
      width: 600px;
      height: 460px;
    }
  }
  .line2{
    .item{
      margin: 4px 0;
      cursor: pointer;
      .title{
        background: #DCDCDC;
        height: 30px;
        line-height: 30px;
        text-indent: 10px;
      }
      .value{
        img{
          width: 100%;
          height: 130px;
        }
      }
    }
  }
}
.active{
  box-shadow: 10px 10px 5px #888888;
  .title{
    background: #00BFFF!important;

    color: #fff;
  }
}
</style>

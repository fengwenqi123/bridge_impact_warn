<template>
  <div class="container">
    <div class="line1" v-if="tableData.length">
      <div class="img">
        <el-row :gutter="20">
          <el-col :span="6" v-for="(item) in tableData" :key="item.id">
            <div class="item">
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
          <div class="item">
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
      ids: null
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
        this.ids = this.tableData[0].id
      })
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
        .title{
          height: 30px;
          line-height: 30px;
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
      .title{
        height: 30px;
        line-height: 30px;
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
</style>

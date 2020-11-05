<template>
  <div class="container">
    <div class="line1">
      <div class="img">
        <el-row :gutter="20">
          <el-col :span="6" v-for="item in 12" :key="item">
            <div class="item">
             <div class="title"> {{item}}</div>
              <div class="value">
                <img :src="jk" alt="">
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="video">
        <videoRtmp rtmp="rtmp://172.16.151.135:1935/00bd003a0046006a0018002200f40096/34" :id="videoId"></videoRtmp>
      </div>
    </div>
    <div class="line2">
      <el-row :gutter="20">
        <el-col :span="4" v-for="item in 12" :key="item">
          <div class="item">
            <div class="title"> {{item}}</div>
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
import videoRtmp from '@/components/video'
export default {
  components: {
    videoRtmp
  },
  data () {
    return {
      videoId: 'videoId',
      jk: require('@/assets/img/jk.jpg')
    }
  }
}
</script>

<style scoped lang="scss">
.container{
  padding: 10px;
  .line1{
    display: flex;
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

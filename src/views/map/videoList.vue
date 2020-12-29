<template>
  <div class="container">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="视频" name="1">
        <ul>
          <el-scrollbar class="scrolls">
            <li v-for="item in list" :key="item.id">
              <div class="item" @click="open(item)">
                {{item.videoName}}
              </div>
              <svg-icon icon-class="dingwei" @click.native="point(item.videoName)"></svg-icon>
            </li>
          </el-scrollbar>
        </ul>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { locateToVideo } from '@/utils/mapConfig/gisLib/gis'
export default {
  props: ['list'],
  data() {
    return {
      activeNames: '0'
    }
  },
  methods: {
    open(item) {
      item.rtmp = item.h5Address
      this.$emit('checked', item)
    },
    point(name) {
      locateToVideo(name)
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  padding: 0 20px;
  ul {
    height: 600px;
    li {
      padding: 0 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 10px 0;
      .item {
        cursor: pointer;
      }
      .svg-icon {
        cursor: pointer;
      }
    }
  }
}
</style>

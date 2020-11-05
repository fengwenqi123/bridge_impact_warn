<template>
  <div class="drawer">
    <el-drawer
      :visible.sync="drawers"
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
</template>

<script>
export default {
  props: {
    videoList: {
      type: Array,
      default () {
        return []
      }
    },
    drawer: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    drawers: {
      get () {
        return this.drawer
      },
      set (val) {
        this.$emit('update:drawer', val)
      }
    }
  },
  data () {
    return {
      direction: 'ltr',
      clientHeight: document.body.clientHeight
    }
  },
  methods: {
    play (item) {
      this.$emit('checked', item)
    }
  }
}
</script>

<style scoped lang="scss">
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
</style>

<template>
  <div class="giscomponents">
    <ul class="clearfix">
      <li class="li1" @mouseenter="tabas1" @mouseleave="leave1">
        <div class="max">
          <svg-icon icon-class="display"></svg-icon>
          显示设置
        </div>
        <Mod_display class="displays" v-show="display"></Mod_display>
      </li>
    </ul>
  </div>
</template>

<script>
/* eslint-disable no-undef */

import Mod_display from './Mod_display.vue'

export default {
  name: 'giscomponents',
  components: {
    Mod_display
  },
  data () {
    return {
      active: null,
      signal: false,
      display: false,
      arr: [
        {
          name: '信号设置',
          icon: 'signal'
        },
        {
          name: '显示设置',
          icon: 'display'
        }
      ]
    }
  },
  methods: {
    tabas () {
      this.signal = true
    },
    leave () {
      this.signal = false
    },
    tabas1 () {
      this.display = true
    },
    leave1 () {
      this.display = false
    }
  }
}
</script>

<style scoped lang="scss">
  .giscomponents {
    ul {
      background: #fff;
      display: flex;
      padding: 0px 10px;

      li {
        position: relative;

        .max {
          height: 40px;
          line-height: 40px;
          border-right: 1px solid #e6e6e6;
          /*margin: 0 6px;*/
          padding: 0 10px;
        }
      }

      li:last-child {
        .max {
          border: none;
        }
      }

      .active {
        background: #e9e9e9;
      }
    }
  }
</style>

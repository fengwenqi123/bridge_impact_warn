<template>
  <!--船舶详情-->
  <div class="tabs">
    <div class="p1" :class="{'danger':shipInfo.shipType===3}"><i @click="closeTab" class="el-icon-circle-close"></i>
      <div class="name">{{shipInfo.shipName}}</div>
      <div class="con">
        <el-row>
          <el-col :span="14" class="font">
            <div class="grid-content bg-purple"><span>联系人：</span><span></span></div>
            <div class="grid-content bg-purple"><span>联系电话：</span><span></span></div>
          </el-col>
        </el-row>
      </div>
    </div>
    <tabs :shipName="shipInfo.shipName"></tabs>
  </div>
</template>

<script>
import tabs from '@/components/tabs'
export default {
  name: 'shipInfo',
  props: {
    shipInfo: {
      type: Object,
      default: null
    }
  },
  components: {
    tabs
  },
  methods: {
    closeTab () {
      this.$emit('closeTab')
    }
  }
}
</script>

<style scoped lang="scss">
.tabs {
  position: fixed;
  width: 420px;
  bottom: 20px;
  right: 20px;
  z-index: 2000;
  .danger {
    background: red !important;
  }
  .p1 {
    background: #ccc;
    height: 120px;
    background: #01579b;
    text-align: left;
    padding-right: 10px;
    padding-left: 10px;

    i {
      float: right;
      font-size: 20px;
      height: 30px;
      color: #fff;
      line-height: 30px;
      cursor: pointer;
    }

    .name {
      color: #fff;
      font-size: 24px;
      padding-top: 20px;
    }

    .con {
      margin-top: 20px;

      .el-row {
        display: flex;
        align-items: center;
      }

      .font {
        span {
          color: #fff;
        }
      }

      .buttons {
        .btn {
          .item {
            margin: 0 4px;
          }
        }
      }
    }
  }
}
</style>

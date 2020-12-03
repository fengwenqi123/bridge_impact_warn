<template>
  <div class="playback" id="playback">
    <playGis></playGis>
    <trackBack v-if="showTime" :timeArr="time"></trackBack>
    <div class="Giscomponents" style="position: absolute;right: 14px;top: 14px;">
<!--      <giscom></giscom>-->
    </div>
    <div class="setting">
      <div class="tab" v-if="!showTime">
        <el-tabs type="border-card" @tab-click="handleClick" v-model="activeName">
          <el-tab-pane name="1" label="轨迹回放" class="back2">
            <div class="main">
              <div class="shipType">
                <span>选择信号类型</span>
                <el-select v-model="shipType1" placeholder="请选择">
                  <el-option
                    v-for="item in shipTypeList1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="time">
                <p class="title">
                  选择回放时间
                </p>
                <div class="startTime">
                  <el-date-picker
                    v-model="shipTime[0]"
                    type="datetime"
                    placeholder="开始时间"
                    value-format="yyyy-MM-dd HH:mm:ss">
                  </el-date-picker>
                  <span>-</span>
                  <el-date-picker
                    v-model="shipTime[1]"
                    type="datetime"
                    placeholder="结束时间"
                    value-format="yyyy-MM-dd HH:mm:ss">
                  </el-date-picker>
                </div>
              </div>
              <div class="an" @click="shipPlay">
                <svg-icon icon-class="redplay"></svg-icon>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div v-if="showTime" class="list">
        <div class="title">
          区域轨迹回放
        </div>
        <div class="main">
          <div class="top">
            <div class="stop" @click="stopPlay">
              停止回放
            </div>
          </div>
          <div class="shipList">
            <playIndeterminate v-if="shipNameArr" :obj="shipNameArr"></playIndeterminate>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef,no-prototype-builtins */

import playGis from './playBackIframe.vue'
import trackBack from './index'
import playIndeterminate from './playbackIndeterminate.vue'
// import giscom from './Giscomponents'
import { timeToString } from '@/utils/index.js'
import { mapGetters } from 'vuex'
import { shipList } from '@/api/shipTrack.js'

export default {
  computed: {
    ...mapGetters([
      'center'
    ])
  },
  components: {
    playGis,
    trackBack,
    playIndeterminate
    // giscom
  },
  props: ['mmsi'],
  data () {
    return {
      activeName: '1',
      time: [timeToString(new Date().getTime() - 1800000), timeToString(new Date().getTime())],
      maxLatitude: null,
      maxLongitude: null,
      minLatitude: null,
      minLongitude: null,
      showTime: false,
      shipNameArr: null,
      shipType: 2,
      shipTypeList: [{
        value: 1,
        label: 'GPS船舶'
      }, {
        value: 2,
        label: 'AIS船舶'
      }],
      shipType1: 2,
      shipTypeList1: [{
        value: 1,
        label: 'GPS'
      }, {
        value: 2,
        label: 'AIS'
      }],
      shipName: '浙长兴货5028',
      shipTime: [timeToString(new Date().getTime() - 1800000), timeToString(new Date().getTime())],
      shipTypeTrack: 2,
      shipTrackTime: [timeToString(new Date().getTime() - 1800000), timeToString(new Date().getTime())]

    }
  },
  created () {
    this.getGisInfo()
  },
  mounted () {
    // setTimeout(() => {
    //   $('iframe[name="playback"]').get(0).contentWindow.pointTo(parseFloat(this.center[0]), parseFloat(this.center[1]))
    // }, 2000)
  },
  methods: {
    drowBoxs () {
      $('iframe[name="playback"]').get(0).contentWindow.drawBox()
    },
    play () {
      if (!$('iframe[name="playback"]').get(0).contentWindow.trackapp.hasOwnProperty('maxLatitude')) {
        this.$message({
          message: '请选绘制区域'
        })
        return
      }
      if (!this.time) {
        this.$message({
          message: '请选择时间'
        })
        return
      }
      this.maxLatitude = $('iframe[name="playback"]').get(0).contentWindow.trackapp.maxLatitude
      this.maxLongitude = $('iframe[name="playback"]').get(0).contentWindow.trackapp.maxLongitude
      this.minLatitude = $('iframe[name="playback"]').get(0).contentWindow.trackapp.minLatitude
      this.minLongitude = $('iframe[name="playback"]').get(0).contentWindow.trackapp.minLongitude
      $('iframe[name="playback"]').get(0).contentWindow.areaTrackQuery(this.time[0], this.time[1], this.minLongitude, this.maxLongitude, this.minLatitude, this.maxLatitude, this.shipType)
    },

    async ShipTrackPlay () {
      if (!$('iframe[name="playback"]').get(0).contentWindow.trackapp.hasOwnProperty('maxLatitude')) {
        this.$message({
          message: '请选绘制区域'
        })
        return
      }
      if (!this.shipTrackTime) {
        this.$message({
          message: '请选择时间'
        })
        return
      }
      $('iframe[name="playback"]').get(0).contentWindow.clearShipTrack()
      const maxLatitude = $('iframe[name="playback"]').get(0).contentWindow.trackapp.maxLatitude
      const maxLongitude = $('iframe[name="playback"]').get(0).contentWindow.trackapp.maxLongitude
      const minLatitude = $('iframe[name="playback"]').get(0).contentWindow.trackapp.minLatitude
      const minLongitude = $('iframe[name="playback"]').get(0).contentWindow.trackapp.minLongitude
      const data = await shipList(this.shipTrackTime[0], this.shipTrackTime[1], minLongitude, maxLongitude, minLatitude, maxLatitude, this.shipTypeTrack)
      data.data.forEach(item => {
        $('iframe[name="playback"]').get(0).contentWindow.areaShipTrack(item.positionBeanList)
      })
    },
    getGisInfo () {
      var _this = this
      window.addEventListener('message', _this.getGis, false)
    },
    getGis (e) {
      var _this = this
      if (e.data.act === 'playback') {
        if (e.data.msg.active === 'true') {
          _this.showTime = true
        }
        _this.shipNameArr = JSON.parse(e.data.msg.shipNameArr)
      }
    },
    stopPlay () {
      $('iframe[name="playback"]').get(0).contentWindow.areaTrackStop()
      $('iframe[name="playback"]').get(0).contentWindow.cleaBox()
      this.showTime = false
      this.shipNameArr = null
    },
    shipPlay () {
      if (!this.shipTime) {
        this.$message('请先选择时间')
        return
      }
      $('iframe[name="playback"]').get(0).contentWindow.addHistoryTrack(this.mmsi, this.shipTime[0], this.shipTime[1]/*, this.shipType1 */)
    },
    // tab切换事件
    handleClick (tab) {
      if (tab.name === '1' || tab.name === '2') {
        $('iframe[name="playback"]').get(0).contentWindow.clearHistoryTrack()
      }
    }
  }
}
</script>

<style scoped lang="scss">
  #playback {
    height: 100%;
    position: relative;
    .iframes{
      height: 100%;
    }
    .setting {
      position: absolute;
      top: 0px;
      display: inline-block;

      .tab {
        //width: 620px;
        padding-top: 16px;
        margin-left: 16px;

        .back1, .back2 {
          .main {
            background: #fff;

            .top {
              padding: 20px;
              display: flex;
              align-items: center;
              justify-content: space-between;

              .button {
                width: 200px;
                height: 34px;
                line-height: 34px;
                background: #01579B;
                text-align: center;
                border-radius: 4px;
                color: #FFF;
                cursor: pointer;
              }

              .an {
                .svg-icon {
                  font-size: 42px;
                  cursor: pointer;
                }
              }
            }

            .shipType {
              display: flex;
              justify-content: space-between;
              padding-left: 20px;
              padding-right: 20px;
              align-items: center;
              border-top: 1px solid rgba(230, 230, 230, 1);
              border-bottom: 1px solid rgba(230, 230, 230, 1);

              span {
                color: #9B9B9B;
              }
            }

            .time {
              .title {
                text-indent: 20px;
                color: #9B9B9B;
                height: 42px;
                border-bottom: 1px solid rgba(230, 230, 230, 1);
                line-height: 42px;
              }
            }
          }
        }

        .back2 {
          .an {
            border-top: 1px solid rgba(230, 230, 230, 1);
            text-align: center;

            .svg-icon {
              font-size: 42px;
              cursor: pointer;
            }
          }
        }
      }

      .list {
        margin-top: 16px;
        margin-left: 16px;
        width: 400px;
        background: #fff;
        top: 230px;

        .title {
          height: 40px;
          line-height: 40px;
          background: #f8f8f8;
          text-indent: 16px;
        }

        .main {
          background: #fff;

          .top {
            padding: 20px;
            display: flex;
            align-items: center;
            justify-content: space-around;

            .close {
              width: 167px;
              height: 37px;
              line-height: 37px;
              text-align: center;
              background: rgba(136, 136, 136, 1);
              border-radius: 4px;
              color: #FFF;
              cursor: pointer;
            }

            .stop {
              width: 90px;
              height: 37px;
              background: rgba(220, 53, 69, 1);
              border-radius: 4px;
              line-height: 37px;
              text-align: center;
              color: #FFF;
              cursor: pointer;
            }

          }

          .shipList {
            ul {
              li {
                .li {
                  text-indent: 30px;
                  height: 39px;
                  line-height: 39px;
                  background: rgba(249, 250, 252, 1);
                  box-shadow: 0px -1px 0px 0px rgba(0, 0, 0, 0.02), 0px 2px 3px 0px rgba(0, 0, 0, 0.2);
                  border-radius: 1px;
                }
              }
            }
          }
        }
      }
    }

  }

  .startTime {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>

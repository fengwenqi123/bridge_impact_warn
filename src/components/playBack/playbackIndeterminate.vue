<template>
  <div class="playind">
    <el-checkbox class="all_checkbox" :indeterminate="isIndeterminate" v-model="checkAll"
                 @change="handleCheckAllChange">船舶列表
    </el-checkbox>
    <div style="margin: 5px 0;"></div>
    <div class="checkboxs">
      <el-scrollbar class="scrolls">
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
        </el-checkbox-group>
      </el-scrollbar>
    </div>
  </div>
</template>
<script>
/* eslint-disable prefer-const,no-undef */

export default {
  props: ['obj'],
  data () {
    return {
      checkAll: false,
      checkedCities: this.obj,
      cities: this.obj,
      isIndeterminate: true
    }
  },
  created () {
    $('iframe[name="playback"]').get(0).contentWindow.shipCheck(this.obj)
  },
  methods: {
    handleCheckAllChange (val) {
      this.checkedCities = val ? this.obj : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
    }
  },
  watch: {
    checkedCities () {
      $('iframe[name="playback"]').get(0).contentWindow.shipCheck(this.checkedCities)
    }
  }
}
</script>
<style scoped lang="scss">
  .checkboxs {
    height: 300px;
  }
</style>

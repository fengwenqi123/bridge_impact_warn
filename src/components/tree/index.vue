<template>
  <el-tree :data="datas" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
</template>

<script>
export default {
  props: ['zhzsListobj'],
  data () {
    return {
      datas: null,
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  watch: {
    zhzsListobj () {
      this.datas = this.zhzsListobj
    }
  },
  methods: {
    handleNodeClick (data) {
      console.log(data)
    }
  }
}
</script>

<style scoped lang="scss">

</style>

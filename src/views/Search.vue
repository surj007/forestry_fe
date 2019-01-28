<template>
  <div class="search">
    <div style="display: flex;">
      <div style="width: 400px;">
        <el-input placeholder="请输入评估账号链接" v-model="sAccount" clearable size="small"></el-input>
      </div>
      <el-button type="primary" size="small" style="margin-bottom: 15px;margin-left: 10px;" @click="">评估</el-button>
    </div>
    <el-table :data="$store.state.aConditionsTableData" border size="small">
      <el-table-column prop="sNum" label="编号" />
      <el-table-column prop="sGrade" label="等级" />
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      sAccount: ''
    }
  }
}
</script>

<style lang="less" scoped>

</style>



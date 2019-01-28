<template>
  <div id="app">
    <el-container>
      <el-header class="header">
        <span>梦幻西游</span>
        <el-select size="mini" style="margin-left: 25px;" v-model="sId" @change="hangleTopSelectChg">
          <el-option v-for="(item, index) in $store.state.aIdList" :key="index" :label="item.id" :value="item.id"></el-option>
        </el-select>
      </el-header>
      <el-container>
        <el-aside width="180px">
          <el-menu :default-active="sDefaultActive" router>
            <el-menu-item index="/detail">
              <i class="el-icon-menu"></i>
              <span slot="title">订阅详情</span>
            </el-menu-item>
            <el-menu-item index="/search">
              <i class="el-icon-search"></i>
              <span slot="title">估号系统</span>
            </el-menu-item>
            <el-menu-item index="/conditions">
              <i class="el-icon-setting"></i>
              <span slot="title">订阅条件设置</span>
            </el-menu-item>
            <el-menu-item index="/id">
              <i class="el-icon-edit-outline"></i>
              <span slot="title">ID设置</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    this.$store.dispatch('getIdList', this);
    this.$root.bus.$on('setTopSelect', () => {
      this.sId = this.$store.state.aIdList[0] ? this.$store.state.aIdList[0].id : '';
    });
  },
  watch: {
    $route() {
      this.sDefaultActive = '/' + this.$route.path.split('/')[1];
    }
  },
  data () {
    return {
      sDefaultActive: '/detail',
      sId: ''
    }
  },
  methods: {
    hangleTopSelectChg(id) {
      this.$store.commit('setId', id);
      this.$root.bus.$emit('changeId');
    }
  }
}
</script>

<style scope>
.el-header {
  display: flex;
  align-items: center;
  padding-left: 30px!important;
  background-color: #fafafa;
  color: #5c5c5c;
  border-bottom: 1px solid #e5e5e5;
  font-size: 20px;
}
.el-menu {
  height: calc(100vh - 60px);
}
</style>

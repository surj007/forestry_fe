<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: #2D3A4B;
  .content {
    .title {
      margin: 0 0 40px 0;
      color: #EEEEEE;
      font-size: 26px;
      font-weight: 700;
      text-align: center;
    }
    .icon-input {
      padding-top: 5px;
    }
  }
}
.w-450 {
  width: 450px;
}
</style>
<style>
.change-input__inner .el-input__inner {
  padding-left: 34px;
}
.change-button--primary .el-button--primary {
  width: 450px;
}
</style>

<template>
  <div class="login">
    <div class="content">
      <h1 class="title">后台管理系统</h1>

      <el-form :model="oFormData" :rules="rules" ref="loginForm">
        <el-form-item prop="sUsername">
          <div class="w-450">
            <el-input placeholder="请输入用户名" class="change-input__inner" v-model="oFormData.sUsername">
              <template slot="prefix">
                <div class="el-input__icon icon-20 icon-input">
                  <icon name="user"></icon>
                </div>
              </template>
            </el-input>
          </div>
        </el-form-item>
        <el-form-item prop="sPassword">
          <div class="w-450">
            <el-input placeholder="请输入密码" class="change-input__inner" type="password" v-model="oFormData.sPassword">
              <template slot="prefix">
                <div class="el-input__icon icon-20 icon-input">
                  <icon name="lock"></icon>
                </div>
              </template>
            </el-input>
          </div>
        </el-form-item>
        <el-form-item>
          <div class="change-button--primary">
            <el-button type="primary" size="medium" @click="formSubmit">登陆</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      oFormData: {
        sUsername: '',
        sPassword: ''
      },
      rules: {
        sUsername: [
          { required: true, message: '用户名不能为空', trigger: 'change' }
        ],
        sPassword: [
          { required: true, message: '密码不能为空', trigger: 'change' }
        ],
      }
    }
  },
  methods: {
    async formSubmit() {
      try {
        let valid = await this.$refs.loginForm.validate();
        if (valid) {
            await this.$store.dispatch('login', {oLoginInfo: this.oFormData, oVm: this});
            //await this.$store.dispatch('getMenu', this);
            //this.$router.push('/');
        }
      }
      catch(err) {}
    }
  }
}
</script>

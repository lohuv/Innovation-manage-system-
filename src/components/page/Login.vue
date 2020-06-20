<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">后台管理系统</div>
            <el-form :model="loginForm"  @keyup.enter.native="submitForm('login')" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-input type="text" id="aaa" style=" display:none;visibility: hidden;" />
                <el-input type="password" id="aba" style="  display:none; visibility: hidden;" /><!-- 欺骗360表单自动填充的2行代码-->
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="password"
                        v-model="loginForm.password"
                        @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('login')">登录</el-button>
                </div>
                <router-link to="/getPassword" > <el-button type="text" size="large" >找回密码</el-button></router-link>
            </el-form>
        </div>
    </div>
</template>

<script>
    import { reqputlogin} from '../../api/login.js'
    import {  mapMutations } from 'vuex';
    import {setToken,setAuth,getToken,setProfile} from '../../utils/Func'
export default {
    data: function() {
        return {
            loginForm: {
                username: '',
                password: '',
                loginType:3,
            },
            userToken:'',
            authorarr:[],
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            },
        };
    },
    methods: {
        async login(Form){
            try {
                const res  =  await reqputlogin(Form);
                if(res.msg ==='success'){
                  //  console.log(res.msg);
                    this.authorarr = res.datas.authorityIds;
                    this.userToken = res.datas.token;
                    this.profile = res.datas.profile;
                    setToken( this.userToken);
                    setAuth( this.authorarr );
                    setProfile( this.profile);
                    this.$router.push('/');
                    this.$message.success('登录成功');
                }
            }catch (e) {
             //   this.$message.error("登录失败")
            }
        },
        putgetPassword(){
            this.$router.push({path:'/getPassword'});
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let formData = new FormData();
                    for(const key in this.loginForm){
                        formData.append(key,this.loginForm[key])
                    }
                    this.login(formData);

                } else {
                    return false;
                }
            });

        },
    },
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to bottom right, #FFEFBA 0%, #FFFFFF 100%);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 173, 96, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}

</style>
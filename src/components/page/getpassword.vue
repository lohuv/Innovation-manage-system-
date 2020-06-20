<template>
    <div class="getpasswordBox">
        <div class="passFormBox">

                <div class = "headBox">找回密码</div>
                <el-form :model = "getpasswordForm" class="bind_phone"  ref="getpasswordForm"  :rules="passRules" label-width="100px" >
                    <el-form-item label ="手机号"  prop = "phone">
                        <el-input   v-model = "getpasswordForm.phone"></el-input>
                    </el-form-item>
                    <el-form-item label ="验证码"  prop = "BindCode">
                        <el-input style="width: 220px;" v-model = "getpasswordForm.BindCode"></el-input>
                        <el-button type="primary" v-show = show @click="getBindCode(getpasswordForm.phone)">获取验证码</el-button>
                        <el-button type="success" disabled = true v-show = !show >已发送{{count}}</el-button>
                    </el-form-item>
                    <el-form-item label ="密码"  prop = "password">
                        <el-input  type="password" v-model = "getpasswordForm.password"></el-input>
                    </el-form-item>
                    <el-form-item label ="确认新密码" prop = "checkpassword" >
                        <el-input  type="password" v-model = "getpasswordForm.checkpassword"></el-input>
                    </el-form-item>
                    <el-button class="subButton" @click="submit('getpasswordForm')">提交</el-button>
                    <router-link to="/Login" style="margin-left: 10px"><span>返回登录</span></router-link>
                </el-form>
        </div>
    </div>
</template>

<script>
    import {reqGetRetrievePwdCode,reqGetRetrievePwdUpdate} from '../../api/getpassword.js'
    import { validPhone,validatePhoneCode } from '../../utils/validate';
    export default {
        name: 'getpassword',
        data(){
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入新密码'));
                } else {
                    if (this.getpasswordForm.checkpassword !== '') {
                        this.$refs.getpasswordForm.validateField('checkpassword');
                    }
                    callback();
                }
            };
            let validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.getpasswordForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return{
                successFlag:false,
                show:true,
                count:60,
                getpasswordForm:{
                    phone:'',
                    BindCode:'',
                    password:'',
                    checkpassword:'',
                },
             passRules: {
                    phone:[{required: true, message: '请输入手机号', trigger: 'blur'},
                        {validator:validPhone ,trigger: 'blur'}],
                 password: [
                     { validator: validatePass, trigger: 'blur' }
                 ],
                 BindCode:[{validator :validatePhoneCode,trigger:'blur'}],
                 checkpassword: [
                     { validator: validatePass2, trigger: 'blur' },
                     { min: 6, max: 16, message: '长度在 6到16之间', trigger: 'blur' }
                 ],

             }

            }
        },
        methods:{
            //获得验证码
            async GetRetrievePwdCode(phone) {
                try {
                    const res = await reqGetRetrievePwdCode(phone);
                    this.successFlag = false;
                    if (res.msg === "success") {
                        this.successFlag = true;
                        this.$message({
                            type: 'success',
                            message: '验证码发送成功',
                        })
                    }
                } catch (e) {
                    this.$message.error("验证码发送失败")
                }
            },

            //修改密码
                async updatePassword(phone,code,password){
                    try {
                        const res = await reqGetRetrievePwdUpdate(phone, code, password);
                        if (res.msg === "success") {
                            this.$message({
                                type: 'success',
                                message: '密码修改成功',
                            })
                        } else {
                            this.$message.error(res.msg)
                        }
                    } catch (e) {
                        this.$message.error("密码修改失败")
                    }
                },
            getBindCode(phone){
                if(!phone)
                this.$message.error('请输入手机号');
                else{
                    this.GetRetrievePwdCode(phone).then(()=>{
                        this.countdown();
                    })
                }
            },

            //发送验证码倒计时
            countdown(){
                const TIME_COUNT = 60;
                if (!this.timer) {
                    this.count = TIME_COUNT;
                    this.show = false;
                    this.timer = setInterval(() => {
                        if (this.count > 0 && this.count <= TIME_COUNT) {
                            this.count--
                        } else {
                            this.show = true;
                            clearInterval(this.timer);
                            this.timer = null
                        }
                    }, 1000)

                }
            },
            //提交密码
            submit(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.updatePassword(this.getpasswordForm.phone,this.getpasswordForm.BindCode,this.getpasswordForm.password);
                    } else {

                        return false;
                    }
                });

            }

        }
    };
</script>

<style scoped>
    
.getpasswordBox{
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to bottom right, #FFEFBA 0%, #FFFFFF 100%);
}

    /deep/.passFormBox{
        border-radius: 20px;
        width: 450px;
        height: 400px;
        margin: auto;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 173, 96, 0.3);
        overflow: hidden;
    }
    /deep/.headBox{
        width: 450px;
        height: 40px;
        font-size: 20px;
        color: #FFFFFF;
        text-align: center;
        padding: 20px 0;
    }
    /deep/.subButton{
        display: block;
        margin: auto;
    }
    /deep/.el-form label{
        font-size: 13px;
    }
    /deep/.el-form-item{
        width: 420px;

    }

</style>
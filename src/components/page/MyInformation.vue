<template>
    <div class = "myInfo">
        <div class="center" ref = "center" >
            <el-tabs  style="height: 200px; ">
                <el-tab-pane label="我的信息"  >
                    <div class="Info" ref="Info">
                            <el-form class="InfoList" ref = "InfoList">
                                <el-form-item>
                                <el-avatar shape="square" :size="140" :fit="fit" :src="user.a_profile"></el-avatar>
                                </el-form-item>
                                <el-form-item label="用户名：">
                                    <span v-if = user.a_name>{{user.a_name}}</span>
                                    <span v-else class="red">暂无信息</span>
                                </el-form-item>
                                <el-form-item label="账号：">
                                    <span v-if = user.a_account>{{user.a_account }}</span>
                                    <span v-else class="red">暂无信息</span>
                                </el-form-item>
                                <el-form-item label="用户角色：">
                                    <span v-if = user.r_name >{{user.r_name }}</span>
                                    <span v-else class="red">暂无信息</span>
                                </el-form-item>
                                <el-form-item label="邮箱：">
                                    <span v-if = user.a_email>{{ user.a_email }}</span>
                                    <span v-else class="red">暂无信息</span>
                                </el-form-item>
                                <el-form-item label="地址：">
                                    <span v-if =  user.a_address>{{ user.a_address }}</span>
                                    <span v-else class="red">暂无信息</span>
                                </el-form-item>
                                <el-form-item label="联系电话：">
                                    <span v-if = user.a_phone>{{ user.a_phone }}</span>
                                    <span v-else class="red">暂无信息</span>
                                </el-form-item>
                                <el-form-item label="创建时间：">
                                    <span v-if =  user.a_create_time >{{ user.a_create_time }}</span>
                                    <span v-else class="red">暂无信息</span>
                                </el-form-item>
                                <el-form-item label="登录次数：">
                                    <span v-if =user.a_login_time >{{ user.a_login_time }}</span>
                                    <span v-else class="red">暂无信息</span>
                                </el-form-item>
                            </el-form>
                        </div>
                </el-tab-pane>
                <el-tab-pane label="修改信息" >
                    <div class="modify" ref = "modify">
                        <el-dialog
                                center
                                width="350px"
                                :append-to-body="true"
                                :visible.sync="avatarVisible"
                        >
                            <div class="imgbox">
                                <el-upload
                                        class="avatar-uploader"
                                        action="#"
                                        :show-file-list="false"
                                        :http-request = "getfile"
                                        accept=".jpg,.jpeg,.png"
                                        :before-upload="beforeAvatarUpload"
                                        >
                                    <el-image v-if="imageUrl" :src="imageUrl"  class="avatar"></el-image>
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </div>
                            <span slot="footer" class="dialog-footer">
    <el-button @click="avatarVisible = false">取 消</el-button>
    <el-button type="primary" @click="avatarVisible = false">确 定</el-button>
  </span>
                        </el-dialog>
                        <el-form class = "modifyForm" ref="InfoForm" :model="InfoForm" :rules="InfoRules">

                            <el-form-item>
                            <div class="avatarBox" @click="avatarModify">
                                <el-popover
                                        placement="top-start"
                                        trigger="hover"
                                        content="点击更换头像">
                                    <el-avatar slot="reference" class="avatar" shape="square" :size="140" :src="Newprofile"></el-avatar>
                                </el-popover>
                            </div>
                            </el-form-item>
                            <p @click="bindVisible = true" v-show = "bindFlag">  还未绑定手机 去绑定</p>
                            <p @click="unbindVisible = true" v-show = "!bindFlag">解除绑定</p>
                            <el-form-item label="姓名" prop = "name">
                                <el-input v-model.trim="InfoForm.name"></el-input>
                            </el-form-item>
                            <el-form-item label="邮箱" prop = "email">
                                <el-input v-model="InfoForm.email"></el-input>
                            </el-form-item>
                            <el-form-item label="地址" prop = "address">
                                <el-input v-model="InfoForm.address"></el-input>
                            </el-form-item>
                                <div class="foot">
                                <el-button   type="primary" @click="submit('InfoForm')" >提交</el-button>
                                </div>
                        </el-form>
                    </div>
                </el-tab-pane>

                <el-tab-pane label="修改密码" >
                    <div class="modifypass">
                        <el-form :model="passwordForm" ref="passwordRulesForm"  :rules="passRules"  >
                            <el-form-item label="旧密码" prop="oldPass">
                                <el-input type="password" v-model="passwordForm.oldPass" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="新密码" prop="newPass">
                                <el-input type="password" v-model="passwordForm.newPass" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="确认新密码" prop="checkPass">
                                <el-input type="password" v-model="passwordForm.checkPass" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <div class = "foot">
                                <el-button  type="primary"  @click="passwordSubmit('passwordRulesForm')">提交</el-button>
                                </div>
                            </el-form-item>
                        </el-form>

                    </div>
                </el-tab-pane>
                <el-dialog
                        title="手机号绑定"
                        :visible.sync="bindVisible"
                        width="500px"
                        center
                        :before-close="handleClose">
                    <el-form class="bind_phone" label-width="90px" :rules="bindRules" :model="bindForm" ref="bindForm" >
                        <el-form-item label ="手机号" prop = "phone">
                            <el-input v-model="bindForm.phone"></el-input>
                        </el-form-item>
                        <el-form-item label ="验证码" prop = "code">
                            <el-input style="width: 220px;" v-model = "bindForm.code"></el-input>
                            <el-button type="success" v-show = show @click="BindCode(bindForm.phone)">获取验证码</el-button>
                            <el-button type="success" disabled v-show = !show >已发送{{count}}</el-button>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
    <el-button @click="bindVisible = false">取 消</el-button>
    <el-button type="primary" @click="bindPhone('bindForm')">确 定</el-button>
  </span>
                </el-dialog>
                <el-dialog
                        title="手机号解绑"
                        :visible.sync="unbindVisible"
                        width="500px"
                        center
                        :before-close="handleClose">
                    <el-form class="bind_phone" label-width="90px" :model="unBindForm" ref="unBindRulesForm"  :rules="unBindRules" >
                        <el-form-item label ="手机号" >
                            <el-input style="width: 260px;"  disabled v-model = "user.a_phone"></el-input>
                        </el-form-item>
                        <el-form-item label ="验证码" prop ="unBindCode" >
                            <el-input style="width: 150px;" v-model = "unBindForm.unBindCode"></el-input>
                            <el-button type="primary"  v-show = show @click="UnBindCode">获取验证码</el-button>
                            <el-button type="success" disabled  v-show = !show >已发送{{count}}</el-button>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
    <el-button @click="unbindVisible = false">取 消</el-button>
    <el-button type="primary" @click="unBindPhone('unBindRulesForm')">提 交</el-button>
  </span>
                </el-dialog>

            </el-tabs>
        </div>

    </div>
</template>

<script>
    import {reqGetPersonInfo,reqPutPwdModify,putPersonInfoModify,reqGetBindPhone,reqGetUnbindPhone,reqGetBindCode,
        reqGetUnBindCode} from '../../api/MyInformation.js'
    import {  mapMutations } from 'vuex';
    import { validPhone,validatePhoneCode } from '../../utils/validate';
    import {setProfile} from '../../utils/Func'
    export default {
      data(){
          let validatePass = (rule, value, callback) => {
              if (value === '') {
                  callback(new Error('请输入新密码'));
              } else {
                  if (this.passwordForm.checkPass !== '') {
                      this.$refs.passwordRulesForm.validateField('checkPass');
                  }
                  callback();
              }
          };
          let validatePass2 = (rule, value, callback) => {
              if (value === '') {
                  callback(new Error('请再次输入密码'));
              } else if (value !== this.passwordForm.newPass) {
                  callback(new Error('两次输入密码不一致!'));
              } else {
                  callback();
              }
          };
          return{
              bindFlag:false,//控制显示绑定手机号消息
              show:true,
              timer:0,
              count:60,
              successFlag:true,//验证码发送成功
              unBindForm:{
                  unBindCode:'',
              },

              bindVisible:false,
              unbindVisible:false,
              form:{},
              Newprofile:'',
              url:'',
              avatarVisible:false,
              fit:'scale-down',
              user:{},
              imageUrl: '',
              InfoForm:{
                 address:'',
                  email:'',
                  name:'',
              },
              passwordForm:{
                  oldPass:'',
                  newPass: '',
                  checkPass: '',
              },
              bindForm:{
                  code:'',
                  phone:'',
              },
              bindRules:{
                  code:[{validator :validatePhoneCode,trigger:'blur'}],
                  phone:[ { required: true, message: '请输入手机号', trigger: 'blur' },
                      {validator :validPhone,trigger:'blur'}]
              },


              InfoRules:{
                  name:[
                      { required: true, message: '请输入姓名', trigger: 'blur' },
                      { max: 20, message: '姓名过长', trigger: 'blur' }
                  ],

                  email:[
                      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                  ]
              },

              unBindRules:{
                  unBindCode:[{validator:validatePhoneCode,trigger:'blur'}],
              },

              passRules: {
                  newPass: [
                      { validator: validatePass, trigger: 'blur' }
                  ],
                  checkPass: [
                      { validator: validatePass2, trigger: 'blur' },
                       { min: 6, max: 16, message: '长度在 6到16之间', trigger: 'blur' }
                  ],
                  oldPass: [
                       { required: true, message: '请输入旧密码', trigger: 'blur' },
                      { min: 6, max: 16, message: '长度在 6到16之间', trigger: 'blur' }
                  ]
              }
          }
      },
        mounted(){
          this.getMyInfo();
          this.cssStyle();
        },
        methods:{

            //获得个人数据
            async getMyInfo(){
                try{
                    const res = await reqGetPersonInfo();
                    // js最重要的是验null 要不然后面的代码可能不运行
                    if(!res.info) return;
                    this.Newprofile = res.info.a_profile;
                    //将头像保存到vuex中
                    setProfile(this.Newprofile);
                    this.user = res.info;
                    if(this.user.a_address==='null')
                        this.user.a_address='';
                    if(!this.user.a_phone){
                        this.bindFlag = true;
                    }
                    if(this.user.a_phone){
                        this.bindFlag = false;
                    }
                    if(this.user.a_email==='null')
                        this.user.a_email='';
                    if(this.user.a_name==='null')
                        this.user.a_name='';
                    this.user.a_create_time = this.dateString( this.user.a_create_time);
                    if( this.user.a_address)
                    this.InfoForm.address = res.info.a_address;
                    this.InfoForm.email = res.info.a_email;
                    this.InfoForm.name = res.info.a_name;
                }catch (e) {
                   // ;
                }
            },
            //修改密码
            async passwordModify(form){
                try{
                    const res = await reqPutPwdModify(form);
                    if(res.msg ==='success')
                        this.$message({
                            type:'success',
                            message:'修改成功'
                        });
                    else
                        this.$message.error(res.msg)
                }catch (e) {


                    //;
                }
            },
            //修改个人信息
            async myInfoModify(form){
                try {
                    const res = await putPersonInfoModify(form);
                    if(res.msg ==='success')
                        this.$message({
                            type:'success',
                            message:'修改成功'
                        });
                }catch (e) {
                   // ;
                }
            },
            //绑定手机号
            async getBindPhone(phone,code){
                try{
                    const res = await reqGetBindPhone(phone,code);
                    if(res.msg === "success"){
                        this.$message({
                            type:'success',
                            message:"手机绑定成功"
                        });
                        this.getMyInfo();
                        this.count= 0;
                        this.bindVisible = false;
                    }

                }catch (e) {
                   // ;
                }
            },

            //解绑手机号
            async getUnbindPhone(code){
                try{
                    const res = await reqGetUnbindPhone(code);
                    if(res.msg === "success"){
                        this.$message({
                            type:'success',
                            message:"手机解绑成功"
                        });
                        this.unbindVisible = false;
                        this.getMyInfo();
                        this.count= 0
                    }
                }catch (e) {
                    // ;
                }
            },
            //发送解绑手机验证码
            async GetUnBindCode(){
                try{
                    const res = await reqGetUnBindCode();
                    this.successFlag = false;
                    if(res.msg === "success"){
                        this.successFlag = true;
                        this.$message({
                            type:'success',
                            message:'验证码发送成功',
                        })
                    }
                }catch (e) {
                    this.$message.error("验证码发送失败")
                }
            },
            //发送绑定手机验证码
            async GetBindCode(phone){
                try{
                    const res = await reqGetBindCode(phone);
                    this.successFlag = false;
                  if(res.msg === "success"){
                      this.successFlag = true;
                      this.$message({
                          type:'success',
                          message:'验证码发送成功',
                      })
                  }
                }catch (e) {
                    this.$message.error("验证码发送失败")
                }
            },
            //提交修改后的信息
            submit(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let formData = new FormData();
                        for(const key in this.InfoForm){
                            formData.append(key,this.InfoForm[key])
                        }
                        this.myInfoModify(formData).then(()=>{
                            this.getMyInfo();
                        });
                    } else {

                        return false;
                    }
                });

            },

            //确认修改密码
            passwordSubmit(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let form = {};
                        form.oldPwd = this.passwordForm.oldPass;
                        form.newPwd = this.passwordForm.newPass;
                        let formData = new FormData();
                        for(const key in form){
                            formData.append(key,form[key])
                        }
                        this.passwordModify(formData);
                    } else {
                        return false;
                    }
                });

            },

            //发送解绑手机验证码
            UnBindCode(){
                this.GetUnBindCode().then(() => {
                    if(this.successFlag)
                        this.countdown();
                })
            },
            //解绑手机号
            unBindPhone(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.getUnbindPhone(this.unBindForm.unBindCode);
                    } else {
                        return false;
                    }
                });
            },
            //发送绑定手机验证码
            BindCode(phone) {
                if (!phone) {
                    this.$message.error("请输入手机号");
                } else {
                    this.GetBindCode(phone).then(() => {
                        if(this.successFlag)
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
            //绑定手机
            bindPhone(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.getBindPhone(this.bindForm.phone,this.bindForm.code);

                    } else {
                        return false;
                    }
                });
            },

            avatarModify(){
                this.avatarVisible = true;
            },
            //得到图片文件
            getfile(file){
                this.imageUrl = URL.createObjectURL(file.file);
                this.InfoForm.profile = file.file;
                 this.Newprofile = URL.createObjectURL(file.file);
            },
            //图片格式验证
            beforeAvatarUpload(file) {
                let types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png'];

                const isImage = types.includes(file.type);

                const isLtSize = file.size / 1024 / 1024 < 5;

                if (!isImage) {

                    this.$message.error('上传图片只能是 JPG、GIF、BMP、PNG 格式!');

                    return false;

                }

                if (!isLtSize) {

                    this.$message.error('上传图片大小不能超过 5MB!');

                    return false;

                }

            },
            //关闭弹窗
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            //css样式
            cssStyle(){
                let info = document.getElementsByClassName('Info')[0];
                let Modify = document.getElementsByClassName('modify')[0];
                let centerheight = document.getElementsByClassName("center")[0].offsetHeight;
                info.style.height = centerheight-100+'px';
                Modify.style.height = centerheight-100+'px';

            }


        }


    };
</script>

<style scoped>

    .myInfo{
        width: 100%;
        height: 100%;
        background-image: linear-gradient(to bottom right, #FFEFBA 0%, #FFFFFF 100%);
        overflow: hidden;
    }
    .myInfo .center{
        border: 20px solid white;
        width: 35%;
        min-width: 400px;
        height: 100%;
        background:#99CCCC;
        margin:  auto;
        border-radius: 4px;
        box-sizing:border-box;
        -moz-box-sizing:border-box; /* Firefox */
        -webkit-box-sizing:border-box; /* Safari */
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }
    /deep/.el-dialog{
        width: 360px;

    }
    /deep/.modify{
        width: 100%;
        overflow-x: hidden;
        overflow-y: auto;
    }
    /deep/ .modify .modifyForm{
        width: 80%;
        margin: auto;

    }

    /deep/ .avatar:hover{
        background:rgba(0,0,0,0.4);
    }
    /deep/ .el-tabs__item{
        color: #FFFFFF;
    }
    /deep/ .Info{
        overflow-x: hidden;
        overflow-y: auto;
        position:relative;
        width: 100%;
        margin: auto;
    }
   /deep/ .InfoList{
       font-family: "Helvetica Neue";
       width: 80%;
       color: #FFFFFF;
       height: 100%;
       margin: auto;
       font-size: 44px;
    }
   /deep/.avatarBox{
       width: 140px;
       height: 140px;
       margin: auto;
   }
   /deep/.el-avatar{
       display: block;
       margin: auto;
   }
   /deep/ label{
       color: #FFFDC0;
   }
   /deep/.modifypass{
       width: 100%;
   }
    /deep/.modifypass .el-form{
        width: 70%;
        margin: auto;
    }
   /deep/ .el-tabs__item.is-active{
       color: #FFFFCC !important;
   }
   /deep/ .el-tabs__active-bar{
       background:#FFFFCC !important;
   }

    /deep/ .imgbox{
        width: 250px;
        height: 250px;
        margin: auto;
    }
   /deep/ .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
   /deep/ .el-upload--text{
       width: 250px;
       height: 250px;
       margin: auto;
   }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 250px;
        height: 250px;
        line-height: 250px;
        text-align: center;
    }
    /deep/.red{
        color: #dd6161;
    }
    /deep/.foot {
        width: 100%;
    }
    /deep/.foot .el-button {
        display: block;
        margin: auto;
    }
    /deep/.bind_phone .el-form{
        width: 450px
    }
    /deep/.el-dialog .el-form label{
        color: #606266 !important;
    }
    /deep/.modifyForm p{
        background-color: rgba(255,255,255,0.5);
        font-family: "Helvetica Neue";
        text-align: center;
       font-size: 16px;
        color: #ff6768;
    }


</style>
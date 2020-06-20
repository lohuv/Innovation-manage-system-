<template>
    <div class="PersonInfo">
        <div class = "header_backup">
            <el-select style=" margin-top:12px;margin-left: 10px;width: 150px;" v-model="type"  @change="PersonInfoSearch" placeholder="请选择状态">
                <el-option label="全部" value="0"></el-option>
                <el-option label="个人" value="1"></el-option>
                <el-option label="企业" value="2"></el-option>
            </el-select>
            <el-select style="margin-left: 10px;width: 150px;" v-model="dele"  @change="PersonInfoSearch" placeholder="请选择状态">
                <el-option label="正常" value="0"></el-option>
                <el-option label="已删除" value="1"></el-option>
            </el-select>

            <el-button type="primary"    @click=" openAdd('PersonForm')"  style=";margin-left: 10px;margin-top: 10px">添加</el-button>
            <el-dialog title="添加个人用户"
                       :visible.sync="addPersonVisible"
                       width="500px"
                       :before-close="handleClose"
                       center
            >
                <template>
                        <div class="contain" style = "display:block;padding:30px ;" >
                            <el-form :model="PersonForm" status-icon :rules="rules"  ref="PersonForm" label-width="100px">
                                <el-form-item label="姓名" prop="name"  >
                                    <el-input v-model.trim="PersonForm.name" autocomplete="off"></el-input>
                                </el-form-item>

                                <el-form-item label="手机号" prop="account">
                                    <el-input   v-model="PersonForm.account" autocomplete="off" ></el-input>
                                </el-form-item>
                                <el-form-item label="身份" prop="type">
                                <el-select  disabled  v-model = "PersonForm.type" >
                                    <el-option label="个人" value="2"></el-option>
                                </el-select>
                                </el-form-item>
                            </el-form>
                        </div>
                </template>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="addPersonVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addPerson('PersonForm')">确 定</el-button>
                </div>
            </el-dialog>
            <el-popconfirm
                    @onConfirm = delAllPeron()
            title="确定删除选中的所有内容吗？">
                <el-button type="danger" slot="reference" v-show = "!deleflag" style=";margin-left: 10px;margin-top: 10px" >批量删除</el-button>
            </el-popconfirm>
            <el-popconfirm
                    @onConfirm = resetAllPeron()
                    title="确定删除选中的所有内容吗？">
                <el-button type="warning" slot="reference" v-show = "!deleflag" style=";margin-left: 10px;margin-top: 10px" >批量重置</el-button>
            </el-popconfirm>

            <div class="sear" style="width: 300px;height: 30px;float: right;margin-top: 13px">
                <el-input  type="text" v-model="search" @input="change($event)" class = "search" @keyup.enter.native="PersonInfoSearch" style="width: 200px;"></el-input>
                <el-button type="primary"  @click="PersonInfoSearch" >搜索</el-button>
            </div>

        </div>
        <div class="personInfoTable" >
            <el-table
                    :cell-style="set_cell_style"
                    height = "100%"
                    :data="users"
                    @selection-change="handleSelectionChange"
                    style="width: 100%;"

            >
                <el-table-column
                        :selectable="checkSelectable"
                        type="selection"
                        min-width="10%">
                </el-table-column>
                <el-table-column
                        min-width="10%">
                    <template slot-scope="scope">
                    <el-avatar :size="50" :src="scope.row.u_profile"></el-avatar>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="u_name"
                        label="用户名"
                        min-width="10%"
                        >
                </el-table-column>
                <el-table-column
                        prop="u_account"
                        label="用户账号"
                        min-width="10%"
                       >
                </el-table-column>
                <el-table-column
                        prop="u_type"
                        label="身份"
                        min-width="10%"
                >
                </el-table-column>
                <el-table-column
                        prop="u_sex"
                        label="性别"
                        min-width="10%"
                      >
                </el-table-column>
                <el-table-column
                        prop="u_is_agreed"
                        label="同意协议"
                        min-width="10%"
                       >
                </el-table-column>
                <el-table-column
                        prop="u_phone"
                        label="联系电话"
                        min-width="10%"
                      >
                </el-table-column>
                <el-table-column
                        label="操作"
                        min-width="18%"
                       >
                        <template slot-scope="scope">
                            <template>
                        <el-popconfirm
                                title="确定删除选中的信息吗？"
                                @onConfirm="handleDelete(scope.$index, scope.row)">
                            <el-button
                                    size="mini"
                                    type="text"
                                    slot = "reference"
                                    style="color: #F56C6C"
                                    v-show="!deleflag"
                            >删除</el-button>

                        </el-popconfirm>
                    </template>
                            <template>
                                <el-popconfirm
                                        title="确定重置选中的用户的密码吗？"
                                        @onConfirm="handleReset(scope.$index, scope.row)">
                                    <el-button
                                            size="mini"
                                            type="text"
                                            style="margin-left: 10px"
                                            slot = "reference"
                                            v-show="!deleflag"
                                    >重置密码</el-button>
                                </el-popconfirm>
                            </template>
                            <el-tooltip class="item"  effect="dark" content="该用户已被删除" placement="right">
                                <el-button style=" border: none; background-color: transparent; margin-right: 15px" size="mini" v-show="deleflag" icon="el-icon-warning"></el-button>
                            </el-tooltip>
                            <el-button size="mini" type="text" style="margin-left: 10px"  @click="OpenPersonDetails(scope.row)" >详情</el-button>
                            <el-button size="mini" type="text" v-show = "scope.row.e_status == 1&&scope.row.u_type =='个人'" style="margin-left: 10px"  @click="OpenCheck(scope.row)" >企业认证</el-button>
                            <el-dialog
                                    title="提示"
                                    :visible.sync="CheckVisible"
                                  width="600px"
                                    center>
                                <div >

                                </div>
                                <span slot="footer" class="dialog-footer">
                                    <el-button @click="centerDialogVisible = false">取 消</el-button>
                                    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
                                </span>
                            </el-dialog>

                        </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="block">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10]"
                    :page-size="page_size"
                    :pager-count="7"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="count"
            >
            </el-pagination>
        </div>
    </div>

</template>

<script>
    import { reqGetUserInfoList,reqPostAddUser,isExistAccount,deleteUsers,reSetUsers,reqEnterpriseCheck } from '../../api/userInfo';
    import{reqGetUserDetail} from '../../api/UserDetail'
    import{ validateCode,validPhone} from '../../utils/validate'

    export default {
        data() {
            return {
                userDetail:{},
                CheckVisible:false,
                count:0,
                deleflag:false,
                dele:'0',
                type:'0',
                search:null,
                page_size:10,
                currentPage:1,
                isExist:false,
                users : [],
                delarr:[],
                resetArr:[],
                multipleSelection:[],//多选的数据
                deleoptions:[{
                    label:'未删除',
                    value:0,
                },
                    {
                        label:'已删除',
                        value:1,
                    }
                  ],
                msg:"",
                PersonForm: {
                    name: '',
                    account: '',
                    type:'2',
                },

                rules: {
                    account: [
                        { required: true, message: '手机号不能为空', trigger: 'blur' },
                        {validator :validPhone,trigger:'blur'}
                    ],
                    name: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' },
                        {max:20,message: '姓名过长', trigger:'blur'}
                    ],
                    type: [
                        { required: true, message: '请选择身份', trigger: 'blur' }
                    ]
                },

                detailVisible: false,
                addPersonVisible: false,
                formLabelWidth: '120px'
            }
        },

        mounted(){
            this.getPersonInfo();
            this.cssStyle();
        },
        methods: {
            async getPersonInfo(type = this.type,page = this.currentPage,search = this.search,dele =this.dele){
                try {
                    const res = await reqGetUserInfoList(type,page,search ,dele);
                    this.count  =res.count;
                    if(dele == 0)
                        this.deleflag = false;
                    if(dele == 1)
                        this.deleflag = true;
                    if(!res.users){
                        this.users = [];
                        return
                    }
                    this.users = res.users;
                    for(let i = 0;i<this.users.length;i++){
                        if( this.users[i].u_is_agreed)
                            this.users[i].u_is_agreed = '同意';
                        else
                            this.users[i].u_is_agreed = '不同意';
                        if(this.users[i].u_type ==1)
                            this.users[i].u_type ='个人';
                        if(this.users[i].u_type == 2)
                            this.users[i].u_type ='企业';
                        if(this.users[i].u_sex == 1)
                            this.users[i].u_sex ='男';
                        else if(this.users[i].u_sex == 2)
                            this.users[i].u_sex ='女';
                        else
                            this.users[i].u_sex ='未知';
                    }
                }catch (e) {

                }
            },
            async addCompanyUser(form){
                try{
                    const res = await reqPostAddUser(form);
                   if(res.msg ==='success'){
                       this.$message({
                           type:'success',
                           message:'添加成功'
                       })
                       this.addPersonVisible = false;
                    }
                }catch (e) {
                    //
                }
            },
            async isExistAcc(account){
                try {
                    const res =  await isExistAccount(account);
                    if(res.isExist)
                        this.$message.error("账号已存在！");
                    this.isExist = res.isExist;
                }catch (e) {
                    //do nothing
                }
            },
            //重置密码
            async ResetPassword(arr = this.resetArr){
                try{
                    const res = await reSetUsers(arr);
                    if(res.msg === 'success'){
                        this.$message({
                            type:'success',
                            message:"重置密码成功"
                        })
                    }
                    this.multipleSelection = [];
                    this.resetArr = [];

                }catch (e) {
                    //  ;
                }
            },
            //确认删除
            async deleteUser(){
                const res = await  deleteUsers(this.delarr);
                if(res.msg == "success")
                    this.$message({
                        type:'success',
                        message:'删除成功'
                    });
                this.delarr = [];
                this.multipleSelection = [];
            },
            addPerson(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {

                        this.isExistAcc(this.PersonForm.account).then(()=>{
                            if(this.isExist === false){
                                this.addCompanyUser(this.PersonForm).then(()=>{
                                    this.getPersonInfo();
                                });
                            }
                        });


                    } else {
                        return false;
                    }
                });
            },
            //单行重置
            handleReset(index, row) {
                this.idx = index;
                this.msg=row;//每一条数据的记录
                this.resetArr.push(this.msg.u_id);//把单行删除的每条数据的id添加进放删除数据的数组
                this.ResetPassword().then(()=>{

                    this.getPersonInfo()
                });

            },
            //批量重置
            resetAllPeron() {
                const length = this.multipleSelection.length;
                if(!length){
                    this.$message.error("请先选中用户")
                }
                else{
                    for (let i = 0; i < length; i++) {
                        this.resetArr.push(this.multipleSelection[i].u_id);
                    }
                    this.ResetPassword().then(()=>{

                        this.getPersonInfo()
                    });
                }
            },


            //单行删除
            handleDelete(index, row) {
                this.idx = index;
                this.msg=row;//每一条数据的记录
                this.delarr.push(this.msg.u_id);//把单行删除的每条数据的id添加进放删除数据的数组
                this.deleteUser().then(()=>{
                    this.currentPage = 1;
                    this.getPersonInfo()
                });
            },
            //批量删除
            delAllPeron() {

                const length = this.multipleSelection.length;
                if(!length){
                    this.$message.error("请先选中用户")
                }
                else{
                    for (let i = 0; i < length; i++) {
                        this.delarr.push(this.multipleSelection[i].u_id);
                    }
                    this.deleteUser().then(()=>{
                        this.currentPage =1;
                        this.getPersonInfo()
                    });
                }
            },
            //打开添加弹框
            openAdd(formName){
                this.addPersonVisible = true;
                this.$nextTick(()=>{
                    this.$refs[formName].resetFields();

                })
            },
            //搜索
            PersonInfoSearch(){
                this.currentPage = 1;
                this.getPersonInfo(this.type, 1,this.search,this.dele );

            },
            change(e){
                this.$forceUpdate();
            },

            OpenPersonDetails(row){
                if(row.u_type == '个人')
                this.$router.push({path:'/PersonDetail/'+row.u_id});
                 if(row.u_type == '企业')
                    this.$router.push({path:'/Companydetail/'+row.u_id})
            },
          //跳转企业认证
            OpenCheck(row){
                    this.$router.push({path:'/checkEnterprise/'+row.u_id});
            },

            set_cell_style({row}){
                if (this.deleflag){
                    return 'color:#B0A4AE ;'
                }
            },
            checkSelectable(row){
                return !this.deleflag ;
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleSizeChange(val) {
                this.page_size = val;
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getPersonInfo();

            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            cssStyle(){
                let footHeight = document.getElementsByClassName('block')[0].offsetHeight;
                let tablebox = document.getElementsByClassName('personInfoTable')[0];
                let bodyHeight =  document.getElementsByClassName('PersonInfo')[0].offsetHeight;
                tablebox.style.height  = bodyHeight-footHeight-56+'px'
            },


        }
    }

</script>

<style scoped>
      .PersonInfo{
        width: 100%;
        height: 100%;
        background: #FFCCCC;
    }
      /deep/.personInfoTable{
          width: 100%;
      }
  /deep/.header_backup{
        height: 56px;
      min-width: 1200px;
        width: 100%;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }
  /deep/ .contain{
        width: 300px;
      height: 110px;
    }
  /deep/ .el-dialog {
      background-image: linear-gradient(to bottom right, #FFEFBA 0%, #FFFFFF 100%);
    }
  /deep/ .el-table thead {
        font-weight: 500;
    }
      /deep/.block{
          text-align: center;
      }

</style>
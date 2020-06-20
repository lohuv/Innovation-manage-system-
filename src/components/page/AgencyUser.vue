<template>
    <div class="AgencyUser">
        <div class = "c_header">
            <el-select v-model="dele" @change="search" style="margin-top: 13px; width: 150px; margin-left: 10px" placeholder="请选择状态">

                <el-option label="正常" value="0"></el-option>
                <el-option label="已删除" value="1"></el-option>
            </el-select>
            <el-popconfirm
                    @onConfirm = resetAll()
                    title="确定重置所有选中用户的密码？"
            >
                <el-button size="mini"  slot="reference"    v-show = "!deleflag" style="  background:#ff8a5c;color: white;margin-top: 13px;margin-left: 10px">批量重置密码</el-button>
            </el-popconfirm>
            <el-popconfirm
                    @onConfirm = delAll()
                    title="确定删除所有选中用户？"
            >
                <el-button size="mini"   v-show = "!deleflag"  slot="reference"  style="  background:#F56C6C;color: white;margin-top: 13px;margin-left: 10px">批量删除</el-button>
            </el-popconfirm>
            <el-button type="success"  size = "mini" @click="openAddAgencyAdmin()" style="margin-left: 10px">添加管理员</el-button>
            <el-dialog
                    title="添加代理机构管理员"
                    :visible.sync="addAdminVisible"
                    width="500px"
                    center
                    :before-close="handleClose">
                <div class="AddAgency" style = "display:block;" >

                    <el-form :model="AdminForm" status-icon :rules="AdminRules" ref="AdminForm"  style="width:100%">
                        <el-form-item label="账号编号" prop="accountNum"  >
                            <el-input v-model="AdminForm.accountNum" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="默认密码"  >
                            <el-input :disabled = true placeholder="000000" autocomplete="off"></el-input>
                        </el-form-item>

                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="addAdminVisible = false">取 消</el-button>
                     <el-button type="primary" @click="addSubmit('AdminForm')">确 定</el-button>
                </span>
            </el-dialog>
            <el-dialog
                    :visible.sync="confirmVisible"
                    width="400px"
                    center>
                <span slot="title">帐号：{{account}}</span>
                <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="confirmVisible = false">确 定</el-button>
  </span>
            </el-dialog>


        </div>
        <div class = "agencyUserTable">
        <template>
            <el-table
                    :cell-style="set_cell_style"
                    @selection-change="handleSelectionChange"
                    height="100%"
                    :data="agencyUsers"
                    style="width: 100%;"
                    >
                <el-table-column
                        type="selection"
                        :selectable="checkSelectable"
                        width="50">
                </el-table-column>
                <el-table-column
                        width="50">
                    <template slot-scope="scope">
                    <el-avatar :size="40" v-bind:src="scope.row.a_u_profile"></el-avatar>
                    </template>
                </el-table-column>

                <el-table-column
                        prop="a_u_username"
                        label="姓名"
                        width="170">
                </el-table-column>
                <el-table-column
                        prop="a_u_account"
                        label="账号"
                        >
                </el-table-column>

                <el-table-column
                        prop="a_u_sex"
                        label="性别"
                        >
                </el-table-column>
                <el-table-column
                        prop="a_u_type"
                        label="身份"
                        >
                </el-table-column>
                <el-table-column
                        prop="a_u_address"
                        label="住址"
                        >
                </el-table-column>
                <el-table-column
                        prop="a_u_phone"
                        label="联系电话"
                        >
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="200">
                    <template slot-scope="scope">
                    <el-popconfirm
                            @onConfirm = "handleReset(scope.$index, scope.row)"
                            title="确定重置密码"
                    >
                        <el-button  type = "text" size="mini" v-show="!deleflag" slot="reference" >重置密码</el-button>

                    </el-popconfirm>
                        <el-popconfirm
                                @onConfirm="handleDelete(scope.$index, scope.row)"
                                title="确定删除此用户？"
                        >
                            <el-button size="mini" type="text" v-show="!deleflag"  slot="reference" style="margin-left: 10px; color: #F56C6C" >删除</el-button>

                        </el-popconfirm>
                        <el-tooltip class="item"  effect="dark" content="该用户已被删除" placement="right">
                            <el-button style=" border: none; background-color: transparent;"  size="mini" v-show="deleflag" icon="el-icon-warning"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        </div>
        <div class="block">
            <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="page_size"
                    :page-sizes="[10]"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="count"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {resGetAgencyUserList,posAddAgencyAdmin,deleteAgencyUser,resetPasswd,isExistAccount} from '../../api/AgencyUser'
    import {validateAgencyAdmin, } from '../../utils/validate';
    export default {
        props:{
            id:{
                type:String,
                default:''
            }
        },
        data() {
            return {
                dele:'0',
                deleflag:false,
                isExist:false,
                account:'',
                addAdminVisible:false,
                confirmVisible:false,
                count:0,
                currentPage:1,
                page_size:10,
                idx :0,
                msg:"",
                agencyUsers: [],
                deleArr:[],
                resetArr:[],
                multipleSelection:[],
                AdminForm:{
                    agencyId:0,
                    accountNum:''
                },
                AdminRules:{
                    accountNum: [{validator:validateAgencyAdmin,trigger: 'blur'}
                   ],
                },

            }
        },
        watch:{
            $route(to,form){
                this.getAgencyUser()
            }
        },
        mounted(){
            this.cssStyle();
            this.getAgencyUser();
        },
        methods: {
            async getAgencyUser(page = this.CurrentPage,dele = this.dele){
                try {
                    const res = await resGetAgencyUserList(page,this.id,dele );
                    if(!res.agencyUsers){
                        this. agencyUsers = [];
                        return}
                    if(dele == 0){
                        this.deleflag =false;
                    }
                    if(dele == 1){
                        this.deleflag = true;
                    }
                    this.agencyUsers= res.agencyUsers;
                    for(let i = 0;i<this.agencyUsers.length;i++){
                        if(this.agencyUsers[i].a_u_type === 1)
                            this.agencyUsers[i].a_u_type ='业务员';
                        if(this.agencyUsers[i].a_u_type === 2)
                            this.agencyUsers[i].a_u_type ='代理人';
                        if(this.agencyUsers[i].a_u_type === 3)
                            this.agencyUsers[i].a_u_type ='后台管理员'
                    }
                    this.count = res.count;
                } catch (e) {
                    // do nothing
                }
            },
            //删除代理机构用户
            async deleAgencyUser(array = this.deleArr){
                try {
                    const res = await deleteAgencyUser(array);
                    if(res.msg === "success")
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                     this.deleArr = [];
                    this.multipleSelection = [];

                } catch (e) {
                    // do nothing
                }
            },
            //重置密码
            async ResetUserPasswd(array = this.resetArr){
                try {
                    const res = await resetPasswd(array);
                    if(res.msg == "success")
                        this.$message({
                            message: '重置成功',
                            type: 'success'
                        });
                    this.resetArr = [];
                    this.multipleSelection = [];
                } catch (e) {
                    // do nothing
                }
            },
            //添加代理机构管理员
            async AddAgencyAdmin(form = this.AdminForm){
                const res = await posAddAgencyAdmin(form);
                if(res.msg == "success"){
                    this.$message({
                        message: '添加成功',
                        type: 'success'
                    });
                    this.account = res.account;
                 this.confirmVisible = true;
                   this.addAdminVisible = false;
                }
            },

            //账号是否重复
            async isExistAcc(account){
                try {
                    const res =  await isExistAccount(account);
                    this.isExist = res.isExist;
                }catch (e) {
                    //do nothing
                }
            },
            //查询
            search(){
                this.CurrentPage=1;
                this.getAgencyUser(1,this.dele)
            },

            //打开增添用户界面
            openAddAgencyAdmin(id = this.id){
                this.clearForm();
                this.addAdminVisible = true;
                this.AdminForm.agencyId =  parseInt(id);
            },
            //清空表单
            clearForm(){
                this.AdminForm.agencyId = 0;
                this.AdminForm.accountNum ='';
            },
            //确认增加用户
            addSubmit(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.isExistAcc(this.AdminForm.accountNum).then(()=>{
                            if(this.isExist){
                                this.$message.error('账号已存在！')
                            }
                            else
                            {
                                this.AddAgencyAdmin().then(()=>{
                                    this.getAgencyUser()
                                });
                            }

                        });
                    } else {
                        return false;
                    }
                });


            },
         //单行删除用户
            handleDelete(index, row) {
                this.idx = index;
                this.msg=row;//每一条数据的记录
                this.deleArr.push(this.msg.a_u_id);//把单行删除的每条数据的id添加进放删除数据的数组
                this.deleAgencyUser().then(()=>{
                    this.CurrentPage=1;
                    this.getAgencyUser()
                });


            },
            //批量删除用户
            delAll() {
            if(!this.multipleSelection.length){
                this.$message.error('请先选中要删除的用户');

            }
            else{
                const length = this.multipleSelection.length;
                for (let i = 0; i < length; i++) {
                    this.deleArr.push(this.multipleSelection[i].a_u_id);
                }
                this.deleAgencyUser().then(()=>{
                    this.CurrentPage = 1;
                    this.getAgencyUser()
                });
            }

            },
            //单行重置用户密码
            handleReset(index, row) {
                this.idx = index;
                this.msg=row;//每一条数据的记录
                this.resetArr.push(this.msg.a_u_id);//把单行删除的每条数据的id添加进放删除数据的数组
                this.ResetUserPasswd();
            },
            //批量重置用户密码
            resetAll() {
                if(!this.multipleSelection.length){
                    this.$message.error('请先选中要重置的用户');
                }
                else{
                    const length = this.multipleSelection.length;

                    for (let i = 0; i < length; i++) {
                        this.resetArr.push(this.multipleSelection[i].a_u_id);
                    }
                    this.ResetUserPasswd();
                }

            },

            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleCurrentChange(val) {
                this.CurrentPage = val;
                this.getAgencyUser(this.CurrentPage,this.dele)
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            set_cell_style({row}){
                if (  this.deleflag == 1){
                    return 'color:#B0A4AE ;'
                }
            },
            checkSelectable(row){
                return this.deleflag == 0;
            },
            //css样式
            cssStyle(){
                let footHeight = document.getElementsByClassName('block')[0].offsetHeight;
                let tablebox = document.getElementsByClassName('agencyUserTable')[0];
                let bodyHeight =  document.getElementsByClassName('AgencyUser')[0].offsetHeight;
                tablebox.style.height  = bodyHeight-footHeight-56+'px'
            }

        }
    }

</script>

<style scoped>
   /deep/ .c_header{
        height: 56px;
        width: 100%;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
       min-width: 1200px;
    }
    .AgencyUser{
        width: 100%;
        height: 100%;
        background: #FFCCCC;
    }
   /deep/ .agencyUserTable{
        width: 100%;
    }

   /deep/ .el-table thead {
        font-weight: 500;
    }
    /deep/.c_header .el-select {
        margin-left: 10px;
        margin-top: 10px;
    }
    /deep/.block{
        text-align: center;
    }
</style>
<template>
    <div class = "SystemUser">
        <div class="c_header" >
            <el-select v-model="dele" @change="searching" style="margin-top: 10px; width: 150px; margin-left: 10px" placeholder="请选择状态">

                <el-option label="正常" value="0"></el-option>
                <el-option label="已删除" value="1"></el-option>
            </el-select>
            <el-button type="primary"  size="mini" @click="openAdd" style="margin-right: 10px;margin-left: 10px;margin-top: 10px">增加</el-button>
            <el-dialog
                    title="增加系统用户"
                    :visible.sync="addVisible"
                    width="400px"
                    center
                    :before-close="handleClose">
                <template>
                    <div class="box">
                        <div class="contain">

                            <el-form :model="userInfoform" status-icon :rules="rules"  ref="userInfoform" style="width: 300px;" label-width="90px">

                                <el-form-item label="姓名" prop="name"  >
                                    <el-input v-model.trim="userInfoform.name" autocomplete="off" ></el-input>
                                </el-form-item>

                                <el-form-item label="账号" prop="account">
                                    <el-input   v-model="userInfoform.account" autocomplete="off" ></el-input>
                                </el-form-item>
                                <el-form-item label="角色" prop="roleId">
                                    <el-select v-model="userInfoform.roleId" placeholder="请选择用户角色">
                                        <el-option v-for="item in modifyForm.roles"
                                                   :key="item.r_name"
                                                   :label="item.r_name"
                                                   :value="item.r_id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="默认密码" >
                                    <el-input :disabled = true autocomplete="off" placeholder = "000000"></el-input>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                </template>
                <span slot="footer" class="dialog-footer">
    <el-button @click="addVisible = false"  size = "mini" >取 消</el-button>
    <el-button type="primary" @click="addUser('userInfoform') " size="mini">确 定</el-button>
  </span>
            </el-dialog>
                <el-popconfirm @onConfirm = delAll()
                        title="确定删除所有选中的用户？"
                >
                    <el-button slot="reference" type = "danger" v-show ="!deleflag"  size="mini" style = "margin-right:10px ;margin-top: 12px">批量删除</el-button>
                </el-popconfirm>

                <el-popconfirm @onConfirm = resetAll()
                        title="确定重置选中用户的密码"
                >
                    <el-button slot="reference" size="mini" v-show ="!deleflag"   type="warning" style = "margin-left: 10px;">批量重置</el-button>
                </el-popconfirm>
            <div class="sear">
                <el-input  v-model="search" type="text"  @keyup.enter.native="searching" class = "search" style="width: 200px;"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="searching" ></el-button>
            </div>
        </div>
        <div class = "TableBox">
                    <el-table
                            ref="filterTable"
                            :data="admins"
                            style="width: 100%;"
                            height = "100%"
                            :cell-style="set_cell_style"
                            @selection-change="handleSelectionChange"
                    >
                        <el-table-column
                                :selectable="checkSelectable"
                                label="全选"
                                type="selection"
                                min-width="5%">
                        </el-table-column>

                        <el-table-column
                                prop="a_name"
                                label="姓名"
                                column-key="name"
                                min-width="15%">
                        </el-table-column>

                        <el-table-column
                                prop="a_account"
                                label="账号"
                                min-width="20%"
                                :formatter="formatter_a"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="a_phone"
                                label="电话号码"
                                min-width="20%"
                                :formatter="formatter_p"
                        >
                        </el-table-column>

                        <el-table-column
                                prop="r_name"
                                label="身份"
                                min-width="20%"
                        >
                        </el-table-column>

                        <el-table-column label="操作"
                                         min-width="20%"
                                       >
                            <template slot-scope="scope">

                                    <el-button  type="text"  size="mini"  @click="openModify(scope.row.a_id,scope.row.r_name)"  v-show="scope.row.a_is_delete !== '1'&&scope.row.r_name !== '超级管理员'">
                                        修改
                                    </el-button>
                                <el-dialog
                                        title="修改用户角色"
                                        :visible.sync="modifyVisible"
                                        width="400px"
                                        center
                                        :before-close="handleClose">
                                    <el-form ref="modifyForm" :model="modifyForm" label-width="100px">
                                    <el-form-item label="用户角色">
                                    <el-select v-model="modifyForm.roleid" placeholder="请选择用户角色">
                                        <el-option v-for="item in modifyForm.roles"
                                                   :key="item.r_name"
                                                   :label="item.r_name"
                                                   :value="item.r_id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                    </el-form>

                                    <span slot="footer" class="dialog-footer">
            <el-button @click="modifyVisible = false">取 消</el-button>
            <el-button type="primary" @click="modifyRolesubmit">修改</el-button>
            </span>
                                </el-dialog>

                                    <el-popconfirm @onConfirm="handleDelete(scope.$index, scope.row)"
                                            title="确定删除改用户？"
                                    >
                                        <el-button slot="reference"  type="text" size="mini" style = " color: #F56C6C;margin-left: 10px" v-show="isflag(scope.row)">删除</el-button>
                                    </el-popconfirm>

                                <template>
                                    <el-popconfirm @onConfirm = "handleResetPasswd(scope.$index, scope.row)"
                                            title="确定重置密码"
                                    >
                                        <el-button slot="reference"  type = "text" size="mini" style = " margin-left: 10px"    v-show="isflag(scope.row)">重置</el-button>
                                    </el-popconfirm>
                                </template>

                                <el-button icon= el-icon-more-outline style="float: right; width: 12px;height: 25px;"  @click="adminDetail( scope.row.a_id )"  > </el-button>
                                <el-dialog

                                        :visible.sync="detailVisible"
                                        width="400px"
                                        height = "600px"
                                        :before-close="handleClose"
                                        center
                                        v-if="admin"
                                            >
                                        <div class = "head" style="width: 100%;height: 100px;" >
                                            <div class="avatar" style="height: 80px;width: 80px;margin: auto;"><el-avatar :size="90" :src="admin.a_profile" ></el-avatar></div>
                                        </div>
                                        <ul style="list-style: none ;color: #E86850;" >
                                            <p style="font-size: 30px ;text-align: center;margin-bottom: 20px">{{admin.a_name}}</p>
                                            <li><span></span></li>
                                            <li><span>账号: {{admin.a_account}}</span></li>
                                            <li><span>角色: {{admin.r_name}}</span></li>
                                            <li><span>联系电话: {{admin.a_phone}}</span></li>
                                            <li><span>邮箱：{{admin.a_email}}</span></li>
                                            <li><span>住址: {{admin.a_address}}</span></li>
                                            <li><span>创建时间: {{admin.a_create_time}}</span></li>
                                            <li><span>登录次数: {{admin.a_login_time}}</span></li>
                                        </ul>

                                </el-dialog>

                                <el-tooltip class="item"  effect="dark" content="该管理员已被删除" placement="right">
                                    <el-button style=" border: none; background-color: transparent;" size="mini" v-show="deleflag" icon="el-icon-warning"></el-button>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                </el-table>
            <div class="block">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[10]"
                        :pager-count="7"
                        :page-size="page_size"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="adminsCount"
                >
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import { reqGetSystemUserList,getAddAgencyAdmin,reqGetRoleDetail,isExistAccount,reqPostAddUser,deleteUser, resetPasswd,UserModify,reqGetAllRole} from '@/api/SystemUser';
    import{ validateCode} from '@/utils/validate'
    export default {
        data() {
            return {
            deleflag:false,
                dele:'0',
                search:null,
                row:[],
                modifyForm:{
                    roles:[],//角色id和角色名
                    rolename:'',
                    roleid:'',
                    userId:'',
                },
                adminsCount:0,
                page_size:10,
                currentPage:1,
                isExist:'',
                admins: [],
                adminId:'',
                delarr:[],
                resetArr:[],
                idx :0,
                msg:"",
                multipleSelection:[],//多选的数据
                modifyVisible:false,
                detailVisible: false,
                addVisible: false,
                admin: [],
                formLabelWidth: '120px',
                userInfoform: {
                    name:'',
                    account: '',
                    roleId: '',
                },
                DeleArr:[],
                rules: {
                    account: [
                        { required: true, message: '账号不能为空', trigger: 'blur' },
                        {validator :validateCode,trigger:'blur'}
                    ],
                    name: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' },
                        {max:20,message: '姓名过长', trigger:'blur'}
                    ]
                },

            };
        },

        mounted() {
            this.getSystemUserList();
            this.cssStyle();
        },

        methods: {
            async getSystemUserList(page =this.currentPage,search = this.search,dele =this.dele){
                try {
                    const res =  await reqGetSystemUserList(page,search,dele);
                    this.adminsCount = res.count;
                    if(!res.admins)
                    {
                        this.admins = [];
                        return
                    }
                    if(dele == 0)
                        this.deleflag =false;
                    if(dele ==1)
                        this.deleflag = true;
                    this.admins = res.admins;
                }catch (e) {
                   //do nothing
                }
            },
            //管理员详情
            async getAdminDetail(id  = this.adminId){
                try {
                    const res =  await reqGetRoleDetail(id);

                    let data  = res.admin;
                        data.a_create_time = this.dateString((data.a_create_time));

                    this.admin = data;

                }catch (e) {
                    //do nothing
                }
            },
            async getAllRole(){
               try{
                   const res =  await reqGetAllRole();
                   this.modifyForm.roles = res.roles;
               }catch (e) {

               }
            },
            async ModifyRole(uID,roleID){
                try{
                    if(!roleID){
                        this.$message.error("您未做修改");
                        return
                    }
                    const res =  await UserModify(uID,roleID);

                    if(res.msg === 'success'){
                        this.$message({
                            type:'success',
                            message:'操作成功'
                        });
                        this.modifyVisible = false;
                    }

                }catch (e) {

                }
            },
            async isExistAcc(account){
                try {
                    const res =  await isExistAccount(account);
                    this.isExist  = res.isExist;
                      if(res.isExist == true)
                         this.$message.error("账号已存在！")
                }catch (e) {
                    //do nothing
                }
            },
            async addAdmin(){
                try {
                    this.userInfoform.roleId = parseInt( this.userInfoform.roleId);

                    const res =  await reqPostAddUser(this.userInfoform);
                    if(res.msg === 'success'){
                        this.$message({
                            type:'success',
                            message:'操作成功'
                        });
                        this.addVisible = false;
                    }

                }catch (e) {
                    //do nothing
                }
            },

            //确认删除
            async deleteUser(){
                const res = await  deleteUser(this.delarr);
                if(res.msg == 'success')
                    this.$message({
                        type:'success',
                        message:'操作成功'
                    });
                this.delarr = [];
                this.multipleSelection = [];
            },

            //确定重置密码
             async resetPassword(){
                const res = await  resetPasswd(this.resetArr);
                 if(res.msg == 'success')
                     this.$message({
                         type:'success',
                         message:'操作成功'
                     });
                 this.resetArr = [];
                 this.multipleSelection = [];
            },
            //判断是否显示修改和删除按钮
            isflag(row){
                if(row.r_name ==='超级管理员')
                    return false;
                else{

                    if(!this.deleflag)
                        return true;
                    else
                        return false;
                }

            },

            //搜索s
            searching(){
                this.getSystemUserList(1,this.search);
            },

            //打开修改弹窗
            openModify(id,Name){
                this.modifyVisible = true;
                this.modifyForm.userId = parseInt(id);
                this.modifyForm.roleid = Name;
                this.getAllRole();
            },
            //确定修改
            modifyRolesubmit()
            {
                if(!this.modifyForm.roleid){
                    this.$message.error("请选择角色身份");
                return false
            }
               const uID = parseInt(this.modifyForm.userId);
               const roleID = parseInt(this.modifyForm.roleid);
                this.ModifyRole(uID,roleID).then(()=>{
                    this.getSystemUserList(this.currentPage,this.search);
                });
            },

            adminDetail(id){
                this.detailVisible =true;
                this.adminId =id;
                this.getAdminDetail();
            },

            openAdd(){
                this.getAllRole();
              this.addVisible = true;
              this.clear();
            },

            addUser(formName){
                this.$refs[formName].validate((valid) => {
                        if (valid) {
                            this.isExistAcc(this.userInfoform.account).then(()=>{
                                if(this.isExist != true){
                                    this.addAdmin().then(()=>{
                                        this.getSystemUserList(this.currentPage);
                                        this.isExist = false;
                                    });
                                }
                        })
                        } else
                            {
                                return false;
                            }
                });
            },

            //清空添加用户的表单内容
            clear() {
                this.userInfoform.name = '';
                this.userInfoform.account= '';
                this.userInfoform.roleId  ='';
            },


            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },


            //单行删除
            handleDelete(index, row) {
                this.idx = index;
                this.msg=row;//每一条数据的记录
                this.delarr.push(this.msg.a_id);//把单行删除的每条数据的id添加进放删除数据的数组
                this.deleteUser().then(()=>{
                    this.currentPage = 1;
                    this.getSystemUserList();
                });

            },
            //批量删除
            delAll() {
                const length = this.multipleSelection.length;
                if(!length){
                    this.$message.error("请先选中用户")
                }
                else{
                    for (let i = 0; i < length; i++) {
                        this.delarr.push(this.multipleSelection[i].a_id);
                    }
                    this.deleteUser().then(()=>{
                        this.currentPage = 1;
                        this.getSystemUserList();
                    });
                }


            },

            //单行重置密码
            handleResetPasswd(index, row){
                this.idx = index;
                this.msg=row;//每一条数据的记录
                this.resetArr.push(this.msg.a_id);//把单行删除的每条数据的id添加进放删除数据的数组
                this.resetPassword().then(()=>{
                    this.getSystemUserList(this.currentPage);
                });
            },
            //批量重置
            resetAll(){
                const length = this.multipleSelection.length;
                if(!length){
                    this.$message.error("请先选中用户！")
                }
                else{
                    for (let i = 0; i < length; i++) {
                        this.resetArr.push(this.multipleSelection[i].a_id);
                    }
                    this.resetPassword().then(()=>{
                        this.getSystemUserList(this.currentPage);
                    });
                }

            },


            set_cell_style({row}){
                if (this.deleflag == 1){
                    return 'color:#B0A4AE ;'
                }
            },
            checkSelectable(row){
                return this.deleflag == 0 && row.r_name !=='超级管理员';
            },

            formatter_a(row) {
                return row.a_account;
            },
            formatter_p(row) {
                return row.a_phone;
            },
            filterTag(value, row) {
                return row.roleName === value;
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleSizeChange(val) {
                this.page_size = val;
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getSystemUserList(this.currentPage);

            },
            cssStyle(){
                let footHeight = document.getElementsByClassName('block')[0].offsetHeight;
                let tablebox = document.getElementsByClassName('TableBox')[0];
                let bodyHeight =  document.getElementsByClassName('SystemUser')[0].offsetHeight;
                tablebox.style.height  = bodyHeight-footHeight-56+'px'
            },

            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
        },



    }
</script>

<style  scoped>
    .SystemUser{
        width: 100%;
        height: 100%;
        background: #FFCCCC;
        font-size: 16px;
    }
    /deep/.c_header{
        height: 56px;
        min-width: 1200px;
        width: 100%;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }
    /deep/.sear{
        width: 300px;
        height: 30px;
        float: right;
        margin-top: 13px
    }
   /deep/.SystemUser input{
        width: 270px;
        height: 30px;
    }

    /deep/.SystemUser .TableBox{
        width: 100%;
    }
  /deep/.el-dialog {

      background-image: linear-gradient(to bottom right, #FFEFBA 0%, #FFFFFF 100%);
    }

    /deep/.el-table thead {
        font-weight: 500;
    }
  /deep/.el-dialog .el-form-item__label{
        color: #e59572;
    }
   /deep/ .SystemUser .box .contain{
        padding: 20px;
        box-sizing:border-box;
        -moz-box-sizing:border-box; /* Firefox */
        -webkit-box-sizing:border-box; /* Safari */
    }
    /deep/.block{
        text-align: center;
    }

</style>

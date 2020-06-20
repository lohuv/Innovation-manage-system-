<template>
    <div class="Permission">
        <div class = "header_Permission">
            <el-button type="primary"   size="mini" @click="openAddVisible" style=" margin-left: 10px ;margin-top: 15px">增加</el-button>
            <el-dialog
                    title="增加角色"
                    :visible.sync="addRoleVisible"
                    width="30%"
                    center
                    :before-close="handleClose">
                <template>
                    <div class="box">
                        <div class="contain" style = "display:block;padding: 30px ;" >
                            <el-form :model="RoleForm" status-icon :rules="rules" ref="RoleForm" label-width="100px">
                                <el-form-item label="角色名称" prop="name">
                                    <el-input   v-model.trim = "RoleForm.name" autocomplete="off" ></el-input>
                                </el-form-item>
                                <el-form-item label="角色描述" prop="description">
                                    <el-input   v-model="RoleForm.description" autocomplete="off" ></el-input>
                                </el-form-item>

                            </el-form>
                        </div>
                    </div>

                </template>
                <span slot="footer" class="dialog-footer">
    <el-button @click="addRoleVisible = false" >取 消</el-button>
    <el-button type="primary" @click="addRole('RoleForm')" >确 定</el-button>
  </span>
            </el-dialog>
            <el-popconfirm
                    @onConfirm = delAll()
                    title="要删除所有选中的角色吗？">
                <el-button class = "BatchDele" type="danger"  size="mini" slot="reference" style=";margin-left: 10px;margin-top: 10px" >批量删除</el-button>
            </el-popconfirm>


        </div>
        <div class="TableBox" >
            <el-table
                    @selection-change="handleSelectionChange"
                    height="100%"
                    :data="roles"
                    width = "100%">
                <el-table-column
                        type="selection"
                        min-width="10%">
                </el-table-column>
                <el-table-column
                        prop="r_name"
                        label="角色姓名"
                        min-width="30%">
                </el-table-column>
                <el-table-column
                        prop="r_description"
                        label="角色描述"
                        min-width="30%">
                </el-table-column>
                <el-table-column
                        label="操作"
                        min-width="30%">
                    <template slot-scope="scope">
                        <el-popconfirm
                                @onConfirm="handleDelete(scope.$index, scope.row)"
                                title="确定删除？"
                        >
                            <el-button
                                    slot = "reference"
                                    size="mini"
                                    type="danger"
                                    style="float: left"
                            >删除</el-button>

                        </el-popconfirm>

                        <el-button type="primary" size="mini" @click=" openModifyVisible(scope.row)" style="float: left;margin-left: 10px">修改</el-button>

                        <el-dialog
                                :visible.sync="permissionVisible"
                                width="600px"
                                height="600px"
                                center
                                :before-close="handleClose">
                            <div class="PermissionDetail" style="width: 500px;height: 391px;  margin: auto">
                                <el-tabs type="border-card">
                                    <el-tab-pane label="权限修改" style="background: #f9a7a7;"  >
                                       <div class="modifyPer" style="width:500px;height: 310px; overflow:scroll;  position:relative">
                                            <el-form  label-width="150px"  style="width: 470px;" :inline="true" >

                                                <el-form-item label="代理机构管理">
                                                    <el-switch
                                                            v-model="permissonForm.value3"
                                                            active-color="#13ce66"
                                                            inactive-color="#ff4949">
                                                    </el-switch>
                                                </el-form-item>
                                                <el-form-item label="求职管理">
                                                    <el-switch
                                                            v-model="permissonForm.value4"
                                                            active-color="#13ce66"
                                                            inactive-color="#ff4949">
                                                    </el-switch>
                                                </el-form-item>
                                                <el-form-item label="企业招聘管理">
                                                    <el-switch
                                                            v-model="permissonForm.value5"
                                                            active-color="#13ce66"
                                                            inactive-color="#ff4949">
                                                    </el-switch>
                                                </el-form-item>
                                                <el-form-item label="案件管理">
                                                    <el-switch
                                                            v-model="permissonForm.value6"
                                                            active-color="#13ce66"
                                                            inactive-color="#ff4949">
                                                    </el-switch>
                                                </el-form-item>
                                                <el-form-item label="专利管理">
                                                    <el-switch
                                                            v-model="permissonForm.value7"
                                                            active-color="#13ce66"
                                                            inactive-color="#ff4949">
                                                    </el-switch>
                                                </el-form-item>
                                                <el-form-item label="用户管理">
                                                    <el-switch
                                                            v-model="permissonForm.value8"
                                                            active-color="#13ce66"
                                                            inactive-color="#ff4949">
                                                    </el-switch>
                                                </el-form-item>
                                                <el-form-item label="首页产品管理">
                                                    <el-switch
                                                            v-model="permissonForm.value9"
                                                            active-color="#13ce66"
                                                            inactive-color="#ff4949">
                                                    </el-switch>
                                                </el-form-item>
                                                <el-form-item label="数据统计">
                                                    <el-switch
                                                            v-model="permissonForm.value10"
                                                            active-color="#13ce66"
                                                            inactive-color="#ff4949">
                                                    </el-switch>
                                                </el-form-item>

                                                <el-form-item label="年费管理">
                                                    <el-switch
                                                            v-model="permissonForm.value12"
                                                            active-color="#13ce66"
                                                            inactive-color="#ff4949">
                                                    </el-switch>
                                                </el-form-item>
                                                <el-form-item label="新闻管理">
                                                    <el-switch
                                                            v-model="permissonForm.value13"
                                                            active-color="#13ce66"
                                                            inactive-color="#ff4949">
                                                    </el-switch>
                                                </el-form-item>

                                                <el-form-item label="聊天管理">
                                                    <el-switch
                                                            v-model="permissonForm.value15"
                                                            active-color="#13ce66"
                                                            inactive-color="#ff4949">
                                                    </el-switch>
                                                </el-form-item>
                                                <el-form-item label="专利转让">
                                                    <el-switch
                                                            v-model="permissonForm.value16"
                                                            active-color="#13ce66"
                                                            inactive-color="#ff4949">
                                                    </el-switch>
                                                </el-form-item>
                                                <el-form-item label="系统配置管理">
                                                    <el-switch
                                                            v-model="permissonForm.value17"
                                                            active-color="#13ce66"
                                                            inactive-color="#ff4949">
                                                    </el-switch>
                                                </el-form-item>
                                                <el-form-item label="广告管理">
                                                    <el-switch
                                                            v-model="permissonForm.value18"
                                                            active-color="#13ce66"
                                                            inactive-color="#ff4949">
                                                    </el-switch>
                                                </el-form-item>
                                                    <div class ="foot">
                                                    <el-button @click="roleCancel">取消</el-button>
                                                    <el-button type="primary" @click="roleModify" >提交</el-button>
                                                    </div>
                                            </el-form>
                                       </div>
                                    </el-tab-pane>
                                    <el-tab-pane label="信息修改" style="background: #EEA282" >
                                        <div class = "modifyInfo" style="width:500px;height: 320px; position:relative" >
                                                <el-form label-width="80px"  style=" position:absolute; width: 430px;height: 225px;margin-left:20px;margin-top: 50px"  :model="RoleForm">
                                                    <el-form-item label="角色名称" >
                                                        <el-input v-model="RoleForm.name" style="width: 200px;"></el-input>
                                                    </el-form-item>
                                                    <el-form-item label="角色描述">
                                                        <el-input
                                                                style="width: 300px;"
                                                                type="textarea"
                                                                :rows="5"
                                                                placeholder="请输入内容"
                                                                v-model="RoleForm.description">
                                                        </el-input>
                                                    </el-form-item>
                                                  <div CLASS="foot">
                                                      <div style="margin:auto;width: 180px;">
                                                        <el-button @click="resetRole">重置</el-button>
                                                        <el-button type="primary" @click="ModifyRoleInfo" >提交</el-button>
                                                          </div>
                                                  </div>
                                                </el-form>
                                        </div>
                                       </el-tab-pane>

                                </el-tabs>


                            </div>

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
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="count"
            >
            </el-pagination>
        </div>

    </div>
</template>

<script>
    import {reqGetPermissionList,deleteRole,posAddRole,
            reqGetRolePermission,updatePermission,
            updateRoleInfo } from '../../api/Permission';
    export default {
        data() {
            return {
                permissonForm:{
                    value3:false,
                    value4:false,
                    value5:false,
                    value6:false,
                    value7:false,
                    value8:false,
                    value9:false,
                    value10:false,
                    value12:false,
                    value13:false,
                    value14:true,
                    value15:false,
                    value16:false,
                    value17:false,
                    value18:false,

                },
                addRoleVisible:false,
                permissionVisible:false,
                count:0,
                page_size:10,
                currentPage:1,
                idx :0,
                id:'',
                formLabelWidth: '120px',
                msg :'',
                deleArr:[],
                multipleSelection:[],
                roles:[],
                rolesInfo:{
                    description: "",
                    name:"",
                    id:null,
                },//缓存修改前的角色数据
                RoleForm:{
                    description: "",
                    name:"",
                    id:null,
                },

                rules:{
                    name: [
                        { required: true, message: '名字不能为空', trigger: 'blur' },
                        { max:20, message: '角色名过长', trigger: 'blur' }
                    ],
                    description: [
                        { required: true, message: '描述不能为空', trigger: 'blur' }
                    ]
                },

            }
        },
        mounted(){
            this.getRoleList();
            this.cssStyle();
        },

        methods: {
            async getRoleList(page = 1) {
                try {
                    const res = await reqGetPermissionList(page);

                    this.count = res.count;
                    this.roles = res.roles;
                    if(!this.roles){
                        this.roles = [];
                    }
                } catch (e) {
                    // do nothing
                }
            },
            //增加角色
            async addroles(form) {
                try {
                    const res = await posAddRole(form);
                   if(res.msg === "success"){
                       this.addRoleVisible = false;
                       this.$message({
                           type:'success',
                           message:'添加成功！'
                       })
                   }
                } catch (e) {
                    // do nothing
                }
            },

            async deleteRoles(arr = this.deleArr) {
                try {
                    const res = await deleteRole(arr);
                    if(res.msg == "success")
                        this.$message({
                            type:'success',
                            message:'删除成功！'
                        });
                    this.deleArr = [];
                    this.multipleSelection = [];
                } catch (e) {
                    // do nothing
                }
            },
            //修改角色
            async modifyRoles(form = this.RoleForm) {
                try {
                    const res = await updateRoleInfo(form);
                    if(res.msg == "success")
                        this.$message({
                            type:'success',
                            message:'修改成功！'
                        });
                } catch (e) {
                    // do nothing
                }
            },
            //查看角色权限
            async getPermisson(id){
                try{
                    const res =await reqGetRolePermission(id);
                    const roleResources = res.roleResources;

                    this.permissonForm = {
                        value3:false,
                            value4:false,
                            value5:false,
                            value6:false,
                            value7:false,
                            value8:false,
                            value9:false,
                            value10:false,
                            value12:false,
                            value13:false,
                            value14:true,
                            value15:false,
                            value16:false,
                            value17:false,
                            value18:false,

                    };
                    for(let i = 0;i<roleResources.length;i++){
                        if(roleResources[i] === 3)
                            this.permissonForm.value3 = true;
                        if(roleResources[i] === 4)
                            this.permissonForm.value4 = true;
                        if(roleResources[i] === 5)
                            this.permissonForm.value5 = true;
                        if(roleResources[i] === 6)
                            this.permissonForm.value6 = true;
                        if(roleResources[i] === 7)
                            this.permissonForm.value7 = true;
                        if(roleResources[i] === 8)
                            this.permissonForm.value8 = true;
                        if(roleResources[i] === 9)
                            this.permissonForm.value9 = true;
                        if(roleResources[i] === 10)
                            this.permissonForm.value10 = true;
                        if(roleResources[i] === 12)
                            this.permissonForm.value11 = true;
                        if(roleResources[i] === 13)
                            this.permissonForm.value13 = true;
                        if(roleResources[i] === 15)
                        this.permissonForm.value15 = true;
                        if(roleResources[i] ===16)
                            this.permissonForm.value16 = true;
                        if(roleResources[i] ===17)
                            this.permissonForm.value17 = true;
                        if(roleResources[i] ===18)
                            this.permissonForm.value18 = true;

                    }
                }catch (e) {
                    //;
                }
            },

            //修改角色权限
            async PermissonModify(id,arr){
                try{
                    const res = await updatePermission(id,arr);
                    if(res.msg === "success")
                        this.$message({
                            type:'success',
                            message:'修改成功！'
                        });
                }catch (e) {
                    //;
                }
            },
            //角色权限
            getRolePermission(id){
                this.getPermisson(id);
            },

            //打开添加界面
            openAddVisible(){
                this.addRoleVisible = true;
                this.clearForm();
            },
            //清空表格
            clearForm(){
                this.RoleForm.id = null;
                this.RoleForm.description  = '';
                this.RoleForm.name = '';
            },
            //确认添加
            addRole(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.addroles(this.RoleForm).then(()=>{
                            this.getRoleList(this.currentPage);
                        });
                    } else {

                        return false;
                    }
                });

            },
            //打开修改界面
            openModifyVisible(row){
                this.msg = row;
                this.id = row.r_id;
                this.permissionVisible = true;
                this.RoleForm.id = row.r_id;
                this.RoleForm.name = row.r_name;
                this.RoleForm.description = row.r_description;
                this.rolesInfo.id = row.r_id;
                this.rolesInfo.name = row.r_name;
                this.rolesInfo.description = row.r_description;
                this.getRolePermission(row.r_id);
            },

            //确认修改角色权限
            roleModify(){
                let arr = [];
                if(this.permissonForm.value3 == true)
                    arr.push(3);
                if(this.permissonForm.value4 == true)
                    arr.push(4);
                if(this.permissonForm.value5 == true)
                    arr.push(5);
                if(this.permissonForm.value6 == true)
                    arr.push(6);
                if(this.permissonForm.value7 == true)
                    arr.push(7);
                if(this.permissonForm.value8 == true)
                    arr.push(8);
                if(this.permissonForm.value9 == true)
                    arr.push(9);
                if(this.permissonForm.value10 == true)
                    arr.push(10);
                if(this.permissonForm.value12 == true)
                    arr.push(11);
                if(this.permissonForm.value13 == true)
                    arr.push(13);
                if(this.permissonForm.value14 == true)
                    arr.push(14);
                if(this.permissonForm.value15 == true)
                    arr.push(15);
                if(this.permissonForm.value16 == true)
                    arr.push(16);
                if(this.permissonForm.value17 == true)
                    arr.push(17);
                if(this.permissonForm.value18 == true)
                    arr.push(18);


                this.PermissonModify(this.id,arr);
            },

            //确认修改角色信息
            ModifyRoleInfo(){
              this.modifyRoles().then(()=>{
                  this.getRoleList(this.currentPage);
              });
            },
            //重置角色权限
            roleCancel(){
                this.permissonForm = {
                    value3:false,
                        value4:false,
                        value5:false,
                        value6:false,
                        value7:false,
                        value8:false,
                        value9:false,
                        value10:false,
                        value11:false,
                        value13:false,
                        value14:true,
                        value15:false,
                        value16:false,
                };
                this.getPermisson(this.msg.r_id);
            },
            //重置修改角色
            resetRole(){
                this.RoleForm.id =  this.rolesInfo.id;
                this.RoleForm.description =  this.rolesInfo.description;
                this.RoleForm.name =  this.rolesInfo.name;
            },


            //单行删除
            handleDelete(index, row) {
                this.idx = index;
                this.msg=row;//每一条数据的记录
                this.deleArr.push(this.msg.r_id);//把单行删除的每条数据的id添加进放删除数据的数组
                this.deleteRoles().then(()=>{
                    this.currentPage = 1;
                    this.getRoleList();
                });

            },
            //批量删除
            delAll() {
                const length = this.multipleSelection.length;
                if(!length){
                    this.$message.error("请先选中角色")
                }
                else{
                    for (let i = 0; i < length; i++) {
                        this.deleArr.push(this.multipleSelection[i].r_id);
                    }
                    this.deleteRoles().then(()=>{
                        this.currentPage = 1;
                        this.getRoleList();
                    });
                }


            },


            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleSizeChange(val) {
                this.page_size = val;
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getRoleList(this.currentPage);
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
                let tablebox = document.getElementsByClassName('TableBox')[0];
                let bodyHeight =  document.getElementsByClassName('Permission')[0].offsetHeight;
                tablebox.style.height  = bodyHeight-footHeight-56+'px'
            }

        }
    }

</script>

<style  scoped>
    /deep/.header_Permission {
        height: 56px;
        width: 100%;
        min-width: 1200px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }
    /deep/.TableBox{
        width: 100%;
    }

    .Permission{
        width: 100%;
        height: 100%;
        background: #FFCCCC;
        font-size: 16px;
    }

    /deep/.Permission .el-form-item{
        height: 50px;
    }

    /deep/.Permission .el-form-item label{
       color: #FAFAFA;
    }
    /deep/.Permission .foot{
        width: 100%;
    }
    .el-table thead {
        font-weight: 500;
    }

   /deep/.el-dialog {
       background-image: linear-gradient(to bottom right, #FFEFBA 0%, #FFFFFF 100%);
    }

   /deep/.Permission .el-form-item{
       margin-top: 50px;
   }
    /deep/.foot{
        width: 150px;
        margin: auto;
    }
    /deep/.el-form{
        overflow-x: hidden;
        overflow-y: auto;

    }
    /deep/.block{
        text-align: center;
    }


</style>
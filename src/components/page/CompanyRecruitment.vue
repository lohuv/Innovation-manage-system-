<template>
    <div class="CompanyRecruitment">
        <div class = "c_header" >
            <el-button  type = 'text' @click="checkPublish()" style="margin-top: 12px;">选中可发布消息</el-button>
            <el-button  type = 'text' @click="checkCancel()">选中可取消消息</el-button>
            <el-button type = 'text' @click="clearSelectedChannels()">取消选中</el-button>
            <template>
                <el-popconfirm
                        @onConfirm="UpdateAll()"
                        title="确定发布选中的所有内容吗？">
                    <el-button type="primary" slot="reference" v-show = "C_publish" style=";margin-left: 10px;margin-top: 12px">批量发布 </el-button>
                </el-popconfirm>
            </template>
            <template>
                <el-popconfirm
                        @onConfirm="CancelAll()"
                        title="确定取消选中的所有内容吗？">
                    <el-button type="danger" slot="reference" v-show = "C_cancel" style=";margin-left: 10px;margin-top: 12px" >批量取消</el-button>
                </el-popconfirm>
            </template>

            <div class="sear" style="width: 300px;height: 30px;float: right;margin-top: 12px">
                <el-input  type="text" v-model="search"  @input="change($event)" style=" width: 200px;"></el-input>
                <el-button type="primary"  @click="recruitSearch" >搜索</el-button>
            </div>

        </div>

            <div class = "RecruitmentTable" >
                <template>
            <el-table
                    @selection-change="handleSelectionChange"
                    :data="recruitment"
                    width="100%"
                    ref = "recruitTable"
                     height="100%">
                <el-table-column
                        :selectable="checkSelectable"
                        label="全选"
                        type="selection"
                        min-width="5%">
                </el-table-column>
                <el-table-column min-width="5%" type="expand" label="详情">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="招聘职位:">
                                <span v-if = props.row.r_position >{{ props.row.r_position }}</span>
                                <span v-else class="red">暂无信息</span>
                            </el-form-item>
                            <el-form-item label="薪资待遇:">
                                <span v-if = props.row.r_salary >{{ props.row.r_salary }}</span>
                                <span v-else class="red">暂无信息</span>
                            </el-form-item>
                            <el-form-item label="福利待遇:">
                                <span v-if = props.row.r_welfare>{{ props.row.r_welfare }}</span>
                                <span v-else class="red">暂无信息</span>
                            </el-form-item>
                            <el-form-item label="职位描述:">
                                <span v-if = props.row.r_description  >{{ props.row.r_description }}</span>
                                <span v-else class="red">暂无信息</span>
                            </el-form-item>
                            <el-form-item label="岗位职责:">
                                <span v-if = props.row.r_duty>{{ props.row.r_duty }}</span>
                                <span v-else class="red">暂无信息</span>
                            </el-form-item>
                            <el-form-item label="职位要求:">
                                <span v-if = props.row.r_requirements >{{ props.row.r_requirements }}</span>
                                <span v-else class="red">暂无信息</span>
                            </el-form-item>
                            <el-form-item label="必备技能:">
                                <span v-if = props.row.r_skill>{{ props.row.r_skill }}</span>
                                <span v-else class="red">暂无信息</span>
                            </el-form-item>
                            <el-form-item label="学历要求:">
                                <span v-if = props.row.r_education  >{{ props.row.r_education }}</span>
                                <span v-else class="red">暂无信息</span>
                            </el-form-item>

                            <el-form-item label="招聘人数:">
                                <span v-if = props.row.r_number>{{ props.row.r_number}}</span>
                                <span v-else class="red">暂无信息</span>
                            </el-form-item>
                            <el-form-item label="工作经验:">
                                <span v-if = props.row.r_work_experience>{{ props.row.r_work_experience }}</span>
                                <span v-else class="red">暂无信息</span>
                            </el-form-item>
                            <el-form-item label="公司名称:">
                                <span v-if = props.row.r_company >{{ props.row.r_company }}</span>
                                <span v-else class="red">暂无信息</span>
                            </el-form-item>
                            <el-form-item label="联系人姓名:">
                                <span v-if = props.row.r_name >{{ props.row.r_name }}</span>
                                <span v-else class="red">暂无信息</span>
                            </el-form-item>

                            <el-form-item label="工作地点:">
                                <span v-if = props.row.r_location >{{ props.row.r_location }}</span>
                                <span v-else class="red">暂无信息</span>
                            </el-form-item>
                            <el-form-item label="联系电话:">
                                <span v-if = props.row.r_phone >{{ props.row.r_phone }}</span>
                                <span v-else class="red">暂无信息</span>
                            </el-form-item>
                            <el-form-item label="联系地址:">
                                <span v-if = props.row.r_address>{{ props.row.r_address }}</span>
                                <span v-else class="red">暂无信息</span>
                            </el-form-item>
                            <el-form-item label="招聘开始时间:">
                                <span v-if = props.row.r_create_time >{{ props.row.r_create_time }}</span>
                                <span v-else class="red">暂无信息</span>
                            </el-form-item>
                            <el-form-item label="招聘结束时间:">
                                <span v-if = props.row.r_finish_time >{{ props.row.r_finish_time }}</span>
                                <span v-else class="red">暂无信息</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                        min-width="16%"
                        label="招聘职位"
                        prop="r_position">
                </el-table-column>
                <el-table-column
                        min-width="15%"
                        label="薪资待遇"
                        prop="r_salary">
                </el-table-column>
                <el-table-column
                        min-width="16%"
                        label="公司名称"
                        prop="r_company">
                </el-table-column>

                <el-table-column
                        min-width="16%"
                        label="地址"
                        prop="r_location">
                </el-table-column>
                <el-table-column
                        min-width="16%"
                        label="招聘状态"
                        prop="r_status"
                >
                </el-table-column>
                <el-table-column   min-width="16%" label="操作">
                    <template slot-scope="scope">
                        <template>
                            <el-popconfirm
                                    @onConfirm="handleUpdate(scope.$index, scope.row)"
                                    title="确定发布这则信息吗？">
                                <el-button
                                        v-show="scope.row.r_status === '已取消'"
                                        size="mini"
                                        type = "success"
                                        slot="reference"
                                >发布</el-button>
                            </el-popconfirm>
                        </template>

                        <template>
                            <el-popconfirm
                                    @onConfirm="handleCancel(scope.$index, scope.row)"
                                    title="确定取消这则信息吗？">
                                <el-button
                                        v-show="scope.row.r_status === '进行中'"
                                        size="mini"
                                        type="danger"
                                        slot="reference"
                                >取消</el-button>

                            </el-popconfirm>
                        </template>

                    </template>
                </el-table-column>
            </el-table>
        </template>
    </div>

        <div class="block" >
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
    import {reqGetRecruitList,updateRecruit} from '@/api/CompanyRecruitment'
    export default {
        data() {
            return {
                C_publish:0,
                C_cancel:0,
                search:'',
                count:0,
                recruitment: [],
                updateArr:[],
                idx :0,
                msg:"",
                multipleSelection:[],//多选的数据
                page_size:10,
                currentPage:1,
                formLabelWidth: '120px',
            }
        },
        mounted(){
            this.getrecruitmentList();
            this.cssStyle();
        },

        methods: {
            async getrecruitmentList(page = 1,search = null) {
                try {
                    const res = await reqGetRecruitList(page,search);
                    const recruitment = res.recruitment;
                    for(let i = 0;i<recruitment.length;i++){
                        if(recruitment[i].r_status === 1)
                            recruitment[i].r_status = '进行中';
                        if(recruitment[i].r_status === 2)
                            recruitment[i].r_status = '已完成';
                        if(recruitment[i].r_status === 3)
                            recruitment[i].r_status = '已取消';
                        recruitment[i].r_create_time = this.dateString( recruitment[i].r_create_time);
                        recruitment[i].r_finish_time = this.dateString( recruitment[i].r_finish_time);
                    }
                  this.recruitment = recruitment;
                    this.count = res.count;
                } catch (e) {
                    // do nothing
                }
            },
            async UpdateJobInfo(array,status){
                const res = await updateRecruit(array,status);
                if(res.msg == 'success')
                    this.$message({
                        type:'success',
                        message:'操作成功'
                    });
                this.updateArr = [];
                this.multipleSelection =[];

            },

            //单行发布
            handleUpdate(index, row ){
                this.idx = index;
                this.updateArr.push(row.r_id);
                this.UpdateJobInfo(this.updateArr,1).then(()=>{
                    this.getrecruitmentList(this.currentPage,this.search);
                });

            },
            //单行取消

            handleCancel(index, row ){
                this.idx = index;
                this.updateArr.push(row.r_id);
                this.UpdateJobInfo(this.updateArr,3).then(()=>{
                    this.getrecruitmentList(this.currentPage,this.search);
                });

            },

            //批量发布
            UpdateAll(){
                const length = this.multipleSelection.length;
                if(!length){
                    this.$message.error("请先选中用户")
                }else{
                    for (let i = 0; i < length; i++) {
                        this.updateArr.push(this.multipleSelection[i].r_id);
                    }
                    this.UpdateJobInfo(this.updateArr,1).then(()=>{
                        this.getrecruitmentList(this.currentPage,this.search);
                    });
                }

            },
            //批量取消
            CancelAll() {
                const length = this.multipleSelection.length;
                if(!length){
                    this.$message.error("请先选中用户")
                }else{
                    for (let i = 0; i < length; i++) {
                        this.updateArr.push(this.multipleSelection[i].r_id);
                    }
                    this.UpdateJobInfo(this.updateArr, 3).then(()=>{
                        this.getrecruitmentList(this.currentPage,this.search);
                    });
                }


            },
            change(e){
                this.$forceUpdate();
            },
            recruitSearch(){
                this.getrecruitmentList(1,this.search);
            },
            checkSelectable(row){
                return row.r_status !== '已完成';
            },

            handleSelectionChange(val) {
                this.multipleSelection = val;
                if(this.multipleSelection[0]){
                    if(this.multipleSelection[0].r_status==='进行中'){
                        this.C_cancel = 1;
                        this.C_publish = 0;
                    }
                    if(this.multipleSelection[0].r_status==='已取消'){
                        this.C_cancel = 0;
                        this.C_publish = 1;
                    }
                }

                if(this.multipleSelection.length>1) {
                    for (let i = 1; i < this.multipleSelection.length; i++) {
                        if (this.multipleSelection[0].r_status && this.multipleSelection[i].r_status) {
                            if (this.multipleSelection[0].r_status !== this.multipleSelection[i].r_status) {
                                this.$message.error("您只能选中相同类型的信息");
                                this.$refs.recruitTable.toggleRowSelection(this.multipleSelection[i], false);
                                this.multipleSelection.splice(1, 1);
                                this.clearSelectedChannels(this.multipleSelection);
                            }
                        }
                    }
                }
            },

            //选中要取消的操作
            checkCancel(){
                if(this.recruitment){
                    if(this.multipleSelection[0]){
                        if(this.multipleSelection[0].r_status ==='已取消'){
                            this.$message.error("您只能选中相同类型的信息");
                            return false
                        }
                    }
                        let rows  = [];
                        for(let i = 0;i<this.recruitment.length;i++){
                            if(this.recruitment[i].r_status === '进行中')
                                rows.push(this.recruitment[i])
                        }
                        this.clearSelectedChannels(rows)
                }

            },
            //选中要发布的操作
            checkPublish(){
                if(this.recruitment){
                    if(this.multipleSelection[0]){
                        if(this.multipleSelection[0].r_status ==='进行中'){
                            this.$message.error("您只能选中相同类型的信息");
                            return false
                        }
                    }
                        let rows  = [];
                        for(let i = 0;i<this.recruitment.length;i++){
                            if(this.recruitment[i].r_status === '已取消')
                                rows.push(this.recruitment[i])
                        }
                        this.clearSelectedChannels(rows)
                    }

            },
            //消除选中
            clearSelectedChannels(rows){
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.recruitTable.toggleRowSelection(row, true);
                    });
                } else {
                    this.$refs.recruitTable.clearSelection();
                }
            },
            handleSizeChange(val) {
                this.page_size = val;
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getrecruitmentList(this.currentPage,this.search);

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
                let tablebox = document.getElementsByClassName('RecruitmentTable')[0];
                let bodyHeight =  document.getElementsByClassName('CompanyRecruitment')[0].offsetHeight;
                tablebox.style.height  = bodyHeight-footHeight-56+'px'
            },

        }
    }

</script>

<style scoped>


    /deep/.c_header{
        height: 56px;
        width: 100%;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }
    /deep/.RecruitmentTable{
        width: 100%;
    }
   /deep/ .demo-table-expand {
        font-size: 0;
    }
   /deep/ .demo-table-expand label {
        width: 100px;
        color: #99a9bf;
    }
    /deep/.demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    .CompanyRecruitment{
        width: 100%;
        height: 100%;
        background: #FFCCCC;
    }

   /deep/ .el-table thead {
        font-weight: 500;
    }
    /deep/.red{
        color: #dd6161!important;
    }
    /deep/.el-table__header-wrapper  .el-checkbox{
        display:none
    }
    /deep/.block{
        text-align: center;
    }

</style>
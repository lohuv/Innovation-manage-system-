<template>
    <div class = "jobHunting">
        <div class = "c_header" >
            <el-button  type = 'text' @click="checkPublish()" style="margin-top: 12px;">选中可发布消息</el-button>
            <el-button  type = 'text' @click="checkCancel()">选中可取消消息</el-button>
            <el-button type = 'text' @click="clearSelectedChannels()">取消选中</el-button>
            <template>
                <el-popconfirm
                        @onConfirm="UpdateAll()"
                        title="确定发布选中的所有内容吗？">
                    <el-button type="success"  v-show = "J_publish"  slot="reference" style=";margin-left: 10px;margin-top: 12px">批量发布 </el-button>
                </el-popconfirm>
            </template>
            <template>
                <el-popconfirm
                        @onConfirm="CancelAll()"
                        title="确定取消选中的所有内容吗？">
                    <el-button type="danger"   v-show = "J_cancel"  slot="reference" style=";margin-left: 10px;margin-top: 12px" >批量取消</el-button>
                </el-popconfirm>
            </template>

            <div class="sear" style="width: 300px;height: 30px;float: right;margin-top: 12px">
                <el-input  type="text"   v-model="search" @input="change($event)"  @keyup.enter.native="jobSearch" style=" width: 200px;"></el-input>
                <el-button type="primary" @click="jobSearch" >搜索</el-button>
            </div>

        </div>
        <div class="JobTable" >
        <template>
            <el-table
                    ref = "jobTable"
                    @selection-change="handleSelectionChange"
                    :data="jobInfos"
                    width="100%"
                    height="100%">
                <el-table-column
                        :selectable="checkSelectable"
                        label="全选"
                        type="selection"
                        min-width="5%">
                </el-table-column>
                <el-table-column type="expand"   min-width="5%" label="详情">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="期望职务:">
                                <span v-if =props.row.j_h_job_intention >{{ props.row.j_h_job_intention}}</span>
                                <span v-else class="red">暂无信息</span>
                            </el-form-item>
                            <el-form-item label="期望工作地点:">
                                <span v-if = props.row.j_h_for_address >{{ props.row.j_h_for_address }}</span>
                                <span v-else class="red">暂无信息</span>
                            </el-form-item>
                            <el-form-item label="期望薪资:">
                                <span v-if = props.row.j_h_for_salary >{{ props.row.j_h_for_salary }}</span>
                                <span v-else class="red">暂无信息</span>
                            </el-form-item>
                            <el-form-item label="工作经验:">
                                <span v-if =  props.row.j_h_work_experience>{{ props.row.j_h_work_experience}}</span>
                                <span v-else class="red">暂无信息</span>
                            </el-form-item>
                            <el-form-item label="性别:">
                                <span v-if =  props.row.j_h_sex>{{ props.row.j_h_sex}}</span>
                                <span v-else class="red">暂无信息</span>
                            </el-form-item>
                            <el-form-item label="年龄:">
                                <span v-if =  props.row.j_h_age >{{ props.row.j_h_age }}</span>
                                <span v-else class="red">暂无信息</span>
                            </el-form-item>


                            <el-form-item label="学历:">
                                <span v-if = props.row.j_h_education_background>{{ props.row.j_h_education_background }}</span>
                                <span v-else class="red">暂无信息</span>
                            </el-form-item>
                            <el-form-item label="求职创建时间:">
                                <span v-if = props.row.j_h_creat_time >{{ props.row.j_h_creat_time }}</span>
                                <span v-else class="red">暂无信息</span>
                            </el-form-item>
                            <el-form-item label="工作年限:">
                                <span v-if =  props.row.j_h_woker_years >{{ props.row.j_h_woker_years }}</span>
                                <span v-else class="red">暂无信息</span>
                            </el-form-item>

                            <el-form-item label="联系电话:">
                                <span v-if =  props.row.j_h_phone>{{ props.row.j_h_phone }}</span>
                                <span v-else class="red">暂无信息</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                        min-width="16%"

                       >
                    <template slot-scope="scope">
                        <el-avatar :size="40" :src="scope.row.j_h_image"></el-avatar>
                    </template>
                </el-table-column>
                <el-table-column
                        min-width="16%"
                        label="求职人姓名"
                        prop="j_h_name">
                </el-table-column>
                <el-table-column
                        min-width="16%"
                        label="期望职位"
                        prop="j_h_for_address">
                </el-table-column>
                <el-table-column
                        min-width="16%"
                        label="学历"
                        prop="j_h_education_background">
                </el-table-column>
                <el-table-column
                        min-width="16%"
                        label="联系电话"
                        prop="j_h_phone">
                </el-table-column>
                <el-table-column
                        prop="j_h_status"
                        label="求职状态"
                        min-width="16%">

                </el-table-column>
                <el-table-column min-width="16%" label="操作">
                    <template slot-scope="scope">
                        <template>
                            <el-popconfirm
                                    @onConfirm="handleUpdate(scope.$index, scope.row)"
                                    title="确定发布这则信息吗？">
                                <el-button
                                        v-show="scope.row.j_h_status === '已取消'"
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
                                        v-show="scope.row.j_h_status === '进行中'"
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
                    :pager-count="7"
                    :page-size="page_size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="count"
            >
            </el-pagination>
        </div>
    </div>
</template>
<script>


    import { reqGetjobInfo,putUpdateJobInfo } from '../../api/jobHunting';

    export default {
            data() {
            return {
                J_cancel:0,
                J_publish:0,
                search:'',
                count:0,
                updateArr:[],
                idx :0,
                msg:"",
                multipleSelection:[],//多选的数据
                page_size:10,
                currentPage:1,
                jobInfos: [],
                formLabelWidth: '120px'

            }
        },
        mounted(){
            this.getjobinfo();
            this.cssStyle();
    },
        methods: {
            async getjobinfo(page = 1,search = null){
                const res = await reqGetjobInfo(page,search);
                 const jobInfos = res.jobInfos;
                for(let i = 0;i<jobInfos.length;i++){
                    if(jobInfos[i].j_h_status ===1)
                        jobInfos[i].j_h_status = '进行中';
                    if(jobInfos[i].j_h_status ===2)
                        jobInfos[i].j_h_status = '已完成';
                    if(jobInfos[i].j_h_status ===3)
                        jobInfos[i].j_h_status = '已取消';
                    jobInfos[i].j_h_creat_time = this.dateString(jobInfos[i].j_h_creat_time);
                }
                this.jobInfos = jobInfos;
                this.count = res.count;
            },
            async UpdateJobInfo(array,status){
                const res = await putUpdateJobInfo(array,status);
                if(res.msg == 'success')
                    this.$message({
                        type:'success',
                        message:'操作成功'
                    });
                this.updateArr = [];
                this.multipleSelection = [];
            },
            //单行发布
            handleUpdate(index, row ){
                this.idx = index;
                this.updateArr.push(row.j_h_id);
                this.UpdateJobInfo(this.updateArr,1).then(()=>{
                    this.getjobinfo(this.currentPage,this.search);
                });
            },
            //单行取消

            handleCancel(index, row ){
                this.idx = index;
                this.updateArr.push(row.j_h_id);
                this.UpdateJobInfo(this.updateArr,3).then(()=>{
                    this.getjobinfo(this.currentPage,this.search);
                });

            },
            //批量发布
            UpdateAll(){
                const length = this.multipleSelection.length;
                if(!length){
                    this.$message.error("请先选中用户")
                }
                else{
                    for (let i = 0; i < length; i++) {
                        this.updateArr.push(this.multipleSelection[i].j_h_id);
                    }
                    this.UpdateJobInfo(this.updateArr,1).then(()=>{
                        this.getjobinfo(this.currentPage,this.search);
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
                        this.updateArr.push(this.multipleSelection[i].j_h_id);
                    }
                    this.UpdateJobInfo(this.updateArr, 3).then(()=>{
                        this.getjobinfo(this.currentPage,this.search);
                    });
                }
            },
            jobSearch(){
                this.getjobinfo(1,this.search);
            },
            change(e){
                this.$forceUpdate()
            },
            checkSelectable(row){
                return row.j_h_status !== '已完成';
            },

            handleSelectionChange(val) {
                this.multipleSelection = val;
                if(this.multipleSelection[0]){
                        if(this.multipleSelection[0].j_h_status==='进行中'){
                           this.J_cancel = 1;
                           this.J_publish = 0;
                        }
                    if(this.multipleSelection[0].j_h_status==='已取消'){
                        this.J_cancel = 0;
                        this.J_publish = 1;
                    }
                }
                if(this.multipleSelection.length>1){
                    for(let i = 1;i<this.multipleSelection.length;i++){
                        if (this.multipleSelection[0].j_h_status && this.multipleSelection[i].j_h_status ) {
                            if (this.multipleSelection[0].j_h_status !== this.multipleSelection[i].j_h_status) {
                                this.$message.error("您只能选中相同类型的信息");
                                this.$refs.jobTable.toggleRowSelection(this.multipleSelection[i], false);
                                this.multipleSelection.splice(i, 1);
                                this.clearSelectedChannels(this.multipleSelection);
                            }
                        }
                    }

                }

                },
            //选中要取消的操作
            checkCancel(){
                if(this.jobInfos){
                    if(this.multipleSelection[0]){
                        if(this.multipleSelection[0].j_h_status ==='已取消'){
                            this.$message.error("您只能选中相同类型的信息");
                            return false
                        }
                    }
                    let rows  = [];
                    for(let i = 0;i<this.jobInfos.length;i++){
                        if(this.jobInfos[i].j_h_status === '进行中')
                            rows.push(this.jobInfos[i])
                    }
                    this.clearSelectedChannels(rows)
                }

            },
            //选中要发布的操作
            checkPublish(){
                if(this.jobInfos){
                    if(this.multipleSelection[0]){
                        if(this.multipleSelection[0].j_h_status ==='进行中'){
                            this.$message.error("您只能选中相同类型的信息");
                            return false
                        }
                    }
                    let rows  = [];
                    for(let i = 0;i<this.jobInfos.length;i++){
                        if(this.jobInfos[i].j_h_status === '已取消')
                            rows.push(this.jobInfos[i])
                    }
                    this.clearSelectedChannels(rows)
                }

            },

            //消除选中
           clearSelectedChannels(rows){
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.jobTable.toggleRowSelection(row, true);
                    });
                } else {
                    this.$refs.jobTable.clearSelection();
                }
            },

            handleSizeChange(val) {
                this.page_size = val;
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getjobinfo(this.currentPage,this.search);
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
                let tablebox = document.getElementsByClassName('JobTable')[0];
                let bodyHeight =  document.getElementsByClassName('jobHunting')[0].offsetHeight;
                tablebox.style.height  = bodyHeight-footHeight-56+'px'
            },

        }
    }

</script>

<style scoped>
   /deep/ .c_header{
        height: 56px;
        width: 100%;
        min-width: 1200px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }
   .jobHunting{
       width: 100%;
       height: 100%;
       background: #FFCCCC;
   }

   /deep/.JobTable{
       width: 100%;
   }
    /deep/.demo-table-expand {
        font-size: 0;
    }
    /deep/.demo-table-expand label {
        width: 100px;
        color: #99a9bf;
    }
    /deep/.demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }

    /deep/.el-table thead {
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
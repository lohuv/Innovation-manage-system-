<template>
    <div class="backup">
        <div class = "header_backup">
            <el-popconfirm
                    @onConfirm = "BackupSubmit"
                    title="要新建备份吗？">
                <el-button type="primary" slot = "reference" style=";margin-left: 10px;margin-top: 13px">新建 </el-button>
            </el-popconfirm>

            <el-popconfirm
                    @onConfirm = "delAll"
                    title="要删除选中备份吗？">
                <el-button type="danger" slot = "reference" style=";margin-left: 10px;margin-top: 10px">批量删除 </el-button>
            </el-popconfirm>


            <div class="sear" >
                <dateTimePicker style="float: left;"  @transferDateTime="getDateTime" ></dateTimePicker>
                <el-input  type="text" class = "search" v-model = "s_name" @keyup.enter.native="search"   style="height: 30px;width: 200px;margin-left: 10px "></el-input>
            <el-button type="primary" @click="search"  style="margin-left: 10px">搜索</el-button>
        </div>
        </div>
        <div class="BackUpTable">
        <template>
            <el-table
                    @selection-change="handleSelectionChange"
                    height="100%"
                    :data="records"
                    style="width: 100%">
                <el-table-column
                        type="selection"
                        min-width="4%">
                </el-table-column>
                <el-table-column
                        prop="b_time"
                        label="备份时间"
                        min-width="24%">
                </el-table-column>
                <el-table-column
                        prop="b_people"
                        label="备份人"
                        min-width="24%">
                </el-table-column>
                <el-table-column
                        prop="type"
                        label="备份种类"
                        min-width="24%">
                </el-table-column>
                <el-table-column
                        label="操作"
                        min-width="24%">
                    <template slot-scope="scope">
                    <el-popconfirm
                            @onConfirm = handlebackupRecover(scope.row.b_url)
                                title="要还原该备份吗？"
                    >
                        <el-button
                                slot = "reference"
                                size="mini"
                                type="success"
                        >还原</el-button>
                    </el-popconfirm>
                        <el-popconfirm
                                @onConfirm = backupdele(scope.row)
                                title="要删除该备份吗？"
                        >
                            <el-button
                                    slot = "reference"
                                    size="mini"
                                    type="danger"
                                    style="margin-left:10px;"
                            >删除</el-button>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </template>
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
    import {reqGetBackupList,posbackupRecover,posDelebackup,reqGetbackup} from '../../api/Backup';
    import dateTimePicker from '../common/dateTimePicker';

    export default {
        components: {
            dateTimePicker
        },
        data() {
            return {
                count:0,
                page_size:10,
                currentPage:1,
                records: [],

                s_start:'',
                s_end:'',
                s_name:'',

                idx:'',
                msg:'',
                deleForm:{
                    filePaths:[],
                    ids:[]
                },
                multipleSelection:[],
                dialogTableVisible: false,
                dialogFormVisible: false,
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                formLabelWidth: '120px',

            }
        },
        mounted(){
            this.getBackupList();
            this.cssStyle();
        },
        methods: {
            //获取备份列表
            async getBackupList(end = this.s_end,start = this.s_start,name = this.s_name,page = this.currentPage){
                try {
                    const res = await reqGetBackupList(end,start,name,page);
                      let Records  = res.records;
                  this.count = res.count;
                    for(let i = 0;i<Records.length;i++){
                        Records[i].b_time = this.dateString( Records[i].b_time);
                    }
                    this.records = Records;
                } catch (e) {
                    // do nothing
            }
            },
            //备份还原
            async BackupRecover(str) {
                try {
                    const res = await posbackupRecover(str);
                    if(res.msg == "success")
                        this.$message({
                            type:'success',
                            message:'还原成功'
                        });
                    this.multipleSelection = [];
                } catch (e) {
                    // do nothing
                }
            },
            //备份操作
            async backup(){
                try{
                    const res = await reqGetbackup();
                    if(res.msg == "success")
                        this.$message({
                            type:'success',
                            message:'备份成功'
                        });
                }catch (e){
                    //;
                }
            },
            //删除备份
            async Delebackup(form){
                try{
                    const res = await posDelebackup(form);
                    if(res.msg === 'success') {
                        this.$message({
                            type: 'success',
                            message: '删除成功！'
                        });
                        this.currentPage = 1;
                        this.getBackupList();
                    }
                    this.multipleSelection =[];
                    this.deleForm.ids =[];
                    this.deleForm.filePaths =[];
                }catch (e) {
                  //  ;
                }
            },
            //单项删除
            backupdele(row){
                this.msg=row;//每一条数据的记录
                this.deleForm.filePaths.push(this.msg.b_url);//把单行删除的每条数据的id添加进放删除数据的数组
                this.deleForm.ids.push(this.msg.b_id);
                this.Delebackup(this.deleForm)
            },
            search(){
                this.getBackupList();
            },

            //批量删除
            delAll() {

                const length = this.multipleSelection.length;
                if(!length){
                    this.$message.error("请先选中备份！")
                }
                else{
                    for (let i = 0; i < length; i++) {
                        this.deleForm.filePaths.push(this.multipleSelection[i].b_url);
                        this.deleForm.ids.push(this.multipleSelection[i].b_id);
                    }
                    this.Delebackup(this.deleForm)
                }
            },

            //确认备份
            BackupSubmit(){
                this.backup().then(()=>{
                    this.getBackupList();
                });
                },

            //单项还原
            handlebackupRecover(url){
                this.BackupRecover(url).then(()=>{
                    this.getBackupList();
                });
            },
            //获得时间戳
            getDateTime(start,end){
                this.s_start = start;
                this.s_end =end;
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleSizeChange(val) {
                this.page_size = val;
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getBackupList(val);
            },
            cssStyle(){
                let footHeight = document.getElementsByClassName('block')[0].offsetHeight;
                let tablebox = document.getElementsByClassName('BackUpTable')[0];
                let bodyHeight =  document.getElementsByClassName('backup')[0].offsetHeight;
                tablebox.style.height  = bodyHeight-footHeight-56+'px'
            }
        }
    }

</script>

<style scoped>
    /deep/.header_backup {
        height: 56px;
        width: 100%;
        min-width: 1200px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }

     .backup{
        width: 100%;
        height: 100%;
        background: #FFCCCC;
    }
    /deep/ .BackUpTable{
        width: 100%;
    }

    /deep/.el-table thead {
        font-weight: 500;
    }
    /deep/.block{
        text-align: center;
    }
    /deep/.header_backup .sear{
        width: 65%;
        height: 80%;
        float: right;
        margin-top: 10px;
    }

</style>
<template>
    <div class="case_box">
        <div class="header_case">
            <el-select style="margin-left: 10px;margin-top: 13px" v-model="status" @change="CaseSearch"  placeholder="请选择状态">
                <el-option
                        v-for="item in Statusoptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <div class="sear" style="width: 300px;height: 30px;float: right;margin-top: 13px">
                <el-input type="text" class="search"  v-model="search"  @keyup.enter.native="CaseSearch" style="width: 200px;"></el-input>
                <el-button type="primary" @click="CaseSearch" icon="el-icon-search" ></el-button>
            </div>
        </div>
        <div class = "CaseTable">
        <template>
            <el-table
                    :data="cases"
                    height = "100%"
                    style="width: 100%;
                      ">
                <el-table-column
                        prop="c_agency_name"
                        label="代理机构"
                        min-width="12%">
                </el-table-column>
                <el-table-column
                        prop="c_patent_name"
                        label="专利名称"
                        min-width="12%">
                </el-table-column>
                <el-table-column
                        prop="c_patent_number"
                        label="申请号"
                        min-width="14%">
                </el-table-column>
                <el-table-column
                        prop="c_username"
                        label="客户名称"
                        min-width="12%">
                </el-table-column>
                
                <el-table-column
                        prop="c_type"
                        label="案件类型"
                        min-width="12%">
                </el-table-column>
                <el-table-column
                        prop="c_status"
                        label="案件状态"
                        min-width="12%">
                </el-table-column>
                <el-table-column
                        prop="c_create_time"
                        label="创建时间"
                        min-width="14%">
                </el-table-column>

                <el-table-column
                        label="操作"
                        min-width="12%">
                    <template slot-scope="scope">

                        <el-button size="mini"  type = "text"
                                   @click="wcaseDetail(scope.row.c_id)">详情
                        </el-button>
                        <el-button size="mini" type = "text" style="margin-left: 10px"
                                   @click="caseModify(scope.row.c_id)">修改
                        </el-button>
                        <el-dialog
                                title="案件修改"
                                :visible.sync="UpdateCaseVisible"
                                center
                                :before-close="handleClose"
                        >
                            <el-form :model="CaseForm" label-width="140px"  class="CaseForm" :rules="CaseRules" ref="refCaseForm"
                                   >
                                <el-form-item label="物流编号" prop = "logisticsNumber">
                                    <el-input v-model="CaseForm.logisticsNumber" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="代理费用" prop = "agencyFees">
                                    <el-input v-model.number="CaseForm.agencyFees" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="案件类型" prop="type">
                                    <el-select v-model="CaseForm.type" placeholder="请选择案件类别">
                                        <el-option label="发明专利申请" value='1'></el-option>
                                        <el-option label="实用" value='2'></el-option>
                                        <el-option label="外观申请" value='3'></el-option>

                                    </el-select>
                                </el-form-item>
                            </el-form>
                            <span slot="footer" class="dialog-footer">
                         <el-button @click="UpdateCaseVisible = false">取 消</el-button>
                         <el-button type="primary" @click="submitCase('refCaseForm')">修 改</el-button>
                         </span>
                        </el-dialog>
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
                        :total="caseCount"
                >
                </el-pagination>
            </div>

    </div>
</template>

<script >
    import { reqGetCaseDetail, reqGetCaseList ,reqPosCaseModify,reqPosCaseStatus} from '../../api/Case';
    import {validateNumber} from "../../utils/validate";

    export default {

        data() {
            return {
                status:'',
                times:[],
                page_size:10,
                currentPage: 1,
                caseCount:0,
                caseDetailVisible: false,
                UpdateCaseVisible: false,
                search:null,
                cases: [],
                caseDetail: {},
                Statusoptions:[],
                CaseForm: {
                    'agencyFees': '',
                    'id': '',
                    'logisticsNumber': '',
                    'type': ''
                },
                CaseRules: {
                    agencyFees: [
                        { validator:validateNumber,trigger:blur }
                      ],
                    type: [{ required: true, message: '请选择案件类别', trigger: 'blur' }]
                }

            };
        },
        mounted() {
            this.cssStyle();
        },
        created() {
            this.getCaseStatus();
            this.getCaseList(1,null,0);
        },

        // created:vue生命周期中的钩子函数，在这个时间点，data中的数据已经注入到响应式系统中
         methods: {
            //获得表格数据
            async getCaseList(page = this.currentPage,search = this.search,status = this.status) {
                try {
                    const res = await reqGetCaseList(page,search,status);
                    if(!res.cases) {
                        this.cases = [];
                        this.caseCount = res.count;
                        return;
                    }

                  const cases = res.cases;
                    for(let i  =0;i<cases.length;i++){
                       cases[i].c_create_time = this.dateString(cases[i].c_create_time);
                       if(cases[i].c_type == 1)
                           cases[i].c_type = '发明专利申请';
                        if(cases[i].c_type == 2)
                            cases[i].c_type = '实用';
                        if(cases[i].c_type == 3)
                            cases[i].c_type = '外观申请';
                    }
                    this.cases = cases;
                    this.caseCount = res.count;
                } catch (e) {

                }

            },
             //获得案件类型
             async getCaseStatus(){
                try{
                    const res = await reqPosCaseStatus();
                    this.Statusoptions.push({value:0, label:'全部'});
                    for(let item in res.caseStatus){
                        this.Statusoptions.push({value:item, label:res.caseStatus[item]})
                    }
                    this.status = 0;
                }catch (e) {
                  //  ;
                }
             },


            //搜索
            CaseSearch(){
                this.currentPage = 1;
                this.getCaseList(1,this.search);
            },
            //修改案件
            async ModifyCase( modifyForm) {
                try {
                    const res = await reqPosCaseModify(modifyForm);
                   if(res.msg === "success"){
                       this.$message({
                           message: '修改成功',
                           type: 'success'
                       });
                       this.UpdateCaseVisible = false;
                       this.getCaseList();
                   }
                } catch (e) {

                }

            },
            //案件详情
            async getCaseDetail(id = this.id) {
                try {
                    const res = await reqGetCaseDetail(id);
                    if (!res.caseDetail) return;
                    const data = res.caseDetail;
                    this.times = data.times.map(item => ({
                        timestamp: this.dateString(item.c_t_time),
                        content: item.c_t_type,
                    }));
                    if(! data.c_type){
                        data.c_type = ''
                    }
                    else
                    data.c_type =  data.c_type.toString();
                    data.c_pay_time = this.dateString(data.c_pay_time);
                    data.c_agent_timing = this.dateString(data.c_agent_timing);
                    data.c_apply_fees_time = this.dateString(data.c_apply_fees_time);
                    data.c_create_time = this.dateString(data.c_create_time);
                    data.c_substantial_audit_fees_time = this.dateString((data.c_substantial_audit_fees_time));
                    this.caseDetail = data;

                } catch (e) {

                    }
            },

                //查看案件详情
            wcaseDetail(id ){
                this.$router.push({path:'/caseDetail/'+id+'/1'});
             },

            //修改案件
            caseModify(id){
                this.UpdateCaseVisible = true;
                this.getCaseDetail(id).then(()=>{
                    this.CaseForm.agencyFees = this.caseDetail.c_agency_fees;
                    this.CaseForm.id = id;
                    this.CaseForm.logisticsNumber = this.caseDetail.c_logistics_number;
                    this.CaseForm.type =  this.caseDetail.c_type.toString();
                })

            },
            //确认修改
            submitCase(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // this.CaseForm.agencyFees= parseInt(this.CaseForm.agencyFees);
                        // this.CaseForm.type = parseInt(this.CaseForm.type);
                        this.ModifyCase(this.CaseForm);
                    } else {
                        return false;
                    }
                });
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleSizeChange(val) {
                this.page_size = val;
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getCaseList(this.currentPage);

            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            },
             cssStyle(){
                 let footHeight = document.getElementsByClassName('block')[0].offsetHeight;
                 let tablebox = document.getElementsByClassName('CaseTable')[0];
                 let bodyHeight =  document.getElementsByClassName('case_box')[0].offsetHeight;
                 tablebox.style.height  = bodyHeight-footHeight-56+'px'
             }
        }
    };

</script>

<style scoped>
    .header_case {
        height: 56px;
        width: 100%;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        font-size: 16px;
        min-width: 1200px;
    }
    .case_box {
        width: 100%;
        height: 100%;
        background: #FFCCCC;
    }
    .CaseTable{
        width: 100%;
    }
    /deep/.CaseForm{
        width: 350px;
    }

    /deep/.el-dialog {
        background-image: linear-gradient(to bottom right, #FFEFBA 0%, #FFFFFF 100%);
        width:500px
    }
    /deep/.case_box .el-dialog__body {
        background: rgba(225, 225, 225, 0);
    }
    /deep/.el-dialog label{
        color: #e59572;
    }

   /deep/ .case_box .el-form-item {
        background: rgba(225, 225, 225, 0);
    }


   /deep/ .el-table thead {
         font-weight: 500;
         }

   /deep/ .el-form-item  label{
        color: #e59572;
    }
   /deep/ .detailForm .el-form-item{
       width: 440px;
   }
    /deep/.block{
        text-align: center;
    }


</style>
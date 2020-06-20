<template>
    <div class = "CaseDetailBox">
        <el-row :gutter="20">
            <el-col :span = "9">
                <el-card class="box-card form">
                    <el-form class="detailForm" >
                        <el-form-item label = "申请号：">
                            <span v-if = caseDetail.c_patent_number>{{ caseDetail.c_patent_number }}</span>
                            <span v-else class="red"> 暂无信息 </span>
                        </el-form-item>
                        <el-form-item label = "专利名称：">
                            <span v-if = caseDetail.c_patent_name >{{ caseDetail.c_patent_name }}</span>
                            <span v-else class="red"> 暂无信息 </span>
                        </el-form-item>
                        <el-form-item label = "案件类型：">
                            <span v-if  =  caseDetail.c_type >{{ caseDetail.c_type }}</span>
                            <span v-else class="red"> 暂无信息 </span>
                        </el-form-item>
                        <el-form-item label = "案件状态：" >
                            <span v-if  = caseDetail.c_status>{{ caseDetail.c_status }}</span>
                            <span v-else class="red"> 暂无信息 </span>
                        </el-form-item>
                        <el-form-item label = "代理机构名称：">
                            <span v-if  = caseDetail.c_agency_name>{{ caseDetail.c_agency_name }}</span>
                            <span v-else class="red"> 暂无信息 </span>
                        </el-form-item>
                        <el-form-item label = "代理费：">
                            <span v-if = caseDetail.c_agency_fees>{{ caseDetail.c_agency_fees }}</span>
                            <span v-else class="red"> 暂无信息 </span>
                        </el-form-item>
                        <el-form-item label = "代理人姓名：">
                            <span v-if =  caseDetail.c_agent_name>{{ caseDetail.c_agent_name }}</span>
                            <span v-else class="red"> 暂无信息 </span>
                        </el-form-item>
                        <el-form-item label = "代理人安排的时间：">
                            <span v-if =caseDetail.c_agent_timing >{{ caseDetail.c_agent_timing }}</span>
                            <span v-else class="red"> 暂无信息 </span>
                        </el-form-item>
                        <el-form-item label = "代理人撰写进度：">
                            <span v-if = caseDetail.c_agent_progress  >{{ caseDetail.c_agent_progress }}</span>
                            <span v-else class="red"> 暂无信息 </span>
                        </el-form-item>
                        <el-form-item label = "代理机构收益：">
                            <span v-if =  caseDetail.c_agent_fee >{{ caseDetail.c_agent_fee }}</span>
                            <span v-else class="red"> 暂无信息 </span>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
            <el-col :span = "9">
                <el-card class="box-card form">
                        <el-form class="detailForm"  >
                            <el-form-item label = "申请人联系电话：">
                                <span v-if =  caseDetail.c_phone >{{ caseDetail.c_phone }}</span>
                                <span v-else class="red"> 暂无信息 </span>
                            </el-form-item>
                            <el-form-item label = "业务员姓名：">
                                <span v-if = caseDetail.c_salesman_name >{{ caseDetail.c_salesman_name }}</span>
                                <span v-else class="red"> 暂无信息 </span>
                            </el-form-item >

                            <el-form-item label="客户名称：">
                                <span v-if =  caseDetail.c_username>{{ caseDetail.c_username}}</span>
                                <span v-else class="red"> 暂无信息 </span>
                            </el-form-item>
                            <el-form-item label="合同编号：">
                                <span v-if = caseDetail.c_contract_no>{{  caseDetail.c_contract_no}}</span>
                                <span v-else class="red"> 暂无信息 </span>
                            </el-form-item>
                            <el-form-item label = "物流编号：">
                                <span v-if = caseDetail.c_logistics_number >{{ caseDetail.c_logistics_number }}</span>
                                <span v-else class="red"> 暂无信息 </span>
                            </el-form-item >
                            <el-form-item label = "创建时间：">
                                <span v-if  =  caseDetail.c_create_time >{{ caseDetail.c_create_time }}</span>
                                <span v-else class="red"> 暂无信息 </span>
                            </el-form-item>
                            <el-form-item label = "付款时间：">
                                <span v-if =  caseDetail.c_pay_time>{{ caseDetail.c_pay_time}}</span>
                                <span v-else class="red"> 暂无信息 </span>
                            </el-form-item>

                             <el-form-item label = "实质审察费缴费时间：">
                            <span v-if = caseDetail.c_substantial_audit_fees_time >{{ caseDetail.c_substantial_audit_fees_time }}</span>
                                 <span v-else class="red"> 暂未缴纳 </span>
                             </el-form-item>
                            <el-form-item label = "是否早日公布该专利：">
                                <span v-if = caseDetail.c_publish_paten >是</span>
                                <span v-else class="red"> 否 </span>
                            </el-form-item>
                            <el-form-item label = "备注：">
                                <span v-if = caseDetail.c_note >{{ caseDetail.c_note }}</span>
                                <span v-else class="red"> 暂无信息 </span>
                            <span>{{ }}</span>
                             </el-form-item>
                        </el-form>
                </el-card>
            </el-col>
            <el-col :span = "6">
                <el-card class="box-card times">
                    <div >
                        <p>流程具体时间线</p>
                        <el-timeline>
                            <el-timeline-item
                                    v-for="(activity, index) in times"
                                    :key="index"
                                    :color="color"
                                    :timestamp="activity.timestamp">
                                {{activity.content}}
                            </el-timeline-item>
                        </el-timeline>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {reqGetUserCaseDetail} from '../../api/UserDetail.js'
    import { reqGetCaseDetail} from '../../api/Case';
    export default {
        props:{
            type:{
                type:String,
                default:null,
            },
           id:{
              type:String,
              default:null,
           }
        },
        data(){
            return {
                color:'#5BE7C4',
                caseDetail:[],
                times: []
            }
        },

        mounted() {
            this.getCaseDetail();
        },
        watch: {
            //监听相同路由下参数变化的时候，从而实现异步刷新
            '$route'(to,from) {
                this.getCaseDetail();
            },
        },
        methods:{
            //案件管理中的案件详情
            async C_getCaseDetail(id = this.id) {
                try {
                    const res = await reqGetCaseDetail(id);
                    if(!res.caseDetail) return;
                    const data = res.caseDetail;
                    this.times = data.times.map(item=>({
                        timestamp:this.dateString(item.c_t_time),
                        content:item.c_t_type,
                    }));
                    if( data.c_type === 1){
                        data.c_type = '发明专利申请'
                    }
                    if( data.c_type === 2){
                        data.c_type = '实用+外观申请'
                    }
                    data.c_pay_time = this.dateString( data.c_pay_time);
                    data.c_agent_timing = this.dateString(data.c_agent_timing);
                    data.c_create_time = this.dateString(data.c_create_time);
                    data.c_substantial_audit_fees_time = this.dateString((data.c_substantial_audit_fees_time));
                    this.caseDetail = data;

                } catch (e) {

                }

            },

            //用户管理的案件详情
          async  U_getCaseDetail(id){
                try{
                    const res = await reqGetUserCaseDetail(id);
                    if(!res.caseDetail) return;
                    const data = res.caseDetail;
                    this.times = data.times.map(item=>({
                        timestamp:this.dateString(item.c_t_time),
                        content:item.c_t_type,
                    }));
                    if( data.c_type === 1){
                        data.c_type = '发明专利申请'
                    }
                    if( data.c_type === 2){
                        data.c_type = '实用+外观申请'
                    }
                    data.c_pay_time = this.dateString( data.c_pay_time);
                    data.c_agent_timing = this.dateString(data.c_agent_timing);
                    data.c_create_time = this.dateString(data.c_create_time);
                    data.c_substantial_audit_fees_time = this.dateString((data.c_substantial_audit_fees_time));
                    this.caseDetail = data;

                }catch (e) {
                    //;
                }
          },

         // 得到相应的案件详情
            getCaseDetail(id = this.id,type=this.type){
                if(type == 1)
                    this.C_getCaseDetail(id);
                if(type == 2)
                    this.U_getCaseDetail(id);
            },

        }
    };
</script>

<style scoped>
    .CaseDetailBox{
        height: 100%;
        width: 100%;
        background-image: linear-gradient(to bottom right, #FFEFBA 0%, #FFFFFF 100%);
    }

    /deep/.box-card{
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
    }
    /deep/.box-card p{
        width: 100%;
        height: 40px;
        padding:10px;
        color: #333333;
        box-sizing:border-box;
        -moz-box-sizing:border-box;
        -webkit-box-sizing:border-box;
    }
    /deep/ .red{
        color:#dd6161;
    }
    /deep/ .green{
        color: #4CAF50;
    }
    /deep/.el-row{
        height: 100%;
    }
    /deep/.el-col{
        height: 100%;
        overflow: hidden;
    }



</style>
<template>
    <div class="PatentTranfer">
        <div class="PatentTranferHeader">
            <el-select style="line-height: 56px ;margin-left: 10px" v-model="status" @change="search" clearable placeholder="请选择状态">
                <el-option
                        v-for="item in Statusoptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <div class="sear" style="width: 250px;height: 30px;float: right;margin-top: 10px">
                <el-input   type="text" v-model="name"  @keyup.enter.native="search" style="height: 30px; width:150px;"></el-input>
                <el-button type="primary" @click="search" icon="el-icon-search"  ></el-button>
            </div>
        </div>
        <div class="tableBox">
            <el-table
                    :data="patentTransfer"
                    height =  "100%"
                    width =  "100%">
                <el-table-column
                        prop="p_t_patent_name"
                        label="专利名"
                        min-width="16%">
                </el-table-column>
                <el-table-column
                        prop="p_t_create_time"
                        label="创建时间"
                        min-width="16%">
                </el-table-column>
                <el-table-column
                        prop="p_t_old_proposer_name"
                        label="出售方"
                        min-width="16%">
                </el-table-column>
                <el-table-column
                        prop="p_t_new_proposer_name"
                        label="购买方"
                        min-width="16%">
                </el-table-column>
                <el-table-column
                        prop="p_t_status"
                        label="转让状态"
                        min-width="16%">
                </el-table-column>

                <el-table-column
                        prop="p_t_patent_number"
                        label="专利编号"
                        min-width="16%">
                </el-table-column>
                <el-table-column
                        label="操作"
                        min-width="16%">
                    <template slot-scope="scope">
                    <el-button @click="openDetail(scope.row.p_t_id)">转让详情</el-button>
                        <el-dialog
                                title="转让详情"
                                center
                                :visible.sync="detailVisible"
                                width="900px"
                                :before-close="handleClose"
                               >
                            <el-row>
                                <el-col :span = "18" >
                                    <el-form ref="detailForm"  :inline="true" :model="detailForm"   >
                                        <el-form-item label="代理机构">
                                            <span v-if = detailForm.p_t_agency_name>{{detailForm.p_t_agency_name}}</span>
                                            <span class="red" v-else>暂无数据</span>
                                        </el-form-item>
                                        <el-form-item label="物流号">
                                            <span v-if = detailForm.p_t_logistics_number>{{detailForm.p_t_logistics_number}}</span>
                                            <span class="red" v-else>暂无数据</span>
                                        </el-form-item>
                                        <el-form-item label="代理人">
                                            <span v-if = detailForm.p_t_agent_name>{{detailForm.p_t_agent_name}}</span>
                                            <span class="red" v-else>暂无数据</span>
                                        </el-form-item>
                                        <el-form-item label="代理费">
                                            <span v-if = detailForm.p_t_agent_fee>{{detailForm.p_t_agent_fee}}</span>
                                            <span class="red" v-else>暂无数据</span>
                                        </el-form-item>
                                        <el-form-item label="合同号">
                                            <span v-if = detailForm.p_t_contract_no>{{detailForm.p_t_contract_no}}</span>
                                            <span class="red" v-else>暂无数据</span>
                                        </el-form-item>
                                        <el-form-item label="专利名">
                                            <span v-if = detailForm.p_t_patent_name>{{detailForm.p_t_patent_name}}</span>
                                            <span class="red" v-else>暂无数据</span>
                                        </el-form-item>
                                        <el-form-item label="转让状态">
                                            <span v-if = detailForm.p_t_status>{{detailForm.p_t_status}}</span>
                                            <span class="red" v-else>暂无数据</span>
                                        </el-form-item>
                                        <el-form-item label="专利号">
                                            <span v-if = detailForm.p_t_patent_number>{{detailForm.p_t_patent_number}}</span>
                                            <span class="red" v-else>暂无数据</span>
                                        </el-form-item>
                                        <el-form-item label="转让费">
                                            <span v-if = detailForm.p_t_transfer_fee>{{detailForm.p_t_transfer_fee}}</span>
                                            <span class="red" v-else>暂无数据</span>
                                        </el-form-item>
                                        <el-form-item label="专利付款时间">
                                            <span v-if = detailForm.p_t_pay_date>{{detailForm.p_t_pay_date}}</span>
                                            <span class="red" v-else>暂无数据</span>
                                        </el-form-item>
                                        <el-form-item label="购买方">
                                            <span v-if = detailForm.p_t_new_proposer_name>{{detailForm.p_t_new_proposer_name}}</span>
                                            <span class="red" v-else>暂无数据</span>
                                        </el-form-item>
                                        <el-form-item label="转让价格">
                                            <span v-if = detailForm.p_t_price>{{detailForm.p_t_price}}</span>
                                            <span class="red" v-else>暂无数据</span>
                                        </el-form-item>
                                        <el-form-item label="买方联系电话">
                                            <span v-if = detailForm.p_t_buyer_phone>{{detailForm.p_t_buyer_phone}}</span>
                                            <span class="red" v-else>暂无数据</span>
                                        </el-form-item>
                                        <el-form-item label="转让缴费时间">
                                            <span v-if = detailForm.p_t_transfer_fee_time>{{detailForm.p_t_transfer_fee_time}}</span>
                                            <span class="red" v-else>暂无数据</span>
                                        </el-form-item>
                                        <el-form-item label="买方添加时间">
                                            <span v-if = detailForm.p_t_buyer_addtime>{{detailForm.p_t_buyer_addtime}}</span>
                                            <span class="red" v-else>暂无数据</span>
                                        </el-form-item>


                                        <el-form-item label="出售方">
                                            <span v-if = detailForm.p_t_old_proposer_name >{{detailForm.p_t_old_proposer_name}}</span>
                                            <span class="red" v-else>暂无数据</span>
                                        </el-form-item>


                                        <el-form-item label="用户名">
                                            <span v-if = detailForm.p_t_username>{{detailForm.p_t_username}}</span>
                                            <span class="red" v-else>暂无数据</span>
                                        </el-form-item>
                                        <el-form-item label="卖方联系人">
                                            <span v-if = detailForm.p_t_linkman>{{detailForm.p_t_linkman}}</span>
                                            <span class="red" v-else>暂无数据</span>
                                        </el-form-item>
                                        <el-form-item label="用户联系电话">
                                            <span v-if = detailForm.p_t_phone>{{detailForm.p_t_phone}}</span>
                                            <span class="red" v-else>暂无数据</span>
                                        </el-form-item>
                                        <el-form-item label="卖方联系电话">
                                            <span v-if = detailForm.p_t_linkman_phone>{{detailForm.p_t_linkman_phone}}</span>
                                            <span class="red" v-else>暂无数据</span>
                                        </el-form-item>
                                        <el-form-item label="业务员">
                                            <span v-if = detailForm.p_t_salesman_name>{{detailForm.p_t_salesman_name}}</span>
                                            <span class="red" v-else>暂无数据</span>
                                        </el-form-item>

                                        <el-form-item label="付款金额">
                                            <span v-if = detailForm.p_t_transaction_value>{{detailForm.p_t_transaction_value}}</span>
                                            <span class="red" v-else>暂无数据</span>
                                        </el-form-item>
                                        <el-form-item label="案件开始时间">
                                            <span v-if = detailForm.p_t_create_time>{{detailForm.p_t_create_time}}</span>
                                            <span class="red" v-else>暂无数据</span>
                                        </el-form-item>
                                        <el-form-item label="案件结束时间">
                                            <span v-if = detailForm.p_t_success_time>{{detailForm.p_t_success_time}}</span>
                                            <span class="red" v-else>暂无数据</span>
                                        </el-form-item>

                                    </el-form>
                                </el-col>
                                <el-col :span = "6">
                                    <div class="timeline">
                                        <p>流程时间线</p>
                                        <el-timeline>
                                            <el-timeline-item
                                                    v-for="(activity, index) in times"
                                                    :key="index"
                                                    :color="color"
                                                    :timestamp="activity.timestamp">
                                                {{activity.type}}
                                               <p>{{activity.content}}</p>
                                            </el-timeline-item>
                                        </el-timeline>
                                    </div>
                                </el-col>
                            </el-row>


                        </el-dialog>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="block">
            <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="page_size"
                    :page-sizes="[10]"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="Count"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {reqGetPatentRecord,reqGetPatentTransferDetail,reqGetPatentTransferStatus} from '../../api/Patent.js'
    export default {

        data(){
            return{
                color:'#4CAF50',
                times:[],
                name:null,
                Statusoptions:[],
                detailVisible:false,
                status:'',
                currentPage:1,
                page_size:10,
                Count:0,
                detailForm:{},
                patentTransfer:[]
            }
        },
        mounted() {
            this.GetPatentTransferStatus();
            this.GetPatentTransferRecord(this.name,1,0);
            this.cssStyle();
        },
        methods:{
            async GetPatentTransferStatus(){
                const res = await reqGetPatentTransferStatus();
                this.Statusoptions.push({value: 0, label:"全部"});
                let k = 1;
                for(let item in res.transferStatus){
                   this.Statusoptions.push({value:k++, label:res.transferStatus[item]})
                }
                this.status = 0;
            },
            //转让详情
            async GetPatentTransferdetail(pid){
                const res = await reqGetPatentTransferDetail(pid);
                let detail  = res.detail;
                    detail.p_t_pay_date = this.dateString( detail.p_t_pay_date );
                    detail.p_t_success_time = this.dateString(  detail.p_t_success_time);
                detail.p_t_buyer_addtime = this.dateString(  detail.p_t_buyer_addtime);
                this.detailForm = detail;
               this.times = detail.times.map(item=>({
                   timestamp:this.dateString(item.p_t_time),
                   type:item.p_t_i_type,
                   content:item.p_t_content,
                }));
            },
            async GetPatentTransferRecord(name = this.name,page=this.currentPage,status = this.status){
                const res = await reqGetPatentRecord(name,page,status);
                this.Count = res.count;
                if(!res.patentTransfer){
                    this.patentTransfer = [];
                    return;
                }

                this.patentTransfer = res.patentTransfer;
                for(let i = 0;i<this.patentTransfer.length;i++){
                    this.patentTransfer[i].p_t_create_time = this.dateString( this.patentTransfer[i].p_t_create_time)
                }

            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            //根据状态搜索
            search(){
                this.GetPatentTransferRecord(this.name,1,this.status);
            },
            //打开转让详情
            openDetail(id){
                this.GetPatentTransferdetail(id);
                this.detailVisible = true;
            },
            handleCurrentChange(val) {
                this.currentPage= val;
                this.GetPatentTransferRecord(this.name,this.currentPage,this.status);
            },
            cssStyle(){
                let footHeight = document.getElementsByClassName('block')[0].offsetHeight;
                let tablebox = document.getElementsByClassName('tableBox')[0];
                let bodyHeight =  document.getElementsByClassName('PatentTranfer')[0].offsetHeight;
                tablebox.style.height  = bodyHeight-footHeight-56+'px'
            }
        }

    };
</script>

<style scoped>
    .PatentTranfer{
        width: 100%;
        height: 100%;
        background: #FFCCCC;
        font-size: 16px;
    }
    /deep/ .el-form .el-form-item{
        width: 300px;
    }
    /deep/ .PatentTranferHeader{
        width: 100%;
        min-width: 1200px;
        height: 56px;
    }
    /deep/.tableBox{
        width: 100%;
    }
    /deep/.el-form .el-form-item{
        width: 48%;
    }
    /deep/.el-form{
     overflow: auto;
        width:100%;
        height: 400px;
        background: #FFFFFF;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    }
    /deep/.el-dialog {
        background-image: linear-gradient(to bottom right, #FFEFBA 0%, #FFFFFF 100%);
    }
    /deep/.timeline{
        width: 100%;
        height: 400px;
        padding: 10px;
        overflow: auto;
        background: #ffffff;
        box-sizing:border-box;
        -moz-box-sizing:border-box; /* Firefox */
        -webkit-box-sizing:border-box; /* Safari */
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    }
    /deep/.timeline p{
        margin-bottom: 10px;
    }
    /deep/ .red{
        color:#dd6161;
    }
    /deep/ .green{
        color: #4CAF50;
    }
    /deep/.block{
        text-align: center;
    }

</style>
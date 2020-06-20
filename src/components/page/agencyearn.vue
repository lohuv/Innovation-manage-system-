<template>
<div class="agencyearnBox">
    <el-tabs v-model="activeName" type="card" >
        <el-tab-pane label="申请案件" name="first">
            <p class="revenue">案件总收益：{{a_revenue}}</p>
            <div class="TableBox">
                <el-table
                        height="100%"
                        :data="applyData"
                        width="100%"
                >
                    <el-table-column
                            prop="c_patent_name"
                            label="专利名称"

                    >
                    </el-table-column>
                    <el-table-column
                            prop="c_agency_fees"
                            label="代理机构收益"
                    >
                    </el-table-column>

                    <el-table-column
                            prop="c_type"
                            label="案件类别"

                    >
                    </el-table-column>
                    <el-table-column
                            prop="c_pay_time"
                            label="付款时间"

                    >
                    </el-table-column>
                </el-table>
            </div>
            <div class="block">
                <el-pagination
                        @current-change="a_handleCurrentChange"
                        :current-page="a_currentPage"
                        :page-size="page_size"
                        :page-sizes="[10]"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="a_count"
                >
                </el-pagination>
            </div>

        </el-tab-pane>
        <el-tab-pane label="转让案件" name="second">
            <p class="revenue">案件总收益：{{t_revenue}}</p>
            <div class="TableBox">
                <el-table
                        height="100%"
                        :data="transformData"
                        width="100%"
                >
                    <el-table-column
                            prop="p_t_patent_name"
                            label="专利名"

                    >
                    </el-table-column>
                    <el-table-column
                            prop="p_t_agent_fee"
                            label="代理机构收益"

                    >
                    </el-table-column>

                    <el-table-column
                            prop="p_t_transfer_fee_time"
                            min-width="145px"
                            label="转让费缴费时间"

                    >
                    </el-table-column>
                </el-table>
            </div>
            <div class="block">
                <el-pagination
                        @current-change="t_handleCurrentChange"
                        :current-page="t_currentPage"
                        :page-size="page_size"
                        :page-sizes="[10]"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="t_count"
                >
                </el-pagination>
            </div>
        </el-tab-pane>

    </el-tabs>
</div>
</template>

<script>
    import { reqGetRevenueTransfer,reqGetRevenueApply} from '../../api/agencyEarn'
    export default {
        props:{
            id:{
                type:String,
                default:''
            }
        },
        name: 'agencyearn',
        data(){
            return{
                a_revenue:0,
                t_revenue:0,
                activeName: 'first',
                t_currentPage:1,
                t_count:0,
                a_currentPage:1,
                a_count:0,
                page_size:10,
                transformData:[],
                applyData:[],


            }
        },
        watch:{
            $route(to,form){
                this.getAgencytran(this.id,1);
                this.getAgencyApply(this.id,1);
            }
        },

        mounted() {
            this.cssStyle();
            this.getAgencytran(this.id,1);
            this.getAgencyApply(this.id,1);


        },
        methods:{
    //         1——发明专利申请
    // 2——实用+外观申请
            async getAgencytran(id = this.id,page = this.a_currentPage){
                try {
                    const res = await reqGetRevenueTransfer(id,page);
                    if(!res.case){
                        this.transformData = [];
                        this.t_count = 0;
                        this.t_revenue =0;
                        return
                    }
                    this.transformData = res.case;
                    for(let i = 0;i<this.transformData.length;i++){
                        this.transformData[i].p_t_transfer_fee_time = this.dateString( this.transformData[i].p_t_transfer_fee_time )
                    }
                    this.t_revenue = res.total.revenue;
                    this.t_count = res.total.count;
                } catch (e) {
                    // do nothing
                }
            },

            async getAgencyApply( id =this.id,page = this.t_currentPage){
                try{

                    const res = await reqGetRevenueApply(id,page);
                    if(!res.case){
                        this.applyData = [];
                        this.a_count = 0;
                        this.a_revenue = 0;
                        return
                    }
                    this.applyData  =res.case;
                    for(let i = 0;i<this.applyData.length;i++){
                        if(  this.applyData[i].c_type === 1 )
                            this.applyData[i].c_type = '发明专利申请';
                        if(  this.applyData[i].c_type === 2 )
                            this.applyData[i].c_type = '实用+外观申请';
                        this.applyData[i].c_pay_time  = this.dateString( this.applyData[i].c_pay_time )
                    }
                    this.a_revenue = res.total.revenue;
                    this.a_count = res.total.count;
                }catch (e) {
                    // ;
                }
            },
            //css样式
            cssStyle(){
                let footHeight = document.getElementsByClassName('block')[0].offsetHeight;
                let tablebox1 = document.getElementsByClassName('TableBox')[0];

                let tablebox2 = document.getElementsByClassName('TableBox')[1];
                let agencyearnBoxHeight =  document.getElementsByClassName('agencyearnBox')[0].offsetHeight;

                tablebox1.style.height  = agencyearnBoxHeight-footHeight-76+'px';
                tablebox2.style.height  = agencyearnBoxHeight-footHeight-76+'px'

            },
            a_handleCurrentChange(val) {
                this.a_currentPage = val;
                this.getAgencyApply(this.id,this.a_currentPage);
            },
            t_handleCurrentChange(val) {
                this.t_currentPage = val;
                this.getAgencytran(this.id,this.t_currentPage);

            },


        }
    };

</script>

<style scoped>
    .agencyearnBox{
        width: 100%;
        height: 100%;
        background: #FFCCCC;
    }
    /deep/.el-tabs{
        width: 100%;
        background: #FFCCCC;
    }
    /deep/.TableBox{
        width: 100%;
    }
    /deep/.block{
        text-align: center;
    }
    /deep/.revenue{
        height: 20px;
        font-family: "Helvetica Neue";
        color: #FFFFFF;
        font-size: 16px;
    }
    /deep/ .el-tabs__item.is-active{
        color: #ffffff !important;
    }
    /deep/ .el-tabs__active-bar{
        background:#FFFFCC !important;
    }



</style>
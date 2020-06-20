<template>
    <div class="annualFee_Box">
    <div class="headBox">
        <el-select v-model="status" @change="getList" style="margin-top: 13px; width: 150px; margin-left: 10px" placeholder="状态：全部">
            <el-option label="全部" value="0"></el-option>
            <el-option label="待处理" value="2"></el-option>
            <el-option label="待缴费" value="1"></el-option>
            <el-option label="已完成" value="3"></el-option>
        </el-select>
    </div>
        <div class = "annualFeeTable">
            <template>
            <el-table
                    height="100%"
                    :data="annualFee"
                    style="width: 100%">
                <el-table-column
                        prop="p_name"
                        label="专利名"
                       >
                </el-table-column>
                <el-table-column
                        prop="a_annual_fee"
                        label="年费额度"
                       >
                </el-table-column>
                <el-table-column
                        prop="p_patent_number"
                        label="专利编号"
                       >
                </el-table-column>
                <el-table-column
                        prop="pay_time"
                        min-width="145px"
                        label="平台确认缴费时间"
                       >
                </el-table-column>
                <el-table-column
                        prop="a_platform_agency_fee"
                        label="平台代理费"
                        >
                </el-table-column>
                <el-table-column
                        prop="a_third_party_fee"
                        label="第三方收费"
                       >
                </el-table-column>
                <el-table-column
                        prop="a_time"
                        min-width="145px"
                        label="用户缴费日期"
                       >
                </el-table-column>
                <el-table-column
                        prop="a_late_payment_fee"
                        label="滞纳金额度"
                       >
                </el-table-column>
                <el-table-column
                        prop="a_all_fee"
                        label="应缴费用"
                       >
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="120">
                    <template slot-scope="scope">
                        <el-popconfirm
                               @onConfirm = "comfirmPay(scope.row.a_id)"
                                title="确定缴费？"
                        >
                            <el-button type="primary" size="mini"   slot = "reference" v-show="scope.row.a_time&&(!scope.row.a_pay_time)">确认缴费</el-button>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            </template>
        </div>
        <div class="block">
            <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="10"
                    :page-sizes = [10]
                    layout="total, sizes,prev, pager, next, jumper"
                    :total="count"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {reqgetAnnualFeeList,putConfirmPayment} from '../../api/annualFee'
    export default {
        name: 'annualFeeManage',
        data(){
            return{
                status:'',
                count:4,
                currentPage:1,
                page_size:10,
                annualFee: []
            }
        },
        mounted() {
            this.getannualFeeList();
            this.cssStyle();
        },
        methods: {
            async getannualFeeList(status = 0,page = 1) {
                try {
                    const res = await reqgetAnnualFeeList( status,page);
                    const arr = res.annualFee;
                    for( let i = 0;i<arr.length;i++){
                        if(arr[i].a_pay_time !=0 )
                        arr[i].pay_time = this.dateString(arr[i].a_pay_time);

                        if(arr[i].a_time == 0){
                            arr[i].a_time = null;
                        }
                        else
                            arr[i].a_time = this.dateString(arr[i].a_time)
                    }

                    this.annualFee = arr;
                    this.count = res.count;
                } catch (e) {
                    //
                }
            },
            //确认缴费
            async ConfirmPayment(id) {
                try {
                    const res = await putConfirmPayment(id);
                    if(res.msg == "success")
                        this.$message({
                            type:'success',
                            message:'缴费成功'
                        });
                } catch (e) {
                    //
                }
            },

            getList(){
                this.getannualFeeList(this.status,1)
            },

            comfirmPay(id){
               this.ConfirmPayment(id).then(()=>{
                   this.currentPage = 1;
                   this.getannualFeeList(this.status,1)
               });
            },

            handleCurrentChange(val) {
                this.currentPage = val;
                if(!this.status){
                    this.getannualFeeList(0,this.currentPage);
                }

                else{
                    this.getannualFeeList(this.status,this.currentPage);
                }

            },
            cssStyle(){
                let footHeight = document.getElementsByClassName('block')[0].offsetHeight;
                let tablebox = document.getElementsByClassName('annualFeeTable')[0];
                let bodyHeight =  document.getElementsByClassName('annualFee_Box')[0].offsetHeight;
                tablebox.style.height  = bodyHeight-footHeight-56+'px'
            }

        }
    }
</script>

<style scoped>
    .annualFee_Box{
       width: 100%;
       height: 100%;
        background: #FFCCCC;
        font-size: 16px;
    }
    /deep/.headBox{
        width: 100%;
        min-width: 1200px;
        height: 56px;
    }
    /deep/.annualFeeTable{
        width: 100%;
    }
    /deep/.block{
        text-align: center;
    }

</style>
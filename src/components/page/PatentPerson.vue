<template>
<div class="PersonBox">
    <div class="Person_head">

    </div>
    <div class="TableBox">
        <el-table :data="patentPeople"
                  height="100%"
                  width="100%"
        >
            <el-table-column
                    prop="u_p_name"
                    label="姓名"
                    min-width="25%">
            </el-table-column>
            <el-table-column
                    prop="u_p_power"
                    label="身份"
                   min-width="25%">

            </el-table-column>
            <el-table-column
                    prop="u_p_id_card"
                    label="身份证号"
                    min-width="25%"
            >

            </el-table-column>
            <el-table-column
                    label="操作"
                     min-width="25%"
            >
                <template slot-scope="scope">
                    <el-button size = mini type = "primary" @click="openModifyDialog(scope.row)" > 编辑</el-button>
                    <el-button size = mini type = "success" @click="openDetail(scope.row)" > 详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="10"
                    :page-sizes="[10]"
                    :pager-count="7"
                    layout="total,sizes,prev,pager, next, jumper"
                    :total="count"

            >
            </el-pagination>
        </div>

        <el-dialog
                center
                width="750px"
                title="相关人员详情"
                :visible.sync="DetailVisible"
                append-to-body>
            <el-form  class="Detail_form" :inline="true"  >
                <el-form-item label="姓名:" >
                    <span v-if = detail.u_p_name>{{detail.u_p_name}}</span>
                    <span class="red" v-else>暂无信息</span>
                </el-form-item>
                <el-form-item label="申请人类型:">
                    <span v-if = detail.u_p_applicant_type>{{detail.u_p_applicant_type}}</span>
                    <span class="red" v-else>暂无信息</span>
                </el-form-item>
                <el-form-item label="qq:" >
                    <span v-if = detail.u_p_qq>{{detail.u_p_qq}}</span>
                    <span class="red" v-else>暂无信息</span>
                </el-form-item>
                <el-form-item label="邮箱:" >
                    <span v-if = detail.u_p_email>{{detail.u_p_email}}</span>
                    <span class="red" v-else>暂无信息</span>
                </el-form-item>
                <el-form-item label="国籍:" >
                    <span v-if = detail.u_p_nationality>{{detail.u_p_nationality}}</span>
                    <span class="red" v-else>暂无信息</span>
                </el-form-item>
                <el-form-item label="身份证:" >
                    <span v-if =detail.u_p_id_card>{{detail.u_p_id_card}}</span>
                    <span class="red" v-else>暂无信息</span>
                </el-form-item>
                <el-form-item label="居住所在地:" >
                    <span v-if = detail.u_p_business_location>{{detail.u_p_business_location}}</span>
                    <span class="red" v-else>暂无信息</span>
                </el-form-item>
                <el-form-item label="详细地址:" >
                    <span v-if = detail.u_p_details_address >{{detail.u_p_details_address}}</span>
                    <span class="red" v-else>暂无信息</span>
                </el-form-item>

                <el-form-item label="邮政编码:" >
                    <span v-if = detail.u_p_postcode>{{detail.u_p_postcode}}</span>
                    <span class="red" v-else>暂无信息</span>
                </el-form-item>

                <el-form-item label="专利优先级:" >
                    <span v-if = detail.u_p_power>{{detail.u_p_power}}</span>
                    <span class="red" v-else>暂无信息</span>
                </el-form-item>

                <el-form-item label="费用减免:" >
                    <span v-if = detail.u_p_fee_reduction >{{detail.u_p_fee_reduction}}</span>
                    <span class="red" v-else>暂无信息</span>
                </el-form-item>

                <el-form-item label="是否公布姓名:" >
                    <span v-if = detail.u_p_publish_name>{{detail.u_p_publish_name}}</span>
                    <span class="red" v-else>暂无信息</span>
                </el-form-item>

                <el-form-item label="联系电话:" >
                    <span v-if =detail.u_p_phone>{{detail.u_p_phone}}</span>
                    <span class="red" v-else>暂无信息</span>
                </el-form-item>

                <el-form-item label="拥有专利公开前数据使用权限:"  >
                    <span v-if = detail.u_p_before_public>是</span>
                    <span class="red" v-else>否</span>
                </el-form-item>



            </el-form>
        </el-dialog>
        <el-dialog
                center
                width="400px"
                title="信息编辑"
                :visible.sync="inventorVisible"
                append-to-body>
            <el-form ref="patentPersonForm"  :model="patentPersonForm" :rules="rules" label-width="90px">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="patentPersonForm.name"></el-input>
                </el-form-item>
                <el-form-item label="身份证"  prop="idCard">
                    <el-input v-model="patentPersonForm.idCard"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
    <el-button @click="inventorVisible = false">取 消</el-button>
    <el-button type="primary"  @click="PatentModifySubmit('patentPersonForm')">提 交</el-button>
  </span>
        </el-dialog>
    </div>

</div>
</template>
    <script>


    import { putPatentPersonModify,reqGetPatentPerson, reqGetPatentPersonDetail} from '../../api/Patent';
    export default {
     props: {
         id: {
             type: String,
             default: ''
         },
     },
         data() {
             return {
                 inventorVisible:false,
                 currentPage:1,
                 DetailVisible:false,
                 count:0,
                 patentPeople:[],
                 detail:{},
                 patentPersonForm:{
                     id:'',
                     idCard:'',
                     name:'',
                 },
                 rules:{
                     name: [
                         { required: true, message: '请输入姓名', trigger: 'blur' },
                     ],
                     idCard:[{ required: true, message: '请输入身份证号码', trigger: 'blur' },
                         { min: 18, max: 18, message: '请输入正确的身份证号码（18位）', trigger: 'blur' }]
                 },
             }
         },
        mounted() {
            this.cssStyle();
        },
        watch: {
            //监听相同路由下参数变化的时候，从而实现异步刷新
            '$route'(to,from) {
                this.getPatentPerson();
            },
        },
        methods:{
             //查看专利权人或发明人的详情
             async getPatentPersonDetail(id ){
                 try {
                     const res = await reqGetPatentPersonDetail(id);
                     if(!res.detail)
                         return;
                     this.detail  = res.detail;
                     if(this.detail.u_p_publish_name ===1)
                         this.detail.u_p_publish_name = '是';
                     else
                         this.detail.u_p_publish_name = '否';

                 } catch (e) {

                 }
             },

            //查看专利权人信息
            async getPatentPerson(id = this.id,page = 1){
                try {
                    const res = await reqGetPatentPerson(id,page);
                    if(!res.patentPeople)return ;
                    let patentPeople =  res.patentPeople;
                    for(let i = 0;i<patentPeople.length;i++){
                        if(patentPeople[i].u_p_power === 0){
                            patentPeople[i].u_p_power = '专利权人'
                        }
                        else{
                            patentPeople[i].u_p_power = '第'+patentPeople[i].u_p_power+'发明人'
                        }
                    }


                    this.patentPeople = res.patentPeople;
                    this.count = res.count;

                } catch (e) {

                }
            },


            //修改专利权人或发明人的信息
             async PatentPersonModify(form){
                 try {
                     const res = await putPatentPersonModify(form);
                     if(res.msg == "success"){
                         this.$message({
                             type:'success',
                             message:'修改成功'
                         });
                         this.getPatentPerson(this.id,this.currentPage);
                         this.inventorVisible = false;
                     }
                 } catch (e) {

                 }
             },
            //打开修改弹窗
            openModifyDialog(row){
                this.inventorVisible = true;
                this.patentPersonForm.id = row.u_p_id;
                this.patentPersonForm.idCard = row.u_p_id_card;
                this.patentPersonForm.name = row.u_p_name;
            },

            //确认修改
            PatentModifySubmit(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.PatentPersonModify(this.patentPersonForm);
                    } else {
                        return false;
                    }
                });

            },
            //打开专利相关人员详情详情
            openDetail(row){
                 this.DetailVisible = true;
               this.getPatentPersonDetail(row.u_p_id)  ;
            },

            handleCurrentChange(val){
                 this.currentPage = val;
                 this.getPatentPerson(val);
             },
            cssStyle(){
                let footHeight = document.getElementsByClassName('block')[0].offsetHeight;
                let tablebox = document.getElementsByClassName('TableBox')[0];
                let bodyHeight =  document.getElementsByClassName('PersonBox')[0].offsetHeight;
                tablebox.style.height  = bodyHeight-footHeight-56+'px'
            }
         }
    };
</script>

<style scoped>
    .PersonBox{
        font-size: 16px;
        width: 100%;
        height: 100%;
        background: #FFCCCC;
    }
    /deep/ .Person_head{
        width: 100%;
        height: 56px;
        color: white;
        line-height: 30px;

    }
    /deep/.TableBox{
        width: 100%;
    }
    /deep/.Person_head p{
        margin-left: 15px;
    }
    /deep/.Detail_form{
        width: 700px;
        overflow: auto
    }

    /deep/.Detail_form .el-form-item{
        width: 48%;

    }
    /deep/.el-dialog {
        background-image: linear-gradient(to bottom right, #FFEFBA 0%, #FFFFFF 100%);
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
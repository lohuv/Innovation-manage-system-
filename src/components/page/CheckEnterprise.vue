<template>
    <div class = "Check">
        <div class="avatar">
            <el-image
                    style="width: 100px; height: 100px"
                    :src="userDetail.u_profile"
                    :preview-src-list="srcList">
                <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"> 暂无图片</i>
                </div>
            </el-image>
        </div>
        <el-form :inline="true">
            <el-form-item label="姓名：">
                <span v-if = userDetail.u_name>{{userDetail.u_name}}</span>
                <span v-else class="red">暂无信息</span>
            </el-form-item>

            <el-form-item label="账号：">
                <span v-if = userDetail.u_account >{{userDetail.u_account }}</span>
                <span v-else class="red">暂无信息</span>
            </el-form-item>
            <el-form-item label="性别：">
                <span v-if = userDetail.u_sex>{{ userDetail.u_sex }}</span>
                <span v-else class="red">暂无信息</span>
            </el-form-item>
            <el-form-item label="国籍：">
                <span v-if = userDetail.u_nationality  >{{ userDetail.u_nationality }}</span>
                <span v-else class="red">暂无信息</span>
            </el-form-item>
            <el-form-item label="邮箱：">
                <span v-if = userDetail.u_email>{{ userDetail.u_email }}</span>
                <span v-else class="red">暂无信息</span>
            </el-form-item>
            <el-form-item label="地址：">
                <span v-if =userDetail.u_address >{{ userDetail.u_address }}</span>
                <span v-else class="red">暂无信息</span>
            </el-form-item>
            <el-form-item label="邮政编码：">
                <span v-if = userDetail.u_postcode >{{ userDetail.u_postcode }}</span>
                <span v-else class="red">暂无信息</span>
            </el-form-item>
            <el-form-item label="联系电话：">
                <span v-if = userDetail.u_phone>{{ userDetail.u_phone }}</span>
                <span v-else class="red">暂无信息</span>
            </el-form-item>
            <el-form-item label="创建时间：">
                <span v-if = userDetail.u_create_time>{{ userDetail.u_create_time }}</span>
                <span v-else class="red">暂无信息</span>
            </el-form-item>
            <el-form-item label="登录次数：">
                <span v-if = userDetail.u_login_time >{{ userDetail.u_login_time }}</span>
                <span v-else class="red">暂无信息</span>
            </el-form-item>
            <p></p>
            <el-form-item label="身份证号：">
                <span v-if = userDetail.u_id_number>{{ userDetail.u_id_number }}</span>
                <span v-else class="red">暂无信息</span>
            </el-form-item>
            <el-form-item label="身份证正面照：">
                <el-image
                        style="width: 100px; height: 100px"
                        :src="userDetail.u_front_view"
                        :preview-src-list="srcList">
                    <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"> 暂无图片</i>
                    </div>
                </el-image>
            </el-form-item>
            <el-form-item label="身份证反面照：">
                <el-image
                        style="width: 100px; height: 100px"
                        :src="userDetail.u_back_view"
                        :preview-src-list="srcList">
                    <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"> 暂无图片</i>
                    </div>
                </el-image>
            </el-form-item>
            <el-form-item label="营业执照：">
                <el-image
                        style="width: 100px; height: 100px"
                        :src="userDetail.e_business_license"
                        :preview-src-list="srcList">
                    <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"> 暂无图片</i>
                    </div>
                </el-image>

            </el-form-item>
            <p></p>
            <el-form-item label="公司名称：">
                <span v-if = userDetail.e_company_name  >{{ userDetail.e_company_name }}</span>
                <span v-else class="red">暂无信息</span>
            </el-form-item>
            <el-form-item label="法人：">
                <span v-if = userDetail.e_legal_person  >{{ userDetail.e_legal_person }}</span>
                <span v-else class="red">暂无信息</span>
            </el-form-item>
            <el-form-item label="是否同意协议：">
                <span v-if = userDetail.u_is_agreed >{{ userDetail.u_is_agreed }}</span>
                <span v-else class="red">暂无信息</span>
            </el-form-item>
            <el-form-item label="企业地区（市、区）：">
                <span v-if = userDetail.e_region_city  >{{ userDetail.e_region_city }}</span>
                <span v-else class="red">暂无信息</span>
            </el-form-item>
            <el-form-item label="企业地区（省）：">
                <span v-if = userDetail.e_region_province  >{{ userDetail.e_region_province }}</span>
                <span v-else class="red">暂无信息</span>
            </el-form-item>
            <el-form-item label="企业详细地址：">
                <span v-if = userDetail.e_address  >{{ userDetail.e_address }}</span>
                <span v-else class="red">暂无信息</span>
            </el-form-item>
            <el-form-item label="统一社会信用代码：">
                <span v-if = userDetail.e_unified_social_credit_code  >{{ userDetail.e_unified_social_credit_code }}</span>
                <span v-else class="red">暂无信息</span>
            </el-form-item>
            <el-form-item label="企业专业邻域：">
                <span v-if = userDetail.e_neighbourhood  >{{ userDetail.e_neighbourhood }}</span>
                <span v-else class="red">暂无信息</span>
            </el-form-item>
        </el-form>
        <div class="foot">
            <el-button type = 'danger' size="mini" @click="SubmitNo">不通过</el-button>
            <el-button type = 'success' size="mini"  @click="SubmitYes">通过</el-button>
        </div>
    </div>
</template>

<script>
    import { reqEnterpriseCheck } from '../../api/userInfo';
    import { reqGetUserDetail } from '../../api/UserDetail';

    export default {
        props:{
            id:{
                type:String,
                default:''
            },
        },
        name: 'CheckEnterprise',
        data(){
            return{
                srcList:[],
                userDetail:[]
            }
        },
        mounted() {
            this.getUserDetail();
        },
        methods:{

            //企业认证
            async EnterpriseCheck(id,result){
                try{
                    const res = await reqEnterpriseCheck(id,result);
                    if(res.msg == 'success'){
                        this.$message({
                            type:'success',
                            message:'操作成功',

                        });
                        this.$router.push('/custom')
                    }
                }catch (e) {
                    //;
                }
            },
            //个人信息详情
            async getUserDetail(id = this.id,type=1){
                try {
                    const res = await reqGetUserDetail(id,type);
                    this.userDetail= res.userDetail;
                    this.userDetail.u_create_time = this.dateString( this.userDetail.u_create_time );
                    this.srcList.push(this.userDetail.u_profile);
                    this.srcList.push(this.userDetail.u_front_view);
                    this.srcList.push(this.userDetail.u_back_view);
                    this.srcList.push(this.userDetail.e_business_license);
                } catch (e) {

                }
            },
            SubmitNo(){
                this.EnterpriseCheck(this.id,3)
            },
            SubmitYes(){
                this.EnterpriseCheck(this.id,2)
            }

        }

    };
</script>

<style scoped>
    .Check{
        width: 100%;
        height: 100%;
        background:#FFFFFF;
    }
    /deep/.avatar{
        width: 100%;
        min-height: 100px;
    }
    /deep/.el-image{
        margin: auto;
        display: block;
    }
    /deep/.el-form{
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
    }
    /deep/.el-form .el-form-item{
        width: 23%;
    }
    /deep/.red{
        color: #F56C6C;
    }
    /deep/.foot{
        width: 135px;
        margin: auto;
    }
    /deep/.el-form p{
        height: 20px;
    }




</style>
<template>
    <div class = "AgencyInfo">
        <div class = "c_header">
            <el-button type="primary" size="mini" style="margin-left: 10px;margin-top: 15px" @click="openaddAgency('AgencyAddForm')">添加代理机构</el-button>
            <el-dialog
                    title="添加代理机构"
                    :visible.sync="addAgencyVisible"
                    center
                    :before-close="handleClose">
                    <div class="AddAgency" >
                        <el-form :model="AgencyAddForm" status-icon :rules="AgencyAddRules" ref="AgencyAddForm"  >
                            <el-form-item label="代理机构名称" prop="name"  >
                                <el-input v-model="AgencyAddForm.name" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="代理机构名称首字母" prop="acronym"  >
                                <el-input v-model="AgencyAddForm.acronym" autocomplete="off"></el-input>
                            </el-form-item>

                            <el-form-item label="法人名称" prop="legalPerson">
                                <el-input     v-model.trim="AgencyAddForm.legalPerson" autocomplete="off" ></el-input>
                            </el-form-item>

                            <el-form-item label="联系电话" prop="phone">
                                <el-input   v-model="AgencyAddForm.phone" autocomplete="off" ></el-input>
                            </el-form-item>
                            <el-form-item label="代理机构编号" prop="number">
                                <el-input   v-model="AgencyAddForm.number" autocomplete="off" ></el-input>
                            </el-form-item>
                            <el-form-item label="统一社会信用代码" prop="code">
                                <el-input   v-model="AgencyAddForm.code" autocomplete="off" ></el-input>
                            </el-form-item>
                            <el-form-item label="代理机构区域" prop="region">
                                <el-cascader
                                        v-model = AgencyAddForm.region
                                        :props="{ checkStrictly: true }"
                                        :options="valueBatch"
                                        ref="addRegion"
                                ></el-cascader>

                            </el-form-item>
                            <el-form-item label="描述" prop="description">
                                <el-input   type="textarea"
                                            :rows="14"  v-model="AgencyAddForm.description" autocomplete="off" ></el-input>
                            </el-form-item>
                            <el-form-item label="营业执照" prop = "businessLicense" class="businessLicenseItem" >
                                <el-upload
                                        class="avatar-uploader"
                                        action="#"
                                        :show-file-list="false"
                                        accept=".jpg,.jpeg,.png"
                                        :http-request = "uploadAvatar"
                                        :before-upload="beforeAvatarUpload"
                                >
                                    <el-image v-if="imageUrl" :src="imageUrl"  :fit = "fit" class="avatar"></el-image>
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </el-form-item>
                            <el-form-item>
                                <div class="foot">
                                <el-button style="margin-left: 40px" @click="addAgencyVisible = false">取消</el-button>
                                    <el-button type = "primary" @click="addAgencySubmit('AgencyAddForm')">提交</el-button>
                                </div>
                            </el-form-item>
                        </el-form>
                    </div>
            </el-dialog>
            <div class="sear"
                    style = " width: 300px;
                    height: 30px;
                    float: right;
                    margin-top: 13px">
                <el-input type="text" @keyup.enter.native="AgencySearch"  v-model="search" style = "width: 200px;" @input = "change($event)"></el-input>
                <el-button type="primary"  @click="AgencySearch">搜索</el-button>
            </div>
        </div>
        <div class = "AgencyTable">
            <el-table
                    height="100%"
                    :data="agencies"
                    width="100%"
                >

                <el-table-column
                        prop="a_name"
                        label="代理机构名称"
                        min-width = "10%"
                        >
                </el-table-column>

                <el-table-column
                        prop="a_legal_person"
                        label="法人"
                        min-width = "10%"
                        >
                </el-table-column>

                <el-table-column
                        prop="a_agent_total"
                        label="授权总数"
                        min-width = "10%"
                >
                </el-table-column>

                <el-table-column
                        prop="a_rate_of_authorization"
                        label="授权率"
                        min-width = "10%"
                        >
                </el-table-column>

                <el-table-column
                        prop="a_rate_of_invention"
                        label="发明专利授权率"
                        min-width = "10%"
                >
                </el-table-column>
                <el-table-column
                        prop="a_contact_number"
                        label="联系电话"
                        min-width = "10%"
                >
                </el-table-column>
                <el-table-column
                        label="操作"
                        min-width = "20%">
                    <template slot-scope="scope">

            <el-button @click="OpenUsers(scope.row)" size = "mini" type="text" style = "margin-right: 10px">查看用户</el-button>
                        <el-button @click="Openhome(scope.row)" type="text">查看首页</el-button>
                        <el-button type="text" size="mini"  @click = "openrevenue(scope.row)">案件利润</el-button>
                        <el-button type="text" size="mini"  @click = "openDetail(scope.row.a_id)">详情</el-button>
                        <el-dialog
                                title="代理机构详情"
                                :visible.sync="DetailVisible"
                                center
                                :before-close="handleClose" >
                            <div class="AgencydetailBox" >
                                <el-form >
                                    <el-form-item label="支付二维码"  >
                                        <el-image
                                                style="width: 300px; height: 200px"
                                                :src="detail.a_pay_image"
                                                :fit="fit">
                                            <div slot="error" class="image-slot">
                                                <i class="el-icon-picture-outline"> 暂无图片</i>
                                            </div>
                                        </el-image>
                                    </el-form-item>

                                    <el-form-item label="营业执照"  >
                                        <el-image
                                        style="width: 300px; height: 200px"
                                        :src="detail.a_business_license"
                                        :fit="fit">
                                            <div slot="error" class="image-slot">
                                                <i class="el-icon-picture-outline"> 暂无图片</i>
                                            </div>
                                        </el-image>
                                    </el-form-item>
                                    <el-form-item label="代理机构名称"  >
                                        <span v-if = detail.a_name>{{detail.a_name}} </span>
                                        <span v-else class="red">暂无信息</span>
                                    </el-form-item>
                                    <el-form-item label="描述" >
                                        <span v-if = detail.a_description> {{detail.a_description}}</span>
                                        <span v-else class="red">暂无信息</span>
                                    </el-form-item>

                                    <el-form-item label="法人名称">
                                        <span v-if = detail.a_legal_person > {{detail.a_legal_person}}</span>
                                        <span v-else class="red">暂无信息</span>
                                    </el-form-item>
                                    <el-form-item label="发明专利价格" >
                                        <span v-if = detail.a_invention_price> {{detail.a_invention_price}}</span>
                                        <span v-else class="red">暂无信息</span>
                                    </el-form-item>
                                    <el-form-item label="实用专利价格" >
                                        <span v-if = detail.a_practical_price> {{detail.a_practical_price}}</span>
                                        <span v-else class="red">暂无信息</span>
                                    </el-form-item>
                                    <el-form-item label="外观专利价格" >
                                        <span v-if = detail.a_appearance_price> {{detail.a_appearance_price}}</span>
                                        <span v-else class="red">暂无信息</span>
                                    </el-form-item>
                                    <el-form-item label="联系电话" >
                                        <span v-if = detail.a_contact_number> {{detail.a_contact_number}}</span>
                                        <span v-else class="red">暂无信息</span>
                                    </el-form-item>
                                    <el-form-item label="代理机构编号" prop=" number">
                                        <span v-if = detail.a_number> {{detail.a_number}}</span>
                                        <span v-else class="red">暂无信息</span>
                                    </el-form-item>
                                    <el-form-item label="统一社会信用代码" >
                                        <span v-if = detail.a_unified_social_credit_code> {{detail.a_unified_social_credit_code}}</span>
                                        <span v-else class="red">暂无信息</span>
                                    </el-form-item>
                                    <el-form-item label="代理机构区域" >
                                    <span v-if = detail.a_region> {{detail.a_region}}</span>
                                        <span v-else class="red">暂无信息</span>
                                    </el-form-item>
                                    <el-form-item label="代理总数" >
                                        <span v-if = detail.a_agent_total> {{detail.a_agent_total}}</span>
                                        <span v-else class="red">暂无信息</span>
                                    </el-form-item>
                                    <el-form-item label="授权率" >
                                        <span v-if = detail.a_rate_of_authorization> {{detail.a_rate_of_authorization}}</span>
                                        <span v-else class="red">暂无信息</span>
                                    </el-form-item>
                                    <el-form-item label="发明专利授权率" >
                                        <span v-if = detail.a_rate_of_invention> {{detail.a_rate_of_invention}}</span>
                                        <span v-else class="red">暂无信息</span>
                                    </el-form-item>


                                </el-form>
                            </div>

                        </el-dialog>
                        <el-button type="text" @click = "openModify(scope.row.a_id)" size="mini" style="margin-left: 10px"> 修改</el-button>
                        <el-dialog
                                title="修改代理机构"
                                :visible.sync="ModifyAgencyVisible"
                                center
                                :before-close="handleClose">
                            <div class="modifyAgency" >
                                <el-form :model="AgencyModifyForm" status-icon :rules="AgencyModifyRules" ref="AgencyModifyRuleForm"  >
                                    <el-form-item label="重传营业执照"  class="businessLicenseItem" >
                                        <ImgUpdate @transferImg = "getImg"  :imageUrl = "detail.a_business_license"></ImgUpdate>
                                    </el-form-item>
                                    <el-form-item label="代理机构名称" prop="name"  >
                                        <el-input v-model="AgencyModifyForm.name" autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="代理机构名称首字母" prop="acronym"  >
                                        <el-input v-model="AgencyModifyForm.acronym" autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="描述" prop="description">
                                        <el-input  type="textarea"
                                                   :rows="14"  v-model="AgencyModifyForm.description" autocomplete="off" ></el-input>
                                    </el-form-item>
                                    <el-form-item label="法人名称" prop="legalPerson">
                                        <el-input   v-model.trim="AgencyModifyForm.legalPerson" autocomplete="off" ></el-input>
                                    </el-form-item>
                                    <el-form-item label="联系电话" prop="phone">
                                        <el-input   v-model="AgencyModifyForm.phone" autocomplete="off" ></el-input>
                                    </el-form-item>
                                    <el-form-item label="代理机构编号" prop="number">
                                        <el-input   v-model="AgencyModifyForm.number" autocomplete="off" ></el-input>
                                    </el-form-item>
                                    <el-form-item label="统一社会信用代码" prop="code">
                                        <el-input   v-model="AgencyModifyForm.code" autocomplete="off" ></el-input>
                                    </el-form-item>
                                    <el-form-item label="代理机构区域" >
                                        <el-cascader
                                                v-model = AgencyModifyForm.region
                                                :options="valueBatch"
                                                :props="{ checkStrictly: true }"
                                                ref="modifyRegion"
                                        ></el-cascader>

                                    </el-form-item>

                                    <el-form-item>
                                      <div class="foot">
                                        <el-button style="margin-left: 40px" @click="ModifyAgencyVisible = false">取消</el-button>
                                        <el-button type="primary" @click="ModifyAgencySubmit('AgencyModifyRuleForm')">提交</el-button>
                                      </div>
                                    </el-form-item>
                                </el-form>
                            </div>

                        </el-dialog>
                        <el-tooltip class="item"  effect="dark" content="该代理机构已被删除" placement="right">
                            <el-button style=" border: none; background-color: transparent;" size="mini" v-show="scope.row.a_is_delete" icon="el-icon-warning"></el-button>
                        </el-tooltip>
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
                    :total="count"
            >
            </el-pagination>
        </div>
        </div>
</template>

<script>
    import AddImg from '../common/addImg.vue'
    import ImgUpdate from '../common/ImageUpdate.vue'
    import {reqGetAgencyList,posAddAgency,reqGetAgencyDetail,reqputAgencyModify,reqGetAgencyRegion } from '@/api/Agency'
    import { validPhone,validateSocialCode,validateInitials ,validateAgencyNum} from '../../utils/validate';
    import regionData from '../../../public/static/address.json'
    export default {
        components:{
            ImgUpdate,
            AddImg
        },
        data() {
            return {
                imageUrl:'',
                img:null,
                 file:'',
                valueBatch:[],
                page_size:10,
                currentPage:1,
                count:0,
                fit:'scale-down',
                search:'',
                DetailVisible:false,
                addAdminVisible:false,
                addAgencyVisible: false,
                ModifyAgencyVisible:false,
                agencies: [],
                detail:{},
                region:'',
                AgencyAddRules:{
                    businessLicense:[{ required: true, message: '请上传营业执照', trigger: 'blur'}],

                    acronym:[
                            { required: true, message: '请输入代理机构首字母', trigger: 'blur'},
                             { validator:validateInitials,trigger:'blur'}
                        ],

                    name:[{ required: true, message: '请输入代理机构名称', trigger: 'blur'},

                    ],
                    code:[
                        {required: true,  message: '请输入社会信用代码',trigger: 'blur'},
                        {validator:validateSocialCode,trigger: 'blur'}
                    ],
                    legalPerson:[
                                {required: true, message: '请输入法人名称', trigger: 'blur'},
                                 {max: 20, message: '姓名过长', trigger: 'blur'}
                    ],
                    number:[{required: true, message: '请输入编号', trigger: 'blur'},
                        {validator:validateAgencyNum ,trigger: 'blur'}],

                    phone:[{validator:validPhone, trigger:'blur'}],
                },
                AgencyModifyRules:{
                    acronym:[
                        { required: true, message: '请输入代理机构首字母', trigger: 'blur'},
                        { validator:validateInitials,trigger:blur }],

                    name:[{ required: true, message: '请输入代理机构名称', trigger: 'blur'}],

                    code:[
                        {required: true,  message: '请输入社会信用代码',trigger: 'blur'},
                        {validator:validateSocialCode ,trigger: 'blur'}
                      ],

                    legalPerson:[
                        {required: true, message: '请输入法人名称', trigger: 'blur'},
                        {max: 20, message: '姓名过长', trigger: 'blur'}
                    ],

                    number:[{required: true, message: '请输入编号', trigger: 'blur'},
                        {validator:validateAgencyNum ,trigger: 'blur'}
                    ],

                    phone:[
                        {validator:validPhone, trigger:'blur'}
                    ],
                },
                AgencyAddForm:{
                    acronym:'',
                    name:'',
                    number:'',
                    description:'',
                    phone:'',
                    code:'',
                    legalPerson:'',
                    region:'',
                    businessLicense:'',
                },
                AgencyModifyForm:{
                    acronym:'',
                    name:'',
                    number:'',
                    description:'',
                    phone:'',
                    code:'',
                    legalPerson:'',
                    region:'',
                },
                Form:{},
            }
        },
        mounted(){
            this.cssStyle();
            this.getAgencyList();
            this.getRegion();
        },
        methods: {
            async getAgencyList(page = this.currentPage,search = this.search){
              try {
                  const res = await reqGetAgencyList(page,search);
                  if( !res.agencies){
                      this.agencies = [];
                      this.count  = 0;
                      return
                  }
                  this.agencies = res.agencies;
                  this.count = res.count;
              } catch (e) {
                  // do nothing
              }
            },
            //代理机构详情
            async getAgencyDetail(id){
                try {
                    const res = await reqGetAgencyDetail(id);
                    if(!res.detail){
                        this.detail = '';
                    }
                    this.detail = res.detail;

                } catch (e) {
                    // do nothing
                }
            },
            // 获得地区
            getRegion() {
                this.valueBatch = regionData.map(item => ({
                    value: item.provice,
                    label: item.provice,
                    children :item.city? item.city.map(v=>({
                        value: v,
                        label: v,
                    })) : null

                }));

            },
            //添加代理机构
            async AddAgency(form){
                try {
                    const res = await posAddAgency(form);
                    if(res.msg === "success"){
                        this.$message({
                            type:'success',
                            message:'添加成功'
                        });
                        this.addAgencyVisible = false;
                    }

                } catch (e) {
                    // do nothing
                }
            },
            //修改代理机构
            async Modifygency(form){
                try {
                    const res = await reqputAgencyModify(form);
                    if(res.msg === "success"){
                        this.$message({
                            type:'success',
                            message:'修改成功'
                        });
                        this.ModifyAgencyVisible = false;
                    }

                } catch (e) {
                    // do nothing
                }
            },
            //确定添加代理机构
            addAgencySubmit(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.Form = this.AgencyAddForm;
                        let length = this.Form.region.length;
                        if(length){
                            if(length > 1){
                                this.Form.region =  this.Form.region[0]+' '+this.Form.region[1];
                            }
                            else
                                this.Form.region =  this.Form.region[0];
                        }

                        let formData = new FormData();
                        for(const key in this.Form){
                            formData.append(key,this.Form[key])
                        }
                        this.AddAgency(formData).then(()=>{
                            this.getAgencyList();
                        });
                    } else {
                        return false;
                    }
                });
            },
            OpenUsers(row){
                this.$router.push({path:'/AgencyUser/'+row.a_id})
            },
            Openhome(row){
                this.$router.push({path:'/agencyHome/'+row.a_id})
            },
            //打开添加代理机构弹窗
            openaddAgency(){
                this.AgencyAddForm = {
                    acronym:'',
                        name:'',
                        number:'',
                        description:'',
                        phone:'',
                        code:'',
                        legalPerson:'',
                        region:'',
                        businessLicense:'',
                };
                this.imageUrl = null;
                this.addAgencyVisible = true;

            },
            //打开修改代理机构弹窗
            openModify(id){
                this.ModifyAgencyVisible = true;
                this.getAgencyDetail(id).then(()=>{
                    this.AgencyModifyForm.id  = id;
                    this.AgencyModifyForm.acronym = this.detail.a_acronym;
                    this.AgencyModifyForm.name = this.detail.a_name;
                    this.AgencyModifyForm.description = this.detail.a_description;
                    this.AgencyModifyForm.phone = this.detail.a_contact_number;
                    this.AgencyModifyForm.code = this.detail.a_unified_social_credit_code;
                    this.AgencyModifyForm.legalPerson = this.detail.a_legal_person;
                    this.AgencyModifyForm.number = this.detail.a_number;
                    this.AgencyModifyForm.region = this.detail.a_region.split(' ');

                })
            },
            //确定提交代理机构修改
            ModifyAgencySubmit(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.Form = this.AgencyModifyForm;

                        let length = this.Form.region.length;
                        if(length){
                            if(length > 1){
                                this.Form.region =  this.Form.region[0]+' '+this.Form.region[1];
                            }
                            else
                                this.Form.region =  this.Form.region[0];
                        }
                        let formData = new FormData();
                        for(const key in this.Form){
                            formData.append(key,this.Form[key])
                        }
                        this.Modifygency(formData).then(()=>{
                            this.getAgencyList();
                        });
                    } else {
                        return false;
                    }
                });


            },

            uploadAvatar(file) {
                const  img = file.file;
                this.AgencyAddForm.businessLicense = img;
                this.imageUrl = URL.createObjectURL(file.file);
            },

            //图片格式验证
            beforeAvatarUpload(file) {
                let types = ['image/jpeg', 'image/png'];

                const isImage = types.includes(file.type);

                const isLtSize = file.size / 1024 / 1024 < 5;

                if (!isImage) {

                    this.$message.error('上传图片只能是 JPG、PNG 格式!');

                    return false;

                }

                if (!isLtSize) {

                    this.$message.error('上传图片大小不能超过 5MB!');

                    return false;

                }

            },

            //得到添加代理机构的图片
            getAddImg(img){
                if(!img){
                    return
                }
                this.AgencyAddForm.businessLicense = img;
            },
            //得到修改代理机构的图片
            getImg(img){
                if(!img){
                    return
                }
                this.AgencyModifyForm.businessLicense = img;
            },
            //跳转案件利润
            openrevenue(row){
                this.$router.push({path:'/agencyEarn/'+row.a_id})
            },

            openDetail(id){
                this.DetailVisible = true;
                this.getAgencyDetail(id);
            },
            AgencySearch(){
                this.getAgencyList(1,this.search)
            },
            change(e){
                this.$forceUpdate()
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getAgencyList(this.currentPage)

            },
             handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            //css样式
            cssStyle(){
                let footHeight = document.getElementsByClassName('block')[0].offsetHeight;
                let tablebox = document.getElementsByClassName('AgencyTable')[0];
                let AgencyInfoHeight =  document.getElementsByClassName('AgencyInfo')[0].offsetHeight;
                tablebox.style.height  = AgencyInfoHeight-footHeight-56+'px'
            },



        }
    }

</script>


<style scoped >
    /deep/.c_header{
        font-size: 16px;
        height: 56px;
        width: 100%;
        min-width: 1200px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }
    .AgencyInfo{
        width: 100%;
        height: 100%;
        background: #FFCCCC;
    }

    /deep/.el-form input{
        width: 80%;
    }
    /deep/.AgencyTable{
        width: 100%;
    }
    /deep/.el-form label{
        color: #82848a;
    }
    /deep/ .AddAgency ,.modifyAgency,.AgencydetailBox{
        width: 468px;
        height: 430px;
        padding: 10px;
        margin: auto;
        overflow-x: hidden;
    }
    /deep/.foot{
        width: 180px;
        margin: auto;
    }
   /deep/.el-dialog {
       width:580px;
       background-image: linear-gradient(to bottom right, #FFEFBA 0%, #FFFFCC 100%);
    }
   /deep/ .upload{
       color: white;
   }
   /deep/ .el-table thead {
        font-weight: 500;
    }
   /deep/ .el-dialog .el-form-item{
       width: 400px;

   }
   /deep/ .el-dialog .el-upload{
       width: 300px;
   }
    /deep/ .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 200px;
        line-height: 200px;
        text-align: center;
    }

    /deep/ .red{
        color: #dd6161 !important
    }
    /deep/ .green{
        color:#4CAF50 !important
    }
    /deep/.block{
        text-align: center;
    }

</style>
<template>
    <div class = "patent_box">
        <div class = "c_header">
            <el-select style="margin-left: 10px;margin-top: 13px" v-model="status" @change="PatentSearch" placeholder="请选择状态">
                <el-option
                        v-for="item in Statusoptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>

            <el-popconfirm
                    @onConfirm = openUpdatePatentData()
                    iconColor="red"
                    title="操作比较耗时，可能导致数据库暂时无法使用，谨慎操作">
                <el-button  slot="reference" size="mini" type="danger"   style="margin-left: 10px">上传专利数据</el-button>
            </el-popconfirm>

            <el-dialog
                    center
                    title="上传专利数据"
                    :visible.sync="updateDataFileVisible"
                    width="30%"
            >
                <el-upload
                        class="upload-demo"
                        drag
                        multiple
                        accept=".7z"
                        :headers="header"
                        action="/api/PatentBackstage/web/patentManage/patent/upload"
                        :before-upload="beforePatentDataUpload"
                        :on-success = "successhandle"
                >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                </el-upload>
            </el-dialog>
            <el-popconfirm
                    iconColor="red"
                    @onConfirm = openUpdatePatentLow()
                    title="操作比较耗时,可能导致数据库暂时无法使用,谨慎操作"
            >
                <el-button  slot="reference" type="danger" size="mini" style="margin-left: 10px"> 上传法律数据</el-button>
            </el-popconfirm>


            <el-dialog
                    class="upload-demo"
                    center
                    title="上传法律数据"
                    :visible.sync="updateLoweDataFileVisible"
                    width="30%"
            >
                <el-upload
                        class="upload-demo"
                        drag
                        multiple
                        :headers="header"
                        accept=".zip"
                        :before-upload="beforeLowDataUpload"
                        action="/api/PatentBackstage/web/patentManage/law/upload"
                        :on-success = "successhandle"
                >
                    <i  class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                </el-upload>
            </el-dialog>

            <div class="sear" style="width: 300px;height: 30px;float: right;margin-top: 13px">
                <el-input  type="text" v-model="search" @keyup.enter.native="PatentSearch" style="height: 30px; width:200px;"></el-input>
                <el-button type="primary" @click="PatentSearch" icon="el-icon-search"  ></el-button>
            </div>

        </div>
        <div class = "PatentTable">
        <template>
            <el-table
                    v-loading="loading"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(255, 255, 255,1 )"
                    :data="patents"
                    height = "100%"
                    style="width: 100% ;">
                <el-table-column
                        prop="p_name"
                        label="专利名称"
                        min-width="20%">
                </el-table-column>
                <el-table-column
                        prop="p_patent_number"
                        label="申请号"
                        min-width="20%">
                </el-table-column>


                <el-table-column
                        prop="p_type"
                        label="类别"
                        min-width ="20%">
                </el-table-column>

                <el-table-column
                        prop="p_status"
                        label="状态"
                        min-width="20%">
                </el-table-column>
                <el-table-column
                        prop="p_create_time"
                        label="发明时间"
                        min-width="20%">
                </el-table-column>

                <el-table-column
                        label="操作"
                        min-width="20%">
                    <template slot-scope="scope">
                    <el-button size="mini" type="text" @click="openPatentPeople(scope.row.p_id)">相关人员</el-button>
                        <el-button size="mini" type="text" style="margin-right:10px" @click="openModifyPatent(scope.row.p_id)">修改  </el-button>
                    <el-button size = "mini"  type = "text" @click="wPatentDetail(scope.row.p_id)" style="margin-left: 10px">详情</el-button>
                        <el-dialog title="专利详情" :visible.sync="detailVisible" center width="1000px"  :before-close="handleClose">
                                <div class="patentDetailBox" >
                                    <el-form :inline="true" >
                                        <el-form-item  v-show = "patentDetail.p_url" label="专利图片">
                                            <el-image style="width: 250px; height: 200px;;
                                             "
                                                    :src="patentDetail.p_url"
                                                    :fit="fit"
                                                >
                                            </el-image>
                                        </el-form-item>
                                        <el-form-item label="代理机构名称">
                                            <span v-if = patentDetail.p_agency_name>{{patentDetail.p_agency_name }}</span>
                                            <span v-else class="red">暂无信息</span>
                                        </el-form-item>
                                        <el-form-item label="代理机构编号">
                                            <span v-if = patentDetail.p_agency_num>{{patentDetail.p_agency_num }}</span>
                                            <span v-else class="red">暂无信息</span>
                                        </el-form-item>

                                        <el-form-item label="代理人">
                                            <span v-if = patentDetail.p_agent_name>{{patentDetail.p_agent_name }}</span>
                                            <span v-else class="red">暂无信息</span>
                                        </el-form-item>
                                            <el-form-item label="专利名称">
                                                <span v-if =  patentDetail.p_name >{{ patentDetail.p_name }}</span>
                                                <span v-else class="red">暂无信息</span>
                                            </el-form-item>
                                            <el-form-item label="申请号">
                                                <span v-if = patentDetail.p_patent_number >{{ patentDetail.p_patent_number }}</span>
                                                <span v-else class="red">暂无信息</span>
                                            </el-form-item>
                                            <el-form-item label="专利类别">
                                                <span v-if =  patentDetail.p_type >{{ patentDetail.p_type }}</span>
                                                <span v-else class="red">暂无信息</span>
                                            </el-form-item>
                                            <el-form-item label=" 专利状态">
                                                <span v-if = patentDetail.p_status>{{ patentDetail.p_status }}</span>
                                                <span v-else class="red">暂无信息</span>
                                            </el-form-item>
                                        <el-form-item label="主分类号">
                                            <span v-if = patentDetail.p_main_classification>{{patentDetail.p_main_classification }}</span>
                                            <span v-else class="red">暂无信息</span>
                                        </el-form-item>
                                        <el-form-item label="公开号">
                                            <span v-if = patentDetail.p_country_name>{{patentDetail.p_country_name }}</span>
                                            <span v-else class="red">暂无信息</span>
                                        </el-form-item>
                                        <el-form-item label="公开号（带国别类型）">
                                            <span v-if = patentDetail.p_public_number_country>{{patentDetail.p_public_number_country }}</span>
                                            <span v-else class="red">暂无信息</span>
                                        </el-form-item>
                                        <el-form-item label="审查员">
                                            <span v-if = patentDetail.p_examiner>{{patentDetail.p_examiner }}</span>
                                            <span v-else class="red">暂无信息</span>
                                        </el-form-item>
                                        <el-form-item label="发明人">
                                            <span v-if = patentDetail.p_inventors>{{patentDetail.p_inventors }}</span>
                                            <span v-else class="red">暂无信息</span>
                                        </el-form-item>
                                        <el-form-item label="申请人地址">
                                            <span v-if = patentDetail.p_applicants_address>{{patentDetail.p_applicants_address }}</span>
                                            <span v-else class="red">暂无信息</span>
                                        </el-form-item>

                                        <el-form-item label="公告日">
                                            <span v-if = patentDetail.p_note_time>{{patentDetail.p_note_time }}</span>
                                            <span v-else class="red">暂无信息</span>
                                        </el-form-item>

                                        <el-form-item label="公开日">
                                            <span v-if = patentDetail.p_public_time>{{patentDetail.p_public_time }}</span>
                                            <span v-else class="red">暂无信息</span>
                                        </el-form-item>


                                            <el-form-item label=" 申请时间">
                                                <span v-if = patentDetail.p_application_date  >{{ patentDetail.p_application_date }}</span>
                                                <span v-else class="red">暂无信息</span>
                                            </el-form-item>
                                            <el-form-item label=" 授权时间">
                                                <span v-if = patentDetail.p_authorization_time>{{patentDetail.p_authorization_time }}</span>
                                                <span v-else class="red">暂无信息</span>
                                            </el-form-item>
                                            <el-form-item label=" 专利创建时间">
                                                <span v-if = patentDetail.p_create_time>{{ patentDetail.p_create_time }}</span>
                                                <span v-else class="red">暂无信息</span>
                                            </el-form-item>
                                            <el-form-item label="下次缴费时间">
                                                <span v-if = patentDetail.p_next_payment_time>{{patentDetail.p_next_payment_time }}</span>
                                                <span v-else class="red">暂无信息</span>
                                            </el-form-item>
                                        <el-form-item label="联系人">
                                            <span v-if = patentDetail.p_contact_name>{{patentDetail.p_contact_name }}</span>
                                            <span v-else class="red">暂无信息</span>
                                        </el-form-item>
                                        <el-form-item label="联系电话">
                                            <span v-if = patentDetail.p_contact_phone>{{patentDetail.p_contact_phone }}</span>
                                            <span v-else class="red">暂无信息</span>
                                        </el-form-item>

                                        <el-form-item label="专利年费缴纳次数">
                                            <span v-if = patentDetail.p_pay_num>{{patentDetail.p_pay_num }}</span>
                                            <span v-else class="red">暂未缴纳</span>
                                        </el-form-item>
                                        <el-form-item >

                                        </el-form-item>
                                        <el-form-item label="摘要">
                                            <span v-if = patentDetail.p_abstract>{{patentDetail.p_abstract }}</span>
                                            <span v-else class="red">暂无信息</span>
                                        </el-form-item>

                                        <el-form-item label="主权利要求">
                                            <span v-if = patentDetail.p_main_claims>{{patentDetail.p_main_claims }}</span>
                                            <span v-else class="red">暂无信息</span>
                                        </el-form-item>
                                        <el-form-item label="非引证信息">
                                            <span v-if = patentDetail.p_non_patent_references>{{patentDetail.p_non_patent_references }}</span>
                                            <span v-else class="red">暂无信息</span>
                                        </el-form-item>
                                        <el-form-item label="引证信息">
                                            <span v-if = patentDetail.p_citation_patent_documents>{{patentDetail.p_citation_patent_documents }}</span>
                                            <span v-else class="red">暂无信息</span>
                                        </el-form-item>

                                    </el-form>


                                </div>
                        </el-dialog>
                        <el-dialog
                                title="专利修改"
                                :visible.sync="updatePatentVisible"
                                width="500px"
                                center
                        >
                            <el-form :model="PatentForm" status-icon :rules="PatentRules" ref="PatentForm"
                                     label-width="135px" style="width:350px">
                                <el-form-item label="专利名称" prop = "name">
                                    <el-input v-model="PatentForm.name" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="专利状态">
                                    <el-select v-model="PatentForm.status" placeholder="请选择专利状态"
                                               value="PatentRuleForm.status">
                                        <el-option label="不转让" value="1"></el-option>
                                        <el-option label="待转让" value="2"></el-option>
                                        <el-option label="转让中" value="3"></el-option>
                                        <el-option label="申请中" value="4"></el-option>
                                        <el-option label="已申请" value="5"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-form>
                            <span slot="footer" class="dialog-footer">
                         <el-button @click="updatePatentVisible = false">取 消</el-button>
                         <el-button type="primary" @click="updatePatent('PatentForm')">提交</el-button>
                         </span>
                        </el-dialog>

                    </template>
                </el-table-column>

            </el-table>
        </template>
        </div>
        <div class="block">
            <el-pagination
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

<script >
    import { reqputPatentModify,reqGetPatentDetail,reqGetPatentStatus,reqGetPatentList,reqGetPatentCount } from '../../api/Patent';
    import {getToken,} from '../../utils/Func'
    export default {
        data() {
            return {
                header: {token: getToken()},
                updateLoweDataFileVisible:false,
                updateDataFileVisible:false,
                updatePatentVisible:false,
                count:0,
                fileUploadPercent:0,
                fit:'contain',
                search:'',
                detailVisible:false,
                currentPage:1,
                page_size:10,
                patents: [],
                id :'',
                patentDetail:{},
                status:'',
                Statusoptions:[],
                loading: true,
                patentLoading:true,
                countLoading:true,
                PatentForm: {
                    id: '',
                    name: '',
                    status: '',
                },
                PatentRules: {
                    name: [{ required: true, message: '请输入专利名称', trigger: 'blur' }],
                    status: [{ required: true, message: '请选择专利状态', trigger: 'blur' }],
                },
            }
        },

        mounted() {
            this.getPatentList(1,null,0);
            this.getPatentStatus();
            this.cssStyle();
            this.getPatentCount(null,0);
        },

        methods: {
            //查看专利数量
            async getPatentCount(search = this.search,status = this.status){
                try{
                    this.countLoading =true;
                    this.isLoading();
                    const res = await reqGetPatentCount(search,status);
                    this.count = res.count;
                    this.countLoading  =false;
                    this.isLoading();
                }catch (e) {
                    //;
                }

            },
            async getPatentList(page = this.currentPage,search = null,status = this.status){
                try {
                    this.patentLoading =true;
                    this.isLoading();
                    const res = await reqGetPatentList(page,search,status);
                    if(!res.patents){
                        this.patents = [];
                        return
                    }

                    let list =   res.patents;
                    for(let i = 0;i<list.length;i++){
                        list[i].p_create_time = this.dateString(list[i].p_create_time)
                    }
                    this.patents = list;
                    this.patentLoading =false;
                    this.isLoading();
                } catch (e) {

                }
            },
            //修改专利
            async ModifyPatent( modifyForm) {
                try {
                    const res = await reqputPatentModify(modifyForm);
                    if(res.msg === 'success'){
                        this.updatePatentVisible= false;
                        this.$message({
                            type:'success',
                            message:'操作成功'
                        });
                    }
                } catch (e) {

                }
            },
            //专利详情
            async getPatentDetail(id){
                try {
                    const res = await reqGetPatentDetail(id);
                    const data  = res.patentDetail;

                    data.p_non_patent_references =  this.transfeCritation(data.p_non_patent_references);

                    data.p_citation_patent_documents = this.transfeCritation(data.p_citation_patent_documents);

                    data.p_application_date = this.dateString(data.p_application_date);

                    data.p_authorization_time = this.dateString(data.p_authorization_time);

                    data.p_create_time = this.dateString( data.p_create_time);

                    data.p_next_payment_time  = this.dateString(data.p_next_payment_time);

                    data.p_note_time = this.dateString(data.p_note_time );

                    data.p_public_time = this.dateString( data.p_public_time);

                    this.patentDetail = data;

                } catch (e) {

                }
            },
            //将引证内容转化为！隔开
            transfeCritation(str ){
                if(!str){
                    return ''
                }
                let citationArr = [];
                citationArr = str.split(';');
                let citation = '';
                for(let i = 0;i<citationArr.length-1;i++){
                    citation +=  citationArr[i]+';|';
                }
                citation +=citationArr[citationArr.length-1];
                return citation
            },
            //专利状态列表
            async getPatentStatus(){
                try{
                    const res = await reqGetPatentStatus();
                    let k = 1;
                    this.Statusoptions.push({value:0, label:'全部'});
                    for(let item in res.patentStatus){
                        this.Statusoptions.push({value:k++, label:res.patentStatus[item]})
                    }
                    this.status = 0;

                }catch (e) {
                    //;
                }

            },

            //打开专利修改
            openModifyPatent(id){
                this.updatePatentVisible = true;
                    this.getPatentDetail(id).then(()=>{
                        this.PatentForm.id = parseInt(id);
                        this.PatentForm.name = this.patentDetail.p_name ;
                        if(this.patentDetail.p_status=='不转让')
                        this.PatentForm.status = '1' ;
                        if(this.patentDetail.p_status=='待转让')
                            this.PatentForm.status = '2' ;
                        if(this.patentDetail.p_status=='转让中')
                            this.PatentForm.status = '3' ;
                        if(this.patentDetail.p_status=='申请中')
                            this.PatentForm.status = '4' ;
                        if(this.patentDetail.p_status=='已申请')
                            this.PatentForm.status = '5' ;
                    })
                },

            //确认修改专利
            updatePatent(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                 //   this.PatentForm.status = parseInt(this.PatentForm.status);
                    this.ModifyPatent(this.PatentForm).then(()=>{
                        this.getPatentList();
                    });
                } else {
                    return false;
                }
            });

        },
           //打开上传专利数据弹窗
            openUpdatePatentData(){
                this.updateDataFileVisible = true;
            },


            //打开上传法律数据弹窗
            openUpdatePatentLow(){
                this.updateLoweDataFileVisible = true;
            },

            //专利上传格式验证
            beforePatentDataUpload(file) {

                let fileExtension = file.name.substring(file.name.lastIndexOf('.') + 1);
                const isLtSize = file.size / 1024 / 1024 < 100;
                if (!isLtSize) {

                    this.$message.error('上传文件大小不能超过 100MB!');

                    return false;

                }
                if (fileExtension !== '7z') {

                    this.$message.error('只能上传7z格式');

                    return false;
                }
            },
            //法律上传格式验证
            beforeLowDataUpload(file) {
                let fileExtension = file.name.substring(file.name.lastIndexOf('.') + 1);
                const isLtSize = file.size / 1024 / 1024 < 100;
                if (fileExtension !== 'zip') {

                    this.$message.error('只能上传zip格式');

                    return false;

                }
                if (!isLtSize) {

                    this.$message.error('上传文件大小不能超过 100MB!');

                    return false;

                }
            },
            //上传文件成功
            successhandle(res){
                try{
                    if(res.msg === 'success')
                        this.$message({
                            type:'success',
                            message:'上传成功'
                        });
                    else  if(res.code == 403){
                        this.$message.success("请先登录");
                        this.$route.push('/login');
                    }
                    else{
                        this.message.error(res.msg);
                    }
                }catch (e) {

                }




            },


            //加载判断
            isLoading(){

                if(this.countLoading  == false && this.patentLoading == false)
                    this.loading = false;

                else
                        this.loading = true;
            },


            wPatentDetail(id){
                this.detailVisible = true;
                this.getPatentDetail(id);
            },

            openPatentPeople(id){
                this.$router.push({path:'/PatentPeople/'+id})
            },

            PatentSearch(){
                this.getPatentCount();
                this.currentPage = 1;
                this.getPatentList(1,this.search,this.status);
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getPatentList();
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
                let tablebox = document.getElementsByClassName('PatentTable')[0];
                let bodyHeight =  document.getElementsByClassName('patent_box')[0].offsetHeight;
                tablebox.style.height  = bodyHeight-footHeight-56+'px'
            }
        }
    }

</script>

<style scoped >
   /deep/ .c_header{
        height: 56px;
        width: 100%;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        min-width: 1200px;
    }

     .patent_box{
        width: 100%;
        height: 100%;
        background: #FFCCCC;
    }
    /deep/.PatentTable{
        width: 100%;
    }

    /deep/.el-dialog {
        background-image: linear-gradient(to bottom right, #FFEFBA 0%, #FFFFFF 100%);
    }

    .el-table thead {
        font-weight: 500;
    }

   /deep/ .patentDetailBox{
        min-height: 400px;
        width: 100%;
    }
   /deep/ .patentDetailBox .el-form{
       width: 90%;
       height: 400px;
       overflow: auto;
       margin: auto;
   }
    /deep/.patentDetailBox .el-form-item{
        width:47%;
    }
   /deep/ .patentDetailBox label {
        color:#82848a ;
    }

   /deep/ .red{
       color:#dd6161 !important;
   }

    /deep/.block{
        text-align:center
    }
    /deep/ .el-upload{
        width: 100%;
    }
   /deep/ .el-upload-dragger{
       width: 100%;
   }



</style>
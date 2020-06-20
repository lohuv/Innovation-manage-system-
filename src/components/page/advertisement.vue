<template>
    <div class="advertisementBox">
        <div class="header_box">
            <el-select v-model="dele" @change="search" style="margin-top: 13px; width: 150px; margin-left: 10px" placeholder="请选择状态">
                <el-option label="正常" value="0"></el-option>
                <el-option label="已删除" value="1"></el-option>
            </el-select>
            <el-button type="primary" size="mini" style="margin-left: 10px;margin-top: 15px"  @click="openAdd">添加广告</el-button>
            <el-dialog
                    title="添加广告"
                    :visible.sync="addVisible"
                    center
                    :before-close="handleClose">
                <el-form  :model = "addAdForm"  :rules="AddAdRules" label-width="80px"  ref="addAdForm">
                    <el-form-item label = "广告图片" prop = "file"  autocomplete="off">
                        <addImg   @transferImg = "getAddImg"></addImg>
                    </el-form-item >

                    <el-form-item label = "广告链接"  prop = "url" >
                        <el-input v-model = "addAdForm.url" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item   label = "广告类型" prop = "type"  autocomplete="off">
                        <el-select  v-model = "addAdForm.type" placeholder="请选择广告类型">
                            <el-option label="登录页广告" value="1"></el-option>
                        </el-select>
                    </el-form-item>

                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="addVisible = false">取 消</el-button>
                     <el-button type="primary" @click="addsubmit('addAdForm')">确 定</el-button>
                </span>
            </el-dialog>
            <el-popconfirm
                    @onConfirm = delAll()
                    title="要删除所有选中的广告吗？">
                <el-button type="danger" v-show = "!deleflag"  size="mini"  slot="reference" style="margin-top: 12px ;margin-left: 20px">批量删除</el-button>
            </el-popconfirm>


        </div>
    <div class="tabelbox">
        <el-table
                :data="advertisement"
                height = "100%"
                style="width: 100%;
                      "
                @selection-change="handleSelectionChange">
            <el-table-column
                    :selectable="checkSelectable"
                    type="selection"
                    min-width="5%">
            </el-table-column>
            <el-table-column
                    label="广告图片"
                    min-width="25%">

                <template slot-scope = "scope">
                    <el-image
                            style="width: 100px; height: 100px"
                            :src="scope.row.a_imageurl"
                    >
                        <div slot="error" class="image-slot">
                            <i class="el-icon-picture-outline"> 暂无图片</i>
                        </div>
                    </el-image>
                </template>
            </el-table-column>
            <el-table-column
                    prop="a_url"
                    label="广告链接"
                    min-width="25%">
            </el-table-column>
            <el-table-column
                    prop="a_type"
                    label="广告类型"
                    min-width="25%">
            </el-table-column>
            <el-table-column
                    label="操作"
                    min-width="25%">
                <template slot-scope="scope">
                    <el-popconfirm
                            @onConfirm = handleDelete(scope.row)
                            title="要删除这则广告吗？">
                        <el-button type="danger"  v-show = "!deleflag"  size="mini"  slot="reference" >删除</el-button>
                    </el-popconfirm>
                    <el-button type="success" size="mini"  v-show = "!deleflag"  slot="reference" style="margin-left: 10px" @click="openModify(scope.row)">修改</el-button>
                    <el-dialog
                            title="修改广告"
                            :visible.sync="modifyVisible"
                            center
                            :before-close="handleClose"
                    >
                    <el-form :model = "modifyAdForm"   label-width="80px" >
                        <el-form-item label = "广告链接" prop = "url" >
                            <el-input v-model = "modifyAdForm.url" autocomplete="off"></el-input>
                        </el-form-item>

                    </el-form>
                    <span slot="footer" class="dialog-footer">
                    <el-button @click="modifyVisible = false">取 消</el-button>
                     <el-button type="primary" @click="modifysubmit()">确 定</el-button>
                </span>
                    </el-dialog>
                </template>
            </el-table-column>
        </el-table>
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

<script>
    import {reqAddAdvertise,reqdeleAdvertise,reqGetAdvertiseList,reqModifyAdvertise} from '../../api/advertisement.js'
    import addImg from '../common/addImg';
    export default {
        name: 'advertisement',
        components:{
            addImg
        },
        data(){
            return{
                deleflag:0,
                img:'',
                addVisible:false,
                page_size:10,
                count:0,
                currentPage:1,
                dele:'0',
                modifyVisible:false,
                advertisement:[],
                deleArr:[],
                msg:'',
                multipleSelection:[],
                addAdForm:{
                    file:'',
                    type:'',
                    url:'',
            },
                modifyAdForm:{

                   id:'',
                    url:'',
                },
                AddAdRules:{
                    file: [{ required: true, message: '请上传广告图片', trigger: 'blur' }],
                    type: [{ required: true, message: '请选择广告类型', trigger: 'blur' }],

                }

            }
        },
        mounted() {
           this.getadvertisement();
            this.cssStyle();
        },

        methods: {
            async getadvertisement(dele = this.dele, page = this.currentPage) {
                try {
                    const res = await reqGetAdvertiseList(dele, page);
                    this.count = res.count;
                    if(dele == 0)
                        this.deleflag = false;
                    if(dele ==1)
                        this.deleflag = true;
                    if (!res.advertisement) {
                        this.advertisement = [];
                        return
                    }
                    this.advertisement = res.advertisement;

                } catch (e) {
                    //;
                }
            },
            async addAdvertisement(form) {
                try {
                    const res = await reqAddAdvertise(form);
                    if (res.msg == "success"){
                        this.$message({
                            type: 'success',
                            message: '添加成功'
                        });
                        this.addVisible = false;
                    }

                } catch (e) {
                    //;
                }
            },
            async modifyAdvertisement(form) {
                try {
                    const res = await reqModifyAdvertise(form);
                    if (res.msg == "success"){
                        this.$message({
                            type: 'success',
                            message: '修改成功'
                        });
                        this.getadvertisement();
                        this.modifyVisible = false;
                    }
                } catch (e) {
                    //;
                }
            },
            async deleadvertisement(arr = this.deleArr) {
                try {
                    const res = await reqdeleAdvertise(arr);
                    if (res.msg == "success")
                        this.$message({
                            type: 'success',
                            message: '删除成功'
                        });
                    this.deleArr = [];
                    this.multipleSelection = [];

                } catch (e) {
                    //;
                }
            },
            //单行删除
            handleDelete( row) {
                this.msg = row;//每一条数据的记录
                this.deleArr.push(this.msg.a_id);//把单行删除的每条数据的id添加进放删除数据的数组
                this.deleadvertisement().then(() => {
                    this.currentPage = 1;
                    this.getadvertisement()
                });
            },
            //批量删除

            delAll() {
                const length = this.multipleSelection.length;
                if (!length) {
                    this.$message.error("请先选中广告")
                } else {
                    for (let i = 0; i < length; i++) {
                        this.deleArr.push(this.multipleSelection[i].a_id);
                    }
                    this.deleadvertisement().then(() => {
                        this.currentPage = 1;
                        this.getadvertisement()
                    });
                }
            },
            //打开广告弹窗
            openAdd() {
                this.addVisible = true;

            },
            //
             addsubmit(formName){
                 this.$refs[formName].validate((valid) => {
                     if (valid) {
                         this.Form = this.addAdForm;
                         let formData = new FormData();
                         for(const key in this.Form){
                             formData.append(key,this.Form[key])
                         }
                         this.addAdvertisement(formData).then(()=>{
                             this.getadvertisement();
                         });
                     } else {
                         return false;
                     }
                 });
        },
            openModify(row){
                this.modifyVisible  =true;
                this.modifyAdForm.url = row.a_url;
                this.modifyAdForm.id = row.a_id;
            },
            modifysubmit(){
                this.modifyAdvertisement(this.modifyAdForm)
            },
            //得到广告图片
            getAddImg(img){
                if(!img){
                    return
                }
                this.addAdForm.file = img;
            },
            set_cell_style({row}){
                if ( this.deleflag== 1){
                    return 'color:#FF5F57;'
                }
            },
            checkSelectable(row){
                return this.deleflag == 0;
            },

            search(){
                this.getadvertisement();
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

            handleCurrentChange(val) {
                this.currentPage = val;

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
                let tablebox = document.getElementsByClassName('tabelbox')[0];
                let bodyHeight =  document.getElementsByClassName('advertisementBox')[0].offsetHeight;
                tablebox.style.height  = bodyHeight-footHeight-56+'px'
            }
        }

    };
</script>

<style scoped>
    .advertisementBox {
        width: 100%;
        height: 100%;
        background: #FFCCCC;
    }
    /deep/.tabelbox{
        width: 100%;
    }
    /deep/.header_box{
        width: 100%;
        height: 56px;
        min-width: 1200px;
    }
    /deep/.block{
        text-align: center;
    }
    /deep/.el-dialog{
        width: 500px;
    }
    /deep/.el-dialog .el-form label {
        font-size: 13px;
        width: 70px;
    }
    /deep/ .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 200px;
        line-height: 200px;
        text-align: center;
    }


</style>
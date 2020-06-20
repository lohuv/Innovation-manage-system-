<template>
    <div class="SystemConfigurationBox">
    <div class="header_Box">
        <el-popconfirm
                @onConfirm = AgencyCalculate()
                iconColor="red"
                title="操作比较耗时，可能导致数据库暂时无法使用，谨慎操作">
            <el-button type="danger"  slot="reference" style = "margin-left: 10px;margin-top: 15px" size = "mini">计算代理机构授权率</el-button>
        </el-popconfirm>

    </div>
    <div class ="tableBox">
        <el-table
                :data="templateFiles"
                style="width: 100%"
                height="100%"
        >
            <el-table-column
                    label="文件名"
                    min-width="25%">
                <template slot-scope="scope">
                <el-button @click="downloadFile(scope.row.f_id, scope.row.f_name)" type="text">{{scope.row.f_name}}</el-button>
                </template>
            </el-table-column>
            <el-table-column
                    prop="a_f_type"
                    label="文件类型"
                    min-width="25%">
            </el-table-column>
            <el-table-column
                    prop="f_upload_time"
                    label="更新时间"
                    min-width="25%">
            </el-table-column>

            <el-table-column
                    label="操作"
                    min-width="25%">
                <template slot-scope="scope">
                   <el-button @click="openUpdate(scope.row.f_id)"> 上传模板</el-button>
                    <el-dialog
                            center
                            title="上传模板"
                            :visible.sync="updateFileVisible"
                            width="440px"
                           >
                        <el-upload
                                class="upload-demo"
                                drag
                                action="#"
                                accept=".docx"
                                :before-upload="beforeAvatarUpload"
                                :http-request="upfile"
                                >
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        </el-upload>
                    </el-dialog>
                </template>
            </el-table-column>
        </el-table>
    </div>
    </div>
</template>

<script>
    import{reqGetAgencyFileList,posDownLoadAgencyFile,putUpdateAgencyFile,reqGetAgencyCalculate} from '../../api/SystemConfiguration.js'
    export default {
        name: 'SystemConfiguration',
        data(){
            return{
                updateFileVisible:false,
                templateFiles:[],
                form:[],
            }
        },
        mounted() {
            this.getAgencyFile();
        },
        methods:{
            //得到代理机构模板文件
            async getAgencyFile(){
                try{
                    const res  = await reqGetAgencyFileList();
                    if(!res.templateFiles) return;
                    const data = res.templateFiles;
                    for(let i = 0;i<data.length;i++){
                        data[i].f_upload_time = this.dateString( data[i].f_upload_time);
                        if(data[i].a_f_type === 1)
                            data[i].a_f_type = "专利申请合同模板";
                        if(data[i].a_f_type === 2)
                            data[i].a_f_type = "专利转让合同模板";
                        if(data[i].a_f_type === 3)
                            data[i].a_f_type = "委托书";
                        if(data[i].a_f_type === 4)
                            data[i].a_f_type = "著录项目变更申报书";
                    }
                    this.templateFiles = data;
                }catch (e) {
                    //;
                }


            },

            async downloadFile(id, name){
                try{

                    const res = await posDownLoadAgencyFile(id);
                    const name = decodeURIComponent(res.headers['content-disposition'].split('=')[1]);
                    let blob = new Blob([res.data], {type: "application/vnd.ms-excel"});
                    const link = document.createElement('a'); // 生成一个a标签。
                    link.href = window.URL.createObjectURL(blob); // href属性指定下载链接
                    link.download = name; // dowload属性指定文件名
                    link.click(); // click()事件触发下载

                }catch (e) {
                   // ;
                }
            },

            //上传文件
            async updateFile(form){
                try{
                    const res  = await putUpdateAgencyFile(form);
                    if(res.msg === 'success'){
                        this.$message({
                            type:'success',
                            message:'上传成功'
                        })}
                }catch (e) {
                   // ;
                }
            },
            //计算代理机构授权率
           async AgencyCalculate(){
                try{
                    const res = await reqGetAgencyCalculate();
                    this.$message({
                        type:'success',
                        message:'操作成功'
                    })

                }catch (e) {
                    //;
                }
            },

            //确定上传文件
            subUpdateFile(id,file){
                const form  = [];
                form.id = id;
                form.file = file;
                let formData = new FormData();
                for(const key in form){
                    formData.append(key,form[key])
                }
            },
            //文件上传前格式验证
            beforeAvatarUpload(file){

                let fileExtension = file.name.substring(file.name.lastIndexOf('.') + 1);
                const isLtSize = file.size / 1024 / 1024 < 100;
                if (fileExtension !== 'docx') {

                    this.$message.error('只能上传docx格式');

                    return false;

                }
                if (!isLtSize) {

                    this.$message.error('上传文件大小不能超过 100MB!');

                    return false;

                }
            },

            openUpdate(id){
                this.updateFileVisible = true;
                this.form.id = id;
            },
            upfile( file){
                this.form.file = file.file;
                let formData = new FormData();
                for(const key in this.form){
                    formData.append(key,this.form[key])
                }
                this.updateFile(formData).then(()=>{
                    this.getAgencyFile()
                });

            },


        }
    };
</script>

<style scoped>
.SystemConfigurationBox{
    width: 100%;
    height: 100%;
    background: #FFCCCC;;
}
    /deep/.header_Box{
        width: 100%;
        min-width: 1200px;
        height: 56px;
    }
    /deep/.tableBox{
        width: 100%;
        height: 90%;
        background:#FFFFFF;
    }
</style>
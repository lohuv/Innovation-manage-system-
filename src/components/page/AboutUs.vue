<template>
    <div class="AboutUs">
        <div class="About_header">关于我们</div>
        <div style="display: none">
            <!-- 图片上传组件辅助-->
            <el-upload
                    class="avatar-uploader"
                    :action="serverUrl"
                    name="file"
                    :headers="header"
                    :show-file-list="false"
                    :on-success="uploadSuccess"
                    :on-error="uploadError"
                    :before-upload="beforeUpload">
            </el-upload>
        </div>
        <!--富文本编辑器组件-->
            <quill-editor
                    v-model="detailContent"
                    ref="myQuillEditor"
                    :options="editorOption"
                    @change="onEditorChange($event)"
                    class="editor"
            >

            </quill-editor>
        <div class="foot">
            <el-button class="editor-btn" type="primary" @click="submit">提交</el-button>
        </div>


    </div>

</template>
<script>
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';
    import { quillEditor } from 'vue-quill-editor';
    import {reqGetAboutUs,reqPutUpdateUs} from '../../api/AboutUs.js'
    // 工具栏配置
    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{'header': 1}, {'header': 2}],               // custom button values
        [{'list': 'ordered'}, {'list': 'bullet'}],
        [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
        [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
        [{'direction': 'rtl'}],                         // text direction

        [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
        [{'header': [1, 2, 3, 4, 5, 6, false]}],

        [{'color': []}, {'background': []}],          // dropdown with defaults from theme
        [{'font': []}],
        [{'align': []}],
        [ 'image', ],
        ['clean']                                         // remove formatting button
    ]

    export default {
        components: {
            quillEditor
        },
        data() {
            return {
                quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
                serverUrl: '/api/web/system/us/file/upload',  // 要上传的图片服务器地址
                header: {token: sessionStorage.token},  // 有的图片服务器要求请求头需要有token之类的参数，写在这里
                detailContent: '', // 富文本内容
                editorOption: {
                    placeholder: '请输入正文',
                    theme: 'snow',  // or 'bubble'
                    modules: {
                        toolbar: {
                            container: toolbarOptions,  // 工具栏
                            handlers: {
                                'image': function (value) {
                                    if (value) {
                                        // 触发input框选择图片文件
                                        document.querySelector('.avatar-uploader input').click()
                                    } else {
                                        this.quill.format('image', false);
                                    }
                                }
                            }
                        }
                    }
                }  // 富文本编辑器配置
            }
        },
        mounted() {
            this.getAbout();
        },
        methods: {
            async getAbout(){
                try{
                    const res = await reqGetAboutUs();
                    this.detailContent = res.aboutUs;
                }catch (e) {
                   // ;
                }
            },
            async Update(content){
                try{
                    const res =  await  reqPutUpdateUs(content);
                    if(res.msg == "success"){
                        this.$message({
                            type:'success',
                            message:'修改成功!'
                        });
                    }
                }catch (e) {
                    //;
                }
            },
            onEditorChange({ editor, html, text }) {
                this.detailContent = html ;
            },
            submit(){
             this.Update(this.detailContent);
            },

            beforeUpload(file) {
                // 显示loading动画
                this.quillUpdateImg = true;
                let types = ['image/jpeg',  'image/png'];
                const isImage = types.includes(file.type);
                if (!isImage) {

                    this.$message.error('上传图片只能是 JPG、PNG 格式!');
                    return false;

                }
            },

            uploadSuccess(res, file) {
                // res为图片服务器返回的数据
                // 获取富文本组件实例
                let quill = this.$refs.myQuillEditor.quill;
                // 如果上传成功
                if (res.msg === 'success') {

                    let url = res.url;

                    // 获取光标所在位置
                    let length = quill.getSelection().index;
                    // 插入图片  res.info为服务器返回的图片地址
                    quill.insertEmbed(length, 'image', url);//插入<img src='url'/>
                    // 调整光标到最后
                    quill.setSelection(length + 1)
                } else {
                    this.$message.error('图片插入失败')
                }
                // loading动画消失
                this.quillUpdateImg = false
            },

            // 富文本图片上传失败
            uploadError() {
                // loading动画消失
                this.quillUpdateImg = false;
                this.$message.error('图片插入失败333333')
            }
        }
    }
</script>
<style scoped>
    .AboutUs{
        width: 100%;
        height: 100% ;
        background: #FFFFFF;
    }
    /deep/.editor{
        width: 100%;
        background: #FFFFFF;
    }
    /deep/.About_header{
        width: 100%;
        height: 10%;
        background: #fab6b6;
        text-align: center;
        font-size: 40px;
        color: #FFFFFF;
    }
    /deep/.foot{
        width: 100%;
    }
    /deep/.editor-btn{
        display:block;margin:0 auto
    }

</style>
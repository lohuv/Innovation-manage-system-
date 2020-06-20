<template>
    <div class = "imgUpdate">
        <el-upload
                class="avatar-uploader"
                action="#"
                :show-file-list="false"
                :http-request = "uploadAvatar"
                :before-upload="beforeAvatarUpload"
                accept="image/jpg,image/jpeg,image/png"
        >
            <el-image v-if="url" :src="url"  :fit = "fit" class="avatar"></el-image>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </div>
    </template>

<script>
    export default {
        props:{
            imageUrl:String,
            default:null,
        },

        data() {
            return {
                fit:'scale-down',
                url:this.imageUrl,
            };
        },
        methods: {
            uploadAvatar(file) {
                const  img = file.file;
                this.$emit('transferImg',img);
                this.url = URL.createObjectURL(file.file);
            },

            //图片格式验证
            beforeAvatarUpload(file) {
                let types = ['image/jpeg',  'image/png'];

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
        }

    }
</script>
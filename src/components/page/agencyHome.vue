<template>
    <div class = "agencyHomeBox">
    <div class="description">
        <p>代理机构描述：</p>
        <p>{{description}}</p>
        <el-popconfirm
                @onConfirm="DeleteNewsdescr"
                title="确定删除？"
        >
            <el-button
                    slot = "reference"
                    type="text"
                    icon="el-icon-delete"
                    style="color:red"
            ></el-button>

        </el-popconfirm>
    </div>

        <div class="imgHeader">
            <span style = "line-height: 60px;color: #FFFFFF;">新闻管理</span>
            <el-button style="float: right ;margin-top:15px;margin-right: 10px" @click="delAllNews">批量删除</el-button>
        </div>
                <div class = "newsTabelBox">
                    <el-table
                            @selection-change = "n_handleSelectionChange"
                            :data="ANews"
                            style="width: 100%"
                             height="92%">
                        <el-table-column
                                type="selection"
                                min-width="10%">
                        </el-table-column>
                        <el-table-column type="expand"  label="描述">
                            <template slot-scope="props">
                                <el-form label-position="left" inline class="demo-table-expand">
                                    <el-form-item label="新闻描述">
                                        <span>{{ props.row.a_a_description }}</span>
                                    </el-form-item>
                                </el-form>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="a_a_name"
                                label="新闻名"
                                min-width="20%">

                            <template slot-scope="scope">
                                <router-link :to = "'/NewsDetail/'+scope.row.a_a_id +'/2'"> {{scope.row.a_a_name}}</router-link>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="a_a_type"
                                label="新闻类型"
                                min-width="18%">
                        </el-table-column>

                        <el-table-column
                                prop="a_a_create_time"
                                label="创建时间"
                                min-width="16%">
                        </el-table-column>
                        <el-table-column
                                prop="a_a_start_time"
                                label="开始时间"
                                min-width="16%">
                        </el-table-column>
                        <el-table-column
                                prop="a_a_end_time"
                                label="结束时间"
                                min-width="16%">
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                min-width="18%">
                            <template slot-scope="scope">
                                <el-popconfirm
                                        @onConfirm=" Delenews(scope.row)"
                                        title="确定删除？"
                                >
                                    <el-button
                                            slot = "reference"
                                            type="danger"
                                            icon="el-icon-delete"
                                            circle

                                    ></el-button>

                                </el-popconfirm>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="block">
                        <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="currentPage"
                                :page-size="page_size"
                                :page-sizes="[10]"
                                layout="total,sizes, prev, pager, next, jumper"
                                :total="ANews.length"
                        >
                        </el-pagination>
                </div>
                </div>
       <div class="imgHeader">
            <span style = "line-height: 60px;color: #FFFFFF;">图片管理</span>
           <el-button style="float: right ;margin-top:15px;margin-right: 10px" @click="delAllImg">批量删除</el-button>
       </div>

        <div class="imgList">
            <el-table
                    @selection-change = "i__handleSelectionChange"
                    :data="images"
                    style="width: 100%"
                    height="92%">
                height="92%">
                <el-table-column
                        type="selection"
                        min-width="10%">
                </el-table-column>
                <el-table-column

                        label="首页图片"
                        min-width="70%">
                    <template slot-scope="scope">
                        <el-image  :fit="fit"  v-bind:src="scope.row.i_url" >
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column
                        min-width="20%">
                    <template slot-scope="scope">
                        <el-popconfirm
                                @onConfirm="Detepic(scope.row)"
                                title="确定删除？"
                        >
                            <el-button
                                    slot = "reference"
                                    type="danger"
                                    icon="el-icon-delete"
                                    circle

                            ></el-button>

                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="i_handleCurrentChange"
                        :current-page="icurrentPage"
                        :page-size="page_size"
                        :page-sizes="[10]"
                        layout="total,sizes,prev, pager, next, jumper"
                        :total="images.length"
                >
                </el-pagination>
            </div>

        </div>
    </div>
</template>

<script>
import {reqGetAgencyhome,deleAgencyhome} from '../../api/Agency.js'
import { posDelebackup } from '../../api/Backup';
    export default {
        props:{
            id:{
                type:String,
                default:''
            }
        },
        name: 'agencyHome',
        data() {
            return {
                idx:'',
                msg:'',
                page_size:10,
                n_multipleSelection:[],
                n_deleArr:[],
                i_multipleSelection:[],
                i_deleArr:[],
                icurrentPage:1,
                fit:'contain',
                activeName: 'news',
                currentPage:1,
                count:0,
                newsVisible:false,
                artical:'',
                headline:'',
                createTime:'',
                description:'',
                images:[],
                "ANews": [],
                agencyHome:[],
                AllNewsArr:[],
                AllImgArr:[],

            };
        },
        watch:{
            $route(to,form){
                this.getnews();
            }
        },
        mounted(){
            this.getnews();
        },
        methods: {
            //得到新闻首页信息
            async getnews(id =this.id){
                const res  = await reqGetAgencyhome(id);
                this.agencyHome = res.agencyHome;
                const news =   this.agencyHome.a_h_news;
                this.images = this.agencyHome.a_h_images;
                this.description = this.agencyHome.a_h_description;
                for(let i = 0;i<news.length; i++){
                    this.AllNewsArr.push(news[i].a_a_id);
                news[i].a_a_create_time = this.dateString(news[i].a_a_create_time );
                news[i].a_a_start_time = this.dateString(news[i].a_a_start_time );
                news[i].a_a_end_time = this.dateString( news[i].a_a_end_time);
                if(news[i].a_a_type == 1){
                    news[i].a_a_type = '平台新闻'
                }
                if(news[i].a_a_type == 2){
                    news[i].a_a_type = '相关政策'
                }}
                for(let i = 0;i<this.images.length;i++){
                    this.AllImgArr.push(this.images[i].i_id);
                }
                this.ANews = news;
            },
            //删除代理机构相关信息
           async  deleAgencyInfo(aId = this.id,ids,type){
                const res  = await deleAgencyhome(aId,ids,type);
               if(res.msg == "success")
                   this.$message({
                       type:'success',
                       message:'删除成功'
                   });
               this.AllNewsArr = [];
               this.AllImgArr = [];
               this.n_multipleSelection = [];
               this.i_multipleSelection = [];
           },

            //删除首页介绍
            DeleteNewsdescr(id = this.id){
                this.deleAgencyInfo(id,null,2).then(()=>{
                    this.getnews();
                });

            },
            //删除新闻单项
            Delenews(row){
                this.msg=row;//每一条数据的记录;
                for(let i = 0;i < this.AllNewsArr.length;i++){
                   if(this.msg.a_a_id == this.AllNewsArr[i]){
                       this.AllNewsArr.splice(i,1)
                   }
                }
                 this.deleAgencyInfo(this.id ,this.AllNewsArr,3).then(()=>{
                     this.getnews();
                 });
            },
            //批量删除新闻
            delAllNews() {
                const length = this.n_multipleSelection.length;
                if(!length){
                    this.$message.error("请先选中新闻")
                }else{
                    for (let i = 0; i < length; i++) {
                        this.n_deleArr.push(this.n_multipleSelection[i].a_a_id);
                    }
                    for(let j = 0; j <this.AllNewsArr.length;j++){
                        for (let i = 0; i < length; i++) {
                            if(this.AllNewsArr[j] == this.n_deleArr[i]){
                                this.AllNewsArr.splice(j,1)
                            }
                        }
                    }
                    this.deleAgencyInfo(this.id,this.AllNewsArr,3).then(()=>{
                        this.getnews();
                    });
                }

            },
            //单项删除图片
            Detepic( row){
                this.msg=row;//每一条数据的记录;
                for(let i = 0;i < this.AllImgArr.length;i++){
                    if(this.msg.i_id == this.AllImgArr[i]){
                        this.AllImgArr.splice(i,1)
                    }
                }
                this.deleAgencyInfo(this.id,this.AllImgArr,1).then(()=>{
                    this.getnews();
                });

            },

            //批量删除图片
            delAllImg() {
                const length = this.i_multipleSelection.length;
                if(!length){
                    this.$message.error("请先选中图片")
                }
                else{
                    for (let i = 0; i < length; i++) {
                        this.i_deleArr.push(this.i_multipleSelection[i].i_id);
                    }
                    for(let j = 0; j <this.AllImgArr.length;j++){
                        for (let i = 0; i < length; i++) {
                            if(this.AllImgArr[j] == this.i_deleArr[i]){
                                this.AllImgArr.splice(j,1)
                            }
                        }
                    }
                    this.deleAgencyInfo(this.id,this.AllImgArr,1).then(()=>{
                        this.getnews();
                    });
                }
            },


            n_handleSelectionChange(val) {
                this.n_multipleSelection = val;
            },
            handleSizeChange(val) {
                this.page_size = val;
            },
            handleCurrentChange(val) {
                this.currentPage = val;
            },
            i_handleCurrentChange(val) {
                this.IcurrentPage= val;
            },
            i__handleSelectionChange(val) {
                this.i_multipleSelection = val;
            },
        }
    };
</script>

<style scoped>
    .agencyHomeBox{
        width: 100%;
        height: 100%;
        background: #FFFFFF;

    }
/deep/ .description {
    overflow: scroll;
    color: #e6f1fe;
    width: 100%;
    height: 20%;
    background: #fab6b6;
    padding: 10px;
    box-sizing:border-box;
    -moz-box-sizing:border-box; /* Firefox */
    -webkit-box-sizing:border-box; /* Safari */
}

    .newsTabelBox{
        width: 100%;
        height: 85%;
    }
    /deep/.block{
        background: #99CCCC;

    }

    /deep/ .imgHeader{
        margin-top:20px;
        width: 100%;
        height: 60px;
        background: #99CCCC;
    }

    /deep/.imgList{
        width: 100%;
        height: 100%;
    }
    /deep/.block{
        text-align: center;
    }




</style>
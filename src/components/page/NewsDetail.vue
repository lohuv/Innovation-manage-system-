<template>
    <div class="NewsDetail">
        <el-card shadow="hover" :body-style="{padding: '0px'}" class = "centerBox">
           <div class="newsHeadline">
               <h2>{{article.name}}</h2>
           </div>
           <div class="newsInfo">
               <el-row :gutter="20">
                   <el-col :span="8"><div class=" grid-content fieldBox">
                       <p>{{article.region}}</p>
                   </div></el-col>
                   <el-col :span="8"><div class="grid-content regionBox">
                       <p>{{article.neighbourhood_name}}</p>
                   </div></el-col>
                   <el-col :span="8"><div class="grid-content createDateBox">
                       <p>{{article.create_time}}</p>
                   </div></el-col>
               </el-row>
           </div>
           <div class="ql-container ql-snow">

               <div class="ql-editor">

                   <div v-html="article.description"></div>

               </div>

           </div>
       </el-card>

    </div>
</template>

<script>
    import {reqGetAgencyhomeNews} from '../../api/Agency.js'
    import {reqgetNewsDetail,} from '../../api/News.js'

    export default {
        name: 'NewsDetail',
        data(){
            return{
                content:'',
                article: {
                    name:'',
                    region:'',
                    neighbourhood_name:'',
                    create_time:'',
                    description:'',
                },
            }
        },
        mounted() {
            this.getArticle()
        },
        watch:{
            $route(to,form){
                this.getArticle()
            }
        },
        methods:{
            //得到新闻管理的新闻正文
            async getNewsArticle(id){
                try{
                     const res = await reqgetNewsDetail(id);
                    if(!res.newsDetail) return;
                    const newsDetail = res.newsDetail;
                    this.article.name = newsDetail.n_name;
                    this.article.region = newsDetail.n_region;
                    this.article.neighbourhood_name = newsDetail.n_neighbourhood_name;
                    this.article.description = newsDetail.n_description;
                    this.article.create_time = this.dateString(newsDetail.n_create_time );

                }catch (e) {
                 //   ;
                }
            },
            //得到代理机构首页新闻正文信息
            async getAgencyArticle(id ){
                const res = await reqGetAgencyhomeNews(id);
                this.article.description = res.news.a_a_content;
                this.article.name = res.news.a_a_name;
                this.article.create_time = this.dateString(res.news.a_a_create_time);
            },
            //根据type得到需要展示的新闻正文
            getArticle(id = this.$route.params.id,type = this.$route.params.type){

                if(type == 1) {//表示传来的是新闻管理的新闻id
                    this.getNewsArticle(id);
                }
                if(type == 2){//表示传来的是代理机构的新闻id
                    this.getAgencyArticle(id)
                }
            }


        }

    };
</script>

<style scoped>

    .NewsDetail{
        width: 100%;
        min-height: 100%;
        background-image: linear-gradient(to bottom right, #FFEFBA 0%, #FFFFFF 100%);
    }
    /deep/ .centerBox{
        width: 80%;
        min-height: 580px;
        margin: auto;
        background:white;

    }
    /deep/.newsHeadline{
        width :100%;
        min-height: 60px;
    }
    /deep/ .newsHeadline h2{
        text-align: center;
        line-height: 60px;
    }
    /deep/ .newsInfo{
        width: 100%;
        height: 40px;

    }
    /deep/ .grid-content {
        border-radius: 4px;
        min-height: 40px;

    }
    /deep/ .newsInfo p{

        text-align: center;
        line-height:40px;
        color: #777777;
        font-size: 13px;

    }
    /deep/ .ql-container {
        width: 100%;
        padding: 10px;
        box-sizing:border-box;
        -moz-box-sizing:border-box; /* Firefox */
        -webkit-box-sizing:border-box; /* Safari */
    }
    /deep/ .ql-container image{
        margin: auto;
    }




</style>
<template>
    <div  class="addNews">
        <div class="topBox">
            <el-form  :inline="true" class="FormBox" ref="newsForm" :model="newsForm"  :rules="newsRule" >
                <el-form-item label="新闻标题" prop="name">
                    <el-input v-model="newsForm.name" style="width:200px;"></el-input>
                </el-form-item>
                <el-form-item label="新闻类型" prop = "type">
                    <el-select v-model="newsForm.type" placeholder="请选择新闻类型">
                        <el-option label="平台新闻" value="1"></el-option>
                        <el-option label="相关政策" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="城市名称" prop="neighbourhoodId">

                    <el-cascader
                            :props="{ checkStrictly: true }"
                            ref="refSubCat"
                            v-model = newsForm.region
                            :options="valueBatch"

                    ></el-cascader>
                </el-form-item>
                <el-form-item label="新闻领域">
                    <el-cascader
                            :placeholder='newsForm.neighbourhoodName'
                            :show-all-levels="false"
                            v-model = nId
                            :props="props"
                            ref="refSubCat"
                            @change="handleSubCat"
                    ></el-cascader>
                </el-form-item>
                <el-form-item label="时间范围" >
                    <dateTimePicker @transferDateTime="getDateTime"></dateTimePicker>
                </el-form-item>
            </el-form>
        </div>

        <div class="centerBox">
            <editor @transferArticle = "getArticle" ></editor>
        </div>

        <div class="footbox">
            <div style=" width: 200px;height: 100%; margin: auto" >
                <el-button type="primary" size="mini" @click="submitNews('newsForm')">提交</el-button>
            </div>
        </div>
    </div>
</template>


<script>
    import editor from '../common/NewsAddEditor.vue'
    import dateTimePicker from '../common/dateTimePicker';
    import regionData from '../../../public/static/address.json'
    import {posAddNewsList,posreqneighbourhood} from '../../api/News.js'
    export default {
       data(){
           return{
               oob:{},
               num:0,
               nId:'',
               valueBatch:[],
                date:null,
               props: {//领域数据
                   lazy: true,
                   async lazyLoad (node, resolve) {

                       const { level,value } = node;
                       if(level === 0){
                           const res = await posreqneighbourhood(0);
                           const nodes =res.neighbourhoods.map(item => ( {
                               value    :item.n_id,
                               label    :item.n_name,
                               leaf:item.hasChild !== 1
                           }));
                           resolve(nodes);
                       }else{
                           const res = await posreqneighbourhood(value);
                           const nodes =res.neighbourhoods.map(item => ( {
                               value    :item.n_id,
                               label    :item.n_name,
                               leaf:item.hasChild !== 1
                           }));
                           resolve(nodes);
                       }
                   }
               },

               newsForm:{
                   name:'',
                   start:'',
                   end:'',
                   neighbourhoodName:'',
                   description:'',
                   type:'',
                   region:'',
               },
               newsRule:{
                   name: { required: true, message: '请输入标题名称', trigger: 'blur' },
                   type:{ required: true, message: '请选择新闻类型', trigger: 'blur' }
               },

           }
       },
        components:{
            editor,
            dateTimePicker,
        },
        mounted() {
            this.getRegion();
        },

        methods:{

            //添加新闻
            async AddNewsList(form = this.newsForm){
            try{
                const res = await posAddNewsList(form);

                if(res.msg == "success"){
                    this.$message({
                        type:'success',
                        message:'添加成功!'
                    });
                    this.$router.push({path:'/News/'});
                }
            }catch (e) {
                //;
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
            //提交新闻
            submitNews(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.nId) {
                            const length = this.nId.length;
                            this.newsForm.neighbourhoodId = this.nId[length - 1];
                        }

                        if(this.newsForm.region){
                            if( this.newsForm.region.length===2)
                            this.newsForm.region =  this.newsForm.region[0] + " "+this.newsForm.region[1];
                            if(this.newsForm.region.length===1)
                                this.newsForm.region =  this.newsForm.region[0] ;
                        }
                        if(!this.newsForm.description){
                            this.$message.error("请输入正文");
                            return false
                        }
                        this.AddNewsList();
                    } else {
                        return false;
                    }
                });

                },
            //获得级联选择器的值和label
            handleSubCat(value) {
                this.newsForm.neighbourhoodName = this.$refs["refSubCat"].getCheckedNodes()[0].label;
            },


            //获得正文
            getArticle( article){
                this.newsForm.description = article;
            },
           //获得时间戳
            getDateTime(start,end){
                this.newsForm.start = start;
                this.newsForm.end =end;
            },

        }
    };
</script>

<style scoped>
    .addNews{
    width: 100%;
    height: 100%;
    font-size: 16px;
        background:#FFFFFF;
    }
    .topBox{
        width: 100%;
        min-height: 25%;
        min-width: 1000px;
        background: #fab6b6;
    }
    /deep/. label{
        width: 80px;
    }
    /deep/.FormBox{
        padding: 20px;
        width: 90%;
        height: 80%;

    }
    /deep/ .centerBox{
        width: 100%;
        background: #FFFFFF;
    }
    /deep/ .footbox{
        width: 100%;
    }








</style>
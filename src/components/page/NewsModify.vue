<template>
    <div  class="NewsModifyBox">
        <div class="topBox">
            <el-form class="FormBox"  :inline="true" ref="newsForm" :model="newsForm"  :rules="newsRule"  >
                <el-form-item label="新闻标题" prop ="name">
                    <el-input v-model="newsForm.name" style="width:200px;"></el-input>
                </el-form-item>
                <el-form-item label="新闻类型" prop = "type">
                    <el-select v-model="newsForm.type" placeholder="请选择新闻类型">
                        <el-option label="平台新闻" value="1"></el-option>
                        <el-option label="相关政策" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="城市名称">
                    <el-cascader
                            :props="{ checkStrictly: true }"
                            :options="valueBatch"
                            v-model = newsForm.region

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
                <el-form-item label="时间范围">
                    <el-date-picker
                            v-model="date"
                            type="datetimerange"
                            value-format="timestamp"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            align="right">
                    </el-date-picker>
                </el-form-item>
            </el-form>

        </div>

        <div class="centerBox">
            <editor :news="newsForm"  @transferArticle = "getArticle"></editor>
        </div>

        <div class="footbox">
            <div style=" width: 200px;height: 100%; margin: auto" >
                <el-button type="primary" size="mini" @click="submit('newsForm')">提交</el-button>
            </div>

        </div>


    </div>
</template>


<script>

    import {reqgetNewsDetail,putModifyNews,posreqneighbourhood} from '../../api/News.js'
    import editor from '../common/NewsModifyEditor.vue'
    import regionData from '../../../public/static/address.json'
    export default {
        props:{
         id:{
             type:String,
             default:'',
         }
        },
        data(){
            return{
                tip:'请选择',
                nId:'',//领域id
                content:'',
                valueBatch:[],
                NewsDetail:'',
                date:'',
                newsForm:{
                    id:'',
                    name:'',
                    start:'',
                    end:'',
                    description:'',
                    neighbourhoodName:'',
                    type:'1',
                    region:'',
                },
                newsRule:{
                    name: { required: true, message: '请输入标题名称', trigger: 'blur' },
                    type:{ required: true, message: '请选择新闻类型', trigger: 'blur' }
                },
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
                }
            }
        },
        components:{
            editor,
        },
        mounted() {
        this.getNewsDetail();
        this.getRegion();
        },
        watch:{
            $route(to,form){
                this.getNewsDetail();
                this.getRegion();
            }
        },
    methods:{
            //新闻详情
        async getNewsDetail(id = this.id){
            try {
                const res = await reqgetNewsDetail(id);
                this.NewsDetail = res.newsDetail;
                this.newsForm.id = this.NewsDetail.n_id;
                this.newsForm.name = this.NewsDetail.n_name;
                this.newsForm.description = this.NewsDetail.n_description;
                this.newsForm.end= this.NewsDetail.n_end_time;
                this.newsForm.neighbourhoodId = this.NewsDetail.n_neighbourhood_id;
                this.newsForm.neighbourhoodName = this.NewsDetail.n_neighbourhood_name;
                if(this.NewsDetail.n_neighbourhood_name)
                this.tip = this.NewsDetail.n_neighbourhood_name;
               this.newsForm.region = this.NewsDetail.n_region.split(" ");
                this.newsForm.start = this.NewsDetail.n_start_time;
                this.NewsDetail.n_type = this.NewsDetail.n_type.toString();
                if(this.newsForm.start == null || this.newsForm.end ==null){
                    this.date = ''
                }
                else
                this.date = [ this.newsForm.start, this.newsForm.end];
            }catch (e) {
                //
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
            //新闻修改
        async NewsModify(form){
            try {
                const res = await putModifyNews(form);
                if(res.msg === "success"){
                    this.$message({
                        type:'success',
                        message:'修改成功'
                    });
                    this.getNewsDetail();
                }
            }catch (e) {
                //
            }

        },

            //确认修改
        submit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    const form = this.newsForm;

                    if(this.date){
                        form.start = this.date[0];
                        form.end = this.date[1];
                    }
                    else
                    {
                        form.start =null;
                        form.end = null;
                    }
                    let length = form.region.length;

                    if(length>1){
                        form.region =  form.region[0]+ " "+form.region[1]
                    }
                    if(length === 1){
                        form.region =  form.region[0]
                    }

                    if (!form.description) {
                        this.$message.error("正文不能为空");
                        return false
                    }
                    this.NewsModify(form);
                } else {
                    return false;
                }
            });
        },


            //获得正文
        getArticle( article){
            this.newsForm.description = article;
        },
        //获得级联选择器的值和label
        handleSubCat(value) {
            this.newsForm.neighbourhoodName = this.$refs["refSubCat"].getCheckedNodes()[0].label;
        },

    }
    };
</script>

<style scoped>
    .NewsModifyBox{
        width: 100%;
        height: 100%;
        font-size: 16px;
    }
    /deep/.label{
        width: 80px;
    }
    .topBox{
        width: 100%;
        min-width: 1000px;
        min-height: 25%;
        background: #fab6b6;
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
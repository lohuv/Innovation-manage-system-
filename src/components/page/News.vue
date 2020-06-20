<template>
    <div class="Newbox">
        <div class = "c_header" >
            <el-select v-model="dele" @change="NewsSearch" style="margin-top: 10px; width: 150px; margin-left: 10px" placeholder="全部">
                <el-option label="正常" value="0"></el-option>
                <el-option label="已删除" value="1"></el-option>
            </el-select>
            <router-link to="/addNews"><el-button type="primary" size="mini" style="margin-top: 12px ;margin-left: 20px;" >添加</el-button></router-link>
            <el-popconfirm
                    @onConfirm = delAll()
                    title="要删除所有选中的新闻吗？">
                <el-button type="danger" size="mini"  v-show = "!deleflag" slot="reference" style="margin-top: 12px ;margin-left: 20px">批量删除</el-button>
            </el-popconfirm>

            <div class="search" >
                <dateTimePicker style="float: left ;"  @transferDateTime="getDateTime" ></dateTimePicker>
                <el-input   v-model="search" @input="change($event)" @keyup.enter.native="NewsSearch"  style="width: 200px; margin-left: 30px;"></el-input>
                <el-button type="primary"  @click="NewsSearch" size="mini" style="margin-left: 30px">查询</el-button>
            </div>
        </div>

        <div class = "newsTable">
            <el-table
                    @selection-change="handleSelectionChange"
                    height="100%"
                    :data="news"
                    style="width: 100%">
                    :cell-style="set_cell_style"
                <el-table-column
                        :selectable="checkSelectable"
                        type="selection"
                        min-width="10%">
                </el-table-column>
                <el-table-column
                        label="新闻名"
                        min-width="18%">
                    <template slot-scope="scope">
                        <router-link :to = "'/NewsDetail/'+scope.row.n_id +'/1'"> {{scope.row.n_name}}</router-link>
                    </template>

                </el-table-column>
                <el-table-column
                        prop="n_neighbourhood_name"
                        label="领域"
                        min-width="10%">
                </el-table-column>
                <el-table-column
                        prop="n_region"
                        label="地区"
                        min-width="10%">
                </el-table-column>
                <el-table-column
                        prop="n_type"
                        label="类型"
                        min-width="10%">
                </el-table-column>
                <el-table-column
                        prop="n_create_time"
                        label="创建时间"
                        min-width="10%">
                </el-table-column>
                <el-table-column
                        prop="n_start_time"
                        label="开始时间"
                        min-width="10%">
                </el-table-column>
                <el-table-column
                        prop="n_end_time"
                        label="结束时间"
                        min-width="10%">
                </el-table-column>
                <el-table-column
                        label="操作"
                        min-width="10%">
                    <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" circle  @click="toNewsModifyPage(scope.row.n_id)" v-show="!deleflag"></el-button>
                        <el-popconfirm
                            @onConfirm="handleDelete(scope.$index, scope.row)"
                            title="确定删除？"
                    >
                        <el-button
                                slot = "reference"
                                type="danger"
                                icon="el-icon-delete"
                                circle
                                style="margin-left: 20px"
                                v-show="!deleflag"
                        ></el-button>

                    </el-popconfirm>
                        <el-tooltip class="item"  effect="dark" content="该条新闻已被删除" placement="right">
                            <el-button style=" border: none; background-color: transparent;" size="mini" v-show="deleflag" icon="el-icon-warning"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="block">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="page_size"
                    :pager-count="7"
                    layout="total,sizes, prev, pager, next, jumper"
                    :total="count"
            >
            </el-pagination>
        </div>

    </div>
</template>

<script>
    import dateTimePicker from '../common/dateTimePicker';
    import {reqGetNewsList ,deleNewsList} from '../../api/News';

    export default {
        components: {
            dateTimePicker
        },
        data() {
            return {
                dele:'0',
                deleflag:false,
                search:null,
                page_size:10,
                currentPage:1,
                count:10,
                start:null,
                end:null,
                date:null,
                "news": [],
                idx:'',
                deleArr:[],
                msg:'',
                multipleSelection:[],

            };
        },
        mounted() {
            this.getNews();
            this.cssStyle();
        },
        methods:{
            //查看新闻列表
            async  getNews(page = this.currentPage,search = this.search, start = this.start,end = this.end,dele = this.dele){
                try {
                    const res = await reqGetNewsList(page,search,start,end,dele);
                    this.count = res.count;
                    if(!res.news){
                        this.news = [];
                        return
                    }
                    if(dele == 0){
                        this.deleflag = false;
                    }
                    if(dele == 1){
                        this.deleflag = true;
                    }


                    const News = res.news;
                    for(let i = 0;i<News.length;i++){
                        if( News[i].n_type == 1){
                            News[i].n_type = "平台新闻";
                        }
                        if( News[i].n_type == 2){
                            News[i].n_type = "相关政策";
                        }
                        News[i].n_end_time = this.dateString( News[i].n_end_time);
                        News[i].n_start_time = this.dateString(News[i].n_start_time);
                        News[i].n_create_time = this.dateString(News[i].n_create_time);
                    }
                    this.news = News;

                }catch (e) {

                }
            },
            //删除新闻
            async deleteNews(arr = this.deleArr) {
                try {
                    const res = await deleNewsList(arr);
                    if(res.msg == "success")
                        this.$message({
                            type:'success',
                            message:'删除成功'
                        });
                    this.deleArr = [];
                    this.multipleSelection = [];
                } catch (e) {
                    // do nothing
                }
            },
            //单行删除
            handleDelete(index, row) {
                this.idx = index;
                this.msg=row;//每一条数据的记录
                this.deleArr.push(this.msg.n_id);//把单行删除的每条数据的id添加进放删除数据的数组
                this.deleteNews().then(()=>{
                    this.currentPage = 1;
                    this.getNews()
                });
            },
            //批量删除

            delAll() {
                const length = this.multipleSelection.length;
                if(!length){
                    this.$message.error("请先选中新闻")
                }
                else{
                    for (let i = 0; i < length; i++) {
                        this.deleArr.push(this.multipleSelection[i].n_id);
                    }
                    this.deleteNews().then(()=>{
                        this.currentPage = 1;
                        this.getNews()
                    });
                }
            },
            //搜索
            NewsSearch(){
                this.getNews(1,this.search,this.start,this.end);
            },

            toNewsModifyPage(id){
                this.$router.push({path:'/NewsModify/'+ id});
            },
            //获得时间戳
            getDateTime(start,end){
                this.start = start;
                this.end =end;
            },

            change(e){
                this.$forceUpdate();
            },

            set_cell_style({row}){
                if ( this.deleflag== 1){
                    return 'color:#FF5F57;'
                }
            },
            checkSelectable(row){
                return this.deleflag == 0;
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleSizeChange(val) {
                this.page_size = val;
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getNews(this.currentPage,this.start,this.end,this.search)
            },
            //获得级联选择器的值和label
            handleSubCat(value) {
                this.newsForm.neighbourhoodName = this.$refs["refSubCat"].getCheckedNodes()[0].label;
            },
            cssStyle(){
                let footHeight = document.getElementsByClassName('block')[0].offsetHeight;
                let tablebox = document.getElementsByClassName('newsTable')[0];
                let bodyHeight =  document.getElementsByClassName('Newbox')[0].offsetHeight;
                tablebox.style.height  = bodyHeight-footHeight-56+'px'
            }
            }
    };
</script>

<style scoped>
    /deep/ .c_header{
        height: 56px;
        width: 100%;
        min-width: 1200px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }
    /deep/.c_header .search{
        width: 65%;
        height: 80%;
        float: right;
        margin-top: 10px;
    }
    /deep/.newsTable{
        width: 100%;
    }
    .Newbox{
        width: 100%;
        height: 100%;
        background:#FFCCCC;
    }
    /deep/.block{
        text-align: center;
    }

</style>
<template>
    <div class = "productManage">
    <div class="c_header">
        <el-select v-model="status" @change="ProductSearch" style="margin-top: 10px; width: 150px; margin-left: 10px" placeholder="全部">
            <el-option label="全部" value="0"></el-option>
            <el-option label="未通过" value="3"></el-option>
            <el-option label="待审核" value="1"></el-option>
            <el-option label="已上架" value="2"></el-option>
            <el-option label="已下架" value="4"></el-option>
        </el-select>
        <el-select v-model="dele" @change="ProductSearch" style="margin-top: 10px; width: 150px; margin-left: 10px" placeholder="全部">

            <el-option label="正常" value="0"></el-option>
            <el-option label="已删除" value="1"></el-option>
        </el-select>
        <el-popconfirm
                @onConfirm="delAll()"
                title="确定删除选中产品？"
        >
            <el-button
                    v-show = "!deleflag"
                    size="mini"
                    slot = "reference"
                    type = "danger"
                    style="margin-left: 10px;"
            > 批量删除</el-button>
        </el-popconfirm>
        <div class="sear" style="width: 300px;height: 30px;float: right;margin-top: 10px">
            <el-input  type="text" v-model="search" @input="change($event)" @keyup.enter.native="ProductSearch"  style="height: 30px; width:200px; "></el-input>
            <el-button type="primary" @click="ProductSearch" icon="el-icon-search" ></el-button>
        </div>
    </div>

    <div class="tableBox">
        <el-table
                @selection-change="handleSelectionChange"
                :data="products"
                 width = "100% "
                 height = "100%"
            :cell-style="set_cell_style">
            <el-table-column
                    :selectable="checkSelectable"
                    type="selection"
                   width="50">
            </el-table-column>
            <el-table-column
                    label="产品图片"
                   >
                <template slot-scope = "scope">
                <el-image
                        style="width: 100px; height: 100px"
                        :src="scope.row.h_p_image"
                >
                        <div slot="error" class="image-slot">
                            <i class="el-icon-picture-outline"> 暂无图片</i>
                        </div>
                </el-image>
                </template>
            </el-table-column>
            <el-table-column
                    prop="h_p_name"
                    label="产品名称"
                   >
            </el-table-column>

            <el-table-column
                    prop="h_p_description"
                    label="产品描述"
                   >
            </el-table-column>
            <el-table-column
                    prop="h_p_price"
                    label="产品价格"
                    >
            </el-table-column>
            <el-table-column
                    prop="h_p_status"
                    label="产品状态"
                  >
            </el-table-column>


            <el-table-column
                    prop="h_p_username"
                    label="公司名称"
            >
            </el-table-column>

            <el-table-column
                    prop="h_p_linkman"
                    label="联系人姓名"
            >
            </el-table-column>
            <el-table-column
                    prop="h_p_phone"
                    label="联系人电话"
                   >
            </el-table-column>
            <el-table-column
                    prop="h_p_remark"
                    label="产品备注"
            >
            </el-table-column>
            <el-table-column
                    label="操作"
                   width="180">
                <template slot-scope="scope">
                    <el-button type="text" size = "mini"  @click="statusModify(scope.row)" v-show="deleflag ==0 && (scope.row.h_p_status ==  '待审核' ||scope.row.h_p_status == '已下架')">上架</el-button>
                    <el-button type="text"  size = "mini"  @click="fail(scope.row)" v-show="deleflag == 0 && scope.row.h_p_status ==  '待审核' ">不通过</el-button>
                    <el-button type="text"  size = "mini"  @click="statusModify(scope.row)" v-show="deleflag == 0 && scope.row.h_p_status == '已上架'">下架</el-button>
                    <el-popconfirm
                            @onConfirm="handleDelete(scope.$index, scope.row)"
                            title="确定删除？"
                    >
                        <el-button
                                size="mini"
                                slot = "reference"
                                type="text"
                                style="margin-left: 10px;
                                 color: #dd6161;"
                                v-show="!deleflag"
                        > 删除</el-button>

                    </el-popconfirm>
                    <el-tooltip class="item"  effect="dark" content="该条产品信息已被删除" placement="right">
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
                    :page-sizes="[10]"
                    :page-size="10"
                    :pager-count = "7"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="count"

            >
            </el-pagination>
        </div>

    </div>
</template>

<script>

    import {reqgetProductList,putOperation,deleteProduct} from '../../api/ProductManage'

    export default {
        name: 'productManage',

        data(){
            return{
                deleflag:false,
                dele:'0',
                remark:null,
                status:'0',
                products:[],
                search:'',
                idx:'',
                deleArr:[],
                msg:'',
                multipleSelection:[],
                count:0,
                page_size:10,
                currentPage:1,


            }
        },
        mounted(){
            this.getProductList();
            this.cssStyle();
        },
        methods:{
            async getProductList(page = this.currentPage,status = this.status,search = this.search,dele = this.dele){
                try {
                    const res = await reqgetProductList(status,dele,page,search );
                    this.count = res.count;
                    if(!res.products){
                        this.products = [];
                        return
                    }

                    if(dele == 0)
                        this.deleflag = false;
                    else
                        this.deleflag = true;

                    const data = res.products;
                    for(let i = 0;i< data.length;i++){
                        if(data[i].h_p_status == 0)
                            data[i].h_p_status = '无';
                        if(data[i].h_p_status == 1)
                            data[i].h_p_status = '待审核';
                        if(data[i].h_p_status == 2)
                            data[i].h_p_status = '已上架';
                        if(data[i].h_p_status == 3)
                            data[i].h_p_status = '不通过';
                        if(data[i].h_p_status == 4)
                            data[i].h_p_status = '已下架';
                    }
                    this.products = data;

                }catch (e) {
                    //
                }
            },
            //产品上架
            async ProductOperation(id,status,remarke){
                try{
                    const  res  = await putOperation(id,status,remarke);
                    if(res.msg == "success")
                        this.$message({
                            type:'success',
                            message:'修改成功！'
                        });
                }catch (e) {
                    //
                }
            },

            //删除产品
            async DeleProduct(arr = this.deleArr){
                try{
                    const  res  = await deleteProduct(arr);
                    if(res.msg == "success")
                        this.$message({
                            type:'success',
                            message:'删除成功！'
                        });
                    this.deleArr = [];
                    this.multipleSelection = [];
                }catch (e) {
                    //
                }
            },

            //单行删除
            handleDelete(index, row) {
                this.idx = index;
                this.msg=row;//每一条数据的记录
                this.deleArr.push(this.msg.h_p_id);//把单行删除的每条数据的id添加进放删除数据的数组
                this.DeleProduct().then(()=>{
                    this.currentPage = 1;
                    let status = 0;
                    if(this.status !== '')
                      status = this.status;
                    this.getProductList(this.currentPage,status,this.search);
                });

            },

            //批量删除
            delAll() {
                const length = this.multipleSelection.length;
                if(!length){
                    this.$message.error("请先选中要删除的产品！")
                }
                else{
                    for (let i = 0; i < length; i++) {
                        this.deleArr.push(this.multipleSelection[i].h_p_id);
                    }
                    this.DeleProduct().then(()=>{
                        this.currentPage = 1;
                        let status = 0;
                        if(this.status !== '')
                            status = this.status;
                        this.getProductList(this.currentPage,status,this.search);
                    });
                }
            },

            //上架,下架变更，
            statusModify(row){
                const id = row.h_p_id;
                let status = row.h_p_status;
                if(status == '已上架')
                    status = 2;
                if(status == '已下架')
                    status = 4;
                if(status == '无')
                    status =0;
                if(status == '未通过')
                    status =3;
                if(status == '待审核')
                    status =1;
                this.ProductOperation(id,status).then(()=>{
                    let status = 0;
                    if(this.status !== '')
                        status = this.status;
                    this.getProductList(this.currentPage,status,this.search);
                });

            },
            //审核不通过
            fail( row) {
                this.$prompt('请输入备注', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    const id = row.h_p_id;
                    if(!value){
                        this.$message.error("请输入备注");
                        return false
                    }
                    this.ProductOperation(id,1,value).then(()=>{
                        let status = 0;
                        if(this.status !== '')
                            status = this.status;
                        this.getProductList(this.currentPage,status,this.search);
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消操作'
                    });
                });
            },

            change(e){
            this.$forceUpdate();
        },

            ProductSearch(){
                this.currentPage= 1;
                    this.getProductList(1);
                },
        set_cell_style({row}){
            if (this.deleflag == 1){
                return 'color:#B0A4AE;'
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
            this.getProductList(this.currentPage)
        },
            cssStyle(){
                let footHeight = document.getElementsByClassName('block')[0].offsetHeight;
                let tablebox = document.getElementsByClassName('tableBox')[0];
                let bodyHeight =  document.getElementsByClassName('productManage')[0].offsetHeight;
                tablebox.style.height  = bodyHeight-footHeight-56+'px'
            }
    }



    };
</script>

<style scoped>
     .productManage{
        width: 100%;
        height: 100%;
         background: #FFCCCC;
    }
    /deep/.c_header{
        width: 100%;
        min-width: 1200px;
        height: 56px;
    }
   .productManage .tableBox{
        width: 100%;
    }
    /deep/ .tip{
        width: 100%;
        height: 25px;
        font-family:"Helvetica Neue";
        color: #606266;
        text-align: center;
        line-height: 25px;
    }
    /deep/ .button:hover {
        background-color: #4CAF50; /* Green */
        color: white;
    }
    /deep/ .el-form-item{
        width: 100%;
        height: 45px;
    }
     /deep/.block{
         text-align: center;
     }






</style>
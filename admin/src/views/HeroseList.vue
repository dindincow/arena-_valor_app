<template>
    <div class="categoryEdit">
        <Breadcrumb :pathsTitle="$route.meta.title"></Breadcrumb>
        <Subheader pageTitle="英雄列表"></Subheader>
        <div class="panel">
            <el-form ref="form" :model="form" :inline="true" label-width="80px">
                <el-form-item label="英雄分類">
                    <el-select v-model="form.hero">
                        <el-option label="全部" value=""></el-option> 
                        <el-option v-for="item in heroseList" 
                            :key="item._id" 
                            :label="item.name" 
                            :value="item._id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="query">查询</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="tableData" border class="mt-20">
                <el-table-column prop="_id" label="ID" width="250" :resizable="false"></el-table-column>
                
                <el-table-column prop="name" label="英雄名稱" :resizable="false"></el-table-column>
                <el-table-column  label="英雄分類" :resizable="false">
                    <template slot-scope="scope">
                        <span v-for="(item,index) in scope.row.categoryName" :key="index">
                                <el-tag 
                                    style="margin-right:10px;"
                                    type='primary'
                                    disable-transitions> {{item.name}} 
                                </el-tag>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="title" label="英雄稱號" :resizable="false"></el-table-column>
                <el-table-column prop="icon" label="圖片" :resizable="false">
                    <template slot-scope="scope">
                        <img :src="scope.row.icon" style="height:3rem">
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" :resizable="false">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" @click="$router.push(`/heroes/edit/${scope.row._id}`)">編輯</el-button>
                        <el-button type="danger" size="small" @click="remove(scope.row)">刪除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分頁 -->
            <div class="mt-20">
                <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="paginations.page_index"
                    :page-sizes="paginations.page_sizes"
                    :page-size="paginations.page_size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="paginations.total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import Subheader from '../components/Subheader';
import Breadcrumb from '../components/Breadcrumb';
export default {
    name: "HeroseEdit",
    components: {Subheader,Breadcrumb},
    data() {
        return {
            tableData: [],
            allTableData:[],
            paginations:{
                page_index:1, //當前位於哪ㄧ頁
                total:0, //總數
                page_size:5, // ㄧ頁顯示筆數
                page_sizes:[5, 10, 15, 20], // 每頁可顯示筆數選單
                totalPage:0
            },
            form:{
                hero:''
            },
            heroseList:[],
            isPaginationsQuery:false

        };
     },

    methods: {
        async query(){
            var pageSize = this.paginations.page_size;
            var pageIndex =  1;
            var catecory = this.form.hero;

            let res;
            if(this.isPaginationsQuery){
                res = await this.$http.get(`heroes/?pageSize=${pageSize}&pageIndex=${this.paginations.page_index}&catecory=${catecory}`);
            }else{
                this.paginations.page_index=1;
                res = await this.$http.get(`heroes/?pageSize=${pageSize}&pageIndex=${pageIndex}&catecory=${catecory}`);
            }

            //const res = await this.$http.get(`heroes/?pageSize=${pageSize}&pageIndex=${pageIndex}&catecory=${catecory}`);
            this.tableData = res.data.list;

            // 分頁查詢 false
            this.isPaginationsQuery=false;

            // 設定分頁屬性
            this.paginations.total = res.data.totalCount;
            this.paginations.totalPage = res.data.totalPage;
        },

        handleSizeChange(pageSize) {
            this.paginations.page_index = 1;
            this.paginations.page_size = pageSize;
            this.query();
            
        },
        handleCurrentChange(currentPage) {
            this.paginations.page_index = currentPage;
            this.isPaginationsQuery=true;
            this.query();
        },


        async fetchCategories() {
            const res = await this.$http.get('categories/heroes');
            console.log("res",res.data)
            this.heroseList = res.data;
        },
        async getItemsList() {
            const res = await this.$http.get("heroes");
            //this.tableData = res.data;
            this.allTableData = res.data;
            this.setPaginations()
        },

        async remove(row) {
            this.$confirm(`是否要刪除分類"${row.name}"`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async() => {
                const res = await this.$http.delete(`heroes/${row._id}`)
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                this.getItemsList();
            }).catch(() => {
                
            });
            const res = await this.$http.get("heroes");
            this.tableData = res.data;
        },
        // setPaginations(){
        //     //分頁屬性設定
        //     this.paginations.total = this.allTableData.length;
        //     this.paginations.page_index = 1;
        //     this.paginations.page_size = 5;

        //     //設置默認的分頁數據
        //     this.tableData = this.allTableData.filter((item,index)=>{
        //         return index < this.paginations.page_size ;
        //     })
        // },
        // handleSizeChange(pageSize) {
        //     this.paginations.page_index = 1;
        //     this.paginations.page_size = pageSize;
        //     this.tableData = this.allTableData.filter((item,index)=>{
        //         return index < pageSize ;
        //     })
        // },
        // handleCurrentChange(page) {
        //     console.log("page",page)
        //     // 從第幾條索引開始抓資料
        //     let start = this.paginations.page_size*(page-1) ;
        //     // 抓到第幾條結束
        //     let end = this.paginations.page_size*page-1 ;

        //     let temp=[] ;
        //     for(var i=start ; i < end ; i++ ){
        //         if(this.allTableData[i]){
        //             temp.push(this.allTableData[i]);
        //         }
        //     }
        //     this.tableData = temp;
        // },
    },
    created() {
        //this.getItemsList();
        this.fetchCategories();
        this.query();
    }
};
</script>

<template>
  <div class="articleEdit">
    <Breadcrumb :pathsTitle="$route.meta.title"></Breadcrumb>
    <Subheader pageTitle="文章列表"></Subheader>
     <!--main-->  
    <div class="panel">
        <el-table :data="tableData" border>
            <el-table-column prop="_id" label="ID" width="250" :resizable="false"></el-table-column>
            <el-table-column prop="title" label="標題" :resizable="false"></el-table-column>
            <el-table-column prop="categoryName" label="文章類型" :resizable="false">
                <template slot-scope="scope">
                    <span v-for="(item,index) in scope.row.categoryName" :key="index">
                                <el-tag 
                                    style="margin-right:10px;"
                                    :type='getTagColor(item.name)'
                                    disable-transitions> {{item.name}} 
                                </el-tag>
                    </span>
                   
                </template> 
            </el-table-column>
            <el-table-column prop="createdAt" label="創建日期" :resizable="false">
                <template slot-scope="scope">
                    {{scope.row.createdAt | date}}
                </template> 
            </el-table-column>
            <el-table-column fixed="right" label="操作" :resizable="false">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="$router.push(`/articles/edit/${scope.row._id}`)">編輯</el-button>
                    <el-button type="danger" size="small" @click="remove(scope.row)">刪除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
  </div>
</template>

<script>
import Subheader from '../components/Subheader';
import Breadcrumb from '../components/Breadcrumb';

export default {
    name: "articleEdit",
    components: {
        Subheader,
        Breadcrumb
    },
    data() {
        return {
            tableData: [
                {
                    body: '',
                    categories: '',
                    createdAt: '',
                    title: '',
                    updatedAt: ''
                }
            ]
        };
    },

    methods: {
        async getCategoryList() {
            const res = await this.$http.get("articles");
            this.tableData =  res.data;

        },
        async remove(row) {
            this.$confirm(`是否要刪除文章"${row.title}"`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async() => {
                const res = await this.$http.delete(`articles/${row._id}`)
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                this.getCategoryList();
            }).catch(() => {
                
            });
            const res = await this.$http.get("articles");
            this.tableData = res.data;
        },

        getTagColor(tagName){
            switch(tagName) {
                case '賽事' :
                    return 'success';
                case '公告' :
                    return 'info';
                case '系統' :
                    return 'danger';
                default:
                    return 'primary'
            }  
        }
    },
    created() {
        this.getCategoryList();
    }
};
</script>

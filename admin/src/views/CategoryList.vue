<template>
    <div class="categoryEdit">
        <Breadcrumb :pathsTitle="$route.meta.title"></Breadcrumb>
        <Subheader pageTitle="分類列表"></Subheader>
        <div class="panel">
            <el-table :data="tableData" border>
                <el-table-column prop="_id" label="ID" width="300" :resizable="false"></el-table-column>
                <el-table-column prop="parent.name" label="上級分類" :resizable="false"></el-table-column>
                <el-table-column prop="name" label="分類名稱" :resizable="false"></el-table-column>
                <el-table-column fixed="right" label="操作">
                    <template slot-scope="scope">
                        <el-button @click="$router.push(`/categories/edit/${scope.row._id}`)" type="primary" size="small">編輯</el-button>
                        <el-button  size="small" @click="remove(scope.row)" type="danger">刪除</el-button>
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
    name: "categoryEdit",
    components: {
        Subheader,
        Breadcrumb
    },
    data() {
        return {
        tableData: []
        };
    },

    methods: {
        async getCategoryList() {
            const res = await this.$http.get("categories");
            this.tableData = res.data;
        },
        async remove(row) {
            this.$confirm(`是否要刪除分類"${row.name}"`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async() => {
                const res = await this.$http.delete(`categories/${row._id}`)
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                this.getCategoryList();
            })
            const res = await this.$http.get("categories");
            this.tableData = res.data;
        }
    },
    created() {
        this.getCategoryList();
    }
};
</script>

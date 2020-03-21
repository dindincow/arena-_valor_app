<template>
    <div class="adsList">
        <Breadcrumb :pathsTitle="$route.meta.title"></Breadcrumb>
        <Subheader pageTitle="廣告位列表"></Subheader>
        <!--main-->  
        <div class="panel">
            <el-table :data="tableData" border>
                <el-table-column prop="_id" label="ID" width="250" :resizable="false"></el-table-column>
                <el-table-column prop="name" label="名稱" :resizable="false"></el-table-column>
                <el-table-column fixed="right" label="操作" :resizable="false">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" @click="$router.push(`/ads/edit/${scope.row._id}`)">編輯</el-button>
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
    name: "adList",
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
            const res = await this.$http.get("ads");
            this.tableData = res.data;
        },
        async remove(row) {
            this.$confirm(`是否要刪除分類"${row.name}"`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async() => {
                const res = await this.$http.delete(`ads/${row._id}`)
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                this.getCategoryList();
            }).catch(() => {
                
            });
            const res = await this.$http.get("ads");
            this.tableData = res.data;
        }
    },
    created() {
        this.getCategoryList();
    }
};
</script>

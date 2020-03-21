<template>
  <div class="categoryEdit">
    <Breadcrumb :pathsTitle="$route.meta.title"></Breadcrumb>
    <Subheader pageTitle="管理員列表"></Subheader>
    <div class="panel">
        <el-table :data="tableData" border>
            <el-table-column prop="_id" label="ID" width="250" :resizable="false"></el-table-column>
            <el-table-column prop="username" label="管理員名稱" :resizable="false"></el-table-column>
            <el-table-column fixed="right" label="操作" :resizable="false">
                <template slot-scope="scope">
                    <el-button @click="$router.push(`/admin_users/edit/${scope.row._id}`)" type="text" size="small">編輯</el-button>
                    <el-button type="text" size="small" @click="remove(scope.row)">刪除</el-button>
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
    name: "AdminUserList",
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
        async getUserList() {
        const res = await this.$http.get("admin_users");
        this.tableData = res.data;
        },
        async remove(row) {
            this.$confirm(`是否要刪除分類"${row.name}"`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async() => {
                const res = await this.$http.delete(`admin_users/${row._id}`)
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                this.getUserList();
            }).catch(() => {
                
            });
            const res = await this.$http.get("admin_users");
            this.tableData = res.data;
        }
    },
    created() {
        this.getUserList();
    }
};
</script>

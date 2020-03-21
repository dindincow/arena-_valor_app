<template>
  <div class="categoryEdit">
    <Breadcrumb :pathsTitle="$route.meta.title"></Breadcrumb>
    <Subheader :pageTitle="id ? '編輯管理員': '新建管理員'"></Subheader>
    <div class="panel">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="用戶名">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密碼">
                <el-input v-model="form.password"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">保存</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
  </div>
</template>

<script>
import Subheader from '../components/Subheader';
import Breadcrumb from '../components/Breadcrumb';
export default {
    name: "AdminUserEdit",
    components: {
        Subheader,
        Breadcrumb
    },
    props:{
        id:{}
    },
    data() {
        return {
            form: {
                username: '',
                password:''
                
            },
            parents:[]
        }
    },
    methods: {
        async onSubmit() {
            let res;

            if(this.id){
                const res = await this.$http.put(`admin_users/${this.id}`,this.form);
            }else{
              
                const res = await this.$http.post('admin_users',this.form);
            }
            this.$router.push('/admin_users/list');
            this.$message({
                type:'success',
                message:'保存成功'
            })
        },
        async fetch(){
            const res = await this.$http.get(`admin_users/${this.id}`);
            this.form = res.data;
        },
     
      
    },
    created() {
        
        this.id && this.fetch()
    },
};
</script>

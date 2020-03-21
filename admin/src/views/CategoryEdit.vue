<template>
    <div class="categoryEdit">
        <Breadcrumb :pathsTitle="$route.meta.title"></Breadcrumb>
        <Subheader :pageTitle="id ? '編輯分類': '新建分類'"></Subheader>
        <!--main-->  
        <div class="panel">
            <!--新增分類-->    
            <el-form ref="form" :model="addCategoryForm" label-width="120px" :inline="true" class="demo-form-inline" style="width: 50%">
                <el-form-item label="上級分類名稱">
                    <el-input v-model="addCategoryForm.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onAddParents">新增</el-button>
                </el-form-item>
            </el-form>
            
            <el-divider></el-divider>

            <el-form ref="form" :model="form" label-width="120px" style="width: 50%">
                <el-form-item label="上級分類">
                    <el-select v-model="form.parent">
                        <el-option v-for="item in parents" 
                                :key="item.id" 
                                :label="item.name" 
                                :value="item._id">
                        </el-option>
                    
                    </el-select>
                </el-form-item>
                <el-form-item label="子分類名稱">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit">保存</el-button>
                </el-form-item>
            </el-form>            
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
    props:{
        id:{}
    },
    data() {
        return {
            form: {
                name: '',
                parent:''
            },
            addCategoryForm:{
                name:''
            },
            parents:[],
        }
       
    },
    methods: {
        async onSubmit() {
            let res;

            if(this.id){
                const res = await this.$http.put(`categories/${this.id}`,this.form);
            }else{

                if(this.form.parent==""){
                    this.$message({
                        type: 'warning',
                        message:'未填寫上級分類'
                    })
                    return false;
                }
                const res = await this.$http.post('categories',this.form);
            }
            this.$router.push('/categories/list');
            this.$message({
                type:'success',
                message:'保存成功'
            })
        },
        async fetch(){
            const res = await this.$http.get(`categories/${this.id}`);
            this.form = res.data;
        },
        async fetchParents(){
            const res = await this.$http.get(`categories`);
            this.parents = res.data;
        },
        async onAddParents() {
            const res = await this.$http.post('categories',this.addCategoryForm);
            this.$message({
                type:'success',
                message:'上級分類新增成功'
            })
            this.addCategoryForm.name = "";
            this.fetchParents();
        } 
    },
    created() {
        this.fetchParents()
        this.id && this.fetch()
    },
   
};
</script>

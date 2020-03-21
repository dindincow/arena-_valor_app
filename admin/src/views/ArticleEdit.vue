<template>
    <div class="categoryEdit">
        <Breadcrumb :pathsTitle="$route.meta.title"></Breadcrumb>
        <Subheader :pageTitle="id ? '編輯文章': '新建文章'"></Subheader>
        <div class="panel">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="所屬分類">
                    <el-select v-model="form.categories" multiple>
                        <el-option v-for="item in categories" 
                                :key="item.id" 
                                :label="item.name" 
                                :value="item._id">
                        </el-option>
                    
                    </el-select>
                </el-form-item>
                <el-form-item label="標題">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>

                <el-form-item label="詳情">
                    <vue-editor useCustomImageHandler @image-added="handleImageAdded" v-model="form.body"></vue-editor>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit">保存</el-button>
                    <el-button @click="$router.go(-1)">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import Subheader from '../components/Subheader';
import Breadcrumb from '../components/Breadcrumb';
export default {
    name: "articleEdit",
    components: {
        VueEditor,
        Subheader,
        Breadcrumb
    },
    props:{
        id:{}
    },
    data() {
        return {
            form: {
                title: '',
                categories:[],
                body:''
            },
            categories:[],
            
        }
    },
    methods: {
        async onSubmit() {
            let res;

            if(this.id){
                const res = await this.$http.put(`articles/${this.id}`,this.form);
            }else{
                const res = await this.$http.post('articles',this.form);
            }
            this.$router.push('/articles/list');
            this.$message({
                type:'success',
                message:'保存成功'
            })
        },
        async fetch(){
            const res = await this.$http.get(`articles/${this.id}`);
            this.form = res.data;
        },
        async fetchCategories(){
            const res = await this.$http.get(`categories`);
            this.categories = res.data;
        },

        async handleImageAdded(file, Editor, cursorLocation, resetUploader) {

            // 提交表單數據用
            const formData = new FormData();
            formData.append("file", file);
        
            const res = await this.$http.post('uploads',formData)
            Editor.insertEmbed(cursorLocation, "image", res.data.url);
            resetUploader();
        }
    },
    created() {
        this.fetchCategories()
        this.id && this.fetch()
    },
};
</script>

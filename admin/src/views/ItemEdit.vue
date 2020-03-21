<template>
    <div class="categoryEdit">
        <Breadcrumb :pathsTitle="$route.meta.title"></Breadcrumb>
        <Subheader :pageTitle="id ? '編輯裝備': '新建裝備'"></Subheader>
        <!--main-->  
        <div class="panel"> 
            <el-form ref="form" :model="model" label-width="80px" style="width: 50%">
                <el-form-item label="名稱">
                    <el-input v-model="model.name"></el-input>
                </el-form-item>
                <el-form-item label="圖片">
                    <el-upload
                        class="avatar-uploader"
                        :action="$http.defaults.baseURL+'/uploads'"
                        :show-file-list="false"
                        :on-success="afterUpload"
                    >
                    <img v-if="model.icon" :src="model.icon" class="avatar" />
                  
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
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
    name: "ItemEdit",
    components: {
        Subheader,
        Breadcrumb
    },
    props: {
        id: {}
    },
    data() {
        return {
            model: {
                name: "",
            }
        };
    },
    methods: {
        afterUpload(res){
            
            this.$set(this.model,'icon',res.url) 
            this.model.icon = res.url;
        },
        async onSubmit() {
            let res;
            if (this.id) {
                const res = await this.$http.put(`items/${this.id}`, this.model);
            } else {
                const res = await this.$http.post("items", this.model);
            }
            this.$router.push("/items/list");
            this.$message({
                type: "success",
                message: "保存成功"
            });
        },
        async fetch() {
            console.log("inin");
            const res = await this.$http.get(`items/${this.id}`);
            this.model = res.data;
        }
    },
    created() {
        console.log("id", this.id);
        this.id && this.fetch();
    }
};
</script>
<style scoped>

.avatar-uploader-icon {
    width: 100px;
    height: 100px;
    line-height: 100px;
}

.avatar{
    max-width: 100px;
    max-height: 100px;
}

</style>





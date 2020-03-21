<template>
    <div class="adsEdit">
        <Breadcrumb :pathsTitle="$route.meta.title"></Breadcrumb>
        <Subheader :pageTitle="id ? '編輯廣告位': '新建廣告位'"></Subheader>
        <!--main-->  
        <div class="panel">
   
            <el-form  :model="form" label-width="120px">
                <el-form-item label="廣告區域名稱">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
           
                <el-divider></el-divider>  
                <div>
                    <el-button  type="primary" @click="form.items.push({})" style="margin:15px 0; width: 150px;">
                        <div class="el-icon-plus" >增加廣告</div>
                    </el-button>
                </div>

                <el-row type="flex" style="flex-wrap:wrap">
                        <el-col class="adBox" :md="6" v-for="(item,i) in form.items" :key="i">
                            <el-form-item label="跳轉URL">
                                <el-input v-model="item.url"></el-input>
                            </el-form-item>
                            <el-form-item label="圖片">
                                <el-upload
                                    class="avatar-uploader"
                                    :action="$http.defaults.baseURL+'/uploads'"
                                    :show-file-list="false"
                                    :on-success="res=>$set(item,'image',res.url)"
                                >
                                <img v-if="item.image" :src="item.image" class="avatar" />
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </el-form-item>
                        
                            <el-form-item class="text-right">
                                <el-button type="danger" @click="form.items.splice(i,1)">刪除</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item style="margin-top:20px">
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
    name: "adsEdit",
    components: {
        Subheader,
        Breadcrumb
    },
    props: {
        id: {}
    },
    data() {
        return {
            form: {
                name: "",
                items:[{}]
            },
            test:{

            }
        }
    },
    methods: {
        async onSubmit() {
            let res;

            if (this.id) {
                const res = await this.$http.put(`ads/${this.id}`, this.form);
            } else {
                const res = await this.$http.post("ads", this.form);
            }
            this.$router.push("/ads/list");
            this.$message({
                type: "success",
                message: "保存成功"
            });
        },
        async fetch() {
            const res = await this.$http.get(`ads/${this.id}`);
            this.form = Object.assign({},this.form, res.data);
        }, 
    },
    created() {
        this.id && this.fetch();
    }
};
</script>
<style scoped>
.adBox{
    border: 1px solid #ccc;
    padding: 25px 35px 0 0;
}
.avatar-uploader-icon{
    width: 230px;
    height: 120px;
    line-height: 120px;
}
.avatar{
   width: 230px;
}
</style>


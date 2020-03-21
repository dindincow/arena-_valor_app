<template>
    <div class="categoryEdit">
        <Breadcrumb :pathsTitle="$route.meta.title"></Breadcrumb>
        <Subheader :pageTitle="id ? '編輯英雄': '新建英雄'"></Subheader>
        <el-form ref="form" :model="model" label-width="80px">
            <el-tabs type="border-card" value="basic">
                <!--基本訊息-->
                <el-tab-pane label="基本訊息" name="basic">
                    <el-row :gutter="20">
                        <el-col :span="10">
                            <el-form-item label="名稱">
                                <el-input v-model="model.name"></el-input>
                            </el-form-item>
                            <el-form-item label="稱號">
                                <el-input v-model="model.title"></el-input>
                            </el-form-item>
                            <!-- <el-input v-model="model.categoryName"></el-input> -->
                          
                            <el-form-item label="類型" style="width=100%">
                                <el-select v-model="model.categories" multiple >
                                    <el-option v-for="item in categories" 
                                            :key="item.id" 
                                            :label="item.name" 
                                            :value="item._id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="英雄圖示">
                                <el-upload
                                    class="avatar-uploader"
                                    :action="$http.defaults.baseURL+'/uploads'"
                                    :show-file-list="false"
                                    :on-success="afterUpload"
                                >
                                    <img v-if="model.icon" :src="model.icon" class="avatar"/>
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </el-form-item>

                            <el-form-item label="Banner">
                                <el-upload
                                    class="avatar-uploader"
                                    :action="$http.defaults.baseURL+'/uploads'"
                                    :show-file-list="false"
                                    :on-success=" res => $set(model,'banner',res.url)"
                                >
                                <img v-if="model.banner" :src="model.banner" class="banner" />
                                <i v-else class="el-icon-plus banner-uploader-icon"></i>
                                </el-upload>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10" :offset="1">
                            <el-form-item label="難度">
                                <el-rate :max="10" show-score v-model="model.scores.diffcult"></el-rate>
                            </el-form-item>
                            <el-form-item label="技能">
                                <el-rate :max="10" show-score v-model="model.scores.skills"></el-rate>
                            </el-form-item>
                            <el-form-item label="攻擊">
                                <el-rate :max="10" show-score v-model="model.scores.attack"></el-rate>
                            </el-form-item>
                            <el-form-item label="生存">
                                <el-rate :max="10" show-score v-model="model.scores.survive"></el-rate>
                            </el-form-item>

                            <el-form-item label="順風出莊">

                                <el-select v-model="model.items1" multiple >
                                    {{model.items1}}
                                    <el-option v-for="item in items" 
                                            :key="item.id" 
                                            :label="item.name" 
                                            :value="item._id">
                                    </el-option>
                                
                                </el-select>
                            </el-form-item>
                            <el-form-item label="使用技巧">
                                <el-input type="textarea" v-model="model.usageTips"></el-input>
                            </el-form-item>
                            <el-form-item label="英雄故事">
                                <el-input type="textarea" v-model="model.story"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                   
                </el-tab-pane>

                <!--技能編輯-->
                <el-tab-pane label="技能編輯" name="skills">
                    <div class="text-right">
                        <el-button @click="model.skills.push({})" type="success"> 
                            <div class="el-icon-plus">增加技能</div>
                        </el-button>
                    </div>
                 
                    <el-divider></el-divider>
                    <el-row class="d-flex">
                        <el-col class="skillBox" :span="10" :md="6" v-for="(item,i) in model.skills" :key="i">
                            <div class="skillNum"><span>{{i+1}}</span></div>
                            <el-form-item label="名稱">
                                <el-input v-model="item.name"></el-input>
                            </el-form-item>
                            <el-form-item label="圖像">
                                <el-upload
                                    class="avatar-uploader"
                                    :action="$http.defaults.baseURL+'/uploads'"
                                    :show-file-list="false"
                                    :on-success="res=>$set(item,'icon',res.url)"
                                >
                                    <img v-if="item.icon" :src="item.icon" class="avatar" />
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </el-form-item>
                            <el-form-item label="描述">
                                    <el-input type="textarea" v-model="item.description"></el-input>
                            </el-form-item>
                            <el-form-item label="提示">
                                    <el-input type="textarea" v-model="item.tips"></el-input>
                            </el-form-item>
                            <el-form-item class="text-right">
                                <el-button type="danger" @click="model.skills.splice(i,1)">刪除</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs>

            <!--保存-->
            <el-form-item style="margin-top:20px;">
                <el-button type="primary" @click="onSubmit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import Subheader from '../components/Subheader';
import Breadcrumb from '../components/Breadcrumb';
export default {
    name: "HeroseEdit",
    components: {Subheader,Breadcrumb},
    props: {
        id: {}
    },
    data() {
        return {
            model: {
                name: "",
                categories:"",
                categoryName:"",
                scores:{
                    diffcult:0
                },
                items1:[],
                usageTips:"",
                skills:[],
                story:""
            },
            categories:[],
            items:[],
        };
    },
    methods: {
        afterUpload(res){
            console.log(res)
            this.$set(this.model,'icon',res.url)
            this.model.icon = res.url;
        },
        async onSubmit() {

            let res;
            if (this.id) {
                const res = await this.$http.put(`heroes/${this.id}`, this.model);
            } else {
                console.log("----this.model---",this.model)
                const res = await this.$http.post("heroes", this.model);
            }
            this.$router.push("/heroes/list");

            this.$message({
                type: "success",
                message: "保存成功"
            });
        },
        async fetch() {
            const res = await this.$http.get(`heroes/${this.id}`);
            //Object.assign() 物件屬性的合併
            this.model = Object.assign({},this.model,res.data);
        },
        async fetchCategories() {
            const res = await this.$http.get('categories/heroes');
            this.categories = res.data;
        },
        async fetchItems() {
            const res = await this.$http.get('items');
            this.items = res.data;
        }
    },
    created() {
        this.id && this.fetch();
        this.fetchCategories();
        this.fetchItems();
    }
};
</script>
<style scoped>

.avatar-uploader-icon{
    width: 100px;
    height: 100px;
    line-height: 100px; 
}

.banner-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 200px;
    line-height: 120px;
    text-align: center;
}
.el-tab-pane{
    padding: 20px;
}

.el-rate {
    padding: 10px 0 0 0;
}

.skillBox{
    padding: 30px 25px 15px 0;
    border: 1px dashed #ccc;
    position: relative; 
}
.skillNum{
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 50px 50px 0 0;
    border-color: #007bff transparent transparent transparent;
    position: absolute;
    top: 0;
}
.skillNum span[data-v-8c41aaa0] {
    position: absolute;
    top: -46px;
    color: #ffffff;
    font-size: 18px;
    display: block;
    left: 10px;
    font-family: fantasy;
}


.avatar-uploader-icon {
    width: 100px;
    height: 100px;
    line-height: 100px;
}

img.avatar{
    width: 100px;
    height: 100px;
}

img.banner{
    width: 200px;
    
}

</style>


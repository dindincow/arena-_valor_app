<template>
    <div class="categoryEdit">
        <Breadcrumb :pathsTitle="$route.meta.title"></Breadcrumb>
        <Subheader pageTitle="周免英雄"></Subheader>
        <!--main-->  
        <div class="panel">
            <el-form ref="form" label-width="80px" style="width: 50%">
                <el-form-item label="請選擇英雄" :label-width="formLabelWidth">
                    <el-select v-model="heroId" >
                        <el-option 
                            v-for="item in heroList" 
                            :key="item._id" 
                            :label="item.name" 
                            :value="item._id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="addHero()">新增英雄</el-button>
                </el-form-item>
            </el-form>

            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    type="index"
                    label="排序"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="_id"
                    label="id"
                    width="250">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="英雄"
                    width="180">
                    <!-- <template slot-scope="scope">
                        <span>{{scope.row.name}}</span> 
                    </template> -->
                </el-table-column>
                <el-table-column
                    label="圖示"
                    width="180">
                    <template slot-scope="scope">
                        <img :src="scope.row.icon">
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">           
                        <el-button type="text" size="small" @click="edit(scope.row._id,scope.row.heroId)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog title="選擇英雄" :visible.sync="isEdit">
            <el-form :model="form"> 
                <el-form-item label="請選擇英雄" :label-width="formLabelWidth">
                    <el-select v-model="heroId" >
                        <el-option 
                            v-for="item in heroList" 
                            :key="item._id" 
                            :label="item.name" 
                            :value="item._id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isEdit = false">取 消</el-button>
                <el-button type="primary" @click="onSubmit()">确 定</el-button>
            </div>  
        </el-dialog>

    </div>

</template>

<script>
import Subheader from '../components/Subheader';
import Breadcrumb from '../components/Breadcrumb';
import SelectHerose from '../components/SelectHerose';

export default {
    name: "categoryEdit",
    components: {
        Subheader,
        Breadcrumb,
        SelectHerose
    },
    props:{
        id:{}
    },
    data() {
        return {
           
            heroId:'',
            formLabelWidth: '120px',
            tableData:[],
            heroList:[],
            isEdit:false,
            colId:'',
            form:{}
        }
       
    },
    methods: {

        async onSubmit() {
            let obj={
                heroId:this.heroId,
                id:this.colId
            }
            const res = await this.$http.put(`weekheroes/${this.colId}`,{heroId:this.heroId});

            this.$message({
                type:'success',
                message:'更新成功'
            })
            this.getWeekheroesList();
            this.isEdit=false;
        },

        async getItemsList() {
            const res = await this.$http.get("allHeroes");
            this.heroList = res.data ; 
            console.log('this.heroList',this.heroList)
            
        },

        async getWeekheroesList(){
            const res = await this.$http.get("weekheroes");
            this.tableData = res.data;  
        },

        async addHero(){
            await this.$http.post("weekheroes",{id:this.heroId}); 
            this.getWeekheroesList(); 
        },

        edit(id,heroId){
            console.log("欄位",id)
            console.log("英雄",heroId)
            this.heroId = heroId;
            this.colId = id;
            this.isEdit=true;
        },
       
    },
   
    created() {
        this.getItemsList();
        this.getWeekheroesList();
    },
   
};
</script>

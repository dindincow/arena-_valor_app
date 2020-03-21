<template>   
    <el-select v-model="SelectHeros">
        <!-- <el-option label="jessics1" value="1"></el-option>
        <el-option label="jessics2" value="2"></el-option>
        <el-option label="jessics3" value="3"></el-option> -->
        <el-option 
            v-for="item in heroesList" 
            :key="item._id" 
            :label="item.name" 
            :value="item._id">
        </el-option>
    </el-select>
</template>

<script>
export default {
    name: 'selectHerose',
    props:{
        heroesList:Array, 
    },
    data(){
        return{
            SelectHeros:""
        }
    },
    created() {
        console.log("heroesList",this.heroesList)
    },
}
</script>

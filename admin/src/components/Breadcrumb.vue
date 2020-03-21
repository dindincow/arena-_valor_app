<template>   
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin: 0 0 30px;">
        <el-breadcrumb-item v-for="(path,index) in pathsTitle" :key="index">
            {{path}}
        </el-breadcrumb-item>  
    </el-breadcrumb>
</template>

<script>
export default {
    name: 'Breadcrumb',
    props:{
        pathsTitle:Array, 
    }
}
</script>

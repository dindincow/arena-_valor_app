<template>
    <div class="page-article">
        <div class="d-flex p-2">
            <router-link  to="/"> BACK | </router-link>
            <div class="flex-1">
                {{model.title}}
            </div>
            <div class="text-grey fs-sx">2019-06-06</div>
        </div>
        <div v-html="model.body" class="p-3 content"></div>
    </div>
</template>

<script>
export default {
    name: 'Article',
    props: {
        id:{require:true}     
    },
    data() {
        return {
            model:null
        }
    },
    methods: {
        async fetch(){
            const res = await this.$http.get(`/articles/${this.id}`);
         
            this.model = res.data;
            console.log('this.model',this.model)
           
        }
    },
    created() {
        this.fetch()
    },
}
</script>


<style scoped lang="scss">
.page-article{
    margin-bottom: 200px;
}
.content{
    width: 100%;
}
.content img{
    width:100%;
}

</style>

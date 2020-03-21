<template>  
    <div class="card p-3 text-white mb-1">
         
        <div class="card-header d-flex pb-3">
            <i class="iconfont" :class="`icon-${icon}`"></i>
            <div class="fs-xl flex-1 pl-2">{{title}}</div>
            <i class="iconfont icon-moreread"></i>
        </div>
        <div class="card-body">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Card',
    props:{
        title:{type:String,required:true},
        icon:{type:String,required:true}
    },
    data() {
        return {
            swiperOption: {
                initialSlide: 0,
                pagination:'.swiper-pagination',
                loop: true,
            },       
        }
    }
}
</script>

<style lang="scss">
.card{
    background: #0e1831;
    .card-header{
        border-bottom:  1px solid #ccc;
    }
}

</style>

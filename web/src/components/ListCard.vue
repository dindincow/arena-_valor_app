<template>
    <Card :title="title" :icon="icon">
        <div class="mt-3">
            
            <slot name="imgs"></slot> 
        </div>
        <!--這邊會插到 Card組件 card-body 中-->
        <!--分類列表-->
        <div class="nav jc-between pt-3 text-white">
            <div v-for="(category,index) in categories" 
                :key="index" 
                class="nav-item" 
                :class="{active: active === index}"
                @click="$refs.list.swiper.slideTo(index)" 
                >
                <div class="nav-link">{{category.name}}</div>
            </div>
        </div>

        <!--展示列表-->
        <swiper 
            ref="list" 
            :options="{onSlideChangeEnd:function(){active = $refs.list.swiper.realIndex}}"
            >
            <swiper-slide v-for="(category, i) in categories" :key="i">
                <slot name="items" :category="category"></slot>
            </swiper-slide>
        </swiper>
    </Card>
</template>

<script>
import Card from '../components/Card';
export default {
    name: 'ListCard',
    components:{
        Card
    },
    props: {
        categories:{type:Array,required:true},
        title:{type:String,required:true},
        icon:{type:String,required:true},
       
    },
    data(){
        return{
            active:0,
        }
    },
    methods: {
        changeSwiperIndex(){
            return this.$refs.list.swiper.activeIndex
        }
    },
    created() {
        console.log("this.categories",this.categories)
    },
}
</script>

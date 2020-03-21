import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main'
import Home from './views/Home'
import Article from './views/Article'
import HeroDetail from './views/HeroDetail'
import Info from './views/Info'
import Herose from './views/Herose'


Vue.use(Router)

export default new Router({
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'main',
            component: Main,
            redirect:'home',
            children:[
                {path:'home',name:'home',component:Home},
                {path:'/articles/:id',name:'article',component:Article,props:true}, 
            ]
        },

        {
            path: '/introduction',
            name: 'introduction',
            component: Info,
        },

        {
            path: '/herose',
            name: 'herose',
            component: Herose,
        },

        {
            path:'/herose/:id',
            name:'heros',
            component:HeroDetail,
            props:true
        }
        
    ]
})

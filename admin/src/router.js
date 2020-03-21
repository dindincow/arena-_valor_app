import Vue from 'vue'
import Router from 'vue-router'
import store from './store/index'
import Main from './views/Main.vue'
import Login from './views/Login'
import CategoryEdit from './views/CategoryEdit'
import CategoryList from './views/CategoryList'
import ItemEdit from './views/ItemEdit'
import ItemList from './views/ItemList'
import HeroseEdit from './views/HeroseEdit'
import HeroseList from './views/HeroseList'
import WeekHerose from './views/WeekHerose'
import ArticleEdit from './views/ArticleEdit'
import ArticleList from './views/ArticleList'
import AdsEdit from './views/AdsEdit'
import AdsList from './views/AdsList'
import AdminUserEdit from './views/AdminUserEdit'
import AdminUserList from './views/AdminUserList'
import jwt_decode from "jwt-decode";


Vue.use(Router)

const router =  new Router({

    routes: [
        // 登入
        {
            path: '/login',
            name: 'Login',
            component: Login,
            meta:{isPublic:true}
        },

        {
            path: '/',
            redirect: '/categories/create'
        },

        // 分類
        {
            path: '/categories',
            name:'categories',
            component:Main,
            children:[
                {
                    path: 'create',
                    name: 'categoryCreate',
                    component: CategoryEdit,
                    meta: {
                        title: ['分類管理','新建分類']
                    }
                },
                {
                    path: 'list',
                    name: 'categoryList',
                    component: CategoryList,
                    meta: {
                        title: ['分類管理','分類列表']
                    }
                },
                {
                    path: 'edit/:id',
                    name: 'categoryEdit',
                    component: CategoryEdit,
                    meta: {
                        title: ['分類管理','編輯分類']
                    },
                    props: true //可把 url 參數注入到  CategoryEdit 裡面
                },
            ]
        },

        // 物品
        {
            path: '/items',
            name:'items',
            component:Main,
            children:[
                {
                    path: 'create',
                    name: 'itemsCreate',
                    component: ItemEdit,
                    meta: {
                        title: ['裝備管理','新建裝備']
                    }
                },
                {
                    path: 'list',
                    name: 'itemsList',
                    component: ItemList,
                    meta: {
                        title: ['裝備管理','裝備列表']
                    }
                },
                {
                    path: 'edit/:id',
                    name: 'itemsEdit',
                    component: ItemEdit,
                    meta: {
                        title: ['裝備管理','編輯物品']
                    },
                    props: true 
                },
            ]
        },

        // 英雄
        {
            path: '/heroes',
            name:'heroes',
            component:Main,
            children:[
                {
                    path: 'create',
                    name: 'heroesCreate',
                    component: HeroseEdit,
                    meta: {
                        title: ['英雄管理','新增英雄']
                    },
                },
                {
                    path: 'list',
                    name: 'heroesList',
                    component: HeroseList,
                    meta: {
                        title: ['英雄管理','英雄列表']
                    },
                },
                {
                    path: 'edit/:id',
                    name: 'heroesEdit',
                    component: HeroseEdit,
                    meta: {
                        title: ['英雄管理','編輯英雄']
                    },
                    props: true
                },
                {
                    path: 'weekHerose',
                    name: 'weekHerose',
                    component: WeekHerose,
                    meta: {
                        title: ['英雄管理','周免英雄']
                    },
                },
            ]
        },

        // 文章
        {
            path: '/articles',
            name:'articles',
            component:Main,
            children:[
                {
                    path: 'create',
                    name: 'articleCreate',
                    component: ArticleEdit,
                    meta: {
                        title: ['文章管理','新增文章']
                    },
                },
                {
                    path: 'list',
                    name: 'articleList',
                    component: ArticleList,
                    meta: {
                        title: ['文章管理','文章列表']
                    },
                },
                {
                    path: 'edit/:id',
                    name: 'articleEdit',
                    component: ArticleEdit,
                    meta: {
                        title: ['文章管理','編輯文章']
                    },
                    props: true 
                },
            ]
        },

        // 廣告
        {
            path: '/ads',
            name:'ads',
            component:Main,
            children:[
                {
                    path: 'create',
                    name: 'adsCreate',
                    component: AdsEdit,
                    meta: {
                        title: ['廣告管理','新增廣告']
                    },
                },
                {
                    path: 'list',
                    name: 'adsList',
                    component: AdsList,
                    meta: {
                        title: ['廣告管理','廣告列表']
                    },
                },
                {
                    path: 'edit/:id',
                    name: 'AdsEdit',
                    component: AdsEdit,
                    meta: {
                        title: ['廣告管理','修改廣告']
                    },
                    props: true
                },
            ]
        },

        // 管理員
        {
            path: '/admin_users',
            name:'admin_users',
            component:Main,
            children:[
                {
                    path: 'create',
                    name: 'adminUsersCreate',
                    component: AdminUserEdit,
                    meta: {
                        title: ['管理中心','新增管理者']
                    },
                },
                {
                    path: 'list',
                    name: 'adminUsersList',
                    component: AdminUserList,
                    meta: {
                        title: ['管理中心','管理者列表']
                    },
                },
                {
                    path: 'edit/:id',
                    name: 'adminUsersEdit',
                    component: AdminUserEdit,
                    meta: {
                        title: ['管理中心','編輯管理者']
                    },
                    props: true
                },
            ]
        },
    ]
})

// 判斷是否為空物件
function isEmptyObject(obj) {
    for (var key in obj) {
        return false;
    }
    return true;
}


// router.beforeEach(async(to,from,next)=>{
//     if(!to.meta.isPublic && !localStorage.token){
//         return next('/login')
//     }
//     next()
// })



router.beforeEach(async(to,from,next)=>{

    var hasToken = localStorage.token ? true : false

    // 如果去首頁
    if(to.path=='/login'){
        if(hasToken){
            return  next('/');
        }
        next();
    }else{
    // 不去首頁
        if(hasToken){
            next()

            const hasGetUserInfo = store.state.user.userInfo

            if (!isEmptyObject(hasGetUserInfo)) {
                next()
            } else {
                try {
                    // 解析 token
                    const decode = jwt_decode(localStorage.token);
                    await store.dispatch('getUserInfo',decode.id)
                    next()

                } catch (error) {
                    // remove token and go to login page to re-login
                    // await store.dispatch('user/resetToken')
                    // Message.error(error || 'Has Error')
                    next(`/login?redirect=${to.path}`) 
                }
            }
        }else{
            next('/login')
        }
    }


})




export default router;

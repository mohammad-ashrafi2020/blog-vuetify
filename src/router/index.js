import {createRouter, createWebHistory} from 'vue-router'

import AdminLayout from "@/Layouts/AdminLayout";
import MainLayout from "@/Layouts/MainLayout";


import Index from "@/pages/admin/IndexAdmin";

import UserIndex from "../pages/admin/users/IndexPage";
import AddUser from "../pages/admin/users/AddUser";
import EditUser from "../pages/admin/users/EditUser";

import IndexCategory from "../pages/admin/categories/IndexCategory";
import AddCategory from "../pages/admin/categories/AddCategory";
import EditCategory from "../pages/admin/categories/EditCategory";

import IndexPost from "../pages/admin/posts/IndexPost";
import AddPost from "../pages/admin/posts/AddPost";
import EditPost from "../pages/admin/posts/EditPost";
/////////////////////////////////////////////////////
import HomePage from '../pages/HomeView.vue'
import PostPage from '../pages/Post/Index.vue'
import SearchPage from '../pages/SearchView'


const routes = [
    {
        path: '/',
        component: MainLayout,
        children: [
            {
                path:"",
                name:"home",
                component: HomePage
            },
            {
                path:"post/:slug",
                name:"singlePost",
                component: PostPage
            },
            {
                path:"search",
                name:"searchPage",
                component: SearchPage
            }
        ]
    },
    {
        path: "/admin",
        component: AdminLayout,
        children: [
            {
                path: "",
                component: Index
            },
            {
                path: "users",
                component: UserIndex
            },
            {
                path: "users/add",
                name:"addUser",
                component: AddUser
            }
            ,
            {
                path: "users/Edit/:id",
                name:"editUser",
                component: EditUser
            },

            {
                path: "categories",
                component: IndexCategory
            },
            {
                path: "categories/add",
                name:"addCategory",
                component: AddCategory
            },
            {
                path: "categories/Edit/:id",
                name:"editCategory",
                component: EditCategory
            },
            {
                path: "posts",
                name:"posts",
                component: IndexPost
            },
            {
                path: "posts/add",
                name:"addPost",
                component: AddPost
            },
            {
                path: "posts/edit/:id",
                name:"editPost",
                component: EditPost
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router

import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
// import CourseList from '../views/courses/CourseList.vue'
import ResourceCrud from '../views/courses/ResourceCrud.vue'
// import CourseEdit from '../views/courses/CourseEdit.vue'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children:[
      {name:'Home', path:'/',component:Home},
      {name:'Course-crud',path:'/:resource/list',component:ResourceCrud,props:true},
      // {name:'Course-list',path:'/courses/list',component:CourseList},
      // {name:'Course-edit',path:'/courses/edit/:id',component:CourseEdit,props:true},
      // {name:'Course-create',path:'/courses/create',component:CourseEdit}
    ]
  },
  
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

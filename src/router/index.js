import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login')
    },
    // {
    //   path: '/conditions',
    //   name: 'conditions',
    //   component: () => import('../views/conditions'),
    //   redirect: '/conditions/detail',
    //   children: [
    //     {
    //       path: '/conditions/detail',
    //       component: () => import('../views/conditions/ConditionsDetail.vue')
    //     },
    //     {
    //       path: '/conditions/setConditions',
    //       name: 'setConditions',
    //       component: () => import('../views/conditions/SetConditions.vue')
    //     }
    //   ]
    // },
    // {
    //   path: '*',
    //   redirect: '/detail'
    // }
  ]
});

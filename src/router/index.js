import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

// Number of pages
Vue.prototype.$numRoutes = 2

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		meta: { hideNav: true }
	},
	{
		path: '/01-weight',
		name: 'Weight',
		component: () => import('../views/WeightView.vue'),
		//meta: { num: 1, bg_color: '#F50057', color: '#FCE4EC' }
		meta: { num: 1, bg_color: '#FCE4EC', color: '#F50057' }
	},
	{
		path: '/05-feed',
		name: 'Feed',
		component: () => import('../views/FeedView.vue'),
		meta: { num: 2, bg_color: '#E3F2FD', color: '#2196F3' }
	},
	{
		path: '/03-aware',
		name: 'Aware',
		component: () => import('../views/AwareView.vue'),
		meta: { num: 3, bg_color: '#E0F2F1 ', color: '#00BFA5' }
	},
	{
		path: '/02-gravity',
		name: 'Gravity',
		component: () => import('../views/GravityView.vue'),
		meta: { num: 4, bg_color: '#F3E5F5', color: '#8E24AA' }
	},
	{
		path: '/04-bias',
		name: 'Bias',
		component: () => import('../views/BiasView.vue'),
		meta: { num: 5, bg_color: '#FFF2DF', color: '#FA8100' }
	}
]

const router = new VueRouter({
	mode: 'history',
	routes
})

export default router

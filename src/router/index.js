import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Main',
		component: Main
	},
	{
		path: '/default',
		name: 'Default',
		component: () =>
			import(/* webpackChunkName: "about" */ '../views/DefaultView.vue')
	},
	{
		path: '/exploration-1',
		name: 'Exploration-1',
		component: () =>
			import(
				/* webpackChunkName: "about" */ '../views/Exploration-1-View.vue'
			)
	},
	{
		path: '/exploration-2',
		name: 'Exploration-2',
		component: () =>
			import(
				/* webpackChunkName: "about" */ '../views/Exploration-2-View.vue'
			)
	},
	{
		path: '/exploration-3',
		name: 'Exploration-3',
		component: () =>
			import(
				/* webpackChunkName: "about" */ '../views/Exploration-3-View.vue'
			)
	}
]

const router = new VueRouter({
	routes
})

export default router

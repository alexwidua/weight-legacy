<template>
	<div class="container">
		<Post v-for="(post, index) in posts" :key="index" :post="post" />
		<!--TODO: remove color (used for debugging)-->
		<div
			ref="loadTrigger"
			style="display:block;width:100px; height:100px;"
		/>
	</div>
</template>
<script>
// load local mock api
import fetchPosts from '../../js/mockAPI'
import Post from './ContentListPost.vue'

export default {
	data() {
		return {
			observer: null,
			posts: null
		}
	},
	components: { Post },
	methods: {
		// intersection observer callback
		handleObserve() {
			this.loadMore()
		},
		loadMore() {
			let newPosts = fetchPosts(10)
			this.posts.push(...newPosts)
		}
	},
	mounted() {
		// load initial posts
		this.posts = fetchPosts(10)
		// trigger element at bottom of list triggers new content load
		this.observer.observe(this.$refs.loadTrigger)
	},
	created() {
		// create intersection observer instance to infinite load content
		this.observer = new IntersectionObserver(this.handleObserve, {
			root: this.$el,
			threshold: 1.0
		})
	}
}
</script>

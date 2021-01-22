<template>
	<div id="app">
		<Nav
			v-if="!this.$router.currentRoute.meta.hideNav"
			:name="this.$router.currentRoute.name"
			:num="this.$router.currentRoute.meta.num"
			:bg_color="this.$router.currentRoute.meta.bg_color"
			:color="this.$router.currentRoute.meta.color"
		/>

		<router-view />
	</div>
</template>

<script>
import Nav from '@/components/Common/Nav.vue'

export default {
	components: {
		Nav
	}
}
</script>
<style lang="scss">
#app {
	max-width: var(--content-width);
	margin: 0 auto;
	//margin-top: 48px;
	background: var(--app-bg);
}

@media (min-width: 992px) {
	#app {
		position: relative;
		max-height: calc(100vh - 48px);
	}
}
</style>

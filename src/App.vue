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
	padding-top: 48px;
	background: #000;
	box-shadow: rgba(0, 0, 0, 0.5) 0px 14px 28px,
		rgba(0, 0, 0, 0.5) 0px 10px 10px;
	cursor: url('~@/assets/cursor.png') 12 12, default;

	& a {
		cursor: url('~@/assets/cursor.png') 12 12, default;
	}
}

@media (min-width: 992px) {
	#app {
		position: relative;
		max-height: 100vh;
	}
}
</style>

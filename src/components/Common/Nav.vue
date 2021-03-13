<template>
	<div class="nav" :style="`background:${bg_color}; color:${color}`">
		<div class="title">{{ name }}</div>
		<div class="pagination">
			<span v-html="`0${num}`" />
			<span
				class="pagination-num"
				v-html="`/0${this.$router.options.routes.length - 1}`"
			/>
			<div class="pagination-control">
				<router-link
					:class="{
						disabled: num == 1
					}"
					:to="this.$router.options.routes[prev].path"
					><svg
						width="30"
						height="16"
						viewBox="0 0 30 16"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M0.292893 7.29289C-0.0976314 7.68341 -0.0976315 8.31658 0.292892 8.7071L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34314C8.46159 1.95262 8.46159 1.31945 8.07107 0.92893C7.68054 0.538406 7.04738 0.538406 6.65686 0.92893L0.292893 7.29289ZM30 7L1 7L1 9L30 9L30 7Z"
							:fill="color"
						/>
					</svg>
				</router-link>
				<router-link
					:class="{
						disabled: num == this.$router.options.routes.length - 1
					}"
					:to="this.$router.options.routes[next].path"
					><svg
						width="30"
						height="16"
						viewBox="0 0 30 16"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M29.7071 8.70711C30.0976 8.31659 30.0976 7.68342 29.7071 7.2929L23.3431 0.928934C22.9526 0.53841 22.3195 0.53841 21.9289 0.928934C21.5384 1.31946 21.5384 1.95262 21.9289 2.34315L27.5858 8L21.9289 13.6569C21.5384 14.0474 21.5384 14.6805 21.9289 15.0711C22.3195 15.4616 22.9526 15.4616 23.3431 15.0711L29.7071 8.70711ZM-8.74228e-08 9L29 9L29 7L8.74228e-08 7L-8.74228e-08 9Z"
							:fill="color"
						/>
					</svg>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		name: {
			type: String,
			default: 'Exploration'
		},
		num: {
			type: Number,
			default: 1
		},
		bg_color: {
			type: String,
			default: '#000'
		},
		color: {
			type: String,
			default: '#fff'
		}
	},
	computed: {
		prev() {
			const n = this.num - 1
			return n > -1 ? n : 0
		},
		next() {
			const n = this.num + 1
			return n < this.$router.options.routes.length
				? n
				: this.$router.options.routes.length - 1
		}
	}
}
</script>

<style lang="scss" scoped>
.nav {
	position: fixed;
	top: 0;
	z-index: 99;
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	max-width: var(--content-width);
	height: var(--nav-height);
	padding: 0 16px;
	color: var(--nav-text);
	font-family: 'IBM Plex Mono', monospace;
	background: var(--nav-bg);
}

.pagination {
	display: flex;
	align-items: center;

	&-num {
		margin-right: 16px;
		opacity: 0.4;
	}

	&-control {
		height: 16px;
		& a {
			padding: 4px 8px 4px 8px;
			color: var(--nav-text);
			line-height: 16px;
			text-decoration: none;
		}
	}

	& .disabled {
		opacity: 0.2;
	}
}
</style>

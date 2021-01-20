<template>
	<div class="playground">
		<div class="control">
			<div class="control-display">
				<span style="color:#b6b6b6">µ</span> {{ friction.toFixed(2) }}
			</div>
			<div @click="increase" class="control-button">+</div>
			<div @click="decrease" class="control-button">-</div>
		</div>

		<DefaultScroll :friction="friction" />
	</div>
</template>

<script>
import DefaultScroll from '../components/Default.vue'

export default {
	/*
	 **	Default view that wraps the default scroll wrapper
	 */
	name: 'DefaultView',
	data() {
		return {
			friction: 0.05
		}
	},
	components: {
		DefaultScroll
	},
	methods: {
		increase() {
			this.friction += 0.05
		},
		decrease() {
			this.friction -= 0.05
		}
	}
}
</script>

<style scoped>
.control {
	position: absolute;
	width: 100vw;
	height: 75px;
	display: flex;
	justify-content: center;
	align-items: center;
	bottom: 0;
	left: 0;
	background: #000;
	z-index: 5;
	color: #fff;
}

.control-button {
	height: 40px;
	width: 40px;
	margin: 6px;
	background: rgb(26, 26, 26);
	display: flex;
	justify-content: center;
	align-items: center;
	color: #fff;
	border-radius: 100%;
	font-size: 2em;
}

.control-display {
	font-size: 2em;
	margin-right: 1em;
}
</style>

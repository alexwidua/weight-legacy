<template>
	<div class="bias">
		<div
			class="cog"
			@click="controlsVisible = !controlsVisible"
			v-html="`⚙️`"
		/>
		<transition name="slide-fade">
			<div v-if="controlsVisible" class="control">
				<div class="bias-display">
					<span class="bias-icon">🧲</span>
					<span
						class="zap"
						:class="{ 'zap-enabled': i <= bias }"
						v-for="i in 6"
						:key="i"
						v-html="`⚡`"
					/>
				</div>
				<div
					class="control-button"
					:class="{ disabled: bias == 0 }"
					@click="decrease"
				>
					<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
						<path
							d="M0 8C1.82857 8 11.4286 8 16 8"
							stroke="white"
							stroke-width="2"
						/>
					</svg>
				</div>
				<div
					class="control-button"
					:class="{ disabled: bias == 6 }"
					@click="increase"
				>
					<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
						<path
							d="M0 8C1.82857 8 11.4286 8 16 8"
							stroke="white"
							stroke-width="2"
						/>
						<path
							d="M8 16C8 14.1714 8 4.57143 8 -8.9407e-08"
							stroke="white"
							stroke-width="2"
						/>
					</svg>
				</div>
			</div>
		</transition>
		<Content :bias="biasMap[bias]" />
	</div>
</template>

<script>
import Content from '../components/Exploration/Bias.vue'

export default {
	/*
	 **	Bias Exploration
	 */
	name: 'Bias',
	components: {
		Content
	},
	data: () => ({
		controlsVisible: false,
		// 'magnetic' force for biased post
		bias: 3,
		biasMap: [0, 1, 3, 6, 10, 16, 20]
	}),
	methods: {
		increase() {
			if (this.bias < 6) {
				this.bias += 1
			}
		},
		decrease() {
			if (this.bias > 0) {
				this.bias -= 1
			}
		}
	}
}
</script>

<style lang="scss">
.bias {
	&-display {
		display: flex;
		align-items: center;
		margin-right: 8px;
	}
	&-icon {
		margin: 8px;
	}

	& .control-button {
		width: 32px;
		height: 32px;
		padding: 0;
		line-height: 36px;
	}
}
.zap {
	opacity: 0.2;

	&-enabled {
		opacity: 1;
	}
}
</style>

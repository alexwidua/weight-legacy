<template>
	<div class="weight">
		<div
			class="cog"
			@click="controlsVisible = !controlsVisible"
			v-html="`⚙️`"
		/>
		<transition name="slide-fade">
			<div v-if="controlsVisible" class="control">
				<div class="weight-display">
					<span class="weight-icon">⚖️</span>
					<span class="weight-value">{{
						toFriction.toFixed(2)
					}}</span>
					<span class="weight-unit">kg</span>
				</div>
				<div
					class="control-button control-button--first"
					:class="{ disabled: weight == 0 }"
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
				<div class="control-button" @click="increase">
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
		<Content :friction="toFriction" />
	</div>
</template>

<script>
import Content from '../components/Exploration/Weight.vue'

export default {
	/*
	 **	Weight exploration
	 */
	name: 'WeightView',
	components: {
		Content
	},
	data: () => ({
		controlsVisible: false,
		// weight is an abstraction of friction, for presentation purpose
		weight: 50
	}),
	methods: {
		increase() {
			if (this.weight < 1000) {
				this.weight += 50
			}
		},
		decrease() {
			if (this.weight > 0) {
				this.weight -= 50
			}
		}
	},
	computed: {
		toFriction() {
			return this.weight * 0.001
		}
	}
}
</script>

<style lang="scss">
.weight {
	&-display {
		display: flex;
		align-items: center;
	}

	& .control-button {
		width: 32px;
		height: 32px;
		padding: 0;
		line-height: 36px;
	}

	&-icon {
		padding: 8px;
	}
	&-value {
		padding: 8px;
	}
	&-unit {
		padding-right: 16px;
		opacity: 0.4;
	}
}
</style>

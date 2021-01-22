<template>
	<div>
		<div
			class="cog"
			@click="controlsVisible = !controlsVisible"
			v-html="`⚙️`"
		/>
		<transition name="slide-fade">
			<div v-if="controlsVisible" class="control">
				<span class="aware-icon">🔎</span>
				<div
					class="control-button"
					:class="{ selected: subtleFactor === 0.8 }"
					@click="setSubtle(0.8)"
					v-html="`Very subtle`"
				/>
				<div
					class="control-button"
					:class="{ selected: subtleFactor === 0.3 }"
					@click="setSubtle(0.3)"
					v-html="`Subtle`"
				/>
			</div>
		</transition>
		<Content :friction="subtleFactor" />
	</div>
</template>

<script>
import Content from '../components/Exploration/Aware.vue'

export default {
	/*
	 **	Content-Aware exploration
	 */
	name: 'Aware',
	components: {
		Content
	},
	data: () => ({
		controlsVisible: false,
		// friction coefficient for highlighted content
		subtleFactor: 0.3
	}),
	methods: {
		setSubtle(val) {
			this.subtleFactor = val
		}
	}
}
</script>

<style lang="scss">
.aware {
	&-icon {
		margin: 0 8px;
	}
}
</style>

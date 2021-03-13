<template>
	<div class="gravity">
		<div
			class="cog"
			@click="controlsVisible = !controlsVisible"
			v-html="`⚙️`"
		/>
		<transition name="slide-fade">
			<div v-if="controlsVisible" class="control">
				<div
					class="control-button"
					:class="{ selected: gravity === 0.01 }"
					@click="setGravity(0.01)"
					v-html="`🌞`"
				/>
				<div
					class="control-button"
					:class="{ selected: gravity === 0.002 }"
					@click="setGravity(0.002)"
					v-html="`🌍`"
				/>
				<div
					class="control-button"
					:class="{ selected: gravity === 0.0001 }"
					@click="setGravity(0.0001)"
					v-html="`🌑`"
				/>
			</div>
		</transition>
		<Content :gravity="gravity" />
	</div>
</template>

<script>
import Content from '../components/Exploration/Gravity.vue'

export default {
	/*
	 **	Gravity Exploration
	 */
	name: 'Gravity',
	components: {
		Content
	},
	data: () => ({
		controlsVisible: false,
		// gravity attraction force
		gravity: 0.002
	}),
	methods: {
		setGravity(val) {
			this.gravity = val
		}
	}
}
</script>

<style lang="scss">
.gravity {
	background: var(--app-bg);
}
</style>

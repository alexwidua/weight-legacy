<template>
	<div class="feed">
		<Content />
	</div>
</template>

<script>
import Content from '../components/Exploration/Feed.vue'

export default {
	/*
	 **	Weight exploration
	 */
	name: 'FeedView',
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
.feed {
	background: var(--app-bg);
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

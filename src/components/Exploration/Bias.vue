<template>
	<div
		class="container"
		:style="`transform:translateY(${contentPosition}px`"
		ref="container"
	>
		<div class="hint">
			Weight gives a bias to certain posts in the feed.
		</div>
		<Post
			v-for="i in 6"
			:key="i + 'x'"
			:post="{
				headline: 'Unbiased post',
				content:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet luctus enim, id vestibulum quam.'
			}"
			style="height:210px"
		/>
		<div ref="bias">
			<Post
				class="biased"
				:class="{ 'biased--visible': targetInViewport }"
				:post="{
					headline: 'Biased post',
					content:
						'This is a biased post. When it scrolls into view, it attracts the viewport and tries to stick to the center'
				}"
				style="height:210px"
			/>
		</div>
		<Post
			v-for="i in 8"
			:key="i + 'y'"
			:post="{
				headline: 'Unbiased post',
				content:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet luctus enim, id vestibulum quam.'
			}"
			style="height:210px"
		/>
	</div>
</template>

<script>
import Post from '../ContentList/ContentListPost.vue'

export default {
	components: {
		Post
	},
	data: () => ({
		// pointer
		pointerPosition: 0,
		pointerOrigin: 0,
		pointerDragOffset: 0,

		// scroll content
		contentPosition: 0,
		contentPreviousPosition: 0,

		// checkers
		isDragging: false,
		isTracking: false,
		isTouch: false,

		// physics
		velocity: 0,
		friction: 0.05,

		// animation frame
		rafID: null,

		// misc
		targetInViewport: false,
		target: 1450
		//bias: 5
	}),
	props: {
		bias: {
			type: Number,
			default: 5
		}
	},
	methods: {
		/**
		 * Handle pointer down event
		 * Sets initial position and inits tracking animation loop
		 */
		pointerDown(e) {
			this.isDragging = true

			// check if mouse or touch event
			this.isTouch = !!(e.touches && e.touches[0])
			const eventData = this.isTouch ? e.touches[0] : e
			const { pageY } = eventData

			this.pointerOrigin = pageY
			// pick up previous content contentPosition
			this.contentPreviousPosition = this.contentPosition
			this.calcPointerPosition(e)
			// init tracking/momentum
			this.initTracking()

			if (!this.isTouch) {
				e.preventDefault()
			}
		},
		/**
		 * Handle pointer move event
		 */
		pointerMove(e) {
			if (!this.isTouch) {
				e.preventDefault()
			}
			// delegate logic to another function
			this.calcPointerPosition(e)
		},
		/**
		 * Handle pointer up event
		 */
		pointerUp() {
			this.isDragging = false
		},
		/**
		 * Get pointer position
		 */
		calcPointerPosition(e) {
			if (!this.isDragging) {
				return
			}
			// isTouch? gets handled in pointerDown func
			const eventData = this.isTouch ? e.touches[0] : e
			const { pageY } = eventData

			this.pointerDragOffset = pageY - this.pointerOrigin
			this.pointerPosition =
				this.contentPreviousPosition + this.pointerDragOffset
		},
		/**
		 * Initiate tracking animation loop (used for momentum)
		 */
		initTracking() {
			this.isTracking = true

			// cancel out possible previous tracking
			cancelAnimationFrame(this.rafID)

			this.rafID = requestAnimationFrame(() => this.track())
		},
		/**
		 * Recursive animation loop (used for momentum)
		 */
		track() {
			if (!this.isTracking) {
				return
			}
			if (!this.isMoving) {
				this.isTracking = false
			}

			// contentPos == 0 equals animation stop
			if (!this.isDragging && this.contentPosition == 0) {
				this.isTracking = false
			}

			this.updatePosition()
			this.rafID = requestAnimationFrame(() => this.track())
		},
		/**
		 * Calculate drag force used for momentum
		 */
		calcForce() {
			if (!this.isDragging) {
				return
			}
			const dragVelocity = this.pointerPosition - this.contentPosition
			this.applyForce(dragVelocity - this.velocity)
		},
		/**
		 * Apply drag force to current velocity
		 */
		applyForce(force) {
			this.velocity += force
		},
		/**
		 * Update position for DOM
		 */
		updatePosition() {
			this.calcForce()
			// add target bias
			const browserTarget = -this.target + window.innerHeight / 2

			// Calculate target force, enables the bounce effect when focusing bias
			const targetDiff = this.contentPosition - browserTarget
			const targetForce = Math.min(Math.abs(targetDiff) * 0.1, this.bias)

			if (this.targetInViewport) {
				this.applyForce(
					this.contentPosition < browserTarget
						? targetForce
						: -targetForce
				)
			}

			// change friction when focusing bias
			const inverseFriction = this.targetInViewport
				? this.bias > 0
					? 0.8
					: 1 - this.friction
				: 1 - this.friction

			this.velocity *= inverseFriction
			this.contentPosition += this.velocity

			// prevent scrolling out of bounds
			// dirty workaround because vue route messes up the refs
			const contentHeight = this.$refs.container
				? -this.$refs.container.clientHeight + window.innerHeight
				: 9999

			this.contentPosition = Math.max(
				Math.min(this.contentPosition, 0),
				contentHeight
			)
		},
		/**
		 * Hanlde Intersection Observer
		 */
		handleObserve(entry) {
			// this.velocity = 0
			this.targetInViewport = entry[0].isIntersecting
		}
	},
	computed: {
		/**
		 * Check if pointer is dragging or content is tracking
		 */
		isMoving() {
			return this.isDragging || Math.abs(this.velocity) >= 0.02
		}
	},
	mounted() {
		this.observer.observe(this.$refs.bias)
	},
	created() {
		// mouse
		window.addEventListener('mousedown', this.pointerDown)
		window.addEventListener('mousemove', this.pointerMove)
		window.addEventListener('mouseup', this.pointerUp)
		// touch
		window.addEventListener('touchstart', this.pointerDown, false)
		window.addEventListener('touchmove', this.pointerMove, false)
		window.addEventListener('touchend', this.pointerUp, false)

		// observer
		this.observer = new IntersectionObserver(this.handleObserve, {
			root: null,
			threshold: 0
		})
	},
	beforeDestroy() {
		// mouse
		window.removeEventListener('mousedown', this.pointerDown)
		window.removeEventListener('mousemove', this.pointerMove)
		window.removeEventListener('mouseup', this.pointerUp)
		// touch
		window.removeEventListener('touchstart', this.pointerDown)
		window.removeEventListener('touchmove', this.pointerMove)
		window.removeEventListener('touchend', this.pointerUp)
	}
}
</script>

<style lang="scss" scoped>
.container {
	touch-action: none;
}

.biased {
	height: 260px;
	border: 2px solid transparent;
	transition: all 0.5s;
	transition-delay: 0.2s;

	&--visible {
		//background: var(--content-marked);
		border: 2px solid var(--content-marked-border);
	}
}
</style>

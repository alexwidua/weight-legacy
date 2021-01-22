<template>
	<div class="container" :style="`transform:translateY(${contentPosition}px`">
		<div class="intro">
			'Gravity' will pull this feed back to its origin.
		</div>
		<ContentList />
	</div>
</template>

<script>
import ContentList from '../ContentList/ContentList.vue'

export default {
	components: {
		ContentList
	},
	data() {
		return {
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
			//friction: 0.05 => prop

			// animation frame
			rafID: null
			//
		}
	},
	props: {
		friction: {
			type: Number,
			default: 0.05
		},
		useMomentum: {
			type: Boolean,
			default: true
		},
		gravity: {
			type: Number,
			default: 0.002
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
			if (!this.isDragging && this.useMomentum) {
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
			// add 'gravity' so that content bounces back to top
			this.applyForce(2 * (this.contentPosition * -this.gravity))

			const inverseFriction = 1 - this.friction
			this.velocity *= inverseFriction
			this.contentPosition += this.velocity

			// prevent scrolling out of bounds
			this.contentPosition = Math.min(this.contentPosition, 0)
		}
	},
	computed: {
		// check if pointer is dragging or content is tracking
		isMoving() {
			return this.isDragging || this.contentPosition < 0
		}
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
	padding-top: 2px;
	touch-action: none;
}
</style>

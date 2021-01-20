<template>
	<div
		class="scroll-wrapper"
		:style="`transform:translateY(${contentPosition}px`"
	>
		<ContentList />
	</div>
</template>

<script>
import ContentList from './ContentList/ContentList.vue'

export default {
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
		}
	},
	methods: {
		// pointer event handlers
		pointerDown(e) {
			this.isDragging = true

			// check if mouse or touch event
			this.isTouch = !!(e.touches && e.touches[0])
			const eventData = this.isTouch ? e.touches[0] : e
			const { pageY } = eventData
			if (!this.isTouch) {
				e.preventDefault()
			}
			// where scrollin starts
			this.pointerOrigin = pageY
			// pick up previous content contentPosition
			this.contentPreviousPosition = this.contentPosition
			this.calcPointerPosition(e)
			// init tracking/momentum
			this.initTracking()
		},
		pointerMove(e) {
			if (!this.isTouch) {
				e.preventDefault()
			}
			// delegate logic to another function
			this.calcPointerPosition(e)
		},
		pointerUp() {
			this.isDragging = false
		},
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
		// init tracking/momentum
		initTracking() {
			this.isTracking = true
			// cancel out possible previous tracking
			cancelAnimationFrame(this.rafID)
			this.rafID = requestAnimationFrame(() => this.track())
		},
		// recursive animation loop for momentum
		track() {
			if (!this.isTracking) {
				return
			}
			if (!this.isMoving) {
				this.isTracking = false
			}
			this.updatePosition()
			this.rafID = requestAnimationFrame(() => this.track())
		},
		// physics
		calcForce() {
			if (!this.isDragging && this.useMomentum) {
				return
			}
			const dragVelocity = this.pointerPosition - this.contentPosition
			this.calcVelocity(dragVelocity - this.velocity)
		},
		calcVelocity(force) {
			this.velocity += force
		},
		// update DOM content position
		updatePosition() {
			this.calcForce()
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
			return this.isDragging || Math.abs(this.velocity) >= 0.05
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
	},
	components: {
		ContentList
	}
}
</script>

<style scoped>
.scroll-wrapper {
	touch-action: none;
	max-width: 600px;
	margin: 0 auto;
}
</style>

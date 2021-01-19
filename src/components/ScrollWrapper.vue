<template>
	<div class="wrappy" :style="`transform:translateY(${position}px`">
		<ContentList />
	</div>
</template>

<script>
import ContentList from './ContentList/ContentList.vue'

export default {
	data() {
		return {
			// TODO: Sort data
			position: 0,
			dragOrigin: 0,
			dragOffset: 0,
			dragPosition: 0,
			dragStartPosition: 0,
			// checkers
			isDragging: false,
			isRunning: false,
			isTouch: false,
			rafID: null,
			// physics
			velocity: 0,
			friction: 0.05
		}
	},
	components: {
		ContentList
	},
	methods: {
		pointerdown(e) {
			if (!this.isTouch) {
				e.preventDefault()
			}

			this.isDragging = true

			// Check if mouse or touch event
			this.isTouch = !!(e.touches && e.touches[0])

			const eventData = this.isTouch ? e.touches[0] : e
			const { pageY } = eventData

			this.dragOrigin = pageY
			this.dragStartPosition = this.position

			// cancel out possible previous momentum
			this.setDragPosition(e)

			// start animation loop
			this.startDragMomentum()
		},
		pointermove(e) {
			if (!this.isTouch) {
				e.preventDefault()
			}
			// delegate logic to another function
			this.setDragPosition(e)
		},
		pointerup() {
			this.isDragging = false
		},
		setDragPosition(e) {
			if (!this.isDragging) {
				return
			}
			const eventData = this.isTouch ? e.touches[0] : e
			const { pageY } = eventData

			this.dragOffset = pageY - this.dragOrigin
			this.dragPosition = this.dragStartPosition + this.dragOffset
		},
		// drag momentum start
		startDragMomentum() {
			this.isRunning = true
			cancelAnimationFrame(this.rafID)
			this.rafID = requestAnimationFrame(() => this.useDragMomentum())
		},
		// recursive momentum func
		useDragMomentum() {
			if (!this.isRunning) {
				return
			}
			if (!this.isMoving()) {
				this.isRunning = false
			}
			this.updatePosition()
			this.rafID = requestAnimationFrame(() => this.useDragMomentum())
		},
		updatePosition() {
			this.calcDragForce()

			const inverseFriction = 1 - this.friction
			this.velocity *= inverseFriction
			this.position += this.velocity
		},
		// physics
		calcDragForce() {
			if (!this.isDragging) {
				return
			}
			const dragVelocity = this.dragPosition - this.position

			this.applyForce(dragVelocity - this.velocity)
		},
		applyForce(force) {
			this.velocity += force
		},
		// checkers
		isMoving() {
			return this.isDragging || Math.abs(this.velocity) >= 0.05
		}
	},
	created() {
		// mouse
		window.addEventListener('mousedown', this.pointerdown),
			window.addEventListener('mousemove', this.pointermove),
			window.addEventListener('mouseup', this.pointerup),
			// touch
			window.addEventListener('touchstart', this.pointerdown, false),
			window.addEventListener('touchmove', this.pointermove, false),
			window.addEventListener('touchend', this.pointerup, false)
	},
	beforeDestroy() {
		// mouse
		window.removeEventListener('mousedown', this.pointerdown),
			window.removeEventListener('mousemove', this.pointermove),
			window.removeEventListener('mouseup', this.pointerup),
			// touch
			window.removeEventListener('touchstart', this.pointerdown),
			window.removeEventListener('touchmove', this.pointermove),
			window.removeEventListener('touchend', this.pointerup)
	}
}
</script>

<style scoped>
.wrappy {
	touch-action: none;
}
</style>

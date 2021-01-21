<template>
	<div
		class="container"
		:style="`transform:translateY(${contentPosition}px`"
		ref="container"
	>
		<div v-for="i in 6" :key="i + 'x'" class="item item--unbiased">
			<h2>Unbiased item</h2>
			<p>I'm an unbiased item with no gravity to it.</p>
		</div>
		<div class="item item--biased" ref="bias">
			<h2>Biased item</h2>
			<p>I'm an biased item.</p>
		</div>
		<div v-for="i in 6" :key="i + 'y'" class="item item--unbiased">
			<h2>Unbiased item</h2>
			<p>I'm an unbiased item with no gravity to it.</p>
		</div>
	</div>
</template>

<script>
//import ContentList from '../ContentList/ContentList.vue'

export default {
	components: {
		//ContentList
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
			rafID: null,

			// misc
			targetInViewport: false,
			//targetRange: { min: 2100, max: 2400 },
			target: 2300
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
			// add target bias
			const browserTarget = -this.target + window.innerHeight / 2

			// Calculate target force, enables the bounce effect when focusing bias
			const targetDiff = this.contentPosition - browserTarget
			const targetForce = Math.min(Math.abs(targetDiff) * 0.1, 5)

			if (this.targetInViewport) {
				this.applyForce(
					this.contentPosition < browserTarget
						? targetForce
						: -targetForce
				)
			}

			// change friction when focusing bias
			const inverseFriction = this.targetInViewport
				? 0.8
				: 1 - this.friction

			this.velocity *= inverseFriction
			this.contentPosition += this.velocity

			// prevent scrolling out of bounds
			// prevent scrolling out of bounds
			const contentHeight =
				-this.$refs.container.clientHeight + window.innerHeight
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
		// check if pointer is dragging or content is tracking
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

.item {
	height: 350px;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	//align-items: center;
	padding: 2em;
	border: 1px solid #000;

	& h2 {
		font-size: 2em;
		padding-bottom: 0.5em;
	}

	& p {
		font-size: 1.5em;
		line-height: 1.25;
		color: #5e5e5e;
	}

	&--biased {
		background: rgb(255, 193, 193);
	}

	&--unbiased {
		background: #eee;
	}
}
</style>

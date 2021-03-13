<template>
	<div>
		<div class="consumption">
			<span
				class="paper"
				:style="
					`transform: translateX(${paperPosX[i - 1]}vw) translateY(${
						paperPosY[i - 1]
					}vw) rotate(${paperRot[i - 1]}deg)`
				"
				v-for="i in paperNum"
				:key="i"
				>📰</span
			>
		</div>
		<div
			class="container"
			:style="`transform:translateY(${contentPosition}px`"
		>
			<div class="hint">
				🗑️ Consuming the feed will 'clog it up' over time.
			</div>

			<ContentList />
		</div>
		<transition name="slide-fade">
			<div
				v-if="paperNum > 15"
				@click="clearPaper()"
				class="control"
				v-html="`🧹 clear clog`"
			/>
		</transition>
	</div>
</template>

<script>
import ContentList from '../ContentList/ContentList.vue'

export default {
	components: {
		ContentList
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
		friction: 0.1,

		// animation frame
		rafID: null,

		// paper num and map
		paperNum: 0,
		paperPosX: [],
		paperPosY: [],
		paperRot: []
	}),
	props: {
		// friction: {
		// 	type: Number,
		// 	default: 0.05
		// },
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
			const inverseFriction = 1 - this.friction
			this.velocity *= inverseFriction
			this.contentPosition += this.velocity
			// prevent scrolling out of bounds

			this.contentPosition = Math.min(this.contentPosition, 0)
		},
		/**
		 * Clear paper emojis and reset friction
		 */
		clearPaper() {
			this.friction = 0.01
			this.paperNum = 0
			this.paperPosX = []
			this.paperPosY = []
			this.paperRot = []
		}
	},
	computed: {
		/**
		 * Check if DOM content still has momentum
		 */
		isMoving() {
			return this.isDragging || Math.abs(this.velocity) >= 0.05
		},
		/**
		 * Create steps for friction increase
		 */
		calcFriction() {
			return Math.floor(Math.abs(this.contentPosition / 1250))
		},
		/**
		 * Create (smaller) steps for paper num increase
		 */
		calcPaperNum() {
			return Math.floor(Math.abs(this.contentPosition / 350))
		}
	},
	watch: {
		calcFriction() {
			if (this.friction < 1) {
				this.friction += 0.1
			}
		},
		calcPaperNum() {
			this.paperRot.push(Math.floor(Math.random() * 100 - 50))
			this.paperPosX.push(Math.floor(Math.random() * 100))
			this.paperPosY.push(Math.floor(Math.random() * 20 - 10)) // 48px div height
			this.paperNum += 1
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
	touch-action: none;
}

.consumption {
	position: fixed;
	top: var(--nav-height);
	left: 50%;
	z-index: 10;
	width: 100%;
	max-width: var(--content-width);
	height: 100%;
	overflow: hidden;
	transform: translateX(-50%);
	pointer-events: none;
}

.paper {
	position: absolute;
	font-size: 4em;
}

@media (min-width: 992px) {
	.paper {
		font-size: 12em;
	}
}
</style>

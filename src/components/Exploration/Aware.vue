<template>
	<div>
		<div class="hint">
			📰 Certain parts of the articles are emphasized through change of
			weight/friction.
		</div>
		<div
			class="container"
			:style="`transform:translateY(${contentPosition}px`"
			ref="container"
		>
			<div class="inner">
				<h1>Content-aware scrolling</h1>

				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					Donec consequat accumsan justo. Vestibulum mollis enim diam,
					ac sagittis purus fermentum sed. Donec non sagittis mi.
					Praesent tempor sed lacus quis pretium. Suspendisse pulvinar
					laoreet consectetur. Phasellus eu velit non nulla varius
					aliquet quis molestie enim. Lorem ipsum dolor sit amet,
					consectetur adipiscing elit. Nunc elementum sodales elit,
					dictum commodo nibh volutpat at. Donec euismod in magna
					vitae finibus. Nulla in porta massa, vitae tincidunt lorem.
				</p>
				<p>
					Mauris ut mollis eros. Pellentesque feugiat sapien in
					sagittis condimentum. Donec mauris tellus, porta a orci non,
					rutrum ornare enim. Mauris molestie risus quis viverra
					finibus. Aliquam fringilla ac arcu at interdum. Donec
					tincidunt vestibulum libero vel efficitur. Quisque augue
					lorem, vulputate ut lorem at, pellentesque efficitur est.
					Duis vitae orci augue. Donec in quam nec lorem tristique
					lobortis vitae id sapien. Duis ipsum metus, finibus ac dolor
					nec, sodales feugiat quam.
				</p>
				<p>
					Donec sit amet aliquam mi, sit amet iaculis orci. Vivamus
					consequat tellus elit, id rhoncus tellus scelerisque sed.
					Vivamus purus libero, congue sed ligula non, consequat
					euismod arcu. In sit amet suscipit dolor. Nulla sagittis
					orci porta dui placerat, eget elementum urna maximus. Etiam
					a turpis a magna commodo viverra sed nec libero. Duis sit
					amet mauris tempor, varius libero vel, elementum lacus.
				</p>
				<p>
					Praesent vitae lacus massa. Nullam convallis ut magna vitae
					accumsan. Cras elementum purus sit amet scelerisque ornare.
					Pellentesque bibendum enim eu felis pulvinar varius.
					Phasellus vehicula lorem in blandit porta. Sed vulputate
					sapien et magna scelerisque elementum. Sed mattis
					pellentesque nisi eget ullamcorper. Suspendisse mauris
					tortor, imperdiet eu nunc a, convallis pulvinar diam. Nunc
					quis fringilla est, in varius augue.
				</p>
				<p>
					Curabitur pretium velit leo, eu ultricies tortor tincidunt
					nec. Donec non dignissim odio. Quisque pellentesque viverra
					nunc ut vehicula. Mauris magna odio, vehicula nec gravida
					quis, sodales sed elit. Praesent justo massa, sollicitudin
					sed vehicula in, ultrices ac enim. Donec commodo ullamcorper
					dignissim. Ut auctor tortor tortor, sit amet auctor massa
					congue in. Donec sit amet congue nunc, ut tristique elit.
					Nullam interdum placerat neque et semper. Etiam luctus est
					dui. Morbi faucibus mi sit amet tincidunt tincidunt.
					Pellentesque euismod luctus rutrum. Vivamus pharetra ut mi
					ac facilisis. Donec sit amet facilisis sapien. Nulla rhoncus
					lobortis mauris vel accumsan. Vestibulum laoreet dignissim
					justo in faucibus.
				</p>
				<p>
					<mark :class="{ marked: inViewport }" ref="mark1"
						>This is a content highlight. When this section scrolls
						into view, the friction gets increased. This could
						either be leveraged by the site itself, or by the
						browser itself to shift the attention to important bits
						of the text. </mark
					><br />
					Etiam sem metus, placerat vitae scelerisque ut, rhoncus ut
					metus. Integer elementum enim at imperdiet aliquam. In
					venenatis, orci non posuere sollicitudin, lectus ex volutpat
					nunc, nec hendrerit nunc orci vel tortor. Aenean tincidunt
					pulvinar aliquet.
				</p>
				<p>
					Suspendisse ac faucibus tortor. Curabitur imperdiet at
					turpis at facilisis. Interdum et malesuada fames ac ante
					ipsum primis in faucibus. Integer eget tortor et tellus
					sagittis accumsan at ac lectus. Praesent nec sem volutpat,
					aliquet ante vitae, auctor urna. Phasellus consectetur in
					leo tristique ullamcorper. Etiam ornare pretium lorem a
					porttitor. Aliquam fermentum hendrerit diam, rhoncus
					pellentesque tellus ornare quis. Quisque id lacus turpis.
					Suspendisse vel hendrerit ipsum. Proin sollicitudin nibh
					dui, et ornare lacus sollicitudin non. Aliquam maximus quam
					dui, ac cursus sem pharetra ac.
				</p>
				<p>
					Mauris ut mollis eros. Pellentesque feugiat sapien in
					sagittis condimentum. Donec mauris tellus, porta a orci non,
					rutrum ornare enim. Mauris molestie risus quis viverra
					finibus. Aliquam fringilla ac arcu at interdum. Donec
					tincidunt vestibulum libero vel efficitur. Quisque augue
					lorem, vulputate ut lorem at, pellentesque efficitur est.
					Duis vitae orci augue. Donec in quam nec lorem tristique
					lobortis vitae id sapien. Duis ipsum metus, finibus ac dolor
					nec, sodales feugiat quam.
				</p>
				<p>
					Donec sit amet aliquam mi, sit amet iaculis orci. Vivamus
					consequat tellus elit, id rhoncus tellus scelerisque sed.
					Vivamus purus libero, congue sed ligula non, consequat
					euismod arcu. In sit amet suscipit dolor. Nulla sagittis
					orci porta dui placerat, eget elementum urna maximus. Etiam
					a turpis a magna commodo viverra sed nec libero. Duis sit
					amet mauris tempor, varius libero vel, elementum lacus.
				</p>
				<p>
					Praesent vitae lacus massa. Nullam convallis ut magna vitae
					accumsan. Cras elementum purus sit amet scelerisque ornare.
					Pellentesque bibendum enim eu felis pulvinar varius.
					Phasellus vehicula lorem in blandit porta. Sed vulputate
					sapien et magna scelerisque elementum. Sed mattis
					pellentesque nisi eget ullamcorper. Suspendisse mauris
					tortor, imperdiet eu nunc a, convallis pulvinar diam. Nunc
					quis fringilla est, in varius augue.
				</p>
				<p>
					Nullam in nisi bibendum diam gravida molestie. Integer
					pellentesque, nisl tincidunt feugiat maximus, neque purus
					aliquam nisl, vitae tincidunt velit purus eget diam. Etiam
					mattis blandit nibh, ac vestibulum velit interdum eget.
					Vivamus volutpat gravida leo a convallis. In hac habitasse
					platea dictumst. Curabitur sed semper ligula. Donec sit amet
					ipsum ante. Nunc velit nisi, varius nec sodales eu, blandit
					quis nunc. Vestibulum mollis justo in pharetra sodales.
					Etiam mattis luctus vehicula. Nullam luctus scelerisque dui,
					ac tincidunt massa dictum ut. Duis varius accumsan ultrices.
					Integer at viverra turpis, a semper nunc. Sed lorem metus,
					ultricies nec nisl eget, consectetur consequat sem.
				</p>
				<p>
					<mark :class="{ marked: inViewport }" ref="mark2"
						>This is a content highlight. When this section scrolls
						into view, the friction gets increased. This could
						either be leveraged by the site itself, or by the
						browser itself to shift the attention to important bits
						of the text. </mark
					><br />
					Maecenas ultrices nulla mauris, at pellentesque mi accumsan
					eget. Suspendisse potenti. Mauris in tincidunt est. Nullam
					maximus, sapien eget eleifend elementum, nisi tellus
					bibendum velit, vel scelerisque magna arcu sed lorem. Etiam
					magna leo, pellentesque viverra ipsum ut, tristique viverra
					eros. Morbi ex ante, laoreet ac urna eget, tristique
					consequat justo. Vivamus id tincidunt orci. Praesent ut nisl
					vehicula, placerat metus a, tincidunt risus. Aliquam et ex
					leo. Nullam erat sem, tempus sit amet diam ut, posuere
					posuere erat. Curabitur laoreet urna ultrices posuere
					feugiat. In hac habitasse platea dictumst. Mauris neque
					massa, feugiat et dapibus at, convallis aliquam dui. Mauris
					eu neque a tortor commodo faucibus. Integer in sapien a erat
					placerat molestie.
				</p>
				<p>
					Pellentesque habitant morbi tristique senectus et netus et
					malesuada fames ac turpis egestas. Praesent facilisis dui et
					erat accumsan, eget suscipit purus molestie. Vestibulum sit
					amet feugiat justo. Vestibulum sollicitudin metus quis augue
					vestibulum elementum. Sed eget libero ac elit posuere
					pretium sit amet nec dolor. Nullam placerat nibh vitae
					vehicula molestie. Etiam suscipit tortor quis elit blandit
					sollicitudin. Phasellus auctor sollicitudin lectus nec
					congue. Nam ac augue dui. Donec id tempus odio, nec aliquam
					velit. Aliquam venenatis odio dolor, eu maximus neque luctus
					pulvinar. Vestibulum ante ipsum primis in faucibus orci
					luctus et ultrices posuere cubilia curae; In lorem orci,
					consectetur quis massa a, gravida pellentesque libero. Ut ut
					sodales mi. Morbi arcu sapien, imperdiet ac convallis nec,
					tristique vitae urna. Vivamus vitae lacus a erat lacinia
					maximus.
				</p>
			</div>
		</div>
	</div>
</template>

<script>
//import ContentList from '../ContentList/ContentList.vue'

export default {
	components: {
		//ContentList
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
		//friction: 0.05 => prop

		// animation frame
		rafID: null,

		// misc
		observer: null,
		inViewport: false
	}),
	props: {
		friction: {
			type: Number,
			default: 0.3
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
			const inverseFriction = this.inViewport ? this.friction : 0.95
			//const inverseFriction = 0.95
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
			//this.velocity = 0
			this.inViewport = entry[0].isIntersecting
		}
	},
	computed: {
		/**
		 * Check if pointer is dragging or content is tracking
		 */
		isMoving() {
			return this.isDragging || Math.abs(this.velocity) >= 0.05
		}
	},
	mounted() {
		this.observer.observe(this.$refs.mark1)
		this.observer.observe(this.$refs.mark2)
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
			threshold: 1
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
	padding: 8px;
	background: var(--app-bg);
	touch-action: none;

	& .hint {
		width: 75%;
		margin: 0 auto;
		padding: 0px 4px 8px 4px;
	}

	& .inner {
		padding: 24px;
		background: var(--content-bg);
	}

	& h1 {
		padding: 0px 0 24px 0;
		font-weight: 700;
		font-size: 2em;
		font-family: 'Noto Serif';
		line-height: 1.2;
		letter-spacing: -0.03em;
	}

	& p {
		padding-bottom: 2em;
		color: var(--content-text);
		font-size: 1.15em;
		font-family: 'Noto Serif';
		line-height: 1.5;
	}

	& .banner {
		color: #8dd2c8;
		background: #f2fbfa;
	}
}

mark {
	color: var(--content-text);
	background-color: var(--content-bg);
	transition: all 0.5s;
}
.marked {
	color: #000;
	background-color: var(--content-marked);
}

@media (min-width: 992px) {
	.container {
		& p {
			padding-bottom: 2em;
			color: var(--content-text);
			font-size: 1.25em;
			font-family: 'Noto Serif';
			line-height: 1.45;
		}
	}
}
</style>

<template>
	<div class="intro">
		<div class="nav">
			<router-link class="cta" to="/01-weight"
				>Go to explorations 👉</router-link
			>
		</div>
		<div class="inner">
			<transition name="icon-fade" mode="out-in">
				<div
					class="icon"
					:key="index"
					@click="index < 2 ? (index += 1) : (index = 0)"
					v-html="iconMap[index]"
				/>
			</transition>
			<p>
				How much does a digital screen weigh? <br />
				And can the weight of a creen be modified?<br />
				<br />
				This exploration explores this question and investigates whether
				screens have a perceived weight and how this weight can affect
				the user experience.
			</p>
			<div class="desktop-hint">
				<div v-html="`⚠️`" />
				<div>
					<em>You seem to be on a laptop or desktop.</em><br /><br />
					This experiment was designed for drag-to-scroll interactions
					on a smartphone and it's most effective when experienced
					through a smartphone.<br />
					It kinda works with a mouse input but is a bad experience
					with a trackpad.
				</div>
			</div>

			<p class="footnotes">
				<a href="https://github.com/alexwidua/weight">Source @ GitHub</a
				><br />
			</p>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src

export default {
	name: 'Main',
	data: () => ({
		index: 0,
		iconMap: ['⚖️', '🏋️‍♀️', '🏋️‍♂️']
	})
}
</script>

<style lang="scss" scoped>
.nav {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	width: 100%;
	max-width: 750px;
	height: 48px;
	background: #000;
	border-bottom: 1px solid var(--nav-border);

	& .cta {
		display: block;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: auto;
		height: 100%;
		padding: 4px 24px;
		color: #fff;
		text-decoration: none;
		background: #000;
		border-left: 1px solid var(--nav-border);
	}
}

.intro {
	width: 100%;
	max-width: var(--content-width);
	height: 100vh;
	margin-top: calc(var(--nav-height) * -1);
	color: #fff;
	font-family: 'Roboto Mono', monospace;
	background: #000;

	& .inner {
		display: flex;
		flex-direction: column;
		width: 75%;
		margin: 0 auto;
		padding: 64px 16px 16px 16px;

		& .desktop-hint {
			display: none;
			margin: 24px 0 48px 0;
			padding: 24px;
			color: rgba(0, 0, 0, 0.8);
			font-size: 1.15rem;
			font-family: 'Inter';
			line-height: 1.25em;
			letter-spacing: -0.02em;
			background: var(--color-yellow);

			& div:first-child {
				margin-right: 16px;
			}

			& em {
				font-weight: 600;
			}
		}
	}

	& p {
		padding-bottom: 16px;
		line-height: 1.5;
	}

	a {
		color: #fff;
	}

	& .icon {
		margin-bottom: 64px;
		font-size: 4em;
		text-align: center;
		cursor: default;
		user-select: none;
	}

	.footnotes {
		line-height: 1.5;
		opacity: 0.5;
	}
}

@media (min-width: 992px) {
	.intro .inner .desktop-hint {
		display: flex;
	}
}
</style>

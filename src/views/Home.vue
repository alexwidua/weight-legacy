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
				This is a small exploration into (perceived) weight and friction
				in the context of digital screens.
			</p>
			<p>
				It was created as part of the 'Form' course at Umeå Institute of
				Design.
			</p>

			<p class="footnotes">
				<a href="#" style="text-decoration: line-through;"
					>Documentation (TODO)</a
				><br />
				<a href="https://github.com/alexwidua/weight">Source</a><br />
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

.nav {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	width: 100%;
	max-width: 750px;
	height: 48px;
	//padding: 0 8px;
	background: #000;
	border-bottom: 1px solid #1d1d1d;

	& .cta {
		display: block;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: auto;
		height: 100%;
		//margin: 32px auto;
		padding: 4px 24px;
		color: #fff;
		text-decoration: none;
		background: #000;
		border-left: 1px solid #1d1d1d;
		//border-radius: 32px;
	}
}
</style>

<template>
	<div class="kickoff">
		<div class="inner">
			<div class="icon" v-html="`⚖️`" />
			<p>
				This is a small exploration into (perceived) weight in the
				context of digital screens.
			</p>
			<p>
				It was created as part of the 'Form' course at Umeå Institute of
				Design.
			</p>
			<router-link class="cta" to="/01-weight"
				>Go to exploration 👉</router-link
			>
			<p class="footnotes">
				<a href="#">Documentation (TODO)</a><br />
				<a href="#">Source (TODO)</a><br />
			</p>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src

export default {
	name: 'Main'
}
</script>

<style lang="scss" scoped>
.kickoff {
	display: flex;
	align-items: flex-start;
	justify-content: center;
	width: 100%;
	max-width: var(--content-width);
	height: 100vh;
	padding: 64px 16px 16px 16px;
	font-family: 'Roboto Mono', monospace;

	& p {
		padding-bottom: 16px;
	}

	a {
		color: var(--content-heading);
	}

	& .inner {
		width: 75%;
		//margin: 0 auto;
	}
	& .icon {
		margin-bottom: 64px;
		font-size: 4em;
		text-align: center;
	}

	& .cta {
		display: block;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 64px;
		margin: 32px auto;
		padding: 4px 8px;
		color: var(--content-heading);
		text-decoration: none;
		background: #fff;
		border-radius: 32px;
	}

	.footnotes {
		line-height: 1.5;
		opacity: 0.5;
	}
}
</style>

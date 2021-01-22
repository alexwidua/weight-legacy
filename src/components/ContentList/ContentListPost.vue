<template>
	<div class="post">
		<h2>{{ post.headline }}</h2>
		<p>
			<span>{{ post.content }}</span>
		</p>
		<a>Read more</a>
	</div>
</template>
<script>
export default {
	props: {
		post: Object
	}
}
</script>
<style lang="scss" scoped>
.post {
	margin: 8px;
	padding: 24px;
	background: var(--content-bg);

	& h2 {
		display: inline-block;
		//padding: 0 0 16px 0;
		margin-bottom: 16px;
		//color: var(--content-heading);
		color: var(--content-placeholder-heading);
		font-weight: 600;
		font-size: 1.15em;
		font-family: 'Inter', monospace;
		line-height: 1.3;
		background: var(--content-placeholder-heading);
		//letter-spacing: -0.03em;
	}

	& p {
		//display: inline;
		padding-bottom: 1em;
		//color: var(--content-text);
		color: var(--content-placeholder);
		font-size: 1em;
		line-height: 1.8;
		//background: var(--content-placeholder);

		& span {
			padding: 1px;
			background-color: var(--content-placeholder);
			box-shadow: 0.2em 0 0 var(--content-placeholder),
				-0.2em 0 0 var(--content-placeholder);
		}
	}

	& a {
		color: var(--content-link);
		font-weight: 600;
		font-size: 0.9em;
		letter-spacing: 0.03em;
		text-transform: uppercase;
	}
}
</style>

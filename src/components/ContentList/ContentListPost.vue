<template>
	<div class="post">
		<h2>{{ post.headline }}</h2>
		<p>{{ post.content }}...</p>
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
	background: #fff;
	padding: 1.5em;

	& h2 {
		color: #000;
		font-size: 1.3em;
		padding: 0.5em 0 1em 0;
		font-weight: 600;
	}

	& p {
		color: #888;
		padding-bottom: 1em;
		line-height: 1.25;
	}
}

.post:not(:last-child) {
	border-bottom: 1px solid #ddd;
}

.post a {
	color: blue;
}
</style>

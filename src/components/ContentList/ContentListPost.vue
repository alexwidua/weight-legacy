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
<style scoped>
.post {
	background: #fff;
	padding: 1.5em;
}

.post:not(:last-child) {
	border-bottom: 1px solid #ddd;
}

.post a {
	color: blue;
}

.post h2 {
	color: #000;
	font-size: 1.3em;
	padding-bottom: 0.25rem;
}

.post p {
	color: #888;
}
</style>

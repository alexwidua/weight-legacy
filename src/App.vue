<template>
	<div id="app">
		<router-view />
	</div>
</template>

<style>
body {
	overflow: hidden;
	background: #000;
}
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #fff;
}

#nav {
	padding: 30px;
}

#nav a {
	font-weight: bold;
	color: rgb(141, 141, 141);
}

#nav a.router-link-exact-active {
	color: #ffffff;
}
</style>

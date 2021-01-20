var names = [
	'Clickbaity headline',
	'Made-up sob story',
	'Shady advertisement',
	'Dishonest product placement'
]

const fetchPosts = (number) => {
	let content = []

	for (var i = 0; i < number; i++) {
		content.push({
			headline: names[i % names.length],
			content:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet luctus enim, id vestibulum quam. Proin aliquet bibendum nisl sit amet posuere. Maecenas eget neque a quam eleifend vulputate. Sed eros metus, porttitor eu feugiat in, feugiat vitae arcu.'
		})
	}

	return content
}

export default fetchPosts

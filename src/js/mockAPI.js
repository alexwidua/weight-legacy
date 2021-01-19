var names = ['Lorem', 'Ipsum', 'Dolor', 'Sit']

const fetchPosts = (number) => {
	let content = []

	for (var i = 0; i < number; i++) {
		content.push({
			headline: names[i % names.length],
			content:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.'
		})
	}

	return content
}

export default fetchPosts

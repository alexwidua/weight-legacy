var headlines = [
	'Clickbaity headline 😱',
	'Made-up sob story 😭',
	'Shady advertisement 👽',
	'Dishonest product placement 🤙'
]

let contents = [
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
	'Lorem consectetur adipiscing elit. Aenean sit amet luctus enim.',
	'Lorem ipsum dolor sit amet, consectetur.',
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet luctus enim, id vestibulum quam.'
]

const fetchPosts = (number) => {
	let content = []

	for (let i = Math.floor(Math.random() * 4); i < number; i++) {
		content.push({
			headline: headlines[i % headlines.length],
			content: contents[i % contents.length]
		})
	}

	return content
}

export default fetchPosts

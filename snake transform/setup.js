$(document).one(':storyready', () => {
	const check = setInterval(() => {
		if (V.transformationParts) {
			checkSnakeTransform();
			clearInterval(check);
		}
	}, 100);
});

function checkSnakeTransform() {
	if (!V.transformationParts.snake) {
		console.log('the snake tranformation is setup');
		V.transformationParts.snake = {
			ears    : 'disabled',
			bottom  : 'disabled',
			bottom1 : 'disabled'
		};
		V.snakebuild = 0;
		V.snake = 0;
	}
}

$(document).on(':passageinit',({ passage }) => {
	console.log('log from passageinit',passage);
	if (passage.title !== 'Start') checkSnakeTransform();
});

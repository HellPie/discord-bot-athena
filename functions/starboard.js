exports.starGradient = (stars) => {
	// A post's max single emotes is 26, that will be our 100% gradient
	// Start off with 0xFFF8E1 (Amber 50) and grow p to 0xFFC107 (Amber 500)
	// RGB: (255, 248, 225) => (255, 193, 7), done via linear interpolation:
	// X = X1 * p + X2 * ( 1 - p ) where p is the current number

	let p = stars / 26;
	if(p > 1) p = 1;

	const r = 255;
	const g = Math.floor(193 * p + 248 * (1 - p));
	const b = Math.floor(7 * p + 225 * (1 - p));
	return (r << 16) + (g << 8) + b;
};

exports.starEmoji = (stars) => {
	// We only show one icon per message, so depending on the message we use
	// different star emojis to represent how many stars the post has

	if(stars <= 8) return "⭐";
	else if(stars <= 13) return "🌟";
	else if(stars <= 21) return "✨";
	else if(stars <= 34) return "💫";
	else return "🌌";
};

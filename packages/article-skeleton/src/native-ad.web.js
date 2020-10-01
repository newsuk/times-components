const insertNativeAd = (children) => {
	const child = children.find(item => item.name === 'paywall');
	
  if (!child) {
    return children;
  }

	const clonedChildren = [...children];
	const paywallChildren = child.children;
	
	let paraCount = 0;
	let index = null;

	// Counts the number of paragraphs and returns the index
	paywallChildren.map((item, i) => {
		if (item.name === 'paragraph') {
			paraCount += 1;
			if (paraCount === 7) index = i;
		}
	});

	// if nativeAd does not exist then place in the paragraph index number
	const nativeAd = paywallChildren.find(item => item.name === 'nativeAd');
	if (!nativeAd && index !== null) {
		paywallChildren.splice(index + 1, 0,
			{
				name: "nativeAd",
				children: []
			}
		);
	}

	return clonedChildren;
};

export default insertNativeAd;

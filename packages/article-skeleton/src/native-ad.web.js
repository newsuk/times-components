const insertNativeAd = (children) => {
	const child = children.find(item => item.name === 'paywall');

	if (child) {
		const clonedChildren = [...children];
		const paywallChildren = child.children;

		const paraPosition = child.children.findIndex((item, i) => { 
			if (item.name === 'paragraph' && i >= 7) return i;
		});

		paywallChildren.splice(paraPosition + 1, 0,
			{
				name: "nativeAd",
				children: []
			}
		);

		return clonedChildren;
	}
};

export default insertNativeAd;

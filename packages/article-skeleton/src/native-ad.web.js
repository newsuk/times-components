const insertNativeAd = (children) => {
	const clonedChildren = [...children];
	const child = clonedChildren.find(item => item.name === 'paywall');
  if (!child) {
    return clonedChildren;
	}
	
	const paywallChildren = child.children;
	const paragraphItems = paywallChildren.map((item, index) => ({...item, index})).filter(item => item.name === 'paragraph');
	const indexToAdd = paragraphItems[6] ? paragraphItems[6].index : null;
	
	// with the !native check in if statement it only renders once
	const nativeAd = paywallChildren.find(item => item.name === 'nativeAd');

	if (indexToAdd && indexToAdd !== null) {
		paywallChildren.splice(indexToAdd + 1, 0,
			{
				name: "nativeAd",
				children: []
			}
		);
	}
	
	return clonedChildren;

};

export default insertNativeAd;
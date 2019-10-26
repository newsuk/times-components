import memoize from "memoize-one";

// Handle the case where journalists put everything in one paragraph
const splitHuge = paragraph => {
  const children = paragraph.children.reduceRight((acc, node) => {
    const next = acc[0];
    if (next && next.name === "break" && node.name === "break") {
      const text = acc.slice(1).filter(n => n.name !== "paragraph");
      return [
        {
          name: "paragraph",
          attributes: {},
          children: text
        },
        ...acc.slice(text.length + 1)
      ];
    }
    return [node, ...acc];
  }, []);
  const wasSplit = children.filter(n => n.name === "paragraph").length > 0;
  if (wasSplit) {
    const text = children.filter(n => n.name !== "paragraph");
    return [
      {
        name: "paragraph",
        attributes: {},
        children: text
      },
      ...children.slice(text.length)
    ];
  }
  return [paragraph];
};

const split = content =>
  [].concat(
    ...content.map(node => {
      if (node.name === "paragraph") {
        return splitHuge(node);
      }
      return [node];
    })
  );

// Collapse inlines into the following paragraphs on tablet
const collapsed = (isTablet, content) =>
  !isTablet
    ? content
    : content.reduceRight((acc, node) => {
        // backwards
        if (
          (node.name === "image" && node.attributes.display === "inline") ||
          node.name === "pullQuote"
        ) {
          // forwards
          let i;
          let children = [node];
          for (i = 0; i < acc.length; i += 1) {
            const next = acc[i];
            if (next && next.name === "paragraph") {
              children = [
                ...children,
                ...next.children,
                { name: "break", children: [] },
                { name: "break", children: [] }
              ];
            } else {
              break;
            }
          }
          return [
            {
              ...acc[0],
              children
            },
            ...acc.slice(i)
          ];
        }
        return [node, ...acc];
      }, []);

export default memoize((isTablet, content) =>
  collapsed(isTablet, split(content))
);

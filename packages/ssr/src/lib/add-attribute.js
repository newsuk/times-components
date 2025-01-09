module.exports.addAttribute = article => ({
  ...article,
  content: [
    ...article.content,
    {
      name: "paywall-ssr",
      children: [
        {
          name: "text",
          children: [],
          attributes: {
            value: "lalalala"
          }
        }
      ],
      attributes: {
        href:
          "https://www.awin1.com/cread.php?awinmid=12430&awinaffid=240415&clickref=times-austria-travel-guide-040722&ued=https%3A%2F%2Fwww.tiqets.com%2Fen%2Fbelvedere-palace-tickets-l145892%2F"
      }
    }
  ],
  ssrAttr: "new-ssr-attr"
});

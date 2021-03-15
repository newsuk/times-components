export const content = [
  {
    children: [
      {
        attributes: { value: "Some paragraph 1" },
        children: [],
        name: "text"
      }
    ],
    name: "paragraph"
  },
  {
    children: [
      {
        attributes: { value: "Some paragraph 2" },
        children: [],
        name: "text"
      }
    ],
    name: "paragraph"
  },
  {
    children: [
      {
        attributes: { value: "Some paragraph 3" },
        children: [],
        name: "text"
      }
    ],
    name: "paragraph"
  }
];

export const paywallContent = {
  name: "paywall",
  children: [
    {
      children: [
        {
          attributes: { value: "Some paragraph 4" },
          children: [],
          name: "text"
        }
      ],
      name: "paragraph"
    },
    {
      children: [
        {
          attributes: { value: "Some paragraph 5" },
          children: [],
          name: "text"
        }
      ],
      name: "paragraph"
    }
  ]
};

export const paywallContentWithNewsletter = {
  name: "paywall",
  children: [
    {
      children: [
        {
          attributes: { value: "Some paragraph 4" },
          children: [],
          name: "text"
        }
      ],
      name: "paragraph"
    },
    {
      name: "interactive",
      attributes: {
        element: {
          value: "newsletter-puff",
          attributes: {
            label: "In your inbox",
            code: "TNL-101",
            headline: "Best of Times",
            copy:
              "We’ll send you our top stories, across all sections, straight to your inbox. Simple as that.",
            imageUri:
              "https://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F728c3e68-5311-4533-809a-b313a6503789.jpg?resize=800"
          }
        }
      },
      children: []
    },
    {
      children: [
        {
          attributes: { value: "Some paragraph 5" },
          children: [],
          name: "text"
        }
      ],
      name: "paragraph"
    }
  ]
};

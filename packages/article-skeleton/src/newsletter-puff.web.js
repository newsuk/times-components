const setNewsletterPayload = attributes => ({
  name: "interactive",
  attributes: {
    element: {
      value: "newsletter-puff",
      attributes: {
        label: "In your inbox",
        ...attributes
      }
    }
  },
  children: []
});

const newslettersBySection = [
  {
    section: "news",
    payload: setNewsletterPayload({
      code: "TNL-101",
      headline: "Best of Times",
      copy:
        "We’ll send you our top stories, across all sections, straight to your inbox. Simple as that.",
      imageUri:
        "https%3A%2F%2Fwww.thetimes.co.uk%2Fimageserver%2Fimage%2Fmethode%252Ftimes%252Fprod%252Fweb%252Fbin%252F728c3e68-5311-4533-809a-b313a6503789.jpg%3Fresize%3D800"
    })
  },
  {
    section: "comment",
    payload: setNewsletterPayload({
      code: "TNL-104",
      headline: "Comment and Opinion",
      copy:
        "Wit and wisdom from our award-winning stable of columnists and guest writers, including Caitlin Moran, Matthew Parris, Rod Liddle and Dominic Lawson.",
      imageUri:
        "https%3A%2F%2Fwww.thetimes.co.uk%2Fimageserver%2Fimage%2Fmethode%252Ftimes%252Fprod%252Fweb%252Fbin%252Fb49851bd-b182-43fc-bd5d-1816bcda19fe.jpg%3Fresize%3D800"
    })
  },
  {
    section: "business",
    payload: setNewsletterPayload({
      code: "TNL-103",
      headline: "Business briefing",
      copy:
        "In-depth analysis and comment on the latest financial and economic news from our award-winning Business teams.",
      imageUri:
        "https%3A%2F%2Fwww.thetimes.co.uk%2Fimageserver%2Fimage%2Fmethode%252Ftimes%252Fprod%252Fweb%252Fbin%252F306637af-2b6f-48fc-b264-d661b2067818.jpg%3Fresize%3D800"
    })
  },
  {
    section: "sport",
    payload: setNewsletterPayload({
      code: "TNL-112",
      headline: "Sport",
      copy:
        "Every Friday morning, Elgan Alderman takes you through the best of sport from the past week and looks ahead to the weekend, featuring exclusive interviews, agenda-setting comment and razor-sharp analysis.",
      imageUri:
        "https%3A%2F%2Fwww.thetimes.co.uk%2Fimageserver%2Fimage%2Fmethode%252Ftimes%252Fprod%252Fweb%252Fbin%252F8920eef8-e084-47db-a1bf-00be3d72080e.jpg%3Fresize%3D800"
    })
  },
  {
    section: "scotland",
    payload: setNewsletterPayload({
      code: "TNL-134",
      headline: "Editor’s Choice – Scotland",
      copy:
        "The biggest stories of the week from The Times and The Sunday Times Scotland, delivered directly to you every Saturday morning.",
      imageUri:
        "https%3A%2F%2Fwww.thetimes.co.uk%2Fimageserver%2Fimage%2Fmethode%252Ftimes%252Fprod%252Fweb%252Fbin%252F5777acf9-363f-4aa3-8176-1ea09cdae7d6.jpg%3Fresize%3D800"
    })
  }
];

const getNewsletterPuff = section => {
  const newsletter = newslettersBySection.find(
    item => item.section === section.toLowerCase()
  );
  return newsletter ? newsletter.payload : undefined;
};

const newsletterPuffExists = children =>
  children.find(
    item =>
      item.name === "interactive" &&
      item.attributes.element.value === "newsletter-puff"
  );

const insertPaywall = (paywall, insertBefore, newsletterPuff) => ({
  ...paywall,
  children: paywall.children.reduce(
    (acc, item, index) =>
      index === insertBefore ? [...acc, newsletterPuff, item] : [...acc, item],
    []
  )
});

const insertNewsletterPuff = (section, children, flag) => {
  if (!flag) return children;

  const newsletterPuff = getNewsletterPuff(section);
  if (!newsletterPuff) return children;

  const paywall = children.find(item => item.name === "paywall");
  if (!paywall) return children;

  if (
    newsletterPuffExists(children) ||
    newsletterPuffExists(paywall.children)
  ) {
    return children;
  }

  const insertIndex = 3;

  return children.reduce((acc, item, index) => {
    if (index === insertIndex) return [...acc, newsletterPuff, item];

    if (item.name === "paywall")
      return [...acc, insertPaywall(item, insertIndex - index, newsletterPuff)];

    return [...acc, item];
  }, []);
};

export default insertNewsletterPuff;

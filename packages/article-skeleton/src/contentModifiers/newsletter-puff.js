import { getIsLiveOrBreakingFlag } from "../data-helper";

const setNewsletterPayload = attributes => ({
  name: "autoNewsletterPuff",
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
      headline: "Daily Briefing",
      copy:
        "Our flagship newsletter featuring our top stories and analysis, delivered every morning.",
      imageUri:
        "https://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F728c3e68-5311-4533-809a-b313a6503789.jpg?resize=800"
    })
  },
  {
    section: "business",
    payload: setNewsletterPayload({
      code: "TNL-103",
      headline: "Business briefing",
      copy:
        "Morning and midday updates on financial and economic news from our award-winning business team.",
      imageUri:
        "https://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F306637af-2b6f-48fc-b264-d661b2067818.jpg?resize=800"
    })
  },
  {
    section: "scotland",
    payload: setNewsletterPayload({
      code: "TNL-134",
      headline: "Editor’s Choice – Scotland",
      copy:
        "The biggest stories from The Times and Sunday Times Scotland, every Saturday.",
      imageUri:
        "https://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F5777acf9-363f-4aa3-8176-1ea09cdae7d6.jpg?resize=800"
    })
  },
  {
    section: "money",
    payload: setNewsletterPayload({
      code: "TNL-107",
      headline: "Money newsletter",
      copy:
        "Personal finance and investment news from our money experts, every Monday.",
      imageUri:
        "https://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2Ffd44b15f-2fb8-4e5d-b409-315648b10646.jpg?resize=800"
    })
  },
  {
    section: "law",
    payload: setNewsletterPayload({
      code: "TNL-121",
      headline: "The Brief",
      copy:
        "Get expert analysis, news and commentary in The Brief, our legal editor's insider's guide, every Thursday.",
      imageUri:
        "https://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F27a231b4-5658-4852-a603-37c5210a946e.jpg?resize=800"
    })
  },
  {
    section: "home",
    payload: setNewsletterPayload({
      code: "TNL-113",
      headline: "Property newsletter",
      copy:
        "Inside Britain's most exclusive homes, expert advice and what's really happening in the property market, every Monday.",
      imageUri:
        "https://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F42a688ec-f9ba-4684-90ce-17a9d1c19d8a.jpg?resize=800"
    })
  },
  {
    section: "luxury",
    payload: setNewsletterPayload({
      code: "TNL-148",
      headline: "Luxury newsletter",
      copy:
        "Do you need more luxury in your life? Sign up to the Times Luxury newsletter with one click.",
      imageUri:
        "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fcbd3c7a9-4d25-422a-b4a5-a48072778002.jpg?crop=1990%2C1322%2C0%2C0&resize=800"
    })
  },
  {
    section: "bricks & mortar",
    payload: setNewsletterPayload({
      code: "TNL-113",
      headline: "Property newsletter",
      copy:
        "Get expert advice and find out what's really happening in the property market.",
      imageUri:
        "https://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F42a688ec-f9ba-4684-90ce-17a9d1c19d8a.jpg?resize=800"
    })
  },
  {
    section: "ireland",
    payload: setNewsletterPayload({
      code: "TNL-152",
      headline: "Best of Times Ireland newsletter:",
      copy:
        "The most compelling Irish news, business, sport and lifestyle stories from the week, every Sunday."
    })
  },
  {
    section: "irish sport",
    payload: setNewsletterPayload({
      code: "TNL-152",
      headline: "Best of Times Ireland newsletter:",
      copy:
        "The most compelling Irish news, business, sport and lifestyle stories from the week, every Sunday."
    })
  }
];

const getNewsletterPuff = section => {
  const newsletter = section
    ? newslettersBySection.find(item => item.section === section.toLowerCase())
    : undefined;
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

const consecutiveParagraphs = children => {
  const index = children.findIndex(item => item.name !== "paragraph");
  return index === -1 ? children.length : index;
};

const checkParagraphs = (children, paywall) => {
  const paywallIndex = children.findIndex(item => item.name === "paywall");
  const paragraphs = consecutiveParagraphs(children);
  const paywallParagraphs = consecutiveParagraphs(paywall.children);

  if (paragraphs >= 5) {
    return true;
  }

  if (paywallIndex !== paragraphs) {
    return false;
  }

  return paragraphs + paywallParagraphs >= 5;
};

const insertNewsletterPuff = (section, isPreview, flags) => children => {
  if (isPreview || getIsLiveOrBreakingFlag(flags)) return children;

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

  if (!checkParagraphs(children, paywall)) {
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

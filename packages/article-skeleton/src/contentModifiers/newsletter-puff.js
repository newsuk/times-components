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
      code: "TNL-101"
    })
  },
  {
    section: "business",
    payload: setNewsletterPayload({
      code: "TNL-103"
    })
  },
  {
    section: "scotland",
    payload: setNewsletterPayload({
      code: "TNL-134"
    })
  },
  {
    section: "money",
    payload: setNewsletterPayload({
      code: "TNL-107"
    })
  },
  {
    section: "law",
    payload: setNewsletterPayload({
      code: "TNL-121"
    })
  },
  {
    section: "home",
    payload: setNewsletterPayload({
      code: "TNL-113"
    })
  },
  {
    section: "luxury",
    payload: setNewsletterPayload({
      code: "TNL-148"
    })
  },
  {
    section: "bricks & mortar",
    payload: setNewsletterPayload({
      code: "TNL-113"
    })
  },
  {
    section: "ireland",
    payload: setNewsletterPayload({
      code: "TNL-152"
    })
  },
  {
    section: "irish sport",
    payload: setNewsletterPayload({
      code: "TNL-152"
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

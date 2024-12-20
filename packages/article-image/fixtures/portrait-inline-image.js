const defaultImageSrc =
  "https://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fdb30ed6a-be62-11e7-b58a-4186f6049f2e.jpg?crop=384%2C576%2C0%2C0";
const defaultCaption =
  "President Kennedy’s death in 1963 has spawned countless conspiracy theories";
const defaultTitle = "The title";
const defaultCredits = "Bettmann";

export default (
  uri = defaultImageSrc,
  caption = defaultCaption,
  title = defaultTitle,
  credits = defaultCredits
) => ({
  captionOptions: {
    caption,
    title,
    credits
  },
  imageOptions: {
    display: "inline",
    ratio: "1:1.50",
    uri
  }
});

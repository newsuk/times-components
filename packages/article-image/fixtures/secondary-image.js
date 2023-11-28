const defaultImageSrc =
  "https://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F4476fabc-be54-11e7-b58a-4186f6049f2e.jpg?crop=5760%2C3840%2C0%2C0";
const defaultCaption =
  "Sebastian Schwarz, Glyndbourne’s general director, took issue with the BBC";
const defaultCredits = "Times photographer Richard Pohle";

export default (
  uri = defaultImageSrc,
  caption = defaultCaption,
  credits = defaultCredits
) => ({
  captionOptions: {
    caption,
    credits
  },
  imageOptions: {
    display: "secondary",
    ratio: "3:2",
    uri
  }
});

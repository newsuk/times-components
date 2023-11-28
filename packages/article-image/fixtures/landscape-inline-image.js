const defaultImageSrc =
  "https://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F3ac674bc-beb2-11e7-8bb9-94e1372175c0.jpg?crop=5576%2C3717%2C0%2C0";
const defaultCaption = "All the latest stories in culture and books.";
const defaultCredits = "Times photographer Jack Hill";

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
    display: "inline",
    ratio: "3:2",
    uri
  }
});

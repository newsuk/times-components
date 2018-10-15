const defaultImageSrc =
  "https://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F7bfd3356-be8c-11e7-8bb9-94e1372175c0.jpg?crop=1500%2C1200%2C0%2C0";
const defaultCaption =
  "From the spreadsheet: 1 Sir Michael Fallon, Admitted placing hand on knee of journalist 15 years ago. 2 Jake Berry, announced he had a baby with a Tory aide after an amicable divorce from his wife. 3 Amber Rudd, had a relationship with Kwasi Kwarteng, who is now an aide to the chancellor. 4 Liam Fox, had to resign over breach of ministerial code after suggestions that his position had benefited his friend Adam Werritty. No allegations were of a sexual nature. 5 Stephen Crabb, sent explicit messages to young women while married. 6 Mark Garnier, admitted asking his secretary to buy sex toys. 7 Liz Truss, had affair with Tory MP Mark Field";
const defaultCredits = "The credits";

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
    display: "primary",
    ratio: "15:12",
    uri
  }
});

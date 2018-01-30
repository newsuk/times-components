import { action } from "@storybook/addon-actions";

export default {
  headline: "Deal or no deal: the UK's Brexit options",
  label: "Interactive",
  sectionName: "News",
  text: [
    {
      name: "paragraph",
      attributes: {},
      children: [
        {
          name: "text",
          attributes: {
            value:
              "From a comprehensive partnership to an agreed ‘no deal’, there are various eventualities for Britain’s exit from the European Union"
          },
          children: []
        }
      ]
    }
  ],
  image: {
    uri:
      "https://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F17e35a72-0472-11e8-8e80-008642e5faa1.jpg?crop=3561%2C2003%2C0%2C185"
  },
  link: "https://www.thetimes.co.uk",
  imageRatio: 16 / 9,
  imageSize: 360,
  onPress: action("onPress")
};

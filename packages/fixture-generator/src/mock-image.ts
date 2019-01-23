import { Crop, Image } from "./types";
import UUID from "./mock-UUID";

interface TimesImage extends Image {
  crop169: Crop | null;
}

class MockImage {
  image: TimesImage;

  constructor() {
    this.image = {
      id: UUID(),
      crops: [],
      crop: {
        ratio: "16:9",
        url:
          "//www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fd3abdbfc-1776-11e6-b4ba-d249b128bacc.jpg?crop=620%2C348%2C0%2C32"
      },
      crop169: {
        ratio: "16:9",
        url:
          "//www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fd3abdbfc-1776-11e6-b4ba-d249b128bacc.jpg?crop=620%2C348%2C0%2C32"
      },
      title: "Rise of centenarian drivers as elderly push on"
    };
  }

  get() {
    return this.image;
  }
}

export default MockImage;

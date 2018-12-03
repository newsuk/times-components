import { Image, Media } from "./types";
import UUID from "./mock-UUID";

class MockImage {
  image: Image;

  constructor() {
    this.image = {
      id: UUID(),
      crops: [],
      crop: {
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

import { Crop, Image } from "./types";
import UUID from "./mock-UUID";

interface TimesImage extends Image {
  crop11: Crop | null;
  crop169: Crop | null;
  crop32: Crop | null;
  crop45: Crop | null;
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
      crop11: {
        ratio: "1:1",
        url:
          "//www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F5af6925e-2599-11e9-b782-40e94f317da5.jpg?crop=1000%2C1000%2C250%2C0"
      },
      crop169: {
        ratio: "16:9",
        url:
          "//www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fd3abdbfc-1776-11e6-b4ba-d249b128bacc.jpg?crop=620%2C348%2C0%2C32"
      },
      crop32: {
        ratio: "3:2",
        url:
          "//thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fe68da1ac-25af-11e9-8d35-0e32f390087a.jpg?crop=1225%2C817%2C1299%2C107"
      },
      crop45: {
        ratio: "4:5",
        url:
          "//thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fe68da1ac-25af-11e9-8d35-0e32f390087a.jpg?crop=654%2C817%2C1585%2C107"
      },
      title: "Rise of centenarian drivers as elderly push on"
    };
  }

  get() {
    return this.image;
  }
}

export default MockImage;

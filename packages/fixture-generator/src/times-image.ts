import { Crop, Image } from "./types";

interface TimesImage extends Image {
  crop11: Crop | null;
  crop169: Crop | null;
  crop23: Crop | null;
  crop32: Crop | null;
  crop45: Crop | null;
}

export default TimesImage;

import { TextStyle } from "../Markup";
import Positioned from "../Layout/Positioned";

export default class TextSpan extends Positioned {
  style = new TextStyle();

  text = "";

  href = undefined;
}

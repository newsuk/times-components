import Character from "../Text/Character";

export default class MarkupString {
  text = "";

  constructor(text) {
    this.text = text || "";
  }

  characters(textStyle) {
    return this.text
      .split("")
      .map(c => new Character(c, textStyle));
  }
}

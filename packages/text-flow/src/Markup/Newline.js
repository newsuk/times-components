import Character from "../Text/Character";

export default class Newline {
  newline = "\n";

  characters(textStyle) {
    return [new Character(this.newline, textStyle)];
  }
}

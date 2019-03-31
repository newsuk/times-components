import Character from "../Text/Character";

export default class Newline {
  characters(textStyle) {
    return [new Character("\n", textStyle)]
  }
}
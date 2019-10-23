import { LayoutItem, TexItem } from 'tex-linebreak';

export default class PositionedItem {
  public text: TexItem;
  public position: LayoutItem;

  constructor(text: TexItem, position: LayoutItem) {
    this.text = text;
    this.position = position;
  }
}

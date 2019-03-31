import Markup from "./Markup";

export default class LinkText extends Markup {
  href = null

  characters(textStyle) {
    return this.children
      .reduce((acc, child) => [
        ...acc,
        ...child.characters(textStyle).map(c => {
          c.href = this.href
          return c
        })
      ], []);
  }
}
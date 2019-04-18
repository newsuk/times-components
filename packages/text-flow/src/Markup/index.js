import Bold from './Bold';
import Italic from './Italic';
import Link from './Link';
import MarkupString from './String';

export { default as Bold } from "./Bold";
export { default as Italic } from "./Italic";
export { default as MarkupString } from "./String";
export { default as Link } from "./Link";
export { default as Styled } from "./Styled";
export { default as TextStyle } from "./TextStyle";
export { default as Newline } from "./Newline";

export default ({ boldFont, italicFont, linkFont }) => ({
    Body: MarkupString,
    Bold: Bold(boldFont),
    Italic: Italic(italicFont),
    Link: Link(linkFont),
  })
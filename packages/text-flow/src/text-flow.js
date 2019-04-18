import { Block, BlockAlign, InlineBlock, TextFlow } from "./Layout";
import { Align, Case, Text as TextBox, FontLoader } from "./Text";
import { Bold, Italic, MarkupString, Link, Styled, TextStyle, Newline} from './Markup'

export const Layout = { Block, BlockAlign, InlineBlock, TextFlow };
export const Text = { Align, Case, FontLoader, Text: TextBox };
export const Markup = { Bold, Italic, Link, MarkupString, Newline, Styled, TextStyle };

export { default as MarkupFactory } from './Markup';

import { TextStyle } from 'react-native';
import { TypographySettings } from './AttributedString'
import FontStorage from './FontStorage'

export const getTextHeight = (text: string, settings: TypographySettings) => {
  const font = FontStorage.getFont(settings)
  const path = font.getPath(text, 0, 0, settings.fontSize)
  const { y1, y2 } = path.getBoundingBox()
  return { y1, y2 }
}

interface BoundedTextProps {
  text: string;
  children: Function;
  style: TextStyle
}

export const MeasuredText = ({ children, style, text }: BoundedTextProps) => {
  const { y1, y2 } = getTextHeight(text, (style as TypographySettings))
  return children({ top: -y1, bottom: y2 })
}
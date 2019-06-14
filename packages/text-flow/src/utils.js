/* eslint-disable import/prefer-default-export */
import Text from "./Text/Text";

export const measureText = (value, font, size, scale) => {
    const text = new Text({
        font,
        lineHeight: size,
        markup: [value],
        size
    })
    return {
        height: text.measuredHeight * scale,
        width: text.measuredWidth * scale,
        characters: text.characters.map(char => ({
            width: char.getWidth() * scale,
            height: char.measuredHeight * scale
        }))
    }
}
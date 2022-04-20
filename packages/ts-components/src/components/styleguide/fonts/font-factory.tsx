import * as styleguide from '../styleguide';
//import  fonts  from './fonts'

console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ');
console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ');
console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ');
console.log(styleguide);
//console.log(Animations);
console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ');
console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ');
console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ');

export const timesFontFactory = (scale: any) => ({
  font,
  fontSize
}: {
  font: any;
  fontSize: any;
}) => {
  //const styles = styleguide({ scale });
console.log(scale,   font,
  fontSize)
  return {
    // @ts-ignore
    // fontFamily: styles.fonts[font],
    // fontSize: styles.fontSizes[fontSize],
    // lineHeight: styles.lineHeight({ font, fontSize })
  };
};

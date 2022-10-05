import styled from 'styled-components';

import {
  breakpoints,
  colours,
  fonts,
  fontSizes,
  spacing
} from '@times-components/ts-styleguide';

const View = styled.div`
  align-items: stretch;
  box-sizing: border-box;
  display: flex;
  flex-basis: auto;
  flex-direction: column;
  flex-shrink: 0;
  margin: 0;
  min-height: 0;
  min-width: 0;
  padding: 0;
  position: relative;
  z-index: 0;
`;

const Text = styled.div`
  border: 0 solid black;
  box-sizing: border-box;
  color: rgba(0, 0, 0, 1);
  display: inline;
  font: 14px system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Ubuntu, 'Helvetica Neue', sans-serif;
  margin: 0;
  padding: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
`;

export const Overlay = styled.div`
position: fixed;
width: 100%;
height: 100%;
top: 0;
left: 0;
right: 0;
bottom: 0;
background-color: rgba(255, 255, 255, 0.9);
z-index: 1;
`;

export const Bubble = styled.div`
animation: expand .75s ease-in-out infinite;
border-radius: 20px;
display: inline-block;
transform-origin: center center;
margin: 0 7px;
width: 16px;
height: 16px;

background: #C4C4C4;

:nth-child(1) {

}

:nth-child(2) {
  animation-delay: 250ms;

}

:nth-child(3) {
  animation-delay: 500ms;

}

@keyframes expand {

  100% {
    background: #6B6B6B;
  }


}
`;

export const Loader = styled.div`
position: absolute;
top: 50%;
left: 50%;
`;



export const InpContainer = styled(View)<{sectionColour?: string}>`
border-top: 2px solid  ${({ sectionColour}) =>
sectionColour ? colours.section[sectionColour] : 'black'};
  display: flex;
  flex-direction: column;
  margin-right: ${spacing(2)};
  margin-bottom: ${spacing(4)};
  margin-left: ${spacing(2)};


  @media (min-width: ${breakpoints.medium}px) {
    flex-direction: row;
    margin: 0 auto ${spacing(4)};
    width: 80.8%;
  }
  @media (min-width: ${breakpoints.wide}px) {
    width: 56.2%;
  }
`;

export const InpSubscribedContainer = styled(View)`
  justify-content: center;
  padding: ${spacing(9)}px ${spacing(8)}px;
  @media (min-width: ${breakpoints.small}px) {
    padding: ${spacing(0)} ${spacing(1)};
    flex: 1;
  }
`;

export const InpSubscribedHeadline = styled(Text)`
  color: ${colours.functional.brandColour};
  font-family: ${fonts.headline};
  text-align: center;
  font-size: ${fontSizes.newsletterPuffHeadline}px;
  text-decoration: none;
  margin-bottom: ${spacing(2)};
`;

export const InpSignupContainer = styled(View)`
  justify-content: center;
  padding: 16px;
  @media (min-width: ${breakpoints.small}px) {
    padding: ${spacing(0)} ${spacing(4)};
    flex: 1;
  }
`;

export const InpSignupLabel = styled(Text)`
  font-family: ${fonts.supporting};
  font-size: ${fontSizes.newsletterPuffLabel}px;
  letter-spacing: 1px;
  color: ${colours.functional.brandColour};
  text-align: center;
  text-transform: uppercase;
  margin-bottom: ${spacing(1)};
`;

export const InpSignupHeadline = styled(Text)`
  color: ${colours.functional.brandColour};
  font-family: ${fonts.headline};
  text-align: center;
  font-size: 18px;
  text-decoration: none;
  margin-bottom: ${spacing(1)};
`;

export const InpCopy = styled(Text)`
  font-family: ${fonts.body};
  font-size: 18px;
  text-align: left;
  letter-spacing: -0.4px;
  color: ${colours.functional.primary};
  margin-bottom: ${spacing(3)};
`;

export const InpSignupCTAContainer = styled(View)`
  @media (min-width: ${breakpoints.medium}px) {
    width: 220px;
    margin: 0px auto;
  }
`;

export const InpPreferencesContainer = styled(View)`
  flex-direction: row;
  justify-content: center;
`;

export const InpPreferencesText = styled(Text)`
  color: ${colours.functional.action};
`;

export const InpIconContainer = styled(View)`
  padding-left: 8px;
  margin: auto;
`;

export const InpPreferencesView = styled(View)`
  display: flex;
  flex-direction: row;
`;

export const buttonStyles = {
  alignItems: 'center',
  backgroundColor: 'transparent',
  borderColor: colours.functional.brandColour,
  borderStyle: 'thin',
  borderWidth: 1,
  color: colours.functional.brandColour,
  elevation: 0,
  fontFamily: fonts.supporting,
  height: 48,
  justifyContent: 'center',
  letterSpacing: 0.2,
  width: '100%'
};

export const textStyle = {
  color: colours.functional.brandColour
};

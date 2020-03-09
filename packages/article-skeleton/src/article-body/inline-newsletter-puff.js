import React from "react";
import { Platform} from 'react-native';

import Image from '@times-components/image';
import InteractiveWrapper from "@times-components/interactive-wrapper";
import { IconForwardArrow } from "@times-components/icons";
import Link from "@times-components/link";
import {InpContainer,InpImageContainer,InpTextEditor,  InpLabel, InpHeadline, InpDetails, SignupContainer, Signup, SignupText, PreferencesContainer, PreferencesText, IconContainer} from '../styles/inline-newsletter-puff';
import { colours } from "@times-components/styleguide";


function onSignUpClick() {
  if (Platform.OS !== "web") {
    InteractiveWrapper.openURLInBrowser("https://home.thetimes.co.uk/myNews")
  }
}

const InlineNewsletterPuff = () => {
  const isSubscribed = false;
  return (
        <InpContainer>
            <InpImageContainer>
              <Image aspectRatio={1.42} uri="https://nuk-tnl-deck-prod-static.s3-eu-west-1.amazonaws.com/uploads/2aa9050e6c3d4de682f11a4802ebba96.jpg" />
            </InpImageContainer>

            <InpTextEditor>
                <InpLabel>STRAIGHT IN YOUR INBOX</InpLabel>
                <InpHeadline>Politics. Explained.</InpHeadline>
                <InpDetails>Sign up to receive our brilliant Red Box newsletter, Matt Chorley`s poke at politics delivered every weekday morning at 8am.</InpDetails>
                  {!isSubscribed ? 
                  <SignupContainer>
                    <Link url="https://home.thetimes.co.uk/myNews" onPress={onSignUpClick}>
                      <Signup>
                        <SignupText>Sign up to newsletter</SignupText>
                      </Signup>
                    </Link>
                  </SignupContainer> :
                  <PreferencesContainer>
                        <PreferencesText>Manage preferences here
                          <IconContainer>
                            <IconForwardArrow fillColour={colours.functional.action}
                            />
                          </IconContainer>
                      </PreferencesText>
                    </PreferencesContainer> }
            </InpTextEditor>
        </InpContainer>
    )}

export default InlineNewsletterPuff;

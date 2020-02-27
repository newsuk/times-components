import React, { Component } from "react";
import {View, Text, Platform} from 'react-native';

import {InpContainer,InpImageContainer,InpTextEditor,  InpLabel, InpHeadline, InpDetails, TagContainer, Atag, Linktext} from '../styles/inline-newsletter-puff';
import Image from '@times-components/image';
import InteractiveWrapper from "@times-components/interactive-wrapper";
import { IconForwardArrow } from "@times-components/icons";
import Link from "@times-components/link";

function onSignUpClick() {
  if (Platform.OS !== "web") {
    InteractiveWrapper.openURLInBrowser("https://home.thetimes.co.uk/myNews")
  }
}

const InlineNewsletterPuff = (props) => {

    return (
        <InpContainer>
            <InpImageContainer>
              <Image aspectRatio={1.42} uri="https://nuk-tnl-deck-prod-static.s3-eu-west-1.amazonaws.com/uploads/2aa9050e6c3d4de682f11a4802ebba96.jpg" />
            </InpImageContainer>

            <InpTextEditor>
                <InpLabel>STRAIGHT IN YOUR INBOX</InpLabel>
                <InpHeadline>Politics. Explained.</InpHeadline>
                <InpDetails>Sign up to receive our brilliant Red Box newsletter, Matt Chorley's poke at politics delivered every weekday morning at 8am.</InpDetails>
                <TagContainer>
                  <Link url="https://home.thetimes.co.uk/myNews" onPress={onSignUpClick}>
                    <Atag>
                      <Linktext>Sign up to newsletter</Linktext>
                    </Atag>
                  </Link>
                </TagContainer>
                <View style={{
                  flexDirection: "row",
                  justifyContent: "center"}}>
                      <Text style={{color: "#006699"}}>Manage preferences here</Text>
                      <View style={{
                        paddingLeft: 8,
                        paddingTop: 2}}>
                        <IconForwardArrow fillColour={"#006699"} />
                      </View>
                    </View>
            </InpTextEditor>
        </InpContainer>
    )
}

export {InlineNewsletterPuff};

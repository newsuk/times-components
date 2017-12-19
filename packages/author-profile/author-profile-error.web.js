import React from "react";
import { Text, View, Button } from "react-native";
import PropTypes from "prop-types";
import Image from "@times-components/image";
import withResponsiveStyles from "@times-components/responsive-styles";

const ErrorContainer = withResponsiveStyles(View, {
  base: () => `
    flex: 1;
    justify-content: space-between;
    flex-direction: column-reverse;
    padding-top: 10%;
    padding-left: 10%;
    padding-right: 10%;
  `,
  mediumUp: () => `
    padding-left: 15%;
    padding-right: 15%;
  `,
  wideUp: () => `
    flex-direction: row;
  `
});

const Heading = withResponsiveStyles(Text, {
  base: () => `
    font-family: TimesModern-Bold;
    font-size: 35px;
    text-align: center;
    color: #000000;
    margin-bottom: 12px;
  `,
  wideUp: () => `
    text-align: left;
  `
});

const Message = withResponsiveStyles(Text, {
  base: () => `
    font-family: TimesDigitalW04-Regular;
    font-size: 18px;
    line-height: 1.44;
    text-align: center;
    color: #696969;
  `,
  wideUp: () => `
    text-align: left;
  `
});

const ButtonContainer = withResponsiveStyles(View, {
  base: () => `
    align-self: center;
    padding-top: 40px;
    max-width: 300px;
    width: 100%;
    padding-bottom: 10px;
  `,
  mediumUp: () => `
    width: 200px;
    margin-bottom: 10%;
  `
});

const ImageContainer = withResponsiveStyles(View, {
  base: () => `
    max-width: 75%;
    width: 100%;
    flex-basis: 50% !important;
    align-self: center;
  `,
  mediumUp: () => `
    max-width: 428px;
  `,
  wideUp: () => `
    max-width: none;
  `
});

const MessagingContainer = withResponsiveStyles(View, {
  base: () => `
    margin-top: 10%;
    flex-basis: 50%;
    max-width: 548px;
    align-self: center;
  `,
  wideUp: () => `
    align-self: auto;
    max-width: 365px;
  `
});

const AuthorProfileError = ({ refetch }) => (
  <ErrorContainer>
    <MessagingContainer>
      <Heading>Something&apos;s gone wrong</Heading>
      <Message>
        We can&apos;t load the page you have requested. Please check your network
        connection and retry to continue
      </Message>
      <ButtonContainer>
        <Button
          onPress={refetch}
          title="Retry"
          color="#006699"
          accessibilityLabel="Refresh the page"
        />
      </ButtonContainer>
    </MessagingContainer>
    <ImageContainer>
      <Image
        uri="https://www.thetimes.co.uk/d/img/internal-error-c45d0e8347.png"
        aspectRatio={0.9090909090909091}
      />
    </ImageContainer>
  </ErrorContainer>
);

AuthorProfileError.propTypes = {
  refetch: PropTypes.func.isRequired
};

export default AuthorProfileError;

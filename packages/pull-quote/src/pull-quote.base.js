import React from "react";
import { Text, View } from "react-native";
import { InlineElement, FlowText } from "@times-components/text-flow";
import { screenWidth } from "@times-components/utils";
import { ResponsiveContext } from "@times-components/responsive";
import Context from "@times-components/context";
import PullQuoteContent from "./pull-quote-content";
import PullQuoteTwitterLink from "./pull-quote-twitter-link";
import { propTypes, defaultProps } from "./pull-quote-prop-types";
import styleFactory from "./styles";
import quoteStyleFactory from "./styles/quotes";

const PullQuotes = ({
  caption,
  markup,
  font,
  onTwitterLinkPress,
  quoteColour,
  renderedChildren,
  text,
  localRender,
  twitter,
  isTablet,
  scale
}) => {
  const maxWidth = screenWidth(isTablet);
  const styles = styleFactory(scale, isTablet);
  const content =
    renderedChildren && renderedChildren.length ? renderedChildren[0] : "";
  if (isTablet) {
    return (
      <View
        style={[
          styles.articleMainContentRow,
          styles.articleMainContentRowTablet
        ]}
      >
        <FlowText
          localRender={localRender}
          markup={markup.slice(1)}
          style={{ maxWidth }}
          textStyle={styles.articleTextElement}
        >
          <InlineElement align="left" start={0}>
            {style => (
              <View style={[{ width: maxWidth / 2 }, styles.container, style]}>
                <Text style={[quoteStyleFactory(font), { color: quoteColour }]}>
                  &ldquo;
                </Text>
                <PullQuoteContent isTablet={isTablet} scale={scale}>
                  {content}
                </PullQuoteContent>
                <View style={styles.captionContainer}>
                  <Text style={[styles.caption]}>{caption}</Text>
                  <Text style={styles.text}>
                    {caption && text ? `, ${text}` : text}
                  </Text>
                  <PullQuoteTwitterLink
                    onTwitterLinkPress={onTwitterLinkPress}
                    twitter={twitter}
                  />
                </View>
              </View>
            )}
          </InlineElement>
        </FlowText>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={[quoteStyleFactory(font), { color: quoteColour }]}>
        &ldquo;
      </Text>
      <PullQuoteContent isTablet={isTablet} scale={scale}>
        {content}
      </PullQuoteContent>
      <View style={styles.captionContainer}>
        <Text style={[styles.caption]}>{caption}</Text>
        <Text style={styles.text}>{caption && text ? `, ${text}` : text}</Text>
        <PullQuoteTwitterLink
          onTwitterLinkPress={onTwitterLinkPress}
          twitter={twitter}
        />
      </View>
    </View>
  );
};

PullQuotes.propTypes = propTypes;
PullQuotes.defaultProps = defaultProps;

export default props => (
  <Context.Consumer>
    {({ theme: { scale } }) => (
      <ResponsiveContext.Consumer>
        {({ isTablet }) => (
          <PullQuotes {...props} isTablet={isTablet} scale={scale}>
            {props.children}
          </PullQuotes>
        )}
      </ResponsiveContext.Consumer>
    )}
  </Context.Consumer>
);

import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";
import { ResponsiveContext } from "@times-components/responsive";
import { InlineElement, FlowText } from "@times-components/text-flow";
import { screenWidth } from "@times-components/utils";
import styleFactory from "./styles";
import { propTypes, defaultProps } from "./drop-cap-prop-types";

const DropCapParagraph = props => {
  const { font, scale, text, dropCap, isTablet, localRender, colour } = props;
  const styles = styleFactory(font, scale);
  const maxWidth = screenWidth(isTablet);

  return (
    <View
      style={[
        styles.articleMainContentRow,
        styles.dropCapContainer,
        isTablet && styles.dropCapContainerTablet
      ]}
    >
      <FlowText
        localRender={localRender}
        markup={text}
        scale={scale}
        style={{ maxWidth }}
        textStyle={styles.articleTextElement}
      >
        <InlineElement align="left" start={0}>
          {style => (
            <View
              key="dropcap"
              style={[{ height: style.height, width: style.width }]}
            >
              <View>
                <Text
                  selectable
                  style={[
                    styles.dropCapTextElement,
                    {
                      color: colour
                    }
                  ]}
                >
                  {dropCap}
                </Text>
              </View>
            </View>
          )}
        </InlineElement>
      </FlowText>
    </View>
  );
};

DropCapParagraph.propTypes = {
  ...propTypes,
  dropCap: PropTypes.string.isRequired,
  scale: PropTypes.string.isRequired,
  text: PropTypes.arrayOf(PropTypes.object).isRequired
};

DropCapParagraph.defaultProps = defaultProps;

export default props => (
  <ResponsiveContext.Consumer>
    {({ isTablet }) => (
      <DropCapParagraph {...props} isTablet={isTablet}>
        {props.children}
      </DropCapParagraph>
    )}
  </ResponsiveContext.Consumer>
);

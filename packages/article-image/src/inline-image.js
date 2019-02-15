import React from "react";
import { View } from "react-native";
import Caption from "@times-components/caption";
import { ModalImage } from "@times-components/image";
import { InlineElement, FlowText } from "@times-components/text-flow";
import { screenWidth } from "@times-components/utils";
import { ResponsiveContext } from "@times-components/responsive";
import Context from "@times-components/context";
import { renderTree } from "@times-components/markup-forest";
import styleFactory from "./styles";
import { propTypes, defaultPropTypes } from "./article-image-prop-types";

const renderCaption = (display, caption, credits, styles) => {
  if (!caption && !credits) {
    return null;
  }

  return (
    <View key="caption" style={styles.inlineCaption}>
      <Caption credits={credits} style={styles} text={caption} />
    </View>
  );
};

const FlowImage = props => {
  const {
    imageOptions,
    captionOptions,
    children,
    isTablet,
    scale,
    localRender
  } = props;
  const styles = styleFactory(scale, isTablet);
  const { highResSize, lowResSize, ratio, uri, display } = imageOptions;
  const { caption, credits } = captionOptions;

  const imgCaption = [renderCaption(display, caption, credits, styles)];
  if (!display || !ratio) {
    return imgCaption;
  }

  const [ratioWidth, ratioHeight] = ratio.split(":");
  const aspectRatio = ratioWidth / ratioHeight;
  const maxWidth = screenWidth(isTablet);

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
          markup={children}
          style={{ maxWidth }}
          textStyle={styles.articleTextElement}
        >
          <InlineElement align="left" start={0}>
            {style => (
              <View
                key="img"
                style={[
                  styles.inlineImage,
                  { height: style.height, maxWidth: "35%", width: style.width }
                ]}
              >
                <View>
                  <ModalImage
                    aspectRatio={aspectRatio}
                    caption={<Caption credits={credits} text={caption} />}
                    highResSize={highResSize}
                    lowResSize={lowResSize}
                    uri={uri}
                  />
                </View>
                {imgCaption}
              </View>
            )}
          </InlineElement>
        </FlowText>
      </View>
    );
  }
  return [
    <View key="img">
      <ModalImage
        aspectRatio={aspectRatio}
        caption={<Caption credits={credits} text={caption} />}
        highResSize={highResSize}
        lowResSize={lowResSize}
        uri={uri}
      />
    </View>,
    ...imgCaption,
    ...children.map(child => renderTree(child, localRender))
  ];
};

FlowImage.propTypes = propTypes;
FlowImage.defaultProps = defaultPropTypes;

export default props => (
  <Context.Consumer>
    {({ theme: { scale } }) => (
      <ResponsiveContext.Consumer>
        {({ isTablet }) => (
          <FlowImage {...props} isTablet={isTablet} scale={scale}>
            {props.children}
          </FlowImage>
        )}
      </ResponsiveContext.Consumer>
    )}
  </Context.Consumer>
);

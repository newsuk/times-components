import React, { forwardRef } from "react";
import { MEDIA_QUERY_PROP_MAPPER_TAG } from "./shared";
import nativeStyled from "styled-components/native";
import webStyled from "styled-components";
import { StyleSheet, View } from "react-native";
import { inline } from "react-native-web/dist/cjs/exports/StyleSheet/compile";
import uuid from "uuid/v4";

const ID_ATTR = "data-responsive-styled-components-native-id";

const INTERNALS = { mediaQueries: {} };

function getHash() {
  let hash;

  while (!hash || INTERNALS.mediaQueries[hash]) {
    hash = uuid();
  }

  return hash;
}

export function markupMediaQuery(propMapper, info) {
  // eslint-disable-next-line no-param-reassign
  propMapper[MEDIA_QUERY_PROP_MAPPER_TAG] = info;

  return !process.env.RESPONSIVE_NATIVE_STYLED_COMPONENTS_NATIVE_TESTS
    ? () => ""
    : propMapper;
}

export function markup(Component, args) {
  const hash = getHash();

  INTERNALS.mediaQueries[hash] = args.filter(
    arg => !!arg[MEDIA_QUERY_PROP_MAPPER_TAG]
  );

  const NewComponent = forwardRef((props, ref) => {
    return <Component {...props} ref={ref} {...{ [ID_ATTR]: hash }} />;
  });

  NewComponent.displayName =
    "ResponsiveStyledComponentsNativeSerialisationHelper";

  return NewComponent;
}

export function getMediaQueries(node) {
  if (
    process.env.NODE_ENV !== "test" ||
    !node ||
    !node.props ||
    !node.props[ID_ATTR]
  ) {
    return [];
  }

  const id = node.props[ID_ATTR];
  const queries = INTERNALS.mediaQueries[id];

  if (!queries) {
    return [];
  }

  return queries.map(query => {
    const info = query[MEDIA_QUERY_PROP_MAPPER_TAG];
    const Styled = nativeStyled(View)`
      ${info.styles};
    `;

    const styleCreator = Styled.inlineStyle;
    const parsed = StyleSheet.flatten(
      styleCreator.generateStyleObject(node.props)
    );
    const converted = inline(parsed);
    const { rules } = webStyled.div(converted).componentStyle;

    return {
      args: info.args,
      rules
    };
  });
}

export function withoutSecretProps(props) {
  const { [ID_ATTR]: _, ...others } = props;

  return others;
}

export function isSecretProp(propName) {
  return propName === ID_ATTR;
}

if (typeof jest !== "undefined") {
  // eslint-disable-next-line no-undef
  afterEach(() => {
    INTERNALS.mediaQueries = {};
  });
}

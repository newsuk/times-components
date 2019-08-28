// This is used as part of a DOM attribute and needs to not use disallowed characters
const SHORT_NAME = "responsive-styled-components-native";
const FULL_NAME = `@times-components/${SHORT_NAME}`;

export const ID_ATTR = `data-${SHORT_NAME}-id`;

export const SCREEN_WIDTH_PROP = `${FULL_NAME}/screen-width`;
export const MEDIA_QUERY_PROP_MAPPER_TAG = `${FULL_NAME}/mediaQuery/info`;
export const SERIALIZER_MARKER = `${FULL_NAME}/serialization-marker`;

export const INTERNALS = {
  serializer: {}
};

import { TcView } from "@times-components/utils";
import React from "react";
import { colours } from "@times-components/ts-styleguide";
import Link, { TextLink } from "./src/link";
import { BASE_DOMAIN } from "./constants";

const BigSquare = props => (
  <TcView
    style={{
      backgroundColor: colours.functional.backgroundSecondary,
      height: 100,
      width: 100
    }}
    {...props}
  />
);

export default {
  children: [
    {
      component: (_, { action }) => (
        <Link onPress={action("onPress")} url={`https://${BASE_DOMAIN}`}>
          <TcView
            style={{
              backgroundColor: colours.functional.backgroundSecondary,
              height: 100,
              width: 100
            }}
          />
        </Link>
      ),
      name: "Link with big content",
      type: "story"
    },
    {
      component: (_, { action }) => {
        const responsiveLinkStyles = {
          base: `
            height: 100px;
            width: 100px;
            display: block;
            background-color: red;
            color: white;
          `,
          medium: `
            background-color: blue;
          `
        };

        return (
          <Link
            onPress={action("onPress")}
            url={`https://${BASE_DOMAIN}`}
            target="_blank"
            responsiveLinkStyles={responsiveLinkStyles}
            underlined={false}
          >
            resize me
          </Link>
        );
      },
      name: "Responsive Link",
      type: "story",
      platform: "web"
    },
    {
      component: (_, { action }) => (
        <Link
          onPress={e => {
            e.preventDefault();
            action("onPress")(e);
          }}
          url={`https://${BASE_DOMAIN}`}
        >
          <BigSquare />
        </Link>
      ),
      name: "Link can prevent browser navigation",
      type: "story"
    },
    {
      component: (_, { action }) => (
        <TextLink onPress={action("onPress")} url={`https://${BASE_DOMAIN}/`}>
          The Times
        </TextLink>
      ),
      name: "TextLink",
      type: "story"
    },
    {
      component: (_, { action }) => (
        <TextLink
          onPress={action("onPress")}
          style={{ color: colours.functional.action }}
          url={`https://${BASE_DOMAIN}/`}
        >
          The Times
        </TextLink>
      ),
      name: "TextLink with styles",
      type: "story"
    }
  ],
  name: "Primitives/Link"
};

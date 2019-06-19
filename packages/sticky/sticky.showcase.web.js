/* eslint-env browser */
import React from "react";
import styled from "styled-components";
import { breakpoints } from "@times-components/styleguide";
import Sticky, { StickyProvider, STICKY_CLASS_NAME } from "./src/sticky";

const Story = styled.div`
  &.with-fixed {
    padding-top: 30px;
  }

  .bar {
    height: 30px;
    background: red;
  }

  .bar:not(.fixed) {
    margin: 30px 0;
  }

  .container,
  .sticky-content {
    margin: 0 auto;
    max-width: 400px;
  }

  .container {
    padding: 10px;
    overflow: hidden;
    position: relative;
  }

  .${STICKY_CLASS_NAME} {
    background: blue;
  }

  .fixed {
    position: fixed;
    background: yellow;
    left: 0;
    width: 100%;
    top: 0;
    z-index: 1;
  }

  .container.withFixed {
    margin-top: 30px;
  }
`;

export default {
  children: [
    {
      component: () => (
        <Story>
          <StickyProvider>
            <div className="container">
              <h2>Scroll down…</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet
                assumenda autem dolorem dolores eligendi error ipsam itaque
                laborum odit officia perspiciatis praesentium provident quaerat
                qui reiciendis, sunt vel vitae?
              </p>
              <Sticky className="bar">
                <div className="sticky-content">Content</div>
              </Sticky>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet
                assumenda autem dolorem dolores eligendi error ipsam itaque
                laborum odit officia perspiciatis praesentium provident quaerat
                qui reiciendis, sunt vel vitae?
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet
                assumenda autem dolorem dolores eligendi error ipsam itaque
                laborum odit officia perspiciatis praesentium provident quaerat
                qui reiciendis, sunt vel vitae?
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet
                assumenda autem dolorem dolores eligendi error ipsam itaque
                laborum odit officia perspiciatis praesentium provident quaerat
                qui reiciendis, sunt vel vitae?
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet
                assumenda autem dolorem dolores eligendi error ipsam itaque
                laborum odit officia perspiciatis praesentium provident quaerat
                qui reiciendis, sunt vel vitae?
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet
                assumenda autem dolorem dolores eligendi error ipsam itaque
                laborum odit officia perspiciatis praesentium provident quaerat
                qui reiciendis, sunt vel vitae?
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet
                assumenda autem dolorem dolores eligendi error ipsam itaque
                laborum odit officia perspiciatis praesentium provident quaerat
                qui reiciendis, sunt vel vitae?
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet
                assumenda autem dolorem dolores eligendi error ipsam itaque
                laborum odit officia perspiciatis praesentium provident quaerat
                qui reiciendis, sunt vel vitae?
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet
                assumenda autem dolorem dolores eligendi error ipsam itaque
                laborum odit officia perspiciatis praesentium provident quaerat
                qui reiciendis, sunt vel vitae?
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet
                assumenda autem dolorem dolores eligendi error ipsam itaque
                laborum odit officia perspiciatis praesentium provident quaerat
                qui reiciendis, sunt vel vitae?
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet
                assumenda autem dolorem dolores eligendi error ipsam itaque
                laborum odit officia perspiciatis praesentium provident quaerat
                qui reiciendis, sunt vel vitae?
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet
                assumenda autem dolorem dolores eligendi error ipsam itaque
                laborum odit officia perspiciatis praesentium provident quaerat
                qui reiciendis, sunt vel vitae?
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet
                assumenda autem dolorem dolores eligendi error ipsam itaque
                laborum odit officia perspiciatis praesentium provident quaerat
                qui reiciendis, sunt vel vitae?
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet
                assumenda autem dolorem dolores eligendi error ipsam itaque
                laborum odit officia perspiciatis praesentium provident quaerat
                qui reiciendis, sunt vel vitae?
              </p>
            </div>
          </StickyProvider>
        </Story>
      ),
      name: "Sticky without fixed sibling",
      type: "story"
    },
    {
      component: () => (
        <Story className="with-fixed">
          <div className="bar fixed" />
          <StickyProvider className="container">
            <h2>Scroll down…</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet
              assumenda autem dolorem dolores eligendi error ipsam itaque
              laborum odit officia perspiciatis praesentium provident quaerat
              qui reiciendis, sunt vel vitae?
            </p>
            <Sticky className="bar">
              <div className="sticky-content">Content</div>
            </Sticky>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet
              assumenda autem dolorem dolores eligendi error ipsam itaque
              laborum odit officia perspiciatis praesentium provident quaerat
              qui reiciendis, sunt vel vitae?
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet
              assumenda autem dolorem dolores eligendi error ipsam itaque
              laborum odit officia perspiciatis praesentium provident quaerat
              qui reiciendis, sunt vel vitae?
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet
              assumenda autem dolorem dolores eligendi error ipsam itaque
              laborum odit officia perspiciatis praesentium provident quaerat
              qui reiciendis, sunt vel vitae?
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet
              assumenda autem dolorem dolores eligendi error ipsam itaque
              laborum odit officia perspiciatis praesentium provident quaerat
              qui reiciendis, sunt vel vitae?
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet
              assumenda autem dolorem dolores eligendi error ipsam itaque
              laborum odit officia perspiciatis praesentium provident quaerat
              qui reiciendis, sunt vel vitae?
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet
              assumenda autem dolorem dolores eligendi error ipsam itaque
              laborum odit officia perspiciatis praesentium provident quaerat
              qui reiciendis, sunt vel vitae?
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet
              assumenda autem dolorem dolores eligendi error ipsam itaque
              laborum odit officia perspiciatis praesentium provident quaerat
              qui reiciendis, sunt vel vitae?
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet
              assumenda autem dolorem dolores eligendi error ipsam itaque
              laborum odit officia perspiciatis praesentium provident quaerat
              qui reiciendis, sunt vel vitae?
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet
              assumenda autem dolorem dolores eligendi error ipsam itaque
              laborum odit officia perspiciatis praesentium provident quaerat
              qui reiciendis, sunt vel vitae?
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet
              assumenda autem dolorem dolores eligendi error ipsam itaque
              laborum odit officia perspiciatis praesentium provident quaerat
              qui reiciendis, sunt vel vitae?
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet
              assumenda autem dolorem dolores eligendi error ipsam itaque
              laborum odit officia perspiciatis praesentium provident quaerat
              qui reiciendis, sunt vel vitae?
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet
              assumenda autem dolorem dolores eligendi error ipsam itaque
              laborum odit officia perspiciatis praesentium provident quaerat
              qui reiciendis, sunt vel vitae?
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet
              assumenda autem dolorem dolores eligendi error ipsam itaque
              laborum odit officia perspiciatis praesentium provident quaerat
              qui reiciendis, sunt vel vitae?
            </p>
          </StickyProvider>
        </Story>
      ),
      name: "Sticky with fixed sibling",
      type: "story"
    },
    {
      component: () => {
        const mql = window.matchMedia(`(max-width: ${breakpoints.wide}px)`);

        return (
          <Story className="with-fixed">
            <div className="bar fixed" />
            <StickyProvider className="container">
              <h2>Scroll down…</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet
                assumenda autem dolorem dolores eligendi error ipsam itaque
                laborum odit officia perspiciatis praesentium provident quaerat
                qui reiciendis, sunt vel vitae?
              </p>
              <Sticky className="bar" shouldBeSticky={() => mql.matches}>
                <div className="sticky-content">Content</div>
              </Sticky>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet
                assumenda autem dolorem dolores eligendi error ipsam itaque
                laborum odit officia perspiciatis praesentium provident quaerat
                qui reiciendis, sunt vel vitae?
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet
                assumenda autem dolorem dolores eligendi error ipsam itaque
                laborum odit officia perspiciatis praesentium provident quaerat
                qui reiciendis, sunt vel vitae?
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet
                assumenda autem dolorem dolores eligendi error ipsam itaque
                laborum odit officia perspiciatis praesentium provident quaerat
                qui reiciendis, sunt vel vitae?
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet
                assumenda autem dolorem dolores eligendi error ipsam itaque
                laborum odit officia perspiciatis praesentium provident quaerat
                qui reiciendis, sunt vel vitae?
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet
                assumenda autem dolorem dolores eligendi error ipsam itaque
                laborum odit officia perspiciatis praesentium provident quaerat
                qui reiciendis, sunt vel vitae?
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet
                assumenda autem dolorem dolores eligendi error ipsam itaque
                laborum odit officia perspiciatis praesentium provident quaerat
                qui reiciendis, sunt vel vitae?
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet
                assumenda autem dolorem dolores eligendi error ipsam itaque
                laborum odit officia perspiciatis praesentium provident quaerat
                qui reiciendis, sunt vel vitae?
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet
                assumenda autem dolorem dolores eligendi error ipsam itaque
                laborum odit officia perspiciatis praesentium provident quaerat
                qui reiciendis, sunt vel vitae?
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet
                assumenda autem dolorem dolores eligendi error ipsam itaque
                laborum odit officia perspiciatis praesentium provident quaerat
                qui reiciendis, sunt vel vitae?
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet
                assumenda autem dolorem dolores eligendi error ipsam itaque
                laborum odit officia perspiciatis praesentium provident quaerat
                qui reiciendis, sunt vel vitae?
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet
                assumenda autem dolorem dolores eligendi error ipsam itaque
                laborum odit officia perspiciatis praesentium provident quaerat
                qui reiciendis, sunt vel vitae?
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet
                assumenda autem dolorem dolores eligendi error ipsam itaque
                laborum odit officia perspiciatis praesentium provident quaerat
                qui reiciendis, sunt vel vitae?
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet
                assumenda autem dolorem dolores eligendi error ipsam itaque
                laborum odit officia perspiciatis praesentium provident quaerat
                qui reiciendis, sunt vel vitae?
              </p>
            </StickyProvider>
          </Story>
        );
      },
      name: "Sticky with fixed sibling & media query",
      type: "story"
    }
  ],
  name: "Primitives/Sticky"
};

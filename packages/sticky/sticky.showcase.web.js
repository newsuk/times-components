/* eslint-env browser */
import React from "react";
import { createScopedGlobalStyle } from "@times-components/storybook";
import { breakpoints } from "@times-components/styleguide";
import Sticky, { StickyProvider, STICKY_CLASS_NAME } from "./src/sticky";

const Styles = createScopedGlobalStyle`
  .bar {
    height: 30px;
    background: red;
  }

  .bar:not(.fixed) {
    margin: 30px auto;
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

  .with-fixed .container {
    margin-top: 30px;
  }
`;

export default {
  children: [
    {
      component: () => (
        <StickyProvider>
          <Styles />
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
      ),
      name: "Sticky without fixed sibling",
      type: "story"
    },
    {
      component: () => (
        <div className="with-fixed">
          <Styles />
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
        </div>
      ),
      name: "Sticky with fixed sibling",
      type: "story"
    },
    {
      component: () => {
        const mql = window.matchMedia(`(max-width: ${breakpoints.wide}px)`);

        return (
          <div className="with-fixed">
            <Styles />
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
          </div>
        );
      },
      name: "Sticky with fixed sibling & media query",
      type: "story"
    }
  ],
  name: "Primitives/Sticky"
};

/* eslint-env browser */
import React from "react";
import { createGlobalStyle } from "styled-components";
import { breakpoints } from "@times-components/styleguide";
import Sticky, { StickyProvider } from "./src/sticky";

const GlobalStyles = createGlobalStyle`
.sticky-story.with-fixed {
  padding-top: 30px;
}
.bar {
  height: 30px;
  background: red;
}

.container, .sticky-content {
  margin: 0 auto;
  max-width: 400px;
}

.container {
  padding: 10px;
  overflow: hidden;
  position: relative;
}

.sticky {
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
        <div className="sticky-story">
          <GlobalStyles/>
          <div className="container">
            <h2>Scroll down…</h2>
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
        </div>
      ),
      name: "Sticky without fixed sibling",
      type: "story"
    },
    {
      component: () => (
        <div className="sticky-story with-fixed">
          <GlobalStyles/>
          <div className="bar fixed" />
          <StickyProvider className="container">
            <h2>Scroll down…</h2>
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
      component: () => (
        <div className="sticky-story with-fixed">
          <GlobalStyles/>
          <div className="bar fixed" />
          <StickyProvider className="container">
            <h2>Scroll down…</h2>
            <Sticky className="bar" wide>
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
      name: "Wide sticky with fixed sibling",
      type: "story"
    },
    {
      component: () => {
        return (
          <div className="sticky-story with-fixed">
            <GlobalStyles/>
            <div className="bar fixed"/>
            <StickyProvider className="container">
              <h2>Scroll down…</h2>
              <Sticky className="bar" wide shouldBeSticky={() => window.matchMedia(`(max-width: ${breakpoints.wide}px)`).matches}>
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
      name: "Wide sticky with fixed sibling & media query",
      type: "story"
    }
  ],
  name: "Primitives/Sticky"
};

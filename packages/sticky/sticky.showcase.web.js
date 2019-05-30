import React from "react";
import Sticky, { StickyProvider } from "./src/sticky";

import "./sticky.showcase.web.css";

export default {
  children: [
    {
      component: () => (
        <>
          <div className="bar fixed" />
          <StickyProvider className="container">
            <h2>Scroll down…</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet
              assumenda autem dolorem dolores eligendi error ipsam itaque
              laborum odit officia perspiciatis praesentium provident quaerat
              qui reiciendis, sunt vel vitae?
            </p>
            <Sticky>
              <div className="bar" />
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
        </>
      ),
      name: "Sticky with fixed sibling",
      type: "story"
    }
  ],
  name: "Primitives/Sticky"
};

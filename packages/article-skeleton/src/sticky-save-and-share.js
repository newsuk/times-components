import React, { Component } from "react";
import SaveAndShareBar from "@times-components/save-and-share-bar";
import { saveApi as saveArticleApi } from "@times-components/save-star-web";
import {
  SaveShareContainer,
  SaveShareInnerContainer
} from "./styles/responsive";

class StickySaveAndShareBar extends Component {
  constructor(props) {
    super(props);
    this.checkSticky = this.checkSticky.bind(this);
    this.stickyRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener("scroll", this.checkSticky);
    window.addEventListener("resize", this.checkSticky);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.checkSticky);
    window.removeEventListener("resize", this.checkSticky);
  }

  checkSticky() {
    const sticky = this.stickyRef.current;

    if (sticky) {
      const offsetTop = sticky.getBoundingClientRect().top;
      const isSticky = offsetTop <= 1;

      if (isSticky !== this.isSticky) {
        this.isSticky = isSticky;

        if (isSticky) {
          sticky.classList.add("sticky");
        } else {
          sticky.classList.remove("sticky");
        }
      }
    }
  }

  render() {
    const { saveApi, ...props } = this.props;
    const saveServiceApi =
      saveApi && saveApi.bookmark ? saveApi : saveArticleApi;

    return (
      <SaveShareContainer ref={this.stickyRef}>
        <SaveShareInnerContainer>
          <SaveAndShareBar {...props} saveApi={saveServiceApi} />
        </SaveShareInnerContainer>
      </SaveShareContainer>
    );
  }
}

export default StickySaveAndShareBar;

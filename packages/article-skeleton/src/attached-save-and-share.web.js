import React, { Component } from "react";
import SaveAndShareBar from "@times-components/save-and-share-bar";
import { saveApi as saveArticleApi } from "@times-components/save-star-web";
import {
  SaveShareContainer,
  SaveShareInnerContainer
} from "./styles/responsive";

class AttachedSaveAndShareBar extends Component {
  constructor(props) {
    super(props);
    this.checkAttachment = this.checkAttachment.bind(this);
    this.stickyRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener("scroll", this.checkAttachment);
    window.addEventListener("resize", this.checkAttachment);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.checkAttachment);
    window.removeEventListener("resize", this.checkAttachment);
  }

  checkAttachment() {
    const sticky = this.stickyRef.current;

    if (sticky) {
      const offsetTop = sticky.getBoundingClientRect().top;
      const isSticky = offsetTop <= 1;

      if (isSticky !== this.isSticky) {
        this.isSticky = isSticky;

        if (isSticky) {
          sticky.classList.add("isSticky");
        } else {
          sticky.classList.remove("isSticky");
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

export default AttachedSaveAndShareBar;

import React, { Component } from "react";
import SaveAndShareBar from "@times-components/save-and-share-bar";
import { saveApi as saveArticleApi } from "@times-components/save-star-web";
import {
  SaveShareContainer,
  SaveShareInnerContainer
} from "./styles/responsive";

const isOutOfView = node => node.getBoundingClientRect().top <= 1;

class StickySaveAndShareBar extends Component {
  constructor(props) {
    super(props);

    this.updateSticky = this.updateSticky.bind(this);
    this.containerRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener("scroll", this.updateSticky);
    window.addEventListener("resize", this.updateSticky);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.updateSticky);
    window.removeEventListener("resize", this.updateSticky);
  }

  setSticky(container, shouldBeSticky) {
    this.isSticky = shouldBeSticky;

    if (shouldBeSticky) {
      container.classList.add("sticky");
    } else {
      container.classList.remove("sticky");
    }
  }

  doesStickyNeedUpdating(shouldBeSticky) {
    return shouldBeSticky !== this.isSticky;
  }

  updateSticky() {
    const container = this.containerRef.current;

    if (!container) {
      return;
    }

    const shouldBeSticky = isOutOfView(container);

    if (this.doesStickyNeedUpdating(shouldBeSticky)) {
      this.setSticky(container, shouldBeSticky);
    }
  }

  render() {
    const { saveApi, ...props } = this.props;
    const api = saveApi && saveApi.bookmark ? saveApi : saveArticleApi;

    return (
      <SaveShareContainer ref={this.containerRef}>
        <SaveShareInnerContainer>
          <SaveAndShareBar {...props} saveApi={api} />
        </SaveShareInnerContainer>
      </SaveShareContainer>
    );
  }
}

export default StickySaveAndShareBar;

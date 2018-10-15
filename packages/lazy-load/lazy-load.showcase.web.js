import React, { Component } from "react";
import styled from "styled-components";
import LazyLoad from "./src/lazy-load";

const list = new Array(50).fill(0).map((_, indx) => `node-${indx}`);
const ListElement = styled.li`
  align-items: center;
  border: 2px solid white;
  display: flex;
  height: 200px;
  justify-content: center;
`;

const SeenElement = styled(ListElement)`
  background-color: rgba(170, 200, 170, 0.8);
`;

const UnseenElement = styled(ListElement)`
  background-color: rgba(247, 189, 189, 0.8);
`;

const UnseenText = () => <span>I am hiding</span>;

class SeenText extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showVisibleText: false
    };
  }

  componentDidMount() {
    setTimeout(
      () =>
        this.setState({
          showVisibleText: true
        }),
      500
    );
  }

  render() {
    return (
      <span>
        {this.state.showVisibleText ? "You've seen me" : "I am hiding"}
      </span>
    );
  }
}

export default {
  children: [
    {
      component: () => (
        <LazyLoad rootMargin="100px" threshold={0.5}>
          {({ observed, registerNode }) => (
            <ul>
              {list.map(id => {
                const isVisible = !!observed.get(id);
                const StyledElement = isVisible ? SeenElement : UnseenElement;

                return (
                  <StyledElement
                    id={id}
                    innerRef={node => registerNode(node)}
                    key={id}
                  >
                    {isVisible ? <SeenText /> : <UnseenText />}
                  </StyledElement>
                );
              })}
            </ul>
          )}
        </LazyLoad>
      ),
      name: "Default",
      platform: "web",
      type: "story"
    }
  ],
  name: "Helpers/Lazy load"
};

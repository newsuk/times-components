/* eslint-env browser */
import React, { Component } from "react";
import { ActivityIndicator } from "react-native";
import Link from "@times-components/link";
import styled from "styled-components";
import PropTypes from "prop-types";
import {
  getBookmarks,
  saveBookmarks,
  unsaveBookmarks
} from "@times-components/provider-queries";
import { IconSaveBookmark } from "@times-components/icons";
import styles, { getStyles } from "./styles";

const HoverIcon =
  styled.div &&
  styled.div`
    color: ${props => props.colour};
    &:hover {
      color: ${props => props.hoverColour || props.colour};
    }
  `;
class SaveStarWeb extends Component {
  constructor(props) {
    super(props);
    this.bookmarkEvents = this.bookmarkEvents.bind(this);
    this.state = {
      loadingState: null,
      savedArticles: null,
      savedStatus: null
    };
  }

  componentDidMount() {
    const { articleId, saveApi } = this.props;

    if (typeof window === "undefined") {
      this.setState({ loadingState: false });
    }

    // client
    //   .query({ query: getBookmarks })
    saveApi.getBookmarks()
      .then(response => {
        console.log("CDM response:", response);
        const { loading, data } = response;
        if (loading) {
          this.setState({ loadingState: true });
        }
        if (loading === false) {
          const savedArticles = data.viewer.bookmarks.bookmarks.map(
            item => item.id
          );
          this.setState({
            loadingState: false,
            savedArticles,
            savedStatus: !!savedArticles.find(item => item === articleId)
          });
        }
      })
      .catch(err => {
        this.setState({ loadingState: false, savedStatus: false });
        console.error("Error in connecting to api", err);
      });
  }

  saveLink(saveStatus) {
    const { colour, hoverColour } = this.props;

    const saveStyle = getStyles({ saveStatus });
    const { fillColour, strokeColour } = saveStyle;

    return (
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <Link
        onPress={e => {
          e.preventDefault();
          this.bookmarkEvents();
        }}
        responsiveLinkStyles={styles.link}
      >
        <HoverIcon colour={colour} hoverColour={hoverColour}>
          <IconSaveBookmark
            fillColour={fillColour}
            strokeColour={strokeColour}
            title="Save to My Articles"
          />
        </HoverIcon>
      </Link>
    );
  }

  saveBookmark() {
    // const { client } = this.props;
    const { saveApi } = this.props;
    this.setState({ loadingState: true });
    const { savedArticles } = this.state;
    const { articleId: id } = this.props;

    // client
    //   .mutate({
    //     mutation: saveBookmarks,
    //     variables: {
    //       id
    //     }
    //   })
    saveApi.bookmark(id)
      .then(() => {
        this.setState({
          loadingState: false,
          savedArticles: [...savedArticles, id],
          savedStatus: true
        });
      })
      .catch(err => {
        this.setState({ loadingState: false, savedStatus: false });
        console.error("Error in connecting to api", err);
      });
  }

  unsaveBookmark() {
    // const { client } = this.props;
    const { saveApi } = this.props;
    const { savedArticles } = this.state;
    const { articleId: id } = this.props;

    this.setState({ loadingState: true });
    // client
    //   .mutate({
    //     mutation: unsaveBookmarks,
    //     variables: {
    //       id
    //     }
    //   })
    saveApi.unbookmark(id)
      .then(() => {
        this.setState({
          loadingState: false,
          savedArticles: savedArticles.filter(item => item !== id),
          savedStatus: false
        });
      })
      .catch(err => {
        this.setState({ loadingState: false, savedStatus: true });
        console.error("Error in connecting to api", err);
      });
  }

  bookmarkEvents() {
    let newStatus = null;
    const { articleId: id } = this.props;
    const { savedArticles } = this.state;

    if (savedArticles) {
      newStatus = !!savedArticles.find(item => item === id);
      if (newStatus) {
        this.unsaveBookmark();
      } else {
        this.saveBookmark();
      }
    } else {
      this.saveBookmark();
    }
  }

  render() {
    const { savedStatus, loadingState } = this.state;

    console.log("RenderStar:", savedStatus, "loading:", loadingState);
    if (loadingState) {
      return <ActivityIndicator size="small" />;
    }

    if (savedStatus) {
      return this.saveLink(true);
    }

    return this.saveLink(false);
  }
}

SaveStarWeb.propTypes = {
  articleId: PropTypes.string.isRequired,
  colour: PropTypes.string,
  hoverColour: PropTypes.string
};

SaveStarWeb.defaultProps = {
  colour: styles.svgIcon.fillColour,
  hoverColour: styles.svgIcon.hoverFillColour
};

export default SaveStarWeb;

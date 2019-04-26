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
import makeClient from "./make-client-util";

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
    const { articleId } = this.props;

    if (typeof window === "undefined") {
      this.setState({ loadingState: false });
    }

    const client = makeClient();

    client
      .query({ query: getBookmarks })
      .then(response => {
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

  saveLink(
    saveStatus,
    articleId,
    colour = styles.svgIcon.fillColour,
    hoverColour = styles.svgIcon.hoverFillColour
  ) {
    const saveStyle = getStyles({ saveStatus });
    const { fillColour, strokeColour } = saveStyle;

    return (
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <Link
        onPress={e => {
          e.preventDefault();
          this.bookmarkEvents(articleId);
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

  saveBookmark(id) {
    const client = makeClient();
    this.setState({ loadingState: true });
    const { savedArticles } = this.state;

    client
      .mutate({
        mutation: saveBookmarks,
        variables: {
          id
        }
      })
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

  unsaveBookmark(id) {
    const client = makeClient();
    const { savedArticles } = this.state;
    this.setState({ loadingState: true });
    client
      .mutate({
        mutation: unsaveBookmarks,
        variables: {
          id
        }
      })
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

  bookmarkEvents(id) {
    let newStatus = null;
    const { savedArticles } = this.state;

    if (savedArticles) {
      newStatus = !!savedArticles.find(item => item === id);
      if (newStatus) {
        this.unsaveBookmark(id);
      } else {
        this.saveBookmark(id);
      }
    } else {
      this.saveBookmark(id);
    }
  }

  render() {
    const { articleId, colour, hoverColour } = this.props;
    const { savedStatus, loadingState } = this.state;

    if (loadingState) {
      return <ActivityIndicator size="small" />;
    }

    if (savedStatus) {
      return this.saveLink(true, articleId, colour, hoverColour);
    }

    return this.saveLink(false, articleId, colour, hoverColour);
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

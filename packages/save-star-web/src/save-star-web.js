/* eslint-env browser */
import React, { Component, Fragment } from "react";
import { ActivityIndicator, Text } from "react-native";
import Link from "@times-components/link";
import styled from "styled-components";
import PropTypes from "prop-types";
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
      savedStatus: false
    };
  }

  componentDidMount() {
    const { articleId, saveApi } = this.props;

    this.setState({ loadingState: true });

    if (typeof window === "undefined") {
      this.setState({ loadingState: false });
    }
    saveApi
      .getBookmarks()
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

  saveLink(saveStatus) {
    const { colour, hoverColour } = this.props;

    const saveStyle = getStyles({ saveStatus });
    const { fillColour, strokeColour } = saveStyle;

    const saveText = saveStatus ? "Saved" : "Save";

    return (
      /* eslint-disable jsx-a11y/anchor-is-valid */
      <Fragment>
        <Text style={styles.label}>{saveText}</Text>
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
      </Fragment>
    );
  }

  saveBookmark() {
    this.setState({ loadingState: true });
    const { savedArticles } = this.state;
    const { articleId: id, saveApi } = this.props;

    saveApi
      .bookmark(id)
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
    const { savedArticles } = this.state;
    const { articleId: id, saveApi } = this.props;

    this.setState({ loadingState: true });

    saveApi
      .unBookmark(id)
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
    const saveText = savedStatus ? "Saved" : "Save";

    if (loadingState) {
      return (
        <Fragment>
          <Text style={styles.label}>{saveText}</Text>
          <ActivityIndicator size="small" style={styles.activityLoader} />
        </Fragment>
      );
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
  hoverColour: PropTypes.string,
  saveApi: PropTypes.func.isRequired
};

SaveStarWeb.defaultProps = {
  colour: styles.svgIcon.fillColour,
  hoverColour: styles.svgIcon.hoverFillColour
};

export default SaveStarWeb;

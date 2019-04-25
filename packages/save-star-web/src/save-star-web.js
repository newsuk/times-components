/* eslint-env browser */
import React, { Component } from "react";
import { ActivityIndicator } from "react-native";
import Link from "@times-components/link";
import PropTypes from "prop-types";
import fetch from "unfetch";
import { createHttpLink } from "apollo-link-http";
import { fragmentMatcher } from "@times-components/schema";
import { InMemoryCache } from "apollo-cache-inmemory";
import {
  getBookmarks,
  saveBookmarks,
  unsaveBookmarks
} from "@times-components/provider-queries";
import { IconSaveBookmark } from "@times-components/icons";
import { ApolloClient } from "apollo-client";
import styles, { getStyles } from "./styles";

class SaveStarWeb extends Component {

  static makeClient() {
    let graphqlapi = null;
    let acsTnlCookie = null;
    let sacsTnlCookie = null;

    if(window.nuk) {
      graphqlapi = window.nuk.graphqlapi.url;
      acsTnlCookie = window.nuk.getCookieValue('acs_tnl');
      sacsTnlCookie = window.nuk.getCookieValue('sacs_tnl');
    }
    const networkInterfaceOptions = { fetch, headers: {}, uri: graphqlapi };

    networkInterfaceOptions.headers["content-type"] =
      "application/x-www-form-urlencoded";
    networkInterfaceOptions.headers.Authorization = `Cookie acs_tnl=${acsTnlCookie};sacs_tnl=${sacsTnlCookie}`;

    return new ApolloClient({
      cache: new InMemoryCache({ fragmentMatcher }),
      link: createHttpLink(networkInterfaceOptions)
    });
  }

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
       this.setState({ loadingState: false});
    }

    const client = SaveStarWeb.makeClient();

    client
      .query({ query: getBookmarks })
      .then(response => {
        const { loading, data } = response;
        if(loading) {
          this.setState({ loadingState: true});
        };
        if (loading === false) {
          const savedArticles = data.viewer.bookmarks.bookmarks;
          this.setState({
            loadingState: false,
            savedArticles,
            savedStatus: !!savedArticles
              .map(item => item.id)
              .find(item => item === articleId)
          });
        }
      })
      .catch(err => {
        this.setState({  loadingState: false, savedStatus: false });
        console.error("Error in connecting to api", err);
      });
  }

  saveLink(saveStatus, articleId) {
    const saveStyle = getStyles({ saveStatus });
    const { fillColour, strokeColour } = saveStyle;

    return (
      <Link
        onPress={e => {
          e.preventDefault();
          this.bookmarkEvents(articleId);
        }}
        responsiveLinkStyles={styles.link}
      >
        <IconSaveBookmark
          fillColour={fillColour}
          strokeColour={strokeColour}
          title="Save to My Articles"
        />
      </Link>
    );
  }

  saveBookmark(id) {
    const client = SaveStarWeb.makeClient();
    this.setState({loadingState: true});
    const { savedArticles } = this.state;

    console.log('hey');

    client
      .mutate({
        mutation: saveBookmarks,
        variables: {
          id
        }
      })
      .then((result) => {
        console.log('response is', result)
        this.setState({
          loadingState: false,
          savedArticles: [...savedArticles, { id }],
          savedStatus: true
        });
      })
      .catch(err => {
        this.setState({  loadingState: false, savedStatus: false });
        console.error("Error in connecting to api", err);
      });
  }

  unsaveBookmark(id) {
    const client = SaveStarWeb.makeClient();
    const { savedArticles } = this.state;
    this.setState({loadingState: true});

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
          savedArticles: savedArticles
            .map(item => item.id)
            .filter(item => item !== id),
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
      newStatus = !!savedArticles
        .map(item => item.id)
        .find(item => item === id);
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
    const { articleId } = this.props;
    const { savedStatus, loadingState } = this.state;

    if(loadingState) {
      return ( <ActivityIndicator size="small" />);
    }

    if (savedStatus) {
      return this.saveLink(true, articleId);
    }

    return this.saveLink(false, articleId);
  }
}

SaveStarWeb.propTypes = {
  articleId: PropTypes.string.isRequired
};

export default SaveStarWeb;

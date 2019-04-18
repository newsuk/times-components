import React, { Component } from "react";
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

const makeClient = () => {
  const graphqlapi = "https://prod-tpa.prod.thetimes.works/graphql"; // window.nuk.graphqlapi.url;
  const acsTnlCookie =
    "tid%3D77a8739a-fbad-4344-9bf8-09c33a49ed6b%26eid%3DAAAA002920174%26e%3D1%26a%3DTmVoYSBTcml2YXN0YXZh%26u%3D1910c402-2cf6-40dd-bb1e-4ee24e1e7f6b%26t%3D1554976444%26h%3D5f091672fb6e3258934b91f8715e2753"; // window.nuk.getCookieValue('acs_tnl');
  const sacsTnlCookie = "1ff9a858-8f31-43f3-bb8a-4366dfcb858e"; // window.nuk.getCookieValue('sacs_tnl');

  const networkInterfaceOptions = { fetch, headers: {}, uri: graphqlapi };

  networkInterfaceOptions.headers["content-type"] =
    "application/x-www-form-urlencoded";
  networkInterfaceOptions.headers.Authorization = `Cookie acs_tnl=${acsTnlCookie};sacs_tnl=${sacsTnlCookie}`;

  return new ApolloClient({
    cache: new InMemoryCache({ fragmentMatcher }),
    link: createHttpLink(networkInterfaceOptions)
  });
};

class SaveStarWeb extends Component {
  constructor(props) {
    super(props);
    this.bookmarkEvents = this.bookmarkEvents.bind(this);
    this.state = {
      savedArticles: null,
      savedStatus: null
    };
  }

  componentDidMount() {
    const { articleId } = this.props;

    if (typeof window === "undefined") {
      // return loading state
      return null;
    }

    const client = makeClient();

    client
      .query({ query: getBookmarks })
      .then(response => {
        const { loading, data } = response;
        // needs a spinner for loading state => default state is spinner
        if (loading === false) {
          const savedArticles = data.viewer.bookmarks.bookmarks;
          this.setState({
            savedArticles,
            savedStatus: !!savedArticles
              .map(item => item.id)
              .find(item => item === articleId)
          });
        }
      })
      .catch(err => {
        this.setState({ savedStatus: false });
        console.error("Error in connecting to api", err);
      });
  }

  saveBookmark(id) {
    const client = makeClient();

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
          savedArticles: [...savedArticles, { id }],
          savedStatus: true
        });
      })
      .catch(err => {
        this.setState({ savedStatus: false });
        console.error("Error in connecting to api", err);
      });
  }

  unsaveBookmark(id) {
    const client = makeClient();
    const { savedArticles } = this.state;

    client
      .mutate({
        mutation: unsaveBookmarks,
        variables: {
          id
        }
      })
      .then(() => {
        this.setState({
          savedArticles: savedArticles
            .map(item => item.id)
            .filter(item => item !== id),
          savedStatus: false
        });
      })
      .catch(err => {
        this.setState({ savedStatus: true });
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
    const { savedStatus } = this.state;

    const SaveLink = saveStatus => {
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
    };

    // if savedstatus is null, show the spinning
    if (savedStatus) {
      return SaveLink(true);
    }

    return SaveLink(false);
  }
}

SaveStarWeb.propTypes = {
  articleId: PropTypes.string.isRequired
};

export default SaveStarWeb;

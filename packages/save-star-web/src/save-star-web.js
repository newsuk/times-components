import React, { Component } from "react";
import { Text } from "react-native";
import Link from "@times-components/link";
import fetch from "unfetch";
import { createHttpLink } from "apollo-link-http";
import { fragmentMatcher } from "@times-components/schema";
import { InMemoryCache } from "apollo-cache-inmemory";
import gql from "graphql-tag";
import { IconSaveBookmark } from "@times-components/icons";
import { ApolloClient } from "apollo-client";
import styles, { getStyles } from "./styles";

const makeClient = () => {
  const graphqlapi = "https://prod-tpa.prod.thetimes.works/graphql"; // window.nuk.graphqlapi.url;
  const acs_tnl_cookie =
    "tid%3D77a8739a-fbad-4344-9bf8-09c33a49ed6b%26eid%3DAAAA002920174%26e%3D1%26a%3DTmVoYSBTcml2YXN0YXZh%26u%3D1910c402-2cf6-40dd-bb1e-4ee24e1e7f6b%26t%3D1554976444%26h%3D5f091672fb6e3258934b91f8715e2753"; // window.nuk.getCookieValue('acs_tnl');
  const sacs_tnl_cookie = "1ff9a858-8f31-43f3-bb8a-4366dfcb858e"; // window.nuk.getCookieValue('sacs_tnl');

  const networkInterfaceOptions = { fetch, headers: {}, uri: graphqlapi };

  networkInterfaceOptions.headers["content-type"] =
    "application/x-www-form-urlencoded";
  networkInterfaceOptions.headers.Authorization = `Cookie acs_tnl=${acs_tnl_cookie};sacs_tnl=${sacs_tnl_cookie}`;

  const httpLink = createHttpLink({
    uri: graphqlapi
  });

  return new ApolloClient({
    link: createHttpLink(networkInterfaceOptions),
    cache: new InMemoryCache({ fragmentMatcher })
  });
};

class SaveStarWeb extends Component {
  constructor(props) {
    super(props);
    this.bookmarkEvents = this.bookmarkEvents.bind(this);
    this.state = {
      savedStatus: null,
      savedArticles: null
    };
  }

  componentDidMount() {
    const { articleId } = this.props;

    if (typeof window === "undefined") {
      console.log("inside window chk");
      // return loading state
      return null;
    }

    const query = gql`
      query SaveQuery {
        viewer {
          bookmarks {
            bookmarks {
              id
            }
            total
          }
        }
      }
    `;

    const client = makeClient();

    client
      .query({ query })
      .then(response => {
        const { loading, data } = response;
        console.log("response is", loading, data);
        // needs a spinner for loading state => default state is spinner
        if (loading === false) {
          const savedArticles = data.viewer.bookmarks.bookmarks;
          this.setState({
            savedStatus: !!savedArticles
              .map(item => item.id)
              .find(item => item === articleId),
            savedArticles: savedArticles
          });
        }
      })
      .catch(err => {
        this.setState({ savedStatus: false });
        console.error("Error in connecting to api", err);
      });
  }

  saveBookmark(id) {
    console.log('inside saveBookmark');
    const bookmarkInput = [{ id: id }];
    const query = gql`mutation {
      saveBookmarks(bookmarks: ${bookmarkInput}) {
        id
      }
    }`;
    const client = makeClient();

    client
      .mutate({ mutation: query })
      .then(response => {
        console.log("response saveBookmark", data);
        this.setState({ savedStatus: true,
                        savedArticles: this.state.savedArticles.push({id: id})
                   });
      })
      .catch(err => {
        this.setState({ savedStatus: false });
        console.error("Error in connecting to api", err);
      });
  }

  unsaveBookmark(id) {
    console.log('inside unsaveBookmark');
    const bookmarkInput = [{ "id": id }];
    const query = gql`mutation {
      unsaveBookmarks(bookmarks: [{ id: "9bd029d2-49a1-11e9-b472-f58a50a13bbb" }])
    }`;

    const client = makeClient();

    client
      .mutate({ mutation: query })
      .then(response => {
        const { data } = response;
        console.log("response unsaveBookmark", data);
        this.setState({ savedStatus: false,
          savedArticles: this.state.savedArticles.map(item => item.id).filter(item => item !== id)
          });
      })
      .catch(err => {
        this.setState({ savedStatus: true });
        console.error("Error in connecting to api", err);
      });
  }

  bookmarkEvents(id) {
    console.log("inisde bookmarkEvents");


    let newStatus = null;
    console.log('savedArticles is ', this.state.savedArticles, id);

    if(this.state.savedArticles) {
      newStatus = !!(this.state.savedArticles
        .map(item => item.id)
        .find(item => item === id))
      console.log('newStatus is ', newStatus)
      if(newStatus) {
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

    console.log("render saved status is", this.state.savedStatus, articleId);

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
    if (this.state.savedStatus) {
      return SaveLink(true);
    }

    return SaveLink(false);
  }
}

export default SaveStarWeb;

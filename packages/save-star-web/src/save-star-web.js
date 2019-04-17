import React, { Component } from "react";
import { Text } from "react-native";
import Link from "@times-components/link";
import fetch from "unfetch";
import { createHttpLink } from "apollo-link-http";
import { fragmentMatcher } from "@times-components/schema";
import { InMemoryCache } from "apollo-cache-inmemory";
import gql from "graphql-tag";
import {
  IconSaveBookmark
} from "@times-components/icons";
import styles, { getStyles } from "./styles";
import { ApolloClient } from "apollo-client";

const SaveLink =  (saveStatus) => {
  const saveStyle = getStyles({ saveStatus });
  const {fillColour, strokeColour} = saveStyle;

  return (
  <Link onPress={() => null} responsiveLinkStyles={styles.link}>
    <IconSaveBookmark
      fillColour={fillColour}
      strokeColour={strokeColour}
      title="Save to My Articles"
    />
  </Link>)};

class SaveStarWeb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      savedStatus: null
    }
  }

  componentDidMount() {
    const { articleId } = this.props;

    if (typeof window === "undefined") {
      console.log('inside window chk');
      //return loading state
      return null;
    }

    const query = gql`query SaveQuery{
      viewer {
        bookmarks{
          bookmarks {
            id
          }
          total
        }
      }
    }`;

    const graphqlapi = "https://prod-tpa.prod.thetimes.works/graphql"; //window.nuk.graphqlapi.url;
    const acs_tnl_cookie = "tid%3D77a8739a-fbad-4344-9bf8-09c33a49ed6b%26eid%3DAAAA002920174%26e%3D1%26a%3DTmVoYSBTcml2YXN0YXZh%26u%3D1910c402-2cf6-40dd-bb1e-4ee24e1e7f6b%26t%3D1554976444%26h%3D5f091672fb6e3258934b91f8715e2753";//window.nuk.getCookieValue('acs_tnl');
    const sacs_tnl_cookie = "1ff9a858-8f31-43f3-bb8a-4366dfcb858e";//window.nuk.getCookieValue('sacs_tnl');

    const networkInterfaceOptions = { fetch, headers: {}, uri: graphqlapi};

    networkInterfaceOptions.headers["content-type"] =  "application/x-www-form-urlencoded";
    networkInterfaceOptions.headers["Authorization"] = `Cookie acs_tnl=${acs_tnl_cookie};sacs_tnl=${sacs_tnl_cookie}`

    const httpLink = createHttpLink({
      uri: graphqlapi
    });

    const client = new ApolloClient({
      link: createHttpLink(networkInterfaceOptions),
      cache: new InMemoryCache({ fragmentMatcher })
    });

    client.query({query: query}).then(response => {
        const {loading, data} = response;
        console.log('response is', loading, data);
        //needs a spinner for loading state => default state is spinner
        if(loading === false) {
          const savedArticles = data.viewer.bookmarks.bookmarks;
          this.setState({savedStatus: !!(savedArticles.map(item => item.id).find(item => item===articleId))});
        }
    }).catch(err => {
        this.setState({savedStatus: false});
        console.error('Error in connecting to api',err);
    });

  }

  render() {
    const {articleId} = this.props;

    console.log('render saved status is', this.state.savedStatus);

    //if savedstatus is null, show the spinning
    if(this.state.savedStatus) {

      return SaveLink(true);
    }

    return SaveLink(false);

  }
}

export default SaveStarWeb;

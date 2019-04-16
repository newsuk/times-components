import React, { Component } from "react";
import { Text } from "react-native";
const fetch = require('node-fetch');
import styles from "./styles";

class SaveStarWeb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      savedStatus: false
    }
  }

  componentWillMount() {
    const { articleId } = this.props;

    if (typeof window === "undefined") {
      //return loading state
      return null;
    }

    const query = `query SaveQuery{
      viewer {
        bookmarks{
          bookmarks {
            id
          }
          total
        }
      }
    }`;

    const graphqlapi = window.nuk.graphqlapi.url;
    const acs_tnl_cookie = window.nuk.getCookieValue('acs_tnl');
    const sacs_tnl_cookie = window.nuk.getCookieValue('sacs_tnl');

    fetch(graphqlapi, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Cookie acs_tnl=${acs_tnl};sacs_tnl=${sacs_tnl}`
      },
      method: 'POST',
      body: JSON.stringify({ query })
    }).then(result => {
      if (!result.ok) {
        console.error('APIFAILURE');
      }
      return result.json();
    }).then(response => {
      if (response.errors) {
        response.errors.map(error => {
          console.error(`[GraphQL error]: Message ${error.message}`, error);
      });
      console.error('APIFAILURE');
      }
      if (!response.data.viewer) {
        console.error('ENOTFOUND');
      };
      const savedArticles = response.data.viewer.bookmarks.bookmarks;
      this.setState(
        {
          savedStatus: !!(savedArticles.map(item => item.id).find(item => item===articleId))
        }
      );
    });
  }

  render() {
    const {articleId} = this.props;

    //server side html?
    if(savedStatus) {
      //return filled Star
    }

    //return unfilled star

  }
}

export default SaveStarWeb;

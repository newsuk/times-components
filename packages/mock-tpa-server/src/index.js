/* eslint-disable no-console */

import {  ApolloServer } from "apollo-server";
import {  makeMocks } from "@times-components/provider-test-tools";
import authorProfile from "./fixtures/author-profile"

let server;

export function start () {
    const schema = makeMocks(authorProfile());

    server = new ApolloServer({
      schema
    });

    return server.listen().then(({
      url
    }) => {
      console.log(`🚀 TPA Server ready at ${url}`);
    });
  }


export function stop(){ 
  return server.
  


  
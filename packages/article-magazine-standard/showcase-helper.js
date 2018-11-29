/* eslint-disable import/no-extraneous-dependencies, no-bitwise, operator-assignment, react/prop-types */

import React, { Component } from "react";
import {
  article as makeParams,
  fixtures,
  MockedProvider,
  schemaToMocks
} from "@times-components/provider-test-tools";

const FLAGS = 1;
const HEADLINE = 2;
const LABEL = 4;
const LEAD_ASSET = 8;
const LINKED_BYLINE = 16;
const STANDFIRST = 32;
const VIDEO = 64;

export const makeArticleConfiguration = ({
  withFlags,
  withHeadline,
  withLabel,
  withLeadAsset,
  withLinkedByline,
  withStandfirst,
  withVideo
}) => {
  let mask;

  if (withFlags) {
    mask = mask | FLAGS;
  }

  if (withHeadline) {
    mask = mask | HEADLINE;
  }

  if (withLabel) {
    mask = mask | LABEL;
  }

  if (withLeadAsset) {
    mask = mask | LEAD_ASSET;
  }

  if (withLinkedByline) {
    mask = mask | LINKED_BYLINE;
  }

  if (withStandfirst) {
    mask = mask | STANDFIRST;
  }

  if (withVideo) {
    mask = mask | VIDEO;
  }

  return mask;
};

const makeArticle = configuration => article => {
  const configuredArticle = { ...article };

  if (!(configuration & FLAGS)) {
    configuredArticle.flags = [];
  }

  if (!(configuration & HEADLINE)) {
    configuredArticle.headline = null;
  }

  if (!(configuration & LABEL)) {
    configuredArticle.label = null;
  }

  if (configuration & LEAD_ASSET) {
    configuredArticle.leadAsset = {
      ...configuredArticle.leadAsset,
      caption: "A caption",
      credits: "Illustration by Jeremy"
    };
  } else {
    configuredArticle.leadAsset = null;
  }

  if (configuration & LINKED_BYLINE) {
    configuredArticle.byline = fixtures.bylineWithLink;
  }

  if (!(configuration & STANDFIRST)) {
    configuredArticle.standfirst = null;
  }

  if (!(configuration & VIDEO)) {
    configuredArticle.hasVideo = false;
  }

  return configuredArticle;
};

export class ArticleConfigurator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mocks: [],
      reRendering: false
    };
  }

  componentDidMount() {
    const { configuration, id } = this.props;
    schemaToMocks(
      makeParams({
        makeArticle: makeArticle(configuration),
        variables: () => ({
          id
        })
      })
    ).then(mocks => this.setState({ mocks }));
  }

  componentDidUpdate(prevProps) {
    const { configuration, id } = this.props;
    if (configuration !== prevProps.configuration) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState(
        {
          reRendering: true
        },
        () =>
          schemaToMocks(
            makeParams({
              makeArticle: makeArticle(configuration),
              variables: () => ({
                id
              })
            })
          ).then(mocks => this.setState({ mocks, reRendering: false }))
      );
    }
  }

  render() {
    const { children } = this.props;
    const { mocks, reRendering } = this.state;
    if (!mocks.length || reRendering) {
      return null;
    }

    return <MockedProvider mocks={mocks}>{children}</MockedProvider>;
  }
}

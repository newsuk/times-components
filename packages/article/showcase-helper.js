/* eslint-disable import/no-extraneous-dependencies, no-bitwise, operator-assignment, react/prop-types */

import React, { Component } from "react";
import {
  article as makeParams,
  articleComments as makeArticleCommentsParams,
  fixtures,
  MockedProvider,
  schemaToMocks
} from "@times-components/provider-test-tools";

const FLAGS = 1;
const LABEL = 2;
const LEAD_ASSET = 4;
const LINKED_BYLINE = 8;
const STANDFIRST = 16;
const VIDEO = 32;

export const makeArticleConfiguration = ({
  withFlags,
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

  if (!(configuration & LABEL)) {
    configuredArticle.label = null;
  }

  if (!(configuration & LEAD_ASSET)) {
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
    const { id } = this.props;
    schemaToMocks([
      ...makeParams({
        makeArticle: makeArticle(this.props.configuration),
        variables: () => ({
          id
        })
      }),
      ...makeArticleCommentsParams({
        count: 123,
        enabled: true,
        id,
        variables: () => ({
          id
        })
      })
    ]).then(mocks => this.setState({ mocks }));
  }

  componentDidUpdate(prevProps) {
    if (this.props.configuration !== prevProps.configuration) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState(
        {
          reRendering: true
        },
        () =>
          schemaToMocks(
            makeParams({
              makeArticle: makeArticle(this.props.configuration),
              variables: () => ({
                id: this.props.id
              })
            })
          ).then(mocks => this.setState({ mocks, reRendering: false }))
      );
    }
  }

  render() {
    if (!this.state.mocks.length || this.state.reRendering) {
      return null;
    }

    return (
      <MockedProvider mocks={this.state.mocks}>
        {this.props.children}
      </MockedProvider>
    );
  }
}

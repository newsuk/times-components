import gql from "graphql-tag";
import { article } from "@times-components/provider-queries";
import connectGraphql from "./connect";

export default connectGraphql(gql(article));

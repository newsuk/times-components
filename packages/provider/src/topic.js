import gql from "graphql-tag";
import { topic } from "@times-components/provider-queries";
import connectGraphql from "./connect";

export default connectGraphql(gql(topic));

import gql from "graphql-tag";
import { author } from "@times-components/provider-queries";
import connectGraphql from "./connect";

export default connectGraphql(gql(author));

import { getBookmarks } from "@times-components/provider-queries";
import connectGraphql from "./connect";

export default connectGraphql(getBookmarks);

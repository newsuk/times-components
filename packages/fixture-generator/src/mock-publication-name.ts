import { PublicationName } from "./types";

function mockPublicationName(
  name: PublicationName = PublicationName.Times
): PublicationName {
  return name;
}

export default mockPublicationName;

import { PublicationName } from "./types";

function mockPublicationName(
  name: PublicationName = PublicationName.TIMES
): PublicationName {
  return name;
}

export default mockPublicationName;

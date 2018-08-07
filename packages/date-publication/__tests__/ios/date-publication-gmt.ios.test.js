import rndiMock from "react-native-device-info";
import shared from "../shared";

const londonTimezone = () => {
  rndiMock.setMockTimezone("Europe/London");
};

const nonLondonTimezone = () => {
  rndiMock.setMockTimezone("Europe/Kiev");
};

const dateGMT = "2017-07-01T14:32:00.000Z";

shared(dateGMT, { londonTimezone, nonLondonTimezone });

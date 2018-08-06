import rndiMock from "react-native-device-info";
import shared from "../shared";

const londonTimezone = () => {
  rndiMock.setMockTimezone("Europe/London");
};

const nonLondonTimezone = () => {
  rndiMock.setMockTimezone("Europe/Kiev");
};

const dateBST = "2017-01-01T14:32:00.000Z";

shared(dateBST, { londonTimezone, nonLondonTimezone });

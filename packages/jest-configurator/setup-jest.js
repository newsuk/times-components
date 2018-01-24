import Adapter from "enzyme-adapter-react-16";
import Enzyme from "enzyme";

Enzyme.configure({ adapter: new Adapter() });

global.Intl = {
  DateTimeFormat: () => ({
    resolvedOptions: () => ({
      timeZone: "Europe/London"
    })
  })
};

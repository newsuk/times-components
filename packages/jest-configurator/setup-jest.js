import Adapter from "enzyme-adapter-react-16";
import Enzyme from "enzyme";

Enzyme.configure({ adapter: new Adapter() });

global.delayAsyncTest = ms => new Promise(res => setTimeout(res, ms));

/* eslint-disable */
import "regenerator-runtime/runtime";
import Adapter from "enzyme-adapter-react-16";
import Enzyme from "enzyme";

Enzyme.configure({ adapter: new Adapter() });

if (typeof window !== "undefined")
  window.HTMLCanvasElement.prototype.getContext = () => {};

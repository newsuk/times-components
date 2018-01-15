import runTests from "./test-helper";
import { renderTree, renderTrees } from "../markup.web";

// We need to mock this as the GPT component under Ad resorts to
// a onLayout handler which in react-native-web uses ReactDOM.findDOMNode
// this is incompatible with react-test-renderer as per
// https://github.com/facebook/react/issues/7371
jest.mock("@times-components/ad", () => "Ad");

describe("Markup Web", runTests(renderTree, renderTrees, "p", "div"));

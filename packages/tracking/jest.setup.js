import { configure, mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PropTypes from "prop-types";

configure({ adapter: new Adapter() });

global.mount = mount;
global.shallow = shallow;
global.PropTypes = PropTypes;

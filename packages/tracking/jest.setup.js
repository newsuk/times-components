import { configure, mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import React from "react";
import PropTypes from "prop-types";
import renderer from "react-test-renderer";

configure({ adapter: new Adapter() });

global.mount = mount;
global.shallow = shallow;
global.React = React;
global.PropTypes = PropTypes;
global.renderer = renderer;

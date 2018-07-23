import { mockReactNativeComponent } from "@times-components/jest-configurator";
import shared from "../topic-head-functional";

jest.mock("Text", () => mockReactNativeComponent("Text"));
jest.mock("View", () => mockReactNativeComponent("View"));

shared();

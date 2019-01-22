// eslint-disable-next-line global-require
jest.mock("@times-components/image", () => ({
  ModalImage: "ModalImage"
}));
jest.mock("@times-components/responsive", () => require("./responsive-mock"));


/* eslint-env browser */
// from https://github.com/necolas/react-native-web/blob/695eba45af1e4b35159877755e881c8cd41144a5/src/apis/Clipboard/index.js
export default class Clipboard {
  static getString() {
    return Promise.resolve("");
  }

  static setString(text) {
    let success = false;
    const textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    try {
      document.execCommand("copy");
      success = true;
    } catch (e) {} // eslint-disable-line no-empty
    document.body.removeChild(textField);
    return success;
  }
}

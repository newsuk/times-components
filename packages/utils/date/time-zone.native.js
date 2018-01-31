import DeviceInfo from "react-native-device-info";

const getTimezone = () => {
  DeviceInfo.getTimezone();
  try {
    return DeviceInfo.getTimezone();
  } catch (err) {
    return;
  }
};

export default getTimezone;
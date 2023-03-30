import {Dimensions, Platform, StatusBar, NativeModules} from 'react-native';
// import DeviceInfo from 'react-native-device-info';

const ExtraDimensions = NativeModules.ExtraDimensions?.getConstants?.();

export const isIos = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const screenW = Dimensions.get('window').width;
export const screenH = ExtraDimensions?.REAL_WINDOW_HEIGHT || Dimensions.get('window').height;

const UISize = 375; // 750 / 640
const deviceWidthDp = screenW / UISize;

export function px2rem(px) {
  return px * deviceWidthDp;
}

// let STATUS_BAR_HEIGHT; // 状态栏高度
// let BOTTOM_SAFE_AREA_HEIGHT = 0;
// const NAVIGATION_HEADER_HEIGHT = 44; // 导航栏header高度
// if (Platform.OS === 'ios') {
//   if (DeviceInfo.hasNotch()) {
//     STATUS_BAR_HEIGHT = 44;
//     BOTTOM_SAFE_AREA_HEIGHT = 34;
//   } else {
//     STATUS_BAR_HEIGHT = 20;
//   }
// } else {
//   STATUS_BAR_HEIGHT = StatusBar.currentHeight; // 仅android可用
// }

// export {STATUS_BAR_HEIGHT, NAVIGATION_HEADER_HEIGHT, BOTTOM_SAFE_AREA_HEIGHT};

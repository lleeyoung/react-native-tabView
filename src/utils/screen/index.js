import {Dimensions, Platform} from 'react-native'

export const isIos = Platform.OS === 'ios'
export const isAndroid = Platform.OS === 'android'
export const screenW = Dimensions.get('window').width

const baseWidth = 375
const deviceScale = screenW / baseWidth

export const px2rem = (px) => {
  return px * deviceScale
}

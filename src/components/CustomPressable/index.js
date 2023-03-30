import React, {useCallback, useRef} from 'react';
import {Pressable} from 'react-native';

const CustomPressable = ({onPress, isShow = true, ...restProps}) => {
  const lastPressTime = useRef(1);
  const _onPress = useCallback(() => {
    if (!onPress) {
      return;
    }
    const curTime = new Date().getTime();
    if (curTime - lastPressTime.current > 300) {
      lastPressTime.current = curTime;
      onPress();
    }
  }, [onPress]);
  if (!isShow) {
    return null;
  }
  return (
    <Pressable onPress={_onPress} {...restProps}>
      {restProps.children}
    </Pressable>
  );
};

export default CustomPressable;

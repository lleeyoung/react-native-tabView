import React from 'react';
import {Animated} from 'react-native';
import {px2rem, screenW} from '../../utils/screen';

const AnimatedTabIndicator = ({position, routeLength, style}) => {
  const tabWidth = screenW / routeLength;
  const indicatorWidth = px2rem(18);
  const baseMargin = (tabWidth - indicatorWidth) / 2;
  const translateX = position.interpolate({
    inputRange: [0, routeLength - 1],
    outputRange: [baseMargin, baseMargin + tabWidth * (routeLength - 1)],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[
        {
          width: indicatorWidth,
          transform: [{translateX}],
          height: 4,
          backgroundColor: '#FBD000',
          borderRadius: 2,
        },
        style,
      ]}
    />
  );
};

export default AnimatedTabIndicator;

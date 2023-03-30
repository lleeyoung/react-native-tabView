import React from 'react';
import {Animated, View} from 'react-native';
import styles from './styles';
import AnimatedTabIndicator from '../AnimatedTabIndicator';
import CustomPressable from '../CustomPressable';

const AnimatedTabBar = ({data, position, onPressTab, activeIndex, style}) => {
  const scale = [
    position.interpolate({
      inputRange: [0, data.length - 1],
      outputRange: [1.2, 1],
      extrapolate: 'clamp',
    }),
    position.interpolate({
      inputRange: [0, data.length - 1],
      outputRange: [1, 1.2],
      extrapolate: 'clamp',
    }),
    position.interpolate({
      inputRange: [0, data.length - 1],
      outputRange: [1, 1.2],
      extrapolate: 'clamp',
    }),
    position.interpolate({
      inputRange: [0, data.length - 1],
      outputRange: [1, 1.2],
      extrapolate: 'clamp',
    }),
  ];

  return (
    <View style={[styles.container, style]}>
      {data.map((v, index) => {
        return (
          <>
            <CustomPressable
              onPress={() => {
                onPressTab(index);
              }}
              style={styles.itemContainer}
              key={index}>
              <Animated.Text
                style={{
                  // transform: [{scale: scale[index]}],
                  fontWeight: activeIndex === index ? 'bold' : 'normal',
                  color: activeIndex === index ? '#333333' : '#4C4948',
                }}>
                {v.title}
              </Animated.Text>
            </CustomPressable>
            {index !== data?.length - 1 && <View style={styles.line} />}
          </>
        );
      })}
      <AnimatedTabIndicator
        style={styles.indicator}
        routeLength={data.length}
        position={position}
      />
    </View>
  );
};

export default AnimatedTabBar;

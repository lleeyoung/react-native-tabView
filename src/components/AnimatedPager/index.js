import React, {useEffect, useRef, useState} from 'react';
import {Animated, View} from 'react-native';
import styles from './styles';
import PagerView from 'react-native-pager-view';
import AnimatedTabBar from '../AnimatedTabBar';

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

const DataDetailNewRegistryDetail = ({children, tabData, tabStyle}) => {
  const scrollOffsetAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const positionAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState(0);
  const pagerViewRef = useRef(null);
  const scrollX = Animated.add(scrollOffsetAnimatedValue, positionAnimatedValue);

  const onPageSelected = ({nativeEvent}) => {
    setActiveIndex(nativeEvent.position);
    // pagerViewRef.current?.setPage(nativeEvent.position);
  };

  const onPageScroll = Animated.event(
    [
      {
        nativeEvent: {
          offset: scrollOffsetAnimatedValue,
          position: positionAnimatedValue,
        },
      },
    ],
    {
      useNativeDriver: true,
    },
  );

  useEffect(() => {
      pagerViewRef.current?.setPage(activeIndex);
  }, [activeIndex]);

  return (
    <View style={styles.container}>
      <AnimatedTabBar
        data={tabData}
        position={scrollX}
        onPressTab={setActiveIndex}
        activeIndex={activeIndex}
        style={tabStyle}
      />
      <AnimatedPagerView
        overdrag={false}
        style={{flex: 1}}
        ref={pagerViewRef}
        onPageSelected={onPageSelected}
        onPageScroll={onPageScroll}>
        {React.Children.map(children, (child, i) => (
          <View key={i}>{child}</View>
        ))}
      </AnimatedPagerView>
    </View>
  );
};
export default DataDetailNewRegistryDetail;

import React, { useState, useRef, useEffect, useMemo } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  LayoutChangeEvent,
  Animated,
  Image,
  ImageBackground,
  Easing,
  Dimensions,
  StyleSheet,
} from 'react-native'
import CustomPressable from './CustomPressable'
import {px2rem, screenW} from '../utils/screen';
import PagerView from 'react-native-pager-view';

const TAB_PH = px2rem(11)
const TAB_WIDTH = px2rem(80)

export const tabs = [
  '111111',
  '222222',
  '333333',
  '444444',
  '555555',
  '666666',
  '777777',
  '888888',
  '999999',
  'aaaaaa',
  'bbbbbb',
  'cccccc',
  'dddddd',
  'eeeeee',
  'ffffff',
  'gggggg',
  'hhhhhh',
  'iiiiii',
  'jjjjjj',
]

const SCROLLVIEW_LEFT = 0
const SCROLL_BAR = px2rem(15)

type Props = {
  onChange: (v: any) => void,
  children: React.ReactNode,
  style: any
}

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

const TabPageView = (props: Props) => {
  const { onChange, children, style } = props

  const [active, setActive] = useState(0)
  const scrollX = useRef(new Animated.Value(0)).current
  const localX: any = useRef([]).current
  const [duration, setDuration] = useState<number>(500)
  const [render, setRender] = useState(false)
  const [show, setShow] = useState(false)
  const map = useRef<any>({}).current
  const scrollViewRef = useRef<any>(null)
  const scrollViewWidth = useRef<any>(Dimensions.get('window').width)

  const scrollOffsetAnimatedValue = React.useRef(new Animated.Value(0)).current
  const positionAnimatedValue = React.useRef(new Animated.Value(0)).current
  const pagerViewRef: any = useRef(null)
  const pageScrollX = Animated.add(scrollOffsetAnimatedValue, positionAnimatedValue);

  const tabWidth = TAB_WIDTH

  const baseMargin = (tabWidth - SCROLL_BAR) / 2;
  const translateX = pageScrollX.interpolate({
    inputRange: [0, tabs.length - 1],
    outputRange: [baseMargin, baseMargin + tabWidth * (tabs.length - 1)],
    extrapolate: 'clamp',
  })

  const onPageSelected = ({nativeEvent} : {nativeEvent: any}) => {
    setActive(nativeEvent.position)
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

  const handlePress = (item: string, index: number) => {
    setActive(index)
  }

  useEffect(() => {
    pagerViewRef.current?.setPage(active);
}, [active]);
  // const handlePress = (item: string, index: number) => {
  //   scrollViewRef.current?.scrollTo({
  //     x: map[item] - (scrollViewWidth.current + px2rem(SCROLLVIEW_LEFT)) / 2,
  //     duration,
  //     animated: true
  //   })
  //   setActive(index)
  //   animatedStart(localX[index])
  //   onChange({ item, index })
  //   setShow(false)
  // }

  const handleLayout = () => {}

  // const handleLayout = (
  //   event: LayoutChangeEvent,
  //   item: string,
  //   index: number
  // ) => {
  //   const { width, x } = event.nativeEvent.layout
  //   const local = (width - px2rem(SCROLL_BAR)) / 2 + x
  //   localX[index] = local
  //   if (!map[item]) {
  //     map[item] = local
  //   }
  //   if (!render) {
  //     setTimeout(() => {
  //       setRender(true)
  //     }, 0)
  //   }
  // }

  // const animatedStart = (localX: any) => {
  //   Animated.timing(
  //     scrollX, //动画中的变量值
  //     {
  //       toValue: localX,
  //       duration, //动画时长
  //       useNativeDriver: true,
  //       easing: Easing.out(Easing.cubic)
  //     }
  //   ).start() //开始执行动画
  // }

  // useEffect(() => {
  //   if (render && localX[0]) {
  //     animatedStart(localX[0])
  //     setDuration(500)
  //   }
  // }, [render])

  return (
    <View style={[styles.con, style]}>
      <View style={styles.tabBox}>
        <ScrollView
          style={styles.container}
          horizontal
          showsHorizontalScrollIndicator={false}
          ref={scrollViewRef}
          onLayout={e => {
            const { width } = e.nativeEvent.layout
            scrollViewWidth.current = width
          }}
          snapToAlignment={'start'}>
          {tabs.map((item, index) => {
            return (
              <TouchableWithoutFeedback
                key={item}
                hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
                onPress={e => {
                  handlePress(item, index)
                }}>
                <View
                  style={[styles.item]}
                  onLayout={e => {
                    handleLayout(e, item, index)
                  }}>
                  <Text
                    style={
                      active === index ? styles.activeItemText : styles.itemText
                    }>
                    {item}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            )
          })}
          <Animated.View
            style={[styles.scrollBar, { transform: [{ translateX: translateX }] }]}
          />
        </ScrollView>
      </View>
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
  )
}

const styles = StyleSheet.create({
  con: {
    width: '100%',
    position: 'relative',
    zIndex: 3,
    backgroundColor: '#ffffff',
    height: px2rem(200)
  },
  tabBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff'
    // position: 'relative'
  },
  container: {
    // width: '100%',
    height: px2rem(30),
    flex: 1,
    // paddingHorizontal: 11,
    flexDirection: 'row',
    // borderBottomWidth: 1,
    // borderBottomColor: '#EBEBEB',
    position: 'relative',
    marginLeft: SCROLLVIEW_LEFT
  },
  item: {
    paddingHorizontal: TAB_PH,
    width: TAB_WIDTH,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemText: {
    color: '#3C3C3C',
    fontSize: 12
  },
  activeItemText: {
    color: '#E60012',
    fontSize: 12,
    fontWeight: '500'
  },
  scrollBar: {
    width: SCROLL_BAR,
    height: 3,
    backgroundColor: '#E6262C',
    borderRadius: px2rem(15),
    position: 'absolute',
    left: 0,
    bottom: 0,
    zIndex: 100
  },
  pmBox: {
    width: px2rem(43),
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  pmIcon: {
    width: px2rem(16),
    height: px2rem(16),
    position: 'relative'
  },
  pmNumber: {
    width: px2rem(10),
    height: px2rem(10),
    borderRadius: px2rem(5),
    position: 'absolute',
    top: -px2rem(5),
    right: -px2rem(5),
    backgroundColor: '#E6262C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  pmNumberText: {
    fontSize: 7,
    color: '#fff',
    fontWeight: '500'
  },
  linearGradient: {
    width: px2rem(6),
    height: '100%',
    position: 'absolute',
    left: -px2rem(6),
    top: 0,
    bottom: 0,
    opacity: 0.2,
    borderLeftWidth: 0,
    borderRadius: 2
  },
  drawer: {
    width: '90%',
    height: px2rem(74),
    backgroundColor: '#fff',
    // borderWidth: 1,
    // borderTopWidth: 0,
    // borderColor: 'rgba(0,0,0,0.08)',
    borderBottomLeftRadius: px2rem(10),
    borderBottomRightRadius: px2rem(10),
    shadowColor: 'rgba(0, 0, 0, 1)',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
    zIndex: 10000,
    position: 'absolute',
    left: '5%',
    top: px2rem(31)
  },
  drawerItem: {
    marginHorizontal: px2rem(12),
    height: px2rem(36),
    flexDirection: 'row',
    alignItems: 'center',
  },
  drawerLine: {
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 0.5,
  },
  drawerItemText: {
    color: '#3C3C3C',
    fontSize: 12,
  },
})

export default TabPageView

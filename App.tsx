/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { useRef } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Pressable
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import AnimatedPager from './src/components/AnimatedPager';
import PagerView from 'react-native-pager-view';
import TabView from './src/components/TabView';
import { px2rem } from './src/utils/screen';
import TabPageView, { tabs } from './src/components/TabPageView';



function App(): JSX.Element {
  const pagerViewRef: any = useRef(null);
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>

      <AnimatedPager
        tabStyle={{}}
        tabData={[{title: '111'}, {title: '222'}, {title: '333'}, {title: '444'}]}
        >
        <View style={{height: px2rem(200), backgroundColor: 'yellow'}}>
          <Text>1111</Text>
        </View>
        <View style={{height: px2rem(200), backgroundColor: 'blue'}}>
          <Text>2222</Text>
        </View>
        <View style={{height: px2rem(200), backgroundColor: 'red'}}>
          <Text>333</Text>
        </View>
        <View style={{height: px2rem(200), backgroundColor: '#e0e0e0'}}>
          <Text>444</Text>
        </View>
      </AnimatedPager>
      {/* <PagerView style={styles.pagerView} initialPage={0} ref={pagerViewRef}>
        <View key="1">
          <Text>First page</Text>
        </View>
        <View key="2">
          <Text>Second page</Text>
        </View>
      </PagerView> */}
      <TabView onChange={() => {}}/>
      <TabPageView onChange={() => {}} style={{marginTop: px2rem(20)}}>
        {
          tabs.map((item, index) => {
            return (
              <View key={item} style={{height: px2rem(200), backgroundColor: '#e0e0e0'}}>
              <Text>{item}-{index}</Text>
            </View>
            )
          })
        }
       
      </TabPageView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
    width: '100%',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

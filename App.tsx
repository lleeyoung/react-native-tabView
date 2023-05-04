import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import TabView from './src/components/TabView';
import {px2rem} from './src/utils/screen';
import TabPageView, {tabs} from './src/components/TabPageView';

const PageView = ({item, index}: {item: any, index: number}) => {
  return (
    <View
      key={item}
      style={{height: px2rem(200), backgroundColor: '#e0e0e0'}}>
      <Text>
        {item}-{index + 1}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <TabView onChange={() => {}} />
      <TabPageView onChange={() => {}} style={{marginTop: px2rem(20)}}>
        {tabs.map((item, index) => {
          return <PageView item={item} index={index}/>
        })}
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

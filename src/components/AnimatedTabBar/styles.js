import {StyleSheet} from 'react-native';
import {px2rem} from '../../utils/screen';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: px2rem(50),
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  indicator: {
    position: 'absolute',
    bottom: px2rem(5),
  },
  line: {
    width: 1,
    height: px2rem(15),
    backgroundColor: '#CCCCCC',
  },
});

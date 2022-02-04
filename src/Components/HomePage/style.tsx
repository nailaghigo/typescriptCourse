import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  header: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
    width: 300,
    backgroundColor: '#263544',
    borderRadius: 150,
  },
  title: {
    fontSize: 20,
    color: 'white',
    fontWeight: '500',
  },
  titleName: {
    fontSize: 36,
    color: '#EBF0C5',
    fontWeight: '600',
  },
});

export default styles;

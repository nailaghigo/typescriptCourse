import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  itemWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginLeft: 8,
    marginRight: 8,
    marginTop: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: '#ffffff',
  },
  item: {
    borderColor: '#263544',
    padding: 10,
  },
  label: {
    fontWeight: '600',
  },
  data: {
    fontWeight: '200',
    fontSize: 14,
    color: '#263544',
    // padding: 2,
  },
  //Buttons delete and update
  containerButtons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  buttonUpdate: {
    marginRight: 10,
    padding: 6,
    borderRadius: 3,
    borderBottomWidth: 1,
    color: '#EB9960',
  },
  buttonDelete: {
    padding: 6,
    borderRadius: 3,
    color: 'white',
  },
});

export default styles;

import React from 'react';
import {Text, Pressable} from 'react-native';
import styles from './styles';

interface Props {
  onPress: any;
  text: string;
  bgColor: string;
  fgColor: string;
  testID?: string;
}
const CustomButton: React.FC<Props> = ({
  onPress,
  text,
  bgColor,
  fgColor,
  testID,
}) => {
  return (
    <Pressable
      onPress={onPress}
      testID={testID}
      style={[styles.container, bgColor ? {backgroundColor: bgColor} : {}]}>
      <Text style={[styles.text, fgColor ? {color: fgColor} : {}]}>{text}</Text>
    </Pressable>
  );
};

export default CustomButton;

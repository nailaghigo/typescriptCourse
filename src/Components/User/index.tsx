import React from 'react';
import {Text, Button, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

const UserScreen = () => {
  return (
    <View>
      <Text>USER</Text>
      <Button
        title="Gallery"
        onPress={async () => {
          const options = {
            title: 'Gallery',
            customButtons: [{name: 'fb', title: 'Facebook'}],
            cancelButton: 'Cancel',
            takePhotoButtonTitle: 'Tomar Foto',
            chooseFromLibraryButtonTitle: 'Abrir Galeria',
            noData: true,
          };
          await launchImageLibrary(options, (res: any) => {
            console.log({res});
          });
          // imagePicker.launchCamera();
          // imagePicker.launchImageLibrary();
        }}
      />
    </View>
  );
};

export default UserScreen;

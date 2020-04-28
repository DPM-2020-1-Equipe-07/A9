/*
  A implementação desse exercício foi feita com base nos seguintes links:
  https://docs.expo.io/versions/latest/sdk/media-library/
  https://docs.expo.io/versions/latest/sdk/camera/#takepictureasync
  https://blog.expo.io/using-expos-medialibrary-api-to-create-an-album-and-save-a-photo-9000931c267b
*/

import { Camera } from 'expo-camera';
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Expo, { Constants } from 'expo';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';

export default function App() {

  const [rollGranted, setRollGranted] = useState(false)
  const [cameraGranted, setCameraGranted] = useState(false)

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setCameraGranted(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);  
      setRollGranted(status === 'granted');
    })();
  }, []);

  takePictureAndCreateAlbum = async () => {
    console.log('tpaca');
    const { uri } = await this.camera.takePictureAsync();
    console.log('uri', uri);
    const asset = await MediaLibrary.createAssetAsync(uri);
    console.log('asset', asset);
    MediaLibrary.createAlbumAsync('Expo', asset)
      .then(() => {
        Alert.alert('Album created!')
      })
      .catch(error => {
        Alert.alert('An Error Occurred!')
      });
  };

  return (
    <View style={styles.container}>
      <Camera
        type={Camera.Constants.Type.back}
        style={{ flex: 1 }}
        ref={ref => {
          this.camera = ref;
        }}
      />
      <TouchableOpacity
        onPress={() =>
          rollGranted && cameraGranted
            ? this.takePictureAndCreateAlbum()
            : Alert.alert('Permissions not granted')
        }
        style={styles.buttonContainer}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>
            Snap
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  button: {
    width: 200,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    paddingVertical: 4,
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  buttonText: {
    fontSize: 24,
    color: '#fff',
  },
});

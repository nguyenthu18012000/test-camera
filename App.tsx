import React, {useEffect, useState, type PropsWithChildren} from 'react';
import {
  Image,
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RNCamera } from 'react-native-camera'

const App = () => {
  const [camera, setCamera] = useState<any>();
  const [imagePath, setImagePath] = useState<string>('');

  const takePicture = async () => {
    if (camera) {
      const options = { quality: 0.5, base64: true };
      const data = await camera.takePictureAsync(options);
      console.log(data.uri);
      setImagePath(data.uri)
    }
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      // if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      //   console.log("You can use the camera");
      // } else {
      //   console.log("Camera permission denied");
      // }
    } catch (err) {
      console.warn(err);
    }
  };
  
  useEffect(() => {
    requestCameraPermission()
  }, [])

  return (
      <ScrollView style={{backgroundColor: 'white'}}>
        <RNCamera
          ref={ref => {
            setCamera(ref)
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          // onGoogleVisionBarcodesDetected={({ barcodes }) => {
          //   console.log(barcodes);
          // }}
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
          onBarCodeRead={(result: any) => {
            console.log(result)
          }}
        />
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity
            onPress={takePicture}
            style={styles.capture}
          >
            <Text style={{ fontSize: 14, color: 'red' }}> SNAP </Text>
          </TouchableOpacity>
        </View>
        {imagePath.length > 0
          && <>
            <Image source={{uri: imagePath}} style={{width: 300, height: 300}} />
          </>
        }
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    height: 700,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default App;
